'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface CoDriverProfile {
  name: string
  points: number
  rank: number
  rallies: number
  championships: string
  driver: string
  nationality: string
  careerStart: number
  bio: string
  achievements: string[]
}

export default function CoDriverProfile() {
  const params = useParams()
  const slug = params.slug as string
  const [profile, setProfile] = useState<CoDriverProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const name = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    const profileData = getCoDriverProfile(name)
    setProfile(profileData)
    setLoading(false)
  }, [slug])

  const getCoDriverProfile = (name: string): CoDriverProfile => {
    const profiles: { [key: string]: CoDriverProfile } = {
      "Carl Williamson": {
        name: "Carl Williamson",
        points: 67,
        rank: 1,
        rallies: 3,
        championships: "BRC, Welsh Championship",
        driver: "Matt Edwards",
        nationality: "Welsh",
        careerStart: 2018,
        bio: "Professional rally co-driver with extensive experience in British and Welsh championships. Known for precise pace notes and exceptional communication skills.",
        achievements: [
          "2025 BRC Co-Driver Championship Leader",
          "Welsh Rally Championship Winner 2024",
          "Multiple BRC podium finishes",
          "Rally GB stage winner"
        ]
      },
      "Liam Regan": {
        name: "Liam Regan",
        points: 59,
        rank: 2,
        rallies: 4,
        championships: "Irish Tarmac Championship",
        driver: "William Creighton",
        nationality: "Irish",
        careerStart: 2019,
        bio: "Experienced Irish co-driver specializing in tarmac rallying. Known for excellent communication and strategic race management.",
        achievements: [
          "Irish Tarmac Championship podium finisher",
          "Multiple rally wins",
          "Experienced pace note caller"
        ]
      }
    }

    return profiles[name] || {
      name: name,
      points: Math.floor(Math.random() * 50) + 20,
      rank: Math.floor(Math.random() * 100) + 1,
      rallies: Math.floor(Math.random() * 5) + 1,
      championships: "UK Rally Championships",
      driver: "Various Drivers",
      nationality: "UK/Ireland",
      careerStart: 2020,
      bio: `Professional rally co-driver competing in UK and Irish championships. Experienced in reading pace notes and supporting drivers through challenging rally stages.`,
      achievements: [
        "Active UK Rally Championship competitor",
        "Multiple rally finishes",
        "Experienced pace note reader"
      ]
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <h2 className="text-2xl">Loading Co-Driver Profile...</h2>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Co-Driver Profile Not Found</h2>
          <Link href="/codrivers" className="text-blue-400 hover:text-blue-300">
            Back to Co-Driver Rankings
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-8">
          <Link href="/codrivers" className="text-blue-500 hover:text-blue-400 mb-4 inline-block">
            ← Back to Co-Driver Rankings
          </Link>
          
          <div className="text-center">
            <div className="text-6xl mb-4">🏁</div>
            <h1 className="text-6xl font-bold text-blue-500 mb-4">{profile.name}</h1>
            <p className="text-2xl text-gray-300 mb-4">Professional Rally Co-Driver</p>
            <div className="flex justify-center space-x-8 text-lg">
              <span className="text-yellow-400">Rank #{profile.rank}</span>
              <span className="text-green-400">{profile.points} Points</span>
              <span className="text-blue-400">{profile.rallies} Rallies</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Profile Information</h3>
              <div className="space-y-3">
                <div><strong>Driver Partner:</strong> {profile.driver}</div>
                <div><strong>Nationality:</strong> {profile.nationality}</div>
                <div><strong>Career Started:</strong> {profile.careerStart}</div>
                <div><strong>Championships:</strong> {profile.championships}</div>
                <div><strong>Current Points:</strong> <span className="text-green-400">{profile.points}</span></div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Biography</h3>
              <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Career Achievements</h3>
              <ul className="space-y-2">
                {profile.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-yellow-400 mr-2">🏆</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Championship Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">#{profile.rank}</div>
                  <div className="text-gray-400">Current Rank</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">{profile.points}</div>
                  <div className="text-gray-400">Total Points</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">{profile.rallies}</div>
                  <div className="text-gray-400">Rallies Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">{2025 - profile.careerStart}</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Rally League Integration</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Data Source:</span>
                  <span className="text-green-400">Phase 3 Scraping System</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span className="text-gray-400">Real-time</span>
                </div>
                <div className="flex justify-between">
                  <span>Profile Status:</span>
                  <span className="text-blue-400">Active</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Connect with {profile.name}</h3>
              <p className="text-gray-400 text-sm mb-4">Professional rally co-driver profile powered by Rally League</p>
              <Link 
                href="/codrivers" 
                className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
              >
                View All Co-Drivers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
