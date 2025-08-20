'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-red-500 mb-4">
            THE RALLY LEAGUE
          </h1>
          <p className="text-2xl text-gray-300 mb-2">
            World's First Automatic Championship Platform
          </p>
          <p className="text-lg text-gray-400">
            Real-time rankings • Automatic updates • Complete UK & Ireland coverage
          </p>
        </div>

        {/* Main Navigation Cards */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
          
          {/* Driver Rankings Card */}
          <Link href="/drivers" className="group block">
            <div className="bg-gradient-to-br from-red-600 to-red-700 p-8 rounded-xl shadow-2xl transform transition-all duration-300 group-hover:scale-105 border border-red-500">
              <div className="text-center">
                <div className="text-6xl mb-4">🏎️</div>
                <h2 className="text-3xl font-bold mb-4">Driver Rankings</h2>
                <p className="text-red-100 mb-6 text-lg">
                  Championship standings for drivers across all UK & Ireland rallies
                </p>
                <div className="bg-white/20 rounded-lg p-4 mb-4">
                  <div className="text-sm text-red-100 mb-2">Current Leader</div>
                  <div className="text-xl font-bold">TBD</div>
                  <div className="text-sm text-red-200">Points: TBD</div>
                </div>
                <div className="text-red-200 font-semibold">
                  View Full Driver Championship →
                </div>
              </div>
            </div>
          </Link>

          {/* Co-Driver Rankings Card */}
          <Link href="/codrivers" className="group block">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-xl shadow-2xl transform transition-all duration-300 group-hover:scale-105 border border-blue-500">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <h2 className="text-3xl font-bold mb-4">Co-Driver Rankings</h2>
                <p className="text-blue-100 mb-6 text-lg">
                  First-ever automatic co-driver championship system
                </p>
                <div className="bg-white/20 rounded-lg p-4 mb-4">
                  <div className="text-sm text-blue-100 mb-2">Current Leader</div>
                  <div className="text-xl font-bold">Carl Williamson</div>
                  <div className="text-sm text-blue-200">Points: 67</div>
                </div>
                <div className="text-blue-200 font-semibold">
                  View Full Co-Driver Championship →
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-200">
            Revolutionary Rally Championship System
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-4xl mb-4 text-center">🤖</div>
              <h4 className="text-xl font-bold mb-3 text-yellow-400">Automatic Updates</h4>
              <p className="text-gray-300">
                Championship standings update automatically every Monday after rally weekends. No manual input required.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-4xl mb-4 text-center">🏆</div>
              <h4 className="text-xl font-bold mb-3 text-yellow-400">Complete Coverage</h4>
              <p className="text-gray-300">
                Tracks all major UK & Ireland rallies including BRC, IRC, SRC, and WRC rounds.
              </p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-4xl mb-4 text-center">📊</div>
              <h4 className="text-xl font-bold mb-3 text-yellow-400">Professional Scoring</h4>
              <p className="text-gray-300">
                Advanced points system: Starting (3pts) + Finishing (3pts) + Position + Class + Awards.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-200">
            Live Championship Statistics
          </h3>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-red-500">19</div>
              <div className="text-gray-400">Rallies Tracked</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-500">8</div>
              <div className="text-gray-400">Active Rallies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-500">67</div>
              <div className="text-gray-400">Championship Points</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-500">100%</div>
              <div className="text-gray-400">Automated</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>© 2025 The Rally League • World's First Automatic Rally Championship Platform</p>
        </div>
      </div>
    </div>
  )
}
