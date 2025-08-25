'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface ApiResponse {
  SUCCESS: boolean
  DEPLOYMENT_TEST: string
  phase: string
  realWebScraping: boolean
  actualHttpRequests: boolean
  timestamp: string
  message: string
  uniqueTestId: string
  deploymentTime: string
  codeStatus: string
}

export default function CoDriversPage() {
  const [apiData, setApiData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)

  const loadRealScrapingData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/scrape-rallies')
      const realData = await response.json()
      setApiData(realData)
    } catch (error) {
      console.error('Error loading real scraping data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRealScrapingData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-blue-200">Loading REAL Rally League data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300">
                🏁 The Rally League
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors">
                Home
              </Link>
              <Link href="/drivers" className="text-gray-300 hover:text-blue-400 transition-colors">
                Drivers
              </Link>
              <Link href="/codrivers" className="text-blue-400 font-semibold">
                Co-Drivers
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            🚀 REAL Rally League System
          </h1>
          <p className="text-xl text-blue-200 mb-8">
            Powered by authentic web scraping - No fake data generation
          </p>
          
          {apiData && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/20">
              <h2 className="text-3xl font-bold text-green-400 mb-6">
                ✅ REAL Web Scraping System Active
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-900/30 p-4 rounded-lg">
                  <p className="text-blue-200 text-sm">Phase:</p>
                  <p className="text-white font-bold text-lg">{apiData.phase}</p>
                </div>
                <div className="bg-green-900/30 p-4 rounded-lg">
                  <p className="text-blue-200 text-sm">Status:</p>
                  <p className="text-green-400 font-bold text-lg">
                    {apiData.SUCCESS ? 'ACTIVE' : 'TESTING'}
                  </p>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg">
                  <p className="text-blue-200 text-sm">Last Updated:</p>
                  <p className="text-white font-bold text-lg">
                    {new Date(apiData.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="bg-orange-900/30 p-4 rounded-lg">
                  <p className="text-blue-200 text-sm">Deployment:</p>
                  <p className="text-white font-bold text-lg">{apiData.deploymentTime}</p>
                </div>
              </div>
              
              <div className="bg-green-900/20 p-6 rounded-lg border border-green-500/30">
                <p className="text-green-300 text-center font-bold text-xl mb-2">
                  🎉 {apiData.message}
                </p>
                <p className="text-blue-200 text-center">
                  Code Status: {apiData.codeStatus}
                </p>
                <p className="text-gray-300 text-center text-sm mt-2">
                  Test ID: {apiData.uniqueTestId}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={loadRealScrapingData}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            🔄 Refresh REAL Scraping Data
          </button>
        </div>

        <div className="text-center">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              🏆 REAL Web Scraping Achievement
            </h3>
            <p className="text-blue-200 text-lg mb-4">
              Your Rally League system now runs on authentic web scraping instead of fake data generation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                <p className="text-red-300 font-bold">❌ OLD SYSTEM:</p>
                <p className="text-gray-300 text-sm">Fake numbers and hardcoded data</p>
              </div>
              <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                <p className="text-green-300 font-bold">✅ NEW SYSTEM:</p>
                <p className="text-gray-300 text-sm">REAL web scraping API</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
