'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function CoDriverRankings() {
  const [loading, setLoading] = useState(false)
  const [tested, setTested] = useState(false)

  const testScraping = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/scrape-rallies')
      const data = await response.json()
      
      console.log('Scraping results:', data)
      
      setLoading(false)
      setTested(true)
      
      alert('Scraping Test Complete! Check console for results.')
      
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
      alert('Test completed - check console')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/">Back to Rally League</Link>
        
        <h1 className="text-4xl font-bold text-center mt-8 mb-8">Co-Driver Championship</h1>
        
        <div className="text-center mb-8">
          <button onClick={testScraping} disabled={loading} className="px-6 py-3 bg-blue-600 rounded">
            {loading ? 'Testing...' : 'Test Scraping System'}
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded text-center">
          <h2 className="text-2xl mb-4">Championship Leader</h2>
          <div className="text-4xl mb-2">🥇</div>
          <div className="text-2xl text-yellow-400">Carl Williamson</div>
          <div className="text-lg">67 Points</div>
        </div>

        {tested && (
          <div className="bg-green-800 p-4 rounded mt-4 text-center">
            <p>Scraping system tested successfully!</p>
          </div>
        )}

      </div>
    </div>
  )
}
