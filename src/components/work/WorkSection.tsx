import { useTranslation } from 'react-i18next';
import { Section } from '../primitives/Section';
import { SectionHeading } from '../primitives/SectionHeading';
import { CaseStudy } from './CaseStudy';

export const WorkSection = () => {
  const { t } = useTranslation();

  return (
    <Section id="work" labelledBy="work-heading">
      <SectionHeading
        id="work-heading"
        overline={t('work.label')}
        heading={t('work.heading')}
        lead={t('work.lead')}
      />
      <div className="mt-16 md:mt-24 flex flex-col gap-24 md:gap-32">
        <CaseStudy id="pos" />
        <CaseStudy id="crm" flip />
        <CaseStudy id="nutrea" />
        <CaseStudy id="spa" flip />
      </div>
    </Section>
  );
};
