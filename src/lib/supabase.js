import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pfaaufsfbckzwvcxzpvq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmYWF1ZnNmYmNrend2Y3h6cHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQwNzI4NzYsImV4cCI6MjAzOTY0ODg3Nn0.4wYYQOQOQdGMzqQvQf5r1jl_kAyWXqJGVHWNLUQMaQs'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper function to save co-drivers to database
export async function saveCoDriverToDatabase(coDriverData) {
  try {
    const { data, error } = await supabase
      .from('co_drivers')
      .upsert({
        name: coDriverData.name,
        nationality: coDriverData.nationality || 'Unknown',
        career_start: coDriverData.career_start || null,
        points: coDriverData.points || 0,
        rallies_completed: coDriverData.rallies || 0,
        source_website: coDriverData.source,
        last_updated: new Date().toISOString()
      }, {
        onConflict: 'name'
      })

    if (error) {
      console.error('Error saving co-driver to database:', error)
      return false
    }

    console.log(`✅ Saved co-driver to database: ${coDriverData.name}`)
    return true
  } catch (error) {
    console.error('Database save error:', error)
    return false
  }
}

// Helper function to get all co-drivers from database
export async function getAllCoDriversFromDatabase() {
  try {
    const { data, error } = await supabase
      .from('co_drivers')
      .select('*')
      .order('points', { ascending: false })

    if (error) {
      console.error('Error fetching co-drivers from database:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Database fetch error:', error)
    return []
  }
}
