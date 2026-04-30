import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Utensils, Apple, ArrowRight, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

interface MobileBentoCardProps {
    title: string;
    description: string;
    icon: React.ElementType;
    index: number;
    href?: string;
    discoverLabel: string;
}

const MobileBentoCard = React.memo(({ title, description, icon: Icon, index, href, discoverLabel }: MobileBentoCardProps) => {
    const CardContent = (
        <>
            <div className="absolute inset-0 bg-gradient-to-br from-koi-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

            <div className="absolute top-6 right-6 w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-koi-red/10 group-hover:border-koi-red/20 transition-all duration-500 pointer-events-none">
                <Icon size={44} className="text-white/15 group-hover:text-koi-red/40 transition-colors duration-500" />
            </div>

            <div className="relative z-10 pointer-events-none">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-koi-red group-hover:scale-110 group-hover:bg-koi-red/10 group-hover:border-koi-red/30 transition-all duration-500">
                    <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 pr-28">{title}</h3>
                <p className="text-white/60 leading-relaxed text-balance text-sm">
                    {description}
                </p>
            </div>

            <div className="relative z-20 mt-auto pt-6 flex items-center gap-2 text-sm font-medium text-koi-red opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                {discoverLabel} <ArrowRight size={16} />
            </div>
        </>
    );

    const animationProps = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-100px' },
        transition: { duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    };

    const cardClassName = cn(
        'group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between min-h-[220px] hover:bg-white/[0.07] transition-colors duration-500 text-left'
    );

    if (href) {
        return (
            <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClassName}
                {...animationProps}
            >
                {CardContent}
            </motion.a>
        );
    }

    return (
        <motion.div className={cardClassName} {...animationProps}>
            {CardContent}
        </motion.div>
    );
});

export const BentoGridMobile = () => {
    const { t } = useTranslation();

    const products = [
        { title: t('bento.spaTitle'), description: t('bento.spaDescription'), icon: Sparkles },
        { title: t('bento.nutritionTitle'), description: t('bento.nutritionDescription'), icon: Apple },
        { title: t('bento.restaurantTitle'), description: t('bento.restaurantDescription'), icon: Utensils },
        { title: t('bento.iximchatTitle'), description: t('bento.iximchatDescription'), icon: MessageSquare, href: 'https://iximchat.koisoftware.com' },
    ];

    return (
        <section id="services" className="py-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-white mb-3"
                    >
                        {t('bento.heading')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-base text-white/60 max-w-2xl text-balance"
                    >
                        {t('bento.subheading')}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {products.map((item, i) => (
                        <MobileBentoCard
                            key={i}
                            {...item}
                            index={i}
                            discoverLabel={t('bento.discoverPlatform')}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
