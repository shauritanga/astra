# Astra Nova Holdings

Monorepo with independent apps:

- **`website/`** — public marketing site (Vite + React + TypeScript SPA), deployed at `astranova.co.tz`. Static build served via `serve`/PM2 or any static host.
- **`admin/`** — admin console frontend (Vite + React + TypeScript SPA), deployed at `admin.astranova.co.tz`. Builds to static files — no Node runtime needed in production.
- **`admin-api/`** — admin backend (vanilla PHP + MySQL/MariaDB), deployed alongside `admin/`'s build output on the same subdomain. Replaces the old Next.js dashboard so the whole admin stack runs on plain PHP shared hosting (no Node.js App / Passenger support required).
- **`dashboard/`** — the previous Next.js + PostgreSQL admin panel. Kept as a reference until the `admin/` + `admin-api/` replacement is verified end-to-end, then removed.

Each app has its own `package.json`/dependencies — install and run independently:

```bash
cd website && npm install && npm run dev        # http://localhost:5173

cd admin-api && cp config.local.php.example config.local.php   # fill in DB + admin creds
cd .. && php -S localhost:8000 -t . admin-api/dev-router.php   # http://localhost:8000 (maps /api/* -> admin-api/*)
cd admin && npm install && npm run dev           # http://localhost:5173 (proxies /api to :8000)
```

See `website/README.md` and `admin-api/README.md` for app-specific details.
