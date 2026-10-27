# CLAUDE.md

Guidance for working in this repository.

## Project

Koi Software landing page. One static page, Spanish, Vite + React 19 + TypeScript. The visual contract is ink's final handoff: hero, Servicios (scroll wave), Proyectos, Nosotros B1, Contacto C3. No CMS, no form, no invented metrics.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build`
- `npm run lint` — ESLint
- `npm run preview` — production build locally
- `npm run test:e2e` — Playwright and axe

## Architecture

`src/App.tsx`: Hero → Servicios (`#servicios`) → Proyectos (`#proyectos`) → Nosotros (`#nosotros`) → Contacto (`#contacto`) → Footer.

- `src/components/` — one component per section. Project details open in a dialog.
- `src/ink/site.css`, `fonts.css`, `a11y.css` — handoff styles plus the accessibility layer (skip link, 44px targets, focus rings).
- `src/ink/hero.ts`, `ola.ts`, `projectsMotion.ts` — the handoff's canvas and scroll motion.
- `src/ink/motion.ts` — `stepNosotros` (reduced motion settles immediately) and torn-sheet clips.
- `src/ink/contacts.ts` — WhatsApp, mail, Instagram. Never ship `href="#"`.

## Conventions

- Copy stays qualitative. Do not name a city. Public product names are KoiPOS and Nutrea. NeuroMenu is not on the page.
- `Agenda una primera llamada` and `Hablemos` go to `https://wa.me/50258713903`.
- Motion must stop or settle under `prefers-reduced-motion`.
- Mockup UI text inside the project dialog is a placeholder until real anonymized screenshots exist. Page copy does not quote those placeholders as results.
- Shippori Mincho for titles, Zen Kaku Gothic New for text. Both are self-hosted.
