import { useLayoutEffect, useRef } from 'react';
import { EMAIL, INSTAGRAM, WHATSAPP } from '../ink/contacts.ts';
import { clamp, prefersReducedMotion } from '../ink/motion.ts';

const ROWS = [
  { label: 'WHATSAPP', value: '+502 5871 3903', href: WHATSAPP, external: true },
  { label: 'CORREO', value: 'info@koisoftware.com', href: EMAIL, external: false },
  { label: 'INSTAGRAM', value: '@carloshugoeg', href: INSTAGRAM, external: true },
] as const;

export function Contacto() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = prefersReducedMotion();
    const reveals = [...section.querySelectorAll<HTMLElement>('.rv')];
    const koi = section.querySelector<HTMLElement>('.kw');
    const paint = () => {
      const viewport = window.innerHeight;
      reveals.forEach((item) => {
        if (reduce || item.getBoundingClientRect().top < viewport * 0.9) item.classList.add('in');
      });
      if (reduce || !koi) return;
      const rect = section.getBoundingClientRect();
      const progress = clamp((viewport - rect.top) / (rect.height + viewport));
      koi.style.transform = `rotate(${-30 + progress * 120}deg)`;
    };
    paint();
    window.addEventListener('scroll', paint, { passive: true });
    window.addEventListener('resize', paint);
    return () => {
      window.removeEventListener('scroll', paint);
      window.removeEventListener('resize', paint);
    };
  }, []);

  return (
    <>
      <section className="ct c3" id="contacto" ref={sectionRef} aria-labelledby="cth">
        <div className="lab2 rv">
          <span className="seal">四</span>
          CONTACTO
        </div>
        <h2 id="cth" className="rv">
          Empecemos por la <em>primera ronda</em>.
        </h2>
        <p className="lead rv">
          Una llamada para entender tu operación. Después, un preview funcionando que puedes probar antes de aprobar nada.
        </p>
        <a className="big rv" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
          <span className="seal">鯉</span>
          Agenda una primera llamada
        </a>
        <div className="rows">
          {ROWS.map((row) => (
            <a
              className="row rv"
              href={row.href}
              key={row.label}
              target={row.external ? '_blank' : undefined}
              rel={row.external ? 'noopener noreferrer' : undefined}
            >
              <span>{row.label}</span>
              <b>{row.value}</b>
            </a>
          ))}
        </div>
        <img className="kw" src="/ink/circ/00.png" alt="" aria-hidden="true" />
      </section>
    </>
  );
}

export function Footer() {
  return (
    <footer className="f2">
      <b>Koi Software</b>
      <span>Estudio integral de software</span>
      <span>© 2026</span>
    </footer>
  );
}
