import { discoverAllRallies } from './rallyDiscovery.js'

// MULTI-WEBSITE AUTOMATIC DISCOVERY
export const rallyWebsites = [
  {
    name: 'Rallies.info',
    url: 'https://www.rallies.info/',
    baseUrl: 'https://www.rallies.info',
    expectedRallies: 500, // Estimated rally count
    discoveryStrategy: 'year_and_event_scanning',
    priority: 'high'
  },
  {
    name: 'EWRC Results',
    url: 'https://www.ewrc-results.com/',
    baseUrl: 'https://www.ewrc-results.com',
    expectedRallies: 300,
    discoveryStrategy: 'championship_scanning',
    priority: 'high'
  },
  {
    name: 'British Rally Championship',
    url: 'https://www.britishrallychampionship.co.uk/',
    baseUrl: 'https://www.britishrallychampionship.co.uk',
    expectedRallies: 50,
    discoveryStrategy: 'official_calendar',
    priority: 'medium'
  },
  {
    name: 'Irish Rallying',
    url: 'https://irishrallying.com/',
    baseUrl: 'https://irishrallying.com',
    expectedRallies: 100,
    discoveryStrategy: 'regional_scanning',
    priority: 'medium'
  },
  {
    name: 'Scottish Rally Championship',
    url: 'https://www.scottishrallying.com/',
    baseUrl: 'https://www.scottishrallying.com',
    expectedRallies: 80,
    discoveryStrategy: 'championship_series',
    priority: 'medium'
  }
]

// AUTOMATIC MULTI-WEBSITE DISCOVERY
export async function discoverAllRalliesAcrossAllWebsites() {
  console.log('🌐 MULTI-WEBSITE DISCOVERY: Scanning all rally websites for thousands of rallies')
  
  const allDiscoveredRallies = []
  const websiteResults = []
  
  for (const website of rallyWebsites) {
    try {
      console.log(`🔍 Discovering rallies on ${website.name}`)
      
      const websiteRallies = await discoverAllRallies(website)
      
      allDiscoveredRallies.push(...websiteRallies)
      
      websiteResults.push({
        website: website.name,
        ralliesDiscovered: websiteRallies.length,
        expectedRallies: website.expectedRallies,
        coverage: `${websiteRallies.length}/${website.expectedRallies}`,
        status: websiteRallies.length > 0 ? 'SUCCESS' : 'NO_RALLIES_FOUND',
        discoveredAt: new Date().toISOString()
      })
      
      console.log(`✅ ${website.name}: Discovered ${websiteRallies.length} rallies`)
      
      // Small delay between websites to be respectful
      await new Promise(resolve => setTimeout(resolve, 2000))
      
    } catch (error) {
      console.error(`❌ Failed to discover rallies on ${website.name}:`, error.message)
      
      websiteResults.push({
        website: website.name,
        ralliesDiscovered: 0,
        error: error.message,
        status: 'DISCOVERY_FAILED'
      })
    }
  }
  
  console.log(`🌐 MULTI-WEBSITE DISCOVERY COMPLETE: Found ${allDiscoveredRallies.length} total rallies`)
  
  return {
    allRallies: allDiscoveredRallies,
    websiteResults: websiteResults,
    totalRalliesDiscovered: allDiscoveredRallies.length,
    websitesScanned: rallyWebsites.length,
    successfulWebsites: websiteResults.filter(r => r.status === 'SUCCESS').length
  }
}
