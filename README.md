# Bus Mantra

Bus Mantra is a Next.js group travel booking site backed by PostgreSQL. The API stores accounts, bookings, contact enquiries, vendor applications, and service requests, and serves fleet, destination, and service catalog data.

## Local setup

1. Install PostgreSQL and create a database (the local setup uses `busmantra`).
2. Copy `frontend/.env.example` to `frontend/.env.local` and set `DATABASE_URL` for that database.
   Set `ADMIN_SUPER_USERNAME` and a strong `ADMIN_SUPER_PASSWORD` before initialization.
3. Initialize the `bus_mantra` schema (including the superadmin account) and load the starter catalog:

```bash
npm run db:init
npm run db:seed
```

4. Run the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin access is available at `/admin`. Fleet models are managed under `/admin/fleet-management`, with category lists at `/admin/fleet-management/minicoach-edit`, `/admin/fleet-management/premiumcoach-edit`, and `/admin/fleet-management/luxurycoach-edit`. Admin fleet edits and new coaches are stored in PostgreSQL and used by the public fleet catalog.

Coach main images and gallery images can be uploaded from the fleet editor. JPG, PNG, WebP, and GIF files up to 8 MB are stored in the server's `backend/uploads/` directory and served through `/api/uploads/[filename]`; persist that directory when deploying.

Fleet editors can also set an optional default round-trip distance and estimated fare for each coach. These estimates are shown until a visitor enters a pickup or destination, after which the public page calculates the fare for that route. Existing coaches without defaults continue to use route-based estimates.

Open `/admin` to sign in. The first superadmin is created from the two `ADMIN_SUPER_*` environment variables during `npm run db:init`; subsequent runs do not overwrite an existing account or password. Superadmins can create, disable, reset, and delete admin accounts.

## API

- `GET /api/fleets`, `GET /api/destinations`, `GET /api/services`
- `POST /api/bookings`
- `POST /api/inquiries` with `type` set to `contact`, `vendor`, or `service`
- `POST /api/auth` with `mode` set to `login` or `register`
- `GET /api/auth` returns the current session user; `DELETE /api/auth` logs out
- `/api/admin/*` provides session-protected dashboard, booking and enquiry management, catalog CRUD, and superadmin-only account management

The schema is in `backend/database/schema.sql`; catalog seed data is in `backend/scripts/seed.mjs`.

## Repository layout

| Folder | Contents |
| --- | --- |
| `frontend/` | The Next.js app (run from here): public pages, components, data, services, `public/`, configs, `.env.local` |
| `admin/` | Admin panel UI (`AdminPanel`, fleet manager, image upload field) |
| `backend/web-backend/` | Public API handlers: fleets, destinations, services, bookings, inquiries, customer auth, image serving |
| `backend/admin-backend/` | Admin API handlers: auth, admins, dashboard, catalog, fleets, records, image upload |
| `backend/shared/` | DB pool, API helpers and upload config shared by both backends |
| `backend/database/`, `backend/scripts/` | Schema, DB init and seed scripts |
| `backend/uploads/` | Uploaded images (gitignored; persist it when deploying) |

`frontend/app/` holds the Next.js routes; its `api/` and `admin/` routes are thin files that import from `admin/` and `backend/`. Only `package.json` and `node_modules` live at the repo root, and the npm scripts run Next with `frontend` as the project directory. Set `UPLOAD_DIR` to override where uploaded images are stored.
