import { lazy, Suspense } from 'react';
import { m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { fadeRise, scaleIn, staggerParent, viewportOnce } from '../../lib/motion';
import { useIsVisible } from '../../hooks/useIsVisible';
import { Chip } from '../primitives/Chip';
import { MockupSkeleton } from '../mockups/MockupFrame';

const MOCKUPS = {
  pos: lazy(() => import('../mockups/PosMockup')),
  crm: lazy(() => import('../mockups/CrmMockup')),
  nutrea: lazy(() => import('../mockups/NutreaMockup')),
  spa: lazy(() => import('../mockups/SpaMockup')),
} as const;

export type CaseStudyId = keyof typeof MOCKUPS;

interface CaseStudyProps {
  id: CaseStudyId;
  /** Mockup on the left on desktop. */
  flip?: boolean;
}

export const CaseStudy = ({ id, flip }: CaseStudyProps) => {
  const { t } = useTranslation();
  // Mount the mockup chunk just before it scrolls into view
  const { ref, isVisible } = useIsVisible('400px');
  const Mockup = MOCKUPS[id];
  const k = `work.${id}`;

  return (
    <m.article
      ref={ref}
      variants={staggerParent}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        'grid lg:grid-cols-2 gap-10 lg:gap-16 items-center',
      )}
    >
      <div className={cn('max-w-xl', flip && 'lg:order-2')}>
        <m.p variants={fadeRise} className="text-overline uppercase text-koi-red-400 mb-3">
          {t(`${k}.title`)} · {t(`${k}.label`)}
        </m.p>
        <m.h3 variants={fadeRise} className="text-title md:text-display text-white text-balance">
          {t(`${k}.headline`)}
        </m.h3>
        <m.p variants={fadeRise} className="mt-4 text-body text-white/70">
          {t(`${k}.body`)}
        </m.p>
        <m.div variants={fadeRise} className="mt-6 flex flex-wrap gap-2">
          {(['tag1', 'tag2', 'tag3'] as const).map((tag) => (
            <Chip key={tag}>{t(`${k}.${tag}`)}</Chip>
          ))}
        </m.div>
      </div>

      <m.div variants={scaleIn} className={cn(flip && 'lg:order-1')}>
        {isVisible ? (
          <Suspense fallback={<MockupSkeleton />}>
            <Mockup />
          </Suspense>
        ) : (
          <MockupSkeleton />
        )}
      </m.div>
    </m.article>
  );
};
