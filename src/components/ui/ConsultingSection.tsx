import { motion } from 'framer-motion';
import { Wrench, RefreshCw, Code2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ServiceRow = ({ title, description, icon: Icon, delay }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-8 border-b border-white/10 hover:border-koi-red/50 transition-colors duration-300"
        >
            <div className="flex items-center gap-6 w-full">
                <div className="w-14 h-14 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-koi-red group-hover:border-koi-red/30 transition-all duration-300">
                    <Icon size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-koi-red transition-colors duration-300">{title}</h3>
                    <p className="text-white/60 text-lg">{description}</p>
                </div>
            </div>
        </motion.div>
    );
};

export const ConsultingSection = () => {
    const { t } = useTranslation();

    return (
        <section className="py-32 bg-koi-dark">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            {t('consulting.heading')}
                        </h2>
                        <p className="text-base md:text-xl text-white/50">
                            {t('consulting.subheading')}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col border-t border-white/10">
                    <ServiceRow
                        icon={Wrench}
                        title={t('consulting.accessoriesTitle')}
                        description={t('consulting.accessoriesDescription')}
                        delay={0.1}
                    />
                    <ServiceRow
                        icon={RefreshCw}
                        title={t('consulting.optimizationTitle')}
                        description={t('consulting.optimizationDescription')}
                        delay={0.2}
                    />
                    <ServiceRow
                        icon={Code2}
                        title={t('consulting.tailoredTitle')}
                        description={t('consulting.tailoredDescription')}
                        delay={0.3}
                    />
                </div>

                <div className="mt-16 flex justify-center">
                    <a
                        href="mailto:info@koisoftware.com"
                        className="inline-flex px-8 py-4 bg-white text-koi-dark font-semibold rounded-full hover:bg-white/90 transition-colors duration-300"
                    >
                        {t('consulting.cta')}
                    </a>
                </div>
            </div>
        </section>
    );
};
