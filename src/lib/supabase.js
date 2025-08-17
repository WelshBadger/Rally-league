import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pfaaufsfbckzwvcxzpvq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmYWF1ZnNmYmNrend2Y3h6cHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MzczMjksImV4cCI6MjA3MTAxMzMyOX0.7hReGsEEhtQpDeukFF5T4M_HWanwYGRn06qP-wGFeUE'

export const supabase = createClient(supabaseUrl, supabaseKey)
