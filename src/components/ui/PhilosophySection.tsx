import { m } from 'framer-motion';
import { Trans, useTranslation } from 'react-i18next';
import { Section } from '../primitives/Section';
import { Chip } from '../primitives/Chip';
import { KoiMark } from './KoiMark';
import { fadeRise, scaleIn, staggerParent, viewportOnce } from '../../lib/motion';

export const PhilosophySection = () => {
  const { t } = useTranslation();

  return (
    <Section id="about" labelledBy="about-heading">
      <m.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >
        {/* Crafted local visual — no third-party assets */}
        <m.div
          variants={scaleIn}
          aria-hidden="true"
          className="relative aspect-square md:aspect-[4/5] rounded-card overflow-hidden bg-koi-surface border border-white/10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(233,32,16,0.25),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,122,47,0.15),transparent_55%)]" />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
              backgroundSize: '26px 26px',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <KoiMark className="w-32 h-32 text-white/80" />
          </div>
        </m.div>

        <div>
          <m.div variants={fadeRise}>
            <Chip>{t('philosophy.badge')}</Chip>
          </m.div>
          <m.h2
            id="about-heading"
            variants={fadeRise}
            className="mt-6 text-display md:text-display-lg text-white text-balance"
          >
            <Trans i18nKey="philosophy.heading" components={{ red: <span className="text-koi-red-400" /> }} />
          </m.h2>
          <m.blockquote
            variants={fadeRise}
            className="mt-6 border-l-2 border-koi-red-500 pl-5 font-serif italic text-title-sm text-white/85 text-balance"
          >
            {t('philosophy.quote')}
          </m.blockquote>
          <m.div variants={fadeRise} className="mt-6 space-y-4 text-body text-white/70">
            <p>{t('philosophy.p1')}</p>
            <p>{t('philosophy.p2')}</p>
            <p>{t('philosophy.p3')}</p>
          </m.div>
        </div>
      </m.div>
    </Section>
  );
};
