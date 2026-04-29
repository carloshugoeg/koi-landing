import { useTranslation } from 'react-i18next';
import { VitallyLogo } from './VitallyLogo';
import { VerticeLogo } from './VerticeLogo';
import { AquaxelaLogo } from './AquaxelaLogo';
import { LasFuentesLogo } from './LasFuentesLogo';

import { TentazioniLogo } from './TentazioniLogo';
import { ZakennayoLogo } from './ZakennayoLogo';
import { FotomatikoLogo } from './FotomatikoLogo';

type BrandItem = {
    name: string;
    content: React.ReactNode;
};

const baseBrands: BrandItem[] = [
    { name: "Vértice", content: <VerticeLogo /> },
    { name: "Tentazioni", content: <TentazioniLogo /> },
    { name: "AquaXela", content: <AquaxelaLogo /> },
    { name: "Vitally", content: <VitallyLogo /> },
    { name: "Las Fuentes", content: <LasFuentesLogo /> },
    { name: "Zakennayo", content: <ZakennayoLogo /> },
    { name: "Fotomatiko", content: <FotomatikoLogo /> }
];

// 4x duplication (28 items) — covers ultrawide at 3584px
// Animating to -50% means moving past 14 items seamlessly
const brands = [...baseBrands, ...baseBrands, ...baseBrands, ...baseBrands];

export const LogoCarousel = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24 overflow-hidden border-y border-white/5 bg-koi-dark/50">
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 text-center">
                <p className="text-sm font-medium text-white/40 tracking-wider uppercase">{t('logoCarousel.caption')}</p>
            </div>

            {/* Marquee Container */}
            <div className="flex relative w-full overflow-hidden group">

                {/* Gradients for fading edges */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-koi-dark to-transparent z-10" />
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-koi-dark to-transparent z-10" />

                <div
                    className="flex whitespace-nowrap min-w-max items-center gap-16 pr-16 animate-marquee"
                >
                    {brands.map((brand, i) => (
                        <div
                            key={`${brand.name}-${i}`}
                            className="w-32 h-12 md:w-48 md:h-16 flex items-center justify-center text-xl md:text-2xl font-bold text-white/20 select-none transition-colors duration-300 relative"
                        >
                            {brand.content}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
