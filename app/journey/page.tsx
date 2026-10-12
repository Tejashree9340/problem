import Link from 'next/link';
import { db } from '@/lib/db';

export default async function JourneyPage() {
  const attempts = await db.problemAttempt.findMany({ include: { problem: true, milestones: true }, orderBy: { updatedAt: 'desc' } });
  return <main className="mx-auto max-w-6xl p-6 md:p-10"><Link href="/" className="text-sm text-[#ff6b4a]">← Coffin Yard</Link><h1 className="mt-6 font-display text-6xl font-bold">My Journey</h1><p className="mt-3 text-[#777382]">Committed work, milestones, reviews, and impact status.</p><div className="mt-10 grid gap-5">{attempts.map((a) => <article key={a.id} className="rounded-2xl border bg-white p-6"><p className="text-xs uppercase tracking-widest text-[#ff6b4a]">{a.status}</p><h2 className="mt-2 font-display text-2xl font-bold">{a.problem.title}</h2><p className="mt-4 text-sm text-[#777382]">Review: {a.reviewStatus} · Impact: {a.impactStatus} · {a.milestones.length} milestones</p></article>)}{attempts.length === 0 && <div className="rounded-2xl border border-dashed p-10 text-center">No attempts yet. Explore a problem and make an explicit claim.</div>}</div></main>;
}