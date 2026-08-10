import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { SITE } from '../../lib/site';
import { KoiMark } from './KoiMark';

const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) => (
  <div>
    <h3 className="text-overline uppercase text-white/50 mb-4">{title}</h3>
    <ul className="flex flex-col gap-3">
      {links.map(({ label, href, external }) => (
        <li key={href + label}>
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="inline-flex items-center gap-1 text-body-sm text-white/70 hover:text-white transition-colors duration-150"
          >
            {label}
            {external && <ArrowUpRight size={14} aria-hidden="true" />}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer = () => {
  const { t } = useTranslation();

  const connectLinks = [
    ...(SITE.social.instagram ? [{ label: 'Instagram', href: SITE.social.instagram, external: true }] : []),
    ...(SITE.social.linkedin ? [{ label: 'LinkedIn', href: SITE.social.linkedin, external: true }] : []),
    { label: SITE.email, href: `mailto:${SITE.email}` },
  ];

  return (
    <footer className="border-t border-white/10 bg-koi-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-24">
          <div className="col-span-2 md:col-span-1">
            <a href="#main" className="flex items-center gap-2.5 text-white">
              <KoiMark />
              <span className="text-body-sm font-bold tracking-[0.06em] uppercase">Koi Software</span>
            </a>
          </div>
          <FooterColumn
            title={t('footer.solutions')}
            links={[
              { label: t('footer.portfolio'), href: '#work' },
              { label: t('footer.automation'), href: '#automations' },
              { label: 'IximChat', href: SITE.iximchat, external: true },
            ]}
          />
          <FooterColumn
            title={t('footer.company')}
            links={[
              { label: t('footer.aboutUs'), href: '#about' },
              { label: t('footer.services'), href: '#services' },
              { label: t('footer.contact'), href: '#contact' },
            ]}
          />
          <FooterColumn title={t('footer.connect')} links={connectLinks} />
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-caption text-white/60">KOI SOFTWARE © {new Date().getFullYear()}</p>
          <p className="text-caption text-white/60">{t('footer.tagline')}</p>
        </div>
      </div>
    </footer>
  );
};
