import { lazy, Suspense } from 'react';
import { m } from 'framer-motion';
import { Bot, MessagesSquare, Workflow, ArrowUpRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Section } from '../primitives/Section';
import { SectionHeading } from '../primitives/SectionHeading';
import { Chip } from '../primitives/Chip';
import { Button } from '../primitives/Button';
import { MockupSkeleton } from '../mockups/MockupFrame';
import { fadeRise, staggerParent, viewportOnce } from '../../lib/motion';
import { useIsVisible } from '../../hooks/useIsVisible';
import { SITE } from '../../lib/site';

const IximChatMockup = lazy(() => import('../mockups/IximChatMockup'));

const CAPABILITIES: { key: string; icon: LucideIcon }[] = [
  { key: 'chatbots', icon: Bot },
  { key: 'omnichannel', icon: MessagesSquare },
  { key: 'funnels', icon: Workflow },
];

const CapabilityCard = ({ cap }: { cap: (typeof CAPABILITIES)[number] }) => {
  const { t } = useTranslation();
  const Icon = cap.icon;

  return (
    <m.div
      variants={fadeRise}
      className="group relative rounded-card bg-koi-surface border border-white/10 p-8 overflow-hidden"
    >
      {/* Gradient hairline that brightens on hover */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-koi-red-500/40 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300"
      />
      <div className="w-12 h-12 rounded-panel bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-koi-red-400/50 group-hover:text-koi-red-400 transition-colors duration-300 text-white/80">
        <Icon size={22} aria-hidden="true" />
      </div>
      <h3 className="text-title-sm text-white mb-3">{t(`automations.${cap.key}.title`)}</h3>
      <p className="text-body-sm text-white/70">{t(`automations.${cap.key}.body`)}</p>
    </m.div>
  );
};

export const AutomationSection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useIsVisible('400px');

  return (
    <Section id="automations" labelledBy="automations-heading" className="bg-koi-black/40">
      <SectionHeading
        id="automations-heading"
        overline={t('automations.label')}
        heading={t('automations.heading')}
      />

      <m.div
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 grid md:grid-cols-3 gap-6"
      >
        {CAPABILITIES.map((cap) => (
          <CapabilityCard key={cap.key} cap={cap} />
        ))}
      </m.div>

      {/* IximChat — live proof */}
      <m.div
        ref={ref}
        variants={staggerParent}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-6 rounded-card bg-koi-surface border border-white/10 p-8 md:p-12 grid lg:grid-cols-2 gap-10 items-center"
      >
        <div className="max-w-xl">
          <m.div variants={fadeRise}>
            <Chip className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
              {t('automations.iximchat.live')}
            </Chip>
          </m.div>
          <m.h3 variants={fadeRise} className="mt-5 text-title md:text-display text-white text-balance">
            {t('automations.iximchat.headline')}
          </m.h3>
          <m.p variants={fadeRise} className="mt-4 text-body text-white/70">
            {t('automations.iximchat.body')}
          </m.p>
          <m.div variants={fadeRise} className="mt-7">
            <Button href={SITE.iximchat} variant="ghost" external>
              {t('automations.iximchat.visit')}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Button>
          </m.div>
        </div>
        <m.div variants={fadeRise}>
          {isVisible ? (
            <Suspense fallback={<MockupSkeleton />}>
              <IximChatMockup />
            </Suspense>
          ) : (
            <MockupSkeleton />
          )}
        </m.div>
      </m.div>
    </Section>
  );
};
