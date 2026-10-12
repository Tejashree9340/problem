import { db } from './db';
import { AttemptStatus } from '@prisma/client';
import { assertAttemptTransition } from './db';

export async function transitionAttempt(input: { attemptId: string; actorId: string; next: AttemptStatus; reason?: string }) {
  const attempt = await db.problemAttempt.findUnique({ where: { id: input.attemptId } });
  if (!attempt) throw new Error('Attempt not found');
  assertAttemptTransition(attempt.status, input.next);
  return db.$transaction(async (tx) => {
    const updated = await tx.problemAttempt.update({ where: { id: attempt.id }, data: { status: input.next } });
    await tx.auditEvent.create({ data: { actorId: input.actorId, attemptId: attempt.id, problemId: attempt.problemId, action: 'ATTEMPT_STATUS_CHANGED', priorState: attempt.status, newState: input.next, reason: input.reason } });
    return updated;
  });
}
