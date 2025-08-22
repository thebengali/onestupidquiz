'use client';
import React, { useMemo, useState } from 'react';
import CategorySidebar from '@/components/CategorySidebar';
import Quiz from '@/components/Quiz';
import { QUIZ_SETS, QuizSet, ALL_CATEGORIES } from '@/lib/quizzes';

export default function HomePage() {
  const [selectedCat, setSelectedCat] = useState<string>('AI Stuff');
  const setsInCat: QuizSet[] = useMemo(
    () => QUIZ_SETS.filter((s) => s.category === selectedCat),
    [selectedCat]
  );
  const [idx, setIdx] = useState<number>(0);
  const [runKey, setRunKey] = useState<number>(0); // bump to replay

  const active = setsInCat[idx] ?? setsInCat[0] ?? QUIZ_SETS[0];

  const handleSelectCat = (cat: string) => {
    setSelectedCat(cat);
    setIdx(0);
    setRunKey((k) => k + 1); // reset quiz instance
  };

  const handleReplay = () => setRunKey((k) => k + 1);

  const handleNextQuiz = () => {
    const next = (idx + 1) % Math.max(1, setsInCat.length);
    setIdx(next);
    setRunKey((k) => k + 1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-[14rem_1fr] gap-8">
        <CategorySidebar
          categories={ALL_CATEGORIES}
          selected={selectedCat}
          onSelect={handleSelectCat}
        />
        <main>
          <Quiz
            key={active.slug + ':' + runKey}
            title={active.title}
            questions={active.questions}
            onReplay={handleReplay}
            onNextQuiz={handleNextQuiz}
          />
        </main>
      </div>
    </div>
  );
}
