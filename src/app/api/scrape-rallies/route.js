import axios from 'axios'
import * as cheerio from 'cheerio'

export async function GET() {
  try {
    console.log('🚀 PURE WEB SCRAPING: Only data extracted from actual rally websites')
    
    const foundCoDrivers = []
    const scrapingResults = []
    
    // REAL RALLY WEBSITES - Actual sources with co-driver data
    const realRallyWebsites = [
      {
        name: "Rally Results Archive",
        url: "https://www.rallybase.nl/index.php?p=results",
        type: "results"
      },
      {
        name: "UK Rally Results",
        url: "https://www.ukrallying.com/results/",
        type: "championship"
      }
    ]
    
    // SCRAPE EACH REAL RALLY WEBSITE - NO MANUAL ADDITIONS
    for (const website of realRallyWebsites) {
      try {
        console.log(`🌐 SCRAPING: ${website.name}`)
        
        const response = await axios.get(website.url, {
          timeout: 15000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        })
        
        const $ = cheerio.load(response.data)
        const websiteCoDrivers = new Set()
        
        // EXTRACT CO-DRIVERS: Look for driver/co-driver patterns
        $('table tr, .results tr, .entry tr').each((index, element) => {
          const rowText = $(element).text().trim()
          
          // Pattern: Driver / Co-driver
          const coDriverPattern = /([A-Z][a-z]+ [A-Z][a-z]+)\s*\/\s*([A-Z][a-z]+ [A-Z][a-z]+)/g
          const matches = rowText.matchAll(coDriverPattern)
          
          for (const match of matches) {
            if (match[2] && match[2].length > 5) {
              const coDriverName = match[2].trim()
              if (isValidName(coDriverName)) {
                websiteCoDrivers.add(coDriverName)
                console.log(`✅ FOUND REAL CO-DRIVER: ${coDriverName} from ${website.name}`)
              }
            }
          }
        })
        
        // Convert to array and add ONLY what was actually found
        const coDriverArray = Array.from(websiteCoDrivers)
        coDriverArray.forEach(name => {
          foundCoDrivers.push({
            name: name,
            points: 0, // Will be calculated from real rally positions in Phase 3
            rallies: 1,
            nationality: "Unknown", // Will be extracted from real data
            source: website.name,
            isAuthentic: true,
            scrapedFrom: website.url,
            extractedAt: new Date().toISOString()
          })
        })
        
        scrapingResults.push({
          website: website.name,
          url: website.url,
          coDriversFound: coDriverArray.length,
          status: "SUCCESS",
          scrapedAt: new Date().toISOString()
        })
        
      } catch (error) {
        console.log(`⚠️ Could not scrape ${website.name}: ${error.message}`)
        scrapingResults.push({
          website: website.name,
          url: website.url,
          error: error.message,
          status: "FAILED"
        })
      }
    }
    
    // NO MANUAL ADDITIONS - Only return what was actually scraped
    return Response.json({
      SUCCESS: true,
      DEPLOYMENT_TEST: 'RALLY-2025-08-25-PURE-WEB-SCRAPING',
      phase: 'PURE WEB SCRAPING: Only authentic data extracted from rally websites',
      realWebScraping: true,
      actualHttpRequests: true,
      timestamp: new Date().toISOString(),
      message: 'PURE WEB SCRAPING COMPLETE: Only authentic co-drivers found by scraping!',
      
      coDrivers: foundCoDrivers, // ONLY what was actually found by scraping
      totalCoDrivers: foundCoDrivers.length, // Could be 0 if nothing found
      scrapingResults: scrapingResults,
      dataSource: "Pure web scraping from real rally websites",
      lastScraped: new Date().toISOString(),
      
      websitesAttempted: realRallyWebsites.length,
      successfulScrapes: scrapingResults.filter(r => r.status === "SUCCESS").length,
      failedScrapes: scrapingResults.filter(r => r.status === "FAILED").length,
      phaseStatus: "PURE WEB SCRAPING - NO MANUAL ADDITIONS"
    })
    
  } catch (error) {
    console.error('🔥 Pure web scraping error:', error)
    return Response.json({
      success: false,
      error: error.message,
      message: 'Error in pure web scraping system',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

function isValidName(name) {
  if (!name || name.length < 5 || !name.includes(' ')) return false
  
  const parts = name.split(' ')
  if (parts.length !== 2) return false
  
  const [firstName, lastName] = parts
  if (firstName.length < 2 || lastName.length < 2) return false
  if (!/^[A-Z][a-z]+$/.test(firstName) || !/^[A-Z][a-z]+$/.test(lastName)) return false
  
  return true
}
