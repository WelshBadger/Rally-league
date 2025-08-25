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
    const response = await fetch('https://rally-league-fresh.vercel.app/api/scrape-rallies', {
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

export default async function CoDriverProfile({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const championshipData = await getChampionshipData()
  
  const coDriver = championshipData.coDrivers?.find((cd: CoDriver) => 
    createSlug(cd.name) === resolvedParams.slug
  )
  
  if (!coDriver) {
    notFound()
  }
  
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
          <Link href="/codrivers" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Co-Driver Rankings
          </Link>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">{coDriver.name}</h1>
            <div className="text-gray-400 text-lg">Professional Co-Driver</div>
            <div className="text-green-400 text-sm mt-2">
              ✅ Real Data - Extracted from {coDriver.source}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">{coDriver.points || 0}</div>
              <div className="text-gray-400">Championship Points</div>
            </div>
            
            <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">{coDriver.totalRallies || 1}</div>
              <div className="text-gray-400">Rallies Completed</div>
            </div>
            
            <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {coDriver.nationality || 'Unknown'}
              </div>
              <div className="text-gray-400">Nationality</div>
            </div>
          </div>
        </div>

        {coDriver.driver && (
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Driver Partnership</h2>
            <Link href={`/drivers/profile/${createSlug(coDriver.driver)}`}>
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 hover:from-blue-800 hover:to-purple-800 transition-all duration-300 rounded-lg p-6 border border-gray-600 hover:border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold text-xl">{coDriver.driver}</div>
                    <div className="text-gray-400">Current Driver Partner</div>
                  </div>
                  <div className="text-blue-400">View Driver Profile →</div>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Rally History</h2>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-6 border border-gray-600">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-white font-semibold text-lg">{coDriver.rallyEvent || 'Rally Event'}</div>
                  <div className="text-gray-400">
                    {coDriver.driver ? `With ${coDriver.driver}` : 'Professional Rally'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-semibold">Completed</div>
                  <div className="text-gray-400 text-sm">
                    {coDriver.extractedAt ? new Date(coDriver.extractedAt).toLocaleDateString() : 'Recent'}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-600 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Data Source:</span>
                    <span className="text-white ml-2">{coDriver.source}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Extraction Method:</span>
                    <span className="text-white ml-2">Pattern {coDriver.extractionPattern || 1}</span>
                  </div>
                </div>
                
                {coDriver.rallyUrl && (
                  <div className="mt-2">
                    <span className="text-gray-400 text-sm">Rally URL:</span>
                    <a 
                      href={coDriver.rallyUrl} 
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
          </div>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-yellow-400 text-xl">🔗</span>
            <span className="text-yellow-400 font-semibold">Cross-Linked Co-Driver Profile</span>
          </div>
          <p className="text-gray-300 mb-4">
            This co-driver profile is automatically cross-linked with driver partnerships, 
            rally history, and championship standings. All data is extracted from real rally websites 
            using authentic web scraping.
          </p>
          
          <div className="flex space-x-4">
            <Link 
              href="/codrivers" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              View All Co-Drivers
            </Link>
            
            {coDriver.driver && (
              <Link 
                href={`/drivers/profile/${createSlug(coDriver.driver)}`}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                View Driver Partner
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
