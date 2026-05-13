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
- **Error Handling:** React ErrorBoundary (catches unhandled component errors)

## Project Structure
```
/
├── client/                    # Frontend → Vite dev server / Vercel deploy
│   ├── src/
│   │   ├── config/firebase.ts   # Firebase client SDK (VITE_* env vars)
│   │   ├── services/
│   │   │   ├── authService.ts   # Firebase Auth (sign in, register, logout)
│   │   │   ├── adminService.ts  # Firestore admin CRUD (users, contacts, services)
│   │   │   ├── contactService.ts # Firestore contact form submissions
│   │   │   └── planService.ts   # Firestore plan updates
│   │   ├── components/, pages/, store/, hooks/, lib/, data/, types/
│   │   └── styles/globals.css
│   ├── public/
│   ├── index.html
│   ├── vite.config.ts
│   ├── vercel.json            # SPA routing + security headers
│   └── package.json
│
├── shared/
│   └── types/index.ts         # Shared TypeScript types (Firestore docs, API shapes)
│
├── firestore.rules            # Firestore security rules
├── firestore.indexes.json     # Firestore composite indexes
├── package.json               # Root scripts
└── replit.md
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

All set as Replit secrets (prefixed with `VITE_` so Vite bundles them into the client):

| Secret | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase Web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase App ID |

## Running Locally (Replit)
- **Start application** workflow: `npm run dev` → Vite at port 5000
- No backend server needed — all data goes through Firebase Client SDK

## Authentication System
- **Auth:** Firebase Client SDK (`signInWithEmailAndPassword`, `createUserWithEmailAndPassword`)
- **Database:** Firestore Client SDK — all reads/writes happen directly from the browser
- **Token Refresh:** Automatic via Firebase `onIdTokenChanged` listener
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

## User Preferences
- Keep the gold-and-dark luxury design system consistent across all components
