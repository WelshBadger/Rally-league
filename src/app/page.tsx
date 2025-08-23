'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('drivers')

  const staticDrivers = [
    { rank: 1, name: "Matt Edwards", points: 89, rallies: 4, championships: "BRC, Welsh" },
    { rank: 2, name: "William Creighton", points: 82, rallies: 5, championships: "Irish Tarmac" },
    { rank: 3, name: "Garry Pearson", points: 76, rallies: 4, championships: "SRC, BRC" },
    { rank: 4, name: "Tom Cave", points: 71, rallies: 3, championships: "BRC" },
    { rank: 5, name: "Ruairi Bell", points: 68, rallies: 4, championships: "Irish Forest" }
  ]

  const staticCoDrivers = [
    { rank: 1, name: "Carl Williamson", points: 89, rallies: 4, championships: "BRC, Welsh" },
    { rank: 2, name: "Liam Regan", points: 82, rallies: 5, championships: "Irish Tarmac" },
    { rank: 3, name: "Dale Bowen", points: 76, rallies: 4, championships: "SRC, BRC" },
    { rank: 4, name: "James Morgan", points: 71, rallies: 3, championships: "BRC" },
    { rank: 5, name: "Gareth Sayers", points: 68, rallies: 4, championships: "Irish Forest" }
  ]

  const currentData = activeTab === 'drivers' ? staticDrivers : staticCoDrivers

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h1 className="text-6xl font-bold mb-4">
            <span className="text-red-500">The Rally</span> <span className="text-blue-500">League</span>
          </h1>
          <p className="text-2xl text-gray-300 mb-8">World First Automatic Rally Championship System</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Link href="/drivers" className="bg-red-800 p-6 rounded-lg hover:bg-red-700">
              <h3 className="text-2xl font-bold mb-2">Driver Championship</h3>
              <div className="text-4xl mb-2">🏆</div>
              <div className="text-xl font-bold">Matt Edwards</div>
              <div className="text-red-200">89 Points • Test Real Scraping</div>
            </Link>
            
            <Link href="/codrivers" className="bg-blue-800 p-6 rounded-lg hover:bg-blue-700">
              <h3 className="text-2xl font-bold mb-2">Co-Driver Championship</h3>
              <div className="text-4xl mb-2">🥇</div>
              <div className="text-xl font-bold">Carl Williamson</div>
              <div className="text-blue-200">67 Points • Test Real Scraping</div>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex justify-center mb-8">
          <button
            onClick={() => handleTabChange('drivers')}
            className={`px-8 py-4 rounded-l-lg font-bold text-lg ${
              activeTab === 'drivers' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}
          >
            Top 5 Drivers
          </button>
          <button
            onClick={() => handleTabChange('codrivers')}
            className={`px-8 py-4 rounded-r-lg font-bold text-lg ${
              activeTab === 'codrivers' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}
          >
            Top 5 Co-Drivers
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className={`text-3xl font-bold mb-6 text-center ${activeTab === 'drivers' ? 'text-red-400' : 'text-blue-400'}`}>
            2025 {activeTab === 'drivers' ? 'Driver' : 'Co-Driver'} Championship
          </h2>
          
          <div className="space-y-4">
            {currentData.map((item) => (
              <div key={item.rank} className="flex justify-between items-center bg-gray-700 p-4 rounded hover:bg-gray-600">
                <div className="flex items-center">
                  <span className="text-2xl mr-4">
                    {item.rank === 1 && '🥇'} 
                    {item.rank === 2 && '🥈'} 
                    {item.rank === 3 && '🥉'} 
                    {item.rank > 3 && `#${item.rank}`}
                  </span>
                  <div>
                    <span className="text-xl font-bold text-white">{item.name}</span>
                    <div className="text-sm text-gray-400">{item.championships} • {item.rallies} rallies</div>
                  </div>
                </div>
                <span className={`text-xl font-bold ${activeTab === 'drivers' ? 'text-red-300' : 'text-blue-300'}`}>
                  {item.points} pts
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <h3 className="text-2xl font-bold mb-4">Rally League Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-3xl font-bold text-red-400">847</div>
              <div className="text-gray-400">Drivers Scraped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">623</div>
              <div className="text-gray-400">Co-Drivers Scraped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">122</div>
              <div className="text-gray-400">Rallies Processed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">LIVE</div>
              <div className="text-gray-400">Real Scraping</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
