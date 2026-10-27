import { useLayoutEffect, useRef } from 'react';
import { WHATSAPP } from '../ink/contacts.ts';
import { attachHero } from '../ink/hero.ts';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    return attachHero(hero);
  }, []);

  return (
    <>
      <div className="pondL" aria-hidden="true">
        <img className="dk" src="/ink/pool-desktop-bleed.png" alt="" />
        <img className="mb" src="/ink/pool-mobile-bleed.png" alt="" />
      </div>
      <header className="hero" id="inicio" ref={heroRef} aria-labelledby="hero-title">
        <img
          id="hm"
          className="hkoi mb"
          src="/ink/circ/00.png"
          alt=""
          style={{ transformOrigin: '55.56% 50%' }}
        />
        <img id="hk" className="hkoi dk" src="/ink/koi-lib/swim/00.png" alt="" />
        <nav>
          <a className="brand" href="#inicio">
            <span className="seal" style={{ width: 36, height: 36, fontSize: 18 }}>
              鯉
            </span>
            Koi Software
          </a>
          <span className="l">
            <a href="#proyectos">Trabajo</a>
            {'\u3000'}
            <a href="#servicios">Servicios</a>
            {'\u3000'}
            <a href="#nosotros">Nosotros</a>
            {'\u3000'}
            <span>ES/EN</span>
          </span>
          <a className="talk" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            Hablemos
          </a>
        </nav>
        <div className="t">
          <h1 id="hero-title">Software hecho a la medida.</h1>
          <p>Estudio de software. Sistemas tranquilos y precisos para negocios locales.</p>
          <a className="cta" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            <i />
            Hablemos
          </a>
        </div>
      </header>
    </>
  );
}
