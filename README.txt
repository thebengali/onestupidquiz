# OSQ — Switch to QuizStage component (2025-08-22)

This update guarantees the mockup layout by introducing a new component and updating imports.

## Files
- components/QuizStage.tsx (NEW): Stacked full-width options, green feedback, large buttons
- app/page.tsx (UPDATED): Uses QuizStage and centers the stage (`max-w-3xl mx-auto`); categories aligned to stage width
- app/quiz/[id]/page.tsx (UPDATED): Uses QuizStage

## Clean-up (remove legacy component to avoid confusion)
git rm components/Quiz.tsx

## Build & push
rm -rf .next
npm run build
git add .
git commit -m "refactor(ui): switch to QuizStage with centered stage and stacked options per mockup"
git push origin main

## Verify
- Options render as big stacked boxes with 1., 2., 3., 4.
- Category row stays aligned to the same width as the quiz stage.
- Feedback shows in a green highlighted bar for ~3s.
