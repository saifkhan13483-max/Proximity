# Proximity Credit Repair — Project Documentation

## Overview
A high-end, premium marketing website and client portal for Proximity Credit Repair. Built with React 18 + Vite + TypeScript + Tailwind CSS v3. Features a gold-and-dark luxury design system, animated UI with Framer Motion, Firebase Authentication, Firestore database, and a fully data-driven architecture across 7 public pages plus a protected client dashboard and admin panel.

## Deployment Stack
- **Frontend:** Vercel (Vite static build from `/client`)
- **Database:** Firestore (accessed directly via Firebase Client SDK)
- **Auth:** Firebase Authentication (Client SDK)

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
- **AI:** Google Gemini 2.0 Flash API (credit review, dispute letters, AI chat) — called client-side via `VITE_GEMINI_API_KEY`
- **Error Handling:** React ErrorBoundary (catches unhandled component errors)

## Project Structure
```
/
├── client/                        # Frontend — Vite dev server / Vercel deploy
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/            # App-specific shared components
│   │   │   │   ├── ProximityLogo.tsx
│   │   │   │   ├── AIChatWidget.tsx
│   │   │   │   └── index.ts
│   │   │   ├── guards/            # Route protection
│   │   │   │   ├── AdminRoute.tsx
│   │   │   │   ├── ProtectedRoute.tsx
│   │   │   │   └── index.ts
│   │   │   ├── layout/            # Page shell (Navbar, Footer, SEO, etc.)
│   │   │   │   ├── AppLayout.tsx
│   │   │   │   ├── AdminLayout.tsx
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── SEOHead.tsx
│   │   │   │   ├── PageWrapper.tsx
│   │   │   │   ├── Section.tsx
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   └── index.ts
│   │   │   ├── sections/          # Homepage section blocks
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── ServicesPreview.tsx
│   │   │   │   ├── HowItWorksStrip.tsx
│   │   │   │   ├── TestimonialsSlider.tsx
│   │   │   │   ├── FinalCTABand.tsx
│   │   │   │   └── index.ts
│   │   │   └── ui/                # Generic UI primitives (shadcn + custom)
│   │   │       ├── Button.tsx, Card.tsx, Badge.tsx, Input.tsx
│   │   │       ├── Textarea.tsx, Select.tsx, Modal.tsx
│   │   │       ├── Toast.tsx, ToastContainer.tsx, LoadingScreen.tsx
│   │   │       ├── BackToTopButton.tsx, SectionDivider.tsx, SectionLabel.tsx
│   │   │       ├── OptimizedImage.tsx
│   │   │       ├── dialog.tsx, label.tsx  ← shadcn/ui components
│   │   │       └── index.ts
│   │   ├── config/                # App configuration (single source of truth)
│   │   │   ├── firebase.ts        # Firebase client SDK init
│   │   │   ├── site.ts            # siteConfig + siteMetadata (merged)
│   │   │   ├── navigation.ts      # Nav links + dropdown definitions
│   │   │   └── index.ts           # Barrel — export all config
│   │   ├── data/                  # Static content data
│   │   │   ├── faqs.ts, plans.ts, services.ts
│   │   │   ├── stats.ts, team.ts, testimonials.ts
│   │   │   └── index.ts
│   │   ├── hooks/                 # Custom React hooks
│   │   │   ├── useCountUp.ts
│   │   │   ├── useMediaQuery.ts
│   │   │   └── index.ts
│   │   ├── lib/                   # Utilities, helpers, animation variants
│   │   │   ├── animations.ts      # Framer Motion variants
│   │   │   ├── utils.ts           # cn(), formatPhone(), truncate()
│   │   │   └── validators.ts      # Zod schemas
│   │   ├── pages/                 # Route-level page components
│   │   │   ├── Home.tsx, About.tsx, Services.tsx, Pricing.tsx
│   │   │   ├── HowItWorks.tsx, Testimonials.tsx, FAQ.tsx, Contact.tsx
│   │   │   ├── Login.tsx, Register.tsx, Dashboard.tsx, NotFound.tsx
│   │   │   ├── CreditReviewer.tsx, DisputeLetterGenerator.tsx, DisputeAutopilot.tsx
│   │   │   └── admin/
│   │   │       ├── AdminLogin.tsx, AdminDashboard.tsx
│   │   │       ├── AdminUsers.tsx, AdminContacts.tsx, AdminServices.tsx
│   │   ├── providers/             # React context / app-level providers
│   │   │   └── AppProviders.tsx   # QueryClient + ErrorBoundary + AuthObserver
│   │   ├── services/              # Firebase / API / Gemini service layer
│   │   │   ├── authService.ts, adminService.ts
│   │   │   ├── contactService.ts, planService.ts, geminiService.ts
│   │   │   ├── disputeHistoryService.ts
│   │   │   └── index.ts
│   │   ├── store/                 # Zustand state stores
│   │   │   ├── authStore.ts, uiStore.ts, formStore.ts, workflowStore.ts
│   │   │   └── index.ts
│   │   ├── styles/
│   │   │   └── globals.css        # Tailwind base + design tokens
│   │   ├── types/
│   │   │   └── index.ts           # Shared TypeScript types
│   │   ├── App.tsx                # Router definition (all routes)
│   │   ├── main.tsx               # Entry point (mounts AppProviders + App)
│   │   └── vite-env.d.ts
│   ├── public/
│   │   ├── favicon.svg, og-image.png, robots.txt, sitemap.xml
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── vercel.json
│   └── package.json
│
├── shared/
│   └── types/index.ts             # Shared TypeScript types (Firestore docs)
│
├── firestore.rules
├── firestore.indexes.json
├── firebase.json
├── .firebaserc
├── package.json                   # Root orchestrator (runs client via --prefix)
└── replit.md
```

## Path Aliases
All aliases are registered in both `vite.config.ts` and `tsconfig.json`:

| Alias | Resolves To |
|---|---|
| `@` | `src/` |
| `@components` | `src/components/` |
| `@common` | `src/components/common/` |
| `@pages` | `src/pages/` |
| `@data` | `src/data/` |
| `@store` | `src/store/` |
| `@services` | `src/services/` |
| `@hooks` | `src/hooks/` |
| `@lib` | `src/lib/` |
| `@types` | `src/types/` |
| `@config` | `src/config/` |
| `@styles` | `src/styles/` |
| `@providers` | `src/providers/` |

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
8. **AI Credit Reviewer** (`/ai-credit-reviewer`) — Gemini-powered credit profile analysis
9. **Dispute Letter Generator** (`/dispute-letter-generator`) — AI-generated FCRA dispute letters
10. **AI Dispute Autopilot** (`/ai-dispute-autopilot`) — Multi-item dispute package generator

## Environment Variables

All set as Replit secrets (prefixed with `VITE_` so Vite bundles them into the client):

| Secret | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase Web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase App ID |
| `VITE_GEMINI_API_KEY` | Google Gemini API key (AI features) |

## Running Locally (Replit)
- **Start application** workflow: `npm run dev` → delegates to `npm run dev --prefix client` → Vite at port 5000
- No backend server needed — all data goes through Firebase Client SDK

## Authentication System
- **Auth:** Firebase Client SDK (`signInWithEmailAndPassword`, `createUserWithEmailAndPassword`)
- **Database:** Firestore Client SDK — all reads/writes happen directly from the browser
- **Token Refresh:** Automatic via Firebase `onIdTokenChanged` listener in `AppProviders`
- **Admin role:** Stored as `role: 'admin'` on the Firestore user document; enforced client-side for routing

## Admin Panel
- **Dashboard:** Stats computed from Firestore — total users, contacts, unread leads, plan distribution
- **Users:** Full table with search, edit plan, delete user (Firestore only — Firebase Auth accounts not deleted)
- **Contacts:** All contact form submissions — expandable cards, status management
- **Services:** Full CRUD for the 7 service offerings

## Notes
- Framer Motion pinned to v10 (v11+ dist structure incompatibility with Vite)
- `v7_startTransition` future flag set on `RouterProvider` to suppress React Router v7 migration warning
- `initializeFirestore` with `persistentLocalCache` replaces deprecated `enableIndexedDbPersistence`
- `siteConfig` and `siteMetadata` are co-located in `config/site.ts` (single source of truth)
- App-specific components (`ProximityLogo`, `AIChatWidget`) live in `components/common/` not `ui/`
- All providers (QueryClient, ErrorBoundary, AuthObserver) are centralized in `providers/AppProviders.tsx`
- Every component folder has an `index.ts` barrel file for clean imports
- Pure frontend architecture — no backend server; all AI and data calls are made directly from the browser

## User Preferences
- Keep the gold-and-dark luxury design system consistent across all components
