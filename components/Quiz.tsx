// app/components/Quiz.tsx
"use client";

import { useMemo, useState } from "react";
import { questions as qlist, Option, Question } from "@/app/data/questions";

export default function Quiz() {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [locked, setLocked] = useState(false);
  const [done, setDone] = useState(false);
  const [quip, setQuip] = useState<string | null>(null);

  const total = qlist.length;

  const maxPossible = useMemo(
    () =>
      qlist.reduce(
        (m, q) => m + Math.max(...q.options.map((o) => o.weight)),
        0
      ),
    []
  );

  const q = qlist[i];

  function pick(opt: Option) {
    if (locked || done) return;
    setLocked(true);
    setScore((s) => +(s + opt.weight).toFixed(2));
    setQuip(opt.quip ?? null);

    const best = Math.max(...q.options.map((o) => o.weight));
    setStreak((s) => (opt.weight === best ? s + 1 : 0));

    setTimeout(() => {
      setLocked(false);
      setQuip(null);
      if (i + 1 < total) setI(i + 1);
      else setDone(true);
    }, 900);
  }

  if (done) {
    const pct = Math.round((score / maxPossible) * 100);
    return (
      <main style={{ padding: 24 }}>
        <h1>That’s a wrap 🎬</h1>
        <p style={{ marginTop: 8 }}>
          Score: <b>{score}</b> / {maxPossible} ({pct}%)
        </p>
        <p style={{ marginTop: 8 }}>
          Hot-streak: <b>{streak}</b>
        </p>
        <button
          onClick={() => {
            setI(0);
            setScore(0);
            setStreak(0);
            setLocked(false);
            setDone(false);
            setQuip(null);
          }}
          style={{
            marginTop: 16,
            padding: "10px 16px",
            border: "1px solid #333",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Play again
        </button>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <h1 style={{ margin: 0 }}>Q{i + 1}/{total}</h1>
        <span style={{ opacity: 0.7 }}>
          Score {score} / {maxPossible}
        </span>
      </div>

      <h2 style={{ marginTop: 12 }}>{q.prompt}</h2>

      {quip && (
        <div
          style={{
            marginTop: 8,
            padding: "8px 12px",
            border: "1px dashed #999",
            background: "#fafafa",
            borderRadius: 8,
          }}
        >
          {quip}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gap: 12,
          marginTop: 16,
          gridTemplateColumns: "1fr",
          maxWidth: 700,
        }}
      >
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => pick(opt)}
            disabled={locked}
            style={{
              textAlign: "left",
              padding: "14px 16px",
              borderRadius: 12,
              border: "2px solid #111",
              background: locked ? "#eee" : "#fff",
              cursor: locked ? "not-allowed" : "pointer",
              fontSize: 16,
            }}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </main>
  );
}
