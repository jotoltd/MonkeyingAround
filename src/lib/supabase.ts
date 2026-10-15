import { createClient } from '@supabase/supabase-js';

// The publishable key is public-by-design (it ships in the browser bundle anyway).
// All writes are protected by password-checked database functions, not by this key.
// Environment variables can override these defaults if ever needed.
const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ??
  'https://mffnghbbcasyyvekyiiq.supabase.co';
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ??
  'sb_publishable_sQTa_riucR0D2IVzrw-Ntw_nh7TCuby';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
