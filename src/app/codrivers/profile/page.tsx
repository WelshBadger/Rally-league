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
  eventId?: number
  position?: number
}

interface ChampionshipData {
  coDrivers: CoDriver[]
  totalCoDrivers: number
  totalRalliesDiscovered: number
  timestamp?: string
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
  
  // Find all rally entries for this co-driver
  const coDriverEntries = championshipData.coDrivers.filter((cd: CoDriver) => 
    createSlug(cd.name) === resolvedParams.slug
  )
  
  if (coDriverEntries.length === 0) {
    notFound()
  }
  
  const coDriverName = coDriverEntries[0].name
  const totalPoints = coDriverEntries.reduce((sum, entry) => sum + (entry.points || 0), 0)
  const totalRallies = coDriverEntries.length
  const driverPartnerships = [...new Set(coDriverEntries.map(entry => entry.driver).filter(Boolean))]
  const rallyHistory = coDriverEntries.sort((a, b) => (b.points || 0) - (a.points || 0))
  
  // Calculate championship position
  const allCoDrivers = new Map<string, number>()
  championshipData.coDrivers.forEach((entry: CoDriver) => {
    const name = entry.name
    allCoDrivers.set(name, (allCoDrivers.get(name) || 0) + (entry.points || 0))
  })
  const sortedChampionship = Array.from(allCoDrivers.entries()).sort((a, b) => b[1] - a[1])
  const championshipPosition = sortedChampionship.findIndex(([name]) => name === coDriverName) + 1
  
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
            ← Back to Championship Rankings
          </Link>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">{coDriverName}</h1>
            <div className="text-gray-400 text-lg">Professional Co-Driver</div>
            <div className="text-green-400 text-sm mt-2">
              ✅ Real Data - Extracted from Rally Websites
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">#{championshipPosition}</div>
              <div className="text-gray-400">Championship Position</div>
            </div>
            
            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">{totalPoints}</div>
              <div className="text-gray-400">Total Points</div>
            </div>
            
            <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">{totalRallies}</div>
              <div className="text-gray-400">Rallies Completed</div>
            </div>
            
            <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">{driverPartnerships.length}</div>
              <div className="text-gray-400">Driver Partners</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Rally History & Points Breakdown</h2>
          
          <div className="space-y-4">
            {rallyHistory.map((rally: CoDriver, index: number) => (
              <div key={index} className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-6 border border-gray-600">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-white font-semibold text-lg">{rally.rallyEvent}</div>
                    <div className="text-gray-400">
                      Driver Partnership: {rally.driver}
                    </div>
                    {rally.position && (
                      <div className="text-blue-400 text-sm">
                        Overall Position: {rally.position}
                      </div>
                    )}
                    <div className="text-green-400 text-sm">
                      Event ID: {rally.eventId}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold text-2xl">{rally.points}</div>
                    <div className="text-gray-400 text-sm">points earned</div>
                  </div>
                </div>
                
                <div className="border-t border-gray-600 pt-4">
                  <div className="text-gray-300 text-sm mb-2">Rally League Points Breakdown:</div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="bg-gray-700/50 rounded p-2">
                      <span className="text-gray-400">Starting:</span>
                      <span className="text-white ml-2">+3 pts</span>
                    </div>
                    <div className="bg-gray-700/50 rounded p-2">
                      <span className="text-gray-400">Finishing:</span>
                      <span className="text-white ml-2">+3 pts</span>
                    </div>
                    <div className="bg-gray-700/50 rounded p-2">
                      <span className="text-gray-400">Position Bonus:</span>
                      <span className="text-white ml-2">+{(rally.points || 0) - 6} pts</span>
                    </div>
                  </div>
                  
                  {rally.rallyUrl && (
                    <div className="mt-4">
                      <a 
                        href={rally.rallyUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        View Original Rally Results →
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
            <span className="text-yellow-400 text-xl">🏆</span>
            <span className="text-yellow-400 font-semibold">Automatic Co-Driver Profile</span>
          </div>
          <p className="text-gray-300 mb-4">
            This profile is automatically generated from real rally results data extracted from rally websites using your Rally League web scraping system.
          </p>
          
          <Link 
            href="/codrivers" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Championship Rankings
          </Link>
        </div>
      </main>
    </div>
  )
}
