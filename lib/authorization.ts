import { User } from '@prisma/client';

function configuredEmails(name: string) {
  return new Set((process.env[name] ?? '').split(',').map((email) => email.trim().toLowerCase()).filter(Boolean));
}

export function isReviewer(user: User) {
  return configuredEmails('REVIEWER_EMAILS').has(user.email.toLowerCase()) || configuredEmails('ADMIN_EMAILS').has(user.email.toLowerCase());
}

export function isAdmin(user: User) {
  return configuredEmails('ADMIN_EMAILS').has(user.email.toLowerCase());
}

export function requireConfiguredRole(user: User, role: 'reviewer' | 'admin') {
  const allowed = role === 'admin' ? isAdmin(user) : isReviewer(user);
  if (!allowed) throw new Error(`${role} access required`);
  return user;
}
