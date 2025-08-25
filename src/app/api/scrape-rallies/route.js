export async function GET() {
  return new Response(
    JSON.stringify({
      success: true,
      message: "RALLY LEAGUE API WORKING - BUILD SUCCESS!",
      timestamp: new Date().toISOString(),
      totalCoDrivers: 0,
      coDrivers: [],
      buildStatus: "COMPILED_SUCCESSFULLY"
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}
