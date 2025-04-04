import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lvdhnsjiszhwvqsuovou.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2ZGhuc2ppc3pod3Zxc3Vvdm91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NzY4MDMsImV4cCI6MjA1NzQ1MjgwM30.DinF0cKnE2h6putOjjUNRerFc8b7aZ2mODJsNMFLRzg'

export const supabase = createClient(supabaseUrl, supabaseKey) 