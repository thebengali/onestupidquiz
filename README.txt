ONESTUPIDQUIZ — UX + QUIZ UPGRADE
Date: 2025-08-20

What's included
- Centered layout + proper header/nav/footer styles in app/globals.css
- Header: logo left, site title centered (fun font), menu right
- Quiz: 10 questions per quiz, quip shows for 10 seconds before auto-advance
- Replay + Next Quiz buttons (cycles through 2 quiz sets; set 2 reuses questions as placeholder)
- Keeps your alias setup and routes the same (Home uses components/Quiz)

Replace these files:
- app/globals.css
- components/Header.tsx
- components/Footer.tsx
- components/Quiz.tsx
- app/data/questions.ts
- app/data/quizzes.ts (new)
- app/layout.tsx

Commands:
  cd ~/Projects/onestupidquiz
  rm -rf .next
  npm run build

Git:
  git add .
  git commit -m "feat(ui): centered layout; header/nav/footer; quiz with 10 questions, 10s quip delay, replay/next"
  git push origin main
