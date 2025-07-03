import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aajpyiasgjgqpsojsdgn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhanB5aWFzZ2pncXBzb2pzZGduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Nzk5OTksImV4cCI6MjA2NzA1NTk5OX0.MQzL8loK0WBKrGEfPQHU0-7B_cfSyXcow3en-rrUerU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
