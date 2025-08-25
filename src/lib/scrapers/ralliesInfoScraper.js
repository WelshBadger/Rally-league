import axios from 'axios'
import * as cheerio from 'cheerio'

export async function scrapeRalliesInfo() {
  try {
    console.log('🌐 SCRAPING: Rallies.info')
    
    const response = await axios.get('https://www.rallies.info/webentry/2025/', {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    const $ = cheerio.load(response.data)
    const coDrivers = []
    
    // Rallies.info specific pattern: "Driver / Co-driver"
    $('table tr, .entry-list tr').each((index, element) => {
      const rowText = $(element).text().trim()
      
      const pattern = /([A-Z][a-z]+ [A-Z][a-z]+)\s*\/\s*([A-Z][a-z]+ [A-Z][a-z]+)/g
      const matches = rowText.matchAll(pattern)
      
      for (const match of matches) {
        if (match[2] && match[2].length > 5) {
          coDrivers.push({
            codriver_name: match[2].trim(),
            driver_name: match[1].trim(),
            rally_event: 'Unknown Event',
            source_url: 'https://www.rallies.info/webentry/2025/',
            scraped_at: new Date().toISOString()
          })
        }
      }
    })
    
    console.log(`✅ Rallies.info: Found ${coDrivers.length} co-drivers`)
    return coDrivers
    
  } catch (error) {
    console.error('❌ Rallies.info scraping failed:', error.message)
    return []
  }
}
