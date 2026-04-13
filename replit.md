# Proximity Credit Repair — Project Documentation

## Overview
A high-end, premium marketing website for Proximity Credit Repair with a full authentication system and client portal. Built with React 18 + Vite + TypeScript + Tailwind CSS v3. Features a gold-and-dark luxury design system, animated UI with Framer Motion, JWT-based authentication, and a fully data-driven architecture across 7 public pages plus a protected client dashboard.

## Tech Stack
- **Frontend:** React 18 + Vite 5 (TypeScript)
- **Styling:** Tailwind CSS v3 with custom design tokens
- **Animations:** Framer Motion v10
- **Routing:** React Router v6 (lazy-loaded routes + `v7_startTransition` future flag)
- **State/Forms:** Zustand, React Hook Form + Zod validation
- **Data Fetching:** TanStack Query (React Query)
- **Icons:** Lucide React
- **Counters:** Custom `useCountUp` hook with IntersectionObserver

## Project Structure
```
proximity/
├── backend/
│   ├── server.js              # Express API — all routes, middleware, admin seed
│   ├── firebase.js            # Firebase Admin SDK init — exports db + adminAuth
│   ├── package.json
│   ├── PRD.md
│   └── AI_BUILD_PROMPT.md
├── frontend/
│   ├── src/
│   │   ├── main.tsx           # App entry point
│   │   ├── App.tsx            # Router setup, lazy-loaded routes
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   └── AdminLayout.tsx
│   │   │   ├── auth/
│   │   │   │   ├── ProtectedRoute.tsx   # Redirects unauthenticated users
│   │   │   │   └── AdminRoute.tsx       # Redirects non-admin users
│   │   │   ├── layout/
│   │   │   │   ├── AppLayout.tsx        # Root layout with Navbar + Footer
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── PageWrapper.tsx
│   │   │   │   ├── Section.tsx
│   │   │   │   └── SEOHead.tsx
│   │   │   ├── sections/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── ServicesPreview.tsx
│   │   │   │   ├── HowItWorksStrip.tsx
│   │   │   │   ├── TestimonialsSlider.tsx
│   │   │   │   └── FinalCTABand.tsx
│   │   │   └── ui/
│   │   │       ├── Button.tsx, Card.tsx, Badge.tsx, Input.tsx
│   │   │       ├── Select.tsx, Textarea.tsx, Modal.tsx
│   │   │       ├── Toast.tsx, ToastContainer.tsx
│   │   │       ├── LoadingScreen.tsx, BackToTopButton.tsx
│   │   │       ├── OptimizedImage.tsx, ProximityLogo.tsx
│   │   │       ├── SectionDivider.tsx, SectionLabel.tsx, SectionWrapper.tsx
│   │   │       └── index.ts
│   │   ├── pages/
│   │   │   ├── Home.tsx, About.tsx, Services.tsx
│   │   │   ├── HowItWorks.tsx, Testimonials.tsx, FAQ.tsx
│   │   │   ├── Contact.tsx, Pricing.tsx, NotFound.tsx
│   │   │   ├── Login.tsx          # Firebase Auth sign-in
│   │   │   ├── Register.tsx       # Firebase Auth registration
│   │   │   ├── Dashboard.tsx      # Protected client portal
│   │   │   └── admin/
│   │   │       ├── AdminLogin.tsx
│   │   │       ├── AdminDashboard.tsx
│   │   │       ├── AdminUsers.tsx
│   │   │       └── AdminContacts.tsx
│   │   ├── services/
│   │   │   ├── authService.ts     # Firebase Auth SDK — register, login, logout, fetchCurrentUser
│   │   │   ├── adminService.ts    # Admin API calls — users, contacts, stats
│   │   │   ├── contactService.ts  # Contact form submission
│   │   │   ├── planService.ts     # Plan selection API call
│   │   │   ├── analyticsService.ts
│   │   │   ├── api.ts             # Base apiRequest helper + API_BASE constant
│   │   │   └── index.ts
│   │   ├── store/
│   │   │   ├── authStore.ts       # Zustand auth state (user, token) — persisted to localStorage
│   │   │   ├── uiStore.ts
│   │   │   ├── formStore.ts
│   │   │   └── index.ts
│   │   ├── lib/
│   │   │   ├── firebase.ts        # Firebase web SDK init — exports auth instance
│   │   │   ├── animations.ts
│   │   │   ├── cn.ts
│   │   │   ├── utils.ts
│   │   │   └── validators.ts
│   │   ├── config/
│   │   │   ├── siteMetadata.ts, navigation.ts, theme.ts, site.ts
│   │   │   └── index.ts
│   │   ├── data/
│   │   │   ├── services.ts, testimonials.ts, faqs.ts
│   │   │   ├── stats.ts, team.ts, plans.ts
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── useCountUp.ts, useMediaQuery.ts, useScrollPosition.ts
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   ├── index.ts, component-props.ts
│   │   └── styles/
│   │       └── globals.css
│   ├── index.html
│   ├── vite.config.ts             # Vite config — maps Replit secrets to FB constants via define
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   └── tsconfig.node.json
├── FIRESTORE_MIGRATION.md         # Step-by-step Firestore migration reference
├── .gitignore
├── README.md
└── replit.md
```

## Design System
- **Gold Primary:** `#B8924A`
- **Gold Light:** `#D4AF72`
- **Gold Dark:** `#8B6A2E`
- **Near Black:** `#0A0A0A`
- **Off White:** `#F9F6F1`
- **Fonts:** Montserrat (headings) + Open Sans (body) — Google Fonts

## Pages (Phase 7 — Fully Implemented)
1. **Home** (`/`) — Full-screen hero with particles + animated headline, animated stat counters, services preview, how-it-works strip, testimonials auto-slider, CTA band
2. **About** (`/about`) — Sub-hero banner, mission blockquote with gold accent bar, core values grid, team grid with hover bio overlay
3. **Services** (`/services`) — Sub-hero, 7 alternating service detail sections with hash IDs for anchor navigation: Credit Analysis, Dispute Filing, Score Monitoring, Debt Validation, Creditor Negotiation, Educational Resources, Identity Theft Protection. CTA strip at bottom.
4. **How It Works** (`/how-it-works`) — Sub-hero, 4-step timeline with animated gold connector lines (desktop) and vertical connectors (mobile)
5. **Testimonials** (`/testimonials`) — Sub-hero, trust badges row, full 8-card testimonials grid, video placeholder
6. **FAQ** (`/faq`) — Sub-hero, animated accordion organized by 2 categories (5 items each), only 1 item open at a time
7. **Contact** (`/contact`) — Split layout: contact info + form with Zod validation, phone auto-format, animated success state + toast

## Key Architectural Notes
- `PageWrapper` uses `noPaddingTop` on Home (hero handles its own spacing) and `dark` on all other pages (dark sub-hero blends with transparent navbar)
- `Button` component handles internal Links, external `<a>` tags, and `<button>` elements — `onClick` is passed to all variants
- `AppLayout` uses `ScrollToTop` to reset scroll position on route change
- Contact form resets submission status on mount to prevent stale success state on revisit
- All data is centralized in `src/data/` — no strings hardcoded in components
- TypeScript strict mode passes with zero errors

## Authentication System
- **Backend:** Express.js REST API on port 3001 (`backend/server.js`)
- **Auth Routes:** `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- **Contact Route:** `POST /api/contacts` — stores contact form submissions in Firestore `contacts` collection
- **Tokens:** JWT (7-day expiry), signed with `JWT_SECRET` env var, includes `role` claim
- **Passwords:** bcryptjs (12 salt rounds)
- **Storage:** Google Cloud Firestore — `users` collection (users), `contacts` collection (contact leads)
- **Firebase Module:** `backend/firebase.js` — initializes Firebase Admin SDK using `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` secrets
- **Frontend Store:** Zustand `authStore.ts` with `persist` middleware (localStorage)
- **Protected Routes:** `ProtectedRoute` (user) and `AdminRoute` (admin only)
- **User Pages:** `/login`, `/register`, `/dashboard` (protected)
- **Admin Pages:** `/admin/login`, `/admin`, `/admin/users`, `/admin/contacts`
- **Navbar:** Shows "Sign In"/"Get Started" when logged out; "Dashboard"/"Admin Panel" + logout when logged in

## Pricing System
- **Page:** `/pricing` — Full pricing page with 4 plan tiers and monthly/annual billing toggle (20% annual discount)
- **Plans:** Basic ($49/mo), Standard ($99/mo, highlighted), Premium ($149/mo), VIP ($199/mo)
- **Plan Selection:** Authenticated users can select/upgrade plans directly from the pricing page; changes are saved to the backend and reflected in the navbar/dashboard immediately
- **Unauthenticated flow:** Clicking a plan CTA redirects to `/register`
- **Dashboard integration:** Shows current plan benefits, upgrade prompt for lower-tier users, and links to pricing
- **Data file:** `frontend/src/data/plans.ts`
- **Backend route:** `POST /api/users/plan` — updates the logged-in user's plan

## Admin Panel
- **Default Credentials:** `admin@proximity.com` / `Admin@2026!` (seeded on first run)
- **Dashboard:** Stats overview — total users, contact leads, unread leads, plan distribution
- **Users:** Full table with search, edit plan, delete user
- **Contacts:** All contact form submissions — expandable cards, status management (new/in-progress/resolved), reply by email, delete
- **Admin Routes (backend):** `GET /api/admin/stats`, `GET /api/admin/users`, `PATCH /api/admin/users/:id`, `DELETE /api/admin/users/:id`, `GET /api/admin/contacts`, `PATCH /api/admin/contacts/:id`, `DELETE /api/admin/contacts/:id`

## Running the App
```
node backend/server.js           # Auth API at localhost:3001
npm run dev --prefix frontend    # Dev server at localhost:5000 (proxies /api → 3001)
npm run build --prefix frontend  # Production build
```

## Production Architecture

```
Browser → Vercel (frontend)
           ├── /              → serves React SPA (dist/index.html)
           ├── /assets/*      → immutable hashed static assets (1-year cache)
           └── /api/*         → proxy rewrite → Railway (backend)

Railway (backend)
  node backend/server.js
  PORT assigned dynamically by Railway
  /api/health  — Railway health check endpoint
```

### Deployment Files
- `vercel.json` (project root) — Vercel build config: SPA fallback rewrites, `/api/*` proxy to Railway, cache-control headers
- `backend/railway.toml` — Railway build + deploy config pointing to `node server.js`

### Required Environment Variables

**Backend (Railway):**
| Variable | Description |
|----------|-------------|
| `JWT_SECRET` | Long random string for signing JWTs — **required**, server refuses to start without it |
| `PORT` | Assigned automatically by Railway |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins (e.g. `https://your-app.vercel.app,http://localhost:5000`) |
| `FIREBASE_PROJECT_ID` | Firebase project ID from service account JSON |
| `FIREBASE_CLIENT_EMAIL` | Firebase client email from service account JSON |
| `FIREBASE_PRIVATE_KEY` | Firebase private key from service account JSON (include full PEM block) |

See `backend/.env.example` for a template.

**Frontend (Vercel):**
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend base URL — used by Vite dev-server proxy (defaults to `http://localhost:3001`). In Vercel production, `/api/*` calls are rewritten via `vercel.json`. |
| `VITE_SITE_URL` | Canonical site URL for SEO / Open Graph |
| `VITE_ANALYTICS_ID` | Google Analytics 4 Measurement ID (e.g. `G-XXXXXXXXXX`) |

See `frontend/.env.example` for a template.

### Deploy Steps
1. **Railway backend:**
   - Create a new Railway project, connect the repo, set root to `backend/`
   - Set `JWT_SECRET` and `ALLOWED_ORIGINS` environment variables
   - Railway uses `railway.toml` to run `node server.js` automatically
2. **Vercel frontend:**
   - Create a new Vercel project, connect the repo
   - In `vercel.json`, replace `https://your-railway-backend.up.railway.app` with the actual Railway URL
   - Set `VITE_SITE_URL` and optionally `VITE_ANALYTICS_ID`
   - Vercel uses `vercel.json` (root dir `frontend`, build `npm run build`, output `dist`)

## Production Readiness (Completed)
- All contact info unified: phone `(800) 555-0192`, email `hello@proximitycreditrepair.com`, address `123 Financial Plaza, Suite 400, Atlanta, GA 30301` — sourced from `siteConfig` everywhere
- Social media links removed from Footer until real URLs are configured in `siteConfig`
- `robots.txt` and `sitemap.xml` created in `frontend/public/`
- OG image generated and placed at `frontend/public/og-image.png`
- `SEOHead` updated: adds `og:type`, `og:site_name`, `og:image:width/height`, `twitter:image`, `meta[name=robots]`, and per-page `keywords`
- All 7 pages have unique meta keywords
- `index.html` has full OG/Twitter card meta, theme-color, apple-touch-icon, color-scheme
- `OptimizedImage` has `onError` fallback rendering (shows alt text div or fallbackSrc)
- `Modal` has proper focus trap and restores focus on close
- `analyticsService` integrated with GA4's `window.gtag` API, no console.logs
- `contactService` returns honest error when `VITE_CONTACT_API_URL` is not configured (no fake success)
- Team member photos use `ui-avatars.com` API (gold/white initials avatars) until real photos are provided
- Contact page: "Interactive map coming soon" replaced with real Google Maps embed (dark-theme via CSS filter)
- HeroSection scroll-down link uses proper `<a>` tag with smooth scroll handler (not React Router `<Link>`)
- Navbar `boxShadow` animation fixed (was animating to `"none"` which Framer Motion can't interpolate)
- Dynamic copyright year in Footer (no hardcoded year)

## Notes
- Framer Motion pinned to v10 (v11+ dist structure incompatibility with Vite)
- `v7_startTransition` future flag set on `RouterProvider` to suppress React Router v7 migration warning
