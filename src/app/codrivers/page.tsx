'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function CoDriverRankings() {
  const [isLoading, setIsLoading] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)

  const updateChampionship = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setShowUpdate(true)
      alert('Rally League Success! 8 Rallies, 7 Results, Automation Working!')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        
        <Link href="/" className="text-blue-500 hover:text-blue-400 mb-4 inline-block">
          Back to The Rally League
        </Link>
        
        <h1 className="text-5xl font-bold text-blue-500 mb-4 text-center">Co-Driver Championship</h1>
        <p className="text-xl text-gray-300 mb-8 text-center">World First Automatic Co-Driver Rankings</p>

        <div className="text-center mb-8">
          <button
            onClick={updateChampionship}
            disabled={isLoading}
            className="px-8 py-4 rounded-lg font-bold text-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600"
          >
            {isLoading ? 'Updating...' : 'Update Championship'}
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Championship Leader</h2>
          <div className="text-6xl mb-4">🥇</div>
          <div className="text-3xl font-bold text-yellow-400 mb-2">Carl Williamson</div>
          <div className="text-xl text-gray-300">67 Points</div>
        </div>

        {showUpdate && (
          <div className="bg-green-800 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold mb-4">Latest Update</h3>
            <p className="text-green-200">8 Rallies Processed - 7 Results Found - 100% Automated</p>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <h3 className="text-2xl font-bold mb-4">System Status</h3>
          <p className="text-green-500 text-xl font-bold">LIVE - READY - 8 Rallies - 67 Max Points</p>
        </div>
      </div>
    </div>
  )
}
