# Proximity Credit Repair — Project Documentation

## Overview
A high-end, premium marketing website and client portal for Proximity Credit Repair. Built with React 18 + Vite + TypeScript + Tailwind CSS v3. Features a gold-and-dark luxury design system, animated UI with Framer Motion, Firebase Authentication, Firestore database, and a fully data-driven architecture across 7 public pages plus a protected client dashboard and admin panel.

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
- **Counters:** Custom `useCountUp` hook with IntersectionObserver
- **Error Handling:** React ErrorBoundary (catches unhandled component errors)

## Project Structure
```
proximity/  (root = frontend)
├── src/
│   ├── main.tsx               # App entry point — sets up token refresh listener, ErrorBoundary
│   ├── App.tsx                # Router setup, lazy-loaded routes
│   ├── components/
│   │   ├── ErrorBoundary.tsx  # Top-level React error boundary (class component)
│   │   ├── admin/
│   │   │   └── AdminLayout.tsx
│   │   ├── auth/
│   │   │   ├── ProtectedRoute.tsx   # Redirects unauthenticated users
│   │   │   └── AdminRoute.tsx       # Redirects non-admin users
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx        # Root layout with Navbar + Footer + Suspense
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── PageWrapper.tsx
│   │   │   ├── Section.tsx
│   │   │   └── SEOHead.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesPreview.tsx
│   │   │   ├── HowItWorksStrip.tsx
│   │   │   ├── TestimonialsSlider.tsx
│   │   │   └── FinalCTABand.tsx
│   │   └── ui/
│   │       ├── Button.tsx, Card.tsx, Badge.tsx, Input.tsx
│   │       ├── Select.tsx, Textarea.tsx, Modal.tsx, dialog.tsx
│   │       ├── Toast.tsx, ToastContainer.tsx, label.tsx
│   │       ├── LoadingScreen.tsx, BackToTopButton.tsx
│   │       ├── OptimizedImage.tsx, ProximityLogo.tsx
│   │       ├── SectionDivider.tsx, SectionLabel.tsx
│   │       └── index.ts
│   ├── pages/
│   │   ├── Home.tsx, About.tsx, Services.tsx
│   │   ├── HowItWorks.tsx, Testimonials.tsx, FAQ.tsx
│   │   ├── Contact.tsx, Pricing.tsx, NotFound.tsx
│   │   ├── Login.tsx          # Firebase Auth sign-in
│   │   ├── Register.tsx       # Firebase Auth registration
│   │   ├── Dashboard.tsx      # Protected client portal
│   │   └── admin/
│   │       ├── AdminLogin.tsx
│   │       ├── AdminDashboard.tsx
│   │       ├── AdminUsers.tsx
│   │       ├── AdminContacts.tsx
│   │       └── AdminServices.tsx
│   ├── services/
│   │   ├── authService.ts     # Firebase Auth SDK — register, login, logout, fetchCurrentUser
│   │   ├── adminService.ts    # Admin API calls — users, contacts, stats
│   │   ├── contactService.ts  # Contact form submission
│   │   ├── planService.ts     # Plan selection API call
│   │   ├── api.ts             # Base apiRequest helper + API_BASE constant
│   │   └── index.ts
│   ├── store/
│   │   ├── authStore.ts       # Zustand auth state (user, token) — persisted to localStorage; setToken for refresh
│   │   ├── uiStore.ts
│   │   ├── formStore.ts
│   │   └── index.ts
│   ├── lib/
│   │   ├── firebase.ts        # Firebase web SDK — initializeFirestore with persistentLocalCache
│   │   ├── animations.ts
│   │   ├── utils.ts           # cn() (clsx + twMerge), formatPhone, truncate
│   │   └── validators.ts
│   ├── config/
│   │   ├── siteMetadata.ts    # SEO metadata + siteUrl
│   │   ├── navigation.ts      # navLinks + footerServiceLinks
│   │   └── site.ts            # siteConfig (phone, email, address)
│   ├── data/
│   │   ├── services.ts, testimonials.ts, faqs.ts
│   │   ├── stats.ts, team.ts, plans.ts
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useCountUp.ts, useMediaQuery.ts
│   │   └── index.ts
│   ├── types/
│   │   └── index.ts, component-props.ts
│   └── styles/
│       └── globals.css        # Tailwind base + shadcn CSS vars + brand vars
├── public/
│   ├── favicon.svg, og-image.png, robots.txt, sitemap.xml
├── backend/
│   ├── server.js              # Express entry — graceful SIGTERM/SIGINT shutdown
│   ├── app.js                 # Express API — helmet, rate limiting, compression, all routes
│   ├── firebase.js            # Firebase Admin SDK init
│   └── .env.example           # Template for required environment variables
├── index.html
├── vite.config.ts             # Vite config — proxy /api → :3001, FB env vars via define
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── tsconfig.json
├── components.json            # shadcn/ui config
├── firebase.json              # Firebase CLI config
├── firestore.rules            # Firestore security rules
├── firestore.indexes.json     # Firestore composite indexes
├── package.json               # Frontend deps (React, Vite, Tailwind, etc.)
└── README.md
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

## Authentication System
- **Backend:** Express.js REST API on port 3001 (`backend/server.js`)
- **Security:** helmet (security headers), express-rate-limit, compression (gzip), input sanitization
- **Rate Limits:** Auth routes — 20 req/15min; Contact form — 10 req/hour; General API — 200 req/15min
- **Auth Routes:** `POST /api/auth/profile`, `GET /api/auth/me`
- **Contact Route:** `POST /api/contacts` — stores contact form submissions in Firestore `contacts` collection
- **Firebase Auth:** ID tokens verified server-side via Firebase Admin SDK
- **Token Refresh:** Automatic via Firebase `onIdTokenChanged` listener initialized in `main.tsx`
- **Storage:** Google Cloud Firestore — `users` collection, `contacts` collection
- **Firestore Persistence:** `persistentLocalCache` with `persistentMultipleTabManager` (multi-tab support)
- **Frontend Store:** Zustand `authStore.ts` with `persist` middleware (localStorage); `setToken` for refresh
- **Error Boundary:** Top-level `ErrorBoundary` component catches unhandled React errors
- **Protected Routes:** `ProtectedRoute` (user) and `AdminRoute` (admin only)

## Admin Panel
- **Default Admin:** Created via environment variables `ADMIN_EMAIL` + `ADMIN_PASSWORD` (seeded on first run when Firebase is configured)
- **Dashboard:** Stats overview — total users, contact leads, unread leads, plan distribution
- **Users:** Full table with search, edit plan, delete user
- **Contacts:** All contact form submissions — expandable cards, status management, reply by email, delete
- **Services:** Full CRUD for the 7 service offerings — edit titles, descriptions, benefits, order

## Required Secrets (Replit)

Set these in the Replit Secrets tab:

### Backend (Firebase Admin SDK — pick one option):
| Secret | Description |
|--------|-------------|
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Full service account JSON blob (recommended — paste the entire JSON) |
| OR `FIREBASE_PROJECT_ID` + `FIREBASE_CLIENT_EMAIL` + `FIREBASE_PRIVATE_KEY` | Individual credentials (alternative) |
| `ADMIN_EMAIL` | Email for the seeded admin account |
| `ADMIN_PASSWORD` | Strong password for the seeded admin account |

### Frontend (Firebase Client SDK):
| Secret | Description |
|--------|-------------|
| `apiKey` | Firebase Web API key |
| `authDomain` | Firebase Auth domain (`your-project.firebaseapp.com`) |
| `projectId` | Firebase project ID |
| `storageBucket` | Firebase storage bucket |
| `messagingSenderId` | Firebase messaging sender ID |
| `appId` | Firebase App ID |

## Running the App (Replit)
- **Start application** workflow: `npm run dev` → serves frontend at port 5000
- **Auth API** workflow: `node backend/server.js` → backend at port 3001
- Vite proxies `/api/*` requests from port 5000 → 3001 automatically

## Production Architecture (Replit Deployment)
```
Browser → Replit deployment (frontend + backend bundled)
  Frontend: Vite build (dist/) served as static files
  Backend: node backend/server.js on PORT
  /api/* → backend Express routes
```

## Security Features (Production)
- `helmet` — sets X-Frame-Options, X-Content-Type-Options, HSTS, and other security headers
- `express-rate-limit` — prevents brute force on auth and contact endpoints
- `compression` — gzip for all responses
- Input sanitization — strips whitespace, enforces max lengths, validates email format
- CORS — allows only `.replit.dev`, `.replit.app`, and `ALLOWED_ORIGINS`
- Admin credentials via env vars — never hardcoded
- Firebase token verification — all protected routes verify Firebase ID tokens server-side
- Automatic token refresh — `onIdTokenChanged` keeps stored token fresh (Firebase tokens expire in 1h)

## Notes
- Framer Motion pinned to v10 (v11+ dist structure incompatibility with Vite)
- `v7_startTransition` future flag set on `RouterProvider` to suppress React Router v7 migration warning
- `initializeFirestore` with `persistentLocalCache` replaces deprecated `enableIndexedDbPersistence`
