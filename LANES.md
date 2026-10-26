# Merge lanes

This repository has two merge lanes.

Low-risk pull requests use the label `lane:low`. The high-risk label is `lane:high`.

A pull request that changes any high-risk path is high-risk. Every changed path has to be low-risk before the pull request is low-risk. When a path is listed in both lanes, that path is high-risk. A path that matches no glob below is high-risk.

A low-risk pull request merges on its own once CI is green, Bugbot is clean, and gate passes. The name gate means the QA bot.

A high-risk pull request waits for an approval window from Carlos. The windows are 9:00 and 16:00 in `America/Guatemala`. Grok Bot batches high-risk pull requests into those windows.

## Path globs

Globs apply to paths a pull request changes.

Regenerate the tracked file list with `git ls-files`.

| Lane | Suggested label | Category | Glob | In this tree |
| --- | --- | --- | --- | --- |
| Low-risk | `lane:low` | Copy | `src/i18n/locales/*.json` | `src/i18n/locales/en.json`, `src/i18n/locales/es.json` |
| Low-risk | `lane:low` | Styles | `src/**/*.css` | `src/index.css` |
| Low-risk | `lane:low` | Tests | `**/*.{test,spec}.{ts,tsx,js,mjs}` | none |
| Low-risk | `lane:low` | Patch-level dependency updates | `package.json`, `package-lock.json` | `package.json`, `package-lock.json` |
| Low-risk | `lane:low` | Internal tools | `scripts/**` | `scripts/optimize-logos.mjs`, `scripts/screenshots.mjs`, `scripts/sync-fonts.mjs` |
| Low-risk | `lane:low` | Internal tools | `eslint.config.js` | `eslint.config.js` |
| High-risk | `lane:high` | Auth | none | none |
| High-risk | `lane:high` | Payments | none | none |
| High-risk | `lane:high` | Data migrations | none | none |
| High-risk | `lane:high` | Client sites at launch | none | none |
| High-risk | `lane:high` | Production environment | `vite.config.ts` | `vite.config.ts` |
| High-risk | `lane:high` | Production environment | `src/lib/site.ts` | `src/lib/site.ts` |
| High-risk | `lane:high` | Production environment | `index.html` | `index.html` |
| High-risk | `lane:high` | Production environment | `public/robots.txt` | `public/robots.txt` |
| High-risk | `lane:high` | Production environment | `public/sitemap.xml` | `public/sitemap.xml` |
| High-risk | `lane:high` | Production environment | `vercel.json` | none |
| High-risk | `lane:high` | Production environment | `.env` | none |
| High-risk | `lane:high` | Production environment | `.env.*` | none |
| High-risk | `lane:high` | Default | `src/components/**` | `src/components/mockups/CrmMockup.tsx`, `src/components/mockups/IximChatMockup.tsx`, `src/components/mockups/MockupFrame.tsx`, `src/components/mockups/NutreaMockup.tsx`, `src/components/mockups/PosMockup.tsx`, `src/components/mockups/SpaMockup.tsx`, `src/components/primitives/Button.tsx`, `src/components/primitives/Chip.tsx`, `src/components/primitives/Section.tsx`, `src/components/primitives/SectionHeading.tsx`, `src/components/ui/AutomationSection.tsx`, `src/components/ui/FinalCta.tsx`, `src/components/ui/Footer.tsx`, `src/components/ui/Hero.tsx`, `src/components/ui/KoiMark.tsx`, `src/components/ui/LogoMarquee.tsx`, `src/components/ui/Navbar.tsx`, `src/components/ui/ParticleNetwork.tsx`, `src/components/ui/PhilosophySection.tsx`, `src/components/ui/ServicesSection.tsx`, `src/components/work/CaseStudy.tsx`, `src/components/work/WorkSection.tsx` |
| High-risk | `lane:high` | Default | `src/hooks/**` | `src/hooks/useIsVisible.ts`, `src/hooks/useTilt.ts` |
| High-risk | `lane:high` | Default | `src/lib/**` | `src/lib/motion-features.ts`, `src/lib/motion.ts`, `src/lib/site.ts`, `src/lib/utils.ts` |
| High-risk | `lane:high` | Default | `src/App.tsx` | `src/App.tsx` |
| High-risk | `lane:high` | Default | `src/main.tsx` | `src/main.tsx` |
| High-risk | `lane:high` | Default | `src/i18n/config.ts` | `src/i18n/config.ts` |
| High-risk | `lane:high` | Default | `public/**` | `public/apple-touch-icon.png`, `public/favicon-32.png`, `public/fonts/inter-var.woff2`, `public/fonts/playfair-var-italic.woff2`, `public/fonts/playfair-var.woff2`, `public/koi-mark.svg`, `public/logos/aquaxela.webp`, `public/logos/fotomatiko.webp`, `public/logos/lasfuentes.webp`, `public/logos/tentazioni.webp`, `public/logos/vertice.webp`, `public/logos/zknny.webp`, `public/og.png`, `public/robots.txt`, `public/sitemap.xml` |
| High-risk | `lane:high` | Default | `tsconfig*.json` | `tsconfig.app.json`, `tsconfig.json`, `tsconfig.node.json` |
| High-risk | `lane:high` | Default | `*.md` | `CLAUDE.md`, `LANES.md`, `README.md`, `koi_software_context.md` |
| High-risk | `lane:high` | Default | `.gitignore` | `.gitignore` |

## Patch rule

`package.json` and `package-lock.json` are low-risk only for a patch-level dependency update.

Each moved dependency keeps the same major number and the same minor number. The diff adds no dependency, removes no dependency, and renames no dependency. A change to scripts, to other config, or to the package's own version is high-risk. Any other change to either file is high-risk.

## Named categories with no path

Auth, payments, and data migrations have no path in this tree. No directory in this tree is a client site.

A pull request that launches a client site is high-risk even when every changed path is low-risk. `vercel.json`, `.env`, and `.env.*` are not tracked. Adding one of them is high-risk.

`index.html` is high-risk because it sets the canonical URL `https://koisoftware.com/`. `src/lib/site.ts` sets the live contact endpoints and `https://koisoftware.com`, so that file is high-risk. `vite.config.ts` is the build config. `public/robots.txt` and `public/sitemap.xml` publish that same host.
