import { useLayoutEffect, useRef } from 'react';
import { WHATSAPP } from '../ink/contacts.ts';
import { clamp, prefersReducedMotion, stepNosotros, tornClips, type NosotrosPhase } from '../ink/motion.ts';
import { LAYERS } from '../ink/projects.ts';

export function Nosotros() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduce = prefersReducedMotion();
    let phase: NosotrosPhase = stepNosotros('checkMotion', { type: 'probe', reduce });
    const leaves = [...section.querySelectorAll<HTMLElement>('.leaf')];
    const reveals = [...section.querySelectorAll<HTMLElement>('.rv')];
    const koi = section.querySelector<HTMLElement>('.koi1');
    const hanko = section.querySelector<HTMLElement>('.hanko');
    tornClips(leaves.length).forEach((clip, index) => {
      const leaf = leaves[index];
      if (leaf) leaf.style.clipPath = clip;
    });

    const cleanups: Array<() => void> = [];
    if (!reduce && window.matchMedia('(hover: hover)').matches) {
      leaves.forEach((leaf) => {
        const move = (event: PointerEvent) => {
          const rect = leaf.getBoundingClientRect();
          leaf.style.setProperty('--tx', `${((event.clientX - rect.left) / rect.width - 0.5) * 4}deg`);
          leaf.style.setProperty('--ty', `${((event.clientY - rect.top) / rect.height - 0.5) * -4}deg`);
        };
        const leave = () => {
          leaf.style.setProperty('--tx', '0deg');
          leaf.style.setProperty('--ty', '0deg');
        };
        leaf.addEventListener('pointermove', move);
        leaf.addEventListener('pointerleave', leave);
        cleanups.push(() => {
          leaf.removeEventListener('pointermove', move);
          leaf.removeEventListener('pointerleave', leave);
        });
      });
    }

    const paint = () => {
      const viewport = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const entered = rect.top < viewport * 0.95;
      reveals.forEach((item) => {
        if (reduce || item.getBoundingClientRect().top < viewport * 0.88) item.classList.add('in');
      });
      const spin = reduce ? 1 : clamp((viewport - rect.top) / (rect.height + viewport));
      if (koi) koi.style.transform = `rotate(${60 + spin * 90}deg)`;
      let complete = true;
      leaves.forEach((leaf) => {
        const progress = reduce ? 1 : clamp((viewport * 0.95 - leaf.getBoundingClientRect().top) / (viewport * 0.45));
        leaf.style.setProperty('--q', String(progress));
        leaf.classList.toggle('on', progress > 0.98);
        if (progress <= 0.98) complete = false;
      });
      const hankoOn = reduce || (hanko ? hanko.getBoundingClientRect().top < viewport * 0.8 : true);
      if (hanko && hankoOn) hanko.classList.add('on');
      if (!hankoOn) complete = false;
      if (entered) phase = stepNosotros(phase, { type: 'enter' });
      phase = stepNosotros(phase, { type: 'progress', complete: complete && entered });
      section.dataset.phase = phase;
    };

    paint();
    window.addEventListener('scroll', paint, { passive: true });
    window.addEventListener('resize', paint);
    return () => {
      window.removeEventListener('scroll', paint);
      window.removeEventListener('resize', paint);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <section
      className="ns2 b1"
      id="nosotros"
      ref={sectionRef}
      aria-labelledby="nsh"
      data-phase="checkMotion"
    >
      <div className="lab2 rv">
        <span className="seal">三</span>
        NOSOTROS
      </div>
      <div className="hd">
        <h2 id="nsh" className="rv">
          Se construye en capas.
          <br />
          Tú apruebas <em>cada una</em>.
        </h2>
        <p className="lead rv">
          Un estudio integral de software: estrategia, diseño, desarrollo y nube en un mismo proceso. Ninguna capa se pega sobre la anterior sin tu visto bueno.
        </p>
      </div>
      <div className="pile">
        {LAYERS.map((layer, index) => (
          <article className={`leaf l${index} torn`} key={layer.n}>
            <span className="tape" aria-hidden="true" />
            <span className="k" aria-hidden="true">
              {layer.seal}
            </span>
            <span className="n">{layer.n}</span>
            <h3>{layer.title}</h3>
            <p>{layer.body}</p>
          </article>
        ))}
      </div>
      <div className="foot">
        <div className="ctaw">
          <span className="hanko" aria-hidden="true">
            承認
          </span>
          <a className="cta2" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            <i />
            Agenda una primera llamada
          </a>
        </div>
      </div>
      <img className="koi1" src="/ink/circ/00.png" alt="" aria-hidden="true" />
    </section>
  );
}
