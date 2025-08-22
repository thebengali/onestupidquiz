'use client';

import React, { useMemo, useState } from 'react';
import Quiz from '@components/Quiz';
import VisitorsCounter from '@components/VisitorsCounter';
import { QUIZ_SETS as CURATED_QUIZ_SETS } from '@/lib/quizzes';
import { GENERATED_QUIZ_SETS } from '@/lib/quizzes_generated';

const QUIZ_SETS = [...CURATED_QUIZ_SETS, ...GENERATED_QUIZ_SETS];
const ALL_CATEGORIES = ['AI Stuff','Random','History','Geography','Science','Language','Sports'] as const;

export default function HomePage() {
  const [selectedCat, setSelectedCat] = useState<string>('AI Stuff');
  const [idx, setIdx] = useState<number>(0);
  const [runKey, setRunKey] = useState<number>(0);

  const setsInCat = useMemo(() => {
    return QUIZ_SETS
      .filter((s) => s.category === selectedCat)
      .slice()
      .sort((a, b) => {
        const ao = (a as any).order ?? 0;
        const bo = (b as any).order ?? 0;
        if (ao !== bo) return ao - bo;
        return a.title.localeCompare(b.title);
      });
  }, [selectedCat]);

  const active = setsInCat[idx] ?? null;

  const handleSelectCat = (cat: string) => {
    setSelectedCat(cat);
    setIdx(0);
    setRunKey((k) => k + 1);
  };

  const handleReplay = () => setRunKey((k) => k + 1);

  const handleNextQuiz = () => {
    if (setsInCat.length > 1) {
      setIdx((i) => (i + 1) % setsInCat.length);
    }
    setRunKey((k) => k + 1);
  };

  const chip = (active: boolean, enabled: boolean): React.CSSProperties => ({
    padding: '10px 14px',
    borderRadius: 10,
    border: '1px solid #ccc',
    background: active ? '#333' : enabled ? '#fff' : '#f5f5f5',
    color: active ? '#fff' : '#111',
    opacity: enabled ? 1 : 0.5,
    cursor: enabled ? 'pointer' : 'not-allowed',
    fontWeight: 700,
  });

  const countsByCat = useMemo(() => {
    const m = new Map<string, number>();
    for (const s of QUIZ_SETS) m.set(s.category, (m.get(s.category) ?? 0) + 1);
    return m;
  }, []);

  return (
    <div style={{ padding: '32px 16px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* Category chips */}
        <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {ALL_CATEGORIES.map((c) => {
            const has = (countsByCat.get(c) ?? 0) > 0;
            const isActive = c === selectedCat;
            return (
              <button
                key={c}
                onClick={() => has && handleSelectCat(c)}
                style={chip(isActive, has)}
                disabled={!has}
                aria-pressed={isActive}
              >
                {c}
              </button>
            );
          })}
        </div>

        <VisitorsCounter key="home" align="right" />

        {!active ? (
          <div style={{ padding: 24, border: '2px dashed #bbb', borderRadius: 16, background: '#fafafa' }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{selectedCat}</h3>
            <p style={{ marginTop: 8 }}>No quizzes in this category yet. Pick another category.</p>
          </div>
        ) : (
          <Quiz
            key={active.slug + ':' + runKey}
            title={active.title}
            questions={active.questions}
            onReplay={handleReplay}
            onNextQuiz={handleNextQuiz}
          />
        )}
      </div>
    </div>
  );
}
