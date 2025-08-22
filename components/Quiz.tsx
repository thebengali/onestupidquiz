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
  onReplay?: () => void;
  onNextQuiz?: () => void;
};

export default function Quiz({
  title,
  questions,
  onComplete,
  feedbackDurationMs = 3000,
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

    const delta = correct ? (streak >= 3 ? 1.5 : 1) : -0.3;
    setScore((s) => Math.max(0, parseFloat((s + delta).toFixed(2))));
    setStreak((st) => (correct ? st + 1 : 0));

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

  const baseOption: React.CSSProperties = {
    width: '100%',
    textAlign: 'left',
    padding: '20px 24px',
    borderRadius: 12,
    borderWidth: 2,
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    fontSize: 22,
    fontWeight: 600,
    background: 'white',
  };

  return (
    <div className="w-full">
      <h2 className="text-4xl font-extrabold mb-3">{title}</h2>
      <div className="text-lg font-medium opacity-80 mb-6">Q {progressText}</div>

      <div className="bg-white rounded-2xl p-6 border-2 shadow-sm">
        <p className="text-3xl font-semibold mb-6">{q.prompt}</p>

        <div className="space-y-4 mb-8">
          {q.options.map((opt, i) => {
            const isCorrect = i === q.answerIndex;
            const chosen = selected === i;
            let style: React.CSSProperties = { ...baseOption };
            if (selected !== null) {
              if (isCorrect) style = { ...style, background: '#dcfce7', borderColor: '#15803d' };
              if (chosen && !isCorrect) style = { ...style, background: '#fee2e2', borderColor: '#dc2626' };
            }
            return (
              <button
                key={i}
                style={style}
                className="transition hover:bg-neutral-50"
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
              >
                <span style={{ fontSize: 26, fontWeight: 800, width: 30, display: 'inline-block' }}>{i + 1}.</span>
                <span style={{ flex: 1 }}>{opt}</span>
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="mt-2">
            <div className="rounded-xl border-2 px-5 py-4 shadow" style={{ background: '#a7f3d0', borderColor: '#047857' }}>
              <p className="text-xl font-bold">
                {selected === q.answerIndex ? 'Feedback: Correct ✅' : 'Feedback: Not quite ❌'}
              </p>
            </div>
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <button
            className="px-8 py-5 rounded-lg border-2 text-2xl font-medium hover:bg-neutral-50 disabled:opacity-50"
            onClick={onReplay}
            disabled={!onReplay || showFeedback || selected !== null}
          >
            Replay
          </button>
          <button
            className="px-8 py-5 rounded-lg border-2 text-2xl font-medium hover:bg-neutral-50 disabled:opacity-50"
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
