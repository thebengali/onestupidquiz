// lib/supabaseAdmin.ts (server-only)
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL as string;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

// Node runtime only; do not import on the client
export const supabaseAdmin = createClient(url, service, {
  auth: { persistSession: false, autoRefreshToken: false }
});
