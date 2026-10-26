# Koi Software — Landing

Static marketing site for [koisoftware.com](https://koisoftware.com). Spanish-first, one page, no CMS and no contact form. The picture comes from ink's final handoff: hero, Servicios, Proyectos, Nosotros B1, and Contacto C3.

## Stack

React 19 · TypeScript · Vite 7. Styles and motion are the handoff's CSS and canvas, ported into `src/ink/`. Fonts are self-hosted Shippori Mincho and Zen Kaku Gothic New.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Type-check (`tsc -b`) and production build |
| `npm run preview` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run test:e2e` | Playwright: sections, contact hrefs, overflow, axe |

`postinstall` checks that the self-hosted font files are present.

## Page

`src/App.tsx`: Hero → Servicios (`#servicios`) → Proyectos (`#proyectos`) → Nosotros (`#nosotros`) → Contacto (`#contacto`) → footer.

Contact endpoints live in `src/ink/contacts.ts`. Every "Agenda una primera llamada" and "Hablemos" opens WhatsApp. Decisions, including the Nosotros motion chart, are in `DECISIONS.md`.
