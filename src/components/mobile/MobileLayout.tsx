import { Navbar } from '../ui/Navbar';
import { Hero } from '../ui/Hero';
import { LogoCarousel } from '../ui/LogoCarousel';
import { BentoGridMobile } from './BentoGridMobile';
import { AutomatizationsMobile } from './AutomatizationsMobile';
import { PhilosophySection } from '../ui/PhilosophySection';
import { ConsultingSection } from '../ui/ConsultingSection';
import { Footer } from '../ui/Footer';

export const MobileLayout = () => (
    <div className="min-h-screen bg-koi-dark text-white selection:bg-koi-red selection:text-white">
        <Navbar />
        <main>
            <Hero />
            <LogoCarousel />
            <BentoGridMobile />
            <AutomatizationsMobile />
            <PhilosophySection />
            <ConsultingSection />
        </main>
        <Footer />
    </div>
);
