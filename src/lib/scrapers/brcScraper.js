import axios from 'axios'
import * as cheerio from 'cheerio'

export async function scrapeBRC() {
  try {
    console.log('🌐 SCRAPING: British Rally Championship')
    
    const response = await axios.get('https://www.britishrallychampionship.co.uk/entries/', {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    const $ = cheerio.load(response.data)
    const coDrivers = []
    
    // BRC specific patterns
    $('table.entries tr, .crew-entry').each((index, element) => {
      const rowText = $(element).text().trim()
      
      // BRC pattern: "Driver (Co-driver)" or "Driver / Co-driver"
      const parenthesesPattern = /([A-Z][a-z]+ [A-Z][a-z]+)\s*$([A-Z][a-z]+ [A-Z][a-z]+)$/g
      const slashPattern = /([A-Z][a-z]+ [A-Z][a-z]+)\s*\/\s*([A-Z][a-z]+ [A-Z][a-z]+)/g
      
      let matches = rowText.matchAll(parenthesesPattern)
      for (const match of matches) {
        if (match[2] && match[2].length > 5) {
          coDrivers.push({
            crew_navigator: match[2].trim(),
            crew_driver: match[1].trim(),
            championship_event: 'BRC Event',
            source_url: 'https://www.britishrallychampionship.co.uk/entries/',
            scraped_at: new Date().toISOString()
          })
        }
      }
      
      matches = rowText.matchAll(slashPattern)
      for (const match of matches) {
        if (match[2] && match[2].length > 5) {
          coDrivers.push({
            crew_navigator: match[2].trim(),
            crew_driver: match[1].trim(),
            championship_event: 'BRC Event',
            source_url: 'https://www.britishrallychampionship.co.uk/entries/',
            scraped_at: new Date().toISOString()
          })
        }
      }
    })
    
    console.log(`✅ BRC: Found ${coDrivers.length} co-drivers`)
    return coDrivers
    
  } catch (error) {
    console.error('❌ BRC scraping failed:', error.message)
    return []
  }
}
