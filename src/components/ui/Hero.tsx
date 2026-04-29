import { motion } from 'framer-motion';
import { Trans, useTranslation } from 'react-i18next';
import { ParticleNetwork } from './ParticleNetwork';

export const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-koi-dark">
            {/* Particle Network Layer */}
            <div className="absolute inset-0 z-0 opacity-100">
                <ParticleNetwork />
            </div>

            {/* Background gradients for masking particles behind text and High-End Studio look */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,15,17,0.8)_0%,rgba(15,15,17,0.4)_40%,transparent_100%)] pointer-events-none z-0" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-koi-red/20 blur-[120px] rounded-full pointer-events-none opacity-40 z-0" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm mb-8 backdrop-blur-md"
                >
                    <span className="w-2 h-2 rounded-full bg-koi-red animate-pulse" />
                    {t('hero.badge')}
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white max-w-5xl mb-6 text-balance"
                >
                    <Trans
                        i18nKey="hero.heading"
                        components={{ gradient: <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50" /> }}
                    />
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 text-balance"
                >
                    {t('hero.subheading')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-center gap-4"
                >
                    <a
                        href="mailto:info@koisoftware.com"
                        className="px-8 py-4 bg-white text-koi-dark font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                        {t('hero.cta')}
                    </a>
                    <a
                        href="#services"
                        className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border border-white/20 hover:bg-white/5 transition-colors duration-300"
                    >
                        {t('hero.ctaSecondary')}
                    </a>
                </motion.div>
            </div>

            {/* Bottom fade out to blend into the next section */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-koi-dark to-transparent" />
        </section>
    );
};
