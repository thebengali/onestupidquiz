# ONESTUPIDQUIZ

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

---

## Recent Update — 2025-08-22
# ONESTUPIDQUIZ — Update (2025-08-22)

## Summary
1) Feedback display reduced to **3 seconds** and visually highlighted in the quiz.
2) **Category sidebar** added to Home. Clicking a category filters visible quiz sets and highlights the selected category.
   - Default highlighted category is **AI Stuff**.
3) Data model in `lib/quizzes.ts` updated to support categories. Seeded **sample sets** (3 per category) as a template.
   - You can scale to 20 sets per category by appending to `QUIZ_SETS`.

> No database changes. No new env vars.

## Files Added/Updated
- `components/Quiz.tsx` (UPDATED): Feedback timing + visual highlight; auto-advance after 3s.
- `components/CategorySidebar.tsx` (NEW): Sidebar with categories and selection state.
- `app/page.tsx` (UPDATED): New layout; renders category sidebar on the left and filtered quiz list.
- `lib/quizzes.ts` (UPDATED): Introduces `Category` type and seeds sample sets in categories.

## Local Sanity Check (recommended for this change)
```bash
npm install
npm run build
```

## Commit & Push (RTP)
```bash
git add .
git commit -m "feat: category sidebar on home and 3s feedback highlight in quiz"
git push origin main
```

## How to add more quiz sets (up to 20 per category)
Open `lib/quizzes.ts` and append new entries to the `QUIZ_SETS` array for the category you want. Each set needs a unique `slug` and 10 questions.Use the provided examples as a template.

## Notes
- Default category is **AI Stuff** to match your requirement.
- If your quiz route differs (e.g., `/play/[slug]`), adjust links in `app/page.tsx` accordingly.
