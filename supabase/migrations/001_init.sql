create extension if not exists pgcrypto;

create table if not exists quizzes (
  id uuid primary key default gen_random_uuid(),
  quiz_date date unique not null,
  title text not null,
  status text not null default 'published',
  publish_at timestamptz not null default now(),
  created_at timestamptz default now()
);

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid references quizzes(id) on delete cascade,
  idx int not null,
  type text not null default 'mcq',
  prompt text not null,
  options jsonb,
  answer jsonb not null,
  explanation text
);

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  user_id text,
  quiz_id uuid references quizzes(id) on delete cascade,
  answers jsonb not null,
  correct_count int not null,
  stupid_points numeric not null,
  took_ms int,
  created_at timestamptz default now()
);

create index if not exists idx_questions_quiz on questions(quiz_id);
create index if not exists idx_quizzes_date on quizzes(quiz_date);
create index if not exists idx_submissions_user on submissions(user_id);
create index if not exists idx_submissions_created on submissions(created_at);
