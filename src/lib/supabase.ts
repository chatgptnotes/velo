import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ltlcydzsgrkywxretkww.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0bGN5ZHpzZ3JreXd4cmV0a3d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NDkxOTUsImV4cCI6MjA4ODEyNTE5NX0.osrPr_Ukkl9BGhA0GBXmxWS5AJY0CsWi0CrJ2eP5E3Y'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)