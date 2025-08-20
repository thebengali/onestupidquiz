import Link from 'next/link';
import { quizzes } from '@/app/data/quizzes';
import VisitorCounter from '@/components/VisitorCounter';

export default function Home() {
  return (
    <section style={{ maxWidth: 760, margin: '24px auto' }}>
      <VisitorCounter />
      <h1>Pick a Quiz</h1>
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
        {quizzes.map((q) => (
          <li
            key={q.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              border: '1px solid #111',
              borderRadius: 12,
              padding: '12px 16px',
            }}
          >
            <div>
              <div style={{ fontWeight: 800 }}>{q.title}</div>
              <div className="small">
                {q.questions.length} questions · no account · no tracking
              </div>
            </div>
            <Link href={`/quiz/${q.id}`} className="btn">
              Start
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
