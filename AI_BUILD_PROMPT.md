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

1. Scaffold a new Vite project configured for React 18 with TypeScript using: `npm create vite@latest proximity-credit -- --template react-ts`
2. Navigate into the project directory.
3. Install all of the following production dependencies in a single command:
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
4. Install all of the following development dependencies in a single command:
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
5. Initialize Tailwind CSS by running: `npx tailwindcss init -p`
6. Create an `.eslintrc.json` file at the project root with React + hooks rules enabled and no-unused-vars as a warning.
7. Create a `.prettierrc` file at the project root with: printWidth 100, singleQuote true, semi false, tabWidth 2, trailingComma "es5".
8. Update `vite.config.ts` to set `server.host` to `0.0.0.0` and `server.port` to `5173` so the app is accessible inside Replit's preview pane.
9. Confirm the dev server starts without errors by running `npm run dev`.

Do not build any UI yet. Only complete the setup steps above.
```

### 1.2 — Create Full Scalable Folder Structure

```
Inside the Proximity Credit Repair project (`src/`), create the following complete folder structure exactly as specified. Create placeholder `index.ts` or `.gitkeep` files where needed so the folders are tracked.

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

2. Update `vite.config.ts` to mirror these same aliases using the `resolve.alias` option, referencing `__dirname` + `/src` as the base.

Confirm there are no TypeScript errors after making these changes.
```

### 1.4 — Phase 1 Review & Fix

```
Review Phase 1 (Project Setup & Architecture) for the Proximity Credit Repair project:

1. Confirm all dependencies listed in the PRD are installed and present in `package.json`:
   - react@18, react-dom@18, react-router-dom@6, framer-motion, zustand, react-hook-form, @hookform/resolvers, zod, @tanstack/react-query, lucide-react, react-countup, react-intersection-observer
   - Dev: tailwindcss@3, postcss, autoprefixer, vite-bundle-visualizer

2. Confirm the full folder structure under `src/` exists: assets, components/ui, components/layout, components/sections, pages, hooks, store, services, data, lib, types, config, styles

3. Confirm `.env.development`, `.env.staging`, `.env.production` exist with the four VITE_ variables

4. Confirm TypeScript path aliases `@/*` and all sub-aliases work correctly in both `tsconfig.json` and `vite.config.ts`

5. Confirm `.eslintrc.json` and `.prettierrc` exist and are correctly formatted

6. Run `npm run dev` and confirm zero errors in the terminal

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
- `white.pure`: `#FFFFFF`
- `white.off`: `#F9F6F1`
- `black.near`: `#0A0A0A`
- `black.card`: `#141414`
- `text.body`: `#1A1A1A`
- `text.muted`: `#6B6B6B`

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

CONTAINER (under `container`):
- `center`: true
- `padding`: `'1.5rem'`
- `screens.2xl`: `'1280px'`

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

1. In `index.html`, add Google Fonts import in the `<head>` for:
   - Montserrat: weights 400, 600, 700, 800
   - Open Sans: weights 400, 600
   Use the preconnect links for performance.

2. Create `src/styles/globals.css` with:
   - `@tailwind base`, `@tailwind components`, `@tailwind utilities` directives
   - CSS custom properties under `:root` for all 9 brand colors from the PRD matching the Tailwind token names
   - A global `*` reset: `box-sizing: border-box`, `margin: 0`, `padding: 0`
   - `html`: `scroll-behavior: smooth`
   - `body`: font-family set to Open Sans, color set to `#1A1A1A`, background set to `#FFFFFF`
   - A utility class `.gold-gradient-text` that applies the gold gradient as a text fill using `background-clip: text` and `-webkit-text-fill-color: transparent`
   - A utility class `.section-padding` that applies `padding-top: 96px` and `padding-bottom: 96px`
   - Focus-visible outline style: `outline: 2px solid #B8924A` with `outline-offset: 2px` applied globally to all interactive elements

3. Import `src/styles/globals.css` in `src/main.tsx` (remove the default Vite CSS imports)

4. Update `src/main.tsx` to wrap the app in `React.StrictMode` and `QueryClientProvider` from TanStack Query with a default `QueryClient` instance.

Confirm no errors after these changes.
```

### 2.3 — Phase 2 Review & Fix

```
Review Phase 2 (Design System & Tailwind Configuration) for the Proximity Credit Repair project:

1. Open `tailwind.config.js` and verify all 9 brand color tokens are defined under `theme.extend.colors`
2. Verify all gradient names (`gold-gradient`, `hero-gradient`, `gold-glow`) are defined under `backgroundImage`
3. Verify both font families (`heading: Montserrat`, `body: Open Sans`) are defined under `fontFamily`
4. Verify the `container` max-width is set to `1280px` and centered
5. Verify all three box shadow variants (`gold-sm`, `gold-md`, `gold-lg`) are defined
6. Open `src/styles/globals.css` and verify the `.gold-gradient-text` and `.section-padding` utility classes exist
7. Open `index.html` and verify the Google Fonts `<link>` tags for Montserrat and Open Sans are in the `<head>`
8. Open `src/main.tsx` and verify it imports `globals.css` and wraps the app in `QueryClientProvider`
9. Run the dev server and confirm Tailwind utility classes resolve without errors

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
- `Stat`: label (string), value (number), suffix (string), icon (string)

Also create `src/types/component-props.ts` with shared prop interfaces:
- `BaseProps`: className? (string), children? (React.ReactNode)
- `ButtonProps extends BaseProps`: variant ('primary' | 'secondary' | 'ghost'), size ('sm' | 'md' | 'lg'), onClick? (function), disabled? (boolean), type? ('button' | 'submit' | 'reset'), href? (string)
- `CardProps extends BaseProps`: variant ('dark' | 'light'), hover? (boolean)

Do not create any components yet. Only the type files.
```

### 3.2 — Utility Functions

```
In the Proximity Credit Repair project, create the following utility files:

1. `src/lib/utils.ts`:
   - Export a `cn(...inputs)` function that merges Tailwind class names (implement using a simple join + dedup approach without installing additional packages — use string template logic).
   - Export a `formatPhone(phone: string): string` function that formats a 10-digit string as `(XXX) XXX-XXXX`.
   - Export a `truncate(text: string, length: number): string` function that truncates to the given length and appends `...`.

2. `src/lib/validators.ts`:
   - Export a Zod schema named `contactFormSchema` for the `ContactFormData` type:
     - fullName: required string, min 2 characters, max 100
     - email: required valid email
     - phone: required string matching regex for 10-digit US phone (optional formatting)
     - serviceOfInterest: required string, one of: 'Credit Analysis', 'Dispute Filing', 'Score Monitoring', 'Debt Validation', 'Not Sure'
     - message: required string, min 20 characters, max 1000

3. `src/lib/animations.ts`:
   - Export Framer Motion variant objects for reuse across all components:
     - `fadeUp`: hidden state (opacity 0, y 30), visible state (opacity 1, y 0) with transition duration 0.6 and ease "easeOut"
     - `fadeIn`: hidden (opacity 0), visible (opacity 1) with duration 0.5
     - `staggerContainer`: hidden state (opacity 0), visible state (opacity 1) with `staggerChildren: 0.1` and `delayChildren: 0.1`
     - `cardHover`: whileHover with y: -6 and transition duration 0.3
     - `buttonHover`: whileHover scale 1.03, whileTap scale 0.97

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
- `onClick?`: function
- `disabled?`: boolean
- `type?`: 'button' | 'submit' | 'reset'
- `href?`: string (if provided, render as anchor tag)

Variant styles (using Tailwind tokens from tailwind.config.js — never hardcoded hex):
- `primary`: background `bg-gold-gradient`, text white, `rounded-pill`, `font-heading font-bold`, gold glow shadow on hover (`shadow-gold-md`)
- `secondary`: transparent background, `border-2 border-gold-primary`, text `text-gold-primary`, `rounded-pill`, on hover fills to `bg-gold-primary` with white text
- `ghost`: no border, no background, text `text-gold-primary`, underline on hover

Size styles:
- `sm`: `px-5 py-2 text-sm`
- `md`: `px-7 py-3 text-base`
- `lg`: `px-9 py-4 text-lg`

Wrap the button in a Framer Motion `motion.button` (or `motion.a` if href is provided). Apply `whileHover` scale 1.03 and `whileTap` scale 0.97 from `src/lib/animations.ts`. Add a glow pulse keyframe animation on hover for primary variant using a CSS class.

Include `aria-disabled` attribute when `disabled` is true. Add `focus-visible` ring in gold.

Export as default. Do not create any other components in this file.
```

### 3.4 — Card Component

```
In the Proximity Credit Repair project, create `src/components/ui/Card.tsx`.

This is the Card primitive used for service cards, testimonial cards, team cards, and value cards throughout the site.

Props (from `CardProps` in types):
- `variant`: 'dark' | 'light' — defaults to 'dark'
- `hover?`: boolean — enables lift animation on hover
- `children`: React.ReactNode
- `className?`: string

Variant styles:
- `dark`: background `bg-black-card`, border-top `border-t-2 border-gold-primary`, uses glassmorphism — `backdrop-blur-sm`, semi-transparent dark overlay, text `text-white`
- `light`: background `bg-white`, border `border border-gray-100`, rounded-card, text `text-text-body`

Both variants use `rounded-card` (16px), `shadow-gold-sm`.

When `hover` is true, wrap in `motion.div` with `whileHover` that applies `y: -6` and `shadow-gold-md` transition over 0.3s (use the `cardHover` animation from `src/lib/animations.ts`).

Use scroll-triggered entrance animation: use `useInView` from `react-intersection-observer` to trigger the `fadeUp` variant from `src/lib/animations.ts` when the card enters the viewport. Set `triggerOnce: true`.

Export as default.
```

### 3.5 — Badge Component

```
In the Proximity Credit Repair project, create `src/components/ui/Badge.tsx`.

Used for credit score before/after badges, category labels, and status chips.

Props:
- `variant`: 'gold' | 'success' | 'neutral' — defaults to 'gold'
- `size`: 'sm' | 'md'
- `children`: React.ReactNode
- `className?`: string

Styles:
- `gold`: `bg-gold-primary text-white rounded-pill font-heading font-bold`
- `success`: `bg-green-500 text-white rounded-pill font-bold`
- `neutral`: `bg-gray-100 text-text-muted rounded-pill`

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
- `register`: any (from react-hook-form's `register`)
- `required?`: boolean
- `className?`: string

Styling:
- Label: `font-body text-caption text-text-body font-semibold mb-1 block`
- Input field: full width, `border border-gray-200 rounded-lg px-4 py-3 text-body-base font-body`, `focus:outline-none focus:border-gold-primary focus:ring-2 focus:ring-gold-primary/20` transition
- Error state: border changes to `border-red-400`, show error text below in red `text-label`
- When no error: border is `border-gray-200`

Textarea.tsx: same props but renders `<textarea>` instead of `<input>`. Add `rows?` prop defaulting to 5.

Both components must use `React.forwardRef` for compatibility with react-hook-form.

Export each as default from their respective files.
```

### 3.7 — Select Component

```
In the Proximity Credit Repair project, create `src/components/ui/Select.tsx`.

Props:
- `label`: string
- `name`: string
- `options`: Array<{ value: string, label: string }>
- `error?`: string
- `register`: any
- `required?`: boolean
- `className?`: string
- `placeholder?`: string

Render a native `<select>` element styled to match the Input component. Options are rendered from the `options` prop array. Include a disabled placeholder option as the first option.

Style to match the Input component: same border, focus ring, gold focus border, error state.

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
- Use Framer Motion `AnimatePresence` to animate the modal in and out
- Backdrop: full-screen semi-transparent dark overlay (`bg-black/60 backdrop-blur-sm`) — clicking it calls `onClose`
- Modal panel: centered, `bg-black-card`, `rounded-card`, `border border-gold-primary/20`, max-width `max-w-lg`, `p-8`
- Entrance animation: fade in + scale from 0.95 to 1
- Close button (X icon from lucide-react) in top-right corner
- Trap focus inside modal when open using `tabIndex` management
- Add `role="dialog"` and `aria-modal="true"` for accessibility

Export as default.
```

### 3.9 — Toast Notification System

```
In the Proximity Credit Repair project, create `src/components/ui/Toast.tsx` and `src/components/ui/ToastContainer.tsx`.

Toast.tsx:
- Props: `item` (ToastItem from types), `onDismiss` (() => void)
- Variants: 'success' (green left border + check icon), 'error' (red left border + X icon), 'info' (gold left border + info icon) — all icons from lucide-react
- Background: `bg-black-card text-white`, `rounded-lg`, `shadow-gold-sm`, `p-4`
- Auto-dismiss after `item.duration` milliseconds using `useEffect`
- Framer Motion entrance: slide in from right, exit: slide out right

ToastContainer.tsx:
- Fixed positioned at bottom-right of screen (`fixed bottom-6 right-6 z-50`)
- Renders a list of `Toast` components using `AnimatePresence`
- Reads the toast queue from `uiStore` (which will be created in Phase 6 — use a placeholder import for now and note it needs to be connected)
- Stacks toasts vertically with `gap-3`

Export both as defaults.
```

### 3.10 — Section Divider & Label Components

```
In the Proximity Credit Repair project, create two small reusable components:

1. `src/components/ui/SectionDivider.tsx`:
   - Renders a full-width horizontal gold gradient line (`h-px w-full bg-gold-gradient`)
   - Props: `className?` (string)
   - Export as default

2. `src/components/ui/SectionLabel.tsx`:
   - Renders the small uppercase gold text labels used above section headings (e.g., "OUR SERVICES")
   - Props: `children` (React.ReactNode), `className?` (string)
   - Style: `font-heading font-semibold text-label tracking-widest uppercase text-gold-primary`
   - Export as default

3. Create `src/components/ui/index.ts` that re-exports all UI components:
   Button, Card, Badge, Input, Textarea, Select, Modal, Toast, ToastContainer, SectionDivider, SectionLabel
```

### 3.11 — Phase 3 Review & Fix

```
Review Phase 3 (Reusable UI Component Library) for the Proximity Credit Repair project:

1. Confirm these files exist with correct exports:
   - src/types/index.ts — all 9 interfaces defined
   - src/types/component-props.ts — BaseProps, ButtonProps, CardProps
   - src/lib/utils.ts — cn(), formatPhone(), truncate()
   - src/lib/validators.ts — contactFormSchema with all 5 fields and validation rules
   - src/lib/animations.ts — fadeUp, fadeIn, staggerContainer, cardHover, buttonHover
   - src/components/ui/Button.tsx — 3 variants, 3 sizes, Framer Motion effects
   - src/components/ui/Card.tsx — dark + light variants, hover lift, scroll animation
   - src/components/ui/Badge.tsx — 3 variants, 2 sizes
   - src/components/ui/Input.tsx — with error state, react-hook-form compatible
   - src/components/ui/Textarea.tsx — with error state
   - src/components/ui/Select.tsx — with options prop and error state
   - src/components/ui/Modal.tsx — animated, accessible
   - src/components/ui/Toast.tsx and ToastContainer.tsx — 3 variants, auto-dismiss
   - src/components/ui/SectionDivider.tsx and SectionLabel.tsx
   - src/components/ui/index.ts — all re-exports

2. Confirm no hardcoded hex color values in any of these files — all colors use Tailwind token names from tailwind.config.js

3. Confirm Framer Motion is used correctly in Button, Card, Modal, and Toast

4. Confirm react-hook-form compatibility in Input, Textarea, and Select (forwardRef)

5. Run TypeScript compiler (`npx tsc --noEmit`) and fix all type errors

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
- `ogImage?`: string — defaults to site default OG image path
- `canonicalPath?`: string — path appended to VITE_SITE_URL for canonical URL
- `schemaMarkup?`: object — JSON-LD schema to inject as a script tag

Implementation:
- Use `document.title` to set the browser tab title as `{title} | Proximity Credit Repair`
- Use `useEffect` to inject `<meta>` tags dynamically into `document.head` for:
  - `name="description"` — the description prop
  - `property="og:title"` — the full title
  - `property="og:description"` — the description
  - `property="og:image"` — ogImage
  - `property="og:url"` — canonical URL from VITE_SITE_URL + canonicalPath
  - `name="twitter:card"` — `summary_large_image`
  - `name="twitter:title"` — the full title
  - `name="twitter:description"` — the description
  - `rel="canonical"` link tag
- If `schemaMarkup` is provided, inject a `<script type="application/ld+json">` tag
- Clean up all injected tags in the useEffect return function to prevent duplicates on route change

Export as default.
```

### 4.2 — Navbar Component

```
In the Proximity Credit Repair project, create `src/components/layout/Navbar.tsx`.

This is the sticky top navigation bar. Requirements from the PRD:

Structure:
- Logo (left): Text "Proximity" in Montserrat ExtraBold with "Credit Repair" below in smaller Open Sans — the word "Proximity" uses the `.gold-gradient-text` class
- Nav links (center on desktop): Home, About, Services, How It Works, Testimonials, FAQ, Contact — use data from `src/data/navigation.ts` (import from there; create a placeholder export if the file doesn't exist yet)
- CTA Button (right): "Get Free Consultation" — uses the primary `Button` component from `src/components/ui`
- Mobile hamburger icon (right, hidden on desktop): uses `Menu` and `X` icons from lucide-react

Behavior:
- Sticky: `position: fixed`, `top: 0`, `width: 100%`, `z-index: 50`
- On scroll past 50px: add `backdrop-blur-md bg-black-near/80` and a subtle `border-b border-gold-primary/10`
- At top of page: fully transparent background
- Use the `useScrollPosition` custom hook from `src/hooks/useScrollPosition.ts` (create a simple placeholder if it doesn't exist — it returns scrollY as a number)
- Active nav link: gold color + underline to indicate current page using `useLocation` from react-router-dom

Mobile drawer:
- Full-screen slide-in from the right on hamburger click
- Background: `bg-black-near`, stacked nav links vertically with CTA at bottom
- Framer Motion: `AnimatePresence` with slide from `x: '100%'` to `x: 0`
- Close on nav link click or X button click
- Connect open/close state to `uiStore.mobileMenuOpen` (use local state as placeholder until Phase 6 store is built)

Accessibility: `aria-expanded` on hamburger, `role="navigation"`, focus trap in mobile drawer.

Export as default.
```

### 4.3 — Footer Component

```
In the Proximity Credit Repair project, create `src/components/layout/Footer.tsx`.

PRD specification: 4-column layout on desktop, stacked on mobile.

Column 1 — Logo + Tagline:
- Same logo treatment as Navbar (Proximity in gold gradient, Credit Repair below)
- Tagline: "Rebuilding credit. Rebuilding lives." in `text-text-muted font-body`
- Social media icon row below tagline: Facebook, Instagram, Twitter, LinkedIn — use lucide-react icons, gold color on hover

Column 2 — Quick Links:
- Heading: "Quick Links" in gold
- Links: Home, About, Services, How It Works, Testimonials, FAQ, Contact

Column 3 — Services:
- Heading: "Our Services" in gold
- Links: Credit Analysis, Dispute Filing, Score Monitoring, Debt Validation

Column 4 — Contact Info:
- Heading: "Contact Us" in gold
- Phone with Phone icon from lucide-react
- Email with Mail icon
- Address with MapPin icon
- All icons are `text-gold-primary`

Bottom bar:
- Full-width gold gradient line divider
- Left: `© 2025 Proximity Credit Repair. All rights reserved.`
- Right: Legal disclaimer: "Results may vary. We do not guarantee specific credit score improvements." in `text-text-muted text-label italic`

Full footer background: `bg-black-near`, text `text-white`

Export as default.
```

### 4.4 — PageWrapper & Section Components

```
In the Proximity Credit Repair project, create the following layout wrappers:

1. `src/components/layout/PageWrapper.tsx`:
   - Wraps every page's content
   - Applies `min-h-screen bg-white` (or passes `dark` prop for `bg-black-near`)
   - Adds `pt-20` top padding to account for the fixed navbar height
   - Renders `<main>` semantic HTML element
   - Props: `children`, `className?`, `dark?` (boolean)
   - Export as default

2. `src/components/layout/Section.tsx`:
   - Reusable section wrapper with consistent spacing
   - Props: `children`, `className?`, `id?`, `dark?` (boolean), `alt?` (boolean for off-white bg)
   - `dark`: background `bg-black-near`, text `text-white`
   - `alt`: background `bg-white-off`
   - Default: `bg-white`
   - Always applies `section-padding` class and a `<section>` semantic element
   - Wraps inner content in `<div class="container mx-auto">` for consistent max-width + centering
   - Export as default

3. `src/components/layout/AppLayout.tsx`:
   - The top-level layout rendered in the router that includes `<Navbar />`, `<Outlet />` (from react-router-dom), `<Footer />`, and `<ToastContainer />`
   - Also renders the `BackToTopButton` component (create `src/components/ui/BackToTopButton.tsx`):
     - Fixed bottom-right: `fixed bottom-6 right-6 z-40`
     - A gold circle button with `ChevronUp` icon from lucide-react
     - Only appears after scrolling 400px (`useScrollPosition` hook)
     - Clicking it calls `window.scrollTo({ top: 0, behavior: 'smooth' })`
     - Framer Motion: fade in/out with `AnimatePresence`
   - Export AppLayout as default

4. Create `src/components/layout/index.ts` re-exporting Navbar, Footer, PageWrapper, Section, AppLayout.
```

### 4.5 — Router Setup

```
In the Proximity Credit Repair project, update `src/main.tsx` and create `src/App.tsx` to configure the full React Router v6 routing system.

In `src/App.tsx`:
- Import `createBrowserRouter` and `RouterProvider` from react-router-dom
- Define all 9 routes using lazy-loaded page components with `React.lazy()` + `Suspense`:
  - `/` → `pages/Home.tsx`
  - `/about` → `pages/About.tsx`
  - `/services` → `pages/Services.tsx`
  - `/how-it-works` → `pages/HowItWorks.tsx`
  - `/testimonials` → `pages/Testimonials.tsx`
  - `/faq` → `pages/FAQ.tsx`
  - `/contact` → `pages/Contact.tsx`
  - `*` → `pages/NotFound.tsx`
- All page routes are children of the `AppLayout` route (from `src/components/layout/AppLayout.tsx`) as the parent layout route using `<Outlet />`
- Wrap all lazy routes in a `<Suspense>` fallback that shows a full-screen loading spinner with a gold pulsing Proximity logo (create `src/components/ui/LoadingScreen.tsx` — a full-screen centered div with `bg-black-near`, the Proximity wordmark in the gold gradient text class, and a Framer Motion pulsing animation)
- Add Framer Motion `AnimatePresence` on the router outlet to handle page transitions: fade + slight upward slide (y: 20 → 0, opacity 0 → 1, duration 0.4s) between route changes. Use `useLocation` key on the motion wrapper.

Create placeholder files for each page (`src/pages/Home.tsx`, etc.) that export a basic `<div>Page Name</div>` — these will be filled in Phase 7.

Create `src/pages/NotFound.tsx` fully now: on-brand 404 page with `bg-black-near`, large "404" in gold gradient text, headline "Page Not Found", subtext, and a primary `Button` linking back to `/`.

Confirm routing works and all page placeholders render without errors.
```

### 4.6 — Custom Hooks

```
In the Proximity Credit Repair project, create the following custom hooks in `src/hooks/`:

1. `useScrollPosition.ts`:
   - Uses `useState` and `useEffect` to track `window.scrollY`
   - Adds a throttled scroll event listener (throttle to 16ms using setTimeout)
   - Returns: `{ scrollY: number, isScrolled: boolean }` where `isScrolled` is true when scrollY > 50
   - Cleans up the event listener on unmount

2. `useMediaQuery.ts`:
   - Takes a media query string as a parameter (e.g., `'(max-width: 768px)'`)
   - Uses `window.matchMedia` and an event listener to reactively return a boolean
   - Returns: `boolean` (whether the query matches)
   - Exports a `useIsMobile()` convenience hook that uses `useMediaQuery('(max-width: 768px)')`

3. `useCountUp.ts`:
   - Takes: `end` (number), `duration?` (number, default 2000ms), `start?` (number, default 0)
   - Returns: `{ count: number, ref: React.RefObject<HTMLElement> }`
   - Uses `react-intersection-observer` — only starts counting when the referenced element enters the viewport (triggerOnce: true)
   - Animates from `start` to `end` over `duration` using `requestAnimationFrame` with an easing function

4. `src/hooks/index.ts` — re-export all three hooks.
```

### 4.7 — Phase 4 Review & Fix

```
Review Phase 4 (Layout & Navigation Components) for the Proximity Credit Repair project:

1. Confirm SEOHead.tsx injects and cleans up all required meta tags on route change
2. Open the app in the browser and confirm the Navbar renders with the Proximity logo in gold gradient text
3. Resize to mobile and confirm the hamburger menu appears and the slide-in drawer works
4. Confirm the Navbar becomes blurred/dark on scroll using useScrollPosition
5. Confirm the Footer renders with all 4 columns, the legal disclaimer, and the social icons
6. Confirm all 9 routes load without errors (check browser console)
7. Confirm page transitions animate between routes using Framer Motion AnimatePresence
8. Confirm the BackToTopButton appears after scrolling 400px and scrolls to top when clicked
9. Confirm the LoadingScreen appears briefly while lazy routes load
10. Run `npx tsc --noEmit` and fix all TypeScript errors
11. Check browser console for zero errors and zero warnings

Fix all issues before proceeding.
```

---

## Phase 5 — Data & Content Layer

### 5.1 — Navigation Data

```
In the Proximity Credit Repair project, create `src/data/navigation.ts`.

Export:
- `navLinks`: NavLink[] — array of 7 nav links with label and href matching the PRD URL structure:
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
```

### 5.2 — Site Metadata & Config

```
In the Proximity Credit Repair project, create the following config files:

1. `src/config/siteMetadata.ts`:
   Export a `siteMetadata` object (typed as SiteMetadata):
   - siteTitle: 'Proximity Credit Repair'
   - siteDescription: 'Expert credit repair services that deliver real results. Join 10,000+ clients who have improved their credit scores with Proximity.'
   - siteUrl: `${import.meta.env.VITE_SITE_URL || 'https://proximitycreditrepair.com'}`
   - ogImage: '/og-image.jpg'
   - twitterHandle: '@proximitycredit'

2. `src/config/theme.ts`:
   Export a `theme` object with all brand color hex values (matching tailwind.config.js tokens) and gradient strings for any runtime usage (e.g., in canvas or SVG elements):
   - colors: { goldPrimary, goldLight, goldDark, pureWhite, offWhite, nearBlack, cardBlack, bodyText, mutedText }
   - gradients: { gold, heroGradient, goldGlow }

3. `src/config/index.ts`:
   Re-export siteMetadata and theme.
```

### 5.3 — Services Data

```
In the Proximity Credit Repair project, create `src/data/services.ts`.

Export a `services` array typed as `Service[]` with 4 service objects matching the PRD exactly:

1. Credit Analysis
   - id: 'credit-analysis'
   - title: 'Credit Analysis'
   - icon: 'BarChart2' (lucide-react icon name as string)
   - shortDescription: 'A thorough review of your full credit report to identify errors, negative items, and opportunities for improvement.'
   - description: Full paragraph (2–3 sentences) in professional, empowering tone per PRD content guidelines
   - benefits: 5 bullet strings (e.g., 'Identify all negative items dragging your score down', 'Spot reporting errors and inaccuracies', etc.)

2. Dispute Filing
   - id: 'dispute-filing'
   - icon: 'FileText'
   - shortDescription: 'We draft and submit expert dispute letters to all three credit bureaus on your behalf.'
   - description: Full paragraph
   - benefits: 5 bullets

3. Score Monitoring
   - id: 'score-monitoring'
   - icon: 'TrendingUp'
   - shortDescription: 'Real-time alerts and monthly reports so you always know exactly where your credit stands.'
   - description: Full paragraph
   - benefits: 5 bullets

4. Debt Validation
   - id: 'debt-validation'
   - icon: 'Shield'
   - shortDescription: 'We demand proof that collectors have the legal right to collect — and challenge what they cannot verify.'
   - description: Full paragraph
   - benefits: 5 bullets

All copy must match the PRD tone: professional, empowering, never salesy.
```

### 5.4 — Testimonials Data

```
In the Proximity Credit Repair project, create `src/data/testimonials.ts`.

Export a `testimonials` array typed as `Testimonial[]` with 8 client testimonials.

Each testimonial must include:
- id: unique string
- clientName: first name only (e.g., 'Marcus', 'Jennifer')
- city: US city (e.g., 'Atlanta, GA')
- beforeScore: realistic starting score (520–640 range)
- afterScore: improved score 60–150 points higher than before
- rating: 5 (all five-star)
- text: 2–3 sentence testimonial in first person, professional tone per PRD voice guidelines. Reference specific results (score improvement, time frame). Use words from the PRD power word list: proven, trusted, expert, results-driven, transparent, dedicated, certified.
- featured: set 2 of the 8 as `true` for the featured video placeholder cards

All content must be realistic and non-fabricated as business testimonials (clearly fictional for demo purposes).
```

### 5.5 — FAQs Data

```
In the Proximity Credit Repair project, create `src/data/faqs.ts`.

Export a `faqs` array typed as `FAQItem[]` with exactly 10 items.

Category 1: 'about-credit-repair' (5 questions)
1. What is credit repair and how does it work?
2. How long does it take to see results?
3. Can I repair my credit myself without a service?
4. Will credit repair hurt my credit score?
5. What types of negative items can be removed?

Category 2: 'working-with-proximity' (5 questions)
6. What makes Proximity Credit Repair different?
7. How much does Proximity Credit Repair cost?
8. What information do I need to get started?
9. Is Proximity Credit Repair compliant with federal regulations?
10. What happens if a dispute is not successful?

For each: write a professional, thorough 2–4 sentence answer in the PRD tone. The answer for question 2 must reference a typical timeline range (e.g., "30–180 days depending on the complexity"). The answer for question 9 must reference CROA (Credit Repair Organizations Act) compliance.
```

### 5.6 — Team & Stats Data

```
In the Proximity Credit Repair project, create:

1. `src/data/team.ts`:
   Export a `teamMembers` array typed as `TeamMember[]` with 4 members:
   - Marcus Williams — CEO & Founder, 12 years of experience, brief inspiring bio
   - Jennifer Rodriguez — Chief Credit Strategist, FICO certified, bio
   - David Chen — Lead Dispute Specialist, former credit bureau analyst, bio
   - Aisha Thompson — Client Success Manager, dedicated to client journeys, bio
   All `photoUrl` values set to placeholder: `/assets/team/placeholder.jpg`

2. `src/data/stats.ts`:
   Export a `stats` array typed as `Stat[]` with exactly 3 stat items matching the PRD Trust Bar:
   - { label: 'Clients Helped', value: 10000, suffix: '+', icon: 'Users' }
   - { label: 'Success Rate', value: 95, suffix: '%', icon: 'TrendingUp' }
   - { label: 'in Debt Resolved', value: 2000000, suffix: '+', icon: 'DollarSign' }

3. `src/data/index.ts`:
   Re-export all data arrays from a single entry point: services, testimonials, faqs, teamMembers, stats, navLinks, footerServiceLinks.
```

### 5.7 — Phase 5 Review & Fix

```
Review Phase 5 (Data & Content Layer) for the Proximity Credit Repair project:

1. Confirm all data files exist and export typed arrays:
   - src/data/navigation.ts — navLinks (7), footerServiceLinks (4)
   - src/config/siteMetadata.ts — siteMetadata object with all 5 fields
   - src/config/theme.ts — colors and gradients objects
   - src/data/services.ts — 4 services with id, icon, shortDescription, description, benefits[]
   - src/data/testimonials.ts — 8 testimonials with all required fields, 2 featured
   - src/data/faqs.ts — 10 FAQs in 2 categories (5 each)
   - src/data/team.ts — 4 team members
   - src/data/stats.ts — 3 stat items matching PRD Trust Bar values

2. Confirm src/data/index.ts re-exports all arrays

3. Run `npx tsc --noEmit` and confirm all data files are type-safe with zero errors

4. Confirm no data file contains any JSX or component code — pure TypeScript data only

5. Confirm tone and content of testimonials, FAQs, and service copy match the PRD voice guidelines

Fix all issues before proceeding.
```

---

## Phase 6 — State Management

### 6.1 — UI Store (Zustand)

```
In the Proximity Credit Repair project, create `src/store/uiStore.ts`.

Use Zustand to create a store managing all UI-related global state as defined in the PRD.

State and actions to include:
- `mobileMenuOpen`: boolean — default false
  - `openMobileMenu()`: sets to true
  - `closeMobileMenu()`: sets to false
  - `toggleMobileMenu()`: toggles

- `scrollY`: number — default 0
  - `setScrollY(y: number)`: sets scrollY value

- `activeNavItem`: string — default '/'
  - `setActiveNavItem(href: string)`: sets active nav

- `toastQueue`: ToastItem[] — default []
  - `addToast(toast: Omit<ToastItem, 'id'>)`: generates a unique id (Date.now().toString()), adds to queue
  - `removeToast(id: string)`: removes toast by id

Type the store using a TypeScript interface `UIStore` defined at the top of the file (import ToastItem from `src/types`).

Export the store as `useUIStore` using the standard Zustand `create` function.

After creating the store, go back and update the following files to connect them to the store (replacing local state placeholders):
- `src/components/layout/Navbar.tsx`: replace local mobileMenuOpen state with `useUIStore`
- `src/components/ui/ToastContainer.tsx`: connect to `toastQueue` and `removeToast` from `useUIStore`
- `src/components/ui/BackToTopButton.tsx` (if using scroll state from store): connect scrollY
```

### 6.2 — Form Store (Zustand)

```
In the Proximity Credit Repair project, create `src/store/formStore.ts`.

Use Zustand to create a store managing all contact form state as defined in the PRD.

State and actions:
- `submissionStatus`: 'idle' | 'loading' | 'success' | 'error' — default 'idle'
  - `setSubmissionStatus(status)`: sets status
- `validationErrors`: Record<string, string> — default {}
  - `setValidationErrors(errors)`: sets errors object
  - `clearValidationErrors()`: resets to {}
- `formData`: Partial<ContactFormData> — default {}
  - `setFormData(data: Partial<ContactFormData>)`: merges data
  - `resetForm()`: resets all state to defaults

Type the store using a TypeScript interface `FormStore`.

Export as `useFormStore`.

Create `src/store/index.ts` re-exporting `useUIStore` and `useFormStore`.
```

### 6.3 — Services Layer

```
In the Proximity Credit Repair project, create the API service layer files.

1. `src/services/contactService.ts`:
   - Export an async function `submitContactForm(data: ContactFormData): Promise<{ success: boolean, message: string }>`
   - Implementation: make a POST request to `import.meta.env.VITE_CONTACT_API_URL` with the form data as JSON
   - If `VITE_CONTACT_API_URL` is empty/undefined, simulate success after a 1500ms delay (for development)
   - Handle network errors and return `{ success: false, message: 'Something went wrong...' }` on failure
   - All types from `src/types/index.ts`

2. `src/services/analyticsService.ts`:
   - Export stub functions for future analytics integration:
     - `trackPageView(page: string): void`
     - `trackEvent(event: string, properties?: Record<string, unknown>): void`
   - Both functions check if `import.meta.env.VITE_ANALYTICS_ID` is set; if yes, log to console with the ID prefix; if no, silently no-op.

3. `src/services/index.ts`:
   Re-export both services.
```

### 6.4 — Phase 6 Review & Fix

```
Review Phase 6 (State Management) for the Proximity Credit Repair project:

1. Confirm `src/store/uiStore.ts` exists and exports `useUIStore` with all specified state fields and actions
2. Confirm `src/store/formStore.ts` exists and exports `useFormStore` with all specified state fields and actions
3. Confirm `src/store/index.ts` re-exports both stores
4. Confirm Navbar.tsx now uses `useUIStore` for mobileMenuOpen state (not local React state)
5. Confirm ToastContainer.tsx reads from `useUIStore.toastQueue`
6. Confirm `src/services/contactService.ts` has the dev simulation fallback when VITE_CONTACT_API_URL is empty
7. Confirm `src/services/analyticsService.ts` has both stub functions
8. Run `npx tsc --noEmit` — zero TypeScript errors
9. Open the app in the browser, open the mobile drawer, confirm it opens/closes correctly via the store
10. Trigger a test toast by temporarily calling `useUIStore.getState().addToast()` in a component and confirm it appears and auto-dismisses

Fix all issues before proceeding.
```

---

## Phase 7 — Page & Feature Development

### 7.1 — Home Page: Hero Section

```
In the Proximity Credit Repair project, build the Hero section for the Home page. Create `src/components/sections/HeroSection.tsx`.

This is the most important section — it must be visually stunning.

Requirements from PRD:
- Full viewport height (`min-h-screen`), background uses the `hero-gradient` Tailwind token
- Gold radial glow (`bg-gold-glow`) centered behind the headline area
- Animated floating gold particle dots: create 12–15 small circles (`w-1.5 h-1.5 rounded-full bg-gold-primary/30`) positioned absolutely with randomized positions. Use Framer Motion to give each a floating animation: `y: [0, -20, 0]` with `repeat: Infinity` and slightly varied `duration` (3–6s) and `delay` values.
- Main headline: "Rebuild Your Credit. Reclaim Your Life." — Use Framer Motion to animate each word in with a stagger (each word fades up with 0.1s delay between words, using the `fadeUp` variant from `src/lib/animations.ts`). Style: `font-heading font-black text-h1 text-white` on desktop.
- Subheadline below: "Proven strategies. Transparent process. Real results." in `text-subheading font-body text-text-muted`
- Two CTA buttons side by side:
  - Primary `Button`: "Get Your Free Consultation" — links to `/contact`
  - Secondary `Button`: "See How It Works" — links to `/how-it-works`
- Scroll-down chevron: `ChevronDown` icon from lucide-react, centered at bottom of hero, Framer Motion bounce animation `y: [0, 8, 0]` infinite
- Trust Bar directly below the hero content (still inside the dark hero section): 3 stat counters in a row inside a `rounded-card border border-gold-primary/20 bg-black-card/60 backdrop-blur-sm` container. Each stat uses the `useCountUp` hook from `src/hooks`. Display value + suffix (e.g., "10,000+"), label below, and the lucide-react icon above in gold. Import stat data from `src/data/stats.ts`.

Use the `Section` layout component for structure. Import and use `SectionLabel` and `Button` from `src/components/ui`.
```

### 7.2 — Home Page: Services Preview, How It Works Strip

```
In the Proximity Credit Repair project, build two more Home page sections:

1. Create `src/components/sections/ServicesPreview.tsx`:
   - Background: `bg-black-near` (dark section)
   - SectionLabel: "OUR SERVICES"
   - Heading: "Everything You Need to Restore Your Credit" (gold gradient on "Restore Your Credit")
   - 4 service cards in a responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`)
   - Each card uses the `Card` component (dark variant, hover enabled) with:
     - Icon from lucide-react (use the icon name string from `services` data — dynamically resolve the icon component)
     - Service title
     - shortDescription
     - "Learn More →" link using `react-router-dom` Link to `/services#{service.id}`
   - Import services data from `src/data/services.ts`
   - Stagger the card entrance animations using `staggerContainer` from `src/lib/animations.ts`

2. Create `src/components/sections/HowItWorksStrip.tsx`:
   - Background: `bg-white-off`
   - SectionLabel: "THE PROCESS"
   - Heading: "Four Simple Steps to a Better Score"
   - Horizontal 4-step flow on desktop, vertical on mobile
   - Steps: 1. Free Consultation, 2. Full Credit Review, 3. Dispute & Repair, 4. Monitor Your Progress
   - Each step: gold numbered circle (`w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center font-heading font-black text-white`), title, one-sentence description
   - Between steps (desktop only): horizontal connecting gold line (`h-px bg-gold-gradient flex-1`)
   - Each step animates in sequentially on scroll using `useInView` with staggered delay (0.15s per step)
   - "See Full Details" button at bottom linking to `/how-it-works`
```

### 7.3 — Home Page: Testimonials Slider & Final CTA

```
In the Proximity Credit Repair project, build the final two Home page sections:

1. Create `src/components/sections/TestimonialsSlider.tsx`:
   - Background: `bg-black-near`
   - SectionLabel: "CLIENT SUCCESS STORIES"
   - Heading: "Real People. Real Results."
   - Auto-rotating carousel: cycles through testimonials from `src/data/testimonials.ts` every 5 seconds
   - Display 1 testimonial at a time on mobile, 3 on desktop (use `useIsMobile` hook)
   - Each testimonial card (dark `Card` component):
     - Before/after credit score badges side by side: `Badge` component (neutral for before, success for after)
     - 5-star rating using Star icons from lucide-react filled in gold
     - Testimonial text with large decorative `"` quotation mark in the background (gold, large font, low opacity)
     - Client first name + city in caption style
   - Navigation: left/right chevron buttons + dot indicators below
   - Framer Motion: smooth slide + fade between slides using `AnimatePresence` with `mode="wait"`
   - Auto-advance with `useEffect` + `setInterval`, pauses on user hover

2. Create `src/components/sections/FinalCTABand.tsx`:
   - Full-width dark section (`bg-black-near`)
   - Large centered headline: "Your Better Credit Score Starts Today" — headline text uses `.gold-gradient-text` class
   - Subtext: "Join 10,000+ clients who transformed their financial future with Proximity."
   - Single primary `Button`: "Start Your Free Consultation" linking to `/contact`
   - Framer Motion: section fades up on scroll enter
```

### 7.4 — Assemble Home Page

```
In the Proximity Credit Repair project, replace the placeholder `src/pages/Home.tsx` with the complete Home page.

Import and render these sections in order:
1. `SEOHead` with:
   - title: 'Expert Credit Repair Services'
   - description: from siteMetadata.siteDescription
   - canonicalPath: '/'
   - schemaMarkup: a LocalBusiness JSON-LD object with name: 'Proximity Credit Repair', url from siteMetadata.siteUrl, serviceType: 'Credit Repair Service', areaServed: 'United States'
2. `HeroSection`
3. `ServicesPreview`
4. `HowItWorksStrip`
5. `TestimonialsSlider`
6. `FinalCTABand`

Wrap everything in the `PageWrapper` component with `dark` prop set to false (the hero handles its own dark bg).

Confirm the Home page renders all sections correctly, animations fire on scroll, stat counters count up, and the testimonial slider auto-rotates.
```

### 7.5 — About Us Page

```
In the Proximity Credit Repair project, build the complete About Us page.

Replace `src/pages/About.tsx` with a fully built page. Create section components in `src/components/sections/` as needed.

Sections to build:

1. Sub-hero banner: `bg-hero-gradient`, page title "About Us" in `text-h2 font-heading font-black text-white`, breadcrumb "Home / About"

2. Mission Statement Section (`bg-white`):
   - Gold vertical accent bar (`w-1.5 h-full bg-gold-gradient`) left of a large blockquote-style paragraph
   - Mission copy: "At Proximity Credit Repair, our mission is to empower individuals to take control of their financial future through expert guidance, proven strategies, and unwavering dedication." — `text-h3 font-heading font-semibold text-text-body`

3. Core Values Section (`bg-black-near`):
   - SectionLabel: "OUR VALUES"
   - Heading: "What Drives Everything We Do"
   - 4 cards (dark `Card`, hover enabled) in a 2x2 grid:
     - Transparency — Shield icon
     - Expertise — Award icon
     - Results — TrendingUp icon
     - Dedication — Heart icon
   - Each: icon in gold, heading, 2-sentence description

4. Team Section (`bg-white-off`):
   - SectionLabel: "OUR TEAM"
   - Heading: "Meet the Experts"
   - 4 team photo cards in a responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`)
   - Each card: photo placeholder (gray rounded-card bg), name in `font-heading font-bold`, title in `text-gold-primary text-caption`
   - Framer Motion: gold overlay fades in on hover showing a short bio excerpt
   - Import data from `src/data/team.ts`

5. `SEOHead`: title 'About Us', description relevant to page, canonicalPath '/about', schema: Organization type

Wrap in `PageWrapper`. Confirm all sections render and animations work.
```

### 7.6 — Services Page

```
In the Proximity Credit Repair project, build the complete Services page.

Replace `src/pages/Services.tsx`.

Sections:

1. Sub-hero banner: same style as About page. Title: "Our Services". Breadcrumb: "Home / Services"

2. Services Detail Section (`bg-white-off` alternating with `bg-white`):
   - For each of the 4 services (from `src/data/services.ts`), render a full-detail section:
     - Alternating layout: icon + title + description on left, benefit bullets on right (reverse for even-numbered items)
     - Icon from lucide-react (large, gold, `w-16 h-16`)
     - Title as `text-h3 font-heading font-bold`
     - Full `description` paragraph
     - Benefit bullets: each with a `CheckCircle` icon from lucide-react in gold + text
     - Section `id` attribute set to `service.id` for hash link navigation
   - Light `Card` component wraps each service entry
   - Scroll-triggered `fadeUp` animation per item

3. Bottom CTA strip (`bg-black-near`):
   - Text: "Not sure where to start? Talk to an expert."
   - Primary `Button` linking to `/contact`: "Get Free Consultation"

4. `SEOHead`: title 'Credit Repair Services', appropriate description, canonicalPath '/services', schema: Service type for each of the 4 services

Wrap in `PageWrapper`.
```

### 7.7 — How It Works Page

```
In the Proximity Credit Repair project, build the complete How It Works page.

Replace `src/pages/HowItWorks.tsx`.

Sections:

1. Sub-hero banner: Title: "How It Works", Breadcrumb: "Home / How It Works"

2. Timeline Section (`bg-white`):
   - SectionLabel: "THE PROCESS"
   - Heading: "Four Steps to a Better Credit Score"
   - Large vertical timeline on mobile, horizontal on desktop (use CSS media queries and Tailwind responsive prefixes)
   - 4 steps with the exact PRD content:
     - Step 1: Free Consultation — "We start with a no-obligation call to understand your credit situation and goals."
     - Step 2: Full Credit Review — "We analyze all three credit reports to identify every error, negative item, and opportunity."
     - Step 3: Dispute & Repair — "We draft expert dispute letters and submit them to the bureaus on your behalf."
     - Step 4: Monitor Your Progress — "We track every change and keep you informed throughout the entire process."
   - Each step: large gold numbered circle (same style as HowItWorksStrip), lucide-react icon, title in `text-h3`, 2–3 sentence description
   - Connecting vertical line on mobile, horizontal on desktop — `bg-gold-gradient` line between steps
   - Framer Motion: each step sequentially fades in using `useInView` with 0.2s stagger

3. Final CTA strip same as Services page

4. `SEOHead`: title 'How Credit Repair Works', appropriate description, canonicalPath '/how-it-works'

Wrap in `PageWrapper`.
```

### 7.8 — Testimonials Page

```
In the Proximity Credit Repair project, build the complete Testimonials page.

Replace `src/pages/Testimonials.tsx`.

Sections:

1. Sub-hero banner: Title: "Client Success Stories", Breadcrumb: "Home / Testimonials"

2. Trust Badges Row (`bg-white`):
   - Row of 3 trust badge placeholder cards (BBB Accredited, Google Reviews, Trustpilot-style)
   - Each: rounded-card, light Card, icon (Award, Star, ThumbsUp from lucide-react), badge name, and "5.0 / 5.0" rating

3. Testimonials Grid (`bg-white-off`):
   - SectionLabel: "WHAT OUR CLIENTS SAY"
   - Heading: "Real Results from Real People"
   - Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop
   - All 8 testimonials from `src/data/testimonials.ts`
   - Each card (dark `Card`, hover): before/after `Badge` pair, star rating, testimonial text, client name + city
   - Stagger entrance animation on scroll

4. Featured Video Testimonial (`bg-black-near`):
   - SectionLabel: "FEATURED STORY"
   - Dark card with a video placeholder: `bg-black-card`, `rounded-card`, aspect-ratio 16:9
   - Centered `PlayCircle` icon from lucide-react (`w-20 h-20 text-gold-primary`)
   - Caption below: "Watch Marcus's story — from 512 to 743 in 6 months"

5. `SEOHead`: title 'Client Testimonials & Success Stories', canonicalPath '/testimonials'

Wrap in `PageWrapper`.
```

### 7.9 — FAQ Page

```
In the Proximity Credit Repair project, build the complete FAQ page.

Replace `src/pages/FAQ.tsx`.

Sections:

1. Sub-hero banner: Title: "Frequently Asked Questions", Breadcrumb: "Home / FAQ"

2. FAQ Accordion Section (`bg-white`):
   - SectionLabel: "HAVE QUESTIONS?"
   - Heading: "Everything You Need to Know"
   - Two category groups rendered separately, each with a category heading:
     - "About Credit Repair" — 5 questions from category 'about-credit-repair'
     - "Working with Proximity" — 5 questions from category 'working-with-proximity'
   - Each FAQ item:
     - Question row: clickable, displays question text + `ChevronDown` icon on the right
     - `ChevronDown` rotates 180° when open using Framer Motion `animate={{ rotate: isOpen ? 180 : 0 }}`
     - Answer: animated height expand/collapse using Framer Motion `AnimatePresence` + `motion.div` with `initial={{ height: 0 }}` and `animate={{ height: 'auto' }}`
     - Light gold bottom border `border-b border-gold-primary/20` between items
   - Only one item can be open at a time (accordion behavior — clicking an open item closes it)
   - Import FAQ data from `src/data/faqs.ts`

3. Bottom CTA (`bg-white-off`):
   - "Still have questions? We're here to help."
   - Secondary `Button` linking to `/contact`: "Contact Us"

4. `SEOHead`: title 'FAQ — Credit Repair Questions Answered', canonicalPath '/faq', schemaMarkup: FAQPage JSON-LD with all 10 Q&As

Wrap in `PageWrapper`.
```

### 7.10 — Contact Page

```
In the Proximity Credit Repair project, build the complete Contact page.

Replace `src/pages/Contact.tsx`.

Layout: Split two-column on desktop (left: contact info, right: form), stacked on mobile.

Left Column — Contact Info:
- SectionLabel: "GET IN TOUCH"
- Heading: "Let's Start Your Credit Journey"
- Phone: `(800) 555-0192` with `Phone` icon (gold)
- Email: `hello@proximitycreditrepair.com` with `Mail` icon (gold)
- Address: `123 Financial Plaza, Suite 400, Atlanta, GA 30301` with `MapPin` icon (gold)
- Map placeholder below contact info: `bg-black-card rounded-card h-56` with `Map` icon centered and caption "Interactive map coming soon"

Right Column — Contact Form:
- Light `Card` component wrapping the form
- Form fields using `Input`, `Textarea`, and `Select` components from `src/components/ui`:
  - Full Name (required)
  - Email (required)
  - Phone (required)
  - Service of Interest (dropdown using `Select` — options: 'Credit Analysis', 'Dispute Filing', 'Score Monitoring', 'Debt Validation', 'Not Sure')
  - Message (required, `Textarea`)
- Wire form using `react-hook-form` with `zodResolver(contactFormSchema)` from `src/lib/validators.ts`
- Submit button: primary `Button` type="submit" "Send Message" — shows loading spinner (Loader2 icon from lucide-react spinning) while `submissionStatus === 'loading'` from `useFormStore`
- On submit: call `contactService.submitContactForm(data)`, update `useFormStore.submissionStatus`
- Success state: replace form with animated gold checkmark (`CheckCircle` icon, `w-20 h-20 text-gold-primary`) + Framer Motion scale-in animation + "Thank you! We'll be in touch within 24 hours." message. Also trigger `useUIStore.addToast({ message: 'Message sent! We will contact you shortly.', type: 'success', duration: 5000 })`
- Error state: show error toast

`SEOHead`: title 'Contact Us — Start Your Free Consultation', canonicalPath '/contact'

Wrap in `PageWrapper`.
```

### 7.11 — Phase 7 Review & Fix

```
Review Phase 7 (Page & Feature Development) for the Proximity Credit Repair project:

1. Navigate to every page in the browser and confirm it renders correctly:
   - / (Home): Hero, Services Preview, How It Works Strip, Testimonials Slider, Final CTA Band
   - /about: Sub-hero, Mission, Core Values, Team section
   - /services: Sub-hero, 4 detailed service sections with hash IDs, Bottom CTA
   - /how-it-works: Sub-hero, 4-step timeline with connecting lines
   - /testimonials: Trust badges, testimonials grid, video placeholder
   - /faq: Two category accordion sections, Bottom CTA — confirm only one accordion item opens at a time
   - /contact: Split layout, form validation, success/error states

2. Confirm all scroll animations fire correctly (sections fade up on enter)
3. Confirm stat counters count up on the Home page Hero
4. Confirm the testimonial slider auto-rotates every 5 seconds
5. Submit the contact form with invalid data — confirm all Zod validation errors appear inline
6. Submit the contact form with valid data — confirm success state shows and toast appears
7. Confirm all data comes from `src/data/` files — no hardcoded content in page or section files
8. Confirm all Tailwind classes use token names, no hardcoded hex colors
9. Open browser DevTools — confirm zero console errors and zero console warnings
10. Check all internal links navigate correctly

Fix all issues before proceeding.
```

---

## Phase 8 — Animations & Micro-interactions Polish

### 8.1 — Page Transition Animation

```
In the Proximity Credit Repair project, refine the page transition animation in `src/App.tsx`.

Ensure the following:
1. `AnimatePresence` wraps the router outlet with `mode="wait"` so the outgoing page fully exits before the new page enters
2. Each page is wrapped in a `motion.div` with:
   - `initial`: `{ opacity: 0, y: 20 }`
   - `animate`: `{ opacity: 1, y: 0 }`
   - `exit`: `{ opacity: 0, y: -10 }`
   - `transition`: `{ duration: 0.4, ease: 'easeInOut' }`
3. The `key` prop on the motion wrapper is `useLocation().pathname` so transitions fire on every route change
4. The scroll position resets to top on every route change — add a `ScrollToTop` component that uses `useEffect` + `useLocation` to call `window.scrollTo(0, 0)` on pathname change. Render it inside `AppLayout`.

Navigate between all pages in the browser and confirm smooth fade transitions with zero flicker.
```

### 8.2 — Loading Screen Animation

```
In the Proximity Credit Repair project, refine `src/components/ui/LoadingScreen.tsx`.

The loading screen appears briefly while lazy-loaded page chunks download. Make it polished:

1. Full-screen centered layout: `bg-black-near min-h-screen flex items-center justify-center`
2. Logo text: "Proximity" in Montserrat ExtraBold using `.gold-gradient-text`, with "Credit Repair" below in Open Sans white
3. Framer Motion animation on the logo:
   - Starts at `opacity: 0, scale: 0.9`
   - Animates to `opacity: 1, scale: 1` with `duration: 0.5`
4. Below the logo: three animated gold dots (`w-2 h-2 rounded-full bg-gold-primary`) with staggered `y: [0, -8, 0]` bounce animations to indicate loading

Confirm this renders correctly when navigating to a page for the first time.
```

### 8.3 — Micro-interaction Polish Pass

```
In the Proximity Credit Repair project, do a complete micro-interaction polish pass across all components. Fix or add the following:

1. Navbar: Confirm nav links have a smooth `transition-colors duration-200` on hover. Active nav link must have gold text + an animated underline that slides in using a pseudo-element or Framer Motion `layoutId` shared underline effect.

2. Cards (all pages): Confirm `translateY(-6px)` on hover is consistent and smooth across all Card usages. Confirm the gold box-shadow intensifies on hover (`shadow-gold-sm` → `shadow-gold-md`).

3. Buttons: Confirm all Button instances have `whileHover scale: 1.03` and `whileTap scale: 0.97`. Confirm the primary button has a subtle gold glow pulse on hover (`box-shadow` keyframe animation using a CSS class).

4. FAQ accordion: Confirm the chevron rotates exactly 180° on open and back on close. Confirm the height transition is smooth with no layout shift.

5. Testimonials slider: Confirm auto-rotate pauses on `onMouseEnter` and resumes on `onMouseLeave`.

6. BackToTopButton: Confirm the fade-in/out is smooth. Confirm `whileHover scale: 1.1` and `whileTap scale: 0.9`.

7. Social icons in Footer: Confirm `whileHover scale: 1.15` and color transitions to gold on hover.

8. Stat counters: Confirm they only start counting when the Trust Bar enters the viewport (not on page load).

Fix any animation that is missing or broken.
```

### 8.4 — Phase 8 Review & Fix

```
Review Phase 8 (Animations & Micro-interactions) for the Proximity Credit Repair project:

1. Navigate through all pages and observe every animation:
   - Page transitions: fade + slide, no flicker
   - Hero headline: word-by-word stagger on load
   - Hero particles: floating continuously
   - Scroll sections: fade-up on viewport enter, triggerOnce
   - Stat counters: count up from 0 on scroll enter
   - Service cards: lift + glow on hover
   - Testimonial slider: smooth slide transitions, auto-rotates, pauses on hover
   - FAQ accordion: smooth height expand, chevron rotates
   - Buttons: scale on hover/tap
   - Mobile menu: slides in from right, slides out on close
   - BackToTopButton: fades in after 400px scroll
   - Loading screen: logo pulses while lazy chunk loads

2. Confirm no animation causes layout shift (CLS impact)
3. Confirm animations respect `prefers-reduced-motion`: add a check in `src/lib/animations.ts` that returns instant transitions when `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is true
4. Open DevTools Performance tab — confirm no animation is blocking the main thread

Fix all issues before proceeding.
```

---

## Phase 9 — Forms & Validation

### 9.1 — Contact Form Polish & Edge Cases

```
In the Proximity Credit Repair project, do a complete polish pass on the Contact page form (`src/pages/Contact.tsx`).

Ensure the following:

1. All 5 fields (Full Name, Email, Phone, Service of Interest, Message) are wired to `react-hook-form` using `register` and `zodResolver(contactFormSchema)`

2. Inline validation errors appear below each field in real-time (on blur + on submit attempt):
   - Error text: `text-label text-red-400`
   - Error border: `border-red-400`
   - Error state uses the `error` prop on `Input`, `Textarea`, and `Select` components

3. The submit button shows a spinning `Loader2` icon (from lucide-react, `animate-spin`) while form is submitting. Button is disabled during submission.

4. Successful submission:
   - Hides the form
   - Shows animated gold `CheckCircle` icon with scale-in Framer Motion animation
   - Shows "Thank you, {fullName}! We'll reach out within 24 hours." using the submitted name
   - Fires a success toast via `useUIStore.addToast`
   - Resets `useFormStore.submissionStatus` to 'idle' (the form itself stays hidden — user must refresh to resubmit)

5. Network error state:
   - Shows `submissionStatus === 'error'` message below the submit button: "Something went wrong. Please try again or call us directly."
   - Fires an error toast

6. Phone field: automatically formats input as user types using the `formatPhone` utility from `src/lib/utils.ts` — use `onChange` handler alongside `register`

7. Tab order: confirm the form is fully keyboard navigable in correct field order

8. Screen reader test: confirm all fields have associated labels (not just placeholder text)
```

### 9.2 — Phase 9 Review & Fix

```
Review Phase 9 (Forms & Validation) for the Proximity Credit Repair project:

1. Open the Contact page and test form validation:
   - Click submit with all fields empty — confirm all 5 error messages appear simultaneously
   - Enter an invalid email format — confirm "Please enter a valid email address" error
   - Enter a message under 20 characters — confirm min-length error
   - Fix all fields — confirm errors disappear on correction

2. Submit the form with all valid data:
   - Confirm the button shows spinner during the simulated 1500ms submission delay
   - Confirm the success state appears with the animated checkmark
   - Confirm the success toast appears at bottom-right and auto-dismisses

3. Confirm phone number auto-formats as the user types (e.g., typing 5551234567 produces (555) 123-4567)

4. Confirm tab key navigates through all form fields in order (Full Name → Email → Phone → Service → Message → Submit)

5. Confirm the form is accessible: all labels are programmatically associated to their inputs using `htmlFor` + `id`

6. Run `npx tsc --noEmit` — zero errors

Fix all issues before proceeding.
```

---

## Phase 10 — SEO & Metadata

### 10.1 — SEO Head on All Pages

```
In the Proximity Credit Repair project, verify and complete SEO implementation on all 7 pages.

For each page, ensure the `SEOHead` component is correctly configured:

- Home (`/`): title 'Expert Credit Repair Services That Deliver Real Results', description 'Join 10,000+ clients who improved their credit scores with Proximity Credit Repair. Proven strategies, transparent process, real results. Get your free consultation today.', schema: LocalBusiness
- About (`/about`): title 'About Proximity Credit Repair — Our Mission & Team', description 'Meet the expert team behind Proximity Credit Repair. Dedicated to empowering clients with proven, transparent credit repair strategies since 2012.', schema: Organization
- Services (`/services`): title 'Credit Repair Services — Analysis, Disputes, Monitoring & Debt Validation', appropriate description, schema: Service (array of 4 services)
- How It Works (`/how-it-works`): title 'How Credit Repair Works — Our 4-Step Process', appropriate description, no special schema
- Testimonials (`/testimonials`): title 'Client Success Stories & Testimonials', appropriate description
- FAQ (`/faq`): title 'FAQ — Your Credit Repair Questions Answered', appropriate description, schema: FAQPage with all 10 Q&As formatted as JSON-LD
- Contact (`/contact`): title 'Contact Us — Free Credit Consultation', description 'Schedule your free credit consultation with Proximity Credit Repair. Our expert team is ready to help you rebuild your credit and reclaim your financial future.'

All schemas must be valid JSON-LD format. Validate each schema against schema.org specs mentally before writing.

Also ensure the `SEOHead` component handles canonical URLs correctly using `import.meta.env.VITE_SITE_URL`.
```

### 10.2 — Semantic HTML & Accessibility Audit

```
In the Proximity Credit Repair project, do a full semantic HTML and accessibility audit across all pages and components.

Fix every issue found:

1. Heading hierarchy: confirm every page has exactly one `<h1>` (the hero/page title). Section headings use `<h2>`. Subheadings within sections use `<h3>`. No heading levels are skipped.

2. Alt text: add descriptive `alt` props to all `<img>` elements. Team photo placeholders: `alt="Photo of {member.name}, {member.title}"`. Any decorative images: `alt=""`

3. ARIA labels:
   - Navbar hamburger button: `aria-label="Open navigation menu"` / `aria-label="Close navigation menu"`
   - Testimonial slider next/prev buttons: `aria-label="Next testimonial"` / `aria-label="Previous testimonial"`
   - FAQ accordion buttons: `aria-expanded={isOpen}` + `aria-controls` pointing to the answer panel id
   - Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to modal title
   - BackToTopButton: `aria-label="Back to top"`
   - Social icon links in Footer: `aria-label="Follow us on Facebook"` etc.

4. Focus management:
   - All interactive elements have visible `focus-visible` gold outline (set globally in `globals.css`)
   - Mobile drawer: focus is trapped inside while open, returns to hamburger on close

5. Color contrast:
   - Verify gold text (`#B8924A`) on dark background (`#0A0A0A`) meets 4.5:1 ratio — adjust to gold-light (`#D4AF72`) in any instance where it fails
   - Verify `text-text-muted` (`#6B6B6B`) on white meets minimum ratio — adjust to minimum `#767676` if needed

6. Skip navigation link: add a visually-hidden "Skip to main content" link as the very first element in `AppLayout.tsx` that becomes visible on focus and links to `#main-content`. Add `id="main-content"` to the `<main>` element in `PageWrapper`.
```

### 10.3 — Phase 10 Review & Fix

```
Review Phase 10 (SEO & Metadata) for the Proximity Credit Repair project:

1. Open each of the 7 pages and inspect the document `<head>` in DevTools:
   - Confirm `<title>` is unique and matches the PRD format: "{Page Title} | Proximity Credit Repair"
   - Confirm `<meta name="description">` is present and unique per page
   - Confirm `<meta property="og:title">`, `og:description`, `og:image`, `og:url` are present
   - Confirm `<meta name="twitter:card">` is present
   - Confirm `<link rel="canonical">` is present
   - Confirm `<script type="application/ld+json">` is present on Home, About, Services, FAQ, Contact

2. Use browser DevTools accessibility tree (or axe DevTools extension) to check for accessibility violations:
   - Confirm single h1 per page
   - Confirm all images have alt attributes
   - Confirm all form fields have labels
   - Confirm ARIA attributes are correct on interactive elements

3. Tab through the entire Home page — confirm every interactive element is reachable and has a visible gold focus outline

4. Confirm "Skip to main content" link appears on first Tab press

5. Run a Lighthouse accessibility audit in DevTools and target 90+ score

Fix all issues before proceeding.
```

---

## Phase 11 — Performance Optimization

### 11.1 — Image Optimization & Lazy Loading

```
In the Proximity Credit Repair project, optimize all images for performance.

1. Create `src/components/ui/OptimizedImage.tsx`:
   - A wrapper component for all images in the app
   - Props: `src`, `alt`, `className?`, `width?`, `height?`, `priority?` (boolean)
   - Adds `loading="lazy"` by default (if `priority` is true, use `loading="eager"`)
   - Adds `decoding="async"` 
   - Wraps the image in a container div with the given dimensions to prevent layout shift (set explicit width/height attributes)
   - Export as default

2. Replace all `<img>` tags across the codebase with `OptimizedImage` (or confirm there are none yet since images are placeholders — if so, add a note comment)

3. Add `fetchpriority="high"` to the hero section's background or first contentful paint element

4. In `index.html`, add a `<link rel="preload">` for the Google Fonts stylesheet with `as="style"` and `crossorigin="anonymous"` 

5. Confirm the Vite `build` config in `vite.config.ts` has `build.rollupOptions.output.manualChunks` configured to split:
   - `vendor-react`: react, react-dom, react-router-dom
   - `vendor-motion`: framer-motion
   - `vendor-ui`: lucide-react
   - `vendor-forms`: react-hook-form, zod, @hookform/resolvers
   - `vendor-state`: zustand, @tanstack/react-query
```

### 11.2 — Bundle Analysis & Final Optimization

```
In the Proximity Credit Repair project, run a full bundle analysis and optimize.

1. Run `npx vite-bundle-visualizer` and review the output. Identify any unexpectedly large chunks.

2. Confirm all 7 page routes are lazy-loaded (each page should appear as a separate chunk in the visualizer output)

3. If any single vendor chunk exceeds 200kb gzipped, investigate and split further or replace the library with a lighter alternative.

4. Add the following to `vite.config.ts` under `build`:
   - `target: 'es2020'`
   - `minify: 'esbuild'`
   - `cssMinify: true`
   - `reportCompressedSize: true`

5. In `src/main.tsx`, confirm TanStack Query `QueryClient` is configured with sensible defaults:
   - `staleTime: 5 * 60 * 1000` (5 minutes)
   - `gcTime: 10 * 60 * 1000` (10 minutes)
   - `retry: 1`
   - `refetchOnWindowFocus: false`

6. Confirm `React.StrictMode` is enabled in `src/main.tsx` (it is already, but double-check)

7. Add a `<meta name="viewport" content="width=device-width, initial-scale=1.0">` and `<meta charset="UTF-8">` to `index.html` if not already present
```

### 11.3 — Phase 11 Review & Fix

```
Review Phase 11 (Performance Optimization) for the Proximity Credit Repair project:

1. Run `npm run build` and confirm the build completes with zero errors

2. Check the build output (`dist/`) — confirm multiple chunk files exist for each lazy-loaded page and vendor group

3. Confirm no single JavaScript chunk exceeds 250kb (check the Vite build output size report)

4. Run `npm run preview` to serve the production build locally and navigate through all pages — confirm everything works identically to dev mode

5. In the browser's Network tab (with caching disabled), confirm:
   - The initial HTML loads first
   - JavaScript chunks load in parallel
   - Google Fonts loads via preload link

6. Check that the `OptimizedImage` component is used (or noted for future use) for all images

7. Confirm Tailwind CSS purging is working — the production CSS file should be minimal in size (check `dist/assets/`)

Fix all issues before proceeding.
```

---

## Phase 12 — Responsiveness & Cross-Browser QA

### 12.1 — Full Responsive Audit

```
In the Proximity Credit Repair project, do a complete responsive design audit across all breakpoints defined in the PRD.

Test every page at these viewport widths (use browser DevTools device emulation):
- 375px (iPhone SE / small mobile)
- 390px (iPhone 14)
- 768px (iPad / tablet portrait)
- 1024px (tablet landscape / small laptop)
- 1280px (desktop)
- 1440px (large desktop)

For each page, check and fix:

1. Home page:
   - Hero: headline font size scales down on mobile (use responsive Tailwind: `text-4xl md:text-6xl lg:text-h1`)
   - Hero particles: reduce count on mobile or hide on very small screens
   - Trust Bar: stacks vertically on mobile, row on tablet+
   - Services grid: 1 col → 2 col → 4 col
   - How It Works Strip: vertical flow on mobile, horizontal on desktop
   - Testimonials slider: 1 card on mobile, 3 on desktop

2. About page: Team grid 1 → 2 → 4 cols; Mission section stacks on mobile

3. Services page: Alternating layout stacks on mobile (icon + description + bullets all vertical)

4. How It Works page: Timeline switches from vertical (mobile) to horizontal (desktop)

5. Testimonials page: Grid 1 → 2 → 3 cols

6. FAQ page: Full width on all breakpoints

7. Contact page: Stacks to single column on mobile (form below contact info)

8. Navbar: Desktop nav links hidden on mobile, hamburger visible. Mobile drawer is full-height.

9. Footer: 4 columns stack to 2 columns on tablet, 1 column on mobile.

Fix every layout issue found at any breakpoint.
```

### 12.2 — Final QA Bug Fix Pass

```
In the Proximity Credit Repair project, do a final comprehensive QA pass.

Check and fix every item:

1. Visual consistency:
   - All cards use `rounded-card` (16px), none use default rounded corners
   - All buttons use `rounded-pill` (9999px)
   - All section headings use `font-heading font-bold` or `font-black`
   - All body text uses `font-body`
   - No hardcoded hex color values anywhere in JSX — only Tailwind token names

2. Content accuracy:
   - All 7 nav links match the PRD URL structure exactly
   - Footer legal disclaimer reads exactly: "Results may vary. We do not guarantee specific credit score improvements."
   - Home page stat counter values match PRD: 10,000+, 95%, $2M+
   - FAQ has exactly 10 items in the correct 2 categories (5 each)

3. Functionality:
   - All internal `Link` components navigate correctly without full page reload
   - Hash links (e.g., `/services#credit-analysis`) scroll to the correct section
   - Contact form submission simulation works (1500ms delay → success state)
   - Testimonial slider dots sync with current slide
   - FAQ accordion only allows one open item at a time

4. Zero console errors or warnings in browser DevTools across all pages

5. Run `npx tsc --noEmit` — confirm zero TypeScript errors

6. Run ESLint: `npx eslint src/ --ext .ts,.tsx` — fix all errors (warnings acceptable)

Fix every issue found.
```

---

## Phase 13 — Deployment & Production Readiness

### 13.1 — Replit Workflow & Environment Configuration

```
In the Proximity Credit Repair project, configure the app for live deployment on Replit.

1. Update `vite.config.ts`:
   - Set `server.host` to `'0.0.0.0'`
   - Set `server.port` to `5173`
   - Set `preview.host` to `'0.0.0.0'`
   - Set `preview.port` to `4173`
   - These settings ensure Replit's proxy can access the dev and preview servers

2. In `.replit` file (create it if it doesn't exist):
   - Set `run` command to: `npm run dev`
   - Set `entrypoint` to `index.html`

3. Update `package.json` scripts:
   - `"dev"`: `"vite"`
   - `"build"`: `"tsc && vite build"`
   - `"preview"`: `"vite preview"`
   - `"lint"`: `"eslint src/ --ext .ts,.tsx"`
   - `"typecheck"`: `"tsc --noEmit"`

4. Set `.env.production` values:
   - `VITE_SITE_URL` = the Replit deployment URL (use placeholder `https://proximitycreditrepair.replit.app` if not yet known)
   - Leave `VITE_CONTACT_API_URL`, `VITE_ANALYTICS_ID`, `VITE_GOOGLE_MAPS_KEY` empty (they fall back to dev simulation/no-ops)

5. Run `npm run build` — confirm zero build errors and the `dist/` folder is generated

6. Run `npm run preview` — confirm the production build serves correctly on port 4173

7. Confirm the app is accessible via Replit's webview by running `npm run dev` and checking the preview pane shows the Home page
```

### 13.2 — Final Production Checklist

```
In the Proximity Credit Repair project, complete the final production readiness checklist before going live.

Verify and fix every item:

PRD Definition of Done checklist:
- [ ] All 7 pages built and responsive across all breakpoints (375px to 1440px)
- [ ] Scalable folder structure implemented: assets, components/ui, components/layout, components/sections, pages, hooks, store, services, data, lib, types, config, styles
- [ ] All content in /data files — zero hardcoded strings in component or page files (only import from data/)
- [ ] Reusable UI primitives in /components/ui: Button, Card, Badge, Input, Textarea, Select, Modal, Toast, ToastContainer, BackToTopButton, LoadingScreen, OptimizedImage, SectionDivider, SectionLabel
- [ ] Zustand stores configured: uiStore (mobileMenuOpen, scrollY, activeNavItem, toastQueue) and formStore (submissionStatus, validationErrors, formData)
- [ ] Framer Motion animations on: hero headline, page transitions, scroll reveals, card hovers, button hovers, FAQ accordion, testimonial slider, particle dots, counters, mobile menu, back-to-top
- [ ] Brand colors and fonts defined in tailwind.config.js — never inline
- [ ] Contact form functional: all 5 fields, Zod validation, success state with checkmark animation, toast notification
- [ ] Animated stat counters triggered by scroll (useCountUp hook + useInView)
- [ ] Testimonial carousel auto-rotating with pause on hover
- [ ] FAQ accordion with Framer Motion AnimatePresence height animation
- [ ] Sticky navbar with backdrop-blur on scroll + mobile drawer with AnimatePresence
- [ ] Back-to-top button appears at 400px scroll
- [ ] SEOHead component used on all 7 pages with unique title + description + OG tags + canonical
- [ ] JSON-LD schema markup on Home (LocalBusiness), About (Organization), Services (Service), FAQ (FAQPage), Contact
- [ ] Environment config files: .env.development, .env.staging, .env.production with all 4 VITE_ variables
- [ ] Legal disclaimer in footer: "Results may vary. We do not guarantee specific credit score improvements."
- [ ] Zero console errors across all pages
- [ ] `npm run build` succeeds with zero errors
- [ ] App accessible via Replit preview pane

For any item not checked, fix it now. Do not mark the project complete until every item is verified.
```

### 13.3 — Lighthouse Score Verification

```
In the Proximity Credit Repair project, run a Lighthouse audit and fix any issues preventing a 90+ score.

Instructions:
1. Open the deployed/preview app in Google Chrome
2. Open DevTools → Lighthouse tab
3. Run an audit on the Home page (`/`) with: Performance, Accessibility, Best Practices, SEO all checked, Device: Mobile
4. Run the same audit on Desktop mode

Fixes required for each category:

PERFORMANCE (target 90+):
- LCP < 2.5s: Ensure the hero section and fonts load quickly. Add `<link rel="preconnect">` for Google Fonts. Use `fetchpriority="high"` on the hero background.
- CLS < 0.1: Ensure all images have explicit width/height. Ensure fonts don't cause layout shift (use `font-display: swap` in the Google Fonts URL by appending `&display=swap`).
- FID/INP < 100ms: Confirm no heavy synchronous operations on the main thread during page load.
- Check the Lighthouse "Opportunities" panel and fix the top 3 items.

ACCESSIBILITY (target 90+):
- Fix any contrast ratio failures Lighthouse reports
- Fix any missing label or ARIA attribute Lighthouse reports

BEST PRACTICES (target 90+):
- Confirm all console errors are eliminated
- Confirm no deprecated API usage

SEO (target 90+):
- Confirm all pages have `<title>`, `<meta name="description">`, and are crawlable

Fix all issues until all 4 Lighthouse scores reach 90+ on both mobile and desktop. Re-run Lighthouse after each fix to confirm improvement.
```

### 13.4 — Final Deployment Confirmation

```
In the Proximity Credit Repair project, perform the final deployment confirmation on Replit.

1. Ensure `npm run dev` starts the Vite dev server on port 5173 and the app loads in the Replit preview pane without errors

2. Navigate through all 7 pages in the preview pane and confirm:
   - The Proximity logo and gold gradient text render correctly
   - The Navbar is sticky and blurs on scroll
   - All animations play correctly
   - The contact form submits and shows the success state
   - The mobile hamburger menu works at a mobile breakpoint in the preview pane
   - All page links navigate without full page reload

3. Open the browser console — confirm zero errors and zero 404s for any resources

4. Confirm the app title in the browser tab reads "Expert Credit Repair Services That Deliver Real Results | Proximity Credit Repair" on the Home page

5. Run a final `npx tsc --noEmit` — zero TypeScript errors

6. Run `npm run lint` — zero ESLint errors

7. The Proximity Credit Repair website is production-ready and live on Replit.

Congratulations — Phase 1 of the PRD is complete. The marketing website is built, deployed, and meets all acceptance criteria defined in the PRD Definition of Done.
```

---

## Appendix — Quick Reference

### PRD Color Token Quick Reference
| Token | Hex | Tailwind Class |
|---|---|---|
| Gold Primary | `#B8924A` | `text-gold-primary` / `bg-gold-primary` |
| Gold Light | `#D4AF72` | `text-gold-light` / `bg-gold-light` |
| Gold Dark | `#8B6A2E` | `text-gold-dark` / `bg-gold-dark` |
| Near Black | `#0A0A0A` | `bg-black-near` |
| Card Black | `#141414` | `bg-black-card` |
| Off White | `#F9F6F1` | `bg-white-off` |
| Body Text | `#1A1A1A` | `text-text-body` |
| Muted Text | `#6B6B6B` | `text-text-muted` |

### PRD URL Structure Quick Reference
| Page | Route |
|---|---|
| Home | `/` |
| About Us | `/about` |
| Services | `/services` |
| How It Works | `/how-it-works` |
| Testimonials | `/testimonials` |
| FAQ | `/faq` |
| Contact | `/contact` |
| 404 | `*` |

### PRD Data Files Quick Reference
| File | Export | Type |
|---|---|---|
| `data/services.ts` | `services` | `Service[]` (4 items) |
| `data/testimonials.ts` | `testimonials` | `Testimonial[]` (8 items) |
| `data/faqs.ts` | `faqs` | `FAQItem[]` (10 items) |
| `data/team.ts` | `teamMembers` | `TeamMember[]` (4 items) |
| `data/stats.ts` | `stats` | `Stat[]` (3 items) |
| `data/navigation.ts` | `navLinks`, `footerServiceLinks` | `NavLink[]` |
| `config/siteMetadata.ts` | `siteMetadata` | `SiteMetadata` |

### PRD Acceptance Criteria (Definition of Done)
All 19 items from the PRD must be checked before marking the project complete. See Phase 13.2 for the full checklist.
