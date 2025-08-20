import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
  const { data, error } = await supabaseAdmin.rpc('bump_counter', { name: 'homepage' });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ value: data ?? 0 });
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('counters')
    .select('value')
    .eq('key', 'homepage')
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ value: data?.value ?? 0 });
}
