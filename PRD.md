# PRD — Proximity Credit Repair Website

**Objective:** Build a high-converting, fully responsive credit repair website that establishes trust, drives consultation bookings, and ranks in search.

---

## System Prompt Context

> You are an elite AI expert system operating as a Principal Software Architect (10+ years), Advanced SEO Strategist (7+ years), and Content Research Lead (5+ years). Think and execute at the highest professional level.
>
> **Core Execution Standards:**
> - **Engineering:** Architect scalable, secure, production-ready systems. Write clean, maintainable code across frontend, backend, APIs, databases, and authentication.
> - **SEO & Content:** Create research-driven, high-converting content optimized for visibility, ranking, and measurable business impact.
> - **Strategic Delivery:** Ground all recommendations in deep research and strategic thinking.
>
> **Non-Negotiable Priorities:** Accuracy > Speed | Quality > Quantity | Strategy > Generic Output

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Routing | React Router (SPA + smooth scroll) |
| Forms | React Hook Form |
| Fonts | Montserrat (headings) + Open Sans (body) via Google Fonts |
| Icons | Lucide React |
| Deployment | Replit |

---

## Brand Tokens

| Token | Value |
|---|---|
| Primary Gold | `#B8924A` |
| White | `#FFFFFF` |
| Dark Background | `#0F0F0F` |
| Body Text | `#1A1A1A` |

**Usage Rules:**
- Gold → CTAs, headings, icons, borders, accent lines
- White → light section backgrounds, text on dark sections
- Dark → hero section, alternating dark sections

---

## Pages & Key Requirements

| Page | Must-Have Elements |
|---|---|
| **Home** | Hero (strong headline + subheadline + CTA button), trust bar (client count, star ratings, badges), services preview, testimonials strip |
| **About Us** | Mission statement, core values grid, team member cards |
| **Services** | 4 cards: Credit Analysis, Dispute Filing, Score Monitoring, Debt Validation |
| **How It Works** | 4-step visual timeline: Free Consultation → Credit Review → Dispute & Repair → Monitor Progress |
| **Testimonials** | Before/after credit score cards, star ratings, client quotes |
| **FAQ** | Accordion component, 8–10 Q&As covering common credit repair questions |
| **Contact** | Form (name, email, phone, message), phone number, email address, optional office address |

---

## Global UI Rules

- Sticky navbar: logo left, nav links center, gold CTA button right
- Smooth scroll between sections
- Gold gradient accent dividers between sections
- All buttons: gold background, white text, hover darkens
- Fully responsive: mobile, tablet, desktop
- Footer: page links, social media icons (Facebook, Instagram, LinkedIn, Twitter), legal disclaimer

**Legal Disclaimer (required in footer):**
> *"Results may vary. We do not guarantee specific credit score improvements."*

---

## SEO Requirements

- Semantic HTML5 (`h1`→`h6`, `main`, `section`, `article`, `nav`, `footer`)
- Unique meta title + meta description for each page
- Alt text on all images
- Fast load: lazy-load images, minify assets
- Open Graph tags for social sharing
- Schema markup: `LocalBusiness` + `FAQPage`
- URL structure: `/`, `/about`, `/services`, `/how-it-works`, `/testimonials`, `/faq`, `/contact`

---

## Content Tone

- Professional, reassuring, and empowering
- Focus on trust, expertise, and measurable results
- Avoid overpromising — let social proof do the heavy lifting
- Use power words: "proven," "trusted," "expert," "results-driven"

---

## Definition of Done

- [ ] All 7 pages built and fully responsive
- [ ] Brand colors and fonts applied consistently
- [ ] Contact form functional (validation + submission feedback)
- [ ] Smooth scroll navigation working
- [ ] SEO meta tags in place
- [ ] Legal disclaimer visible in footer
- [ ] No console errors
- [ ] Deployed and live on Replit
