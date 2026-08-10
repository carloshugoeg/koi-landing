import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Client logos. Raster ones come pre-sized from scripts/optimize-logos.mjs
 * (dimensions = intrinsic WebP size, displayed at half for 2× sharpness).
 * Vitally ships as inline SVG.
 */
interface LogoEntry {
  name: string;
  src?: string;
  width?: number;
  height?: number;
  render?: () => ReactNode;
}

const VitallyLogo = () => (
  <svg viewBox="60 10 180 90" className="h-12 w-auto" role="img" aria-label="Vitally">
    <g transform="translate(150, 30)" fill="currentColor">
      <path d="M 0 14 C -2 9, -5 3, -11 -2 C -17 -7, -24 -7, -24 -2 C -24 5, -17 13, -9 17 C -5 20, -2 20, 0 18" />
      <path d="M 0 14 C 2 9, 5 3, 11 -2 C 17 -7, 24 -7, 24 -2 C 24 5, 17 13, 9 17 C 5 20, 2 20, 0 18" />
    </g>
    <text
      x="150"
      y="88"
      fill="currentColor"
      fontFamily="'Playfair Display Variable', 'Playfair Display', Georgia, serif"
      fontSize="48"
      fontWeight="700"
      letterSpacing="1"
      textAnchor="middle"
    >
      vitally
    </text>
  </svg>
);

const LOGOS: LogoEntry[] = [
  { name: 'Vértice', src: '/logos/vertice.webp', width: 384, height: 112 },
  { name: 'Tentazioni', src: '/logos/tentazioni.webp', width: 384, height: 126 },
  { name: 'AquaXela', src: '/logos/aquaxela.webp', width: 289, height: 69 },
  { name: 'Vitally', render: () => <VitallyLogo /> },
  { name: 'Las Fuentes', src: '/logos/lasfuentes.webp', width: 143, height: 128 },
  { name: 'Zakennayo', src: '/logos/zknny.webp', width: 128, height: 128 },
  { name: 'Fotomatiko', src: '/logos/fotomatiko.webp', width: 384, height: 93 },
];

const LogoSet = ({ hidden }: { hidden?: boolean }) => (
  <div className="flex items-center shrink-0" aria-hidden={hidden || undefined}>
    {/* Two sets per half so the -50% loop covers ultrawide viewports */}
    {[0, 1].map((set) => (
      <div key={set} className="flex items-center" aria-hidden={set === 1 || undefined}>
        {LOGOS.map((logo) => (
          <div
            key={logo.name}
            className="mx-10 flex items-center justify-center w-36 md:w-44 h-16 text-white opacity-30 hover:opacity-60 transition-opacity duration-300"
          >
            {logo.render ? (
              logo.render()
            ) : (
              <img
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                loading="lazy"
                decoding="async"
                className="max-h-12 w-auto max-w-full object-contain brightness-0 invert"
              />
            )}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export const LogoMarquee = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-16 border-y border-white/5 overflow-hidden">
      <p className="text-center text-overline uppercase text-white/60 mb-10">{t('clients.caption')}</p>
      <div className="relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-koi-dark to-transparent z-10 pointer-events-none" aria-hidden="true" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-koi-dark to-transparent z-10 pointer-events-none" aria-hidden="true" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
          <LogoSet />
          <LogoSet hidden />
        </div>
      </div>
    </section>
  );
};
