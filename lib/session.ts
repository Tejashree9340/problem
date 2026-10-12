import { cookies } from 'next/headers';
import { db } from './db';

export async function currentUser() {
  const id = cookies().get('problem_coffin_user')?.value;
  return id ? db.user.findUnique({ where: { id } }) : null;
}

export async function requireUser() {
  const user = await currentUser();
  if (!user) throw new Error('Authentication required');
  return user;
}
