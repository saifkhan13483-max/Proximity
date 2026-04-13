# Proximity Credit Repair — Migration Prompts

Step-by-step prompts to migrate the existing project to include shadcn/ui, Cloudinary, and Firestore Offline Persistence. Run each prompt in order. Complete and verify each step before moving to the next.

---

## Step 1 — Install shadcn/ui and Radix UI

**Prompt:**
> Install shadcn/ui in the frontend directory. Run `npx shadcn-ui@latest init` inside `frontend/` and choose the following options: TypeScript = yes, style = Default, base color = Slate, CSS variables = yes, Tailwind config path = `tailwind.config.js`, components path = `src/components/ui`, utils path = `src/lib/utils.ts`, React Server Components = no. Then install the Radix UI peer dependencies. Confirm the `components.json` file is created and `src/lib/utils.ts` exists with the `cn` helper function.

---

## Step 2 — Replace existing UI elements with shadcn/ui components

**Prompt:**
> Add the following shadcn/ui components to the frontend project by running `npx shadcn-ui@latest add button input label dialog sheet select badge` inside the `frontend/` directory. Then replace the raw HTML `<button>` elements in `src/components/` with the imported `Button` component from `@/components/ui/button`. Replace raw `<input>` and `<label>` elements in any form components with the shadcn `Input` and `Label` components. Keep all existing Tailwind classes and Framer Motion animations intact — only swap the underlying element, not the visual design.

---

## Step 3 — Replace the contact form modal with a shadcn Dialog

**Prompt:**
> Find any modal or overlay components in `src/components/` used for the contact form or sign-in form. Replace the custom modal implementation with the shadcn `Dialog`, `DialogContent`, `DialogHeader`, and `DialogTitle` components from `@/components/ui/dialog`. Preserve all existing form logic, React Hook Form registration, Zod validation, and API calls. Only replace the wrapper/overlay structure.

---

## Step 4 — Set up Cloudinary for image hosting

**Prompt:**
> Add Cloudinary image support to the frontend. Create an environment variable `VITE_CLOUDINARY_CLOUD_NAME` in the Replit environment secrets. Create a utility file at `src/lib/cloudinary.ts` that exports a `getImageUrl(publicId: string, options?: { width?: number; height?: number; quality?: string })` function which builds a Cloudinary CDN URL using the cloud name from `import.meta.env.VITE_CLOUDINARY_CLOUD_NAME`. The URL format should be: `https://res.cloudinary.com/{cloudName}/image/upload/{transformations}/{publicId}`. Transformations should default to `f_auto,q_auto` and append `w_{width}` and `h_{height}` if provided. Export this utility and document its usage with a JSDoc comment.

---

## Step 5 — Replace hardcoded images with Cloudinary URLs

**Prompt:**
> Search `src/` for any hardcoded image `src` attributes or imported local image files (`.png`, `.jpg`, `.webp`). For each image found, upload the original file to Cloudinary and note the public ID. Then replace the hardcoded `src` with a call to `getImageUrl(publicId, { width: X, quality: 'auto' })` from `src/lib/cloudinary.ts`. Wrap each image in a `<picture>` element where appropriate to serve modern formats. Keep all existing `alt` text and Tailwind sizing classes unchanged.

---

## Step 6 — Enable Firestore Offline Persistence

**Prompt:**
> Open the Firebase client SDK initialization file in the frontend (`src/config/firebase.ts` or wherever `initializeApp` is called). After initializing Firestore with `getFirestore(app)`, enable offline persistence by calling `enableIndexedDbPersistence(db)` from `firebase/firestore` and wrapping it in a try/catch that logs a warning if persistence is unavailable (e.g., multiple tabs open or private browsing). Import `enableIndexedDbPersistence` from `'firebase/firestore'`. Confirm the app still loads and Firestore queries still resolve correctly after this change.

---

## Step 7 — Update Tailwind config to include shadcn/ui paths

**Prompt:**
> Open `frontend/tailwind.config.js`. Add `'./src/components/ui/**/*.{ts,tsx}'` to the `content` array if it is not already covered by a wildcard. Add the shadcn/ui CSS variable color tokens to the `theme.extend.colors` section by following the color variable names defined in the generated `src/index.css` (e.g., `--background`, `--foreground`, `--primary`, etc.) and mapping them using `hsl(var(--name))` syntax. Confirm that existing gold and dark brand colors are preserved and not overwritten.

---

## Step 8 — Final verification

**Prompt:**
> Restart both the `Auth API` and `Start application` workflows. Open the app in the browser and verify: (1) the homepage loads with no console errors, (2) the contact form opens and submits successfully, (3) all images load from Cloudinary CDN URLs, (4) shadcn components render with the correct style, (5) the sign-in and sign-up flows work end to end, (6) the admin panel loads correctly for an admin user. Fix any TypeScript errors reported by `tsc --noEmit` inside the `frontend/` directory before marking the migration complete.
