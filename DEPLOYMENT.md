# Proximity Credit Repair — Deployment Guide

This document covers the full deployment setup for the Proximity Credit Repair application. The architecture uses two separate hosting platforms:

- **Frontend** → [Vercel](https://vercel.com) — `https://proximity-murex.vercel.app`
- **Backend API** → [Railway](https://railway.app) — `https://proximity-prd-production.up.railway.app`

---

## Live Production URLs

| Service | URL |
|---|---|
| Frontend (Vercel) | https://proximity-murex.vercel.app |
| Backend API (Railway) | https://proximity-prd-production.up.railway.app |
| Health Check | https://proximity-prd-production.up.railway.app/health |

---

## Architecture Overview

```
Browser
  └── Vercel (Frontend — React + Vite SPA)
        ├── /                 → Serves index.html (SPA catch-all)
        ├── /assets/*         → Hashed static assets (1-year immutable cache)
        └── /api/*            → Proxy rewrite → Railway Backend

Railway (Backend — Node.js + Express)
  └── proximity-prd-production.up.railway.app
        ├── /api/auth/*       → Register, Login, Me
        ├── /api/contacts     → Contact form submissions
        ├── /api/users/plan   → Plan selection
        ├── /api/admin/*      → Admin routes (JWT + admin role required)
        └── /health           → Health check endpoint

Railway (Database)
  └── PostgreSQL (Postgres plugin — connected to Proximity-PRD service)
        └── DATABASE_URL / DATABASE_PUBLIC_URL auto-injected by Railway
```

All `/api/*` requests made to the Vercel domain are transparently forwarded to the Railway backend via `vercel.json` rewrites — no CORS issues in production.

---

## Current Production Environment Variables

### Backend (Railway — Proximity-PRD service)

| Variable | Value / Notes |
|---|---|
| `JWT_SECRET` | Set — used to sign all JWTs |
| `ALLOWED_ORIGINS` | `http://localhost:5000,https://proximity-murex.vercel.app` |
| `PORT` | `3001` — **see warning below** |
| `VITE_SITE_URL` | `https://proximity-murex.vercel.app/` |
| `DATABASE_URL` | Auto-injected by Railway Postgres plugin (internal) |
| `DATABASE_PUBLIC_URL` | Auto-injected by Railway Postgres plugin (external) |

> **PORT WARNING:** Railway's public networking for this service is mapped to **port 8080**, but the `PORT` variable is manually set to `3001`. This means Express listens on 3001, but Railway routes external traffic to 8080 — the two don't match and the backend will be unreachable from the internet.
>
> **Fix:** Go to Railway → Proximity-PRD → Variables → **delete the `PORT` variable entirely**. Railway will then automatically inject the correct port at runtime and the server will bind to it.

---

## vercel.json — Proxy Configuration

This file lives at the project root and tells Vercel to forward all `/api/*` requests to the Railway backend and serve `index.html` for all other routes (SPA mode):

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://proximity-prd-production.up.railway.app/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/index.html",
      "headers": [
        { "key": "Cache-Control", "value": "no-cache, no-store, must-revalidate" }
      ]
    }
  ]
}
```

---

## Redeploying — Step by Step

### Redeploy the Backend (Railway)

Railway redeploys automatically on every push to the connected GitHub branch. To trigger a manual redeploy:

1. Go to [railway.app](https://railway.app) → your project → **Proximity-PRD** service.
2. Click **Deployments** → **Redeploy** on the latest deployment.
3. Monitor the build logs for any errors.
4. Verify the backend is live: `https://proximity-prd-production.up.railway.app/health`

### Redeploy the Frontend (Vercel)

Vercel redeploys automatically on every push to the connected GitHub branch. To trigger a manual redeploy:

1. Go to [vercel.com](https://vercel.com) → your project.
2. Click **Deployments** → **...** on the latest → **Redeploy**.
3. Once complete, verify at `https://proximity-murex.vercel.app`.

---

## Deploying for the First Time (Fresh Setup)

### Step 1 — Deploy the Backend to Railway

1. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**.
2. Select the repository and set **Root Directory** to `backend`.
3. Under **Variables**, add:
   ```
   JWT_SECRET=<strong random string, 48+ characters>
   ALLOWED_ORIGINS=http://localhost:5000
   ```
4. Do **not** manually set `PORT` — let Railway assign it automatically.
5. Go to **Settings → Networking** → **Generate Domain**.
6. Verify: `https://your-backend.up.railway.app/health` returns `{"status":"ok",...}`.

### Step 2 — Configure vercel.json

Open `vercel.json` at the project root and set the Railway URL in the `/api/*` rewrite:

```json
"destination": "https://your-backend.up.railway.app/api/:path*"
```

Commit and push before deploying to Vercel.

### Step 3 — Deploy the Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project** → select the repo.
2. Set build settings if not auto-detected:

   | Setting | Value |
   |---|---|
   | Root Directory | `frontend` |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |
   | Install Command | `npm install` |

3. Add environment variable:
   ```
   VITE_SITE_URL=https://your-app.vercel.app
   ```
4. Click **Deploy** and copy the live Vercel URL.

### Step 4 — Connect Frontend and Backend

Go back to Railway → **Variables** and update `ALLOWED_ORIGINS`:

```
ALLOWED_ORIGINS=https://your-app.vercel.app,http://localhost:5000
```

Railway will redeploy automatically.

### Step 5 — Verify Full Stack

1. Visit the Vercel URL.
2. Go to **/register** and create an account — tests the full API proxy.
3. Log in and visit **/dashboard** — verifies JWT auth.
4. Log in as admin and visit **/admin** — verifies admin role guard.

---

## Railway PostgreSQL Database

A PostgreSQL plugin is connected to the Proximity-PRD service. Railway auto-injects these variables:

| Variable | Description |
|---|---|
| `DATABASE_URL` | Internal connection string (used inside Railway network) |
| `DATABASE_PUBLIC_URL` | External connection string (for connecting from outside Railway) |

> **Note:** The current backend code (`server.js`) still uses flat JSON files (`users.json`, `contacts.json`) and does **not** yet use the PostgreSQL database. The Postgres plugin is connected and the connection strings are available, but the backend needs to be updated to use them for data to persist across redeploys.

---

## Default Admin Account

The admin account is automatically seeded every time the backend starts:

| Field | Value |
|---|---|
| Email | `admin@proximity.com` |
| Password | `Admin@2026!` |

> **Change this password immediately after your first login in production.**

---

## Replit Development Environment

When working inside Replit, both workflows must be running:

| Workflow | Command | Port |
|---|---|---|
| Auth API | `node backend/server.js` | 3001 |
| Start application | `npm run dev --prefix frontend` | 5000 |

The Vite dev server proxies all `/api/*` requests to `http://localhost:3001` automatically.

Required secret in Replit:

| Secret | Description |
|---|---|
| `JWT_SECRET` | Must be set in Replit Secrets — backend refuses to start without it. |

---

## Important Warnings

### PORT Variable Conflict (Railway)

Do **not** manually set a `PORT` variable in Railway. Railway injects the correct port automatically at runtime. If you override it, Express will listen on the wrong port and the service will be unreachable publicly.

**Fix:** Delete the `PORT` variable from Railway → Proximity-PRD → Variables.

### Ephemeral JSON Storage

The current backend uses `users.json` and `contacts.json` for storage. These files are wiped on every Railway redeploy. The admin account is re-seeded automatically, but **all other user and contact data will be lost** on each deploy.

The PostgreSQL database is already connected — migrate the backend to use it for durable production storage.

### JWT_SECRET Strength

- Use a minimum of 48 randomly generated characters.
- Never use a short, guessable, or default value.
- The backend will refuse to start if this variable is missing.

### Framer Motion Version

Pinned to **v10** in `frontend/package.json`. Do not upgrade to v11+ — it has a dist structure incompatibility with Vite that breaks the build.

---

## Quick Reference — Build Commands

```bash
# Install backend dependencies
cd backend && npm install

# Run backend locally
cd backend && node server.js

# Install frontend dependencies
cd frontend && npm install

# Run frontend dev server (port 5000)
cd frontend && npm run dev

# Build frontend for production
cd frontend && npm run build

# Preview production build locally
cd frontend && npm run preview
```

---

## API Health Check Endpoints

| URL | Description |
|---|---|
| `https://proximity-prd-production.up.railway.app/health` | Railway uptime monitoring |
| `https://proximity-prd-production.up.railway.app/api/health` | Alternate health check path |
