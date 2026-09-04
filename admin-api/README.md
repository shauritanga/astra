# admin-api

Vanilla PHP backend for the admin console (`admin/`) and the public site's CMS/contact endpoints (`website/`). No Composer, no framework — one PHP file per resource, PDO MySQL, native PHP sessions for auth.

## Local setup

1. Install MySQL/MariaDB locally (e.g. `sudo pacman -S mariadb` on Arch, then `sudo mariadb-install-db --user=mysql --basedir=/usr --datadir=/var/lib/mysql` and `sudo systemctl start mariadb` if it's not already initialized).
2. Create the database and apply the schema:
   ```bash
   mysql -u root -p -e "CREATE DATABASE astra_db CHARACTER SET utf8mb4"
   mysql -u root -p astra_db < db/schema.mysql.sql
   ```
3. Copy the config template and fill in real values:
   ```bash
   cp config.local.php.example config.local.php
   ```
4. Seed the first admin user (reads `ADMIN_EMAIL`/`ADMIN_PASSWORD`/`ADMIN_NAME` from `config.local.php`):
   ```bash
   php db/seed-admin.php
   ```
5. Run the PHP dev server **from the repo root** (not from `admin-api/`) using the bundled router, which maps `/api/*` onto this directory — this mirrors production, where `admin-api/`'s contents are uploaded into an `api/` subdirectory of the document root:
   ```bash
   cd .. # repo root
   php -d extension=pdo_mysql -S localhost:8000 -t . admin-api/dev-router.php
   ```
   (`-d extension=pdo_mysql` is only needed if your PHP install has the module but doesn't enable it by default — check with `php -m | grep pdo_mysql`.)
6. Run `admin/` (`npm run dev`) — its Vite dev server proxies `/api/*` to `http://localhost:8000`, so the browser sees everything as same-origin.

## Deploying to cPanel

1. Create a MySQL database + user via cPanel → **MySQL Databases**, and import `db/schema.mysql.sql` via **phpMyAdmin**.
2. Upload this directory's contents (except `config.local.php.example`, `.htaccess.example`, `README.md`, `dev-router.php`) into an **`api/` subdirectory** of the admin subdomain's document root — the built `admin/dist/*` files go directly at the document root, alongside that `api/` folder. Both frontends (`admin/`'s `lib/api.ts` and `website/`'s public fetches) call `/api/<file>.php`, so this path must match exactly.
3. Create `config.local.php` inside `api/` on the server (or set real environment variables if the host supports it) with production DB credentials and a strong `ADMIN_PASSWORD`.
4. Run `api/db/seed-admin.php` once via cPanel Terminal/SSH if available. If not, temporarily make it web-reachable, hit it once over HTTPS, then delete it immediately.
5. Rename `.htaccess.example` to `.htaccess` in the document root (SPA routing fallback that leaves `/api/*` requests alone).

See the repo root `CPANEL_DEPLOYMENT.md` for the full walkthrough (to be rewritten for this PHP-based setup once verified).
