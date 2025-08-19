"use client";
import { useState } from "react";
import questions from "../../data/questions";

export default function QuizPage() {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [done, setDone] = useState(false);

  const q = questions[i];
  const totalMax = questions.length; // max 1.0 per question

  function pick(idx: number) {
    if (!q || locked) return;
    setSel(idx);
    setLocked(true);
    setScore(s => Number((s + q.options[idx].score).toFixed(2)));
  }

  function next() {
    if (i + 1 < questions.length) {
      setI(i + 1);
      setSel(null);
      setLocked(false);
    } else {
      setDone(true);
    }
  }

  if (done) {
    const pct = Math.round((score / totalMax) * 100);
    const verdict =
      pct >= 85 ? "You’re dangerously sensible. Seek chaos immediately."
      : pct >= 65 ? "Competent with mischief. HR is watching."
      : pct >= 40 ? "Functioning satirist. Passport: sarcasm."
      : "You are the quiz. Everyone else is just playing.";
    return (
      <main style={wrap}>
        <h1 style={h1}>You made it.</h1>
        <p style={p}>Weighted score: <b>{score.toFixed(2)}</b> / {totalMax} · {pct}%</p>
        <p style={{...p, opacity:.8}}>{verdict}</p>
        <button onClick={() => { setI(0); setScore(0); setSel(null); setLocked(false); setDone(false); }} style={btn}>
          Restart
        </button>
      </main>
    );
  }

  if (!q) return <main style={wrap}><p style={p}>No questions.</p></main>;

  return (
    <main style={wrap}>
      <header style={{display:"flex",gap:12,alignItems:"baseline"}}>
        <h1 style={h1}>OneStupidQuiz</h1>
        <span style={{opacity:.6}}>Q{i+1}/{questions.length}</span>
        <span style={{marginLeft:"auto"}}>Score: <b>{score.toFixed(2)}</b></span>
      </header>

      <h2 style={h2}>{q.question}</h2>

      <div style={{display:"grid",gap:10,marginTop:10}}>
        {q.options.map((o, idx) => {
          const selected = sel === idx;
          return (
            <button
              key={idx}
              onClick={() => pick(idx)}
              disabled={locked}
              style={{
                ...btn,
                textAlign:"left",
                borderColor: selected && locked ? "#111" : "#999",
                background: selected && locked ? "#f4f4f5" : "#fff",
                cursor: locked ? "default" : "pointer"
              }}
            >
              {o.text}
            </button>
          );
        })}
      </div>

      {locked && sel !== null && (
        <div style={{marginTop:14,padding:12,border:"1px solid #ddd",borderRadius:10,background:"#f8f8f8"}}>
          <p style={p}><b>Your pick:</b> {q.options[sel].quip}</p>
          <p style={{...p,opacity:.8}}>Awarded: <b>{q.options[sel].score}</b> point{q.options[sel].score===1 ? "" : "s"}</p>
          <button onClick={next} style={{...btn,marginTop:8}}>Next →</button>
        </div>
      )}

      {!locked && <p style={{...p,opacity:.6,marginTop:12}}>Pick first to reveal the universe’s opinionated tooltip.</p>}
    </main>
  );
}

const wrap: React.CSSProperties = { padding:24, maxWidth:760, margin:"0 auto", color:"#111", background:"#fff" };
const h1: React.CSSProperties = { margin:0, fontSize:24 };
const h2: React.CSSProperties = { margin:"8px 0 0", fontSize:20 };
const p:  React.CSSProperties = { margin:"6px 0" };
const btn: React.CSSProperties = { padding:"12px 14px", borderRadius:10, border:"1px solid #999", background:"#fff" };
