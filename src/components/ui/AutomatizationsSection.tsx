import React from 'react';
import { motion } from 'framer-motion';
import { Bot, LineChart, Link } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

import { ChatbotMockup } from './ChatbotMockup';
import { CrmMockup } from './CrmMockup';

interface FeatureCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    delay: number;
    className?: string;
    contentClassName?: string;
    children?: React.ReactNode;
}

const FeatureCard = React.memo(({ icon: Icon, title, description, delay, className, contentClassName, children }: FeatureCardProps) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className={cn(
            "group relative rounded-3xl overflow-hidden p-[1px] cursor-pointer",
            className
        )}
    >
        {/* Animated Border Gradient */}
        <span className="absolute inset-0 bg-gradient-to-r from-koi-red/0 via-koi-red/50 to-koi-red/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rotate-180 animate-[spin_4s_linear_infinite]" />

        <div className="relative h-full bg-koi-overlay/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 lg:p-10 flex flex-col z-10 transition-colors duration-500 hover:bg-koi-overlay overflow-hidden">
            <div className={cn("relative z-10 flex flex-col gap-6", contentClassName)}>
                <div className="w-14 h-14 rounded-2xl bg-koi-dark flex items-center justify-center border border-white/10 group-hover:border-koi-red/50 group-hover:text-koi-red transition-all duration-300 shrink-0">
                    <Icon size={28} className="text-white group-hover:text-koi-red" />
                </div>
                <div>
                    <h3 className="text-2xl font-semibold text-white mb-3 tracking-tight group-hover:-translate-y-1 transition-transform duration-300">{title}</h3>
                    <p className="text-white/60 leading-relaxed text-balance group-hover:text-white/70 transition-colors">
                        {description}
                    </p>
                </div>
            </div>
            {children}
        </div>
    </motion.div>
));

export const AutomatizationsSection = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24 relative overflow-hidden bg-koi-dark z-0">
            {/* Background glow behind features */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-koi-red/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="mb-20 md:w-2/3">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 text-koi-red font-medium mb-6 uppercase tracking-wider text-sm"
                    >
                        <span className="w-8 h-[1px] bg-koi-red" /> {t('automatizations.label')}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]"
                    >
                        {t('automatizations.heading')}
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FeatureCard
                        icon={Bot}
                        title={t('automatizations.chatbotsTitle')}
                        description={t('automatizations.chatbotsDescription')}
                        delay={0.1}
                        className="md:col-span-2 min-h-[400px]"
                        contentClassName="md:w-1/2"
                    >
                        <ChatbotMockup />
                    </FeatureCard>
                    <FeatureCard
                        icon={Link}
                        title={t('automatizations.omnichannelTitle')}
                        description={t('automatizations.omnichannelDescription')}
                        delay={0.2}
                        className="md:col-span-1"
                    />
                    <FeatureCard
                        icon={LineChart}
                        title={t('automatizations.crmTitle')}
                        description={t('automatizations.crmDescription')}
                        delay={0.3}
                        className="md:col-span-2 lg:col-span-3 min-h-[300px]"
                        contentClassName="md:w-1/2 lg:w-1/3"
                    >
                        <CrmMockup />
                    </FeatureCard>
                </div>
            </div>
        </section>
    );
};
