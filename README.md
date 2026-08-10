# Koi Software — Landing

Marketing site for [koisoftware.com](https://koisoftware.com): a single-page, Spanish-first landing for a software studio serving local businesses in Guatemala. The page doubles as proof of design capability — the featured "mockups" are live DOM recreations of real products (Infinito POS, KoiCRM, Nutrea, SpaApp) rendered with container-scaled layouts and spring-driven 3D tilt.

## Stack

React 19 · TypeScript (strict) · Vite 7 · Tailwind CSS v4 (`@tailwindcss/vite`, tokens in `src/index.css` `@theme`) · framer-motion 12 (LazyMotion, `m` components only) · i18next (ES default, EN toggle)

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) + production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run optimize:logos` | Regenerate `public/logos/*.webp` from PNG sources (sharp) |
| `node scripts/screenshots.mjs` | Playwright screenshot matrix (viewports × languages × sections) |

`postinstall` runs `scripts/sync-fonts.mjs`, copying the variable-font woff2 files from `@fontsource-variable/*` into `public/fonts/` so `index.html` can preload them from stable URLs.

## Architecture

Single page, composed in `src/App.tsx`:

```
Navbar → Hero → LogoMarquee → WorkSection (#work) → AutomationSection (#automations)
→ PhilosophySection (#about) → ServicesSection (#services) → FinalCta (#contact) → Footer
```

- `src/components/primitives/` — `Section`, `SectionHeading`, `Button`, `Chip`
- `src/components/work/` — case-study rows; each mockup is a lazy chunk mounted just before it scrolls into view
- `src/components/mockups/` — `MockupFrame` (container-query scaling, pointer-tilt springs, `FloatCard` parallax depth) + the five product mockups
- `src/lib/motion.ts` — shared spring presets and reveal variants (critically damped by default)
- `src/lib/site.ts` — contact/social endpoints; links render only when configured

## Motion & accessibility

- All animation flows through `LazyMotion strict` + `MotionConfig reducedMotion="user"`; decorative loops (marquee, particle canvas, toasts) also stop under `prefers-reduced-motion`.
- The hero's particle canvas pauses whenever it is off-screen or the tab is hidden, and renders DPR-correct.
- Glass surfaces fall back to solid under `prefers-reduced-transparency` / gain borders under `prefers-contrast: more`.
- `<html lang>` follows the active language (set in `src/i18n/config.ts`).

## i18n

Spanish is the default and primary voice (`fallbackLng: 'es'`, localStorage-only detection under the `koi-lang` key). English is opt-in via the navbar toggle. Copy lives in `src/i18n/locales/{es,en}.json` — write Spanish first, then translate.

Note on SEO: both languages are served at one URL, so `hreflang` is intentionally omitted (incorrect hreflang is worse than none). If languages ever get dedicated routes (e.g. `/en`), add hreflang alternates then.

## Owner configuration

`src/lib/site.ts` holds the contact endpoints. Contact is email-only by design; `social.instagram` / `social.linkedin` footer links render only when set.
