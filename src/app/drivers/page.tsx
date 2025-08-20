'use client'
import Link from 'next/link'

export default function DriverRankings() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-red-500 hover:text-red-400 mb-4 inline-block text-lg">
            ← Back to The Rally League
          </Link>
          <div className="text-center">
            <h1 className="text-5xl font-bold text-red-500 mb-4">Driver Championship</h1>
            <p className="text-xl text-gray-300 mb-2">UK & Ireland Rally Championship Standings</p>
            <p className="text-gray-400">2025 Season • Updated Automatically Every Monday</p>
          </div>
        </div>

        {/* Championship Status */}
        <div className="bg-red-600 rounded-lg p-6 mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">🏗️ Driver Championship System</h2>
          <p className="text-red-100 text-lg">Currently in Development</p>
        </div>

        {/* Development Status */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Development Roadmap</h3>
            
            <div className="space-y-6">
              {/* Phase 1 - Completed */}
              <div className="flex items-start space-x-4">
                <div className="bg-green-500 rounded-full p-2 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-green-400 mb-2">Phase 1: Co-Driver System (Completed)</h4>
                  <p className="text-gray-300 mb-2">
                    World's first automatic co-driver championship system is live and working.
                  </p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Automatic rally result scraping</li>
                    <li>• Real-time championship calculations</li>
                    <li>• 8 rallies processed with 7 results found</li>
                    <li>• Scheduled Monday updates via GitHub Actions</li>
                  </ul>
                </div>
              </div>

              {/* Phase 2 - In Progress */}
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500 rounded-full p-2 mt-1">
                  <span className="text-white text-sm">⚡</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-yellow-400 mb-2">Phase 2: Driver System (In Development)</h4>
                  <p className="text-gray-300 mb-2">
                    Expanding the automatic system to include driver championships.
                  </p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Driver data extraction from rally results</li>
                    <li>• Driver-specific scoring system</li>
                    <li>• Multi-class championship support</li>
                    <li>• Driver profile pages</li>
                  </ul>
                </div>
              </div>

              {/* Phase 3 - Planned */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 rounded-full p-2 mt-1">
                  <span className="text-white text-sm">📋</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-blue-400 mb-2">Phase 3: Advanced Features (Planned)</h4>
                  <p className="text-gray-300 mb-2">
                    Enhanced features for comprehensive rally tracking.
                  </p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Stage time analysis</li>
                    <li>• Head-to-head comparisons</li>
                    <li>• Historical performance data</li>
                    <li>• Predictive championship modeling</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Why Co-Drivers First */}
          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Why Co-Drivers First?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-bold text-blue-400 mb-3">🎯 Strategic Focus</h4>
                <p className="text-gray-300 text-sm">
                  Co-drivers have never had dedicated championship recognition. By perfecting 
                  this system first, Rally League creates a unique market position.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-green-400 mb-3">🔧 Technical Foundation</h4>
                <p className="text-gray-300 text-sm">
                  The automatic scraping and scoring system built for co-drivers provides 
                  the foundation for expanding to driver championships.
                </p>
              </div>
            </div>
          </div>

          {/* Current Stats */}
          <div className="bg-gray-800 rounded-lg p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Current Rally League Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-red-500">8</div>
                <div className="text-gray-400 text-sm">Rallies Processed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-500">7</div>
                <div className="text-gray-400 text-sm">Results Found</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-500">67</div>
                <div className="text-gray-400 text-sm">Max Co-Driver Points</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-500">100%</div>
                <div className="text-gray-400 text-sm">Automated</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-gray-300 mb-6 text-lg">
              Experience the world's first automatic co-driver championship system while we build the driver system.
            </p>
            <Link 
              href="/codrivers" 
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-bold text-lg inline-block transition-colors"
            >
              🗺️ View Co-Driver Championship →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
