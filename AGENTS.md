# AGENTS.md

## Project

ML Algorithm Interactive Learning Platform — Next.js 14 frontend + FastAPI backend. Displays 10 ML algorithms with theory, code examples, and interactive visualizations (Recharts).

## Commands

```bash
# Backend (run from backend/)
pip install -r requirements.txt
python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# Frontend (run from frontend/)
npm install
npm run dev          # dev server on port 3000
npm run build        # production build
```

No test suite, linter, or typecheck script is configured. To typecheck: `npx tsc --noEmit` from `frontend/`.

## Architecture

- **Backend** (`backend/`): Single `main.py` entrypoint. Algorithm data lives in `backend/data/algorithms.py` as a static Python list of dicts. Uses stdlib `math`/`random` instead of numpy (intentional — avoids C compiler dependency on Windows).
- **Frontend** (`frontend/`): Next.js 14 App Router. `src/app/page.tsx` is the homepage, `src/app/algorithms/[id]/page.tsx` is the per-algorithm detail page (Theory/Code/Visualization tabs). `src/lib/api.ts` is the API client. `src/components/Visualization.tsx` contains all chart components.
- **API proxy**: `frontend/next.config.js` rewrites `/api/*` to `http://localhost:8000/api/*`. CORS is configured for `localhost:3000` only.
- **Offline fallback**: Frontend has built-in fallback data and works without the backend running.

## Conventions

- TypeScript `strict: false` in tsconfig.
- Path alias: `@/*` maps to `./src/*`.
- Tailwind CSS with dark theme (slate palette). Custom colors in `tailwind.config.js`.
- No `.env` files are used; all config is hardcoded.
