'use client';
import React, { useEffect, useRef, useState } from 'react';

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
  feedbackDurationMs?: number; // default 3000
  quirkyScoring?: boolean;
  onReplay?: () => void;
  onNextQuiz?: () => void;
};

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
  feedbackDurationMs = 3000,
  quirkyScoring = true,
  onReplay,
  onNextQuiz,
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
    if (selected !== null) return;
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
    <div className="w-full">
      <h2 className="text-4xl font-extrabold mb-3">{title}</h2>
      <div className="text-lg font-medium opacity-80 mb-6">Q {progressText}</div>

      <div className="bg-white rounded-2xl p-6 border-2 shadow-sm">
        <p className="text-3xl font-semibold mb-6">{q.prompt}</p>

        {/* Stacked full-width options */}
        <div className="space-y-4 mb-8">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.answerIndex;
            const chosen = selected === i;
            let cls = "block w-full text-left px-6 py-5 rounded-lg border-2 text-2xl font-medium flex items-center gap-5 transition";
            if (selected !== null) {
              if (isCorrect) cls += " bg-green-50 border-green-700";
              if (chosen && !isCorrect) cls += " bg-red-50 border-red-600";
            } else {
              cls += " hover:bg-neutral-50";
            }
            return (
              <button
                key={i}
                className={cls}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
              >
                <span className="text-3xl font-bold w-8">{i + 1}.</span>
                <span className="flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback banner */}
        {showFeedback && (
          <div className="mt-2">
            <div className="rounded-xl border-2 border-green-700 bg-green-200 px-5 py-4 shadow">
              <p className="text-xl font-bold">
                {selected === q.answerIndex ? 'Feedback: Correct ✅' : 'Feedback: Not quite ❌'}
              </p>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <button
            className="px-6 py-4 rounded-lg border-2 text-xl font-medium hover:bg-neutral-50 disabled:opacity-50"
            onClick={onReplay}
            disabled={!onReplay || showFeedback || selected !== null}
          >
            Replay
          </button>
          <button
            className="px-6 py-4 rounded-lg border-2 text-xl font-medium hover:bg-neutral-50 disabled:opacity-50"
            onClick={onNextQuiz}
            disabled={!onNextQuiz || showFeedback || selected !== null}
          >
            Next Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
