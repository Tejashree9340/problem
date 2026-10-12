import { currentUser } from '@/lib/session';
import { requireConfiguredRole } from '@/lib/authorization';
import { db } from '@/lib/db';
import Link from 'next/link';

export default async function AdminPage() {
  const user = await currentUser();
  if (!user) return null;
  try { requireConfiguredRole(user, 'admin'); } catch { return <main className="mx-auto max-w-3xl p-10"><Link href="/" className="text-sm text-[#ff6b4a]">← Coffin Yard</Link><h1 className="mt-6 font-display text-5xl font-bold">Admin access required</h1><p className="mt-4 text-[#777382]">This workspace is restricted to configured administrators.</p></main>; }
  const problems = await db.problemStatement.findMany({ orderBy: { updatedAt: 'desc' } });
  return <main className="mx-auto max-w-6xl p-6 md:p-10"><Link href="/" className="text-sm text-[#ff6b4a]">← Coffin Yard</Link><h1 className="mt-6 font-display text-6xl font-bold">Catalogue admin</h1><p className="mt-3 text-[#777382]">Manage provenance, freshness, lifecycle state, and source availability.</p><div className="mt-10 overflow-x-auto rounded-2xl border bg-white"><table className="w-full text-left text-sm"><thead className="border-b bg-[#f5eee6]"><tr><th className="p-4">Problem</th><th className="p-4">Organization</th><th className="p-4">Status</th><th className="p-4">Last checked</th></tr></thead><tbody>{problems.map((p) => <tr className="border-b last:border-0" key={p.id}><td className="p-4 font-semibold">{p.title}</td><td className="p-4">{p.organization}</td><td className="p-4">{p.status}</td><td className="p-4">{p.lastCheckedAt.toISOString()}</td></tr>)}</tbody></table></div></main>;
}
