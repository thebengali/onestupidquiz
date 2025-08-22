'use client';
import React, { useMemo, useState } from 'react';
import Quiz from '@/components/Quiz';
import { QUIZ_SETS, QuizSet, ALL_CATEGORIES } from '@/lib/quizzes';

export default function HomePage() {
  const [selectedCat, setSelectedCat] = useState<string>('AI Stuff');
  const setsInCat: QuizSet[] = useMemo(
    () => QUIZ_SETS.filter((s) => s.category === selectedCat),
    [selectedCat]
  );
  const [idx, setIdx] = useState<number>(0);
  const [runKey, setRunKey] = useState<number>(0);

  const active = setsInCat[idx] ?? setsInCat[0] ?? QUIZ_SETS[0];

  const handleSelectCat = (cat: string) => {
    setSelectedCat(cat);
    setIdx(0);
    setRunKey((k) => k + 1);
  };

  const handleReplay = () => setRunKey((k) => k + 1);

  const handleNextQuiz = () => {
    const next = (idx + 1) % Math.max(1, setsInCat.length);
    setIdx(next);
    setRunKey((k) => k + 1);
  };

  return (
    <div className="px-4 py-8">
      {/* Centered Stage Container */}
      <div className="max-w-3xl mx-auto">
        {/* Category row aligned to stage */}
        <div className="mb-8 flex flex-wrap gap-4">
          {ALL_CATEGORIES.map((c) => {
            const activeCat = c === selectedCat;
            return (
              <button
                key={c}
                onClick={() => handleSelectCat(c)}
                className={`px-5 py-2.5 rounded-xl border-2 text-lg ${activeCat ? 'bg-neutral-800 text-white border-neutral-800' : 'hover:bg-neutral-50'}`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Quiz Stage */}
        <Quiz
          key={active.slug + ':' + runKey}
          title={active.title}
          questions={active.questions}
          onReplay={handleReplay}
          onNextQuiz={handleNextQuiz}
        />
      </div>
    </div>
  );
}
