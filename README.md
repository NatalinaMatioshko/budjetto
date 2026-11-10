# Budjetto

Family budget tracker built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Current mode: local browser only

All accounts, categories, transactions, budgets, and shopping items are stored in the browser’s **`localStorage`**. No cloud, no deploy, no login required for day-to-day use.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → **Відкрити додаток** / `/dashboard`.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Next.js in development |
| `npm run build` | Production build |
| `npm run start` | Start production server locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

## Notes

- Theme preference also uses `localStorage`.
- Clearing site data in the browser wipes the budget — export/backup is not built yet.
- Prisma / NextAuth stubs may still exist in the repo for a future backend; they are **not** used by the local UI path.
