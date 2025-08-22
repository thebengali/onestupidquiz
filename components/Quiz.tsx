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
  feedbackDurationMs?: number; // default 3000ms
  quirkyScoring?: boolean; // optional wacky scoring toggle
  onReplay?: () => void;   // show Replay button if provided
  onNextQuiz?: () => void; // show Next Quiz button if provided
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
    <div className="w-full max-w-3xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-extrabold">{title}</h2>
        <div className="text-sm opacity-80">Q {progressText}</div>
      </div>

      <div className="bg-white/70 rounded-2xl p-6 border shadow-sm">
        <p className="text-xl mb-6">{q.prompt}</p>

        {/* Options as horizontal chips */}
        <div className="flex flex-wrap gap-3 mb-6">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.answerIndex;
            const chosen = selected === i;
            let cls =
              "inline-flex items-center gap-2 px-4 py-2 rounded-full border transition hover:bg-neutral-50";
            if (selected !== null) {
              if (isCorrect) cls = "inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-green-600 bg-green-50";
              if (chosen && !isCorrect) cls = "inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-red-600 bg-red-50";
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
          <div className="mt-2">
            <div className="rounded-xl border-2 border-yellow-400 bg-yellow-50 px-4 py-3 shadow animate-pulse">
              <p className="font-semibold">
                {selected === q.answerIndex ? 'Nice! Correct ✅' : 'Oops! Not quite ❌'}
              </p>
              {q.explain && <p className="text-sm opacity-80 mt-1">{q.explain}</p>}
              <p className="text-xs opacity-70 mt-2">Advancing in 3 seconds…</p>
            </div>
          </div>
        )}

        {/* Footer row inside the card: Score + Replay/Next */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm">
            Score: <span className="font-semibold">{score}</span>
          </div>
          <div className="flex gap-3">
            {onReplay && (
              <button
                className="px-4 py-2 rounded-lg border hover:bg-neutral-50 text-sm"
                onClick={onReplay}
                disabled={showFeedback || selected !== null}
              >
                Replay
              </button>
            )}
            {onNextQuiz && (
              <button
                className="px-4 py-2 rounded-lg border hover:bg-neutral-50 text-sm"
                onClick={onNextQuiz}
                disabled={showFeedback || selected !== null}
              >
                Next Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
