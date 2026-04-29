import { Navbar } from './components/ui/Navbar';
import { Hero } from './components/ui/Hero';
import { LogoCarousel } from './components/ui/LogoCarousel';
import { BentoGrid } from './components/ui/BentoGrid';
import { AutomatizationsSection } from './components/ui/AutomatizationsSection';
import { PhilosophySection } from './components/ui/PhilosophySection';
import { ConsultingSection } from './components/ui/ConsultingSection';
import { Footer } from './components/ui/Footer';

function App() {
  return (
    <div className="min-h-screen bg-koi-dark text-white selection:bg-koi-red selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <LogoCarousel />
        <BentoGrid />
        <AutomatizationsSection />
        <PhilosophySection />
        <ConsultingSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
