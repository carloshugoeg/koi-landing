import { useLayoutEffect, useRef } from 'react';
import { attachOla } from '../ink/ola.ts';
import { SERVICES } from '../ink/projects.ts';

function Splash() {
  return (
    <svg className="sp" width="90" height="60" viewBox="-45 -40 90 60" aria-hidden="true">
      <g fill="#121212">
        <ellipse cx="0" cy="6" rx="26" ry="3.2" opacity=".55" />
        <circle cx="-14" cy="-9" r="2.6" />
        <circle cx="9" cy="-16" r="1.9" />
        <circle cx="19" cy="-6" r="1.4" />
        <circle cx="-5" cy="-22" r="1.2" />
        <circle cx="-24" cy="-2" r="1.1" />
        <path
          d="M-30 4 q 8 -6 16 -2 M12 2 q 9 -7 18 0"
          stroke="#121212"
          strokeWidth="1.2"
          fill="none"
          opacity=".7"
        />
      </g>
    </svg>
  );
}

export function Servicios() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    return attachOla(section);
  }, []);

  return (
    <section className="ola" id="servicios" ref={sectionRef} aria-label="Servicios">
      <div className="stage">
        <div className="lab">
          <span className="seal">一</span>
          SERVICIOS
        </div>
        <canvas id="wave" aria-hidden="true" />
        {SERVICES.map((service, index) => (
          <div className="svc" id={`s${index}`} key={service.title}>
            <span className="dot" />
            <h2>{service.title}</h2>
            <p>{service.body}</p>
          </div>
        ))}
        {Array.from({ length: 6 }, (_, index) => (
          <img className="k" alt="" src="/ink/koi-lib/swim/00.png" key={`koi-${index}`} />
        ))}
        {Array.from({ length: 12 }, (_, index) => (
          <Splash key={`splash-${index}`} />
        ))}
      </div>
    </section>
  );
}
