import { notFound } from 'next/navigation';
import Quiz from '@/components/Quiz';
import { QUIZ_SETS } from '@/lib/quizzes';

export function generateStaticParams() {
  return QUIZ_SETS.map(s => ({ id: s.slug }));
}

export default function QuizPage({ params }: { params: { id: string } }) {
  const set = QUIZ_SETS.find(s => s.slug === params.id);
  if (!set) return notFound();
  return <Quiz title={set.title} questions={set.questions} />;
}
