'use client';

import { useState } from 'react';
import Link from 'next/link';
import { questions } from '../../data/questions';

export default function QuizPage() {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [locked, setLocked] = useState(false);
  const [done, setDone] = useState(false);

  const q = questions[i];

  function pick(choice: number) {
    if (done || locked || !q) return;
    setLocked(true);

    const correct = choice === q.correct;
    if (correct) {
      const awarded = 1 + Math.min(streak, 3);
      setScore((s) => s + awarded);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      setLocked(false);
      if (i + 1 < questions.length) setI(i + 1);
      else setDone(true);
    }, 250);
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>OneStupidQuiz</h1>

      {!done && q && (
        <>
          <p>Q{i + 1}/{questions.length}</p>
          <h2>{q.question}</h2>

          <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
            {q.answers.map((a, idx) => (
              <button
                key={idx}
                disabled={locked}
                onClick={() => pick(idx)}
                style={{ padding: '12px 16px', cursor: locked ? 'not-allowed' : 'pointer' }}
              >
                {a}
              </button>
            ))}
          </div>
        </>
      )}

      {done && (
        <>
          <h2>All done!</h2>
          <p>Score: {score}</p>
          <p>Best streak: {streak}</p>
          <Link href="/"><u>Back home</u></Link>
        </>
      )}
    </main>
  );
}
