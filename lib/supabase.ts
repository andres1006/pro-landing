import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  'https://lvdhnsjiszhwvqsuovou.supabase.co'

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2ZGhuc2ppc3pod3Zxc3Vvdm91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NzY4MDMsImV4cCI6MjA1NzQ1MjgwM30.DinF0cKnE2h6putOjjUNRerFc8b7aZ2mODJsNMFLRzg'

if (
  typeof window !== 'undefined' &&
  (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
) {
  // eslint-disable-next-line no-console
  console.warn(
    '[supabase] Using hardcoded fallback credentials. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to override.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)
