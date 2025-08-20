// components/Quiz.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { quizzes } from "@/app/data/quizzes";

const QUIP_DELAY_MS = 10000; // 10s before auto-advance

export default function Quiz() {
  const [quizIndex, setQuizIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [locked, setLocked] = useState(false);
  const [done, setDone] = useState(false);
  const [quip, setQuip] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const quiz = quizzes[quizIndex];
  const total = quiz.questions.length;
  const q = quiz.questions[qIndex];

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  function pick(weight: number, quipText?: string) {
    if (locked) return;
    setLocked(true);
    if (typeof weight !== "number") weight = 0;
    if (quipText) setQuip(quipText);
    setScore((s) => +(s + weight).toFixed(2)); // round to 2 decimals

    timerRef.current = window.setTimeout(() => {
      if (qIndex + 1 < total) {
        setQIndex((i) => i + 1);
        setLocked(false);
        setQuip(null);
      } else {
        setDone(true);
      }
    }, QUIP_DELAY_MS);
  }

  function replay() {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setQIndex(0);
    setScore(0);
    setLocked(false);
    setDone(false);
    setQuip(null);
  }

  function nextQuiz() {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    const next = (quizIndex + 1) % quizzes.length;
    setQuizIndex(next);
    setQIndex(0);
    setScore(0);
    setLocked(false);
    setDone(false);
    setQuip(null);
  }

  if (!quiz) return <div>No quizzes found.</div>;

  if (done) {
    const pct = Math.round((score / total) * 100);
    return (
      <section className="quiz-wrap">
        <h2 className="quiz-h">{quiz.title}</h2>
        <div className="center">
          <div className="quiz-q">Done! Score {score}/{total} ({pct}%)</div>
          <div className="actions center">
            <button className="btn" onClick={replay}>Replay</button>
            <button className="btn" onClick={nextQuiz}>Next Quiz</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="quiz-wrap">
      <div className="small">Q{qIndex + 1}/{total} &nbsp; Score {score} / {total}</div>
      <h2 className="quiz-h">{quiz.title}</h2>
      <div className="quiz-q">{q.prompt}</div>

      <div className="quiz-opts">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            className="quiz-btn"
            onClick={() => pick(opt.weight as number, opt.quip)}
            disabled={locked}
          >
            {opt.text}
          </button>
        ))}
      </div>

      {quip && <div className="quip">{quip}</div>}

      <div className="actions">
        <button className="btn" onClick={replay} disabled={qIndex === 0 && !locked}>Replay</button>
        <button className="btn" onClick={nextQuiz}>Next Quiz</button>
      </div>
    </section>
  );
}
