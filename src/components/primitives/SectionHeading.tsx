import { m } from 'framer-motion';
import { cn } from '../../lib/utils';
import { fadeRise, staggerParent, viewportOnce } from '../../lib/motion';

interface SectionHeadingProps {
  id: string;
  overline?: string;
  heading: string;
  lead?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading = ({ id, overline, heading, lead, align = 'left', className }: SectionHeadingProps) => (
  <m.div
    variants={staggerParent}
    initial="hidden"
    whileInView="visible"
    viewport={viewportOnce}
    className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}
  >
    {overline && (
      <m.p variants={fadeRise} className="text-overline uppercase text-koi-red-400 mb-4">
        {overline}
      </m.p>
    )}
    <m.h2 id={id} variants={fadeRise} className="text-display md:text-display-lg text-white text-balance">
      {heading}
    </m.h2>
    {lead && (
      <m.p variants={fadeRise} className="mt-5 text-lead text-white/70 text-balance">
        {lead}
      </m.p>
    )}
  </m.div>
);
