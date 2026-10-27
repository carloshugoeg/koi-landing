import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { EMAIL } from '../ink/contacts.ts';
import { prefersReducedMotion } from '../ink/motion.ts';
import { PROJECTS, type Project } from '../ink/projects.ts';
import { attachProjects } from '../ink/projectsMotion.ts';

export function Proyectos() {
  const hostRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeTimer = useRef(0);
  const [current, setCurrent] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    return attachProjects(host);
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const dialog = dialogRef.current;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    let inner = 0;
    const frame = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => dialog?.classList.add('vis'));
    });
    const focusTimer = window.setTimeout(
      () => cardRef.current?.querySelector<HTMLElement>('.x')?.focus(),
      prefersReducedMotion() ? 0 : 60,
    );
    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(inner);
      window.clearTimeout(focusTimer);
      dialog?.classList.remove('vis');
      root.style.overflow = previous;
    };
  }, [open]);

  const close = () => {
    dialogRef.current?.classList.remove('vis');
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
      setCurrent(null);
      lastFocus.current?.focus();
    }, prefersReducedMotion() ? 0 : 420);
  };

  const show = (project: Project, item: HTMLElement) => {
    window.clearTimeout(closeTimer.current);
    lastFocus.current = item;
    setCurrent(project);
    setOpen(true);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== 'Tab') return;
    const card = cardRef.current;
    if (!card) return;
    const focusable = [...card.querySelectorAll<HTMLElement>('button, a')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <section className="pj2" id="proyectos" ref={hostRef} aria-label="Proyectos">
      <div className="lab2">
        <span className="seal">二</span>
        PROYECTOS
      </div>
      {PROJECTS.map((project, index) => (
        <div
          className="pjx"
          key={project.key}
          tabIndex={0}
          role="button"
          aria-haspopup="dialog"
          aria-label={`Ver proyecto ${project.name}`}
          onClick={(event) => show(project, event.currentTarget)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              show(project, event.currentTarget);
            }
          }}
        >
          <img className="pad" src={`/ink/as/pad${index + 1}.png`} alt="" />
          <img className="stk" src={`/ink/as/stroke${index + 1}.png`} alt="" />
          <div className="tx">
            <em>
              <span className="seal">{project.seal}</span>
              {project.category}
            </em>
            <h3>{project.name}</h3>
            <p>{project.summary}</p>
            <ul>
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <span className="go">
              Ver proyecto <b>→</b>
            </span>
          </div>
        </div>
      ))}
      <div className={`pm${open ? ' on' : ''}`} ref={dialogRef} onKeyDown={onKeyDown}>
        <div className="bk" onClick={close} />
        <div
          className="card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pmh"
          tabIndex={-1}
          ref={cardRef}
        >
          <span className="grab" />
          <div className="gal">
            <div className="main">
              <div className="ph">
                Capturas en preparación.
                <br />
              </div>
            </div>
            <p className="cap">Imagen de referencia pendiente</p>
          </div>
          <div className="inf">
            {current ? (
              <>
                <button className="x" type="button" aria-label="Cerrar" onClick={close}>
                  ×
                </button>
                <em
                  style={{
                    fontStyle: 'normal',
                    fontSize: 12,
                    letterSpacing: '.28em',
                    color: '#5E5A53',
                    display: 'flex',
                    gap: 12,
                    alignItems: 'center',
                  }}
                >
                  <span className="seal" style={{ width: 18, height: 18, fontSize: 10 }}>
                    {current.seal}
                  </span>
                  {current.category.toUpperCase()}
                </em>
                <h2 id="pmh">{current.name}</h2>
                <p>{current.summary}</p>
                <h3>Qué hace</h3>
                <ul>
                  {current.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <h3>Stack</h3>
                <div className="stack">
                  {current.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <h3>¿Algo así para tu negocio?</h3>
                <p>
                  <a href={EMAIL} style={{ color: '#121212' }}>
                    info@koisoftware.com
                  </a>
                </p>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
