import { m } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Section } from '../primitives/Section';
import { Button } from '../primitives/Button';
import { fadeRise, staggerParent, viewportOnce } from '../../lib/motion';
import { SITE } from '../../lib/site';

export const FinalCta = () => {
  const { t } = useTranslation();

  return (
    <Section id="contact" labelledBy="contact-heading" className="bg-koi-black overflow-hidden">
      {/* Static red/ember glow — the finale earns one big gesture */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(233,32,16,0.18),rgba(255,122,47,0.06)_50%,transparent_75%)] pointer-events-none"
      />
      <m.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative flex flex-col items-center text-center"
      >
        <m.h2
          id="contact-heading"
          variants={fadeRise}
          className="text-display md:text-display-lg lg:text-display-xl text-white max-w-3xl text-balance"
        >
          {t('cta.heading')}
        </m.h2>
        <m.p variants={fadeRise} className="mt-5 text-lead text-white/70 max-w-xl text-balance">
          {t('cta.subheading')}
        </m.p>
        <m.div variants={fadeRise} className="mt-10">
          <Button href={`mailto:${SITE.email}`} className="px-9 py-4">
            <Mail size={18} aria-hidden="true" />
            {SITE.email}
          </Button>
        </m.div>
      </m.div>
    </Section>
  );
};
