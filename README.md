# Proximity Credit Repair

> A premium, full-service credit repair platform — marketing website, AI-powered tools, client portal, and admin panel.

Built with **React 18 + Vite + TypeScript**, a gold-and-dark luxury design system, Google Gemini AI (via Replit AI Integrations), Firebase Authentication, and Cloud Firestore. **Pure frontend architecture — no backend server required.**

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Firebase Setup](#firebase-setup)
- [AI Integration](#ai-integration)
- [Design System](#design-system)
- [Firestore Collections](#firestore-collections)
- [Security Model](#security-model)
- [Path Aliases](#path-aliases)
- [Available Scripts](#available-scripts)
- [Common Issues](#common-issues)

---

## Features

### Public Marketing Website

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero with particle canvas, animated stat counters, services preview, testimonials slider, CTA band |
| About | `/about` | Mission, core values grid, full team showcase |
| Services | `/services` | 7 detailed service sections with anchor navigation |
| How It Works | `/how-it-works` | 4-step animated timeline with gold connector lines |
| Pricing | `/pricing` | 4 plan tiers with monthly/annual billing toggle |
| Testimonials | `/testimonials` | Trust badges, full testimonials grid, featured video |
| FAQ | `/faq` | Animated accordion organized by category |
| Contact | `/contact` | Split-layout form with Zod validation and animated success state |

### AI-Powered Tools (Free — No Sign-up Required)

| Tool | Route | Description |
|---|---|---|
| AI Credit Reviewer | `/ai-credit-reviewer` | Enter your credit profile → Gemini generates a full analysis with key strengths, critical issues, action plan, and 6/12/24-month score projections |
| Dispute Letter Generator | `/dispute-letter-generator` | Generate a professional FCRA Section 611 dispute letter for any bureau, ready to print and mail |
| AI Dispute Autopilot | `/ai-dispute-autopilot` | Add multiple dispute items across multiple bureaus — generates a complete letter package in parallel |
| AI Chat Widget | Every page | Floating credit advisor chatbot powered by Google Gemini |

### Client Dashboard (Protected)

- Firebase email/password authentication with persistent multi-tab sessions
- View, track, and update dispute package history (Generated → Mailed → Under Review → Resolved)
- Credit review history with full AI analysis reports
- Account and plan management

### Admin Panel (Protected)

| Page | Route | Description |
|---|---|---|
| Dashboard | `/admin` | Real-time stats — total users, new leads, plan distribution |
| Users | `/admin/users` | User table with search, plan editing, and delete |
| Contacts | `/admin/contacts` | All contact submissions with New / In Progress / Resolved status management |
| Services | `/admin/services` | Full CRUD for all 7 service offerings with AI-generated content |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 (TypeScript) |
| Styling | Tailwind CSS v3 + custom design tokens |
| UI Primitives | shadcn/ui (Dialog, Label) via Radix UI · class-variance-authority |
| Animations | Framer Motion v10 |
| Routing | React Router v6 — lazy-loaded routes + `v7_startTransition` flag |
| Auth | Firebase Authentication — Email/Password (Client SDK) |
| Database | Cloud Firestore — Client SDK with persistent multi-tab cache |
| State | Zustand with persist middleware |
| Forms | React Hook Form + Zod validation |
| Data Fetching | TanStack Query (React Query v5) |
| AI | Google Gemini 2.5 Flash — via Replit AI Integrations (Vite proxy) |
| Icons | Lucide React |
| Error Handling | React ErrorBoundary wrapping all routes |

---

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── common/           # ProximityLogo, AIChatWidget
│   │   ├── guards/           # ProtectedRoute, AdminRoute
│   │   ├── layout/           # Navbar, Footer, AppLayout, AdminLayout, SEOHead
│   │   ├── sections/         # HeroSection, ServicesPreview, TestimonialsSlider…
│   │   └── ui/               # Button, Card, Input, Modal, Toast, Badge…
│   ├── config/
│   │   ├── firebase.ts       # Firebase app + Firestore init
│   │   ├── site.ts           # siteConfig + siteMetadata (single source of truth)
│   │   └── navigation.ts     # Nav links and dropdown definitions
│   ├── data/                 # Static content: services, testimonials, faqs, plans, team
│   ├── hooks/                # useCountUp, useMediaQuery
│   ├── lib/                  # animations.ts, utils.ts (cn, formatPhone), validators.ts
│   ├── pages/
│   │   └── admin/            # AdminLogin, AdminDashboard, AdminUsers, AdminContacts, AdminServices
│   ├── providers/            # AppProviders — QueryClient, ErrorBoundary, AuthObserver
│   ├── services/             # authService, adminService, geminiService, contactService,
│   │                         #   disputeHistoryService, planService
│   ├── store/                # authStore, uiStore, formStore, workflowStore (Zustand)
│   ├── styles/               # globals.css — Tailwind base + design tokens
│   ├── types/                # Shared TypeScript types
│   ├── App.tsx               # Router definition (all routes)
│   └── main.tsx              # Entry point — mounts AppProviders + App
├── public/                   # favicon.svg, og-image.png, robots.txt, sitemap.xml
├── index.html
├── vite.config.ts            # Vite config — dev proxy routes Gemini calls server-side
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
├── eslint.config.js
├── components.json           # shadcn/ui config
├── vercel.json               # SPA rewrites + security headers
├── package.json
├── firestore.rules           # Firestore security rules
├── firestore.indexes.json    # Composite + single-field indexes
├── firebase.json             # Firebase CLI config (Firestore + Hosting)
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- A Firebase project with **Authentication** and **Firestore** enabled
- Running on **Replit** — Gemini AI calls are handled automatically via Replit AI Integrations (no separate API key needed)

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase Environment Variables

Set the following in your Replit **Secrets** tab (or `.env.local` for local dev):

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Deploy Firestore Rules and Indexes

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore
```

### 4. Start the Development Server

```bash
npm run dev
```

App runs at **http://localhost:5000**

---

## Environment Variables

Firebase variables are prefixed with `VITE_` so Vite can include them in the client build. Gemini AI credentials are handled automatically by Replit AI Integrations — no manual key setup required.

| Variable | Required | Description |
|---|---|---|
| `VITE_FIREBASE_API_KEY` | Yes | Firebase Web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Yes | Firebase Auth domain (e.g. `project.firebaseapp.com`) |
| `VITE_FIREBASE_PROJECT_ID` | Yes | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Yes | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Yes | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Yes | Firebase App ID |
| `AI_INTEGRATIONS_GEMINI_BASE_URL` | Auto | Set automatically by Replit AI Integrations |
| `AI_INTEGRATIONS_GEMINI_API_KEY` | Auto | Set automatically by Replit AI Integrations |

> **How Gemini works:** The Vite dev server reads `AI_INTEGRATIONS_GEMINI_BASE_URL` and `AI_INTEGRATIONS_GEMINI_API_KEY` from the environment at startup and uses them to proxy `/api/gemini/*` requests server-side. These values are never exposed to the browser bundle.

---

## Firebase Setup

### Enable Authentication

1. Firebase Console → **Authentication → Sign-in method**
2. Enable **Email/Password** → Save

### Enable Firestore

1. Firebase Console → **Firestore Database → Create database**
2. Start in **Production mode** → choose your region → Enable

### Deploy Security Rules and Indexes

```bash
firebase deploy --only firestore
```

### Create the First Admin Account

There is no automated admin creation — set it manually once:

1. Register a normal account via `/register`
2. Open Firebase Console → **Firestore → users → `{your-uid}`**
3. Edit the `role` field from `"user"` to `"admin"`
4. The admin panel is now accessible at `/admin`

---

## AI Integration

All AI features are powered by **Google Gemini 2.5 Flash** via Replit AI Integrations.

### How It Works

The Vite dev server acts as a secure proxy:

```
Browser  →  /api/gemini/*  →  Vite proxy (reads env vars)  →  Gemini API
```

- The Gemini endpoint and API key are read from `AI_INTEGRATIONS_GEMINI_BASE_URL` and `AI_INTEGRATIONS_GEMINI_API_KEY` inside `vite.config.ts` (Node.js context — never shipped to the browser)
- No separate backend process is needed
- No Gemini API key needs to be manually configured — Replit AI Integrations handles it automatically

### AI Features

| Feature | Location | Description |
|---|---|---|
| AI Credit Reviewer | `/ai-credit-reviewer` | Full credit profile analysis with score projections |
| Dispute Letter Generator | `/dispute-letter-generator` | FCRA-compliant dispute letters per bureau |
| AI Dispute Autopilot | `/ai-dispute-autopilot` | Parallel multi-item, multi-bureau letter packages |
| AI Chat Widget | All pages | Floating credit advisor chatbot |
| AI Service Content | Admin panel | AI-generated service descriptions and benefits |

---

## Design System

The luxury gold-and-dark design system is defined in `src/styles/globals.css` and extended via Tailwind.

| Token | Value | Usage |
|---|---|---|
| Gold Primary | `#B8924A` | Buttons, borders, accents, highlights |
| Gold Light | `#D4AF72` | Hover states, gradient end |
| Gold Dark | `#8B6A2E` | Gradient start, deep accents |
| Near Black | `#0A0A0A` | Page backgrounds |
| Off White | `#F9F6F1` | Body text on dark backgrounds |
| Heading Font | Montserrat (600, 700, 800) | All headings and labels |
| Body Font | Open Sans (400, 600) | All body text and UI |

---

## Firestore Collections

| Collection | Document ID | Purpose |
|---|---|---|
| `users/{uid}` | Firebase Auth UID | User profiles — name, email, plan, role, creditScore |
| `contacts/{id}` | UUID (v4) | Contact form submissions — managed in admin panel |
| `services/{slug}` | Service slug (e.g. `credit-analysis`) | Service offerings — admin CRUD, publicly readable |
| `users/{uid}/disputePackages/{id}` | Auto ID | AI-generated dispute letter packages |
| `users/{uid}/creditReviews/{id}` | Auto ID | AI credit review analysis history |

---

## Security Model

Firestore security rules are the **sole access control layer** — there is no backend server.

```
users/{userId}
  ├── read       owner or admin
  ├── create     owner only  (role field must be "user")
  ├── update     owner (safe fields only) OR admin
  └── delete     admin only

users/{userId}/disputePackages/{packageId}
  ├── read/create/update   owner only
  └── delete               owner or admin

users/{userId}/creditReviews/{reviewId}
  ├── read/create   owner only
  └── delete        owner or admin

contacts/{contactId}
  ├── create     anyone  (public contact form)
  └── read/update/delete   admin only

services/{serviceId}
  ├── read       anyone
  └── create/update/delete   admin only

all other paths   denied
```

**Admin role** is determined by `role: "admin"` in the user's Firestore document — not a Firebase custom claim.

---

## Path Aliases

Configured in both `vite.config.ts` and `tsconfig.json`.

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

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server on port 5000 |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | TypeScript type check (no emit) |
| `npm run lint` | ESLint on `src/` |

Firebase CLI commands:

| Command | Description |
|---|---|
| `firebase deploy --only firestore` | Deploy rules and indexes |
| `firebase deploy --only firestore:rules` | Deploy rules only |
| `firebase deploy --only firestore:indexes` | Deploy indexes only |
| `firebase deploy --only hosting` | Deploy to Firebase Hosting |

---

## Common Issues

| Symptom | Cause | Fix |
|---|---|---|
| `VITE_FIREBASE_API_KEY is not set` | Missing environment variable | Add all `VITE_*` Firebase vars to Replit Secrets |
| `auth/operation-not-allowed` | Email/Password not enabled | Enable it in Firebase Console → Authentication → Sign-in method |
| Firestore `permission-denied` | Rules not deployed or admin role not set | Run `firebase deploy --only firestore:rules` |
| AI tools return no response | Gemini integration not active | Ensure Replit AI Integrations (Gemini) is enabled for this project |
| 404 on page refresh | SPA routing not configured | Ensure `vercel.json` or Firebase Hosting rewrites are active |
| Admin panel shows no data | `role` field not set to `"admin"` | Edit user's Firestore document in Firebase Console |
| Dispute packages not saving | Firestore subcollection rules missing | Ensure latest `firestore.rules` are deployed |

---

## Notes

- Framer Motion is pinned to **v10** — v11+ has a dist structure incompatibility with Vite
- `initializeFirestore` with `persistentLocalCache` is used, replacing the deprecated `enableIndexedDbPersistence`
- Gemini API calls are proxied through the **Vite dev server** using Replit AI Integrations env vars — no API key is ever exposed to the browser
- Deleting a user from the Admin panel removes their Firestore document only; their Firebase Auth account requires the Firebase Admin SDK to fully delete
- The `v7_startTransition` future flag is set on `RouterProvider` to suppress the React Router v7 migration warning

---

## Author

**Saif Khan**

---

## License

Private — all rights reserved. This codebase is proprietary to Proximity Credit Repair.
