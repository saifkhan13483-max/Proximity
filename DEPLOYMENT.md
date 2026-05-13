# Proximity Credit Repair — Deployment Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                  Production Architecture                     │
│                                                             │
│  Browser ──► Vercel (static CDN)                           │
│                  /client/dist  ──► React SPA               │
│                                                             │
│  React SPA ──► VITE_API_URL ──► Firebase Functions         │
│                  /api/*  ──► Express (Firebase Functions)   │
│                                                             │
│  Firebase Functions ──► Firestore (database)               │
│  Firebase Functions ──► Cloudinary (file uploads)          │
│  Firebase Functions ──► Firebase Auth (token verify)        │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

```
/
├── client/                    # Frontend — deployed to Vercel
│   ├── src/
│   │   ├── config/firebase.ts # Firebase client SDK (VITE_* env vars)
│   │   ├── services/
│   │   │   ├── api.ts         # Base API helper
│   │   │   ├── authService.ts # Firebase Auth flows
│   │   │   ├── adminService.ts
│   │   │   ├── contactService.ts
│   │   │   ├── planService.ts
│   │   │   └── uploadService.ts  # Cloudinary uploads via Functions
│   │   └── ...
│   ├── vercel.json            # SPA routing + security headers
│   └── .env.example           # Frontend env vars template
│
├── firebase/
│   └── functions/             # Backend — deployed to Firebase Functions
│       ├── src/
│       │   ├── index.js       # Firebase Function exports (api, seedAdminFn)
│       │   ├── app.js         # Express app — all routes
│       │   ├── firebase-admin.js  # Admin SDK init
│       │   └── cloudinary.js  # Cloudinary upload service
│       └── .env.example       # Backend env vars template
│
├── shared/types/index.ts      # Shared TypeScript types
├── firebase.json              # Firebase CLI config
├── .firebaserc                # Firebase project aliases
├── firestore.rules            # Firestore security rules
└── firestore.indexes.json     # Firestore composite indexes
```

---

## Step 1: Firebase Project Setup

### 1a. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **Add project** → enter name (e.g. `proximity-credit-repair`)
3. Disable Google Analytics (optional) → **Create project**

### 1b. Enable Firebase Authentication

1. In your project: **Build → Authentication → Get started**
2. Under **Sign-in method** → enable **Email/Password**
3. Click **Save**

### 1c. Enable Firestore Database

1. **Build → Firestore Database → Create database**
2. Choose **Production mode** → select your region (e.g. `us-central1`)
3. Click **Enable**

### 1d. Enable Firebase Functions

Firebase Functions requires the **Blaze (pay-as-you-go)** plan.

1. Upgrade your project to Blaze: **Settings (gear icon) → Usage and billing → Modify plan**
2. Select **Blaze** → confirm

### 1e. Get Firebase Web App Credentials (for frontend)

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

You'll use these as `VITE_FIREBASE_*` environment variables.

### 1f. Get Firebase Admin SDK Credentials (for backend)

1. **Project Settings → Service Accounts → Generate new private key**
2. Download the JSON file — keep it secret
3. You'll paste the full JSON as `FIREBASE_SERVICE_ACCOUNT_JSON`

### 1g. Configure Firebase CLI

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login
firebase login

# Set your project (replace with your actual project ID)
firebase use your-firebase-project-id

# Or add it to .firebaserc
```

Update `.firebaserc` with your actual project ID:
```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

---

## Step 2: Firestore Setup

### 2a. Deploy Security Rules

```bash
firebase deploy --only firestore:rules
```

The rules in `firestore.rules` enforce:
- Users can read/write their own profile only
- Admins can read/write everything
- Anyone can submit a contact form
- Only admins can read/update/delete contacts

### 2b. Deploy Indexes

```bash
firebase deploy --only firestore:indexes
```

### 2c. Firestore Collections Schema

| Collection | Document ID | Fields |
|---|---|---|
| `users` | Firebase Auth UID | `id`, `name`, `email`, `createdAt`, `plan`, `role`, `creditScore` |
| `contacts` | UUID (v4) | `id`, `fullName`, `email`, `phone`, `serviceOfInterest`, `message`, `status`, `createdAt` |
| `services` | Service slug (e.g. `credit-analysis`) | `id`, `title`, `icon`, `shortDescription`, `description`, `benefits[]`, `order` |

### 2d. Seed Initial Data

The `services` collection is auto-seeded with 7 default services on the first request to `GET /api/admin/services`.

To manually seed the admin user after deployment, call the `seedAdminFn` endpoint:

```bash
curl -X GET \
  "https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/seedAdminFn?token=YOUR_SEED_TOKEN" \
  -H "x-seed-token: YOUR_SEED_TOKEN"
```

---

## Step 3: Cloudinary Setup

### 3a. Create Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com) → **Sign up free**
2. Complete registration

### 3b. Get Credentials

1. Go to your [Cloudinary Dashboard](https://console.cloudinary.com)
2. Copy from **Product Environment Credentials**:
   - **Cloud name** → `CLOUDINARY_CLOUD_NAME`
   - **API Key** → `CLOUDINARY_API_KEY`
   - **API Secret** → `CLOUDINARY_API_SECRET`

### 3c. Configure Upload Settings (Recommended)

1. In Cloudinary Console → **Settings → Upload**
2. Add an upload preset for `proximity-credit-repair` folder
3. Enable **Auto-tagging** for organization

### 3d. Test Uploads

After deploying Firebase Functions, test the upload endpoint:

```bash
curl -X POST \
  "https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/api/api/upload" \
  -H "Authorization: Bearer YOUR_FIREBASE_ID_TOKEN" \
  -F "file=@/path/to/image.jpg" \
  -F "folder=team-photos"
```

---

## Step 4: Deploy Firebase Functions

### 4a. Configure Environment Variables for Functions

```bash
cd firebase/functions

# Copy the example file
cp .env.example .env

# Edit .env with your actual values
nano .env
```

For production, set secrets via Firebase CLI (recommended over .env):

```bash
firebase functions:secrets:set FIREBASE_SERVICE_ACCOUNT_JSON
firebase functions:secrets:set CLOUDINARY_API_SECRET
firebase functions:secrets:set ADMIN_PASSWORD
firebase functions:secrets:set SEED_ADMIN_TOKEN
```

### 4b. Install Dependencies

```bash
npm install --prefix firebase/functions
```

### 4c. Deploy Functions

```bash
firebase deploy --only functions
```

Or from the root:
```bash
npm run deploy:functions
```

After deployment, your API will be available at:
```
https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/api
```

### 4e. Seed the Admin Account

```bash
curl -H "x-seed-token: YOUR_SEED_TOKEN" \
  "https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/seedAdminFn"
```

---

## Step 5: Vercel Frontend Deployment

### 5a. Push to GitHub

Ensure your code is in a GitHub repository.

### 5b. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repository
3. **Framework Preset**: Vite
4. **Root Directory**: `client`
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist`

### 5c. Set Environment Variables in Vercel

In **Project Settings → Environment Variables**, add:

| Variable | Value |
|---|---|
| `VITE_FIREBASE_API_KEY` | Your Firebase web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | `your-project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `your-project-id` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `your-project.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Your Firebase app ID |
| `VITE_API_URL` | `https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/api` |

### 5d. Deploy

Click **Deploy**. Vercel will build and deploy automatically.

For subsequent deploys, push to your main branch and Vercel auto-deploys.

---

## Step 6: Local Development

### 6a. Install All Dependencies

```bash
npm run install:all
```

### 6b. Set Up Frontend Environment

```bash
cp client/.env.example client/.env.local
# Edit client/.env.local with your Firebase credentials
```

### 6c. Set Up Backend Environment

```bash
cp firebase/functions/.env.example firebase/functions/.env
# Edit firebase/functions/.env with your credentials
```

### 6d. Start Firebase Emulators

```bash
npm run emulators
```

Emulator UI available at: `http://localhost:4000`
- Auth emulator: `http://localhost:9099`
- Firestore emulator: `http://localhost:8080`
- Functions emulator: `http://localhost:5001`

### 6e. Start Frontend Dev Server

In a separate terminal:

```bash
npm run dev
```

Frontend will be at `http://localhost:5000`, proxying `/api` to the Functions emulator.

### 6f. Available Root Scripts

```bash
npm run dev              # Start frontend dev server
npm run build            # Build frontend for production
npm run emulators        # Start all Firebase emulators
npm run deploy           # Deploy Functions + Firestore rules
npm run deploy:functions # Deploy Firebase Functions only
npm run deploy:firestore # Deploy Firestore rules + indexes only
npm run deploy:all       # Deploy everything (Functions + Firestore + Hosting)
npm run install:all      # Install deps for root + client + firebase/functions
```

---

## Step 7: Production Verification Checklist

### Frontend
- [ ] Site loads at your Vercel URL
- [ ] All pages render correctly
- [ ] No console errors related to Firebase config
- [ ] SPA routing works (navigate to `/about`, refresh — no 404)

### Authentication
- [ ] Registration creates a new user
- [ ] Login works and returns correct user data
- [ ] Token refresh works across sessions
- [ ] Admin login works with seeded admin credentials
- [ ] Protected routes redirect unauthenticated users

### Firestore
- [ ] Contact form submission saves to Firestore `contacts` collection
- [ ] User profile is created in `users` collection after registration
- [ ] Admin can read/update/delete contacts
- [ ] Admin can read/update/delete users

### Firebase Functions
- [ ] `GET /api/health` returns `{ status: "ok" }`
- [ ] `POST /api/contacts` saves contact forms
- [ ] `GET /api/auth/me` returns authenticated user profile
- [ ] `GET /api/admin/stats` works for admin users
- [ ] `GET /api/admin/services` returns 7 default services

### Cloudinary
- [ ] Upload endpoint accepts image files
- [ ] Files appear in Cloudinary dashboard after upload
- [ ] Returned URLs are accessible and load correctly
- [ ] Oversized files and invalid types are rejected

### Security
- [ ] Unauthenticated requests to protected routes return 401
- [ ] Non-admin requests to admin routes return 403
- [ ] CORS blocks unauthorized origins
- [ ] Rate limiting is active (test with repeated requests)
- [ ] Firestore rules prevent direct client writes to `contacts` (admin-only fields)

---

## Deployment Safety Flags

### Limitations to Be Aware Of

| Concern | Impact | Mitigation |
|---|---|---|
| Firebase Functions cold start | ~1-3s delay on first request | Use `runWith({ minInstances: 1 })` on Blaze plan for critical paths |
| Firestore reads/writes per day | 50k reads, 20k writes/day on free tier | Upgrade to Blaze; add caching |
| Firebase Functions timeout | 60s max per request | Long tasks should use background functions or Cloud Tasks |
| Cloudinary free tier | 25GB storage, 25GB bandwidth/month | Monitor usage; upgrade if needed |
| No persistent in-memory state | Functions are stateless | All state goes in Firestore — ✅ already implemented |
| No file system writes | Functions filesystem is read-only | All uploads use Cloudinary — ✅ already implemented |
| No WebSocket support | Firebase Functions are HTTP-only | Use Firestore real-time listeners on the client instead |

### What's Already Production-Safe

- Stateless Express handlers (no in-memory sessions)
- All file uploads go to Cloudinary (no local filesystem)
- All data stored in Firestore (no SQLite/local DB)
- Firebase Admin SDK initialized from environment credentials
- Rate limiting on all sensitive endpoints
- Input sanitization and validation on all inputs
- Helmet security headers on all responses
- CORS configured for specific allowed origins

---

## Environment Variable Reference

### Frontend (`client/.env.local`)

| Variable | Required | Description |
|---|---|---|
| `VITE_FIREBASE_API_KEY` | Yes | Firebase web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Yes | Firebase Auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Yes | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Yes | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Yes | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Yes | Firebase app ID |
| `VITE_API_URL` | Yes | Firebase Functions API base URL |

### Backend (`firebase/functions/.env`)

| Variable | Required | Description |
|---|---|---|
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Yes* | Full service account JSON |
| `FIREBASE_PROJECT_ID` | Yes* | Firebase project ID (alternative) |
| `FIREBASE_CLIENT_EMAIL` | Yes* | Service account email (alternative) |
| `FIREBASE_PRIVATE_KEY` | Yes* | Service account private key (alternative) |
| `ADMIN_EMAIL` | Yes | Email for seeded admin account |
| `ADMIN_PASSWORD` | Yes | Password for seeded admin account |
| `SEED_ADMIN_TOKEN` | Yes | Token to protect the seed endpoint |
| `CLOUDINARY_CLOUD_NAME` | No | Cloudinary cloud name (uploads) |
| `CLOUDINARY_API_KEY` | No | Cloudinary API key (uploads) |
| `CLOUDINARY_API_SECRET` | No | Cloudinary API secret (uploads) |
| `ALLOWED_ORIGINS` | No | Comma-separated list of allowed CORS origins |
| `NODE_ENV` | No | `development` or `production` |

*Use either `FIREBASE_SERVICE_ACCOUNT_JSON` OR the three individual fields.
