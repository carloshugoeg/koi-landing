import { Contacto, Footer } from './components/Contacto.tsx';
import { Hero } from './components/Hero.tsx';
import { Nosotros } from './components/Nosotros.tsx';
import { Proyectos } from './components/Proyectos.tsx';
import { Servicios } from './components/Servicios.tsx';

export default function App() {
  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <Hero />
      <main id="contenido">
        <Servicios />
        <Proyectos />
        <Nosotros />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
