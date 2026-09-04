# Astra Nova Holdings

Monorepo with two independent apps:

- **`website/`** — public marketing site (Vite + React + TypeScript SPA), deployed at `astranova.co.tz`. Static build served via `serve`/PM2 or any static host.
- **`dashboard/`** — admin panel (Next.js + PostgreSQL), deployed at `admin.astranova.co.tz`. Requires a Node runtime and a Postgres database.

Each app has its own `package.json`, dependencies, and `ecosystem.config.cjs` — install and run them independently:

```bash
cd website && npm install && npm run dev      # http://localhost:5173
cd dashboard && npm install && npm run dev     # http://localhost:3400
```

See `website/README.md` and `dashboard/README.md` for app-specific details.
