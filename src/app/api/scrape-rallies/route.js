export async function GET() {
  return Response.json({
    message: "API ROUTE IS WORKING!",
    timestamp: new Date().toISOString(),
    status: "SUCCESS"
  })
}
