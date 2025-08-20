'use client'
import { useState } from 'react'
import { loginCoDriver, createCoDriverAccount } from '../../lib/supabase'


import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [coDriverName, setCoDriverName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let result
      if (isLogin) {
        result = await loginCoDriver(email, password)
      } else {
        result = await createCoDriverAccount(email, password, coDriverName)
      }

      if (result.success) {
        router.push('/profile')
      } else {
        setError(result.error || 'Authentication failed')
      }
    } catch (err) {
      setError('Something went wrong')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-500 mb-2">Rally League</h1>
          <p className="text-gray-300">Co-Driver Championship Platform</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-l-lg ${isLogin ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-r-lg ${!isLogin ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Co-Driver Name</label>
                <input
                  type="text"
                  value={coDriverName}
                  onChange={(e) => setCoDriverName(e.target.value)}
                  className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                  placeholder="Enter your co-driver name"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Create Account')}
            </button>
          </form>

          <div className="text-center mt-6">
            <a href="/" className="text-red-400 hover:text-red-300">
              ← Back to Rally League
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
