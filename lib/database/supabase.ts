import { createClient } from "@supabase/supabase-js"
import type { Database } from "./types"

// Initialize the Supabase client
// These environment variables should be set in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_key"

// Create client even if not configured (status component will show proper error)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // We don't need auth sessions, just storing data by wallet address
  },
})
