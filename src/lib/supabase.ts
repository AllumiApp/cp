import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_CP_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_CP_SUPABASE_ANON_KEY

/**
 * Read-only client for the Christina Pfeiffer Supabase project. Null when env
 * vars are absent, so the site falls back entirely to the bundled i18n content.
 */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey, { auth: { persistSession: false } }) : null
