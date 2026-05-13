# Proximity Credit Repair

A high-end, full-stack marketing website and client portal for **Proximity Credit Repair**. Built with React 18 + Vite + TypeScript on the frontend and Express.js + Node.js on the backend, powered by Firebase Authentication and Firestore. Features a gold-and-dark luxury design system, animated UI, a protected client dashboard, and a full admin panel.

---

## Live Architecture

```
Browser
  └── Replit Deployment
        ├── /              → React SPA (Vite build, dist/)
        ├── /assets/*      → Hashed static assets
        └── /api/*         → Express.js backend (port 3001)

Backend (Express.js)
  ├── /api/auth/*          → Firebase Auth profile routes
  ├── /api/contacts        → Contact form submissions (Firestore)
  ├── /api/admin/*         → Admin dashboard routes (token-protected)
  └── /api/users/plan      → Plan selection
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5, TypeScript |
| Styling | Tailwind CSS v3 + shadcn/ui (Radix UI primitives) |
| Animations | Framer Motion v10 |
| Routing | React Router v6 (lazy-loaded routes) |
| State | Zustand (persist middleware), TanStack Query |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Backend | Node.js, Express.js |
| Auth | Firebase Authentication (Client + Admin SDK) |
| Database | Google Cloud Firestore |
| Hosting | Replit (dev + production) |

---

## Project Structure

```
proximity/
├── src/
│   ├── main.tsx                   # App entry — token refresh listener, ErrorBoundary
│   ├── App.tsx                    # Router setup, lazy-loaded routes
│   ├── components/
│   │   ├── layout/                # AppLayout, AdminLayout, ErrorBoundary,
│   │   │                          #   Navbar, Footer, PageWrapper, Section, SEOHead
│   │   ├── guards/                # ProtectedRoute, AdminRoute
│   │   ├── sections/              # HeroSection, ServicesPreview, HowItWorksStrip,
│   │   │                          #   TestimonialsSlider, FinalCTABand
│   │   └── ui/                    # Button, Card, Badge, Input, Select, Textarea,
│   │                              #   Modal, Toast, LoadingScreen, SectionLabel, etc.
│   ├── pages/
│   │   ├── Home.tsx, About.tsx, Services.tsx
│   │   ├── HowItWorks.tsx, Testimonials.tsx, FAQ.tsx
│   │   ├── Contact.tsx, Pricing.tsx, NotFound.tsx
│   │   ├── Login.tsx, Register.tsx, Dashboard.tsx
│   │   └── admin/
│   │       ├── AdminLogin.tsx, AdminDashboard.tsx
│   │       ├── AdminUsers.tsx, AdminContacts.tsx
│   ├── services/
│   │   ├── authService.ts         # Firebase Auth — register, login, logout
│   │   ├── adminService.ts        # Admin API — users, contacts, stats
│   │   ├── contactService.ts      # Contact form submission
│   │   ├── planService.ts         # Plan selection API
│   │   └── api.ts                 # Base apiRequest helper
│   ├── store/
│   │   ├── authStore.ts           # Zustand auth state (persisted to localStorage)
│   │   └── uiStore.ts, formStore.ts
│   ├── lib/
│   │   ├── firebase.ts            # Firebase SDK init (persistentLocalCache)
│   │   ├── animations.ts, utils.ts, validators.ts
│   ├── config/
│   │   ├── siteMetadata.ts        # SEO metadata
│   │   ├── navigation.ts          # Nav + footer links
│   │   └── site.ts                # Phone, email, address
│   ├── data/
│   │   ├── services.ts            # 7 service definitions
│   │   ├── testimonials.ts, faqs.ts, plans.ts, stats.ts, team.ts
│   ├── hooks/                     # useCountUp, useMediaQuery
│   └── styles/
│       └── globals.css            # Tailwind base + shadcn CSS vars + brand vars
├── backend/
│   ├── server.js                  # Express entry (graceful shutdown)
│   ├── app.js                     # Helmet, rate-limiting, compression, all routes
│   ├── firebase.js                # Firebase Admin SDK init
│   └── .env.example
├── public/                        # favicon.svg, og-image.png, robots.txt, sitemap.xml
├── index.html
├── vite.config.ts                 # Proxy /api → :3001, Firebase env vars via define
├── tailwind.config.js
├── package.json
└── README.md
```

---

## Pages

| Route | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/about` | About | Public |
| `/services` | Services | Public |
| `/how-it-works` | How It Works | Public |
| `/testimonials` | Testimonials | Public |
| `/pricing` | Pricing | Public |
| `/faq` | FAQ | Public |
| `/contact` | Contact | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/dashboard` | Client Dashboard | Authenticated |
| `/admin` | Admin Dashboard | Admin only |
| `/admin/users` | Manage Users | Admin only |
| `/admin/contacts` | Manage Contacts | Admin only |

---

## Services Offered

The site showcases 7 credit repair services, each with a full description and key benefits:

1. **Credit Analysis** — Three-bureau review to identify all negative items and build a custom action plan
2. **Dispute Filing** — Legally precise challenge letters to all three bureaus, fully managed
3. **Score Monitoring** — Real-time alerts and monthly three-bureau progress reports
4. **Debt Validation** — Certified validation requests to collectors under the FDCPA
5. **Creditor Negotiation** — Pay-for-delete agreements, settlements, and goodwill removals (Premium/VIP)
6. **Educational Resources** — Guides, video tutorials, and an interactive credit score simulator
7. **Identity Theft Protection** — Dark web monitoring and dedicated recovery support (VIP)

---

## Design System

| Token | Value |
|---|---|
| Gold Primary | `#B8924A` |
| Gold Light | `#D4AF72` |
| Gold Dark | `#8B6A2E` |
| Near Black | `#0A0A0A` |
| Card Black | `#141414` |
| Off White | `#F9F6F1` |
| Heading Font | Montserrat |
| Body Font | Open Sans |

---

## Running on Replit

Two workflows run simultaneously:

| Workflow | Command | Port |
|---|---|---|
| Start application | `npm run dev` | 5000 |
| Auth API | `node backend/server.js` | 3001 |

Vite proxies all `/api/*` requests from port 5000 → 3001 automatically.

---

## Environment Variables (Replit Secrets)

### Backend — Firebase Admin SDK

| Secret | Description |
|---|---|
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Full service account JSON blob (recommended) |
| `ADMIN_EMAIL` | Email for the seeded admin account |
| `ADMIN_PASSWORD` | Password for the seeded admin account |

> Alternatively, set `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` individually instead of the JSON blob.

### Frontend — Firebase Client SDK

| Secret | Description |
|---|---|
| `apiKey` | Firebase Web API key |
| `authDomain` | Firebase Auth domain |
| `projectId` | Firebase project ID |
| `storageBucket` | Firebase storage bucket |
| `messagingSenderId` | Firebase messaging sender ID |
| `appId` | Firebase App ID |

---

## API Reference

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/profile` | Bearer token | Create or update user profile in Firestore |
| GET | `/api/auth/me` | Bearer token | Fetch current user profile |

### Contact

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/contacts` | No | Submit the contact form (stored in Firestore) |

### User

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/users/plan` | Bearer token | Select or upgrade a plan |

### Admin

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/admin/stats` | Admin | Dashboard stats (users, leads, plan distribution) |
| GET | `/api/admin/users` | Admin | List all non-admin users |
| PATCH | `/api/admin/users/:id` | Admin | Update user plan or credit score |
| DELETE | `/api/admin/users/:id` | Admin | Delete a user |
| GET | `/api/admin/contacts` | Admin | List all contact submissions |
| PATCH | `/api/admin/contacts/:id` | Admin | Update contact status |
| DELETE | `/api/admin/contacts/:id` | Admin | Delete a contact submission |

---

## Security

- `helmet` — X-Frame-Options, X-Content-Type-Options, HSTS, and other security headers
- `express-rate-limit` — Auth: 20 req/15min · Contact: 10 req/hour · General: 200 req/15min
- `compression` — gzip for all responses
- Firebase Admin SDK — all protected routes verify Firebase ID tokens server-side
- Automatic token refresh — `onIdTokenChanged` listener keeps the Zustand store token current
- CORS — restricts origins to `.replit.dev`, `.replit.app`, and `ALLOWED_ORIGINS`
- Admin seeded via env vars — never hardcoded

---

## Notes

- Framer Motion is pinned to v10 — v11+ has a dist structure incompatibility with Vite
- Firestore uses `persistentLocalCache` with `persistentMultipleTabManager` for multi-tab offline support
- `v7_startTransition` future flag is set on `RouterProvider` to suppress the React Router v7 migration warning
