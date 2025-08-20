ONESTUPIDQUIZ — Anti‑Gamification & SEO Patch

What changes
- Removes Sign Up from header; no auth, no tracking.
- Dedicated routes per quiz at /quiz/[id] for better SEO and sharing.
- Home lists all quizzes with Start buttons.
- Next Quiz navigates to the next route.
- Simple Privacy page that states “we collect nothing.”
- robots.ts + sitemap.ts for basic SEO.

Replace/add files:
- components/Header.tsx
- components/Footer.tsx
- components/Quiz.tsx
- app/page.tsx
- app/quiz/[id]/page.tsx   (new folder)
- app/privacy/page.tsx      (new)
- app/robots.ts             (new)
- app/sitemap.ts            (new)

Then:
  cd ~/Projects/onestupidquiz
  rm -rf .next
  npm run build

Git:
  git add .
  git commit -m "feat: anti-gamification pass; routed quizzes; privacy page; SEO robots+sitemap"
  git push origin main

Optional: delete the old sign-up page entirely:
  git rm -r app/signup || true
