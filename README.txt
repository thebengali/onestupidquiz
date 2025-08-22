# OSQ — Homepage Quiz Stage Update (2025-08-22)

- Home page now shows the **Quiz Stage** (no set list).
- Category sidebar remains; selecting a category loads that category's **first quiz**.
- Added **Replay** and **Next Quiz** buttons inside the quiz card.
- Options now render as **horizontal chips** that wrap.
- Keeps 3s feedback highlight & auto-advance.

## Files
- components/Quiz.tsx (updated)
- app/page.tsx (updated)

## Local check
npm run build

## Commit & push
git add .
git commit -m "feat: homepage shows quiz stage with category filter, replay & next; chip options"
git push origin main
