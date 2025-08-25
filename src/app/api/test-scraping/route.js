export async function GET() {
  try {
    return Response.json({
      SUCCESS: true,
      DEPLOYMENT_TEST: 'TEST-SCRAPING-2025-08-25',
      phase: 'REAL Web Scraping - TEST ENDPOINT',
      message: 'Test scraping endpoint working perfectly!',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}
