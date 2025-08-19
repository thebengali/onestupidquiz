"use client";

import { useState } from "react";
import questions from "@/data/questions";

type Q = (typeof questions)[number];

export default function QuizPage() {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [locked, setLocked] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);

  const q: Q | undefined = questions[idx];
  const total = questions.length;

  if (!q) {
    // End screen
    return (
      <main style={{ padding: 24 }}>
        <h1>Quiz Complete 🎉</h1>
        <p style={{ marginTop: 8 }}>
          Final score: <b>{score}</b> points
        </p>
        <button
          onClick={() => {
            setIdx(0);
            setScore(0);
            setStreak(0);
            setPicked(null);
            setLocked(false);
          }}
          style={btn}
        >
          Play again
        </button>
      </main>
    );
  }

  const points = q.points ?? 5;
  const multiplier = 1 + Math.min(streak, 5) * 0.2; // up to 2×
  const awarded = Math.round(points * multiplier);

  function pickAnswer(i: number) {
    if (locked) return;
    setPicked(i);
    setLocked(true);

    const correct = i === q.correct;
    if (correct) {
      setScore((s) => s + awarded);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  }

  function next() {
    if (!locked) return;
    setIdx((n) => n + 1);
    setPicked(null);
    setLocked(false);
  }

  return (
    <main style={{ padding: 24, maxWidth: 760 }}>
      <header style={{ marginBottom: 12, display: "flex", gap: 16, alignItems: "baseline" }}>
        <h1 style={{ margin: 0 }}>OneStupidQuiz</h1>
        <span style={{ opacity: 0.7 }}>
          Q {idx + 1}/{total}
        </span>
        <span style={{ marginLeft: "auto" }}>
          Score: <b>{score}</b> · Streak: <b>{streak}</b>
        </span>
      </header>

      <section>
        <h2 style={{ marginTop: 0 }}>{q.question}</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: "16px 0", display: "grid", gap: 10 }}>
          {q.answers.map((a, i) => {
            const isPick = i === picked;
            const isCorrect = locked && i === q.correct;
            const isWrong = locked && isPick && !isCorrect;
            return (
              <li key={i}>
                <button
                  onClick={() => pickAnswer(i)}
                  disabled={locked}
                  style={{
                    ...btn,
                    width: "100%",
                    textAlign: "left",
                    borderColor: isCorrect ? "#22c55e" : isWrong ? "#ef4444" : "#999",
                    background: isCorrect ? "#ecfdf5" : isWrong ? "#fef2f2" : "white",
                  }}
                >
                  {a}
                </button>
              </li>
            );
          })}
        </ul>

        {!locked ? (
          <p style={{ opacity: 0.7 }}>This question is worth <b>{points}</b> pts · streak bonus x{multiplier.toFixed(1)}</p>
        ) : (
          <div style={{ marginTop: 8 }}>
            {picked === q.correct ? (
              <p>
                ✅ <b>Correct!</b> {q.quipCorrect ?? "Nice."} +{awarded} pts (base {points} × {multiplier.toFixed(1)})
              </p>
            ) : (
              <p>
                ❌ <b>Not quite.</b> {q.quipWrong ?? "Chaos points not awarded."} The answer was{" "}
                <b>{q.answers[q.correct]}</b>.
              </p>
            )}
            <button onClick={next} style={btn}>Next →</button>
          </div>
        )}
      </section>
    </main>
  );
}

const btn: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid #999",
  background: "white",
  cursor: "pointer",
};
