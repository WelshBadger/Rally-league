import axios from 'axios'
import * as cheerio from 'cheerio'

export async function scrapeRalliesInfo() {
  try {
    console.log('🌐 STAGE 1: Discovering rally events on Rallies.info')
    
    // Stage 1: Get the main page and find rally event links
    const mainResponse = await axios.get('https://www.rallies.info/', {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    const $ = cheerio.load(mainResponse.data)
    const rallyEventLinks = new Set()
    
    // Look for links that might lead to rally events
    $('a[href]').each((index, element) => {
      const href = $(element).attr('href')
      const linkText = $(element).text().trim()
      
      // Find links that look like rally events
      if (href && (
        href.includes('webentry') ||
        href.includes('results') ||
        href.includes('rally') ||
        href.includes('2025') ||
        linkText.toLowerCase().includes('rally') ||
        linkText.toLowerCase().includes('results')
      )) {
        // Convert relative URLs to absolute
        const fullUrl = href.startsWith('http') ? href : `https://www.rallies.info${href}`
        rallyEventLinks.add(fullUrl)
        console.log(`🔗 FOUND RALLY LINK: ${linkText} -> ${fullUrl}`)
      }
    })
    
    console.log(`🔗 STAGE 1 COMPLETE: Found ${rallyEventLinks.size} potential rally event links`)
    
    // Stage 2: Scrape each rally event for co-driver data
    console.log('🌐 STAGE 2: Scraping individual rally events for co-driver data')
    
    const allCoDrivers = []
    const rallyEventArray = Array.from(rallyEventLinks).slice(0, 10) // Limit to first 10 events
    
    for (const eventUrl of rallyEventArray) {
      try {
        console.log(`📋 Scraping rally event: ${eventUrl}`)
        
        const eventResponse = await axios.get(eventUrl, {
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        })
        
        const eventPage = cheerio.load(eventResponse.data)
        
        // Look for co-driver patterns on this specific rally page
        const eventCoDrivers = extractCoDriversFromPage(eventPage, eventUrl)
        
        if (eventCoDrivers.length > 0) {
          allCoDrivers.push(...eventCoDrivers)
          console.log(`✅ Found ${eventCoDrivers.length} co-drivers on ${eventUrl}`)
        }
        
        // Small delay between requests to be respectful
        await new Promise(resolve => setTimeout(resolve, 1000))
        
      } catch (eventError) {
        console.log(`⚠️ Could not scrape event ${eventUrl}: ${eventError.message}`)
      }
    }
    
    console.log(`✅ STAGE 2 COMPLETE: Found ${allCoDrivers.length} total co-drivers from all rally events`)
    return allCoDrivers
    
  } catch (error) {
    console.error('❌ Rallies.info link discovery failed:', error.message)
    return []
  }
}

// Helper function to extract co-drivers from a specific rally page
function extractCoDriversFromPage($, pageUrl) {
  const coDrivers = []
  
  // Multiple extraction strategies for rally pages
  const strategies = [
    // Strategy 1: Look in tables
    () => {
      $('table tr').each((index, element) => {
        const rowText = $(element).text().trim()
        const matches = findCoDriverPatterns(rowText)
        matches.forEach(match => {
          coDrivers.push({
            codriver_name: match.codriver,
            driver_name: match.driver,
            rally_event: extractEventName($, pageUrl),
            source_url: pageUrl,
            scraped_at: new Date().toISOString()
          })
        })
      })
    },
    
    // Strategy 2: Look in divs with specific classes
    () => {
      $('.entry, .result, .crew, .competitor').each((index, element) => {
        const elementText = $(element).text().trim()
        const matches = findCoDriverPatterns(elementText)
        matches.forEach(match => {
          coDrivers.push({
            codriver_name: match.codriver,
            driver_name: match.driver,
            rally_event: extractEventName($, pageUrl),
            source_url: pageUrl,
            scraped_at: new Date().toISOString()
          })
        })
      })
    },
    
    // Strategy 3: Look in any text that contains "/"
    () => {
      $('*:contains("/")').each((index, element) => {
        const elementText = $(element).text().trim()
        if (elementText.length < 200) { // Avoid huge text blocks
          const matches = findCoDriverPatterns(elementText)
          matches.forEach(match => {
            coDrivers.push({
              codriver_name: match.codriver,
              driver_name: match.driver,
              rally_event: extractEventName($, pageUrl),
              source_url: pageUrl,
              scraped_at: new Date().toISOString()
            })
          })
        }
      })
    }
  ]
  
  // Try each strategy
  strategies.forEach(strategy => strategy())
  
  // Remove duplicates
  const uniqueCoDrivers = []
  const seen = new Set()
  
  coDrivers.forEach(cd => {
    const key = `${cd.codriver_name}-${cd.driver_name}`
    if (!seen.has(key)) {
      seen.add(key)
      uniqueCoDrivers.push(cd)
    }
  })
  
  return uniqueCoDrivers
}

// Helper function to find co-driver patterns in text
function findCoDriverPatterns(text) {
  const patterns = [
    /([A-Z][a-z]+ [A-Z][a-z]+)\s*\/\s*([A-Z][a-z]+ [A-Z][a-z]+)/g,
    /([A-Z][a-z]+ [A-Z][a-z]+)\s*$\s*([A-Z][a-z]+ [A-Z][a-z]+)\s*$/g,
    /Driver:\s*([A-Z][a-z]+ [A-Z][a-z]+)\s*Co-driver:\s*([A-Z][a-z]+ [A-Z][a-z]+)/gi,
    /([A-Z][a-z]+ [A-Z][a-z]+)\s*-\s*([A-Z][a-z]+ [A-Z][a-z]+)/g
  ]
  
  const matches = []
  
  patterns.forEach(pattern => {
    const patternMatches = text.matchAll(pattern)
    for (const match of patternMatches) {
      if (match[1] && match[2] && match[1].length > 4 && match[2].length > 4) {
        matches.push({
          driver: match[1].trim(),
          codriver: match[2].trim()
        })
      }
    }
  })
  
  return matches
}

// Helper function to extract event name from page
function extractEventName($, pageUrl) {
  // Try to find the rally name in various places
  const titleText = $('title').text()
  const h1Text = $('h1').first().text()
  const urlParts = pageUrl.split('/')
  
  if (titleText && titleText.toLowerCase().includes('rally')) {
    return titleText.trim()
  }
  
  if (h1Text && h1Text.toLowerCase().includes('rally')) {
    return h1Text.trim()
  }
  
  // Extract from URL
  const eventFromUrl = urlParts.find(part => 
    part.length > 3 && 
    !['www', 'com', 'co', 'uk', 'webentry', 'results'].includes(part)
  )
  
  return eventFromUrl || 'Unknown Rally Event'
}
