# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Koi Software landing page — a single-page marketing site for a local-business-focused software company. Built with React 19 + TypeScript + Vite 7 + Tailwind CSS v4.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — TypeScript check + Vite production build (`tsc -b && vite build`)
- `npm run lint` — ESLint across the project
- `npm run preview` — Preview the production build locally

## Architecture

**Single-page app with section-based layout.** `App.tsx` composes the page from top-level section components in render order:

`Navbar → Hero → LogoCarousel → BentoGrid → AutomatizationsSection → PhilosophySection → ConsultingSection → Footer`

All UI components live in `src/components/ui/`. There is no routing.

**Styling:** Tailwind CSS v4 via `@tailwindcss/vite` plugin (no `tailwind.config` file). Custom theme tokens defined in `src/index.css` using `@theme` directive:
- `--color-koi-red: #e92010` / `--color-koi-dark: #0f0f11` / `--color-koi-overlay: #1a1a1c`
- Fonts: Inter (sans), Playfair Display (serif)

**Utility:** `src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge) for conditional class merging.

**Animations & Microinteractions:**
- `framer-motion` is used extensively across sections for scroll-triggered reveals, entrance animations, and the infinite logo carousel marquee.
- `ParticleNetwork.tsx` renders a canvas-based particle animation in the Hero background using `requestAnimationFrame`. Particle count scales with viewport size.
- Several SVG logo components (`VitallyLogo`, `AquaxelaLogo`, `VerticeLogo`, `LasFuentesLogo`) are rendered inline for the carousel.
- Product mockup components (`SpaOperationsMockup`, `KoiNutritionMockup`, `ChatbotMockup`, `CrmMockup`, `RestaurantOSMockup`) are used inside the BentoGrid and AutomatizationsSection.

## Critical Constraints

- **Preserve all existing animations and microinteractions.** Every framer-motion animation, the canvas particle network, hover effects, and scroll transitions must be kept intact.
- **No functionality may be removed or degraded.**
- **Performance is the primary goal:** faster paint, lower JS bundle, smoother 60fps rendering.

## Brand Context

See `koi_software_context.md` for full brand guidelines, target audience, and landing page section blueprint. Key: "High-End Studio" aesthetic with warm partner messaging, deep dark backgrounds, koi-red accents, Apple-level micro-interaction polish.
