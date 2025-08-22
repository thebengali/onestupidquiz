'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';

/** Question shape accepted by <Quiz />
 * - answerIndex: which option is "best" (+1.00 by default)
 * - weights?: number[4] optional per-option points (fallback to [1.00, .75, .50, .30] where answerIndex gets 1.00)
 * - quipsByOption?: string[4][] optional per-option quip pools; a random quip is picked from the selected option's pool
 * - quipPools?: optional tier-based pools ({best,close,meh,nope}) used when quipsByOption not provided
 * - explain?: optional line shown under the quip
 */
type Question = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  weights?: [number, number, number, number];
  quipsByOption?: [string[], string[], string[], string[]];
  quipPools?: {
    best?: string[];
    close?: string[];
    meh?: string[];
    nope?: string[];
  };
  explain?: string;
};

type QuizProps = {
  title: string;
  questions: Question[];
  feedbackDurationMs?: number; // default 3000
  onReplay?: () => void;
  onNextQuiz?: () => void;
};

const DEFAULT_WEIGHTS: [number, number, number, number] = [1.0, 0.75, 0.5, 0.3];

const DEFAULT_POOLS = {
  best: [
    'Nice. You can sit at the nerd table.',
    'Chef’s kiss.',
    'Correct and a little bit smug—respect.',
    'Flawless victory.',
    'Your future AI overlord nods approvingly.'
  ],
  close: [
    'Close enough to impress a chatbot.',
    'Spicy almost!',
    'Nearly there—just one token off.',
    'You grazed the right neuron.',
    'Solid hunch, slightly off.'
  ],
  meh: [
    'Half credit for enthusiasm.',
    'Not wrong, not right—Schrödinger’s answer.',
    'A tasteful shrug.',
    'It vibes, but it lies.',
    'Decently misguided.'
  ],
  nope: [
    'A choice was made.',
    'Bold… incorrect.',
    'Swing and a philosophical miss.',
    'The gremlins demanded this pick.',
    'Destined for the blooper reel.'
  ]
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function Quiz({
  title,
  questions,
  feedbackDurationMs = 3000,
  onReplay,
  onNextQuiz,
}: QuizProps) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quip, setQuip] = useState<string>('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const q = questions[idx];
  const isLast = idx === questions.length - 1;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const effectiveWeights = useMemo(() => {
    if (q.weights) return q.weights;
    // Build weights giving +1.00 to answerIndex, others get 0.75/0.50/0.30 left-to-right
    const base: number[] = [...DEFAULT_WEIGHTS];
    // Move +1.0 to answerIndex
    const ordered = base.filter((w) => w !== 1.0);
    const weights = [0,0,0,0] as number[];
    for (let i=0; i<4; i++) {
      if (i === q.answerIndex) weights[i] = 1.0;
      else weights[i] = ordered.shift() as number;
    }
    return weights as [number,number,number,number];
  }, [q]);

  const pools = useMemo(() => {
    // Merge custom tier pools with defaults
    return {
      best: q.quipPools?.best && q.quipPools.best.length ? q.quipPools.best : DEFAULT_POOLS.best,
      close: q.quipPools?.close && q.quipPools.close.length ? q.quipPools.close : DEFAULT_POOLS.close,
      meh: q.quipPools?.meh && q.quipPools.meh.length ? q.quipPools.meh : DEFAULT_POOLS.meh,
      nope: q.quipPools?.nope && q.quipPools.nope.length ? q.quipPools.nope : DEFAULT_POOLS.nope,
    };
  }, [q.quipPools]);

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);

    // Compute delta
    const delta = effectiveWeights[i];
    setScore((s) => parseFloat((s + delta).toFixed(2)));

    // Resolve quip
    let qLine = '';
    if (q.quipsByOption && q.quipsByOption[i] && q.quipsByOption[i].length) {
      qLine = pick(q.quipsByOption[i]!);
    } else {
      // Choose a tier pool
      const tier = delta >= 1.0 ? 'best' : delta >= 0.75 ? 'close' : delta >= 0.5 ? 'meh' : 'nope';
      qLine = pick((pools as any)[tier]);
    }
    setQuip(qLine);

    // Auto-advance
    timerRef.current = setTimeout(() => {
      setSelected(null);
      setQuip('');
      if (isLast) {
        setIdx(0); // loop or keep? For now loop to start
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
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-4xl font-extrabold">{title}</h2>
        <div className="text-right">
          <div className="text-lg font-medium opacity-80">Q {progressText}</div>
          <div className="text-sm font-semibold">Score: {score.toFixed(2)} Gremlin Points</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border-2 shadow-sm">
        <p className="text-3xl font-semibold mb-6">{q.prompt}</p>

        <div className="space-y-4 mb-8">
          {q.options.map((opt, i) => {
            const isBest = i === q.answerIndex;
            const chosen = selected === i;
            let style: React.CSSProperties = { ...baseOption };
            if (selected !== null) {
              if (isBest) style = { ...style, background: '#dcfce7', borderColor: '#15803d' };
              if (chosen && !isBest) style = { ...style, background: '#fee2e2', borderColor: '#dc2626' };
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
                {selected !== null && chosen && (
                  <span className="ml-3 text-sm font-semibold opacity-70">+{effectiveWeights[i].toFixed(2)}</span>
                )}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="mt-2">
            <div className="rounded-xl border-2 px-5 py-4 shadow" style={{ background: '#a7f3d0', borderColor: '#047857' }}>
              <p className="text-xl font-bold mb-1">{quip}</p>
              {q.explain && <p className="text-sm">{q.explain}</p>}
            </div>
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <button
            className="px-8 py-5 rounded-lg border-2 text-2xl font-medium hover:bg-neutral-50 disabled:opacity-50"
            onClick={onReplay}
            disabled={!onReplay || selected !== null}
          >
            Replay
          </button>
          <button
            className="px-8 py-5 rounded-lg border-2 text-2xl font-medium hover:bg-neutral-50 disabled:opacity-50"
            onClick={onNextQuiz}
            disabled={!onNextQuiz || selected !== null}
          >
            Next Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
