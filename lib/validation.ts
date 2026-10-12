import { z } from 'zod';

export const problemQuerySchema = z.object({ q: z.string().trim().max(120).optional(), domain: z.string().trim().max(80).optional() });
export const claimSchema = z.object({ problemId: z.string().min(1), plan: z.string().trim().max(5000).optional() });
export const milestoneSchema = z.object({ attemptId: z.string().min(1), title: z.string().trim().min(1).max(160), notes: z.string().trim().max(2000).optional() });
export const submissionSchema = z.object({ attemptId: z.string().min(1), description: z.string().trim().min(30).max(10000), requirementsMapping: z.string().trim().min(10).max(10000), evidence: z.string().trim().min(1).max(10000), repositoryUrl: z.string().url().optional().or(z.literal('')), demoUrl: z.string().url().optional().or(z.literal('')), limitations: z.string().trim().max(5000).optional() });
export const impactSchema = z.object({ attemptId: z.string().min(1), metric: z.string().trim().min(1).max(160), value: z.string().trim().min(1).max(80), unit: z.string().trim().min(1).max(80), period: z.string().trim().min(1).max(120), method: z.string().trim().min(10).max(3000), evidence: z.string().trim().min(1).max(10000) });
