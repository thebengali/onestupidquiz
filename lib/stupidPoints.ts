function hashStr(s: string): number { let h = 2166136261 >>> 0; for (let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619);} return h>>>0; }
export function pointsForQuestion(quizDate: string, qid: string, correct: boolean): number {
  const h=hashStr(quizDate+qid);
  if(correct){ const pool=[1,0.73,1.25,0.5,2.5]; return pool[h%pool.length]; }
  else { const pool=[0,0.25,-0.001,0.03]; return pool[h%pool.length]; }
}
export function summarize(points:number, correctCount:number, total:number){
  const label = points>=total?'Gloriously Precise': points>=total*0.7?'Respectably Absurd': points>=total*0.4?'Delightfully Confusing':'Uniquely Yours';
  return { label, correctCount, total, points: Number(points.toFixed(3)) };
}
