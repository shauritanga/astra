# Hosting on cPanel

This repo has two independently deployed apps:

| App | Path | Stack | cPanel hosting method |
|---|---|---|---|
| Public site | `website/` | Vite + React SPA | **Static files** in `public_html` — no Node needed at runtime |
| Admin dashboard | `dashboard/` | Next.js 16 + PostgreSQL | **cPanel "Setup Node.js App"** (Passenger) — needs Node runtime + a Postgres DB |

Your `ecosystem.config.cjs` files (PM2) are for a plain VPS setup and **are not used on cPanel** — cPanel manages Node processes itself via Passenger, not PM2. Skip PM2 there.

---

## Part 1 — Public site (`website/`) → `public_html`

1. **Build locally:**
   ```bash
   cd website
   npm install
   npm run build
   ```
   This produces static files in `website/dist/`.

2. **Env var:** `VITE_ADMIN_API_URL` is baked in at build time. Before running `npm run build`, create `website/.env.production` with:
   ```
   VITE_ADMIN_API_URL=https://admin.astranova.co.tz
   ```
   (or whatever subdomain you use for the dashboard — see Part 2).

3. **Upload:** In cPanel → File Manager (or FTP/SFTP), upload the *contents* of `website/dist/` (not the folder itself) into `public_html/` (or a subfolder if this is an addon domain, e.g. `public_html/astranova`).

4. **Fix client-side routing:** Since the site uses `react-router-dom`, direct loads of routes like `/about` will 404 on Apache without a rewrite rule. Add this `.htaccess` in the same directory as `index.html`:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

5. **SSL:** In cPanel → SSL/TLS Status → run AutoSSL for the domain, or install a certificate. Force HTTPS by adding to `.htaccess`:
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
   ```

---

## Part 2 — Admin dashboard (`dashboard/`) → cPanel Node.js App

This part needs your cPanel plan to actually support Node.js apps (look for **"Setup Node.js App"** in cPanel — it's a CloudLinux/Passenger feature; not every shared host has it) **and** PostgreSQL. Many budget shared-hosting cPanel accounts only offer MySQL/MariaDB, not Postgres — check cPanel → Databases before proceeding. If Postgres isn't available, ask your host to enable it or plan to migrate `dashboard/db/schema.sql` to MySQL.

1. **Create a subdomain** (recommended: `admin.astranova.co.tz`) in cPanel → Domains → Create A New Domain. Set its document root to something like `admin.astranova.co.tz` (outside `public_html` of the main site is fine).

2. **Create the Node.js app:**
   - cPanel → **Setup Node.js App** → Create Application
   - Node.js version: match what you use locally (Next 16 needs Node ≥ 18.18, prefer 20+)
   - Application mode: Production
   - Application root: `dashboard`
   - Application URL: the `admin.astranova.co.tz` subdomain
   - Application startup file: `server.js` (see step 4 — Next.js needs a small custom entry for Passenger)

3. **Upload the code:** Upload the `dashboard/` folder contents (excluding `node_modules`, `.next`) via Git (cPanel → Git Version Control, if your repo is reachable) or File Manager/SFTP.

4. **Add a Passenger-compatible entry point.** Passenger expects to `require()` a file, not run `next start` directly. Add `dashboard/server.js`:
   ```js
   const { createServer } = require('http');
   const next = require('next');

   const app = next({ dev: false });
   const handle = app.getRequestHandler();

   app.prepare().then(() => {
     createServer((req, res) => handle(req, res)).listen(
       process.env.PORT || 3000
     );
   });
   ```
   Set the Node.js App's startup file to `server.js`.

5. **Install dependencies:** In the cPanel Node.js App page, click **"Run NPM Install"** (this uses the cPanel-managed virtualenv/Node). Do this after upload, and again after any dependency change.

6. **Build the app:** cPanel's Node.js App UI usually gives you a terminal/"Run JS Script" option, or SSH in and run inside the app's virtualenv:
   ```bash
   source /home/<cpanel_user>/nodevenv/dashboard/<node_version>/bin/activate
   cd ~/dashboard
   npm run build
   ```

7. **Set environment variables** in the Node.js App config (cPanel UI has an "Environment Variables" section) — mirror `dashboard/.env.example`:
   ```
   DATABASE_URL=postgres://astra:PASSWORD@127.0.0.1:5432/astra_db
   AUTH_SECRET=<long random string>
   ADMIN_EMAIL=admin@astranova.co.tz
   ADMIN_PASSWORD=<strong password>
   ADMIN_NAME=Astra Admin
   PUBLIC_ORIGINS=https://astranova.co.tz,https://www.astranova.co.tz
   ```
   **Do not reuse the example password/secret** — generate fresh ones for production.

8. **Set up PostgreSQL:** cPanel → PostgreSQL Databases → create DB `astra_db` and user `astra`, grant all privileges. Then run the schema:
   ```bash
   psql -U astra -d astra_db -f dashboard/db/schema.sql
   ```
   (or use `npm run db:setup` if it's non-interactive-friendly, pointed at `DATABASE_URL`.)

9. **Start/Restart** the app from the Node.js App page.

10. **SSL** for `admin.astranova.co.tz` too, via AutoSSL.

---

## Caveats worth checking before committing to this

- **Shared cPanel hosting often lacks PostgreSQL.** If your host only has MySQL, either request Postgres be enabled, use an external managed Postgres and point `DATABASE_URL` at it, or port the schema/queries to MySQL — non-trivial since the code uses the `pg` driver directly.
- **Not all cPanel plans include "Setup Node.js App."** If yours doesn't, the dashboard can't run there at all — you'd need a VPS (which is what the existing PM2 configs were built for) or a Node-friendly host for that piece, while still using cPanel for the static site.
- If both constraints hold, a hybrid is fine: static site on cPanel `public_html`, dashboard kept on a VPS/PM2 setup at `admin.astranova.co.tz` via DNS pointing to that server instead of cPanel.
