import { PrismaClient, AttemptStatus, ReviewStatus, ImpactStatus } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const db = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

export const attemptTransitions: Record<AttemptStatus, AttemptStatus[]> = {
  PLANNED: ['CLAIMED', 'ABANDONED'], CLAIMED: ['BUILDING', 'PAUSED', 'ABANDONED'], BUILDING: ['TESTING', 'PAUSED', 'ABANDONED'], TESTING: ['SUBMITTED', 'BUILDING', 'PAUSED'], SUBMITTED: ['CHANGES_REQUESTED', 'COMPLETED'], CHANGES_REQUESTED: ['BUILDING', 'SUBMITTED', 'ABANDONED'], COMPLETED: [], PAUSED: ['BUILDING', 'ABANDONED'], ABANDONED: [],
};

export function assertAttemptTransition(from: AttemptStatus, to: AttemptStatus) {
  if (!attemptTransitions[from].includes(to)) throw new Error(`Invalid attempt transition: ${from} → ${to}`);
}

export function reviewToAttemptStatus(decision: ReviewStatus): AttemptStatus | null {
  if (decision === 'ACCEPTED') return 'COMPLETED';
  if (decision === 'CHANGES_REQUESTED') return 'CHANGES_REQUESTED';
  return null;
}

export function canConfirmImpact(status: ImpactStatus, evidence: string) {
  return status === 'UNDER_REVIEW' && evidence.trim().length > 0;
}
