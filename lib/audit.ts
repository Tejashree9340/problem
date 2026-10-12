import { db } from './db';

export async function recordAudit(input: { actorId: string; problemId?: string; attemptId?: string; action: string; priorState?: string; newState?: string; reason?: string }) {
  return db.auditEvent.create({ data: input });
}
