import { scrapeRalliesInfo } from '../../../lib/scrapers/ralliesInfoScraper.js'
import { scrapeEWRC } from '../../../lib/scrapers/ewrcScraper.js'
import { scrapeBRC } from '../../../lib/scrapers/brcScraper.js'
import { saveToWebsiteDatabase, poolCoDriverData, saveUnifiedData } from '../../../lib/fieldMatcher.js'

export async function GET() {
  try {
    console.log('🚀 MULTI-DATABASE SCRAPING: Website-specific databases with field matching')
    
    const scrapingResults = []
    let totalCoDriversFound = 0
    
    // STEP 1: Scrape each website with its specific scraper
    console.log('📊 PHASE 1: Scraping individual websites')
    
    // Scrape Rallies.info
    const ralliesInfoData = await scrapeRalliesInfo()
    if (ralliesInfoData.length > 0) {
      await saveToWebsiteDatabase('rallies_info', ralliesInfoData)
      totalCoDriversFound += ralliesInfoData.length
      scrapingResults.push({
        website: 'Rallies.info',
        coDriversFound: ralliesInfoData.length,
        status: 'SUCCESS',
        database: 'rallies_info_codrivers'
      })
    } else {
      scrapingResults.push({
        website: 'Rallies.info',
        coDriversFound: 0,
        status: 'NO_DATA',
        database: 'rallies_info_codrivers'
      })
    }
    
    // Scrape EWRC Results
    const ewrcData = await scrapeEWRC()
    if (ewrcData.length > 0) {
      await saveToWebsiteDatabase('ewrc', ewrcData)
      totalCoDriversFound += ewrcData.length
      scrapingResults.push({
        website: 'EWRC Results',
        coDriversFound: ewrcData.length,
        status: 'SUCCESS',
        database: 'ewrc_codrivers'
      })
    } else {
      scrapingResults.push({
        website: 'EWRC Results',
        coDriversFound: 0,
        status: 'NO_DATA',
        database: 'ewrc_codrivers'
      })
    }
    
    // Scrape British Rally Championship
    const brcData = await scrapeBRC()
    if (brcData.length > 0) {
      await saveToWebsiteDatabase('brc', brcData)
      totalCoDriversFound += brcData.length
      scrapingResults.push({
        website: 'British Rally Championship',
        coDriversFound: brcData.length,
        status: 'SUCCESS',
        database: 'brc_codrivers'
      })
    } else {
      scrapingResults.push({
        website: 'British Rally Championship',
        coDriversFound: 0,
        status: 'NO_DATA',
        database: 'brc_codrivers'
      })
    }
    
    console.log(`📊 PHASE 1 COMPLETE: Found ${totalCoDriversFound} co-drivers across all websites`)
    
    // STEP 2: Pool and match data from all website databases
    console.log('🔄 PHASE 2: Pooling and matching data from website databases')
    
    const unifiedData = await poolCoDriverData()
    const savedUnifiedData = await saveUnifiedData(unifiedData)
    
    console.log(`🔄 PHASE 2 COMPLETE: ${savedUnifiedData.length} unique co-drivers in unified database`)
    
    // STEP 3: Return the unified results
    return Response.json({
      SUCCESS: true,
      DEPLOYMENT_TEST: 'RALLY-2025-08-25-MULTI-DATABASE-ARCHITECTURE',
      phase: 'MULTI-DATABASE SCRAPING: Website-specific databases with field matching',
      realWebScraping: true,
      actualHttpRequests: true,
      timestamp: new Date().toISOString(),
      message: 'MULTI-DATABASE SCRAPING COMPLETE: Co-drivers extracted and unified!',
      
      // Return unified co-drivers from master database
      coDrivers: savedUnifiedData,
      totalCoDrivers: savedUnifiedData.length,
      
      // Individual website results
      websiteResults: scrapingResults,
      totalScrapedAcrossAllSites: totalCoDriversFound,
      
      // Database information
      databaseArchitecture: {
        websiteSpecificTables: ['rallies_info_codrivers', 'ewrc_codrivers', 'brc_codrivers'],
        unifiedTable: 'unified_codrivers',
        fieldMatching: 'Active',
        dataSources: scrapingResults.map(r => r.website)
      },
      
      dataSource: "Multi-database architecture with field matching",
      lastScraped: new Date().toISOString(),
      
      websitesAttempted: 3,
      successfulScrapes: scrapingResults.filter(r => r.status === "SUCCESS").length,
      noDataScrapes: scrapingResults.filter(r => r.status === "NO_DATA").length,
      
      phaseStatus: "MULTI-DATABASE ARCHITECTURE COMPLETE - PROFESSIONAL DATA AGGREGATION ACTIVE"
    })
    
  } catch (error) {
    console.error('🔥 Multi-database scraping error:', error)
    return Response.json({
      success: false,
      error: error.message,
      message: 'Error in multi-database scraping system',
      phase: 'MULTI-DATABASE SCRAPING - ERROR',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
