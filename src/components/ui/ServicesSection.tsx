import { m } from 'framer-motion';
import { Wrench, RefreshCw, Code2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Section } from '../primitives/Section';
import { SectionHeading } from '../primitives/SectionHeading';
import { fadeRise, staggerParent, viewportOnce } from '../../lib/motion';

const ROWS: { key: string; icon: LucideIcon }[] = [
  { key: 'accessories', icon: Wrench },
  { key: 'optimization', icon: RefreshCw },
  { key: 'tailored', icon: Code2 },
];

export const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <Section id="services" labelledBy="services-heading">
      <SectionHeading
        id="services-heading"
        heading={t('services.heading')}
        lead={t('services.subheading')}
      />

      <m.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 border-t border-white/10"
      >
        {ROWS.map(({ key, icon: Icon }) => (
          <m.div
            key={key}
            variants={fadeRise}
            className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-10 py-8 px-4 -mx-4 border-b border-white/10 rounded-panel hover:bg-white/[0.03] transition-colors duration-200"
          >
            <div className="flex items-center gap-5 md:w-2/5">
              <span className="shrink-0 w-11 h-11 rounded-panel bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-koi-red-400 group-hover:border-koi-red-400/40 transition-colors duration-200">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="text-title-sm text-white">{t(`services.${key}.title`)}</h3>
            </div>
            <p className="text-body-sm text-white/70 md:flex-1">{t(`services.${key}.body`)}</p>
          </m.div>
        ))}
      </m.div>

      {/* Cómo trabajamos */}
      <m.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-16"
      >
        <m.p variants={fadeRise} className="text-overline uppercase text-white/50 mb-8">
          {t('services.process.label')}
        </m.p>
        <div className="grid md:grid-cols-3 gap-8">
          {(['step1', 'step2', 'step3'] as const).map((step, i) => (
            <m.div key={step} variants={fadeRise} className="flex gap-4">
              <span className="text-title font-serif italic text-koi-red-400/80" aria-hidden="true">
                0{i + 1}
              </span>
              <div>
                <h3 className="text-body font-semibold text-white">{t(`services.process.${step}Title`)}</h3>
                <p className="mt-1 text-body-sm text-white/60">{t(`services.process.${step}Body`)}</p>
              </div>
            </m.div>
          ))}
        </div>
      </m.div>
    </Section>
  );
};
