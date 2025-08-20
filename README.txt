ONESTUPIDQUIZ — First‑Party Visitor Counter (Supabase, no personal data)

What this does
- Stores a single aggregate integer in your own Supabase DB.
- No cookies, no IPs, no user IDs. Anonymous and privacy‑friendly.
- Increments when the homepage loads; value shows as "Visitors: N".

Files
- lib/supabaseAdmin.ts            (server-only client, service role key)
- app/api/visitors/route.ts       (POST increments, GET reads)
- components/VisitorCounter.tsx   (client widget)
- app/page.tsx                    (renders counter on homepage)
- supabase/migrations/20250820_counters.sql  (table + function)
- .env.local.example

Steps
1) Install dependency if not already present:
   cd ~/Projects/onestupidquiz
   npm i @supabase/supabase-js

2) Create env vars:
   - Locally: copy .env.local.example to .env.local and fill values
   - On Vercel project settings:
     SUPABASE_URL
     SUPABASE_SERVICE_ROLE_KEY

3) In Supabase -> SQL Editor, run the SQL in supabase/migrations/20250820_counters.sql

4) Build:
   rm -rf .next
   npm run build

Git:
   git add .
   git commit -m "feat(counter): first-party visitor counter via Supabase (no personal data)"
   git push origin main
