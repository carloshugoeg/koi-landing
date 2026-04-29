import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-koi-dark pt-32 pb-12 border-t border-white/10 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-koi-red/10 blur-[150px] rounded-[100%] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-24">
                    <div className="max-w-md">
                        <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">
                            {t('footer.heading')}
                        </h3>
                        <p className="text-white/60 text-lg mb-8 leading-relaxed">
                            {t('footer.subheading')}
                        </p>
                        <a
                            href="mailto:info@koisoftware.com"
                            className="inline-flex items-center gap-3 px-6 py-3 bg-koi-red text-white font-medium rounded-full hover:bg-koi-red/90 transition-colors duration-300 shadow-[0_0_20px_rgba(233,32,16,0.3)] group"
                        >
                            {t('footer.contactUs')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
                        <div>
                            <h4 className="text-white font-semibold mb-6">{t('footer.solutions')}</h4>
                            <ul className="space-y-4 text-white/50">
                                <li><a href="#" className="hover:text-white transition-colors">{t('footer.spaAdmin')}</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">{t('footer.nutrition')}</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">{t('footer.restaurants')}</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-6">{t('footer.company')}</h4>
                            <ul className="space-y-4 text-white/50">
                                <li><a href="#about" className="hover:text-white transition-colors">{t('footer.aboutUs')}</a></li>
                                <li><a href="#services" className="hover:text-white transition-colors">{t('footer.services')}</a></li>
                                <li><a href="mailto:info@koisoftware.com" className="hover:text-white transition-colors">{t('footer.careers')}</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-6">{t('footer.connect')}</h4>
                            <ul className="space-y-4 text-white/50">
                                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">WhatsApp</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-white/40 text-sm">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <span className="font-bold text-white tracking-wider">KOI SOFTWARE</span> © {new Date().getFullYear()}
                    </div>
                    <p>{t('footer.tagline')}</p>
                </div>
            </div>
        </footer>
    );
};
