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
│   ├── server.js
│   ├── AI_BUILD_PROMPT.md
│   ├── PRD.md
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/     AppLayout, Navbar, Footer, Section, PageWrapper, SEOHead
│   │   │   ├── ui/         Button, Card, Badge, Input, Select, Textarea, Toast, etc.
│   │   │   └── sections/   HeroSection, ServicesPreview, HowItWorksStrip, etc.
│   │   ├── pages/          Home, About, Services, HowItWorks, Testimonials, FAQ, Contact, NotFound
│   │   ├── data/           services.ts, testimonials.ts, faqs.ts, stats.ts, team.ts
│   │   ├── config/         siteMetadata.ts, navigation.ts, theme.ts, site.ts
│   │   ├── hooks/          useCountUp, useMediaQuery, useScrollPosition
│   │   ├── store/          uiStore.ts, formStore.ts
│   │   ├── services/       contactService.ts
│   │   ├── lib/            animations.ts, cn.ts, utils.ts, validators.ts
│   │   ├── types/          index.ts, component-props.ts
│   │   └── styles/         globals.css
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── .env.development
│   ├── .env.production
│   └── .env.staging
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
- **Contact Route:** `POST /api/contacts` — stores contact form submissions in `backend/contacts.json`
- **Tokens:** JWT (7-day expiry), signed with `JWT_SECRET` env var, includes `role` claim
- **Passwords:** bcryptjs (12 salt rounds)
- **Storage:** JSON files — `backend/users.json` (users), `backend/contacts.json` (contact leads)
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

## Environment Variables
See `.env.example` for all supported environment variables:
- `VITE_SITE_URL` — canonical site URL for SEO (defaults to `https://proximity-credit-repair.replit.app`)
- `VITE_CONTACT_API_URL` — POST endpoint for contact form submissions (Formspree or custom backend). Without this, the form shows an error directing users to call directly.
- `VITE_ANALYTICS_ID` — Google Analytics 4 Measurement ID (e.g. `G-XXXXXXXXXX`)

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
