import { PrismaClient, ProblemStatus } from '@prisma/client';
import { demoProblems } from '../lib/demo-data';

const db = new PrismaClient();
async function main() {
  for (const p of demoProblems) {
    await db.problemStatement.upsert({ where: { id: p.id }, update: { title: p.title, description: p.description, organization: p.organization, sourceName: p.sourceName, domain: p.domain, technologies: p.technologies, status: p.status as ProblemStatus }, create: { id: p.id, title: p.title, description: p.description, organization: p.organization, sourceName: p.sourceName, domain: p.domain, technologies: p.technologies, status: p.status as ProblemStatus } });
  }
}
main().finally(() => db.$disconnect());
