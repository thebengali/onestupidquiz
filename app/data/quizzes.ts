// app/data/quizzes.ts
import type { Question } from "./questions";
import { questions as quiz1 } from "./questions";

const quiz2: Question[] = quiz1.map((q, idx) => ({
  ...q,
  id: `q${idx + 1}-b` // distinct ids
}));

export type QuizSet = { id: string; title: string; questions: Question[] };

export const quizzes: QuizSet[] = [
  { id: "quiz-1", title: "General Fun (Set 1)", questions: quiz1 },
  { id: "quiz-2", title: "General Fun (Set 2)", questions: quiz2 }
];
