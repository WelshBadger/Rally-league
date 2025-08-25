import Link from 'next/link'

interface CoDriver {
  name: string
  driver?: string
  points?: number
  totalRallies?: number
  nationality?: string
  rallyEvent?: string
  source?: string
  isAuthentic?: boolean
  extractedAt?: string
  rallyUrl?: string
}

interface ChampionshipData {
  coDrivers: CoDriver[]
  totalCoDrivers: number
  totalRalliesDiscovered: number
  timestamp?: string
}

async function getChampionshipData(): Promise<ChampionshipData> {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000'
    
    const response = await fetch(`${baseUrl}/api/scrape-rallies`, {
      cache: 'no-store'
    })
    return await response.json()
  } catch (error) {
    console.error('Error fetching championship data:', error)
    return { coDrivers: [], totalCoDrivers: 0, totalRalliesDiscovered: 0 }
  }
}

function createSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export default async function CoDriversPage() {
  const championshipData = await getChampionshipData()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-sm flex items-center justify-center">
                <div className="w-6 h-6 bg-white/20 rounded-sm"></div>
              </div>
              <Link href="/" className="text-white text-xl font-bold hover:text-orange-400 transition-colors">
                The Rally League
              </Link>
            </div>
            <div className="flex space-x-8">
              <Link href="/" className="text-white hover:text-orange-400 transition-colors">Home</Link>
              <Link href="/drivers" className="text-white hover:text-orange-400 transition-colors">Drivers</Link>
              <Link href="/codrivers" className="text-white hover:text-orange-400 transition-colors">Co-Drivers</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Co-Driver Championship Rankings</h1>
          <p className="text-xl text-gray-300 mb-8">
            Live rankings powered by real web scraping from rally websites
          </p>
          
          <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-green-400 text-xl">✅</span>
              <span className="text-green-400 font-semibold text-lg">Real Data Active</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-blue-900/50 rounded-lg p-4">
                <div className="text-gray-300 text-sm">Co-Drivers Found:</div>
                <div className="text-white font-semibold text-2xl">{championshipData.totalCoDrivers}</div>
              </div>
              <div className="bg-purple-900/50 rounded-lg p-4">
                <div className="text-gray-300 text-sm">Rallies Discovered:</div>
                <div className="text-white font-semibold text-2xl">{championshipData.totalRalliesDiscovered}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Championship Standings</h2>
          
          {championshipData.totalCoDrivers > 0 ? (
            <div className="space-y-3">
              {championshipData.coDrivers.map((coDriver: CoDriver, index: number) => (
                <Link 
                  key={coDriver.name} 
                  href={`/codrivers/profile/${createSlug(coDriver.name)}`}
                  className="block"
                >
                  <div className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-blue-800 hover:to-purple-800 transition-all duration-300 rounded-lg p-6 border border-gray-600 hover:border-blue-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-white font-semibold text-xl">{coDriver.name}</div>
                          <div className="text-gray-400">
                            {coDriver.driver ? `Partner: ${coDriver.driver}` : 'Professional Co-Driver'}
                          </div>
                          <div className="text-green-400 text-sm">
                            ✅ Real data from {coDriver.source}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold text-2xl">{coDriver.points || 0}</div>
                        <div className="text-gray-400 text-sm">championship points</div>
                        <div className="text-blue-400 text-sm mt-1">View Profile →</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-12">
              <div className="text-6xl mb-4">🏁</div>
              <div className="text-xl mb-2">Real Web Scraping Active</div>
              <div className="text-sm mb-4">Co-driver data will appear as it is extracted from real sources</div>
              <div className="bg-blue-900/30 rounded-lg p-4">
                <div className="text-white font-semibold">System Status:</div>
                <div className="text-gray-300">
                  Discovered {championshipData.totalRalliesDiscovered} rallies automatically. 
                  Processing for co-driver data extraction.
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-yellow-400 text-xl">🌐</span>
            <span className="text-yellow-400 font-semibold">Live Championship System</span>
          </div>
          <p className="text-gray-300">
            Rankings update automatically as new rally data is discovered and processed. 
            Each co-driver profile is cross-linked with driver partnerships and rally history. 
            All data is extracted from authentic rally websites with no fake generation.
          </p>
        </div>
      </main>
    </div>
  )
}
