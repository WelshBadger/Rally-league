import axios from 'axios'
import * as cheerio from 'cheerio'

export async function scrapeEWRC() {
  try {
    console.log('🌐 SCRAPING: EWRC Results')
    
    const response = await axios.get('https://www.ewrc-results.com/results/2025/uk/', {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    const $ = cheerio.load(response.data)
    const coDrivers = []
    
    // EWRC specific patterns
    $('table.results tr, .crew-info').each((index, element) => {
      const rowText = $(element).text().trim()
      
      // Pattern: "Navigator: Name" or "Co-driver: Name"
      const navigatorPattern = /(?:Navigator|Co-driver):\s*([A-Z][a-z]+ [A-Z][a-z]+)/gi
      const crewPattern = /([A-Z][a-z]+ [A-Z][a-z]+)\s*\/\s*([A-Z][a-z]+ [A-Z][a-z]+)/g
      
      let matches = rowText.matchAll(navigatorPattern)
      for (const match of matches) {
        if (match[1] && match[1].length > 5) {
          coDrivers.push({
            navigator: match[1].trim(),
            event_name: 'EWRC Event',
            source_url: 'https://www.ewrc-results.com/results/2025/uk/',
            scraped_at: new Date().toISOString()
          })
        }
      }
      
      matches = rowText.matchAll(crewPattern)
      for (const match of matches) {
        if (match[2] && match[2].length > 5) {
          coDrivers.push({
            navigator: match[2].trim(),
            pilot: match[1].trim(),
            event_name: 'EWRC Event',
            source_url: 'https://www.ewrc-results.com/results/2025/uk/',
            scraped_at: new Date().toISOString()
          })
        }
      }
    })
    
    console.log(`✅ EWRC: Found ${coDrivers.length} co-drivers`)
    return coDrivers
    
  } catch (error) {
    console.error('❌ EWRC scraping failed:', error.message)
    return []
  }
}
