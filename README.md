# Budjetto

Family budget tracker built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma**, and **PostgreSQL**.

## Features (scaffold)

- Auth pages (login / register) with NextAuth route stub
- Dashboard shell: navbar + responsive sidebar
- Transactions, categories, budgets, and accounts pages
- Reusable UI: Button, Input, Card, Table
- Prisma models: `User`, `Account`, `Category`, `Transaction`, `Budget`
- Zod validation helpers and typed API route stubs
- ESLint + Prettier

## Prerequisites

- Node.js 18+

> **Current mode: local browser storage.** No PostgreSQL or backend is required.
> All accounts / categories / transactions / budgets are saved in `localStorage`.

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → **Open app** / `/dashboard`.

### Optional: PostgreSQL later

When you are ready for a real backend:

```bash
cp .env.example .env
# set DATABASE_URL, then:
npm run db:generate
npm run db:push
```

Prisma CLI reads **`.env` only** (not `.env.local`).

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Next.js in development |
| `npm run build` | Generate Prisma client + production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
| `npm run db:generate` | `prisma generate` |
| `npm run db:push` | Push schema to DB (no migration files) |
| `npm run db:migrate` | Create / apply migrations |
| `npm run db:studio` | Prisma Studio GUI |

## Project structure

```
app/
  (auth)/login, register     # Auth UI
  (dashboard)/               # App shell + feature pages
  api/auth/[...nextauth]     # NextAuth
  api/transactions|categories|budgets
components/
  ui/                        # Button, Input, Card, Table
  layout/                    # Navbar, Sidebar
  transactions|categories|budgets
lib/                         # prisma, utils, validations, auth
prisma/schema.prisma
types/index.ts
```

Path aliases (see `tsconfig.json`): `@/components`, `@/lib`, `@/types`.

## Tech notes

- **Strict TypeScript** is enabled.
- Tailwind palette: `primary` (indigo), `success`, `warning`, `danger`.
- UI pages use demo data until you connect Prisma queries in server components / API routes.
- NextAuth credentials provider is stubbed — implement user lookup + bcrypt in `lib/auth.ts`.

## License

Private / personal project.
