# OSQ — Inline-enforced Stage Layout (2025-08-22)

- Quiz option boxes styled with **inline styles** to override any global `button{}` CSS.
- Stage is centered with `max-w-3xl mx-auto`; category row aligned to stage.
- Files replaced: `components/Quiz.tsx`, `app/page.tsx`, `app/quiz/[id]/page.tsx`.

## Build & Push
npm run build
git add .
git commit -m "style: enforce stacked full-width quiz options and centered stage via inline styles"
git push origin main
