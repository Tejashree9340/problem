import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'database' },
  providers: [GitHub, Google],
  callbacks: {
    session: async ({ session, user }) => ({ ...session, user: { ...session.user, id: user.id, role: user.role } }),
  },
});
