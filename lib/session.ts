import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { db } from './db';

export async function currentUser() {
  const session = await auth();
  if (!session?.user?.id) return null;
  return db.user.findUnique({ where: { id: session.user.id } });
}
export async function requireUser() {
  const user = await currentUser();
  if (!user) redirect('/sign-in');
  return user;
}
