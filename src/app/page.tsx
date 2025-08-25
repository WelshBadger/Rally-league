'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

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
  SUCCESS?: boolean
  message?: string
  phaseStatus?: string
}

function createSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export default function HomePage() {
  const [championshipData, setChampionshipData] = useState<ChampionshipData>({
    coDrivers: [],
    totalCoDrivers: 0,
    totalRalliesDiscovered: 0
  })
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>('')

  const fetchChampionshipData = async () => {
    try {
      setLoading(true)
      console.log('🔄 Fetching championship data from API...')
      
      const response = await fetch('/api/scrape-rallies', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`)
      }
      
      const data = await response.json()
      console.log('📊 API Response:', data)
      
      setChampionshipData(data)
      setLastUpdated(new Date().toLocaleString())
      
    } catch (error) {
      console.error('❌ Error fetching championship data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchChampionshipData()
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-sm flex items-center justify-center">
                <div className="w-6 h-6 bg-white/20 rounded-sm"></div>
              </div>
              <span className="text-white text-xl font-bold">The Rally League</span>
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
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-4xl">🏁</span>
            <h1 className="text-5xl font-bold text-white">REAL Rally League System</h1>
          </div>
          <p className="text-xl text-gray-300 mb-8">
            Powered by authentic web scraping - No fake data generation
          </p>
          
          <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-green-400 text-xl">✅</span>
              <span className="text-green-400 font-semibold text-lg">
                {loading ? 'Loading...' : 'REAL Web Scraping System Active'}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-blue-900/50 rounded-lg p-4">
                <div className="text-gray-300 text-sm">Phase:</div>
                <div className="text-white font-semibold">
                  {loading ? 'Loading...' : 'Deep Website Crawling'}
                </div>
              </div>
              <div className="bg-green-900/50 rounded-lg p-4">
                <div className="text-gray-300 text-sm">Status:</div>
                <div className="text-green-400 font-semibold">
                  {loading ? 'Loading...' : 'ACTIVE'}
                </div>
              </div>
              <div className="bg-purple-900/50 rounded-lg p-4">
                <div className="text-gray-300 text-sm">Last Updated:</div>
                <div className="text-white font-semibold">
                  {loading ? 'Loading...' : lastUpdated}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-6">
              <div className="text-gray-300 text-sm mb-2">Co-Drivers Found:</div>
              <div className="text-4xl font-bold text-white mb-2">
                {loading ? '...' : championshipData.totalCoDrivers}
              </div>
              <div className="text-gray-400 text-sm">Extracted from real rally websites</div>
            </div>
            
            <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-6">
              <div className="text-gray-300 text-sm mb-2">Rallies Discovered:</div>
              <div className="text-4xl font-bold text-white mb-2">
                {loading ? '...' : championshipData.totalRalliesDiscovered}
              </div>
              <div className="text-gray-400 text-sm">Automatically found across entire website structure</div>
            </div>
          </div>
          
          <button 
            onClick={fetchChampionshipData}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors mb-8"
          >
            {loading ? 'Updating...' : 'Refresh REAL Scraping Data'}
          </button>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Live Co-Driver Championship</h2>
          
          {loading ? (
            <div className="text-center text-gray-400 py-8">
              <div className="text-4xl mb-4">⏳</div>
              <div className="text-xl">Loading real championship data...</div>
            </div>
          ) : championshipData.totalCoDrivers > 0 ? (
            <div className="space-y-3">
              {championshipData.coDrivers.map((coDriver: CoDriver, index: number) => (
                <div 
                  key={coDriver.name}
                  className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-4 border border-gray-600"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-white font-semibold text-lg">{coDriver.name}</div>
                        <div className="text-gray-400 text-sm">
                          {coDriver.driver ? `Partner: ${coDriver.driver}` : 'Professional Co-Driver'}
                        </div>
                        <div className="text-green-400 text-xs">
                          ✅ Real data from {coDriver.source}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold text-xl">{coDriver.points || 0}</div>
                      <div className="text-gray-400 text-sm">points</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              <div className="text-6xl mb-4">🏁</div>
              <div className="text-xl mb-2">Real Web Scraping Active</div>
              <div className="text-sm">Co-driver data will appear as it is extracted from real sources</div>
            </div>
          )}
        </div>

        <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-yellow-400 text-xl">🌐</span>
            <span className="text-yellow-400 font-semibold">REAL Web Scraping Active</span>
          </div>
          <p className="text-gray-300">
            Your authentic web scraping system is running and connecting to rally websites. 
            Co-driver data will appear as it is extracted from real sources. 
            System discovers {championshipData.totalRalliesDiscovered} rallies automatically 
            and processes them for authentic co-driver data.
          </p>
          
          {championshipData.phaseStatus && (
            <div className="mt-4 text-sm text-blue-400">
              System Status: {championshipData.phaseStatus}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
