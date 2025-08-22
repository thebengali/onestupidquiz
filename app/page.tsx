'use client';
import Link from 'next/link';
import CategorySidebar from '@/components/CategorySidebar';
import { QUIZ_SETS, ALL_CATEGORIES, QuizSet } from '@/lib/quizzes';
import React, { useMemo, useState } from 'react';

export default function HomePage() {
  const [selectedCat, setSelectedCat] = useState<string>('AI Stuff');

  const filtered: QuizSet[] = useMemo(() => {
    return QUIZ_SETS.filter(s => s.category === selectedCat);
  }, [selectedCat]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-[14rem_1fr] gap-6">
        <CategorySidebar
          categories={ALL_CATEGORIES}
          selected={selectedCat}
          onSelect={setSelectedCat}
        />
        <main>
          <h1 className="text-3xl font-extrabold mb-4">Quiz Sets</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((s) => (
              <Link
                key={s.slug}
                href={`/quiz/${s.slug}`}
                className="block rounded-2xl border bg-white/70 p-4 shadow hover:shadow-md transition"
              >
                <div className="text-xs uppercase opacity-60">{s.categoryTitle}</div>
                <div className="text-lg font-semibold">{s.title}</div>
                <div className="mt-1 text-sm opacity-70">10 questions • {s.vibe}</div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}