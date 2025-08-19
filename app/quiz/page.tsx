'use client';
import { useState } from 'react';
import Link from 'next/link';
import { questions } from '../../data/questions';

export default function QuizPage() {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = questions[i];

  function pick(opt: number) {
    if (done) return;
    if (opt === q.answer) setScore(s => s + 1);
    if (i + 1 < questions.length) setI(i + 1);
    else setDone(true);
  }

  return (
    <main style={{ padding: '20px' }}>
      <h1>Quick Quiz</h1>
      {!done ? (
        <section>
          <p style={{ opacity: .7 }}>Question {i + 1} of {questions.length}</p>
          <h3>{q.question}</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {q.options.map((o, idx) => (
              <li key={idx}>
                <button
                  onClick={() => pick(idx)}
                  style={{ margin: '8px 0', padding: '10px 14px', border: '1px solid #ccc', borderRadius: 8, cursor: 'pointer', width: '100%', textAlign: 'left' }}
                >
                  {o}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section>
          <h2>Your score: {score} / {questions.length}</h2>
          <button onClick={() => { setI(0); setScore(0); setDone(false); }} style={{ marginRight: 10, padding: '10px 14px' }}>Restart</button>
          <Link href="/">Go home</Link>
        </section>
      )}
    </main>
  );
}
