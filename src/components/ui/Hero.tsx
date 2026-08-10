import { m } from 'framer-motion';
import { Trans, useTranslation } from 'react-i18next';
import { ParticleNetwork } from './ParticleNetwork';
import { Button } from '../primitives/Button';
import { fadeRise, staggerParent } from '../../lib/motion';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-koi-dark">
      <div className="absolute inset-0 z-0">
        <ParticleNetwork />
      </div>

      {/* Vignette to keep the headline legible over the particles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,15,17,0.8)_0%,rgba(15,15,17,0.4)_40%,transparent_100%)] pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-koi-red-500/20 blur-[120px] rounded-full pointer-events-none opacity-40 z-0" />

      <m.div
        variants={staggerParent}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center"
      >
        <m.div
          variants={fadeRise}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-white/85 text-body-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-koi-red-500 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
          {t('hero.badge')}
        </m.div>

        <m.h1
          variants={fadeRise}
          className="text-display-lg md:text-display-xl lg:text-display-2xl text-white max-w-5xl mb-6 text-balance"
        >
          <Trans
            i18nKey="hero.heading"
            components={{
              accent: (
                <em className="font-serif italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-koi-red-400 to-koi-ember" />
              ),
            }}
          />
        </m.h1>

        <m.p variants={fadeRise} className="text-lead text-white/70 max-w-2xl mb-10 text-balance">
          {t('hero.subheading')}
        </m.p>

        <m.div variants={fadeRise} className="flex flex-col sm:flex-row items-center gap-4">
          <Button href="#contact" variant="secondary" className="px-8 py-4">
            {t('hero.cta')}
          </Button>
          <Button href="#work" variant="ghost" className="px-8 py-4">
            {t('hero.ctaSecondary')}
          </Button>
        </m.div>
      </m.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-koi-dark to-transparent" aria-hidden="true" />
    </section>
  );
};
