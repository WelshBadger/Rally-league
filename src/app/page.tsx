export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-8 text-red-500">
          Rally League
        </h1>
        <p className="text-center text-gray-300 mb-8 text-lg">
          Co-Driver Championship Scoring Platform
        </p>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
          <h2 className="text-3xl mb-6 text-center font-bold">
            Championship Standings
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-lg shadow-lg">
              <div>
                <span className="text-xl font-bold">1. Liam Regan</span>
                <p className="text-sm opacity-90">with William Creighton</p>
              </div>
              <span className="text-3xl font-bold">41 pts</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-600 to-gray-500 rounded-lg shadow-lg">
              <div>
                <span className="text-xl font-bold">2. Darren Garrod</span>
                <p className="text-sm opacity-90">with Matt Edwards</p>
              </div>
              <span className="text-3xl font-bold">36 pts</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg shadow-lg">
              <div>
                <span className="text-xl font-bold">3. Noel O Sullivan</span>
                <p className="text-sm opacity-90">with Osian Pryce</p>
              </div>
              <span className="text-3xl font-bold">32 pts</span>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-700 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-green-400">
              Rally League Achievement
            </h3>
            <p className="text-green-400 mb-2">
              19 UK and Ireland rallies stored in database
            </p>
            <p className="text-green-400 mb-2">
              Co-drivers database populated
            </p>
            <p className="text-green-400 mb-2">
              BRC, IRC, WRC, SRC championships covered
            </p>
            <p className="text-yellow-400">
              Ready for live database connection
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
