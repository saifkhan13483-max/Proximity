# Proximity Credit Repair

A high-end, premium marketing website and client portal for a professional credit repair firm. Built with React 18 + Vite + TypeScript + Tailwind CSS v3, featuring a gold-and-dark luxury design system, AI-powered credit tools, Firebase Authentication, and a full admin panel.

---

## Live Preview

> Deployed on Replit — run the **Start application** workflow to launch at port 5000.

---

## Features

### Public Marketing Site
- **Home** — Full-screen animated hero with particle background, stat counters, services preview, how-it-works strip, testimonials slider, and CTA band
- **About** — Mission statement, core values grid, and team showcase
- **Services** — 7 detailed service sections with anchor navigation
- **How It Works** — 4-step animated timeline
- **Testimonials** — Trust badges and full testimonials grid
- **FAQ** — Animated accordion organized by category
- **Pricing** — 4 plan tiers with monthly/annual toggle
- **Contact** — Split-layout form with Zod validation and animated success state

### AI-Powered Tools
- **AI Credit Reviewer** (`/ai-credit-reviewer`) — Multi-step form → Gemini 2.0 Flash generates a full personalized credit analysis with action plan, score projections, and priority disputes
- **Dispute Letter Generator** (`/dispute-letter-generator`) — Generate a single FCRA Section 611 dispute letter for any bureau/creditor
- **AI Dispute Autopilot** (`/ai-dispute-autopilot`) — Add multiple items across multiple bureaus; generates the full letter package in parallel
- **AI Chat Widget** — Floating credit advisor chatbot powered by Gemini, available on every page

### Client Dashboard
- Protected route (`/dashboard`) — requires authentication
- View dispute history and credit review history saved to Firestore
- Plan and account management

### Admin Panel
- `/admin/dashboard` — Real-time stats: total users, new leads, plan distribution
- `/admin/users` — Full user table with search, plan editing, and delete
- `/admin/contacts` — All contact submissions with status management (New / In Progress / Resolved)
- `/admin/services` — Full CRUD for the 7 service offerings

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 (TypeScript) |
| Styling | Tailwind CSS v3 + custom design tokens |
| UI Primitives | shadcn/ui (Dialog, Label) via Radix UI |
| Animations | Framer Motion v10 |
| Routing | React Router v6 (lazy-loaded + `v7_startTransition`) |
| Auth & Database | Firebase Client SDK (Auth + Firestore) |
| State | Zustand (with persist middleware) |
| Forms | React Hook Form + Zod validation |
| Data Fetching | TanStack Query (React Query v5) |
| AI | Google Gemini 2.0 Flash (via REST API) |
| Icons | Lucide React |

---

## Project Structure

```
/
├── client/                        # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/            # ProximityLogo, AIChatWidget
│   │   │   ├── guards/            # ProtectedRoute, AdminRoute
│   │   │   ├── layout/            # Navbar, Footer, AppLayout, SEOHead...
│   │   │   ├── sections/          # Hero, ServicesPreview, Testimonials...
│   │   │   └── ui/                # Button, Card, Input, Modal, Toast...
│   │   ├── config/                # firebase.ts, site.ts, navigation.ts
│   │   ├── data/                  # Static: services, testimonials, faqs, plans...
│   │   ├── hooks/                 # useMediaQuery, useCountUp
│   │   ├── lib/                   # animations.ts, utils.ts, validators.ts
│   │   ├── pages/                 # Route-level pages + admin/
│   │   ├── providers/             # AppProviders (QueryClient, ErrorBoundary, Auth)
│   │   ├── services/              # authService, geminiService, adminService...
│   │   ├── store/                 # authStore, uiStore, formStore, workflowStore
│   │   ├── styles/                # globals.css (Tailwind + design tokens)
│   │   └── types/                 # Shared TypeScript types
│   ├── public/                    # favicon.svg, og-image.png, robots.txt
│   ├── index.html
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── shared/
│   └── types/index.ts             # Firestore document shapes + API types
│
├── firestore.rules                # Firestore security rules
├── firestore.indexes.json         # Composite indexes
├── firebase.json                  # Firebase CLI config
├── .firebaserc                    # Firebase project aliases
├── DEPLOYMENT.md                  # Full deployment guide
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- A Firebase project (Auth + Firestore enabled)
- A Google Gemini API key ([get one here](https://aistudio.google.com/app/apikey))

### 1. Install Dependencies

```bash
npm run install:all
```

### 2. Configure Environment Variables

Create `client/.env.local`:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 3. Deploy Firestore Rules

```bash
npm install -g firebase-tools
firebase login
firebase use your-project-id
firebase deploy --only firestore:rules,firestore:indexes
```

### 4. Start Development Server

```bash
npm run dev
```

App runs at **http://localhost:5000**

---

## Available Scripts

```bash
npm run dev          # Start Vite dev server (port 5000)
npm run build        # Production build → client/dist
npm run preview      # Preview production build
npm run typecheck    # TypeScript type check
npm run lint         # ESLint on client/src
npm run install:all  # Install all dependencies
```

---

## Design System

The luxury gold-and-dark design system is defined in `client/src/styles/globals.css` and extended in `tailwind.config.js`.

| Token | Value |
|---|---|
| Gold Primary | `#B8924A` |
| Gold Light | `#D4AF72` |
| Gold Dark | `#8B6A2E` |
| Near Black | `#0A0A0A` |
| Off White | `#F9F6F1` |
| Heading Font | Montserrat (400, 600, 700, 800) |
| Body Font | Open Sans (400, 600) |

---

## Path Aliases

All aliases are configured in both `vite.config.ts` and `tsconfig.json`.

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

---

## Authentication & Security

- **Auth:** Firebase Email/Password + optional Google Sign-In
- **Database:** Firestore Client SDK — all reads/writes directly from the browser
- **Security:** Firestore rules are the sole access control layer (no backend server)
- **Token Refresh:** Automatic via `onIdTokenChanged` listener in `AppProviders`
- **Admin Role:** `role: 'admin'` field on the Firestore user document — set manually for the first admin in the Firebase Console

---

## Firestore Collections

| Collection | Description |
|---|---|
| `users/{uid}` | User profiles — synced with Firebase Auth |
| `contacts/{id}` | Contact form submissions |
| `services/{slug}` | Service offerings (admin-managed) |
| `users/{uid}/disputePackages` | AI-generated dispute letter packages |
| `users/{uid}/creditReviews` | AI credit review history |

---

## Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the full step-by-step guide covering:
- Firebase project setup
- Firestore rules and indexes deployment
- Vercel deployment configuration
- Replit deployment
- Environment variable reference
- Production verification checklist

---

## Author

**Saif Khan**

---

## License

Private — all rights reserved. This codebase is proprietary to Proximity Credit Repair.
