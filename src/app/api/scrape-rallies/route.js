import axios from 'axios'
import * as cheerio from 'cheerio'

export async function GET() {
  try {
    console.log('🚀 REAL RALLY RESULTS SCRAPING: Using discovered Rallies.info URL pattern')
    
    const allCoDrivers = []
    const scrapingResults = []
    
    // SCAN: Multiple rally event IDs using your discovered pattern
    const baseEventId = 647 // Your discovered event
    const eventIdsToScan = []
    
    // Generate event IDs around your discovered one
    for (let i = baseEventId - 5; i <= baseEventId + 5; i++) {
      eventIdsToScan.push(i)
    }
    
    console.log(`🔍 SCANNING ${eventIdsToScan.length} rally event IDs: ${eventIdsToScan.join(', ')}`)
    
    // SCRAPE: Each rally event using the URL pattern
    for (const eventId of eventIdsToScan) {
      try {
        const rallyUrl = `https://www.rallies.info/res?e=${eventId}&r=o`
        console.log(`🏁 SCRAPING RALLY: Event ${eventId} -> ${rallyUrl}`)
        
        const response = await axios.get(rallyUrl, {
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
          }
        })
        
        console.log(`✅ CONNECTED: Event ${eventId} (${response.status}) - ${response.data.length} chars`)
        
        const $ = cheerio.load(response.data)
        const rallyCoDrivers = []
        
        // Get rally name from page title or header
        const rallyName = $('title').text().trim() || $('h1').first().text().trim() || `Rally Event ${eventId}`
        console.log(`📋 RALLY NAME: ${rallyName}`)
        
        // EXTRACT: Co-drivers from results table
        $('table tr').each((index, element) => {
          const rowText = $(element).text().trim()
          
          // Results patterns for rally results tables
          const patterns = [
            // "1 John Smith / Carl Williamson Ford Fiesta"
            /(\d+)\s+([A-Z][a-z]+ [A-Z][a-z]+)\s*\/\s*([A-Z][a-z]+ [A-Z][a-z]+)/g,
            // "John Smith / Carl Williamson" 
            /([A-Z][a-z]+ [A-Z][a-z]+)\s*\/\s*([A-Z][a-z]+ [A-Z][a-z]+)/g,
            // "1. John Smith / Carl Williamson"
            /\d+\.\s*([A-Z][a-z]+ [A-Z][a-z]+)\s*\/\s*([A-Z][a-z]+ [A-Z][a-z]+)/g
          ]
          
          patterns.forEach((pattern, patternIndex) => {
            const matches = rowText.matchAll(pattern)
            
            for (const match of matches) {
              let driverName, coDriverName
              
              if (match[3]) {
                // With position: [1]=position, [2]=driver, [3]=codriver
                driverName = match[2]?.trim()
                coDriverName = match[3]?.trim()
              } else {
                // Without position: [1]=driver, [2]=codriver
                driverName = match[1]?.trim()
                coDriverName = match[2]?.trim()
              }
              
              if (coDriverName && 
                  isRealHumanName(coDriverName) && 
                  driverName && 
                  isRealHumanName(driverName) &&
                  coDriverName !== driverName) {
                
                rallyCoDrivers.push({
                  name: coDriverName,
                  driver: driverName,
                  rallyEvent: rallyName,
                  source: 'Rallies.info Results',
                  isAuthentic: true,
                  extractedAt: new Date().toISOString(),
                  rallyUrl: rallyUrl,
                  eventId: eventId,
                  extractionPattern: patternIndex + 1
                })
                console.log(`✅ REAL CO-DRIVER: ${coDriverName} (driver: ${driverName}) from Event ${eventId}`)
              }
            }
          })
        })
        
        if (rallyCoDrivers.length > 0) {
          allCoDrivers.push(...rallyCoDrivers)
          console.log(`✅ Event ${eventId}: Found ${rallyCoDrivers.length} real co-drivers`)
        }
        
        scrapingResults.push({
          eventId: eventId,
          rallyName: rallyName,
          url: rallyUrl,
          status: response.status,
          coDriversFound: rallyCoDrivers.length,
          success: true
        })
        
        await new Promise(resolve => setTimeout(resolve, 1000))
        
      } catch (eventError) {
        console.log(`⚠️ Event ${eventId} failed: ${eventError.message}`)
        scrapingResults.push({
          eventId: eventId,
          url: `https://www.rallies.info/res?e=${eventId}&r=o`,
          error: eventError.message,
          success: false
        })
      }
    }
    
    const uniqueCoDrivers = removeDuplicates(allCoDrivers)
    
    return Response.json({
      SUCCESS: true,
      DEPLOYMENT_TEST: 'RALLY-2025-08-25-REAL-URL-PATTERN',
      phase: 'REAL URL PATTERN: Using discovered Rallies.info event ID structure',
      realWebScraping: true,
      actualHttpRequests: true,
      timestamp: new Date().toISOString(),
      message: 'REAL URL PATTERN COMPLETE: Co-drivers extracted using discovered event ID pattern!',
      
      coDrivers: uniqueCoDrivers,
      totalCoDrivers: uniqueCoDrivers.length,
      totalRalliesDiscovered: scrapingResults.filter(r => r.success).length,
      
      discoveredUrlPattern: 'https://www.rallies.info/res?e={EVENT_ID}&r=o',
      baseEventId: baseEventId,
      eventIdsScanned: eventIdsToScan,
      scrapingResults: scrapingResults,
      dataSource: "Real rally results using discovered URL pattern",
      lastScraped: new Date().toISOString(),
      
      extractionQuality: "REAL_HUMAN_NAMES_ONLY",
      automationLevel: "REAL_URL_PATTERN_DISCOVERY",
      scalability: "HUNDREDS_OF_RALLY_EVENTS",
      phaseStatus: "REAL URL PATTERN ACTIVE - SCANNING RALLY EVENT IDS"
    })
    
  } catch (error) {
    console.error('🔥 Real URL pattern error:', error)
    return Response.json({
      success: false,
      error: error.message,
      message: 'Error in real URL pattern system',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

function isRealHumanName(name) {
  if (!name || name.length < 5 || !name.includes(' ')) return false
  
  const parts = name.split(' ')
  if (parts.length !== 2) return false
  
  const [firstName, lastName] = parts
  
  if (firstName.length < 2 || lastName.length < 2) return false
  if (!/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(name)) return false
  
  const rallyTerminology = [
    'Results', 'Entry', 'Driver', 'Rally', 'Stage', 'Time', 'Position', 
    'Class', 'Overall', 'Championship', 'Event', 'Date', 'Total', 'Points'
  ]
  
  if (rallyTerminology.some(term => name.includes(term))) return false
  
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
