# Proximity Credit Repair — Deployment Guide

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                     Production Architecture                       │
│                                                                  │
│  Browser ──► Vercel / Replit (static CDN)                        │
│                  React SPA (Vite build)                          │
│                                                                  │
│  React SPA ──► Firebase Auth  (login / register / token)         │
│  React SPA ──► Firestore      (user data, contacts, services)    │
│  React SPA ──► Gemini API     (AI credit tools & chat)           │
│                                                                  │
│  No backend server required — all calls go direct from browser   │
└──────────────────────────────────────────────────────────────────┘
```

This is a **pure frontend** application. There is no Express server, no Firebase Functions, and no backend API. All data operations go through the Firebase Client SDK directly from the browser, protected by Firestore security rules.

---

## Step 1 — Firebase Project Setup

### 1a. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **Add project** → enter a name (e.g. `proximity-credit-repair`)
3. Disable Google Analytics (optional) → **Create project**

### 1b. Enable Firebase Authentication

1. **Build → Authentication → Get started**
2. Under **Sign-in method** → enable **Email/Password**
3. Optionally enable **Google** for Google Sign-In
4. Click **Save**

### 1c. Enable Firestore Database

1. **Build → Firestore Database → Create database**
2. Choose **Production mode** → select your region (e.g. `us-central1`)
3. Click **Enable**

### 1d. Get Firebase Web App Credentials

1. **Project Settings → General → Your apps → Add app → Web**
2. Register app (any nickname) → copy the config object:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
}
```

These become your `VITE_FIREBASE_*` environment variables.

---

## Step 2 — Firestore Security Rules & Indexes

### 2a. Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
firebase use your-firebase-project-id
```

Update `.firebaserc` with your actual project ID:
```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

### 2b. Deploy Security Rules

```bash
firebase deploy --only firestore:rules
```

The rules in `firestore.rules` enforce:
- Users can read/write their own profile only
- Admins can read/write everything
- Anyone can submit a contact form (public)
- Only admins can read, update, or delete contacts
- Services collection is publicly readable, admin-write only

### 2c. Deploy Indexes

```bash
firebase deploy --only firestore:indexes
```

### 2d. Firestore Collections Schema

| Collection | Document ID | Key Fields |
|---|---|---|
| `users` | Firebase Auth UID | `id`, `name`, `email`, `createdAt`, `plan`, `role`, `creditScore` |
| `contacts` | UUID (v4) | `id`, `fullName`, `email`, `phone`, `serviceOfInterest`, `message`, `status`, `createdAt` |
| `services` | Service slug (e.g. `credit-analysis`) | `id`, `title`, `icon`, `shortDescription`, `description`, `benefits[]`, `order` |
| `users/{uid}/disputePackages` | Auto ID | `createdAt`, `status`, `letterCount`, `bureaus[]`, `itemNames[]`, `letters[]` |
| `users/{uid}/creditReviews` | Auto ID | `createdAt`, `firstName`, `currentScore`, `goalScore`, `result` |

### 2e. Create the First Admin Account

Because the app has no seed script, set up the first admin manually:

1. Register normally via `/register`
2. In the Firebase Console → **Firestore → users → {your UID}**
3. Edit the `role` field from `"user"` to `"admin"`
4. The admin panel is now accessible at `/admin`

---

## Step 3 — Google Gemini API Key

The AI features (Credit Reviewer, Dispute Letters, AI Chat) require a Gemini API key.

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click **Create API key** → copy the key
3. Set it as `VITE_GEMINI_API_KEY` in your environment

> **Note:** If deploying on Replit, this is already set up via the Replit Secrets panel.

---

## Step 4 — Deploy to Vercel

### 4a. Push to GitHub

Ensure your code is in a GitHub repository.

### 4b. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repository
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `client`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### 4c. Set Environment Variables in Vercel

In **Project Settings → Environment Variables**, add:

| Variable | Required | Description |
|---|---|---|
| `VITE_FIREBASE_API_KEY` | Yes | Firebase web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Yes | `your-project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Yes | Your Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Yes | `your-project.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Yes | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Yes | Firebase app ID |
| `VITE_GEMINI_API_KEY` | Yes | Google Gemini API key |

### 4d. Deploy

Click **Deploy**. Vercel will build and serve the static SPA automatically. All subsequent pushes to your main branch trigger an auto-redeploy.

The `client/vercel.json` already configures SPA routing (rewrites `/*` → `/index.html`) and security headers.

---

## Step 5 — Deploy to Replit (Alternative)

If hosting directly on Replit:

1. All `VITE_*` secrets are managed in the **Secrets** tab in Replit
2. The **Start application** workflow runs `npm run dev --prefix client`
3. Vite serves on port `5000` which Replit proxies to the public URL
4. For production publishing, use **Replit Deployments** which runs `npm run build --prefix client` and serves the `dist/` output

---

## Step 6 — Local Development

### 6a. Install Dependencies

```bash
# Root dependencies
npm install

# Client dependencies
npm install --prefix client

# Or install both at once
npm run install:all
```

### 6b. Configure Environment Variables

Create `client/.env.local` (never commit this file):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 6c. Start Dev Server

```bash
npm run dev
```

Frontend will be available at `http://localhost:5000`.

### 6d. Available Scripts

```bash
npm run dev          # Start Vite dev server (port 5000)
npm run build        # Build for production (output: client/dist)
npm run preview      # Preview production build locally
npm run typecheck    # Run TypeScript type check (no emit)
npm run lint         # Run ESLint on client/src
npm run install:all  # Install root + client dependencies
```

---

## Step 7 — Production Verification Checklist

### Frontend & Routing
- [ ] Site loads at your deployed URL
- [ ] All pages render without console errors
- [ ] SPA routing works (navigate to `/about`, hard refresh — no 404)
- [ ] Back button navigates correctly

### Authentication
- [ ] Registration creates a new Firebase Auth user + Firestore profile
- [ ] Login works and returns correct user data from Firestore
- [ ] Token refresh persists across browser sessions
- [ ] Protected routes (`/dashboard`) redirect unauthenticated users to `/login`
- [ ] Admin routes (`/admin`) redirect non-admin users

### Firestore
- [ ] Contact form submission saves to the `contacts` collection
- [ ] User profile document created in `users` after registration
- [ ] Dashboard loads user data from Firestore
- [ ] AI dispute packages save to `users/{uid}/disputePackages`
- [ ] Credit reviews save to `users/{uid}/creditReviews`

### AI Features
- [ ] AI Credit Reviewer returns a parsed JSON result
- [ ] Dispute Letter Generator produces a formatted letter
- [ ] AI Dispute Autopilot generates a full package of letters
- [ ] AI Chat Widget responds to messages

### Admin Panel
- [ ] `/admin` redirects non-admins
- [ ] Admin Dashboard shows real stats from Firestore
- [ ] Admin Users page lists all registered users
- [ ] Admin Contacts page shows contact form submissions
- [ ] Admin Services page supports full CRUD

### Security
- [ ] Unauthenticated Firestore reads to `users` collection are rejected
- [ ] A user cannot read another user's document
- [ ] Contact creation passes server-side Firestore rule validation
- [ ] No sensitive keys visible in compiled JS (check DevTools → Sources)

---

## Environment Variable Reference

All variables are prefixed with `VITE_` so Vite can bundle them into the client build.

| Variable | Required | Description |
|---|---|---|
| `VITE_FIREBASE_API_KEY` | Yes | Firebase web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Yes | Firebase Auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Yes | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Yes | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Yes | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Yes | Firebase app ID |
| `VITE_GEMINI_API_KEY` | Yes | Google Gemini API key for AI features |

---

## Firestore Security Model

This app uses **Firestore client-side security rules as the sole security layer** — there is no backend to enforce auth. Understanding the rules is critical.

```
users/{userId}
  ├── read:   owner or admin
  ├── create: owner only (role must be 'user')
  ├── update: owner (safe fields only) OR admin
  └── delete: admin only

contacts/{contactId}
  ├── create: anyone (public contact form)
  └── read / update / delete: admin only

services/{serviceId}
  ├── read:   anyone (public)
  └── create / update / delete: admin only
```

Admin role is determined by `role: 'admin'` in the user's Firestore document. Set this manually in the Firebase Console for the first admin account.

---

## Common Issues

| Issue | Cause | Fix |
|---|---|---|
| `VITE_FIREBASE_API_KEY is not set` | Missing env var | Add `VITE_FIREBASE_API_KEY` to `.env.local` or Replit Secrets |
| Firebase `auth/operation-not-allowed` | Email/Password not enabled | Enable in Firebase Console → Authentication → Sign-in method |
| Firestore permission denied | Rules not deployed or role mismatch | Run `firebase deploy --only firestore:rules` |
| AI features return "API key not configured" | Missing Gemini key | Set `VITE_GEMINI_API_KEY` in env |
| SPA 404 on page refresh | Missing catch-all route | Ensure `vercel.json` rewrites are deployed (already included) |
| Admin panel not accessible | `role` field not set to `'admin'` | Edit the Firestore user document manually |
