import { LazyMotion, MotionConfig } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/ui/Navbar';
import { Hero } from './components/ui/Hero';
import { LogoMarquee } from './components/ui/LogoMarquee';
import { WorkSection } from './components/work/WorkSection';
import { AutomationSection } from './components/ui/AutomationSection';
import { PhilosophySection } from './components/ui/PhilosophySection';
import { ServicesSection } from './components/ui/ServicesSection';
import { FinalCta } from './components/ui/FinalCta';
import { Footer } from './components/ui/Footer';

const loadMotionFeatures = () => import('./lib/motion-features').then((mod) => mod.default);

function App() {
  const { t } = useTranslation();

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-koi-red-500 focus:text-white focus:rounded-full"
        >
          {t('a11y.skipToContent')}
        </a>
        <div className="min-h-screen bg-koi-dark text-white">
          <Navbar />
          <main id="main">
            <Hero />
            <LogoMarquee />
            <WorkSection />
            <AutomationSection />
            <PhilosophySection />
            <ServicesSection />
            <FinalCta />
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
