import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
    };

    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const scrolled = window.scrollY > 20;
                setIsScrolled(prev => prev === scrolled ? prev : scrolled);
                ticking = false;
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-12',
                isScrolled ? 'py-4 bg-koi-dark/80 backdrop-blur-lg border-b border-white/5' : 'py-6 bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight text-white uppercase">
                        KOI SOFTWARE
                    </span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    <a href="#services" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                        {t('nav.services')}
                    </a>
                    <a href="#about" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                        {t('nav.about')}
                    </a>
                    <a href="#portfolio" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                        {t('nav.portfolio')}
                    </a>
                    <button
                        onClick={toggleLanguage}
                        className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                    >
                        {i18n.language === 'es' ? 'EN' : 'ES'}
                    </button>
                    <a
                        href="mailto:info@koisoftware.com"
                        className="px-5 py-2.5 text-sm font-medium bg-koi-red text-white rounded-full hover:bg-koi-red/90 transition-colors shadow-[0_0_15px_rgba(233,32,16,0.5)]"
                    >
                        {t('nav.contact')}
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 bg-koi-dark border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
                >
                    <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white">{t('nav.services')}</a>
                    <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white">{t('nav.about')}</a>
                    <a href="#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-white/80 hover:text-white">{t('nav.portfolio')}</a>
                    <button onClick={() => { toggleLanguage(); setIsMobileMenuOpen(false); }} className="text-lg font-medium text-white/80 hover:text-white text-left">
                        {i18n.language === 'es' ? 'EN' : 'ES'}
                    </button>
                    <a href="mailto:info@koisoftware.com" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-koi-red">{t('nav.contactUs')}</a>
                </motion.div>
            )}
        </motion.nav>
    );
};
