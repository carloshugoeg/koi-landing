# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Koi Software landing page — a single-page, Spanish-first marketing site for a software studio serving local businesses in Guatemala. The page itself is a design-capability proof: featured products are recreated as live DOM mockups. Built with React 19 + TypeScript (strict) + Vite 7 + Tailwind CSS v4 + framer-motion 12 + i18next.

## Commands

- `npm run dev` — Vite dev server with HMR
- `npm run build` — TypeScript check + production build (`tsc -b && vite build`)
- `npm run lint` — ESLint across the project
- `npm run preview` — Preview the production build locally
- `npm run optimize:logos` — Regenerate `public/logos/*.webp` via sharp
- `node scripts/screenshots.mjs` — Playwright visual matrix (chromium at `/opt/pw-browsers/chromium`)

## Architecture

**Single-page app**, composed in `src/App.tsx` inside `LazyMotion strict` + `MotionConfig reducedMotion="user"`:

`Navbar → Hero → LogoMarquee → WorkSection (#work) → AutomationSection (#automations) → PhilosophySection (#about) → ServicesSection (#services) → FinalCta (#contact) → Footer`

- `src/components/primitives/` — `Section`, `SectionHeading`, `Button`, `Chip`. Every section is built on these.
- `src/components/work/` — case-study rows. Each mockup is a `React.lazy` chunk mounted via `useIsVisible` just before scroll-in.
- `src/components/mockups/` — `MockupFrame` shell + product mockups (Infinito POS, KoiCRM, Nutrea, SpaApp, IximChat).
- `src/lib/motion.ts` — spring presets (`quick`/`default`/`gentle` are critically damped; `sheet` is the only preset with bounce) and shared reveal variants.
- `src/lib/site.ts` — contact/social endpoints. Links render only when a value is configured; never ship `href="#"`.
- `src/i18n/` — ES default (`fallbackLng: 'es'`, localStorage-only detection, key `koi-lang`); `<html lang>` syncs on language change.

**Styling:** Tailwind v4 via `@tailwindcss/vite` — no config file. All tokens live in `src/index.css` `@theme`: koi-red ramp (500 = brand `#e92010`, use `koi-red-400` for small red text on dark), `koi-ember` gradient partner, surface scale (`koi-black/dark/surface/raised`), and a type scale with per-size tracking/leading (`text-display-2xl` … `text-overline`). Fonts are self-hosted variable fonts synced to `public/fonts/` by `scripts/sync-fonts.mjs` (postinstall).

## Conventions (hold these in review)

- **Motion:** import `m` from framer-motion, never `motion` (LazyMotion strict will throw). Springs over duration easings; entrance `y` ≤ 24px; no overshoot except the mobile menu sheet. Everything must degrade under `prefers-reduced-motion` (MotionConfig handles transforms; gate loops explicitly).
- **Mockups:** size everything in `em` against `MockupFrame`'s container-scaled font-size — no pixel offsets, no fixed widths. Mockup UI text is Spanish product fiction (Q amounts, local names); page copy never quotes mockup numbers as results.
- **Copy claims are qualitative only** — no invented metrics or percentages anywhere.
- **Contrast:** body text ≥ `text-white/70`; captions ≥ `text-white/60`; small red text uses `koi-red-400`, `koi-red-500` only at display sizes.
- **i18n:** write Spanish first in `locales/es.json`, then mirror in `en.json`. Keys are grouped per section (`work.*`, `automations.*`, `services.*`, `cta.*`, `a11y.*`).
- **A11y:** every section gets `aria-labelledby` via the `Section` primitive; icon-only controls need `aria-label`; keep the skip link and `focus-visible` ring intact.

## Brand Context

See `koi_software_context.md` for brand guidelines and audience. Key: "High-End Studio" aesthetic with warm partner messaging ("Construimos para nuestra gente"), deep dark backgrounds, koi-red accents, restrained Apple-style micro-interactions. Playfair Display appears only in the hero accent, the philosophy quote, and process numerals — everything else is Inter.
