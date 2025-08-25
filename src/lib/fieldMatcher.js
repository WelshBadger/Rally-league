import { supabase } from './supabase.js'

// Name normalization for matching across sources
export function normalizeCoDriverName(name) {
  if (!name) return ''
  
  return name
    .trim()
    .replace(/,\s*/g, ' ') // "Williamson, Carl" -> "Williamson Carl"
    .replace(/\b[A-Z]\.\s*/g, '') // "C. Williamson" -> "Williamson"
    .replace(/\s+/g, ' ') // Multiple spaces -> single space
    .toLowerCase()
}

// Save data to website-specific tables
export async function saveToWebsiteDatabase(websiteName, data) {
  const tableMap = {
    'rallies_info': 'rallies_info_codrivers',
    'ewrc': 'ewrc_codrivers', 
    'brc': 'brc_codrivers'
  }
  
  const tableName = tableMap[websiteName]
  if (!tableName || !data.length) return []
  
  try {
    const { data: savedData, error } = await supabase
      .from(tableName)
      .upsert(data, { onConflict: 'source_url,codriver_name,navigator,crew_navigator' })
      .select()
    
    if (error) {
      console.error(`❌ Error saving to ${tableName}:`, error)
      return []
    }
    
    console.log(`✅ Saved ${savedData.length} records to ${tableName}`)
    return savedData
    
  } catch (error) {
    console.error(`❌ Database error for ${tableName}:`, error)
    return []
  }
}

// Pool data from all website databases
export async function poolCoDriverData() {
  try {
    console.log('🔄 POOLING: Combining data from all website databases')
    
    // Get data from each website-specific table
    const [ralliesInfoData, ewrcData, brcData] = await Promise.all([
      supabase.from('rallies_info_codrivers').select('*'),
      supabase.from('ewrc_codrivers').select('*'),
      supabase.from('brc_codrivers').select('*')
    ])
    
    const allCoDrivers = new Map()
    
    // Process Rallies.info data
    if (ralliesInfoData.data) {
      ralliesInfoData.data.forEach(entry => {
        const normalizedName = normalizeCoDriverName(entry.codriver_name)
        if (normalizedName) {
          addToUnifiedData(allCoDrivers, normalizedName, entry.codriver_name, 'rallies_info', entry)
        }
      })
    }
    
    // Process EWRC data
    if (ewrcData.data) {
      ewrcData.data.forEach(entry => {
        const normalizedName = normalizeCoDriverName(entry.navigator)
        if (normalizedName) {
          addToUnifiedData(allCoDrivers, normalizedName, entry.navigator, 'ewrc', entry)
        }
      })
    }
    
    // Process BRC data
    if (brcData.data) {
      brcData.data.forEach(entry => {
        const normalizedName = normalizeCoDriverName(entry.crew_navigator)
        if (normalizedName) {
          addToUnifiedData(allCoDrivers, normalizedName, entry.crew_navigator, 'brc', entry)
        }
      })
    }
    
    const unifiedData = Array.from(allCoDrivers.values())
    console.log(`🔄 POOLED: ${unifiedData.length} unique co-drivers from all sources`)
    
    return unifiedData
    
  } catch (error) {
    console.error('❌ Error pooling co-driver data:', error)
    return []
  }
}

// Helper function to add/merge data in unified structure
function addToUnifiedData(coDriversMap, normalizedName, originalName, source, entry) {
  if (coDriversMap.has(normalizedName)) {
    // Merge with existing entry
    const existing = coDriversMap.get(normalizedName)
    existing.total_rallies += 1
    existing.data_sources = [...new Set([...existing.data_sources, source])]
    existing.last_updated = new Date().toISOString()
  } else {
    // Create new unified entry
    coDriversMap.set(normalizedName, {
      name: originalName,
      normalized_name: normalizedName,
      total_rallies: 1,
      total_points: 0, // Will be calculated later
      data_sources: [source],
      first_seen: new Date().toISOString(),
      last_updated: new Date().toISOString()
    })
  }
}

// Save unified data to master table
export async function saveUnifiedData(unifiedData) {
  if (!unifiedData.length) return []
  
  try {
    const { data: savedData, error } = await supabase
      .from('unified_codrivers')
      .upsert(unifiedData, { onConflict: 'normalized_name' })
      .select()
    
    if (error) {
      console.error('❌ Error saving unified data:', error)
      return []
    }
    
    console.log(`✅ Saved ${savedData.length} unified co-drivers`)
    return savedData
    
  } catch (error) {
    console.error('❌ Database error for unified data:', error)
    return []
  }
}
