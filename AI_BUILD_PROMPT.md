# AI Build Prompt — Proximity Credit Repair Website
### Sequential Step-by-Step Workflow for Replit AI Coding Agent
**PRD Version:** 3.0 — Maximum Impact + Scalable Architecture Edition  
**Target Stack:** React 18 + Vite + Tailwind CSS v3 + Framer Motion + React Router v6 + Zustand + React Hook Form + Zod + TanStack Query  
**Deployment Target:** Replit (Live Production)

> **How to use this file:** Work through each phase in strict order. Copy each prompt block exactly as written and paste it into the Replit AI Coding Agent. Complete the review-and-fix prompt at the end of each phase before advancing to the next.

---

## Phase 1 — Project Setup & Architecture

### 1.1 — Initialize Project & Install All Dependencies

```
You are building the Proximity Credit Repair Website from scratch. This is a React 18 + Vite SPA deployed on Replit.

Initialize the project with the following exact steps:

1. Scaffold a new Vite project configured for React 18 with TypeScript directly in the current working directory using:
   `npm create vite@latest . -- --template react-ts`
   (Use `.` as the project name so files are created in the current directory, not a subdirectory.)

2. Install all of the following production dependencies in a single command:
   - react-router-dom@6
   - framer-motion
   - zustand
   - react-hook-form
   - @hookform/resolvers
   - zod
   - @tanstack/react-query
   - lucide-react
   - react-countup
   - react-intersection-observer
   - clsx

3. Install all of the following development dependencies in a single command:
   - tailwindcss@3
   - postcss
   - autoprefixer
   - @types/react
   - @types/react-dom
   - eslint
   - eslint-plugin-react
   - eslint-plugin-react-hooks
   - prettier
   - vite-bundle-visualizer

4. Initialize Tailwind CSS by running: `npx tailwindcss init -p`

5. Create an `.eslintrc.json` file at the project root with React + hooks rules enabled and no-unused-vars as a warning.

6. Create a `.prettierrc` file at the project root with: printWidth 100, singleQuote true, semi false, tabWidth 2, trailingComma "es5".

7. Update `vite.config.ts` to set `server.host` to `'0.0.0.0'` and `server.port` to `5000` so the app is accessible inside Replit's preview pane. Also set `preview.host` to `'0.0.0.0'` and `preview.port` to `5000`.

8. Confirm the dev server starts without errors by running `npm run dev`.

Do not build any UI yet. Only complete the setup steps above.
```

### 1.2 — Create Full Scalable Folder Structure

```
Inside the Proximity Credit Repair project (`src/`), create the following complete folder structure exactly as specified by the PRD. Create placeholder `index.ts` or `.gitkeep` files where needed so the folders are tracked.

src/
├── assets/
├── components/
│   ├── ui/
│   ├── layout/
│   └── sections/
├── pages/
├── hooks/
├── store/
├── services/
├── data/
├── lib/
├── types/
├── config/
└── styles/

Also create the following files at the root of the project (not inside src/):
- `.env.development`
- `.env.staging`
- `.env.production`

Each env file must contain exactly these four variables with empty values:
VITE_SITE_URL=
VITE_CONTACT_API_URL=
VITE_ANALYTICS_ID=
VITE_GOOGLE_MAPS_KEY=

Do not add any component code or content yet. Only create the folder structure and env files.
```

### 1.3 — Configure TypeScript Path Aliases

```
In the Proximity Credit Repair project, configure TypeScript path aliases so that imports are clean throughout the codebase.

1. Update `tsconfig.json` to add a `paths` mapping under `compilerOptions`:
   - `@/*` maps to `./src/*`
   - `@components/*` maps to `./src/components/*`
   - `@pages/*` maps to `./src/pages/*`
   - `@data/*` maps to `./src/data/*`
   - `@store/*` maps to `./src/store/*`
   - `@services/*` maps to `./src/services/*`
   - `@hooks/*` maps to `./src/hooks/*`
   - `@lib/*` maps to `./src/lib/*`
   - `@types/*` maps to `./src/types/*`
   - `@config/*` maps to `./src/config/*`

2. Update `vite.config.ts` to mirror these same aliases using the `resolve.alias` option. Because Vite uses ES modules, `__dirname` is not available. Use this pattern instead:

   ```ts
   import { fileURLToPath, URL } from 'node:url'

   export default defineConfig({
     resolve: {
       alias: {
         '@': fileURLToPath(new URL('./src', import.meta.url)),
         '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
         '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
         '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
         '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
         '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
         '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
         '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
         '@config': fileURLToPath(new URL('./src/config', import.meta.url)),
       }
     }
   })
   ```

3. Run `npx tsc --noEmit` and confirm there are no TypeScript errors after making these changes.
```

### 1.4 — Phase 1 Review & Fix

```
Review Phase 1 (Project Setup & Architecture) for the Proximity Credit Repair project:

1. Confirm all dependencies listed in the PRD are installed and present in `package.json`:
   - Production: react@18, react-dom@18, react-router-dom@6, framer-motion, zustand, react-hook-form, @hookform/resolvers, zod, @tanstack/react-query, lucide-react, react-countup, react-intersection-observer, clsx
   - Dev: tailwindcss@3, postcss, autoprefixer, vite-bundle-visualizer

2. Confirm the full folder structure under `src/` exists: assets, components/ui, components/layout, components/sections, pages, hooks, store, services, data, lib, types, config, styles

3. Confirm `.env.development`, `.env.staging`, `.env.production` each contain all four VITE_ variables with empty values

4. Confirm `vite.config.ts` uses `fileURLToPath(new URL(...))` for aliases (NOT `__dirname`) and that `server.port` is set to `5000`

5. Confirm TypeScript path aliases `@/*` and all sub-aliases compile correctly with `npx tsc --noEmit`

6. Confirm `.eslintrc.json` and `.prettierrc` exist and are correctly formatted

7. Run `npm run dev` and confirm the app is accessible on port 5000 with zero terminal errors

Fix any issues found before proceeding.
```

---

## Phase 2 — Design System & Tailwind Configuration

### 2.1 — Configure Tailwind with Full Brand Token System

```
In the Proximity Credit Repair project, configure `tailwind.config.js` with the complete brand design system. Every color, font, gradient, and spacing value comes from the PRD and must be defined here — never hardcoded inline in components.

Set the `content` array to: `["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]`

Under `theme.extend`, add:

COLORS (all under `colors`):
- `gold.primary`: `#B8924A`
- `gold.light`: `#D4AF72`
- `gold.dark`: `#8B6A2E`
- `offwhite`: `#F9F6F1`
- `near-black`: `#0A0A0A`
- `card-black`: `#141414`
- `body-text`: `#1A1A1A`
- `muted-text`: `#6B6B6B`

Note: Pure white (`#FFFFFF`) is already Tailwind's default `white` — do NOT redefine it. Use `bg-white` and `text-white` as normal.

FONT FAMILIES (under `fontFamily`):
- `heading`: `['Montserrat', 'sans-serif']`
- `body`: `['Open Sans', 'sans-serif']`

FONT SIZES (under `fontSize`) matching PRD typography scale:
- `hero`: `['80px', { lineHeight: '1.1', fontWeight: '800' }]`
- `h1`: `['64px', { lineHeight: '1.15', fontWeight: '800' }]`
- `h2`: `['48px', { lineHeight: '1.2', fontWeight: '700' }]`
- `h3`: `['32px', { lineHeight: '1.3', fontWeight: '600' }]`
- `subheading`: `['24px', { lineHeight: '1.4', fontWeight: '600' }]`
- `body-lg`: `['18px', { lineHeight: '1.7' }]`
- `body-base`: `['16px', { lineHeight: '1.7' }]`
- `caption`: `['14px', { lineHeight: '1.6' }]`
- `label`: `['13px', { lineHeight: '1.5' }]`

CONTAINER (under `container` — place this at the top-level `theme` key, NOT inside `theme.extend`):
- `center`: true
- `padding`: `'1.5rem'`
- `screens`: `{ '2xl': '1280px' }`

BORDER RADIUS (under `borderRadius`):
- `card`: `'16px'`
- `pill`: `'9999px'`

BACKGROUND GRADIENTS (under `backgroundImage`):
- `gold-gradient`: `'linear-gradient(135deg, #B8924A 0%, #D4AF72 50%, #8B6A2E 100%)'`
- `hero-gradient`: `'linear-gradient(160deg, #0A0A0A 0%, #1a1308 100%)'`
- `gold-glow`: `'radial-gradient(ellipse at center, rgba(184,146,74,0.15) 0%, transparent 70%)'`

BOX SHADOWS (under `boxShadow`):
- `gold-sm`: `'0 2px 12px rgba(184,146,74,0.2)'`
- `gold-md`: `'0 4px 24px rgba(184,146,74,0.35)'`
- `gold-lg`: `'0 8px 48px rgba(184,146,74,0.5)'`

After configuring, confirm the Tailwind config file has no syntax errors and the dev server restarts without issues.
```

### 2.2 — Global CSS & Google Fonts Setup

```
In the Proximity Credit Repair project, set up global styles.

1. In `index.html`, add Google Fonts import in the `<head>` for Montserrat (weights 400,600,700,800) and Open Sans (weights 400,600). Use the preconnect links for performance AND add `&display=swap` to the fonts URL to prevent layout shift (FOIT). Example:
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
   ```

2. Create `src/styles/globals.css` with:
   - `@tailwind base`, `@tailwind components`, `@tailwind utilities` directives
   - CSS custom properties under `:root` for the 8 custom brand color tokens (pure white uses Tailwind's default `white` and does NOT get a custom property):
     --color-gold-primary: #B8924A; --color-gold-light: #D4AF72; --color-gold-dark: #8B6A2E;
     --color-offwhite: #F9F6F1; --color-near-black: #0A0A0A; --color-card-black: #141414;
     --color-body-text: #1A1A1A; --color-muted-text: #6B6B6B;
   - A global `*` reset: `box-sizing: border-box`, `margin: 0`, `padding: 0`
   - `html`: `scroll-behavior: smooth`
   - `body`: font-family set to Open Sans, color set to var(--color-body-text), background white
   - A utility class `.gold-gradient-text` that applies the gold gradient as text fill:
     background: linear-gradient(135deg, #B8924A 0%, #D4AF72 50%, #8B6A2E 100%);
     -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
   - A utility class `.section-padding` that applies `padding-top: 96px; padding-bottom: 96px`
   - Global focus-visible: `*:focus-visible { outline: 2px solid #B8924A; outline-offset: 2px; }`

3. Import `src/styles/globals.css` in `src/main.tsx` (remove all default Vite CSS imports).

4. Update `src/main.tsx` to wrap the app in `React.StrictMode` and `QueryClientProvider` from TanStack Query with a `QueryClient` instance configured with: `staleTime: 5 * 60 * 1000`, `gcTime: 10 * 60 * 1000`, `retry: 1`, `refetchOnWindowFocus: false`.

Confirm no errors after these changes.
```

### 2.3 — Phase 2 Review & Fix

```
Review Phase 2 (Design System & Tailwind Configuration) for the Proximity Credit Repair project:

1. Open `tailwind.config.js` and verify:
   - All 8 custom color tokens are defined under `theme.extend.colors` (pure white is NOT redefined — it uses Tailwind's default)
   - The `offwhite`, `near-black`, `card-black`, `body-text`, `muted-text` tokens exist
   - The `gold.primary`, `gold.light`, `gold.dark` nested tokens exist
   - All three gradient names (`gold-gradient`, `hero-gradient`, `gold-glow`) exist under `backgroundImage`
   - Both font families (`heading: Montserrat`, `body: Open Sans`) exist under `fontFamily`
   - The `container` config is at the `theme` top level (not inside `theme.extend`) with `center: true` and `screens['2xl']: '1280px'`
   - All three box shadow variants (`gold-sm`, `gold-md`, `gold-lg`) are defined

2. Open `index.html` and confirm the Google Fonts `<link>` tags use `&display=swap` in the URL

3. Open `src/styles/globals.css` and confirm `.gold-gradient-text` and `.section-padding` utility classes exist

4. Open `src/main.tsx` and confirm it imports `globals.css`, wraps in `QueryClientProvider`, and the QueryClient has the correct configuration

5. Run `npm run dev` and confirm Tailwind utility classes resolve without errors in the browser console

Fix any issues before proceeding to Phase 3.
```

---

## Phase 3 — Reusable UI Component Library

### 3.1 — Global TypeScript Types

```
In the Proximity Credit Repair project, create `src/types/index.ts` with TypeScript interfaces for all data models used across the app.

Define and export the following interfaces:

- `Service`: id (string), title (string), description (string), shortDescription (string), icon (string), benefits (string[])
- `Testimonial`: id (string), clientName (string), city (string), beforeScore (number), afterScore (number), rating (number), text (string), featured (boolean)
- `FAQItem`: id (string), question (string), answer (string), category ('about-credit-repair' | 'working-with-proximity')
- `TeamMember`: id (string), name (string), title (string), bio (string), photoUrl (string)
- `NavLink`: label (string), href (string)
- `SiteMetadata`: siteTitle (string), siteDescription (string), siteUrl (string), ogImage (string), twitterHandle (string)
- `ToastItem`: id (string), message (string), type ('success' | 'error' | 'info'), duration (number)
- `ContactFormData`: fullName (string), email (string), phone (string), serviceOfInterest (string), message (string)
- `Stat`: label (string), value (number), suffix (string), prefix? (string), icon (string)
  Note: `prefix` is optional and used for currency symbols (e.g., '$' before '2M+')

Also create `src/types/component-props.ts` with shared prop interfaces:
- `BaseProps`: className? (string), children? (React.ReactNode)
- `ButtonProps extends BaseProps`: variant ('primary' | 'secondary' | 'ghost'), size ('sm' | 'md' | 'lg'), onClick? (() => void), disabled? (boolean), type? ('button' | 'submit' | 'reset'), href? (string)
- `CardProps extends BaseProps`: variant ('dark' | 'light'), hover? (boolean)

Do not create any components yet. Only the type files.
```

### 3.2 — Utility Functions

```
In the Proximity Credit Repair project, create the following utility files:

1. `src/lib/utils.ts`:
   - Import `clsx` (already installed as a dependency).
   - Export a `cn(...inputs: Parameters<typeof clsx>): string` function that calls `clsx(...inputs)`. This correctly merges class names including conditional classes.
   - Export a `formatPhone(phone: string): string` function that strips all non-digits, then formats as `(XXX) XXX-XXXX`. Return the original string if it doesn't have 10 digits.
   - Export a `truncate(text: string, length: number): string` function that returns text as-is if under length, otherwise returns `text.slice(0, length) + '...'`.

2. `src/lib/validators.ts`:
   - Import Zod. Export a Zod schema named `contactFormSchema` for the `ContactFormData` type:
     - fullName: required string, min 2 characters, max 100
     - email: required valid email address
     - phone: required string, min 10 characters, strip non-digits and validate 10 digits remain
     - serviceOfInterest: required enum of: 'Credit Analysis', 'Dispute Filing', 'Score Monitoring', 'Debt Validation', 'Not Sure'
     - message: required string, min 20 characters, max 1000

3. `src/lib/animations.ts`:
   - Import `Variants` type from framer-motion.
   - Export typed Framer Motion variant objects for reuse across all components:
     - `fadeUp: Variants`: hidden (opacity 0, y 30), visible (opacity 1, y 0) with transition duration 0.6 and ease "easeOut"
     - `fadeIn: Variants`: hidden (opacity 0), visible (opacity 1) with transition duration 0.5
     - `staggerContainer: Variants`: hidden (opacity 0), visible (opacity 1) with staggerChildren: 0.1 and delayChildren: 0.1
   - Also export a `prefersReducedMotion` boolean constant:
     `export const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches`
   - When `prefersReducedMotion` is true, all variant transitions should use duration: 0 (instant). Apply this check inside each variant's transition object.

These are pure utility files. No JSX. No components.
```

### 3.3 — Button Component

```
In the Proximity Credit Repair project, create `src/components/ui/Button.tsx`.

This is the single Button primitive used everywhere in the app. Build it to match the PRD exactly:

Props (from `ButtonProps` in `src/types/component-props.ts`):
- `variant`: 'primary' | 'secondary' | 'ghost' — defaults to 'primary'
- `size`: 'sm' | 'md' | 'lg' — defaults to 'md'
- `children`: React.ReactNode
- `className?`: string
- `onClick?`: () => void
- `disabled?`: boolean
- `type?`: 'button' | 'submit' | 'reset' — defaults to 'button'
- `href?`: string (if provided, render as `motion.a` instead of `motion.button`)

Variant styles (using Tailwind token names from tailwind.config.js — NEVER hardcoded hex values):
- `primary`: `bg-gold-gradient text-white rounded-pill font-heading font-bold` + `shadow-gold-md` on hover
- `secondary`: `bg-transparent border-2 border-gold-primary text-gold-primary rounded-pill` + on hover: `bg-gold-primary text-white`
- `ghost`: `bg-transparent text-gold-primary` + underline on hover

Size styles:
- `sm`: `px-5 py-2 text-sm`
- `md`: `px-7 py-3 text-base`
- `lg`: `px-9 py-4 text-lg`

Wrap in Framer Motion `motion.button` (or `motion.a` if href is provided).
Apply: `whileHover={{ scale: 1.03 }}` and `whileTap={{ scale: 0.97 }}`.
For the primary variant, add a CSS class `btn-glow-pulse` that applies a gold box-shadow keyframe animation on hover. Define this keyframe in `src/styles/globals.css`:
  @keyframes goldGlow { 0%, 100% { box-shadow: 0 0 12px rgba(184,146,74,0.4); } 50% { box-shadow: 0 0 28px rgba(184,146,74,0.8); } }
  .btn-glow-pulse:hover { animation: goldGlow 1.5s ease-in-out infinite; }

Include `aria-disabled={disabled}` when disabled is true, and `disabled` attribute on the button element.
Add transition classes for smooth color/background changes: `transition-all duration-200`.

Export as default. Do not create any other components in this file.
```

### 3.4 — Card Component

```
In the Proximity Credit Repair project, create `src/components/ui/Card.tsx`.

This is the Card primitive used for service cards, testimonial cards, team cards, and value cards throughout the site.

Props (from `CardProps` in `src/types/component-props.ts`):
- `variant`: 'dark' | 'light' — defaults to 'dark'
- `hover?`: boolean — enables lift animation on hover
- `children`: React.ReactNode
- `className?`: string

Variant styles (Tailwind token names only — no hardcoded hex):
- `dark`: `bg-card-black border-t-2 border-gold-primary backdrop-blur-sm text-white rounded-card shadow-gold-sm`
- `light`: `bg-white border border-gray-100 text-body-text rounded-card shadow-sm`

Both variants use `rounded-card` (16px) and `p-6`.

When `hover` is true, wrap in `motion.div` with:
  `whileHover={{ y: -6, boxShadow: '0 4px 24px rgba(184,146,74,0.35)' }}`
  `transition={{ duration: 0.3, ease: 'easeOut' }}`

Use scroll-triggered entrance animation:
- Import `useInView` from `react-intersection-observer`
- Use the `fadeUp` variant from `src/lib/animations.ts`
- Wrap in `motion.div` with `variants={fadeUp}` and `initial="hidden"` and `animate={inView ? "visible" : "hidden"}`
- Set `triggerOnce: true` in `useInView`

Export as default.
```

### 3.5 — Badge Component

```
In the Proximity Credit Repair project, create `src/components/ui/Badge.tsx`.

Used for credit score before/after badges, category labels, and status chips.

Props:
- `variant`: 'gold' | 'success' | 'neutral' — defaults to 'gold'
- `size`: 'sm' | 'md' — defaults to 'md'
- `children`: React.ReactNode
- `className?`: string

Styles (Tailwind token names only):
- `gold`: `bg-gold-primary text-white rounded-pill font-heading font-bold`
- `success`: `bg-green-500 text-white rounded-pill font-bold`
- `neutral`: `bg-gray-100 text-muted-text rounded-pill`

Size:
- `sm`: `px-3 py-1 text-label`
- `md`: `px-4 py-1.5 text-caption`

Export as default.
```

### 3.6 — Input & Textarea Components

```
In the Proximity Credit Repair project, create `src/components/ui/Input.tsx` and `src/components/ui/Textarea.tsx`.

Input.tsx props:
- `label`: string
- `name`: string
- `type?`: string (defaults to 'text')
- `placeholder?`: string
- `error?`: string
- `register`: ReturnType<UseFormRegister<any>>
- `required?`: boolean
- `className?`: string

Styling (Tailwind token names only):
- Label: `font-body text-caption text-body-text font-semibold mb-1 block`
- Input field: `w-full border rounded-lg px-4 py-3 text-body-base font-body transition-colors duration-200`
  - No error: `border-gray-200 focus:border-gold-primary focus:ring-2 focus:ring-gold-primary/20 focus:outline-none`
  - With error: `border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20 focus:outline-none`
- Error message below field: `text-label text-red-400 mt-1`

Textarea.tsx: same props as Input but renders `<textarea>` with an additional `rows?` prop defaulting to 5.

Both components must use `React.forwardRef` for compatibility with react-hook-form.
Both must spread `...register` onto the input/textarea element.

Export each as default from their respective files.
```

### 3.7 — Select Component

```
In the Proximity Credit Repair project, create `src/components/ui/Select.tsx`.

Props:
- `label`: string
- `name`: string
- `options`: Array<{ value: string; label: string }>
- `error?`: string
- `register`: ReturnType<UseFormRegister<any>>
- `required?`: boolean
- `className?`: string
- `placeholder?`: string (text for the disabled first option, defaults to 'Select an option')

Render a native `<select>` element. The first `<option>` is disabled with an empty value and shows the placeholder text. The remaining options are rendered from the `options` array.

Style identically to the Input component: same border, padding, focus ring with gold, error state with red border.
Use `React.forwardRef` and spread `...register` onto the select element.

Export as default.
```

### 3.8 — Modal Component

```
In the Proximity Credit Repair project, create `src/components/ui/Modal.tsx`.

Props:
- `isOpen`: boolean
- `onClose`: () => void
- `title?`: string
- `children`: React.ReactNode
- `className?`: string

Implementation:
- Use Framer Motion `AnimatePresence` to animate in and out
- Backdrop: `fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center` — clicking backdrop calls `onClose`
- Modal panel: `bg-card-black rounded-card border border-gold-primary/20 max-w-lg w-full p-8 relative`
- Entrance animation: `initial={{ opacity: 0, scale: 0.95 }}` → `animate={{ opacity: 1, scale: 1 }}` → `exit={{ opacity: 0, scale: 0.95 }}`
- Close button: top-right `X` icon from lucide-react, calls `onClose`
- Add `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` pointing to the title element id
- Stop click propagation on the modal panel so clicking inside does not close it

Export as default.
```

### 3.9 — Toast Notification System

```
In the Proximity Credit Repair project, create `src/components/ui/Toast.tsx` and `src/components/ui/ToastContainer.tsx`.

Toast.tsx:
- Props: `item` (ToastItem from `src/types/index.ts`), `onDismiss` (() => void)
- Variants with left border + icon from lucide-react:
  - 'success': `border-l-4 border-green-500` + `CheckCircle` icon in green
  - 'error': `border-l-4 border-red-500` + `XCircle` icon in red
  - 'info': `border-l-4 border-gold-primary` + `Info` icon in gold
- Background: `bg-card-black text-white rounded-lg shadow-gold-sm p-4 flex items-start gap-3`
- Auto-dismiss after `item.duration` milliseconds using `useEffect` → calls `onDismiss`
- Framer Motion: `initial={{ x: 100, opacity: 0 }}` → `animate={{ x: 0, opacity: 1 }}` → `exit={{ x: 100, opacity: 0 }}`

ToastContainer.tsx:
- `fixed bottom-6 right-6 z-50 flex flex-col gap-3`
- Uses Framer Motion `AnimatePresence` to animate toasts in and out
- For now, manage toast state locally using `useState` — it will be connected to `useUIStore` in Phase 6
- Export a `useToast()` hook from this file that returns `{ addToast, removeToast, toasts }` so components can trigger toasts before the store is set up

Export both as defaults.
```

### 3.10 — Loading Screen, Back-to-Top Button, Section Utilities

```
In the Proximity Credit Repair project, create the following components:

1. `src/components/ui/LoadingScreen.tsx`:
   - Full-screen centered layout: `bg-near-black min-h-screen flex flex-col items-center justify-center gap-6`
   - Logo: "Proximity" in Montserrat ExtraBold with `.gold-gradient-text` class, "Credit Repair" below in Open Sans white text
   - Framer Motion animation: `initial={{ opacity: 0, scale: 0.9 }}` → `animate={{ opacity: 1, scale: 1 }}` with duration 0.5
   - Three animated loading dots below: `w-2 h-2 rounded-full bg-gold-primary` with staggered `y: [0, -8, 0]` infinite bounce (0.2s delay between each)
   - Export as default

2. `src/components/ui/BackToTopButton.tsx`:
   - `fixed bottom-6 right-6 z-40`
   - A gold circle button (`w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center`) with `ChevronUp` icon from lucide-react
   - Uses the `useScrollPosition` hook (import from `@hooks`) — only renders when `scrollY > 400`
   - Clicking calls `window.scrollTo({ top: 0, behavior: 'smooth' })`
   - Framer Motion `AnimatePresence`: `initial={{ opacity: 0, scale: 0.8 }}` → `animate={{ opacity: 1, scale: 1 }}` → `exit={{ opacity: 0, scale: 0.8 }}`
   - `whileHover={{ scale: 1.1 }}` and `whileTap={{ scale: 0.9 }}`
   - `aria-label="Back to top"`
   - Export as default
   - Note: `useScrollPosition` will be created in Phase 4.6 — add a temporary inline hook for now that reads `window.scrollY`

3. `src/components/ui/SectionDivider.tsx`:
   - Renders `<div className="h-px w-full bg-gold-gradient" />`
   - Props: `className?` (string)
   - Export as default

4. `src/components/ui/SectionLabel.tsx`:
   - Renders the small uppercase gold text above section headings (e.g., "OUR SERVICES")
   - Props: `children` (React.ReactNode), `className?` (string)
   - Style: `font-heading font-semibold text-label tracking-widest uppercase text-gold-primary mb-3 block`
   - Export as default

5. Create `src/components/ui/index.ts` that re-exports all UI components as named exports:
   Button, Card, Badge, Input, Textarea, Select, Modal, Toast, ToastContainer, LoadingScreen, BackToTopButton, SectionDivider, SectionLabel
```

### 3.11 — Phase 3 Review & Fix

```
Review Phase 3 (Reusable UI Component Library) for the Proximity Credit Repair project:

1. Confirm these files exist with correct exports:
   - src/types/index.ts — 9 interfaces including Stat with optional `prefix?` field
   - src/types/component-props.ts — BaseProps, ButtonProps, CardProps
   - src/lib/utils.ts — cn() using clsx, formatPhone(), truncate()
   - src/lib/validators.ts — contactFormSchema with all 5 fields and validation rules
   - src/lib/animations.ts — fadeUp, fadeIn, staggerContainer (all typed as Variants), prefersReducedMotion constant
   - src/components/ui/Button.tsx — 3 variants, 3 sizes, Framer Motion effects, btn-glow-pulse CSS class
   - src/components/ui/Card.tsx — dark + light variants, hover lift, scroll-triggered fadeUp
   - src/components/ui/Badge.tsx — 3 variants, 2 sizes
   - src/components/ui/Input.tsx — with error state styling, forwardRef, react-hook-form compatible
   - src/components/ui/Textarea.tsx — with error state, rows prop, forwardRef
   - src/components/ui/Select.tsx — with options prop, placeholder option, error state, forwardRef
   - src/components/ui/Modal.tsx — animated with AnimatePresence, accessible ARIA attributes
   - src/components/ui/Toast.tsx — 3 variants, auto-dismiss, slide animation
   - src/components/ui/ToastContainer.tsx — AnimatePresence, local useToast hook
   - src/components/ui/LoadingScreen.tsx — branded, animated logo + bouncing dots
   - src/components/ui/BackToTopButton.tsx — appears after 400px, gold circle, scroll-to-top
   - src/components/ui/SectionDivider.tsx and SectionLabel.tsx
   - src/components/ui/index.ts — all 13 components re-exported

2. Confirm zero hardcoded hex color values in any component file — all colors use Tailwind token class names

3. Confirm Framer Motion is imported and used correctly in Button, Card, Modal, and Toast

4. Confirm React.forwardRef is applied to Input, Textarea, and Select

5. Run `npx tsc --noEmit` and fix all TypeScript errors

Fix all issues before proceeding.
```

---

## Phase 4 — Layout & Navigation Components

### 4.1 — SEO Head Component

```
In the Proximity Credit Repair project, create `src/components/layout/SEOHead.tsx`.

This component manages all document head metadata for every page.

Props:
- `title`: string — page-specific title
- `description`: string
- `ogImage?`: string — defaults to '/og-image.jpg'
- `canonicalPath?`: string — path appended to VITE_SITE_URL for canonical URL
- `schemaMarkup?`: Record<string, unknown> — JSON-LD schema object to inject as a script tag

Implementation using `useEffect`:
- Set `document.title` to `${title} | Proximity Credit Repair`
- Dynamically set or update these meta tags in `document.head` (use querySelector to avoid duplicates):
  - `<meta name="description" content={description} />`
  - `<meta property="og:title" content={`${title} | Proximity Credit Repair`} />`
  - `<meta property="og:description" content={description} />`
  - `<meta property="og:image" content={ogImage} />`
  - `<meta property="og:url" content={`${import.meta.env.VITE_SITE_URL || ''}${canonicalPath || ''}`} />`
  - `<meta name="twitter:card" content="summary_large_image" />`
  - `<meta name="twitter:title" content={`${title} | Proximity Credit Repair`} />`
  - `<meta name="twitter:description" content={description} />`
  - `<link rel="canonical" href={`${import.meta.env.VITE_SITE_URL || ''}${canonicalPath || ''}`} />`
- If `schemaMarkup` is provided, inject a `<script type="application/ld+json">` tag with `JSON.stringify(schemaMarkup)`
- Return a cleanup function that removes all injected elements to prevent duplicates on route change

This component renders no visible UI — it returns `null`.

Export as default.
```

### 4.2 — Navbar Component

```
In the Proximity Credit Repair project, create `src/components/layout/Navbar.tsx`.

Structure:
- Left: Logo — "Proximity" in Montserrat ExtraBold with `.gold-gradient-text` class, "Credit Repair" below in smaller Open Sans white text. Wrap in a `Link to="/"` from react-router-dom.
- Center (desktop only): Nav links — import from `src/config/navigation.ts` (create a placeholder file that exports `navLinks: NavLink[]` with all 7 routes if it doesn't exist yet)
- Right (desktop only): Primary `Button` component — "Get Free Consultation" linking to `/contact`
- Right (mobile only): Hamburger icon — `Menu` or `X` icon from lucide-react based on drawer state

Scroll behavior:
- Import `useScrollPosition` from `@hooks` (placeholder: use local `useState` + `useEffect` on `window.scroll` until Phase 4.6)
- When `scrollY > 50`: apply `backdrop-blur-md bg-near-black/80 border-b border-gold-primary/10`
- When at top: fully transparent background
- Always: `fixed top-0 left-0 right-0 z-50 transition-all duration-300`

Active nav link:
- Use `useLocation()` from react-router-dom
- Active link: `text-gold-primary` + a 2px gold underline below
- Inactive link: `text-white/80 hover:text-white transition-colors duration-200`

Mobile drawer:
- Full-height slide-in from the right (`fixed inset-y-0 right-0 w-64 bg-near-black`)
- Framer Motion `AnimatePresence`: `initial={{ x: '100%' }}` → `animate={{ x: 0 }}` → `exit={{ x: '100%' }}`
- Stacked nav links vertically, CTA button at bottom
- Close on nav link click and on X button click
- State managed locally with `useState` — will be connected to `useUIStore` in Phase 6

Accessibility:
- `<nav role="navigation" aria-label="Main navigation">`
- Hamburger button: `aria-label="Open navigation menu"` / `aria-label="Close navigation menu"` toggling on state
- `aria-expanded={drawerOpen}` on hamburger button

Export as default.
```

### 4.3 — Footer Component

```
In the Proximity Credit Repair project, create `src/components/layout/Footer.tsx`.

PRD specification: 4-column grid on desktop, 2-column on tablet, 1-column on mobile. Full `bg-near-black` background, `text-white`.

Column 1 — Logo + Tagline:
- Logo: same treatment as Navbar (Proximity in gold gradient, Credit Repair below)
- Tagline: "Rebuilding credit. Rebuilding lives." in `text-muted-text font-body text-caption`
- Social icon row below: Facebook, Instagram, Twitter, LinkedIn — use lucide-react icons
  - Wrap each in `motion.a` with `whileHover={{ scale: 1.15 }}` and `text-gold-primary` on hover via `transition-colors duration-200`
  - `aria-label="Follow us on [Platform]"` on each link

Column 2 — Quick Links:
- Heading: "Quick Links" in `text-gold-primary font-heading font-bold mb-4`
- Use `navLinks` from `src/config/navigation.ts` — render as `Link` components from react-router-dom

Column 3 — Services:
- Heading: "Our Services" in gold
- Use `footerServiceLinks` from `src/config/navigation.ts`

Column 4 — Contact Info:
- Heading: "Contact Us" in gold
- Phone `(800) 555-0192` with `Phone` icon
- Email `hello@proximitycreditrepair.com` with `Mail` icon
- Address `123 Financial Plaza, Suite 400, Atlanta, GA 30301` with `MapPin` icon
- All icons: `text-gold-primary w-4 h-4 mr-2 flex-shrink-0`

Bottom bar (full width, separated by `SectionDivider` above):
- `flex flex-col md:flex-row justify-between items-center gap-2 pt-6`
- Left: `© 2026 Proximity Credit Repair. All rights reserved.` in `text-muted-text text-caption`
- Right: Legal disclaimer in `text-muted-text text-label italic`:
  "Results may vary. We do not guarantee specific credit score improvements."

Export as default.
```

### 4.4 — PageWrapper, Section, and AppLayout Components

```
In the Proximity Credit Repair project, create the following layout components:

1. `src/components/layout/PageWrapper.tsx`:
   - Renders a `<main>` element with `id="main-content"` for skip-link accessibility
   - Props: `children`, `className?`, `dark?` (boolean)
   - `dark`: background `bg-near-black`, else `bg-white`
   - Applies `pt-20` top padding to account for the fixed Navbar height
   - Export as default

2. `src/components/layout/Section.tsx`:
   - Props: `children`, `className?`, `id?`, `dark?`, `alt?` (boolean for offwhite bg)
   - `dark`: `bg-near-black text-white`; `alt`: `bg-offwhite`; default: `bg-white`
   - Renders `<section>` with `.section-padding` class and the given `id`
   - Inner content wrapped in `<div className="container mx-auto">`
   - Export as default

3. `src/components/layout/AppLayout.tsx`:
   - Renders: `<Navbar />`, a skip-navigation link, `<Outlet />` from react-router-dom, `<Footer />`, `<ToastContainer />`, `<BackToTopButton />`
   - Skip navigation: `<a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg">Skip to main content</a>` — this is the very first element rendered
   - Also render a `<ScrollToTop />` component inside AppLayout: a component that calls `window.scrollTo(0, 0)` on every `useLocation().pathname` change using `useEffect`
   - Import all components from their respective files

4. Create `src/components/layout/index.ts` re-exporting: Navbar, Footer, PageWrapper, Section, AppLayout

Export AppLayout as default from its file.
```

### 4.5 — Router Setup

```
In the Proximity Credit Repair project, set up the complete React Router v6 routing in `src/App.tsx`.

Create `src/App.tsx`:
- Import `createBrowserRouter` and `RouterProvider` from react-router-dom
- Import `React.lazy`, `Suspense`, and `LoadingScreen` from components/ui
- Import `AppLayout` from components/layout

Define all 8 routes using lazy-loaded page components with `React.lazy()`:
- `/` → `pages/Home.tsx`
- `/about` → `pages/About.tsx`
- `/services` → `pages/Services.tsx`
- `/how-it-works` → `pages/HowItWorks.tsx`
- `/testimonials` → `pages/Testimonials.tsx`
- `/faq` → `pages/FAQ.tsx`
- `/contact` → `pages/Contact.tsx`
- `*` → `pages/NotFound.tsx`

All 8 routes (the 7 content pages + the `*` catch-all NotFound) are children of the `AppLayout` route (which renders the `<Outlet />`), so every page including the 404 page renders with the shared Navbar and Footer.

Wrap all lazy routes in a single `<Suspense fallback={<LoadingScreen />}>` in `AppLayout.tsx` wrapping the `<Outlet />`.

Create placeholder files for all 7 content pages (Home, About, Services, HowItWorks, Testimonials, FAQ, Contact) that export a minimal div with the page name — these are built in Phase 7.

Create `src/pages/NotFound.tsx` fully now:
- Full `bg-near-black min-h-screen flex flex-col items-center justify-center text-center`
- Large "404" in `.gold-gradient-text font-heading font-black text-h1`
- Heading: "Page Not Found" in white
- Subtext: "The page you're looking for doesn't exist." in `text-muted-text`
- Primary `Button` component linking href="/" : "Back to Home"

Update `src/main.tsx` to render `<App />`.

Run `npm run dev` and confirm all routes load without errors.
```

### 4.6 — Custom Hooks

```
In the Proximity Credit Repair project, create the following custom hooks in `src/hooks/`:

1. `useScrollPosition.ts`:
   - Uses `useState` and `useEffect` to track `window.scrollY`
   - Adds a throttled scroll event listener (use `requestAnimationFrame` for throttling, not setTimeout)
   - Returns: `{ scrollY: number, isScrolled: boolean }` where `isScrolled` is true when `scrollY > 50`
   - Cleans up the event listener on unmount
   - After creating this hook, go back and update `Navbar.tsx` and `BackToTopButton.tsx` to import this hook from `@hooks` instead of using inline scroll logic

2. `useMediaQuery.ts`:
   - Takes a query string parameter (e.g., `'(max-width: 768px)'`)
   - Uses `window.matchMedia` with an event listener to reactively return a boolean
   - Handles SSR by checking `typeof window !== 'undefined'` before accessing `matchMedia`
   - Returns: `boolean` (whether the query matches)
   - Also export a convenience hook: `export function useIsMobile() { return useMediaQuery('(max-width: 768px)') }`

3. `useCountUp.ts`:
   - This hook wraps the `react-countup` package (already installed) — do NOT implement a custom counter from scratch.
   - Import `useCountUp as useCountUpLib` from `react-countup`
   - Import `useInView` from `react-intersection-observer`
   - Props: `end` (number), `duration?` (number, defaults to 2), `prefix?` (string), `suffix?` (string), `separator?` (string, defaults to ',')
   - Use `useInView` with `triggerOnce: true` to get a `ref` and `inView` boolean
   - Use `useCountUpLib` with `start: 0`, `end`, `duration`, `prefix`, `suffix`, `separator`, and `startOnMount: false`
   - When `inView` becomes true, call the `start()` function returned by `useCountUpLib`
   - Return: `{ formattedValue: string, ref }`
   - The `formattedValue` is the `countUp` formatted string from the library
   - The `ref` is passed to the element that triggers the counter on scroll

4. `src/hooks/index.ts` — re-export all three hooks: useScrollPosition, useMediaQuery, useIsMobile, useCountUp
```

### 4.7 — Phase 4 Review & Fix

```
Review Phase 4 (Layout & Navigation Components) for the Proximity Credit Repair project:

1. Open the app and confirm the Navbar renders with the Proximity logo in gold gradient text and all 7 nav links
2. Scroll down 100px — confirm the Navbar gains backdrop-blur + dark background
3. Resize to mobile width — confirm hamburger appears, nav links hide, and drawer slides in from right on click
4. Confirm the Footer has all 4 columns, the SectionDivider line, the social icons, and the legal disclaimer
5. Navigate to /not-found — confirm the 404 page renders with gold "404" and Back to Home button
6. Navigate between 2–3 pages — confirm the ScrollToTop component resets scroll position on each route change
7. Confirm the skip-to-content link appears on first Tab press and links to `#main-content`
8. Confirm the BackToTopButton appears after scrolling 400px and scrolls to top when clicked
9. Confirm the LoadingScreen shows briefly while lazy route chunks download (simulate on a slow network in DevTools)
10. Run `npx tsc --noEmit` — zero TypeScript errors

Fix all issues before proceeding.
```

---

## Phase 5 — Data & Content Layer

### 5.1 — Navigation Config

```
In the Proximity Credit Repair project, create `src/config/navigation.ts`.

Per the PRD folder structure, navigation config belongs in `src/config/`, not `src/data/`.

Export:
- `navLinks`: NavLink[] — 7 nav links matching the PRD URL structure exactly:
  { label: 'Home', href: '/' }
  { label: 'About', href: '/about' }
  { label: 'Services', href: '/services' }
  { label: 'How It Works', href: '/how-it-works' }
  { label: 'Testimonials', href: '/testimonials' }
  { label: 'FAQ', href: '/faq' }
  { label: 'Contact', href: '/contact' }

- `footerServiceLinks`: NavLink[] — 4 service links:
  { label: 'Credit Analysis', href: '/services#credit-analysis' }
  { label: 'Dispute Filing', href: '/services#dispute-filing' }
  { label: 'Score Monitoring', href: '/services#score-monitoring' }
  { label: 'Debt Validation', href: '/services#debt-validation' }

All NavLink types imported from `src/types/index.ts`.

After creating this file, update `Navbar.tsx` and `Footer.tsx` to import from `@config/navigation` instead of any placeholder import.
```

### 5.2 — Site Metadata & Theme Config

```
In the Proximity Credit Repair project, create the following config files:

1. `src/config/siteMetadata.ts`:
   Export a `siteMetadata` object typed as `SiteMetadata`:
   - siteTitle: 'Proximity Credit Repair'
   - siteDescription: 'Expert credit repair services that deliver real results. Join 10,000+ clients who have improved their credit scores with Proximity Credit Repair.'
   - siteUrl: `${import.meta.env.VITE_SITE_URL || 'https://proximitycreditrepair.replit.app'}`
   - ogImage: '/og-image.jpg'
   - twitterHandle: '@proximitycredit'

2. `src/config/theme.ts`:
   Export a `theme` object with all brand color hex values and gradient strings for any runtime JS usage (e.g., canvas, SVG, Framer Motion inline styles):
   - colors: { goldPrimary: '#B8924A', goldLight: '#D4AF72', goldDark: '#8B6A2E', offwhite: '#F9F6F1', nearBlack: '#0A0A0A', cardBlack: '#141414', bodyText: '#1A1A1A', mutedText: '#6B6B6B' }
   - gradients: { gold: 'linear-gradient(135deg, #B8924A 0%, #D4AF72 50%, #8B6A2E 100%)', hero: 'linear-gradient(160deg, #0A0A0A 0%, #1a1308 100%)', goldGlow: 'radial-gradient(ellipse at center, rgba(184,146,74,0.15) 0%, transparent 70%)' }

3. `src/config/index.ts`:
   Re-export: siteMetadata, theme, navLinks, footerServiceLinks
```

### 5.3 — Services Data

```
In the Proximity Credit Repair project, create `src/data/services.ts`.

Export a `services` array typed as `Service[]` with exactly 4 service objects matching the PRD:

1. Credit Analysis
   - id: 'credit-analysis'
   - icon: 'BarChart2'
   - title: 'Credit Analysis'
   - shortDescription: 'A thorough review of your full credit report to identify errors, negative items, and opportunities for improvement.'
   - description: 'Our certified specialists perform a comprehensive, three-bureau credit analysis to map every factor affecting your score. We identify every inaccuracy, outdated record, and negative item, then build a custom action plan tailored to your unique credit profile.'
   - benefits: ['Identify all negative items dragging your score down', 'Spot reporting errors and inaccuracies across all three bureaus', 'Receive a personalized, prioritized repair strategy', 'Understand exactly what is impacting your score and why', 'Get a clear baseline to measure your progress against']

2. Dispute Filing
   - id: 'dispute-filing'
   - icon: 'FileText'
   - title: 'Dispute Filing'
   - shortDescription: 'We draft and submit expert dispute letters to all three credit bureaus on your behalf.'
   - description: 'Our experienced dispute specialists craft legally precise challenge letters targeting inaccurate, unverifiable, or outdated items on your credit report. We manage the entire process — from drafting to follow-up — so you never have to navigate the bureaucracy alone.'
   - benefits: ['Expert dispute letters tailored to each bureau\'s requirements', 'Track the status of every open dispute in real time', 'Follow-up correspondence handled entirely on your behalf', 'Challenge collections, late payments, charge-offs, and more', 'Legally compliant with the Fair Credit Reporting Act (FCRA)']

3. Score Monitoring
   - id: 'score-monitoring'
   - icon: 'TrendingUp'
   - title: 'Score Monitoring'
   - shortDescription: 'Real-time alerts and monthly reports so you always know exactly where your credit stands.'
   - description: 'Stay fully informed with dedicated score monitoring that tracks changes across all three credit bureaus. Our monthly progress reports break down every improvement and flag any new negative items the moment they appear, so you are always one step ahead.'
   - benefits: ['Real-time alerts for any new negative items or inquiries', 'Monthly three-bureau score summary reports', 'Track score improvements as disputes are resolved', 'Identify potential fraud or identity theft early', 'Expert analysis of each change and what it means for you']

4. Debt Validation
   - id: 'debt-validation'
   - icon: 'Shield'
   - title: 'Debt Validation'
   - shortDescription: 'We demand proof that collectors have the legal right to collect — and challenge what they cannot verify.'
   - description: 'Under the Fair Debt Collection Practices Act, debt collectors are legally required to validate the debts they claim you owe. Our team sends certified validation requests to collectors and challenges any debt that cannot be properly verified, protecting your rights and your credit.'
   - benefits: ['Force collectors to prove the debt is legally valid and accurate', 'Remove unverifiable or statute-barred debts from your report', 'Protect your rights under the FDCPA', 'Challenge inflated balances and unauthorized fees', 'Negotiate removal of verified debts as part of payment agreements']

All copy matches the PRD tone: professional, empowering, results-driven, never salesy.
```

### 5.4 — Testimonials Data

```
In the Proximity Credit Repair project, create `src/data/testimonials.ts`.

Export a `testimonials` array typed as `Testimonial[]` with exactly 8 items. All content is clearly fictional and for demonstration purposes.

1. { id: 't1', clientName: 'Marcus', city: 'Atlanta, GA', beforeScore: 521, afterScore: 694, rating: 5, featured: true, text: 'Proximity completely transformed my financial situation. In just six months, my score jumped 173 points — I went from being denied for everything to qualifying for a mortgage at a great rate. Their team is transparent, dedicated, and truly expert.' }

2. { id: 't2', clientName: 'Jennifer', city: 'Houston, TX', beforeScore: 548, afterScore: 712, rating: 5, featured: false, text: 'I had been living with bad credit for years and had no idea where to start. Proximity handled every dispute with proven strategies I never could have navigated on my own. My score improved 164 points in under seven months.' }

3. { id: 't3', clientName: 'David', city: 'Chicago, IL', beforeScore: 580, afterScore: 730, rating: 5, featured: false, text: 'After a difficult period following medical debt collections, I was skeptical anything could help. Proximity\'s certified specialists removed every unverifiable item within five months. I am now approved for the auto loan I needed and my score is the best it has ever been.' }

4. { id: 't4', clientName: 'Aisha', city: 'Dallas, TX', beforeScore: 504, afterScore: 668, rating: 5, featured: true, text: 'The results-driven approach at Proximity is unlike anything I experienced with other services. They were transparent about every step, kept me informed throughout, and delivered a 164-point improvement in roughly eight months. I finally feel in control of my finances.' }

5. { id: 't5', clientName: 'Robert', city: 'Miami, FL', beforeScore: 612, afterScore: 749, rating: 5, featured: false, text: 'I came to Proximity with a credit score that was holding me back from starting my business. Their expert team identified disputes I never knew I could make and resolved them efficiently. My score went up 137 points and I secured my business loan.' }

6. { id: 't6', clientName: 'Latoya', city: 'Philadelphia, PA', beforeScore: 537, afterScore: 693, rating: 5, featured: false, text: 'Proximity is the most trusted credit repair service I have worked with. Every promise they made was kept. Within six months, 156 points of improvement had opened doors I thought were permanently closed to me.' }

7. { id: 't7', clientName: 'Carlos', city: 'Phoenix, AZ', beforeScore: 560, afterScore: 714, rating: 5, featured: false, text: 'From the free consultation to the final result, Proximity was professional and dedicated at every stage. My score improved 154 points in nine months. Their dedicated team genuinely cares about your outcome.' }

8. { id: 't8', clientName: 'Nicole', city: 'Seattle, WA', beforeScore: 591, afterScore: 744, rating: 5, featured: false, text: 'After years of damaged credit following a divorce, Proximity gave me a fresh start. Their certified process removed collections, late payments, and inaccuracies I did not know existed. A 153-point improvement in seven months changed my life.' }
```

### 5.5 — FAQs Data

```
In the Proximity Credit Repair project, create `src/data/faqs.ts`.

Export a `faqs` array typed as `FAQItem[]` with exactly 10 items across 2 categories.

Category: 'about-credit-repair' (5 items):

1. { id: 'faq-1', category: 'about-credit-repair', question: 'What is credit repair and how does it work?', answer: 'Credit repair is the process of identifying and challenging inaccurate, outdated, or unverifiable negative items on your credit report. Under the Fair Credit Reporting Act (FCRA), you have the legal right to dispute any item a bureau cannot verify. A professional credit repair service manages this process on your behalf — from analysis to dispute letters to follow-up — maximizing results efficiently.' }

2. { id: 'faq-2', category: 'about-credit-repair', question: 'How long does it take to see results?', answer: 'Most clients begin seeing measurable improvements within 30 to 60 days of their first dispute cycle. Full results typically unfold over 3 to 6 months, depending on the number and complexity of negative items. Cases involving multiple collections, charge-offs, or bankruptcies may take 6 to 12 months for maximum improvement.' }

3. { id: 'faq-3', category: 'about-credit-repair', question: 'Can I repair my credit myself without a service?', answer: 'Yes — you have the legal right to dispute items directly with credit bureaus at no cost. However, professional services bring expertise in crafting effective dispute letters, understanding bureau processes, and managing multiple rounds of challenges simultaneously. Most clients find that professional assistance delivers faster and more comprehensive results.' }

4. { id: 'faq-4', category: 'about-credit-repair', question: 'Will credit repair hurt my credit score?', answer: 'No. The process of disputing inaccurate items does not negatively impact your credit score. In fact, successfully removing negative items almost always improves your score. The only actions that temporarily lower your score are new hard inquiries from credit applications, which are unrelated to the repair process itself.' }

5. { id: 'faq-5', category: 'about-credit-repair', question: 'What types of negative items can be removed?', answer: 'Items that can be challenged include late payments, collections, charge-offs, bankruptcies, foreclosures, repossessions, medical debt collections, identity theft entries, and duplicate accounts. Any item that is inaccurate, unverifiable, or reported beyond its legal time limit can be successfully disputed and removed.' }

Category: 'working-with-proximity' (5 items):

6. { id: 'faq-6', category: 'working-with-proximity', question: 'What makes Proximity Credit Repair different?', answer: 'Proximity combines certified expertise with a fully transparent, client-first process. You receive a dedicated specialist, real-time progress updates, and a customized strategy — not a generic template. Our track record of over 10,000 clients helped and a 95% success rate reflects our commitment to delivering real, results-driven outcomes.' }

7. { id: 'faq-7', category: 'working-with-proximity', question: 'How much does Proximity Credit Repair cost?', answer: 'We offer several service tiers tailored to different credit situations and budgets. All pricing is disclosed upfront during your free consultation — we are fully transparent with no hidden fees. Contact us today to receive a personalized quote based on your specific credit profile and goals.' }

8. { id: 'faq-8', category: 'working-with-proximity', question: 'What information do I need to get started?', answer: 'To begin, we will need your full legal name, address, date of birth, and Social Security Number to pull your three-bureau credit reports. You can also provide copies of your reports if you already have them. Your free consultation takes about 30 minutes and gives us everything we need to build your personalized action plan.' }

9. { id: 'faq-9', category: 'working-with-proximity', question: 'Is Proximity Credit Repair compliant with federal regulations?', answer: 'Absolutely. Proximity Credit Repair operates in full compliance with the Credit Repair Organizations Act (CROA), the Fair Credit Reporting Act (FCRA), and the Fair Debt Collection Practices Act (FDCPA). We never make promises we cannot legally keep, and all of our practices are transparent, ethical, and legally sound.' }

10. { id: 'faq-10', category: 'working-with-proximity', question: 'What happens if a dispute is not successful?', answer: 'Not all items are successfully removed in the first round. When a bureau verifies an item, we analyze their response, adjust our strategy, and submit a new challenge if grounds exist. We continue working on your behalf throughout the length of your service agreement, and we are transparent with you about the realistic outcomes for every item on your report.' }
```

### 5.6 — Team & Stats Data

```
In the Proximity Credit Repair project, create the following data files:

1. `src/data/team.ts`:
   Export `teamMembers`: TeamMember[] with 4 members (all fictional):
   - { id: 'tm1', name: 'Marcus Williams', title: 'CEO & Founder', photoUrl: '/assets/team/placeholder.jpg', bio: 'With 12 years in consumer finance and credit advocacy, Marcus founded Proximity with one mission: make expert credit repair accessible to everyone. His proven leadership has helped over 10,000 clients reclaim their financial freedom.' }
   - { id: 'tm2', name: 'Jennifer Rodriguez', title: 'Chief Credit Strategist', photoUrl: '/assets/team/placeholder.jpg', bio: 'A FICO-certified credit expert with 9 years of experience, Jennifer architects every client\'s personalized repair strategy. Her deep knowledge of bureau processes and dispute law drives our industry-leading 95% success rate.' }
   - { id: 'tm3', name: 'David Chen', title: 'Lead Dispute Specialist', photoUrl: '/assets/team/placeholder.jpg', bio: 'A former credit bureau analyst, David brings rare insider expertise to every dispute he crafts. His understanding of bureau verification processes enables Proximity to challenge items with exceptional precision and effectiveness.' }
   - { id: 'tm4', name: 'Aisha Thompson', title: 'Client Success Manager', photoUrl: '/assets/team/placeholder.jpg', bio: 'Aisha ensures every Proximity client feels supported, informed, and empowered throughout their entire journey. Her dedicated approach to client communication is the reason our satisfaction scores remain consistently excellent.' }

2. `src/data/stats.ts`:
   Export `stats`: Stat[] with exactly 3 items matching the PRD Trust Bar:
   - { label: 'Clients Helped', value: 10000, suffix: '+', prefix: undefined, icon: 'Users' }
   - { label: 'Success Rate', value: 95, suffix: '%', prefix: undefined, icon: 'TrendingUp' }
   - { label: 'in Debt Resolved', value: 2, suffix: 'M+', prefix: '$', icon: 'DollarSign' }
   
   IMPORTANT: The debt stat uses `value: 2` (not 2,000,000) with `prefix: '$'` and `suffix: 'M+'` so the counter displays as "$2M+" — counting to 2 million in 2 seconds would be a broken user experience.

3. `src/data/index.ts`:
   Re-export all data arrays: `services`, `testimonials`, `faqs`, `teamMembers`, `stats`
   (Navigation data comes from `src/config/navigation.ts`, not from data/)
```

### 5.7 — Phase 5 Review & Fix

```
Review Phase 5 (Data & Content Layer) for the Proximity Credit Repair project:

1. Confirm all data files exist with correctly typed exports:
   - src/config/navigation.ts — navLinks (7 items), footerServiceLinks (4 items)
   - src/config/siteMetadata.ts — siteMetadata object with all 5 required fields
   - src/config/theme.ts — colors object (8 tokens) and gradients object (3 tokens)
   - src/config/index.ts — re-exports siteMetadata, theme, navLinks, footerServiceLinks
   - src/data/services.ts — 4 services, each with id, icon, title, shortDescription, description, benefits[]
   - src/data/testimonials.ts — 8 items, 2 of which have featured: true
   - src/data/faqs.ts — 10 items, 5 per category
   - src/data/team.ts — 4 members
   - src/data/stats.ts — 3 items; debt stat has value: 2, prefix: '$', suffix: 'M+'
   - src/data/index.ts — re-exports all 5 data arrays

2. Confirm the Stat interface in `src/types/index.ts` includes the optional `prefix?` field

3. Confirm Navbar.tsx and Footer.tsx import navLinks from `@config/navigation` (not a placeholder)

4. Run `npx tsc --noEmit` — all data files must be type-safe with zero errors

5. Confirm no data file contains any JSX or React component code — pure TypeScript data only

Fix all issues before proceeding.
```

---

## Phase 6 — State Management

### 6.1 — UI Store (Zustand)

```
In the Proximity Credit Repair project, create `src/store/uiStore.ts`.

Use Zustand to create the global UI state store as defined in the PRD.

Define a TypeScript interface `UIStore` at the top of the file (import `ToastItem` from `src/types/index.ts`):

State and actions:
- `mobileMenuOpen`: boolean (default: false)
  - `openMobileMenu()`: sets to true
  - `closeMobileMenu()`: sets to false
  - `toggleMobileMenu()`: toggles the boolean
- `scrollY`: number (default: 0)
  - `setScrollY(y: number)`: sets scrollY
- `activeNavItem`: string (default: '/')
  - `setActiveNavItem(href: string)`: sets active item
- `toastQueue`: ToastItem[] (default: [])
  - `addToast(toast: Omit<ToastItem, 'id'>)`: generates id using `crypto.randomUUID()`, pushes to queue
  - `removeToast(id: string)`: filters out toast by id

Export the store as `useUIStore` using Zustand's `create` function.

After creating the store, update these files to connect to it:
1. `Navbar.tsx`: Replace local `drawerOpen` state with `useUIStore(state => state.mobileMenuOpen)`, `openMobileMenu`, `closeMobileMenu`, `toggleMobileMenu`
2. `ToastContainer.tsx`: Replace local `useToast` hook with `useUIStore(state => state.toastQueue)` and `useUIStore(state => state.removeToast)` — remove the local state and `useToast` hook entirely, or keep `useToast` as a thin wrapper over the store actions for backward compatibility
```

### 6.2 — Form Store (Zustand)

```
In the Proximity Credit Repair project, create `src/store/formStore.ts`.

Define a TypeScript interface `FormStore` and create a Zustand store managing contact form state.

State and actions:
- `submissionStatus`: 'idle' | 'loading' | 'success' | 'error' (default: 'idle')
  - `setSubmissionStatus(status: 'idle' | 'loading' | 'success' | 'error')`: sets the status
- `validationErrors`: Record<string, string> (default: {})
  - `setValidationErrors(errors: Record<string, string>)`: replaces the errors object
  - `clearValidationErrors()`: resets to {}
- `formData`: Partial<ContactFormData> (default: {})
  - `setFormData(data: Partial<ContactFormData>)`: merges new data into existing
  - `resetForm()`: resets formData to {}, submissionStatus to 'idle', validationErrors to {}

Import `ContactFormData` from `src/types/index.ts`.
Export as `useFormStore`.

Create `src/store/index.ts` re-exporting both `useUIStore` and `useFormStore`.
```

### 6.3 — Services Layer

```
In the Proximity Credit Repair project, create the API service layer:

1. `src/services/contactService.ts`:
   - Import `ContactFormData` from `src/types/index.ts`
   - Export: `async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; message: string }>`
   - Implementation:
     - If `import.meta.env.VITE_CONTACT_API_URL` is set: POST to that URL with JSON body
     - If not set (development): return a simulated response after a 1500ms delay — `{ success: true, message: 'Message received successfully.' }` (simulates the network call for dev/demo purposes)
     - Wrap in try/catch: on any error, return `{ success: false, message: 'Something went wrong. Please try again or call us directly.' }`

2. `src/services/analyticsService.ts`:
   - Export stub functions for future integration:
     - `trackPageView(page: string): void` — if `VITE_ANALYTICS_ID` is set, log `[Analytics] Page view: ${page}` to console
     - `trackEvent(event: string, properties?: Record<string, unknown>): void` — if `VITE_ANALYTICS_ID` is set, log `[Analytics] Event: ${event}` with properties

3. `src/services/index.ts`:
   Re-export: submitContactForm, trackPageView, trackEvent
```

### 6.4 — Phase 6 Review & Fix

```
Review Phase 6 (State Management) for the Proximity Credit Repair project:

1. Confirm `src/store/uiStore.ts` exports `useUIStore` with: mobileMenuOpen, scrollY, activeNavItem, toastQueue, and all their action functions
2. Confirm `src/store/formStore.ts` exports `useFormStore` with: submissionStatus, validationErrors, formData, and all their action functions
3. Confirm `src/store/index.ts` re-exports both stores
4. Open the app and click the hamburger menu — confirm it opens and closes correctly via `useUIStore`
5. Test the toast system by temporarily adding a button to any page that calls `useUIStore.getState().addToast({ message: 'Test toast', type: 'success', duration: 3000 })` — confirm a toast appears at the bottom-right and auto-dismisses after 3 seconds, then remove the test button
6. Confirm `Navbar.tsx` uses `useUIStore` for mobile menu state (no local useState for this)
7. Confirm `ToastContainer.tsx` reads from `useUIStore.toastQueue`
8. Confirm `contactService.ts` returns a simulated success after 1500ms when `VITE_CONTACT_API_URL` is empty
9. Run `npx tsc --noEmit` — zero TypeScript errors

Fix all issues before proceeding.
```

---

## Phase 7 — Page & Feature Development

### 7.1 — Home Page: Hero Section

```
In the Proximity Credit Repair project, build the Hero section. Create `src/components/sections/HeroSection.tsx`.

This is the most important section — it must be visually stunning. Requirements from PRD:

Layout:
- Full viewport height (`min-h-screen`), `bg-hero-gradient`, `relative overflow-hidden flex flex-col items-center justify-center text-center px-4`

Gold radial glow:
- An absolutely positioned div behind the headline: `absolute inset-0 bg-gold-glow pointer-events-none`

Animated floating gold particles:
- Render 14 absolutely-positioned small circles: `w-1.5 h-1.5 rounded-full bg-gold-primary/30`
- Each wrapped in `motion.div` with randomized `top` and `left` percentages (spread them across the viewport)
- Framer Motion: `animate={{ y: [0, -20, 0] }}` with `transition={{ repeat: Infinity, duration: between 3 and 6 (vary per particle), delay: varied, ease: 'easeInOut' }}`
- Use `Array.from({ length: 14 })` and seed positions with consistent values (not Math.random — use predefined position arrays to avoid hydration mismatch)

Headline — word-by-word animation:
- Split "Rebuild Your Credit. Reclaim Your Life." into individual words
- Render each word in its own `motion.span` with `variants={fadeUp}` and a stagger via parent `motion.div` with `variants={staggerContainer}` + `initial="hidden"` + `animate="visible"`
- Style: `font-heading font-black text-4xl md:text-6xl lg:text-h1 text-white leading-tight`

Subheadline:
- "Proven strategies. Transparent process. Real results."
- `font-body text-subheading text-muted-text mt-4`

Dual CTA buttons (side by side with gap-4 flex):
- Primary `Button` size="lg": "Get Your Free Consultation" → Link to `/contact`
- Secondary `Button` variant="secondary" size="lg": "See How It Works" → Link to `/how-it-works`

Scroll chevron:
- `ChevronDown` from lucide-react, centered at bottom absolute
- Framer Motion: `animate={{ y: [0, 8, 0] }}` with `transition={{ repeat: Infinity, duration: 1.5 }}`

Trust Bar (at the bottom of the hero, still in the dark section):
- A container: `mt-16 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 rounded-card border border-gold-primary/20 bg-card-black/60 backdrop-blur-sm p-6`
- Import `stats` from `src/data/stats.ts`
- For each stat, use `useCountUp` hook with `end={stat.value}`, `prefix={stat.prefix}`, `suffix={stat.suffix}`, `separator=","` (for 10,000)
- Pass the `ref` from `useCountUp` to the stat container element
- Display: icon (dynamically resolved from lucide-react by icon name string) above, formatted count value in large gold text, label below in muted caption

Import and use `SectionLabel`, `Button`, and `Section` from the component library.
```

### 7.2 — Home Page: Services Preview & How It Works Strip

```
In the Proximity Credit Repair project, build two more Home page sections:

1. Create `src/components/sections/ServicesPreview.tsx`:
   - Wrap in `Section` with `dark` prop
   - `SectionLabel`: "OUR SERVICES"
   - Heading: "Everything You Need to" + a span with `.gold-gradient-text` class for "Restore Your Credit"
   - 4 service cards in `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`
   - Wrap the grid in `motion.div` with `variants={staggerContainer}` + `initial="hidden"` + `animate="visible"` using `useInView` to trigger
   - Each card: `Card` component (dark variant, hover enabled):
     - Dynamically resolve the lucide-react icon from the icon name string in the data: create a helper that imports all needed icons from lucide-react and maps by name
     - Icon rendered at `w-10 h-10 text-gold-primary mb-4`
     - Service `title` in `font-heading font-bold text-white text-subheading`
     - `shortDescription` in `text-muted-text font-body text-caption mt-2`
     - `Link to={`/services#${service.id}`}` at bottom: "Learn More →" in `text-gold-primary text-caption font-semibold hover:text-gold-light transition-colors mt-4 inline-block`
   - Import `services` from `src/data/services.ts`

2. Create `src/components/sections/HowItWorksStrip.tsx`:
   - Wrap in `Section` with `alt` prop (offwhite background)
   - `SectionLabel`: "THE PROCESS"
   - Heading: "Four Simple Steps to a Better Score"
   - Steps array (inline data — not from data files):
     Step 1: { number: '01', title: 'Free Consultation', description: 'We start with a no-cost call to understand your credit goals and situation.' }
     Step 2: { number: '02', title: 'Full Credit Review', description: 'We pull and analyze all three bureau reports to identify every opportunity.' }
     Step 3: { number: '03', title: 'Dispute & Repair', description: 'We submit expert dispute letters and manage the entire process on your behalf.' }
     Step 4: { number: '04', title: 'Monitor Progress', description: 'We track every change and keep you updated throughout your journey.' }
   - Desktop: `flex flex-row items-start gap-0` layout. Each step is `flex-1`. Between steps: a `motion.div` of `h-px flex-1 bg-gold-gradient mt-6` (the connecting line).
   - Mobile: `flex flex-col gap-8`
   - Each step: gold numbered circle `w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center font-heading font-black text-white text-sm`, then title in `font-heading font-semibold`, then description in `font-body text-caption text-muted-text`
   - Each step animates in using `useInView` with staggered delay (0.15s × step index)
   - "View Full Process" `Button` variant="secondary" centered below, linking to `/how-it-works`
```

### 7.3 — Home Page: Testimonials Slider & Final CTA Band

```
In the Proximity Credit Repair project, build the final two Home page sections:

1. Create `src/components/sections/TestimonialsSlider.tsx`:
   - Wrap in `Section` with `dark` prop
   - `SectionLabel`: "CLIENT SUCCESS STORIES"
   - Heading: "Real People. Real Results."
   - Import `testimonials` from `src/data/testimonials.ts` and `useIsMobile` from `@hooks`
   - State: `currentIndex` (number, starts at 0)
   - `visibleCount`: 1 on mobile (`useIsMobile()`), 3 on desktop
   - Auto-advance: `useEffect` + `setInterval` every 5000ms, increments `currentIndex` modulo the number of valid starting positions. Clear interval on unmount.
   - Pause on hover: set a `isPaused` ref; `onMouseEnter` sets it to true, `onMouseLeave` sets it to false; skip interval tick when paused
   - Display the `visibleCount` testimonials starting from `currentIndex` (wrap around using modulo)
   - Each testimonial card (`Card` dark, hover enabled):
     - Before/after badges row: `Badge variant="neutral"` showing `{t.beforeScore}`, arrow icon, `Badge variant="success"` showing `{t.afterScore}`
     - Star rating: 5 `Star` icons from lucide-react, `fill="currentColor"` + `text-gold-primary`
     - Large decorative `"` — `absolute top-4 left-4 text-8xl font-heading text-gold-primary/10 leading-none pointer-events-none select-none`
     - Testimonial text in `font-body text-body-base text-white/90 relative z-10`
     - Client name + city in `text-gold-primary font-semibold text-caption mt-4`
   - Slide transition: wrap displayed cards in `AnimatePresence mode="wait"` with `key={currentIndex}`; `motion.div` with `initial={{ opacity: 0, x: 30 }}` → `animate={{ opacity: 1, x: 0 }}` → `exit={{ opacity: 0, x: -30 }}`
   - Navigation: left `ChevronLeft` + right `ChevronRight` buttons, and dot indicators below (one dot per possible starting position)
   - Left/right buttons: `aria-label="Previous testimonial"` / `aria-label="Next testimonial"`

2. Create `src/components/sections/FinalCTABand.tsx`:
   - Wrap in `Section` with `dark` prop
   - Large headline using `motion.h2` with `fadeUp` animation on `useInView`:
     "Your Better Credit Score" on one line + a span with `.gold-gradient-text`: "Starts Today"
   - Subtext: "Join 10,000+ clients who transformed their financial future with Proximity." in `text-muted-text font-body`
   - Single primary `Button` size="lg": "Start Your Free Consultation" → Link to `/contact`
   - All content centered
```

### 7.4 — Assemble Home Page

```
In the Proximity Credit Repair project, replace the placeholder `src/pages/Home.tsx` with the complete assembled Home page.

Import and render these sections in this exact order:
1. `SEOHead` with:
   - title: 'Expert Credit Repair Services That Deliver Real Results'
   - description: from `siteMetadata.siteDescription` (imported from `@config/siteMetadata`)
   - canonicalPath: '/'
   - schemaMarkup: A valid JSON-LD object for schema.org ProfessionalService:
     {
       "@context": "https://schema.org",
       "@type": "ProfessionalService",
       "name": "Proximity Credit Repair",
       "url": siteMetadata.siteUrl,
       "description": siteMetadata.siteDescription,
       "areaServed": "United States",
       "serviceType": "Credit Repair",
       "priceRange": "$$"
     }

2. `HeroSection`
3. `ServicesPreview`
4. `HowItWorksStrip`
5. `TestimonialsSlider`
6. `FinalCTABand`

Wrap in `PageWrapper` (no `dark` prop needed — HeroSection handles its own background).

Confirm: all sections render, scroll animations fire, stat counters count up on scroll, testimonial slider auto-rotates every 5 seconds, and there are zero console errors.
```

### 7.5 — About Us Page

```
In the Proximity Credit Repair project, build the complete About Us page.

Replace `src/pages/About.tsx`. Create any needed section components in `src/components/sections/`.

Sections to build in order:

1. Sub-hero banner (`bg-hero-gradient`):
   - Page title "About Us" in `text-h2 font-heading font-black text-white`
   - Breadcrumb below: "Home / About" in `text-muted-text text-caption`

2. Mission Statement Section (`Section` default/white background):
   - `SectionLabel`: "OUR MISSION"
   - Layout: flex row with a `w-1.5 self-stretch bg-gold-gradient rounded-full mr-8 flex-shrink-0` left accent bar
   - Mission blockquote: "At Proximity Credit Repair, our mission is to empower individuals to take control of their financial future through expert guidance, proven strategies, and unwavering dedication to every client we serve." in `text-h3 font-heading font-semibold text-body-text`
   - This implements the PRD's "gold left-border blockquote / brand story paragraph"

3. Core Values Section (`Section` with `dark` prop):
   - `SectionLabel`: "OUR VALUES"
   - Heading: "What Drives Everything We Do"
   - 2×2 grid of `Card` (dark, hover enabled):
     - Transparency — `Shield` icon — "We believe you deserve to know exactly what we are doing and why at every stage of your credit repair journey."
     - Expertise — `Award` icon — "Our certified specialists bring deep, proven knowledge to every dispute, strategy, and recommendation we make."
     - Results — `TrendingUp` icon — "We measure our success by your success. Real, measurable score improvements are our only acceptable outcome."
     - Dedication — `Heart` icon — "Every client receives the same committed, personalized attention we would give to our own family."
   - Each card: icon at `w-8 h-8 text-gold-primary mb-3`, heading in `font-heading font-bold text-white`, description in `text-muted-text font-body text-caption`

4. Team Section (`Section` with `alt` prop — offwhite):
   - `SectionLabel`: "OUR TEAM"
   - Heading: "Meet the Experts Behind Your Results"
   - `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`
   - Each team card (`Card` light, hover enabled):
     - Photo area: `w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden`
     - `<img src={member.photoUrl} alt={`Photo of ${member.name}, ${member.title}`} className="w-full h-full object-cover" loading="lazy" />`
     - Name in `font-heading font-bold text-body-text`
     - Title in `text-gold-primary text-caption font-semibold`
     - Framer Motion: on `whileHover`, show a bio excerpt overlay — `absolute inset-0 bg-gold-primary/90 rounded-lg flex items-center justify-center p-4` with bio text in white (use `AnimatePresence` + `motion.div` with `initial={{ opacity: 0 }}` → `animate={{ opacity: 1 }}`)
   - Import `teamMembers` from `src/data/team.ts`

5. `SEOHead`:
   - title: 'About Us — Our Mission, Team & Values'
   - description: 'Meet the expert team behind Proximity Credit Repair. Dedicated to empowering clients with proven, transparent credit repair strategies. Discover our mission, values, and the specialists fighting for your financial future.'
   - canonicalPath: '/about'
   - schemaMarkup: `{ "@context": "https://schema.org", "@type": "Organization", "name": "Proximity Credit Repair", "url": siteMetadata.siteUrl, "description": "Expert credit repair services helping clients improve their credit scores through proven dispute strategies." }`

Wrap in `PageWrapper`. Confirm all sections render and animations work.
```

### 7.6 — Services Page

```
In the Proximity Credit Repair project, build the complete Services page.

Replace `src/pages/Services.tsx`.

Sections:

1. Sub-hero banner (`bg-hero-gradient`): Title "Our Services", Breadcrumb "Home / Services"

2. Services Detail Section — for each of the 4 services from `src/data/services.ts`, render a full-detail block that alternates layout:
   - Even-indexed (0, 2): icon + info on LEFT, benefit bullets on RIGHT
   - Odd-indexed (1, 3): benefit bullets on LEFT, icon + info on RIGHT
   - Each block: `Section` with `alt` prop on even, default (white) on odd — creates alternating light/offwhite pattern
   - Add `id={service.id}` on the `Section` component for hash-link navigation from the navbar and home page
   - Left or right column (info side):
     - Dynamically resolved lucide-react icon at `w-16 h-16 text-gold-primary mb-4`
     - Title in `font-heading font-bold text-h3 text-body-text`
     - Full `description` paragraph in `font-body text-body-base text-body-text mt-3`
   - Left or right column (benefits side):
     - Heading "Key Benefits" in `font-heading font-semibold text-subheading text-body-text mb-4`
     - Each benefit: `flex items-start gap-3` with `CheckCircle` icon from lucide-react at `w-5 h-5 text-gold-primary flex-shrink-0 mt-0.5` and text in `font-body text-body-base`
   - Wrap each block's content in a `motion.div` with `variants={fadeUp}` triggered by `useInView` with `triggerOnce: true`

3. Bottom CTA strip (`Section` dark):
   - Text: "Not sure where to start? Talk to an expert." in `text-h3 font-heading font-semibold text-white`
   - Primary `Button` size="lg" linking to `/contact`: "Get Your Free Consultation"

4. `SEOHead`:
   - title: 'Credit Repair Services — Analysis, Disputes, Monitoring & Debt Validation'
   - description: 'Explore Proximity Credit Repair\'s full suite of services: Credit Analysis, Dispute Filing, Score Monitoring, and Debt Validation. Expert strategies tailored to your unique credit profile.'
   - canonicalPath: '/services'
   - schemaMarkup: Array-style schema with all 4 services as `@type: "Service"` entries under an `@graph` key

Wrap in `PageWrapper`.
```

### 7.7 — How It Works Page

```
In the Proximity Credit Repair project, build the complete How It Works page.

Replace `src/pages/HowItWorks.tsx`.

Sections:

1. Sub-hero banner (`bg-hero-gradient`): Title "How It Works", Breadcrumb "Home / How It Works"

2. Timeline Section (`Section` white):
   - `SectionLabel`: "THE PROCESS"
   - Heading: "Four Steps to a Better Credit Score"
   - 4 steps with the exact PRD content and these step-specific lucide-react icons:
     - Step 1: Free Consultation — icon: `Phone` — "We begin with a no-obligation consultation to review your credit situation, understand your goals, and build a clear picture of the path forward. There is no pressure, no commitment — just expert guidance."
     - Step 2: Full Credit Review — icon: `FileSearch` — "Our certified specialists pull and analyze all three credit bureau reports in detail. We identify every error, outdated item, inaccuracy, and negative mark that is impacting your score."
     - Step 3: Dispute & Repair — icon: `FileEdit` — "We draft and submit legally precise dispute letters to the credit bureaus on your behalf. We manage every follow-up, appeal, and response, handling the entire process from start to finish."
     - Step 4: Monitor Your Progress — icon: `BarChart2` — "We track every bureau update, alert you to every change, and send you monthly progress reports. You always know exactly where your score stands and what is improving."
   - Desktop layout (`hidden md:flex flex-row items-start gap-0`): steps separated by `h-px flex-1 bg-gold-gradient mt-8` connecting lines
   - Mobile layout (`flex md:hidden flex-col gap-10`): vertical with a `w-px h-12 bg-gold-gradient ml-6` connector between steps
   - Each step: large gold numbered circle `w-14 h-14 rounded-full bg-gold-gradient`, then icon in white `w-7 h-7`, title, description
   - Animation: each step `motion.div` with `fadeUp` variants and `delay: index * 0.2` in the transition

3. PRD Progress Line: The connecting line between timeline steps on desktop uses `bg-gold-gradient` and animates in — add `initial={{ scaleX: 0 }}` → `animate={{ scaleX: 1 }}` with `transformOrigin: 'left'` and duration 0.8s when the section enters view using `useInView`

4. Bottom CTA strip: same as Services page

5. `SEOHead`:
   - title: 'How Credit Repair Works — Our Proven 4-Step Process'
   - description: 'Learn exactly how Proximity Credit Repair works. From your free consultation to full credit review, expert dispute filing, and ongoing progress monitoring — four steps to a better score.'
   - canonicalPath: '/how-it-works'

Wrap in `PageWrapper`.
```

### 7.8 — Testimonials Page

```
In the Proximity Credit Repair project, build the complete Testimonials page.

Replace `src/pages/Testimonials.tsx`.

Sections:

1. Sub-hero banner (`bg-hero-gradient`): Title "Client Success Stories", Breadcrumb "Home / Testimonials"

2. Trust Badges Row (`Section` white):
   - `SectionLabel`: "TRUSTED & VERIFIED"
   - Heading: "Why Clients Trust Proximity"
   - 3 trust badge cards in a `grid grid-cols-1 md:grid-cols-3 gap-6`:
     - BBB Accredited Business — `Award` icon — "Accredited Business" — `text-muted-text text-caption`
     - Google Reviews — `Star` icon — "5.0 / 5.0 Rating" — `text-muted-text text-caption`
     - Trustpilot Excellent — `ThumbsUp` icon — "Excellent Rating" — `text-muted-text text-caption`
   - Each: `Card` light, centered content, icon at `w-10 h-10 text-gold-primary mb-3`

3. Testimonials Grid (`Section` with `alt` prop):
   - `SectionLabel`: "WHAT OUR CLIENTS SAY"
   - Heading: "Real Results from Real People"
   - `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
   - All 8 testimonials from `src/data/testimonials.ts` — import and map
   - Each card (`Card` dark, hover enabled):
     - Before/after row: `Badge variant="neutral"`: "{t.beforeScore}" → arrow → `Badge variant="success"`: "{t.afterScore}"
     - Improvement label: "+{t.afterScore - t.beforeScore} points" in `text-gold-primary font-semibold text-caption`
     - 5 `Star` icons from lucide-react with `fill="currentColor" className="text-gold-primary w-4 h-4"`
     - Large decorative `"` in gold at low opacity behind the text
     - Testimonial text in `font-body text-body-base text-white/90 relative z-10`
     - Client name + city in `text-gold-primary font-semibold text-caption mt-4`
   - Wrap grid in `motion.div` with `variants={staggerContainer}` triggered by `useInView`

4. Featured Video Testimonial (`Section` dark):
   - `SectionLabel`: "FEATURED STORY"
   - Heading: "Watch Marcus's Journey"
   - Dark card `bg-card-black rounded-card` with `aspect-video` (16:9 ratio)
   - Centered `PlayCircle` icon `w-20 h-20 text-gold-primary` with `motion.div whileHover={{ scale: 1.1 }}`
   - Caption below card: "Marcus T. — From 521 to 694 in 6 months" in `text-muted-text text-caption italic`

5. `SEOHead`:
   - title: 'Client Testimonials & Credit Repair Success Stories'
   - description: 'Read real success stories from Proximity Credit Repair clients who improved their credit scores by 100–175+ points. Before/after results from clients across the United States.'
   - canonicalPath: '/testimonials'

Wrap in `PageWrapper`.
```

### 7.9 — FAQ Page

```
In the Proximity Credit Repair project, build the complete FAQ page.

Replace `src/pages/FAQ.tsx`.

Sections:

1. Sub-hero banner (`bg-hero-gradient`): Title "Frequently Asked Questions", Breadcrumb "Home / FAQ"

2. FAQ Accordion Section (`Section` white):
   - `SectionLabel`: "HAVE QUESTIONS?"
   - Heading: "Everything You Need to Know"
   - Import `faqs` from `src/data/faqs.ts`
   - Render two category groups:
     - Group heading "About Credit Repair" → filter `category === 'about-credit-repair'`
     - Group heading "Working with Proximity" → filter `category === 'working-with-proximity'`
   - Group headings styled: `font-heading font-bold text-subheading text-body-text mb-4 mt-10`
   - State: `openId: string | null` (useState, null = all closed) — only one item open at a time
   - Each FAQ item:
     - Question button: `w-full flex justify-between items-center py-4 text-left font-body font-semibold text-body-base text-body-text`
     - `ChevronDown` icon from lucide-react: `motion.span animate={{ rotate: openId === item.id ? 180 : 0 }} transition={{ duration: 0.3 }}`
     - Answer: `AnimatePresence` + `motion.div` with `initial={{ height: 0, opacity: 0 }}` → `animate={{ height: 'auto', opacity: 1 }}` → `exit={{ height: 0, opacity: 0 }}` with `overflow: hidden`
     - PRD note: The `height: 'auto'` animation requires `layout` prop on the motion.div or using a `motion.div` with explicit height measurements. Use the `overflow-hidden` container approach.
     - Bottom border: `border-b border-gold-primary/20`
     - Clicking an open item closes it; clicking a closed item opens it (and closes any other open item)
   - Accordion button accessibility: `aria-expanded={openId === item.id}`, `aria-controls={`answer-${item.id}`}`, Answer div: `id={`answer-${item.id}`}`, `role="region"`

3. Bottom CTA (`Section` with `alt` prop):
   - "Still have questions? We're here to help."
   - Secondary `Button` linking to `/contact`: "Contact Us"

4. `SEOHead`:
   - title: 'FAQ — Your Credit Repair Questions Answered'
   - description: 'Find answers to the most common credit repair questions. Learn about the process, timeline, compliance, and what to expect when working with Proximity Credit Repair.'
   - canonicalPath: '/faq'
   - schemaMarkup: FAQPage JSON-LD with all 10 Q&As:
     { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } })) }

Wrap in `PageWrapper`.
```

### 7.10 — Contact Page

```
In the Proximity Credit Repair project, build the complete Contact page.

Replace `src/pages/Contact.tsx`.

Layout: `grid grid-cols-1 lg:grid-cols-2 gap-12` inside a `Section` white, stacked on mobile.

Left Column — Contact Info:
- `SectionLabel`: "GET IN TOUCH"
- Heading: "Let's Start Your Credit Journey"
- Contact items (each: `flex items-start gap-3 mb-5`):
  - `Phone` icon `w-5 h-5 text-gold-primary flex-shrink-0 mt-0.5` + `(800) 555-0192`
  - `Mail` icon + `hello@proximitycreditrepair.com`
  - `MapPin` icon + `123 Financial Plaza, Suite 400, Atlanta, GA 30301`
- Map placeholder below: `bg-card-black rounded-card h-56 flex flex-col items-center justify-center gap-2 mt-6`
  - `Map` icon `w-10 h-10 text-gold-primary`
  - Caption: "Interactive map coming soon" in `text-muted-text text-caption`

Right Column — Contact Form:
- `Card` light component wrapping the form
- Import `useForm` from `react-hook-form`, `zodResolver` from `@hookform/resolvers/zod`, `contactFormSchema` from `@lib/validators`
- Import `useFormStore` from `@store`, `submitContactForm` from `@services/contactService`, `useUIStore` from `@store`
- Form fields using UI components (all with `label`, `name`, `register={register('fieldName')}`, `error={errors.fieldName?.message}`):
  - `Input` label="Full Name" name="fullName" required
  - `Input` label="Email Address" name="email" type="email" required
  - `Input` label="Phone Number" name="phone" type="tel" required
    Add `onChange` handler to auto-format as user types using `formatPhone` from `@lib/utils`
  - `Select` label="Service of Interest" name="serviceOfInterest" required, options:
    [{ value: 'Credit Analysis', label: 'Credit Analysis' }, { value: 'Dispute Filing', label: 'Dispute Filing' }, { value: 'Score Monitoring', label: 'Score Monitoring' }, { value: 'Debt Validation', label: 'Debt Validation' }, { value: 'Not Sure', label: 'Not Sure — Help Me Decide' }]
  - `Textarea` label="Message" name="message" required rows={5}
- Submit `Button` type="submit" variant="primary" size="lg" full-width:
  - Normal: "Send Message"
  - While `submissionStatus === 'loading'`: show `Loader2` icon with `animate-spin` class, disabled
- On submit via `handleSubmit`:
  1. Call `setSubmissionStatus('loading')`
  2. Call `submitContactForm(data)` and await
  3. On success: `setSubmissionStatus('success')`, `addToast({ message: 'Message sent! We\'ll be in touch within 24 hours.', type: 'success', duration: 5000 })`
  4. On error: `setSubmissionStatus('error')`, `addToast({ message: 'Something went wrong. Please try again.', type: 'error', duration: 6000 })`

Success state (when `submissionStatus === 'success'`):
- Replace the form (use conditional rendering) with a centered div:
  - `motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}`
  - `CheckCircle` icon `w-20 h-20 text-gold-primary` (animated)
  - "Thank you, {getValues('fullName')}!" in `font-heading font-bold text-h3`
  - "We'll reach out within 24 hours." in `text-muted-text`

`SEOHead`: title 'Contact Us — Start Your Free Credit Consultation', description 'Get in touch with Proximity Credit Repair. Schedule your free consultation and take the first step toward rebuilding your credit. Call, email, or use our contact form.', canonicalPath '/contact'

Wrap in `PageWrapper`.
```

### 7.11 — Phase 7 Review & Fix

```
Review Phase 7 (Page & Feature Development) for the Proximity Credit Repair project:

1. Navigate to every page and confirm it renders completely:
   - / (Home): Hero with particles + word-by-word headline, Trust Bar with 3 counters, Services Preview (4 cards), How It Works Strip, Testimonials Slider (auto-rotating), Final CTA Band
   - /about: Sub-hero, Mission with gold left accent bar, Core Values (4 cards), Team (4 cards with hover bio overlay)
   - /services: Sub-hero, 4 alternating service sections with hash IDs, Bottom CTA
   - /how-it-works: Sub-hero, 4-step timeline with connecting lines (horizontal desktop, vertical mobile), Bottom CTA
   - /testimonials: Sub-hero, Trust Badges row, Testimonials Grid (8 cards), Video placeholder
   - /faq: Sub-hero, 2 category groups with 5 items each, accordion behavior (only 1 open at a time), Bottom CTA
   - /contact: Split layout, 5 form fields, validation errors, success state with animated checkmark, toast notification

2. Confirm all scroll animations fire (fade up on viewport enter)
3. Confirm stat counters count up from 0 on scroll — debt stat shows "$2M+" not "2,000,000+"
4. Submit the contact form with empty fields — confirm 5 separate Zod validation error messages appear
5. Submit with valid data — confirm success state + toast appear
6. Click all 7 nav links — confirm each navigates without full page reload
7. Click `/services#credit-analysis` — confirm page scrolls to the Credit Analysis section
8. Check browser DevTools console — confirm zero errors and zero warnings
9. Check that all data comes from src/data/ and src/config/ files — no hardcoded strings in components

Fix all issues before proceeding.
```

---

## Phase 8 — Animations & Micro-interactions Polish

### 8.1 — Page Transition Animation

```
In the Proximity Credit Repair project, add Framer Motion page transition animations.

IMPORTANT: With `createBrowserRouter` + `RouterProvider` in `App.tsx`, the `useLocation` hook is only accessible inside components rendered within the router (not at the `App.tsx` level). Therefore, implement page transitions inside `AppLayout.tsx`, not in `App.tsx`.

Update `src/components/layout/AppLayout.tsx`:

1. Import `AnimatePresence` from framer-motion and `useLocation` from react-router-dom
2. Get `location` from `useLocation()`
3. Wrap the `<Suspense>` + `<Outlet />` area in `<AnimatePresence mode="wait">`
4. Inside AnimatePresence, render:
   ```tsx
   <motion.div
     key={location.pathname}
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     exit={{ opacity: 0, y: -10 }}
     transition={{ duration: 0.4, ease: 'easeInOut' }}
   >
     <Suspense fallback={<LoadingScreen />}>
       <Outlet />
     </Suspense>
   </motion.div>
   ```
5. Confirm the `ScrollToTop` component (which resets scroll on pathname change) is still rendered alongside this

Navigate between all pages — confirm smooth fade + slide transitions with zero layout shift or flicker.
```

### 8.2 — Loading Screen Refinement

```
In the Proximity Credit Repair project, refine `src/components/ui/LoadingScreen.tsx` for maximum visual polish.

Ensure the following:
1. Full-screen: `fixed inset-0 bg-near-black z-[200] flex flex-col items-center justify-center gap-8`
2. Logo container with entrance animation:
   `motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}`
   Inside: "Proximity" in `font-heading font-black text-4xl gold-gradient-text` + "Credit Repair" in `font-body text-white text-sm tracking-widest uppercase mt-1`
3. Loading dots container (3 dots with stagger):
   Wrap in `motion.div` with `variants={staggerContainer}` and `initial="hidden" animate="visible"`
   Each dot: `motion.div variants={fadeIn}` + `animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: index * 0.2 }}`
   Style: `w-2 h-2 rounded-full bg-gold-primary`
4. Confirm this renders correctly as the Suspense fallback when navigating to any lazy-loaded page on a slow connection
```

### 8.3 — Micro-interaction Polish Pass

```
In the Proximity Credit Repair project, do a complete micro-interaction polish pass. Verify and fix each item:

1. Navbar active link indicator:
   - The active nav link must have `text-gold-primary` and a 2px bottom border in gold
   - Use Framer Motion `layoutId="nav-underline"` on the active underline span so it smoothly slides between links as the route changes (shared layout animation)

2. Cards:
   - Confirm all Card instances with `hover={true}` apply `y: -6` and shadow intensification on hover
   - Confirm transition is `duration: 0.3, ease: 'easeOut'` (smooth, not snappy)

3. Buttons:
   - Confirm ALL Button instances (primary, secondary, ghost) apply `whileHover={{ scale: 1.03 }}` and `whileTap={{ scale: 0.97 }}`
   - Confirm primary buttons show the gold glow pulse animation defined in globals.css

4. FAQ accordion:
   - Confirm ChevronDown rotates exactly 180° when open and returns to 0° when closed
   - Confirm height animation is smooth — no content jump or clipping

5. Testimonials slider:
   - Confirm auto-rotate pauses when mouse enters the slider container and resumes on mouse leave
   - Confirm slide transition is smooth (opacity + x translate)

6. BackToTopButton:
   - Confirm it fades in smoothly after 400px scroll (not a sudden appearance)
   - Confirm scroll-to-top is smooth (`behavior: 'smooth'`)

7. Footer social icons:
   - Confirm each social icon has `whileHover={{ scale: 1.15 }}` and a color transition to gold on hover

8. Stat counters (Home page Trust Bar):
   - Confirm the `useCountUp` hook only starts counting when the Trust Bar scrolls into view
   - Confirm "$2M+" displays correctly (prefix '$', value 2, suffix 'M+')

9. Scroll animations:
   - Confirm `prefers-reduced-motion` is respected: when the media query matches, all `fadeUp` and `fadeIn` variant transitions use `duration: 0` (instant — per the `prefersReducedMotion` constant in animations.ts)

Fix all missing or broken micro-interactions before proceeding.
```

### 8.4 — Phase 8 Review & Fix

```
Review Phase 8 (Animations & Micro-interactions) for the Proximity Credit Repair project:

1. Navigate through all 7 pages and observe every animation trigger:
   - Page transitions: fade + slide, mode="wait", zero flicker
   - Hero headline: word-by-word stagger visible on page load
   - Hero particles: floating continuously, distributed across viewport
   - Scroll sections: fade-up on viewport enter, triggerOnce (don't re-animate on scroll back)
   - Stat counters: count from 0 on Trust Bar scroll entry, correct prefixes/suffixes
   - Service cards: lift 6px + shadow increase on hover
   - Testimonial slider: smooth slide, auto-rotates every 5s, pauses on hover
   - FAQ: smooth height expand/collapse, chevron rotates 180°
   - Buttons: scale 1.03 on hover, 0.97 on tap, primary has glow pulse
   - Mobile menu: slides in from right on hamburger click, slides out on close or nav click
   - BackToTopButton: fades in after 400px, smooth scroll on click
   - LoadingScreen: branded, animated, displays as Suspense fallback

2. Enable "prefers-reduced-motion" simulation in browser DevTools (Rendering panel) and confirm all animations are instant/skipped

3. Open DevTools Performance tab, record scrolling through the Home page, confirm no animation causes long tasks or jank

4. Zero console errors or warnings

Fix all issues before proceeding.
```

---

## Phase 9 — Forms & Validation

### 9.1 — Contact Form Edge Cases & Accessibility

```
In the Proximity Credit Repair project, polish the Contact page form with a focus on edge cases and accessibility (the core form was built in Phase 7.10 — this phase adds robustness).

1. Validation timing:
   - Errors should appear on field blur (not only on submit attempt)
   - Set `mode: 'onBlur'` in `useForm()` options for the contact form
   - After the first submit attempt, switch to `mode: 'onChange'` (re-validate on every keystroke) by setting `reValidateMode: 'onChange'`

2. Phone field formatting:
   - The phone field's `onChange` handler must call `formatPhone(value)` from `@lib/utils` and use `setValue('phone', formatted)` from react-hook-form to update the displayed value without breaking validation
   - Confirm the Zod schema validates the phone after stripping non-numeric characters

3. Submit button state:
   - `disabled` attribute and `aria-disabled="true"` during `submissionStatus === 'loading'`
   - No double-submit possible — guard against calling `submitContactForm` if status is 'loading'

4. Error state:
   - When `submissionStatus === 'error'`, display an inline error banner below the submit button: `text-red-400 text-label` reading "Something went wrong. Please try again or call us at (800) 555-0192."
   - After displaying the error, reset `submissionStatus` to 'idle' after 5 seconds so the user can try again

5. Accessibility:
   - All form fields must have associated `<label>` elements with correct `htmlFor` matching the input `id`
   - Error messages must have `role="alert"` so screen readers announce them
   - Tab order must be: Full Name → Email → Phone → Service → Message → Submit Button

6. Success state persistence:
   - Once the success state is shown, do not allow re-submission (the form stays hidden for the session)
   - Add a "Send another message" link below the success state that calls `resetForm()` from `useFormStore` and resets the react-hook-form state with `reset()`

Test all edge cases before marking this phase complete.
```

### 9.2 — Phase 9 Review & Fix

```
Review Phase 9 (Forms & Validation) for the Proximity Credit Repair project:

1. Open the Contact page. Click directly on the Submit button without filling any fields:
   - Confirm all 5 error messages appear simultaneously with `role="alert"`
   - Confirm all field borders turn red

2. Fill in the Full Name field then click away:
   - Confirm error disappears immediately when valid input is entered (onBlur → onChange after first submit)

3. Type `5551234567` in the phone field:
   - Confirm it auto-formats to `(555) 123-4567` as you type

4. Type a 10-character message and try to submit:
   - Confirm "Message must be at least 20 characters" error appears

5. Fill all fields correctly and submit:
   - Confirm the spinner appears on the button for ~1.5 seconds
   - Confirm the button is disabled during submission (cannot double-click)
   - Confirm the success state appears with the checkmark and the submitted name
   - Confirm a green success toast appears at bottom-right

6. Tab through the entire form with keyboard only:
   - Confirm focus moves in correct order
   - Confirm all interactive elements have visible gold focus outlines

7. Check browser DevTools → Elements → confirm all inputs have `id` attributes matching their `htmlFor` label attributes

Fix all issues before proceeding.
```

---

## Phase 10 — SEO & Metadata

### 10.1 — Complete SEO Implementation Across All Pages

```
In the Proximity Credit Repair project, verify and finalize SEO implementation on all 7 pages.

For each page, confirm the `SEOHead` component is called with unique and accurate values:

- `/` (Home): title 'Expert Credit Repair Services That Deliver Real Results', description from `siteMetadata.siteDescription` (imported from `@config/siteMetadata` — do NOT hardcode a different description here), schemaMarkup: ProfessionalService (as defined in Phase 7.4)

- `/about`: title 'About Us — Our Mission, Team & Values', relevant description, schemaMarkup: Organization (as defined in Phase 7.5)

- `/services`: title 'Credit Repair Services — Analysis, Disputes, Monitoring & Debt Validation', description covering all 4 services, schemaMarkup: @graph with 4 Service entries

- `/how-it-works`: title 'How Credit Repair Works — Our Proven 4-Step Process', description explaining the 4-step process, NO schema needed

- `/testimonials`: title 'Client Testimonials & Credit Repair Success Stories', description referencing score improvements and client results, NO additional schema

- `/faq`: title 'FAQ — Your Credit Repair Questions Answered', description, schemaMarkup: FAQPage with all 10 Q&As as mainEntity (as defined in Phase 7.9)

- `/contact`: title 'Contact Us — Start Your Free Credit Consultation', description, NO additional schema (the ProfessionalService schema on the Home page covers the business)

Verify all JSON-LD schemas are syntactically valid by reviewing their structure. Each schema must include `@context: "https://schema.org"` and `@type`. Confirm that dynamic values (like siteMetadata.siteUrl) are imported and interpolated correctly, not hardcoded.

Also confirm the `SEOHead` component correctly cleans up all injected meta tags on every route change (check the cleanup function in `useEffect`) to prevent duplicate tags accumulating in the document head.
```

### 10.2 — Semantic HTML & Accessibility Audit

```
In the Proximity Credit Repair project, do a complete semantic HTML and accessibility audit across all pages and components.

Fix every issue found:

1. Heading hierarchy — check every page:
   - Each page must have exactly one `<h1>` (the hero title or page title). Use `as="h1"` props or direct HTML elements.
   - Section headings must use `<h2>`. Sub-headings within sections use `<h3>`. No heading levels skipped.
   - Audit: Home `<h1>`: hero headline. About `<h1>`: "About Us". Services `<h1>`: "Our Services". Etc.

2. Image alt text:
   - Team photos: `alt="Photo of {member.name}, {member.title} at Proximity Credit Repair"`
   - Any decorative images or SVGs: `alt=""` and `aria-hidden="true"`

3. ARIA attributes:
   - Navbar hamburger: `aria-label` toggles between "Open navigation menu" / "Close navigation menu"; `aria-expanded={mobileMenuOpen}`
   - Navbar mobile drawer: `role="dialog"` + `aria-label="Navigation menu"` + `aria-modal="true"`
   - Testimonial slider left/right buttons: `aria-label="Previous testimonial"` / `aria-label="Next testimonial"`
   - Testimonial slider dots: `aria-label="Go to testimonial {n}"` + `aria-current={isActive}`
   - FAQ accordion buttons: `aria-expanded`, `aria-controls`; answer panels: `role="region"`, `id` matching controls
   - Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to title
   - BackToTopButton: `aria-label="Back to top"` (matches the definition in Phase 3.10)
   - Footer social icons: `aria-label="Follow Proximity Credit Repair on [Platform Name]"`

4. Focus management:
   - When mobile drawer opens, move focus to the first nav link inside it
   - When mobile drawer closes, return focus to the hamburger button
   - Confirm gold `focus-visible` outline is visible on ALL interactive elements

5. Color contrast check:
   - `text-gold-primary` (#B8924A) on `bg-near-black` (#0A0A0A): contrast ratio ≈ 5.7:1 ✓
   - `text-muted-text` (#6B6B6B) on `bg-white`: contrast ratio ≈ 5.7:1 ✓ — if any instance fails, upgrade to `#767676` minimum
   - `text-white` on `bg-card-black`: ✓
   - `text-body-text` (#1A1A1A) on white: ✓

6. Semantic HTML check:
   - Confirm `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>` elements are used correctly
   - Confirm skip-navigation link in AppLayout is the first focusable element (links to `#main-content`)
   - Confirm `<main id="main-content">` is rendered inside `PageWrapper`

Report and fix every violation found.
```

### 10.3 — Phase 10 Review & Fix

```
Review Phase 10 (SEO & Metadata) for the Proximity Credit Repair project:

1. Open each of the 7 pages. Inspect `document.head` in DevTools and confirm:
   - `<title>` is unique and matches format: "{Page Title} | Proximity Credit Repair"
   - `<meta name="description">` is unique per page
   - `og:title`, `og:description`, `og:image`, `og:url` are present
   - `twitter:card`, `twitter:title`, `twitter:description` are present
   - `rel="canonical"` link is present
   - `<script type="application/ld+json">` is present on Home, About, Services, FAQ pages

2. Navigate between 3 different pages and inspect the head each time — confirm old meta tags are removed and replaced (no duplicate description tags)

3. Tab through the Home page from the very beginning — confirm the skip-link appears first and leads to `#main-content`

4. Open DevTools → Accessibility panel — confirm no critical violations

5. Run Lighthouse on the Home page (DevTools → Lighthouse → Mobile):
   - Target: Accessibility ≥ 90, SEO ≥ 90, Best Practices ≥ 90
   - Fix every item in the Opportunities and Diagnostics sections that affects Accessibility or SEO scores

Fix all issues before proceeding.
```

---

## Phase 11 — Performance Optimization

### 11.1 — Image Optimization & Code Splitting

```
In the Proximity Credit Repair project, implement performance optimizations.

1. Create `src/components/ui/OptimizedImage.tsx`:
   - Props: `src`, `alt` (required), `className?`, `width?`, `height?`, `priority?` (boolean, default false)
   - Renders `<img>` with:
     - `loading={priority ? 'eager' : 'lazy'}`
     - `decoding="async"`
     - `fetchPriority={priority ? 'high' : 'auto'}` (note lowercase attribute: `fetchpriority` in HTML, `fetchPriority` in JSX)
     - If `width` and `height` are provided, set them as explicit attributes to prevent layout shift
   - Add to `src/components/ui/index.ts` exports

2. Update all `<img>` tags in the codebase to use `OptimizedImage`:
   - Team photos: `<OptimizedImage src={member.photoUrl} alt={`Photo of ${member.name}, ${member.title} at Proximity Credit Repair`} width={400} height={192} />`
   - Any other images

3. In `index.html`, add a preload for the Google Fonts stylesheet:
   `<link rel="preload" href="https://fonts.googleapis.com/..." as="style" crossorigin />`
   (Use the same URL as the existing Google Fonts link)

4. Update `vite.config.ts` with production build optimizations:
   ```ts
   build: {
     target: 'es2020',
     minify: 'esbuild',
     cssMinify: true,
     reportCompressedSize: true,
     rollupOptions: {
       output: {
         manualChunks: {
           'vendor-react': ['react', 'react-dom', 'react-router-dom'],
           'vendor-motion': ['framer-motion'],
           'vendor-icons': ['lucide-react'],
           'vendor-forms': ['react-hook-form', 'zod', '@hookform/resolvers'],
           'vendor-state': ['zustand', '@tanstack/react-query'],
         }
       }
     }
   }
   ```

5. Add `<meta charset="UTF-8">` and `<meta name="viewport" content="width=device-width, initial-scale=1.0">` to `index.html` if not already present (Vite usually adds these but verify).
```

### 11.2 — Bundle Analysis & Final Optimization

```
In the Proximity Credit Repair project, analyze and verify the production bundle.

1. Run `npm run build` — confirm zero build errors. Note the file sizes listed in the Vite build output.

2. Run `npx vite-bundle-visualizer` — review the interactive output to identify any unexpectedly large chunks.
   - Each lazy-loaded page should appear as a separate chunk (Home, About, Services, etc.)
   - The `vendor-motion` (framer-motion) chunk will be large (~100kb gzip) — this is expected
   - Flag any single non-vendor chunk exceeding 100kb gzipped

3. Confirm all 7 content page routes are code-split (each appears as a separate .js chunk in the `dist/assets/` folder)

4. Run `npm run preview` — serve the production build on port 5000. Navigate through all pages and confirm:
   - Everything works identically to `npm run dev`
   - No 404 errors for any assets
   - Fonts load and display correctly

5. In browser Network tab (with caching disabled, throttled to "Fast 3G"), measure:
   - Initial page load for `/` — JavaScript should be split, not one massive bundle
   - Subsequent navigation to `/services` — should load the services chunk only (cached vendor chunks)

Fix any bundle size issues by reviewing large imports and ensuring all page routes are properly lazy-loaded.
```

### 11.3 — Phase 11 Review & Fix

```
Review Phase 11 (Performance Optimization) for the Proximity Credit Repair project:

1. Run `npm run build` — confirm it completes successfully with zero errors

2. Check `dist/assets/` — confirm multiple .js files exist (each page route as a separate chunk plus vendor chunks)

3. Run `npm run preview` and open at http://0.0.0.0:5000 — confirm the production build renders correctly on all 7 pages

4. In the production build, open DevTools → Network:
   - Confirm no single JavaScript file exceeds 300kb (gzipped sizes in the build output)
   - Confirm Google Fonts loads with `display=swap` in the URL (check the network request)

5. Confirm `OptimizedImage` is used for all `<img>` elements across the codebase

6. Open DevTools → Lighthouse → Performance (Mobile) on the Home page:
   - Target: Performance score ≥ 85 (aim for 90+)
   - Check LCP, CLS, and FID/INP values — target LCP < 2.5s, CLS < 0.1

Fix all issues before proceeding.
```

---

## Phase 12 — Responsiveness & Cross-Browser QA

### 12.1 — Full Responsive Audit

```
In the Proximity Credit Repair project, do a complete responsive design audit at these exact viewport widths using browser DevTools device emulation:

- 375px (small mobile — iPhone SE)
- 390px (standard mobile — iPhone 14)
- 768px (tablet portrait)
- 1024px (tablet landscape / small laptop)
- 1280px (standard desktop)
- 1440px (large desktop)

For each page at each breakpoint, check and fix:

HOME PAGE:
- Hero headline: `text-4xl` on mobile → `text-6xl` on tablet → `text-h1` on desktop (use responsive Tailwind prefixes)
- Hero particles: reduce or hide on very small screens (< 390px) to avoid clutter
- Trust Bar: `grid-cols-1` on mobile → `grid-cols-3` on tablet+
- Services Preview: `grid-cols-1` on mobile → `grid-cols-2` on tablet → `grid-cols-4` on large desktop
- How It Works Strip: vertical flow on mobile, horizontal row with connecting lines on desktop

ABOUT PAGE:
- Mission section: accent bar + blockquote stack on mobile (bar above text, not beside)
- Core Values: `grid-cols-1` on mobile → `grid-cols-2` on tablet+
- Team: `grid-cols-1` mobile → `grid-cols-2` tablet → `grid-cols-4` large desktop

SERVICES PAGE:
- Each service block: both columns stack vertically on mobile (icon + info on top, benefits below)
- Alternating layout only applies on `lg:` breakpoint and above

HOW IT WORKS PAGE:
- Timeline: `flex-col` on mobile with vertical gold connector lines → `flex-row` on `md:` with horizontal connectors

TESTIMONIALS PAGE:
- Grid: `grid-cols-1` → `grid-cols-2` on `md:` → `grid-cols-3` on `lg:`

CONTACT PAGE:
- `grid-cols-1` on mobile (form below contact info) → `grid-cols-2` on `lg:`

NAVBAR:
- Desktop links hidden on mobile (`hidden md:flex`)
- Hamburger visible on mobile (`flex md:hidden`)
- Mobile drawer is full height (100vh), not just part of the screen

FOOTER:
- 4 columns → 2 columns on tablet → 1 column on mobile
- Legal disclaimer stays readable on mobile (does not overflow)

Fix every layout issue at every breakpoint before proceeding.
```

### 12.2 — Final QA Bug Fix Pass

```
In the Proximity Credit Repair project, do a comprehensive final QA pass. Check and fix every item:

VISUAL CONSISTENCY:
- All cards use `rounded-card` (16px border radius) — none use default Tailwind rounded values
- All buttons use `rounded-pill` (9999px border radius)
- All section headings use `font-heading` (Montserrat)
- All body text and paragraphs use `font-body` (Open Sans)
- Zero hardcoded hex color values in any .tsx or .ts source file — only Tailwind token class names

CONTENT ACCURACY:
- Footer legal disclaimer reads EXACTLY: "Results may vary. We do not guarantee specific credit score improvements."
- Trust Bar stats: "10,000+" clients, "95%" success rate, "$2M+" debt resolved
- FAQ has exactly 10 items: 5 in 'about-credit-repair', 5 in 'working-with-proximity'
- All 7 nav links match the PRD URL structure exactly

NAVIGATION & ROUTING:
- All 7 `Link` components navigate without full page reload
- Hash links (e.g., `/services#credit-analysis`) scroll to the correct section
- The 404 page renders for any undefined route (test by visiting `/nonexistent`)
- ScrollToTop runs on every route change (test by scrolling Home, then navigating to About — confirm scroll resets)

FUNCTIONALITY:
- Testimonial slider auto-rotates every 5 seconds and pauses on hover
- FAQ: clicking an open item closes it; clicking a different item opens it and closes the previous one
- BackToTopButton appears after 400px scroll and disappears when scrolled back to top
- Contact form: all validation, submission, success state, and error state work as specified

ZERO ERRORS:
- Open browser DevTools console on every page — confirm zero JavaScript errors
- Run `npx tsc --noEmit` — zero TypeScript compilation errors
- Run `npx eslint src/ --ext .ts,.tsx` — zero ESLint errors (warnings acceptable)

Fix every issue found.
```

---

## Phase 13 — Deployment & Production Readiness

### 13.1 — Replit Configuration & Deployment Setup

```
In the Proximity Credit Repair project, configure everything needed for live deployment on Replit.

1. Confirm `vite.config.ts` has these settings for Replit compatibility:
   - `server.host: '0.0.0.0'` and `server.port: 5000` (Replit's webview requires port 5000)
   - `preview.host: '0.0.0.0'` and `preview.port: 5000`
   - `server.strictPort: true` (fail fast if port 5000 is unavailable — helps debug port conflicts)

2. Update `package.json` scripts to:
   ```json
   {
     "dev": "vite",
     "build": "tsc && vite build",
     "preview": "vite preview",
     "lint": "eslint src/ --ext .ts,.tsx",
     "typecheck": "tsc --noEmit"
   }
   ```

3. Create or update `.replit` at the project root with valid TOML:
   ```toml
   run = "npm run dev"
   entrypoint = "index.html"

   [deployment]
   run = ["sh", "-c", "npm run build && npm run preview"]
   deploymentTarget = "static"
   ```
   This tells Replit to run the dev server during development and build + serve the static bundle for production deployments.

4. Create `.gitignore` (if not already created by Vite scaffold) containing:
   node_modules/, dist/, .env.local, .DS_Store, *.log

5. Set the `VITE_SITE_URL` value in `.env.production` to the Replit deployment URL. If not yet known, use a placeholder: `https://proximity-credit-repair.replit.app`

6. Run `npm run build` — confirm it completes with zero errors and the `dist/` folder is generated.

7. Run `npm run dev` — confirm the app loads in the Replit preview pane on port 5000 and all pages work.
```

### 13.2 — Final Production Checklist

```
In the Proximity Credit Repair project, complete the full Definition of Done checklist from the PRD before declaring the project ready for deployment.

Verify and fix EVERY item:

ARCHITECTURE:
- [ ] All 7 pages built and responsive across breakpoints 375px → 1440px
- [ ] Complete folder structure: assets, components/ui, components/layout, components/sections, pages, hooks, store, services, data, lib, types, config, styles
- [ ] All page content in src/data/ and src/config/ — zero hardcoded strings in component/page files
- [ ] All reusable UI primitives in src/components/ui: Button, Card, Badge, Input, Textarea, Select, Modal, Toast, ToastContainer, LoadingScreen, BackToTopButton, OptimizedImage, SectionDivider, SectionLabel

STATE & STORES:
- [ ] Zustand uiStore: mobileMenuOpen, scrollY, activeNavItem, toastQueue + all actions
- [ ] Zustand formStore: submissionStatus, validationErrors, formData + all actions

ANIMATIONS:
- [ ] Framer Motion on: hero word-by-word, page transitions, scroll fadeUp, card hover, button hover/tap, FAQ accordion, testimonial slider, floating particles, loading screen, mobile menu, BackToTopButton
- [ ] prefers-reduced-motion respected (instant transitions when media query matches)

DESIGN SYSTEM:
- [ ] All brand colors and fonts defined in tailwind.config.js — zero inline hex values anywhere
- [ ] Gold gradient, hero gradient, gold glow — all defined as Tailwind background image tokens

FUNCTIONALITY:
- [ ] Contact form: 5 fields, Zod validation (onBlur), phone auto-format, loading state, success state with animated checkmark, error state, toast notifications
- [ ] Stat counters: count up from 0 on scroll enter, "$2M+" displays correctly
- [ ] Testimonial carousel: auto-rotates every 5s, pauses on hover, manual nav works
- [ ] FAQ accordion: smooth height animation, one item open at a time, chevron rotates
- [ ] Sticky navbar: transparent at top, blurred/dark after 50px scroll, mobile drawer
- [ ] BackToTopButton: appears after 400px, smooth scroll to top

SEO & ACCESSIBILITY:
- [ ] SEOHead with unique title + description + OG tags + canonical on all 7 pages
- [ ] JSON-LD schema on Home (ProfessionalService), About (Organization), Services (Service ×4), FAQ (FAQPage)
- [ ] Single h1 per page, correct h2/h3 hierarchy throughout
- [ ] All images have descriptive alt attributes
- [ ] All interactive elements have ARIA labels where needed
- [ ] Skip-navigation link functional and links to #main-content
- [ ] Keyboard navigable (tab through all interactive elements)

ENVIRONMENT & DEPLOYMENT:
- [ ] .env.development, .env.staging, .env.production with all 4 VITE_ variables
- [ ] Legal disclaimer in footer: "Results may vary. We do not guarantee specific credit score improvements."
- [ ] .replit file configured with dev run command and deployment build command
- [ ] npm run build succeeds with zero errors
- [ ] App accessible in Replit preview pane on port 5000

QUALITY:
- [ ] Zero browser console errors across all 7 pages
- [ ] npx tsc --noEmit: zero TypeScript errors
- [ ] npx eslint src/: zero ESLint errors

Do not mark the project complete until every single item is checked and verified. Fix anything that is not done.
```

### 13.3 — Lighthouse Score Verification & Final Polish

```
In the Proximity Credit Repair project, run Lighthouse audits and fix all issues preventing target scores.

1. In Chrome DevTools → Lighthouse:
   - Run on `/` (Home page), Device: Mobile, Categories: Performance, Accessibility, Best Practices, SEO
   - Run again on Device: Desktop

2. Target scores and fixes:

PERFORMANCE (≥ 90):
- LCP < 2.5s: Ensure hero fonts load quickly. Verify `&display=swap` is in the Google Fonts URL. The hero headline should render quickly — avoid render-blocking resources.
- CLS < 0.1: Ensure all images have explicit `width` and `height` attributes (use `OptimizedImage` component built in Phase 11). Ensure fonts don't shift (font-display: swap handles this).
- FID/INP < 100ms: Ensure no heavy operations run synchronously on load.
- Check Lighthouse "Opportunities" — address the top 3 issues flagged.

ACCESSIBILITY (≥ 90):
- Fix all contrast failures Lighthouse reports
- Fix all missing ARIA attributes or label issues
- Fix any missing alt text

BEST PRACTICES (≥ 90):
- Eliminate all console errors (each error costs points)
- Ensure no deprecated APIs are used

SEO (≥ 90):
- Confirm all pages have `<title>`, `<meta name="description">`, and crawlable links
- Confirm `<link rel="canonical">` is on every page

3. Re-run Lighthouse after each fix batch. Continue until all 4 categories reach 90+ on both Mobile and Desktop.

4. Fix any remaining issues surfaced by Lighthouse that were not caught in previous phases.
```

### 13.4 — Final Deployment Confirmation

```
In the Proximity Credit Repair project, perform the complete final deployment confirmation.

1. Run `npm run dev` — confirm the app starts on port 5000 and loads correctly in the Replit preview pane.

2. Navigate through all 7 pages in the Replit preview and confirm:
   - Proximity logo in gold gradient text renders correctly in the Navbar and Footer
   - Navbar becomes blurred/dark on scroll
   - Hero particles float continuously
   - Stat counters count up when the Trust Bar scrolls into view
   - Testimonial slider auto-rotates every 5 seconds
   - FAQ accordion opens and closes smoothly
   - Contact form submits and shows success state
   - Mobile hamburger menu works at mobile viewport width in the preview pane
   - All internal links navigate without full page reload
   - BackToTopButton appears after scrolling 400px

3. Open browser console — confirm zero JavaScript errors and zero 404 resource errors.

4. Confirm the browser tab title on the Home page reads:
   "Expert Credit Repair Services That Deliver Real Results | Proximity Credit Repair"

5. Run final checks:
   - `npx tsc --noEmit` → zero TypeScript errors
   - `npx eslint src/ --ext .ts,.tsx` → zero ESLint errors
   - `npm run build` → successful build with zero errors

6. The Proximity Credit Repair marketing website is production-ready and meets all PRD Phase 1 acceptance criteria.

Phase 1 Complete — PRD Definition of Done: All 7 pages built, responsive, animated, accessible, and deployed on Replit.
```

---

## Appendix — Quick Reference

### PRD Color Token Reference

| PRD Name | Hex | Tailwind Token Class |
|---|---|---|
| Gold Primary | `#B8924A` | `text-gold-primary` / `bg-gold-primary` |
| Gold Light | `#D4AF72` | `text-gold-light` / `bg-gold-light` |
| Gold Dark | `#8B6A2E` | `text-gold-dark` / `bg-gold-dark` |
| Pure White | `#FFFFFF` | `text-white` / `bg-white` (Tailwind default) |
| Off White | `#F9F6F1` | `bg-offwhite` / `text-offwhite` |
| Near Black | `#0A0A0A` | `bg-near-black` / `text-near-black` |
| Dark Charcoal | `#141414` | `bg-card-black` / `text-card-black` |
| Body Text | `#1A1A1A` | `text-body-text` |
| Muted Text | `#6B6B6B` | `text-muted-text` |

### PRD URL Structure

| Page | Route | Schema |
|---|---|---|
| Home | `/` | ProfessionalService |
| About Us | `/about` | Organization |
| Services | `/services` | Service (×4 in @graph) |
| How It Works | `/how-it-works` | None |
| Testimonials | `/testimonials` | None |
| FAQ | `/faq` | FAQPage |
| Contact | `/contact` | None |
| 404 | `*` | None |

### Data & Config File Reference

| File | Location | Export | Count |
|---|---|---|---|
| navigation.ts | `src/config/` | `navLinks`, `footerServiceLinks` | 7 + 4 |
| siteMetadata.ts | `src/config/` | `siteMetadata` | 1 object |
| theme.ts | `src/config/` | `theme` | 1 object |
| services.ts | `src/data/` | `services` | 4 items |
| testimonials.ts | `src/data/` | `testimonials` | 8 items (2 featured) |
| faqs.ts | `src/data/` | `faqs` | 10 items (5 per category) |
| team.ts | `src/data/` | `teamMembers` | 4 items |
| stats.ts | `src/data/` | `stats` | 3 items |

### Key Technical Decisions (Deviations from Naive Implementation)

| Issue | Wrong Approach | Correct Approach |
|---|---|---|
| Vite path aliases | Use `__dirname` | Use `fileURLToPath(new URL(...))`  |
| Replit port | Use `5173` | Use `5000` (webview requirement) |
| Class merging | Custom string join | Use `clsx` package |
| Stat counters | Custom requestAnimationFrame hook | Use installed `react-countup` package |
| $2M+ stat | `value: 2000000` | `value: 2, prefix: '$', suffix: 'M+'` |
| Page transitions | `useLocation` in `App.tsx` | `useLocation` in `AppLayout.tsx` |
| Color overrides | Redefine Tailwind's `white` | Only extend with new tokens (`offwhite`, etc.) |

### PRD Acceptance Criteria (Definition of Done — Phase 1)

All 19 PRD acceptance criteria must be verified before the project is marked complete. See Phase 13.2 for the complete checklist.
