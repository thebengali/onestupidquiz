'use client';
import { useMemo, useState } from 'react';
import { questions, Option } from "@/app/data/questions";

type Q = {
  id: string;
  prompt: string;
  answers: { text: string; weight: number; quip?: string }[];
};

const BANNERS = {
  perfect: "you sly genius.",
  great: "chef’s kiss.",
  ok: "mid, but spicy.",
  low: "hot mess and proud."
};

export default function Quiz() {
  const qs: Q[] = questions as unknown as Q[];
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [quip, setQuip] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [done, setDone] = useState(false);

  const q = qs[i];

  function pick(opt: number) {
    if (done || locked) return;
    setLocked(true);
    const chosen = q.answers[opt];
    const awarded = chosen?.weight ?? 0;
    setScore(s => s + awarded);
    setStreak(s => (awarded >= 0.75 ? s + 1 : 0));
    setQuip(chosen?.quip ?? null);
    setTimeout(() => {
      setQuip(null);
      if (i + 1 < qs.length) {
        setI(i + 1);
        setLocked(false);
      } else {
        setDone(true);
      }
    }, 1100);
  }

  const summary = useMemo(() => {
    const max = qs.reduce((t, qq) => t + Math.max(...qq.answers.map(a => a.weight)), 0);
    const pct = max ? Math.round((score / max) * 100) : 0;
    let banner = BANNERS.low;
    if (pct >= 90) banner = BANNERS.perfect;
    else if (pct >= 70) banner = BANNERS.great;
    else if (pct >= 40) banner = BANNERS.ok;
    return { pct, banner };
  }, [score, qs]);

  if (!q) return null;

  return (
    <div style={{maxWidth:700,margin:'0 auto',padding:16}}>
      {!done ? (
        <>
          <p style={{opacity:.6}}>Q{i+1}/{qs.length}</p>
          <h2>{q.prompt}</h2>
          <div style={{display:'grid',gap:12,marginTop:16}}>
            {q.answers.map((a, idx) => (
              <button
                key={idx}
                onClick={() => pick(idx)}
                disabled={locked}
                style={{
                  textAlign:'left', padding:'12px 16px',
                  border:'1px solid #ddd', borderRadius:10, cursor:'pointer',
                  opacity: locked ? 0.8 : 1
                }}
              >
                {a.text}
              </button>
            ))}
          </div>
          {quip && (
            <div style={{marginTop:14, padding:'10px 12px', border:'1px dashed #aaa', borderRadius:10}}>
              {quip}
            </div>
          )}
          <div style={{marginTop:12, fontSize:12, opacity:.7}}>streak: {streak}</div>
        </>
      ) : (
        <div style={{textAlign:'center',padding:'24px 0'}}>
          <h2>Score: {summary.pct}%</h2>
          <p style={{fontSize:18,marginTop:6}}>{summary.banner}</p>
          <button
            onClick={() => { setI(0); setScore(0); setStreak(0); setDone(false); setLocked(false); }}
            style={{marginTop:16, padding:'10px 14px', border:'1px solid #111', borderRadius:10}}
          >
            replay
          </button>
        </div>
      )}
    </div>
  );
}
