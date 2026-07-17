# Social Feed Frontend — Local Setup

## Prerequisites
- Node.js 20+
- The backend API running (see its own setup guide) — this app has no data of its own

## Setup
```bash
npm install
cp .env.example .env.local
```

Edit `.env.local`:
- `NEXT_PUBLIC_API_URL` — the backend's address, e.g. `http://localhost:3000/api/v1`

```bash
npm run dev
```

## Verify it's running
Open http://localhost:3001 (the backend already owns port 3000, so run this
on a different port — either let `next dev -p 3001` pick one, or set it
explicitly).

⚠️ **Port/CORS must match on both sides**: whatever port this app runs on,
the backend's `.env` → `CORS_ORIGIN` must be set to that exact origin (e.g.
`http://localhost:3001`), or every API call will silently fail in the
browser with no response. Same in reverse: `NEXT_PUBLIC_API_URL` here must
point at wherever the backend actually runs.

Sign in with the same seeded account as the backend, or register a new one.