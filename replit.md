# Proximity Credit Repair — Project Documentation

## Overview
A high-end, premium marketing website and client portal for Proximity Credit Repair. Built with React 18 + Vite + TypeScript + Tailwind CSS v3. Features a gold-and-dark luxury design system, animated UI with Framer Motion, Firebase Authentication, Firestore database, and a fully data-driven architecture across 7 public pages plus a protected client dashboard and admin panel.

## Deployment Stack
- **Frontend:** Vercel (Vite static build from `/client`)
- **Backend API:** Firebase Functions (Express wrapped in `onRequest`, from `/firebase/functions`)
- **Database:** Firestore
- **File Storage:** Cloudinary
- **Local Dev:** Firebase Emulator Suite + Vite dev server

## Tech Stack
- **Frontend:** React 18 + Vite 5 (TypeScript)
- **Styling:** Tailwind CSS v3 with custom design tokens + shadcn/ui (Slate base, CSS variables)
- **UI Primitives:** shadcn/ui — Dialog, Label via Radix UI; Button uses class-variance-authority
- **Animations:** Framer Motion v10
- **Routing:** React Router v6 (lazy-loaded routes + `v7_startTransition` future flag)
- **Auth & Database:** Firebase Client SDK (Auth + Firestore with persistent multi-tab cache)
- **State/Forms:** Zustand (with persist middleware), React Hook Form + Zod validation
- **Data Fetching:** TanStack Query (React Query)
- **Icons:** Lucide React
- **File Uploads:** Cloudinary (via Firebase Functions — never exposes credentials to client)
- **Error Handling:** React ErrorBoundary (catches unhandled component errors)

## Monorepo Structure
```
/
├── client/                    # Frontend → deployed to Vercel
│   ├── src/
│   │   ├── config/firebase.ts   # Firebase client SDK (VITE_* env vars)
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   ├── adminService.ts
│   │   │   ├── contactService.ts
│   │   │   ├── planService.ts
│   │   │   └── uploadService.ts  # Cloudinary uploads via Functions
│   │   ├── components/, pages/, store/, hooks/, lib/, data/, types/
│   │   └── styles/globals.css
│   ├── public/
│   ├── index.html
│   ├── vite.config.ts
│   ├── vercel.json            # SPA routing + security headers
│   ├── .env.example           # Frontend env vars template
│   └── package.json
│
├── firebase/
│   └── functions/             # Backend API → deployed to Firebase Functions
│       ├── src/
│       │   ├── index.js        # Function exports: api, seedAdminFn
│       │   ├── app.js          # Express app (all routes)
│       │   ├── firebase-admin.js  # Firebase Admin SDK init
│       │   ├── cloudinary.js   # Cloudinary upload service
│       │   └── seed.js         # Local dev seed script
│       ├── package.json
│       └── .env.example
│
├── shared/
│   └── types/index.ts         # Shared TypeScript types (Firestore docs, API shapes)
│
├── src/                       # Root-level source (used by Replit dev workflow)
│   └── ...                    # Same as client/src — kept in sync
│
├── backend/                   # Legacy Express server (Replit-only, superseded by Firebase Functions)
│   └── server.js              # Still used by Replit "Auth API" workflow
│
├── firebase.json              # Firebase CLI config (Functions + Firestore + Emulators)
├── .firebaserc                # Firebase project aliases
├── firestore.rules            # Firestore security rules
├── firestore.indexes.json     # Firestore composite indexes
├── package.json               # Root monorepo scripts
├── .gitignore
└── DEPLOYMENT.md              # Full step-by-step deployment guide
```

## Design System
- **Gold Primary:** `#B8924A`
- **Gold Light:** `#D4AF72`
- **Gold Dark:** `#8B6A2E`
- **Near Black:** `#0A0A0A`
- **Off White:** `#F9F6F1`
- **Fonts:** Montserrat (headings) + Open Sans (body) — Google Fonts

## Pages
1. **Home** (`/`) — Full-screen hero with particles + animated headline, animated stat counters, services preview, how-it-works strip, testimonials auto-slider, CTA band
2. **About** (`/about`) — Sub-hero banner, mission blockquote with gold accent bar, core values grid, team grid
3. **Services** (`/services`) — 7 alternating service detail sections with hash IDs for anchor navigation
4. **How It Works** (`/how-it-works`) — 4-step timeline with animated gold connector lines
5. **Testimonials** (`/testimonials`) — Trust badges row, full 8-card testimonials grid
6. **FAQ** (`/faq`) — Animated accordion organized by 2 categories
7. **Contact** (`/contact`) — Split layout: contact info + form with Zod validation, animated success state

## Environment Variables

### Frontend (Vercel / `client/.env.local`)
| Variable | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase Web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase App ID |
| `VITE_API_URL` | Firebase Functions API base URL |

### Backend (Firebase Functions / `firebase/functions/.env`)
| Variable | Description |
|---|---|
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Full service account JSON blob (recommended) |
| `ADMIN_EMAIL` | Email for seeded admin account |
| `ADMIN_PASSWORD` | Password for seeded admin account |
| `SEED_ADMIN_TOKEN` | Random secret to protect the seed endpoint |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `ALLOWED_ORIGINS` | Comma-separated allowed CORS origins |

### Replit Secrets (legacy — for the existing Replit dev environment)
| Secret | Description |
|---|---|
| `apiKey` / `VITE_FIREBASE_API_KEY` | Firebase Web API key |
| `authDomain` / `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain |
| `projectId` / `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `storageBucket` / `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `messagingSenderId` / `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `appId` / `VITE_FIREBASE_APP_ID` | Firebase App ID |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Firebase Admin SDK service account |
| `ADMIN_EMAIL` | Admin account email |
| `ADMIN_PASSWORD` | Admin account password |

## Running Locally (Replit)
- **Start application** workflow: `npm run dev` → Vite at port 5000 (reads from root `src/`)
- **Auth API** workflow: `node backend/server.js` → Express API at port 3001
- Vite proxies `/api/*` → port 3001

## Running Locally (Target Stack)
```bash
npm run install:all      # Install all dependencies
npm run emulators        # Firebase Emulator Suite (port 4000 UI, 5001 Functions, 8080 Firestore)
# In another terminal:
cd client && npm run dev # Frontend at port 5000
```

## Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for full step-by-step instructions covering:
- Firebase project setup (Auth, Firestore, Functions)
- Cloudinary account setup
- Vercel frontend deployment
- Firebase Functions deployment
- Environment variable configuration
- Local emulator development
- Production verification checklist

## Authentication System
- **Backend:** Firebase Functions (Express `onRequest`) replacing the legacy Express server
- **Security:** helmet, express-rate-limit, compression, input sanitization
- **Rate Limits:** Auth routes — 20 req/15min; Contact form — 10 req/hour; Uploads — 20 req/hour; General API — 200 req/15min
- **Auth Routes:** `POST /api/auth/profile`, `GET /api/auth/me`
- **Contact Route:** `POST /api/contacts`
- **Upload Route:** `POST /api/upload` (authenticated, stores to Cloudinary)
- **Firebase Auth:** ID tokens verified server-side via Firebase Admin SDK
- **Token Refresh:** Automatic via Firebase `onIdTokenChanged` listener

## Admin Panel
- **Default Admin:** Created via `ADMIN_EMAIL` + `ADMIN_PASSWORD` env vars (seeded via `seedAdminFn` endpoint)
- **Dashboard:** Stats overview — total users, contact leads, unread leads, plan distribution
- **Users:** Full table with search, edit plan, delete user
- **Contacts:** All contact form submissions — expandable cards, status management
- **Services:** Full CRUD for the 7 service offerings

## Security Features (Production)
- `helmet` — sets security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- `express-rate-limit` — brute force protection on all endpoints
- `compression` — gzip for all responses
- Input sanitization — strips whitespace, enforces max lengths
- CORS — allows only Vercel, Replit, and `ALLOWED_ORIGINS`
- Admin credentials via env vars — never hardcoded
- Firebase token verification — all protected routes verify Firebase ID tokens server-side
- Cloudinary uploads — all file validation and upload happens server-side; credentials never exposed to client

## Notes
- Framer Motion pinned to v10 (v11+ dist structure incompatibility with Vite)
- `v7_startTransition` future flag set on `RouterProvider` to suppress React Router v7 migration warning
- `initializeFirestore` with `persistentLocalCache` replaces deprecated `enableIndexedDbPersistence`
- Firebase Functions wraps the Express app with `functions.https.onRequest()` — all existing routes preserved
- Admin seed: call `GET /seedAdminFn?token=SEED_ADMIN_TOKEN` once after first deployment

## User Preferences
- Keep the gold-and-dark luxury design system consistent across all components
- Never expose Cloudinary, Firebase Admin, or other server-side credentials to the frontend
- All file uploads must go through the Firebase Functions `/api/upload` endpoint
