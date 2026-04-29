import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Utensils, Apple, ArrowRight, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';
import { KoiNutritionMockupV2 } from './KoiNutritionMockupV2';
import { SpaOperationsMockup } from './SpaOperationsMockup';
import { RestaurantOSMockup } from './RestaurantOSMockup';
import { IximChatMockup } from './IximChatMockup';

interface BentoCardProps {
    title: string;
    description: string;
    icon: React.ElementType;
    className?: string;
    textClassName?: string;
    index: number;
    children?: React.ReactNode;
    href?: string;
    discoverLabel: string;
}

const BentoCard = React.memo(({ title, description, icon: Icon, className, textClassName, index, children, href, discoverLabel }: BentoCardProps) => {
    const CardContent = (
        <>
            {/* Subtle hover gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-koi-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

            {/* Embedded 3D Mockup if provided */}
            {children}

            {/* Bottom gradient specifically for text legibility over abstract 3D models */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-koi-dark to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

            <div className={cn("relative z-10 pointer-events-none", textClassName)}>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-koi-red group-hover:scale-110 group-hover:bg-koi-red/10 group-hover:text-koi-red group-hover:border-koi-red/30 transition-all duration-500">
                    <Icon size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
                <p className="text-white/60 leading-relaxed text-balance">
                    {description}
                </p>
            </div>

            <div className="relative z-20 mt-auto pt-8 flex items-center gap-2 text-sm font-medium text-koi-red opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                {discoverLabel} <ArrowRight size={16} />
            </div>
        </>
    );

    const animationProps = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as any }
    };

    const cardClassName = cn(
        "group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col justify-between hover:bg-white/[0.07] transition-colors duration-500 text-left",
        className
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
        <motion.div
            className={cardClassName}
            {...animationProps}
        >
            {CardContent}
        </motion.div>
    );
});

export const BentoGrid = () => {
    const { t } = useTranslation();

    const products = [
        {
            title: t('bento.spaTitle'),
            description: t('bento.spaDescription'),
            icon: Sparkles,
            className: "min-h-[450px] md:min-h-[500px]",
            children: <SpaOperationsMockup />
        },
        {
            title: t('bento.nutritionTitle'),
            description: t('bento.nutritionDescription'),
            icon: Apple,
            className: "min-h-[450px] md:min-h-[500px]",
            children: <KoiNutritionMockupV2 />
        },
        {
            title: t('bento.restaurantTitle'),
            description: t('bento.restaurantDescription'),
            icon: Utensils,
            className: "min-h-[450px] md:min-h-[500px]",
            children: <RestaurantOSMockup />
        },
        {
            title: t('bento.iximchatTitle'),
            description: t('bento.iximchatDescription'),
            icon: MessageSquare,
            className: "min-h-[450px] md:min-h-[500px]",
            children: <IximChatMockup />,
            href: "https://iximchat.koisoftware.com"
        }
    ];

    return (
        <section id="services" className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col items-center text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        {t('bento.heading')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-white/60 max-w-2xl text-balance"
                    >
                        {t('bento.subheading')}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 auto-rows-fr">
                    {products.map((item, i) => (
                        <BentoCard key={i} {...item} index={i} discoverLabel={t('bento.discoverPlatform')} />
                    ))}
                </div>
            </div>
        </section>
    );
};
