# Firestore Migration Guide — Proximity Credit Repair

## Why Firestore?

| Problem (Current) | Solution (Firestore) |
|---|---|
| `users.json` and `contacts.json` are wiped on every restart | Data lives in the cloud — survives restarts, redeploys, and crashes |
| No concurrent access safety (two requests can corrupt the file) | Firestore handles concurrent writes with transactions |
| Can't scale beyond one server | Globally distributed, scales automatically |
| No real-time updates | Supports real-time listeners if needed in future |

**Scope:** All changes are backend-only (`backend/server.js` + new `backend/firebase.js`). The entire frontend codebase remains untouched.

---

## Prerequisites

Before starting, you need a Firebase project with Firestore enabled and a service account key.

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **Add project** → name it `proximity-credit-repair` → click through setup
3. In the left sidebar go to **Build → Firestore Database**
4. Click **Create database** → choose **Start in production mode** → select your region → click **Enable**
5. In the left sidebar go to **Project Settings** (gear icon) → **Service accounts** tab
6. Click **Generate new private key** → confirm → a `.json` file will download
7. Open that file — you will need its contents in Step 1 below

---

## Step 1 — Add Firebase Credentials as Secrets

**Prompt:**

> I need to add my Firebase service account credentials as environment secrets so the backend can connect to Firestore. I have a service account JSON file downloaded from the Firebase console. Please help me store the following fields from that JSON file as Replit secrets:
>
> - `FIREBASE_PROJECT_ID` — the `project_id` value from the JSON
> - `FIREBASE_CLIENT_EMAIL` — the `client_email` value from the JSON
> - `FIREBASE_PRIVATE_KEY` — the `private_key` value from the JSON (the entire string including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`)
>
> Use `requestEnvVar` for each of these so they are stored securely and never appear in the code.

---

## Step 2 — Install the Firebase Admin SDK

**Prompt:**

> Install the `firebase-admin` npm package in the `backend` directory of this project. Use the package management tools available in this Replit environment. After installing, verify it appears in `backend/package.json` under `dependencies`.

---

## Step 3 — Create the Firebase Initializer Module

**Prompt:**

> Create a new file at `backend/firebase.js`. This module should:
>
> 1. Import `firebase-admin` using `require('firebase-admin')`
> 2. Initialize the Firebase app using `admin.initializeApp()` with a `credential` built from `admin.credential.cert({})` using these environment variables:
>    - `projectId`: `process.env.FIREBASE_PROJECT_ID`
>    - `clientEmail`: `process.env.FIREBASE_CLIENT_EMAIL`
>    - `privateKey`: `process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')` (the replace is needed because Replit secrets escape newlines)
> 3. Export the Firestore instance: `module.exports = admin.firestore()`
>
> This file will be imported by `server.js` to get the `db` instance.

---

## Step 4 — Replace User Storage with Firestore

**Prompt:**

> Modify `backend/server.js` to replace all JSON-file-based user storage with Firestore. Specifically:
>
> 1. At the top of the file, add `const db = require('./firebase')` and remove the `fs` and `path` imports (they are no longer needed for data storage).
> 2. Remove the `USERS_FILE` and `CONTACTS_FILE` constants.
> 3. Remove the `loadUsers()`, `saveUsers()`, `loadContacts()`, and `saveContacts()` helper functions entirely.
> 4. Rewrite the `seedAdmin()` function to use Firestore instead of `loadUsers()`/`saveUsers()`. It should:
>    - Query the `users` collection for a document where `email == ADMIN_EMAIL`
>    - If found (and only one exists), return early
>    - If not found, create a new document in the `users` collection with the same fields as before (`id`, `name`, `email`, `passwordHash`, `createdAt`, `plan`, `role`, `creditScore`)
>    - Use `db.collection('users').doc(id).set(userData)` to create it
> 5. Keep all existing route signatures and response shapes exactly the same — only replace internal storage calls.
>
> Do not modify any route paths, middleware, or response formats. The frontend must continue working without any changes.

---

## Step 5 — Migrate Auth Routes to Firestore

**Prompt:**

> Update the three auth routes in `backend/server.js` to use Firestore. Keep all response shapes identical to what they are now:
>
> **POST `/api/auth/register`:**
> - Instead of `loadUsers()`, query `db.collection('users').where('email', '==', email).get()` to check for duplicates
> - Instead of `users.push(user); saveUsers(users)`, use `db.collection('users').doc(user.id).set(user)`
>
> **POST `/api/auth/login`:**
> - Instead of `loadUsers()` and `.find()`, use `db.collection('users').where('email', '==', email.toLowerCase()).limit(1).get()`
> - Extract the user from `querySnapshot.docs[0].data()`
>
> **GET `/api/auth/me`:**
> - Instead of `loadUsers()` and `.find()`, use `db.collection('users').doc(req.user.id).get()`
> - Extract user from `doc.data()`
> - Return 404 if `!doc.exists`
>
> All other logic (bcrypt, jwt, validation) stays exactly the same.

---

## Step 6 — Migrate Contact Routes to Firestore

**Prompt:**

> Update the contact routes in `backend/server.js` to use Firestore:
>
> **POST `/api/contacts`:**
> - Instead of `loadContacts()` / `saveContacts()`, use `db.collection('contacts').doc(contact.id).set(contact)`
>
> No other changes needed to this route.

---

## Step 7 — Migrate Admin Routes to Firestore

**Prompt:**

> Update all admin routes in `backend/server.js` to use Firestore. Keep all response shapes exactly the same:
>
> **GET `/api/admin/stats`:**
> - Replace `loadUsers()` with `db.collection('users').get()` and map `snapshot.docs.map(d => d.data())`
> - Replace `loadContacts()` with `db.collection('contacts').get()` and map similarly
> - All calculation logic (filtering admins, counting by plan, etc.) stays identical
>
> **GET `/api/admin/users`:**
> - Replace `loadUsers()` with a Firestore `.get()` on the `users` collection
> - Keep the same filter (remove admins) and map (remove `passwordHash`) logic
>
> **PATCH `/api/admin/users/:id`:**
> - Replace `loadUsers()` / index lookup with `db.collection('users').doc(req.params.id).get()`
> - Use `doc.update({ plan, creditScore })` to update only the changed fields
> - Return the updated user data (fetch it again after update or construct it from existing data)
>
> **DELETE `/api/admin/users/:id`:**
> - Replace with `db.collection('users').doc(req.params.id).delete()`
>
> **GET `/api/admin/contacts`:**
> - Replace `loadContacts()` with a Firestore `.get()` on the `contacts` collection
> - Keep the same sort by `createdAt` descending
>
> **PATCH `/api/admin/contacts/:id`:**
> - Replace with `db.collection('contacts').doc(req.params.id).update({ status })`
>
> **DELETE `/api/admin/contacts/:id`:**
> - Replace with `db.collection('contacts').doc(req.params.id).delete()`

---

## Step 8 — Migrate the Plan Selection Route to Firestore

**Prompt:**

> Update the `POST /api/users/plan` route in `backend/server.js` to use Firestore:
>
> - Replace `loadUsers()` / index lookup with `db.collection('users').doc(req.user.id).get()`
> - Replace `users[idx].plan = VALID_PLANS[planId]; saveUsers(users)` with `doc.ref.update({ plan: VALID_PLANS[planId] })`
> - Return `{ plan: VALID_PLANS[planId] }` as before

---

## Step 9 — Clean Up and Verify

**Prompt:**

> Now that all routes use Firestore:
>
> 1. Remove the `users.json` and `contacts.json` files from the `backend/` directory — they are no longer used
> 2. Restart the `Auth API` workflow and check the logs to confirm the server starts without errors and logs `Proximity Auth API running on port 3001`
> 3. Check that the admin seed runs without errors (look for `Admin account seeded:` or silent success in logs)
> 4. Take a screenshot of the running app to confirm the frontend still works
> 5. Update `replit.md` to reflect that Firestore is now the database layer

---

## Step 10 — Set Firestore Security Rules

**Prompt:**

> In the Firebase console, go to **Firestore Database → Rules** and replace the default rules with these production-safe rules that block all direct client access (since all reads/writes go through our Express backend using the Admin SDK which bypasses these rules):
>
> ```
> rules_version = '2';
> service cloud.firestore {
>   match /databases/{database}/documents {
>     match /{document=**} {
>       allow read, write: if false;
>     }
>   }
> }
> ```
>
> Click **Publish**. This ensures no one can access the database directly from the browser — only the backend server (using the Admin SDK) can read and write data.

---

## Summary

After completing all 10 steps, the Proximity Credit Repair app will have:

- **Persistent storage** — user accounts and contact submissions survive restarts and redeploys
- **No frontend changes** — every existing component, route, and service works exactly as before
- **Production-ready security** — Firestore rules block direct client access
- **Scalable architecture** — ready for thousands of users without any infrastructure changes
