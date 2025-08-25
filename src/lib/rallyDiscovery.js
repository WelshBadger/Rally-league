import axios from 'axios'
import * as cheerio from 'cheerio'

// AUTOMATIC RALLY DISCOVERY - Finds ALL rallies on any website
export async function discoverAllRallies(baseWebsite) {
  try {
    console.log(`🔍 AUTO-DISCOVERY: Scanning ${baseWebsite.name} for ALL rallies`)
    
    const discoveredRallies = new Set()
    const visitedUrls = new Set()
    
    // STAGE 1: Get main website and find rally patterns
    const mainResponse = await axios.get(baseWebsite.url, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    const $ = cheerio.load(mainResponse.data)
    
    // DISCOVERY PATTERNS - Find links that lead to rally data
    const rallyDiscoveryPatterns = [
      // Year-based discovery
      /\/202[0-9]\//g,
      /\/201[0-9]\//g,
      // Event-based discovery  
      /\/webentry\//g,
      /\/results\//g,
      /\/events\//g,
      /\/rallies\//g,
      /\/championship\//g,
      /\/series\//g,
      // Specific rally name patterns
      /\/[a-z]+-rally/g,
      /\/[a-z]+-stages/g,
      /\/[a-z]+-forest/g
    ]
    
    // SCAN ALL LINKS on the website
    $('a[href]').each((index, element) => {
      const href = $(element).attr('href')
      const linkText = $(element).text().trim()
      
      if (href && isRallyRelatedLink(href, linkText)) {
        const fullUrl = href.startsWith('http') ? href : `${baseWebsite.baseUrl}${href}`
        
        if (!visitedUrls.has(fullUrl)) {
          discoveredRallies.add({
            url: fullUrl,
            name: extractRallyName(linkText, href),
            type: classifyRallyType(href, linkText),
            source: baseWebsite.name,
            discoveredAt: new Date().toISOString()
          })
          visitedUrls.add(fullUrl)
          console.log(`🔗 DISCOVERED: ${linkText} -> ${fullUrl}`)
        }
      }
    })
    
    // STAGE 2: Deep discovery - follow category links
    const categoryLinks = findCategoryLinks($, baseWebsite.url)
    
    for (const categoryLink of categoryLinks.slice(0, 5)) { // Limit to prevent timeout
      try {
        const categoryRallies = await discoverRalliesInCategory(categoryLink)
        categoryRallies.forEach(rally => discoveredRallies.add(rally))
      } catch (error) {
        console.log(`⚠️ Category discovery failed: ${categoryLink}`)
      }
    }
    
    const rallyArray = Array.from(discoveredRallies)
    console.log(`🔍 AUTO-DISCOVERY COMPLETE: Found ${rallyArray.length} rallies on ${baseWebsite.name}`)
    
    return rallyArray
    
  } catch (error) {
    console.error(`❌ Rally discovery failed for ${baseWebsite.name}:`, error.message)
    return []
  }
}

// Helper: Identify rally-related links automatically
function isRallyRelatedLink(href, linkText) {
  const rallyKeywords = [
    'rally', 'stages', 'forest', 'tarmac', 'gravel', 'hill', 'sprint',
    'championship', 'series', 'event', 'competition', 'motorsport',
    'results', 'entries', 'webentry', 'startlist', 'provisional',
    'overall', 'class', 'stage', 'special', 'regularity'
  ]
  
  const yearPattern = /202[0-9]|201[0-9]/
  
  const hrefLower = href.toLowerCase()
  const textLower = linkText.toLowerCase()
  
  // Check for rally keywords or year patterns
  return rallyKeywords.some(keyword => 
    hrefLower.includes(keyword) || textLower.includes(keyword)
  ) || yearPattern.test(href) || yearPattern.test(linkText)
}

// Helper: Extract rally name from link
function extractRallyName(linkText, href) {
  if (linkText && linkText.length > 3 && linkText.length < 100) {
    return linkText.trim()
  }
  
  // Extract from URL if no good link text
  const urlParts = href.split('/')
  const rallyPart = urlParts.find(part => 
    part.length > 3 && 
    !['www', 'com', 'co', 'uk', 'http', 'https'].includes(part)
  )
  
  return rallyPart || 'Unknown Rally'
}

// Helper: Classify rally type from URL/text
function classifyRallyType(href, linkText) {
  const combined = `${href} ${linkText}`.toLowerCase()
  
  if (combined.includes('championship') || combined.includes('series')) return 'championship'
  if (combined.includes('club')) return 'club'
  if (combined.includes('historic')) return 'historic'
  if (combined.includes('stage')) return 'stage'
  if (combined.includes('road')) return 'road'
  if (combined.includes('forest')) return 'forest'
  if (combined.includes('tarmac')) return 'tarmac'
  
  return 'rally'
}

// Helper: Find category/section links for deeper discovery
function findCategoryLinks($, baseUrl) {
  const categoryLinks = []
  
  // Look for navigation sections that might contain rally categories
  $('nav a, .menu a, .navigation a, .category a').each((index, element) => {
    const href = $(element).attr('href')
    const text = $(element).text().trim()
    
    if (href && isRallyRelatedLink(href, text)) {
      const fullUrl = href.startsWith('http') ? href : `${baseUrl}${href}`
      categoryLinks.push(fullUrl)
    }
  })
  
  return categoryLinks
}

// Deep discovery within categories
async function discoverRalliesInCategory(categoryUrl) {
  try {
    const response = await axios.get(categoryUrl, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    const $ = cheerio.load(response.data)
    const categoryRallies = []
    
    $('a[href]').each((index, element) => {
      const href = $(element).attr('href')
      const linkText = $(element).text().trim()
      
      if (href && isRallyRelatedLink(href, linkText)) {
        categoryRallies.push({
          url: href.startsWith('http') ? href : `${categoryUrl}${href}`,
          name: extractRallyName(linkText, href),
          type: classifyRallyType(href, linkText),
          category: categoryUrl,
          discoveredAt: new Date().toISOString()
        })
      }
    })
    
    return categoryRallies
    
  } catch (error) {
    console.log(`⚠️ Category discovery failed: ${categoryUrl}`)
    return []
  }
}
