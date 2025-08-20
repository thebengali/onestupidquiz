import { notFound } from "next/navigation";
import Quiz from "@/components/Quiz";
import { quizzes } from "@/app/data/quizzes";

export function generateStaticParams() {
  return quizzes.map(q => ({ id: q.id }));
}

export default function QuizPage({ params }: { params: { id: string } }) {
  const has = quizzes.some(q => q.id === params.id);
  if (!has) return notFound();
  return <Quiz quizId={params.id} />;
}
