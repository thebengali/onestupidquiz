'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';

type Question = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explain?: string;
};

type QuizProps = {
  title: string;
  questions: Question[];
  onComplete?: (score: number) => void;
  feedbackDurationMs?: number; // default 3000ms
  quirkyScoring?: boolean; // optional wacky scoring toggle
};

// Simple quirky scoring: +1 for correct, -0.3 for wrong, +0.5 bonus if streak >= 3
function computeScoreDelta(correct: boolean, streak: number) {
  if (correct) {
    let delta = 1;
    if (streak >= 3) delta += 0.5;
    return delta;
  } else {
    return -0.3;
  }
}

export default function Quiz({
  title,
  questions,
  onComplete,
  feedbackDurationMs = 3000, // updated default
  quirkyScoring = true,
}: QuizProps) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const q = questions[idx];
  const isLast = idx === questions.length - 1;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleSelect = (i: number) => {
    if (selected !== null) return; // prevent double clicks during feedback
    setSelected(i);
    const correct = i === q.answerIndex;

    if (quirkyScoring) {
      const delta = computeScoreDelta(correct, streak);
      setScore((s) => Math.max(0, parseFloat((s + delta).toFixed(2))));
      setStreak((st) => (correct ? st + 1 : 0));
    } else {
      setScore((s) => s + (correct ? 1 : 0));
    }

    setShowFeedback(true);

    // Auto-advance after feedbackDurationMs
    timerRef.current = setTimeout(() => {
      setShowFeedback(false);
      setSelected(null);
      if (isLast) {
        onComplete?.(score);
      } else {
        setIdx((n) => n + 1);
      }
    }, feedbackDurationMs);
  };

  const progressText = `${idx + 1} / ${questions.length}`;

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="text-sm opacity-80">Q {progressText}</div>
      </div>

      <div className="bg-white/70 rounded-2xl p-4 shadow">
        <p className="text-lg mb-4">{q.prompt}</p>
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.answerIndex;
            const chosen = selected === i;
            // Highlight during feedback
            const base =
              'w-full text-left px-4 py-3 rounded-xl border transition';
            let cls = base + ' hover:bg-neutral-50';
            if (selected !== null) {
              if (isCorrect) cls = base + ' border-green-600 bg-green-50';
              if (chosen && !isCorrect) cls = base + ' border-red-600 bg-red-50';
            }
            return (
              <button
                key={i}
                className={cls}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Feedback banner */}
        {showFeedback && (
          <div className="mt-4">
            <div className="rounded-xl border-2 border-yellow-400 bg-yellow-50 px-4 py-3 shadow animate-pulse">
              <p className="font-semibold">
                {selected === q.answerIndex ? 'Nice! Correct ✅' : 'Oops! Not quite ❌'}
              </p>
              {q.explain && (
                <p className="text-sm opacity-80 mt-1">{q.explain}</p>
              )}
              <p className="text-xs opacity-70 mt-2">
                Advancing in 3 seconds…
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm">Score: <span className="font-semibold">{score}</span></div>
          {!showFeedback && (
            <button
              className="text-sm underline opacity-80 disabled:opacity-40"
              onClick={() => {
                // manual next (only if nothing selected yet)
                if (selected === null && !isLast) setIdx((n) => n + 1);
              }}
              disabled={selected !== null || isLast}
            >
              Skip
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
