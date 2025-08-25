import Link from 'next/link'
import { notFound } from 'next/navigation'

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
  extractionPattern?: number
}

interface ChampionshipData {
  coDrivers: CoDriver[]
  totalCoDrivers: number
  totalRalliesDiscovered: number
  timestamp?: string
  SUCCESS?: boolean
  message?: string
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

interface PageProps {
  params: {
    slug: string
  }
}

export default async function DriverProfile({ params }: PageProps) {
  const championshipData = await getChampionshipData()
  
  // Find driver by matching with co-driver's driver field
  const driverCoDriverPair = championshipData.coDrivers?.find((cd: CoDriver) => 
    cd.driver && createSlug(cd.driver) === params.slug
  )
  
  if (!driverCoDriverPair) {
    notFound()
  }
  
  const driverName = driverCoDriverPair.driver!
  
  // Find all co-drivers who have worked with this driver
  const coDriverPartners = championshipData.coDrivers.filter((cd: CoDriver) => 
    cd.driver && createSlug(cd.driver) === params.slug
  )
  
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link href="/drivers" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Driver Rankings
          </Link>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">{driverName}</h1>
            <div className="text-gray-400 text-lg">Professional Rally Driver</div>
            <div className="text-green-400 text-sm mt-2">
              ✅ Real Data - Extracted from Rally Websites
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">{coDriverPartners.reduce((sum, cd) => sum + (cd.points || 0), 0)}</div>
              <div className="text-gray-400">Total Points</div>
            </div>
            
            <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">{coDriverPartners.length}</div>
              <div className="text-gray-400">Rally Entries</div>
            </div>
            
            <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">{coDriverPartners.length}</div>
              <div className="text-gray-400">Co-Driver Partners</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Co-Driver Partnerships</h2>
          
          <div className="space-y-4">
            {coDriverPartners.map((coDriver: CoDriver, index: number) => (
              <Link 
                key={coDriver.name}
                href={`/codrivers/profile/${createSlug(coDriver.name)}`}
              >
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-blue-800 hover:to-purple-800 transition-all duration-300 rounded-lg p-6 border border-gray-600 hover:border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-semibold text-xl">{coDriver.name}</div>
                      <div className="text-gray-400">Co-Driver Partner</div>
                      <div className="text-green-400 text-sm mt-1">
                        Rally: {coDriver.rallyEvent}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold text-xl">{coDriver.points || 0}</div>
                      <div className="text-gray-400 text-sm">points</div>
                      <div className="text-blue-400 text-sm">View Profile →</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Rally History</h2>
          
          <div className="space-y-4">
            {coDriverPartners.map((entry: CoDriver, index: number) => (
              <div key={index} className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-6 border border-gray-600">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-white font-semibold text-lg">{entry.rallyEvent || 'Rally Event'}</div>
                    <div className="text-gray-400">
                      Co-Driver: {entry.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-semibold">Completed</div>
                    <div className="text-gray-400 text-sm">
                      {entry.extractedAt ? new Date(entry.extractedAt).toLocaleDateString() : 'Recent'}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-600 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Data Source:</span>
                      <span className="text-white ml-2">{entry.source}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Points Earned:</span>
                      <span className="text-white ml-2">{entry.points || 0}</span>
                    </div>
                  </div>
                  
                  {entry.rallyUrl && (
                    <div className="mt-2">
                      <span className="text-gray-400 text-sm">Rally URL:</span>
                      <a 
                        href={entry.rallyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 ml-2 text-sm"
                      >
                        View Original Rally Data →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-yellow-400 text-xl">🔗</span>
            <span className="text-yellow-400 font-semibold">Cross-Linked Driver Profile</span>
          </div>
          <p className="text-gray-300 mb-4">
            This driver profile shows all co-driver partnerships and rally history. 
            All data is cross-linked and extracted from real rally websites using authentic web scraping.
          </p>
          
          <div className="flex space-x-4">
            <Link 
              href="/drivers" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              View All Drivers
            </Link>
            
            <Link 
              href="/codrivers"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              View All Co-Drivers
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
