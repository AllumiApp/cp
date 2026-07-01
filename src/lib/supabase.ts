import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Public project URL + anon key. These are safe to ship in the browser bundle by
// design (the anon key only grants what RLS allows). They are committed as
// fallbacks so the client is never null just because a `NEXT_PUBLIC_*` build var
// was missing at build time — env vars still override them when present.
const FALLBACK_URL = 'https://itlrpsecjfvgwhrtxctx.supabase.co'
const FALLBACK_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bHJwc2VjamZ2Z3docnR4Y3R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1Njc4MjUsImV4cCI6MjA5ODE0MzgyNX0.3XdwqJe7T98-L9cArtty1CPWGWk9v4JAXkUQ7_IHTjs'

const url = process.env.NEXT_PUBLIC_CP_SUPABASE_URL || FALLBACK_URL
const anonKey = process.env.NEXT_PUBLIC_CP_SUPABASE_ANON_KEY || FALLBACK_ANON_KEY

/**
 * Read-only client for the Christina Pfeiffer Supabase project. Falls back to the
 * public URL/anon key above, so it stays usable in the browser even when the
 * `NEXT_PUBLIC_CP_SUPABASE_*` build vars are absent.
 */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey, { auth: { persistSession: false } }) : null
