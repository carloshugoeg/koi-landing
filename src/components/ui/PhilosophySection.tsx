import { motion } from 'framer-motion';
import { Trans, useTranslation } from 'react-i18next';

export const PhilosophySection = () => {
    const { t } = useTranslation();

    return (
        <section id="about" className="py-32 relative bg-koi-dark border-t border-white/5 overflow-hidden">
            {/* Abstract Background Element */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-koi-red/10 via-transparent to-transparent opacity-50 pointer-events-none rounded-bl-[100%]" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16 relative z-10">
                <div className="md:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full aspect-square md:aspect-[4/5] rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden relative group"
                    >
                        {/* Image Placeholder representing local business empowerment */}
                        <img
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
                            alt=""
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity group-hover:opacity-60 group-hover:mix-blend-normal transition-all duration-700"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-koi-dark via-koi-dark/20 to-transparent" />

                        <div className="absolute bottom-8 left-8 right-8">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-koi-red/20 border border-koi-red/30 text-koi-red text-sm font-medium backdrop-blur-md mb-4">
                                {t('philosophy.badge')}
                            </span>
                            <p className="text-xl font-medium text-white italic">{t('philosophy.quote')}</p>
                        </div>
                    </motion.div>
                </div>

                <div className="md:w-1/2">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
                    >
                        <Trans
                            i18nKey="philosophy.heading"
                            components={{ red: <span className="text-koi-red" /> }}
                        />
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-6 text-lg text-white/60 leading-relaxed"
                    >
                        <p>{t('philosophy.p1')}</p>
                        <p>{t('philosophy.p2')}</p>
                        <p>{t('philosophy.p3')}</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
