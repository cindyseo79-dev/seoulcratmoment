import { createClient } from '@supabase/supabase-js'

// Vite exposes env vars prefixed with VITE_ (set them in .env.local).
const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// True only when both values are present, so the UI can degrade gracefully
// (the landing page still previews without a database configured).
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null
