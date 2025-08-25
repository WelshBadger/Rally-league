export async function GET() {
  try {
    console.log('🚀 SIMPLE API TEST: Checking if route works')
    
    return Response.json({
      SUCCESS: true,
      message: "API ROUTE IS WORKING!",
      timestamp: new Date().toISOString(),
      phase: "API Route Test",
      totalCoDrivers: 0,
      coDrivers: [],
      status: "API_ROUTE_DEPLOYED_SUCCESSFULLY"
    })
    
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
      message: 'API Route Error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
