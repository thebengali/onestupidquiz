import { notFound } from 'next/navigation';
import Quiz from '@components/Quiz';
import { QUIZ_SETS as CURATED_QUIZ_SETS } from '@/lib/quizzes';
import { GENERATED_QUIZ_SETS } from '@/lib/quizzes_generated';

const QUIZ_SETS = [...CURATED_QUIZ_SETS, ...GENERATED_QUIZ_SETS];

export function generateStaticParams() {
  return QUIZ_SETS.map(s => ({ id: s.slug }));
}

export default function QuizPage({ params }: { params: { id: string } }) {
  const set = QUIZ_SETS.find(s => s.slug === params.id);
  if (!set) return notFound();
  return <Quiz title={set.title} questions={set.questions} />;
}
