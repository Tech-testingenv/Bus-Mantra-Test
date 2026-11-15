# Bus Mantra

Bus Mantra is a group travel booking platform backed by PostgreSQL, split into a public frontend, an admin panel, and two backend services (see Repository layout below). The APIs store accounts, bookings, contact enquiries, vendor applications, and service requests, and serve fleet, destination, and service catalog data.

## Local setup

1. Install PostgreSQL and create a database (the local setup uses `busmantra`).
2. Copy `backend/.env.example` to `backend/.env` and set `DATABASE_URL` for that database.
   Set `ADMIN_SUPER_USERNAME` and a strong `ADMIN_SUPER_PASSWORD` before initialization.
3. Install, initialize the `bus_mantra` schema (including the superadmin account), load the starter catalog, and run everything (details under Repository layout):

```bash
npm run install:all
npm run db:init
npm run db:seed
npm run dev
```

Open the site at [http://localhost:3000](http://localhost:3000) and the admin panel at [http://localhost:3001/admin](http://localhost:3001/admin).

Admin access is available at `/admin` on the admin app. Fleet models are managed under `/admin/fleet-management`, with category lists at `/admin/fleet-management/minicoach-edit`, `/admin/fleet-management/premiumcoach-edit`, and `/admin/fleet-management/luxurycoach-edit`. Admin fleet edits and new coaches are stored in PostgreSQL and used by the public fleet catalog.

Coach main images and gallery images can be uploaded from the fleet editor. JPG, PNG, WebP, and GIF files up to 8 MB are stored in the server's `backend/uploads/` directory and served through `/api/uploads/[filename]`; persist that directory when deploying.

Fleet editors can also set an optional default round-trip distance and estimated fare for each coach. These estimates are shown until a visitor enters a pickup or destination, after which the public page calculates the fare for that route. Existing coaches without defaults continue to use route-based estimates.

Open `/admin` to sign in. The first superadmin is created from the two `ADMIN_SUPER_*` environment variables during `npm run db:init`; subsequent runs do not overwrite an existing account or password. Superadmins can create, disable, reset, and delete admin accounts.

The admin panel includes dedicated Fleet, Services, and Destinations management screens with add/edit forms and image upload. Service and destination edits are read from PostgreSQL by the public website. Superadmins can create custom roles, assign per-module view/create/edit/delete permissions, and assign those roles to admin accounts; backend APIs enforce the assigned permissions. The Sales module includes date-filtered booking and lead reports, booking/payment statuses, fare estimates, lead assignment and follow-up, and CSV export. Booking fare estimates are entered by staff; they are forecasts, not payment records.

Service editors manage the hero, gallery, highlights, suitable-for and Why Bus Mantra sections. Destination editors manage the hero, explore-section heading and description, and structured place cards with images and pointers. Both editors support ordered FAQs; leaving the FAQ list empty shows the existing default FAQs. An empty Why Bus Mantra list uses the existing service-specific defaults, or the standard default for newly added services. Run `npm run db:init` after updating to add the destination content column without removing existing catalog data.

## API

- `GET /api/fleets`, `GET /api/destinations`, `GET /api/services`
- `POST /api/bookings`
- `POST /api/inquiries` with `type` set to `contact`, `vendor`, or `service`
- `POST /api/auth` with `mode` set to `login` or `register`
- `GET /api/auth` returns the current session user; `DELETE /api/auth` logs out
- `/api/admin/*` provides session-protected dashboard, booking and enquiry management, catalog CRUD, and superadmin-only account management
- `GET /api/admin/sales?from=YYYY-MM-DD&to=YYYY-MM-DD` returns the sales dashboard; add `format=csv` to export the filtered report
- `/api/admin/roles` manages custom roles and module permissions (superadmin only)

The schema is in `backend/database/schema.sql`; catalog seed data is in `backend/scripts/seed.mjs`.

## Repository layout

Four independently runnable services, each with its own `package.json`:

| Service | Folder | Port | Notes |
| --- | --- | --- | --- |
| Frontend (public site) | `frontend/` | 3000 | Next.js. Proxies `/api/*` to the web backend (`WEB_BACKEND_URL`). |
| Admin panel | `admin/` | 3001 | Next.js, open at `http://localhost:3001/admin`. Proxies `/api/admin/*` to the admin backend (`ADMIN_BACKEND_URL`) and `/api/uploads/*` to the web backend. |
| Web backend | `backend/web-backend/` | 4000 | Plain Node server: fleets, destinations, services, bookings, inquiries, customer auth, image serving. `GET /health`. |
| Admin backend | `backend/admin-backend/` | 4001 | Plain Node server: admin auth, admins, dashboard, catalog, fleets, records, image upload. `GET /health`. |

Both backends share `backend/package.json`, `backend/.env`, and `backend/shared/` (DB pool, request adapter, cookies, upload config). Database files live in `backend/database/` and `backend/scripts/`; uploaded images go to `backend/uploads/` (gitignored; persist it, or set `UPLOAD_DIR`).

Configuration:

- `backend/.env` (see `.env.example`): `DATABASE_URL`, `ADMIN_SUPER_*`, `WEB_BACKEND_PORT`, `ADMIN_BACKEND_PORT`, `ALLOWED_ORIGINS` (the admin UI origin(s) allowed to call the admin backend), optional `UPLOAD_DIR`.
- `frontend/.env.local` and `admin/.env.local` (see their `.env.example`): backend URLs.

Setup and run (Node 22+):

```bash
npm run install:all   # installs backend, frontend and admin dependencies
npm run db:init
npm run db:seed
npm run dev           # starts all four services (use `npm run build` then `npm start` for production)
```

Or run a single service with `npm run dev` (or `dev:web` / `dev:admin` in `backend/`) from its own folder.
