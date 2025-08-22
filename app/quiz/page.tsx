import { redirect } from 'next/navigation';
import { QUIZ_SETS } from '@/lib/quizzes';

export default function QuizRoute() {
  const def = QUIZ_SETS.find(s => s.category === 'AI Stuff') ?? QUIZ_SETS[0];
  redirect(`/quiz/${def.slug}`);
}
