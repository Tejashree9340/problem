# Problem Coffin

Full-application starter built with Next.js, TypeScript, Tailwind CSS, Prisma, and PostgreSQL.

## Run locally

```bash
npm install
cp .env.example .env
# Set DATABASE_URL in .env
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

## Routes

- `/` Coffin Yard
- `/sign-in` development email session
- `/journey` attempts and progress
- `/review` pending solution submissions
- `/heaven` confirmed impact stories
- `/admin` catalogue view

## Production requirements

The current email session is a development scaffold. Before production, add Auth.js/Clerk, role-based reviewer/admin authorization, CSRF/rate limiting, file storage, source ingestion jobs, and CI/deployment secrets. Private evidence must remain server-protected.
