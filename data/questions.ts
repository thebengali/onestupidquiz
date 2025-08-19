export type Q = { id: number; question: string; options: string[]; answer: number };
export const questions: Q[] = [
  { id: 1, question: 'Capital of France?', options: ['Berlin','Paris','Rome','Madrid'], answer: 1 },
  { id: 2, question: '2 + 2 = ?',        options: ['3','4','5','22'],               answer: 1 },
  { id: 3, question: 'Sky color?',        options: ['Green','Blue','Red','Yellow'],  answer: 1 }
];
