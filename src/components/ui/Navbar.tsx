import { useState, useEffect } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { spring } from '../../lib/motion';
import { KoiMark } from './KoiMark';

const NAV_LINKS = [
  { key: 'nav.work', href: '#work' },
  { key: 'nav.services', href: '#services' },
  { key: 'nav.about', href: '#about' },
] as const;

const LanguageToggle = ({ className }: { className?: string }) => {
  const { i18n, t } = useTranslation();
  const current = i18n.resolvedLanguage ?? 'es';

  return (
    <div
      role="group"
      aria-label={t('a11y.changeLang')}
      className={cn('flex items-center rounded-full border border-white/15 p-0.5', className)}
    >
      {(['es', 'en'] as const).map((lng) => (
        <button
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          aria-pressed={current === lng}
          className={cn(
            'px-2.5 py-1 rounded-full text-caption font-semibold uppercase transition-colors duration-150',
            current === lng ? 'bg-white/15 text-white' : 'text-white/60 hover:text-white',
          )}
        >
          {lng}
        </button>
      ))}
    </div>
  );
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrolled = window.scrollY > 20;
        setIsScrolled((prev) => (prev === scrolled ? prev : scrolled));
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <m.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={spring.gentle}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-[padding,background-color] duration-300',
        isScrolled ? 'py-3 glass-nav' : 'py-5 bg-transparent',
      )}
    >
      {/* Scroll-edge hairline instead of a hard border */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent transition-opacity duration-300',
          isScrolled ? 'opacity-100' : 'opacity-0',
        )}
      />
      <nav aria-label={t('a11y.mainNav')} className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12">
        <a href="#main" className="flex items-center gap-2.5 text-white">
          <KoiMark />
          <span className="text-body-sm font-bold tracking-[0.06em] uppercase">Koi Software</span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ key, href }) => (
            <a
              key={href}
              href={href}
              className="text-body-sm font-medium text-white/70 hover:text-white transition-colors duration-150"
            >
              {t(key)}
            </a>
          ))}
          <LanguageToggle />
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full text-body-sm font-semibold bg-gradient-to-r from-koi-red-500 to-koi-ember text-white shadow-glow-red hover:brightness-110 transition-[filter] duration-150"
          >
            {t('nav.cta')}
          </a>
        </div>

        <button
          className="md:hidden text-white p-1 -mr-1"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, scaleY: 0.9, y: -8 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            exit={{ opacity: 0, scaleY: 0.95, y: -8, transition: { duration: 0.18 } }}
            transition={spring.sheet}
            className="md:hidden absolute top-full left-0 right-0 origin-top glass-nav border-b border-white/10 px-6 py-6 flex flex-col gap-5"
          >
            {NAV_LINKS.map(({ key, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-lead font-medium text-white/85 hover:text-white"
              >
                {t(key)}
              </a>
            ))}
            <div className="flex items-center justify-between pt-2">
              <LanguageToggle />
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="px-5 py-2.5 rounded-full text-body-sm font-semibold bg-gradient-to-r from-koi-red-500 to-koi-ember text-white"
              >
                {t('nav.cta')}
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.header>
  );
};
