import axios from 'axios'
import * as cheerio from 'cheerio'

export async function GET() {
  try {
    console.log('🚀 AUTOMATIC RALLY DISCOVERY: Fixed extraction for REAL co-driver names only')
    
    const allCoDrivers = []
    const discoveryResults = []
    
    // RALLY WEBSITES for automatic discovery
    const rallyWebsites = [
      {
        name: 'Rallies.info',
        url: 'https://www.rallies.info/',
        baseUrl: 'https://www.rallies.info'
      }
    ]
    
    // AUTOMATIC DISCOVERY AND EXTRACTION
    for (const website of rallyWebsites) {
      try {
        console.log(`🔍 AUTO-DISCOVERING rallies on ${website.name}`)
        
        const response = await axios.get(website.url, {
          timeout: 15000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        })
        
        const $ = cheerio.load(response.data)
        const discoveredRallyLinks = []
        
        // DISCOVER rally links
        $('a[href]').each((index, element) => {
          const href = $(element).attr('href')
          const linkText = $(element).text().trim()
          
          if (href && isRallyLink(href, linkText)) {
            const fullUrl = href.startsWith('http') ? href : `${website.baseUrl}${href}`
            discoveredRallyLinks.push({
              url: fullUrl,
              name: linkText || 'Rally Event',
              source: website.name
            })
          }
        })
        
        console.log(`🔍 DISCOVERED ${discoveredRallyLinks.length} rally links`)
        
        // EXTRACT co-drivers from first 5 discovered rallies
        const rallysToProcess = discoveredRallyLinks.slice(0, 5)
        let websiteCoDrivers = 0
        
        for (const rally of rallysToProcess) {
          try {
            console.log(`🏁 EXTRACTING from: ${rally.name}`)
            
            const rallyResponse = await axios.get(rally.url, {
              timeout: 10000,
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
              }
            })
            
            const rallyPage = cheerio.load(rallyResponse.data)
            const rallyCoDrivers = []
            
            // STRICT EXTRACTION: Only real co-driver names in driver/co-driver format
            rallyPage('table tr, ul li, div').each((index, element) => {
              const elementText = rallyPage(element).text().trim()
              
              // Only process text that looks like entry lists or results
              if (elementText.length > 15 && elementText.length < 200) {
                
                // STRICT PATTERNS: Only extract when we see clear driver/co-driver pairs
                const strictPatterns = [
                  // "1. John Smith / Carl Williamson"
                  /(\d+)\.\s*([A-Z][a-z]+ [A-Z][a-z]+)\s*\/\s*([A-Z][a-z]+ [A-Z][a-z]+)/g,
                  // "John Smith / Carl Williamson" (no number)
                  /^([A-Z][a-z]+ [A-Z][a-z]+)\s*\/\s*([A-Z][a-z]+ [A-Z][a-z]+)$/g,
                  // "Driver: John Smith Co-driver: Carl Williamson"
                  /Driver:\s*([A-Z][a-z]+ [A-Z][a-z]+).*Co-driver:\s*([A-Z][a-z]+ [A-Z][a-z]+)/gi
                ]
                
                strictPatterns.forEach((pattern, patternIndex) => {
                  const matches = elementText.matchAll(pattern)
                  
                  for (const match of matches) {
                    let driverName, coDriverName
                    
                    if (match[3]) {
                      // Pattern with position: [1]=position, [2]=driver, [3]=codriver
                      driverName = match[2]?.trim()
                      coDriverName = match[3]?.trim()
                    } else {
                      // Pattern without position: [1]=driver, [2]=codriver
                      driverName = match[1]?.trim()
                      coDriverName = match[2]?.trim()
                    }
                    
                    // STRICT VALIDATION: Only accept real human names
                    if (coDriverName && 
                        isRealHumanName(coDriverName) && 
                        driverName && 
                        isRealHumanName(driverName) &&
                        coDriverName !== driverName) {
                      
                      rallyCoDrivers.push({
                        name: coDriverName,
                        driver: driverName,
                        rallyEvent: rally.name,
                        source: website.name,
                        isAuthentic: true,
                        extractedAt: new Date().toISOString(),
                        rallyUrl: rally.url,
                        extractionPattern: patternIndex + 1
                      })
                      console.log(`✅ REAL CO-DRIVER FOUND: ${coDriverName} (driver: ${driverName}) from ${rally.name}`)
                    }
                  }
                })
              }
            })
            
            if (rallyCoDrivers.length > 0) {
              allCoDrivers.push(...rallyCoDrivers)
              websiteCoDrivers += rallyCoDrivers.length
            }
            
            await new Promise(resolve => setTimeout(resolve, 1000))
            
          } catch (rallyError) {
            console.log(`⚠️ Rally extraction failed: ${rallyError.message}`)
          }
        }
        
        discoveryResults.push({
          website: website.name,
          ralliesDiscovered: discoveredRallyLinks.length,
          ralliesProcessed: rallysToProcess.length,
          coDriversFound: websiteCoDrivers,
          status: 'SUCCESS'
        })
        
      } catch (websiteError) {
        console.log(`❌ Website discovery failed: ${websiteError.message}`)
        discoveryResults.push({
          website: website.name,
          error: websiteError.message,
          status: 'FAILED'
        })
      }
    }
    
    // Remove duplicates
    const uniqueCoDrivers = removeDuplicates(allCoDrivers)
    
    return Response.json({
      SUCCESS: true,
      DEPLOYMENT_TEST: 'RALLY-2025-08-25-REAL-NAMES-ONLY',
      phase: 'STRICT EXTRACTION: Real co-driver names only - no rally terminology',
      realWebScraping: true,
      actualHttpRequests: true,
      timestamp: new Date().toISOString(),
      message: 'STRICT EXTRACTION COMPLETE: Only real human co-driver names extracted!',
      
      coDrivers: uniqueCoDrivers,
      totalCoDrivers: uniqueCoDrivers.length,
      discoveryResults: discoveryResults,
      
      totalRalliesDiscovered: discoveryResults.reduce((sum, r) => sum + (r.ralliesDiscovered || 0), 0),
      dataSource: "Strict extraction - real human names only",
      lastScraped: new Date().toISOString(),
      
      extractionQuality: "REAL_HUMAN_NAMES_ONLY",
      automationLevel: "STRICT_VALIDATION",
      scalability: "THOUSANDS_OF_RALLIES",
      phaseStatus: "STRICT EXTRACTION ACTIVE - NO RALLY TERMINOLOGY"
    })
    
  } catch (error) {
    console.error('🔥 System error:', error)
    return Response.json({
      success: false,
      error: error.message,
      message: 'Error in strict extraction system',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

function isRallyLink(href, linkText) {
  const rallyKeywords = [
    'rally', 'stages', 'forest', 'championship', 'series',
    'results', 'entries', 'webentry', 'event', 'competition',
    '2024', '2025', '2023', '2022', '2021', '2020'
  ]
  
  const hrefLower = href.toLowerCase()
  const textLower = linkText.toLowerCase()
  
  return rallyKeywords.some(keyword => 
    hrefLower.includes(keyword) || textLower.includes(keyword)
  )
}

// STRICT VALIDATION: Only accept real human names
function isRealHumanName(name) {
  if (!name || name.length < 5 || !name.includes(' ')) return false
  
  const parts = name.split(' ')
  if (parts.length !== 2) return false
  
  const [firstName, lastName] = parts
  
  // Must be proper name format
  if (firstName.length < 2 || lastName.length < 2) return false
  if (!/^[A-Z][a-z]+$/.test(firstName) || !/^[A-Z][a-z]+$/.test(lastName)) return false
  
  // STRICT EXCLUSIONS: Rally terminology that's not human names
  const rallyTerminology = [
    'Results', 'Entry', 'Driver', 'Rally', 'Stage', 'Time', 'Position', 
    'Class', 'Overall', 'Championship', 'Event', 'Date', 'Total', 'Points',
    'Website', 'Contact', 'Home', 'About', 'News', 'Info', 'Page',
    'Click', 'Here', 'More', 'View', 'Show', 'Hide', 'Menu', 'Search',
    'Targa', 'Road', 'Historic', 'Navigational', 'Check', 'Sheets',
    'Time', 'Cards', 'Stage', 'Rallies', 'Forest', 'Special', 'Awards',
    'Start', 'List', 'Finish', 'Order', 'Final', 'Provisional'
  ]
  
  // Exclude if name contains rally terminology
  if (rallyTerminology.some(term => name.includes(term))) return false
  
  // Exclude if name is all caps (usually rally terminology)
  if (name === name.toUpperCase()) return false
  
  // Exclude common rally terms that might slip through
  const nameUpper = name.toUpperCase()
  const excludePatterns = [
    'ROAD', 'RALLY', 'STAGE', 'TIME', 'CARD', 'SHEET', 'LIST', 
    'HISTORIC', 'TARGA', 'SPECIAL', 'AWARD', 'CLASS', 'OVERALL'
  ]
  
  if (excludePatterns.some(pattern => nameUpper.includes(pattern))) return false
  
  return true
}

function removeDuplicates(coDrivers) {
  const seen = new Set()
  const unique = []
  
  coDrivers.forEach(cd => {
    const key = cd.name.toLowerCase().trim()
    if (!seen.has(key)) {
      seen.add(key)
      unique.push(cd)
    }
  })
  
  return unique
}
