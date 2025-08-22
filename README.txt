# Quiz Generator — 90 per category + 20 quip sets

This patch adds a generator and wires generated sets into the site.
It does NOT remove/modify your curated sets; it merges them at runtime.

## Files added
- scripts/quip_sets.mjs                     // 20 quip quadruplets
- scripts/gen-quizzes.mjs                   // generator (ESM Node)
- lib/quizzes_generated.ts                  // stub (generator overwrites)

## Files updated
- app/page.tsx                              // merges curated + generated
- app/quiz/[id]/page.tsx                    // merges curated + generated

## Generate 90 sets per category
node scripts/gen-quizzes.mjs --perCat 90

## RTPs
git add lib/quizzes_generated.ts app/page.tsx app/quiz/[id]/page.tsx scripts/*.mjs
git commit -m "feat(quizzes): add generator; merge generated sets; seed 90 per category"
git push origin main

> Re-run the generator any time to refresh content; it deterministically rebuilds the same slugs.
