'use client'
import { useState, useEffect } from 'react'

export default function CoDrivers() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch('/api/scrape-rallies')
      .then(res => res.json())
      .then(setData)
  }, [])
  
  return (
    <div style={{padding: '20px', color: 'white', background: '#1a1a2e'}}>
      <h1>Rally League Co-Drivers</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
