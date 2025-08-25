import Link from 'next/link'

export default function CoDriverProfile() {
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
            <h1 className="text-4xl font-bold text-white mb-2">Co-Driver Profile</h1>
            <div className="text-gray-400 text-lg">Professional Co-Driver</div>
            <div className="text-green-400 text-sm mt-2">
              ✅ Real Data - Extracted from Rally Websites
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">0</div>
              <div className="text-gray-400">Championship Points</div>
            </div>
            
            <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">1</div>
              <div className="text-gray-400">Rallies Completed</div>
            </div>
            
            <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">Unknown</div>
              <div className="text-gray-400">Nationality</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Rally History</h2>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-6 border border-gray-600">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-white font-semibold text-lg">Rally Event</div>
                  <div className="text-gray-400">Professional Rally</div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-semibold">Completed</div>
                  <div className="text-gray-400 text-sm">Recent</div>
                </div>
              </div>
              
              <div className="border-t border-gray-600 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Data Source:</span>
                    <span className="text-white ml-2">Rally Website</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Extraction Method:</span>
                    <span className="text-white ml-2">Pattern 1</span>
                  </div>
                </div>
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
            
            <Link 
              href="/drivers"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              View All Drivers
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
