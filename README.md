<div align="center">

# Proximity Credit Repair

### Premium Credit Repair Platform

**[Live Site](#) · [AI Credit Reviewer](/ai-credit-reviewer) · [Dispute Autopilot](/ai-dispute-autopilot) · [Contact](/contact)**

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%2B%20Auth-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Gemini](https://img.shields.io/badge/Google-Gemini%202.5%20Flash-4285F4?style=flat-square&logo=google&logoColor=white)
![License](https://img.shields.io/badge/License-Private-red?style=flat-square)

</div>

---

## Overview

**Proximity Credit Repair** is a full-service credit repair platform built for **Saif Khan**. It combines a luxury marketing website, three free AI-powered credit tools, a protected client dashboard, and a full admin panel — all backed by Firebase and powered by Google Gemini AI via Replit AI Integrations. Pure frontend architecture — no separate backend server required.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Architecture](#architecture)
- [AI Tools](#ai-tools)
- [Admin Panel](#admin-panel)
- [Firestore Collections](#firestore-collections)
- [Security Model](#security-model)
- [Design System](#design-system)
- [Deployment](#deployment)
- [Author](#author)
- [License](#license)

---

## Features

### Public Marketing Website

| Page | Route | Description |
|---|---|---|
| **Home** | `/` | Hero with particle canvas, animated stat counters, services preview, testimonials slider, CTA band |
| **About** | `/about` | Mission statement, core values grid, full team showcase with bios |
| **Services** | `/services` | 7 detailed service sections with anchor navigation |
| **How It Works** | `/how-it-works` | 4-step animated timeline with gold connector lines |
| **Pricing** | `/pricing` | 4 plan tiers with monthly/annual billing toggle |
| **Testimonials** | `/testimonials` | Trust badges, full testimonials grid, featured video |
| **FAQ** | `/faq` | Animated accordion organized by category |
| **Contact** | `/contact` | Split-layout form with Zod validation and animated success state |

### Free AI Tools — No Sign-up Required

| Tool | Route | Description |
|---|---|---|
| **AI Credit Reviewer** | `/ai-credit-reviewer` | Full credit profile analysis with score projections at 6, 12, and 24 months |
| **Dispute Letter Generator** | `/dispute-letter-generator` | FCRA Section 611-compliant dispute letters for any bureau, ready to print and mail |
| **AI Dispute Autopilot** | `/ai-dispute-autopilot` | Multi-item, multi-bureau letter package generated in parallel |
| **AI Chat Widget** | Every page | Floating credit advisor chatbot powered by Google Gemini |

### Client Dashboard (Protected)

- Firebase email/password authentication with persistent multi-tab sessions
- View, track, and update dispute package history (Generated → Mailed → Under Review → Resolved)
- Full AI credit review history with saved analysis reports
- Account and plan management

### Admin Panel (Protected)

| Page | Route | Description |
|---|---|---|
| **Dashboard** | `/admin` | Real-time stats — total users, new leads, plan distribution |
| **Users** | `/admin/users` | User table with search, plan editing, and delete |
| **Contacts** | `/admin/contacts` | All contact submissions with status management |
| **Services** | `/admin/services` | Full CRUD for all 7 service offerings with AI-generated content |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 + Vite 5 (TypeScript) |
| **Styling** | Tailwind CSS v3 + custom design tokens |
| **UI Primitives** | shadcn/ui (Dialog, Label) via Radix UI · class-variance-authority |
| **Animations** | Framer Motion v10 |
| **Routing** | React Router v6 — lazy-loaded routes + `v7_startTransition` flag |
| **State** | Zustand with persist middleware |
| **Data Fetching** | TanStack Query (React Query v5) |
| **Forms** | React Hook Form + Zod validation |
| **Authentication** | Firebase Authentication — Email/Password (Client SDK) |
| **Database** | Cloud Firestore — Client SDK with persistent multi-tab cache |
| **AI** | Google Gemini 2.5 Flash — via Replit AI Integrations (Vite proxy) |
| **Icons** | Lucide React |
| **Error Handling** | React ErrorBoundary wrapping all routes |

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
└── firebase.json             # Firebase CLI config (Firestore + Hosting)
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- A [Firebase](https://console.firebase.google.com/) project with **Authentication** and **Firestore** enabled
- Running on **Replit** — Gemini AI calls are handled automatically via Replit AI Integrations (no separate API key needed)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app runs on **port 5000**. The `/api/ai` endpoint is proxied through the Vite dev server to Replit AI Integrations — no API key setup required.

### Build

```bash
npm run build
```

Output is written to `dist/`.

### Type Check

```bash
npm run typecheck
```

---

## Environment Variables

Firebase variables are prefixed with `VITE_` so Vite can include them in the client build. Gemini AI credentials are handled automatically by Replit AI Integrations — no manual key setup required.

```env
# Firebase — required for Authentication and Firestore
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Auto-provisioned by Replit AI Integrations — do not set manually
AI_INTEGRATIONS_GEMINI_BASE_URL=
AI_INTEGRATIONS_GEMINI_API_KEY=
```

> **Important:** `AI_INTEGRATIONS_GEMINI_BASE_URL` and `AI_INTEGRATIONS_GEMINI_API_KEY` are read by the Vite dev server in Node.js context and are never shipped to the browser bundle.

---

## Architecture

```
Browser
  │
  ├── /api/ai (POST)
  │     └── Vite proxy (Node.js) → Replit AI Integrations → Gemini 2.5 Flash
  │
  └── All other routes → React SPA (React Router v6 client-side routing)
        ├── Firebase Auth — email/password authentication
        ├── Firestore — users, contacts, services, dispute packages, credit reviews
        └── Zustand — client-side global state with persistence
```

**Key decisions:**
- **No separate backend server** — all server logic lives in the Vite dev proxy; Gemini calls are never exposed to the browser
- **Pure client SDK** — Firebase Auth and Firestore are called directly from the browser; Firestore security rules are the sole access control layer
- **Persistent Firestore cache** — `initializeFirestore` with `persistentLocalCache` and `persistentMultipleTabManager` keeps the app fast and offline-tolerant
- **Lazy-loaded routes** — every page is code-split; only the current route's bundle is loaded
- **Admin routes fully isolated** — the public `Navbar`/`Footer` are never rendered under `/admin/*`; a separate `AdminLayout` handles the admin shell

---

## AI Tools

All AI features are powered by **Google Gemini 2.5 Flash** via Replit AI Integrations. The Vite dev server proxies all `/api/ai` requests server-side — no API key is ever exposed to the browser.

| Tool | Prompt Strategy | Output |
|---|---|---|
| **AI Credit Reviewer** | Multi-field credit profile → structured JSON analysis | Score analysis, action plan, 6/12/24-month projections, priority disputes |
| **Dispute Letter Generator** | Consumer info + bureau + creditor + reason → formal letter | Complete FCRA Section 611 letter, ready to print and mail |
| **AI Dispute Autopilot** | Multiple items × multiple bureaus → parallel `Promise.all` | Full letter package generated simultaneously |
| **AI Chat Widget** | System prompt with full site knowledge base + conversation history | Contextual credit advice and site navigation |

**Reliability features:**
- Rate limit and API errors surfaced clearly to the user — no silent fallbacks
- Parallel generation in Autopilot mode via `p-limit` and `p-retry`
- All AI output is validated before being shown or saved to Firestore

---

## Admin Panel

The admin area is accessible at `/admin`. Access requires `role: "admin"` set on the user's Firestore document — not a Firebase custom claim.

**First-time setup:**
1. Register a normal account via `/register`
2. Open Firebase Console → **Firestore → users → `{your-uid}`**
3. Edit the `role` field from `"user"` to `"admin"`

**Capabilities:**
- Real-time user management — search, plan editing, delete
- View and resolve all client contact form submissions with status tracking
- Full CRUD for service offerings with AI-generated descriptions and benefit lists

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

Deploy rules via Firebase CLI:

```bash
firebase deploy --only firestore
```

---

## Design System

The luxury gold-and-dark design system is defined in `src/styles/globals.css` and extended via Tailwind.

| Token | Value | Usage |
|---|---|---|
| **Gold Primary** | `#B8924A` | Buttons, borders, accents, highlights |
| **Gold Light** | `#D4AF72` | Hover states, gradient end |
| **Gold Dark** | `#8B6A2E` | Gradient start, deep accents |
| **Near Black** | `#0A0A0A` | Page backgrounds |
| **Off White** | `#F9F6F1` | Body text on dark backgrounds |
| **Heading Font** | Montserrat 600/700/800 | All headings and labels |
| **Body Font** | Open Sans 400/600 | All body text and UI |

---

## Deployment

This project is configured for **Firebase Hosting** and **Vercel** with zero additional setup beyond environment variables.

**Vercel:**
1. Import the repository into Vercel
2. Add all `VITE_FIREBASE_*` variables in **Project Settings → Environment Variables**
3. Deploy — `vercel.json` handles SPA rewrites and security headers automatically

**Firebase Hosting:**
```bash
npm run build
firebase deploy --only hosting
```

**Firestore rules and indexes** must be deployed separately:
```bash
firebase deploy --only firestore
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server on port 5000 |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | TypeScript type check (no emit) |
| `npm run lint` | ESLint on `src/` |

---

## Author

**Saif Khan**

---

## License

Private — all rights reserved. This codebase is proprietary to Proximity Credit Repair. Unauthorised copying, distribution, or use of any part of this codebase is prohibited.
