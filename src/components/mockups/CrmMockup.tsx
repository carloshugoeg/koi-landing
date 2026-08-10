import { useEffect, useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { useIsVisible } from '../../hooks/useIsVisible';
import { FloatCard, MockupFrame, WindowChrome } from './MockupFrame';

// hotOrder: cards the idle "attention" ring cycles through (0 → 1 → 2)
const COLUMNS = [
  {
    title: 'Nuevos',
    cards: [
      { name: 'Café La Antigua', tag: 'WhatsApp', hotOrder: 0 },
      { name: 'Clínica Sonríe', tag: 'Instagram', hotOrder: null },
    ],
  },
  {
    title: 'En conversación',
    cards: [
      { name: 'Ferretería El Norte', tag: 'Cotización', hotOrder: 1 },
      { name: 'Academia Delta', tag: 'Demo', hotOrder: 2 },
    ],
  },
  {
    title: 'Cerrados',
    cards: [{ name: 'Hotel Casa Real', tag: 'Firmado', hotOrder: null }],
  },
] as const;

export default function CrmMockup() {
  const { ref, isVisible } = useIsVisible();
  const reduced = useReducedMotion();
  const [highlight, setHighlight] = useState(0);

  // Idle life: the "attention" ring wanders across hot cards while visible.
  useEffect(() => {
    if (!isVisible || reduced) return;
    const id = setInterval(() => setHighlight((h) => (h + 1) % 3), 2600);
    return () => clearInterval(id);
  }, [isVisible, reduced]);

  return (
    <div ref={ref}>
      <MockupFrame
        label="Vista previa de KoiCRM: pipeline de ventas en tres columnas"
        float={
          <FloatCard depth={56} className="right-[-4%] top-[12%] px-[1.1em] py-[0.9em]">
            <m.div
              initial={false}
              animate={
                reduced || !isVisible
                  ? { opacity: 1, y: 0 }
                  : { opacity: [0, 1, 1, 0], y: [8, 0, 0, 8] }
              }
              transition={reduced ? undefined : { duration: 7.8, times: [0, 0.06, 0.6, 0.66], repeat: Infinity, delay: 1.4 }}
              className="flex items-center gap-[0.7em]"
            >
              <span className="flex items-center justify-center w-[1.6em] h-[1.6em] rounded-full bg-emerald-500/20 text-emerald-400 text-[0.9em]">✓</span>
              <div>
                <p className="text-[0.9em] font-semibold text-white">Recordatorio enviado</p>
                <p className="text-[0.75em] text-white/50">Seguimiento automático</p>
              </div>
            </m.div>
          </FloatCard>
        }
      >
        <WindowChrome title="KoiCRM — Pipeline" />
        <div className="flex-1 min-h-0 p-[1.1em]">
          <div className="flex items-center justify-between mb-[1em]">
            <p className="text-[0.95em] font-semibold text-white/90">Ventas · Agosto</p>
            <div className="flex items-center gap-[0.4em] rounded-full bg-white/5 border border-white/10 px-[0.8em] py-[0.35em]">
              <span className="w-[0.6em] h-[0.6em] rounded-full border border-white/30" />
              <span className="text-[0.7em] text-white/40">Buscar cliente…</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[0.8em]">
            {COLUMNS.map(({ title, cards }) => (
              <div key={title} className="rounded-[0.7em] bg-white/[0.03] border border-white/8 p-[0.7em]">
                <div className="flex items-center justify-between mb-[0.7em]">
                  <p className="text-[0.75em] font-semibold text-white/60 uppercase tracking-wide">{title}</p>
                  <span className="text-[0.7em] text-white/30 tabular-nums">{cards.length}</span>
                </div>
                <div className="space-y-[0.6em]">
                  {cards.map((card) => {
                    const isLit = card.hotOrder === highlight;
                    return (
                      <div
                        key={card.name}
                        className={`rounded-[0.55em] bg-koi-raised border p-[0.7em] transition-colors duration-500 ${
                          isLit ? 'border-koi-red-400/70' : 'border-white/10'
                        }`}
                      >
                        <p className="text-[0.8em] font-medium text-white/85 truncate">{card.name}</p>
                        <span
                          className={`inline-block mt-[0.45em] px-[0.55em] py-[0.15em] rounded-full text-[0.65em] ${
                            title === 'Cerrados'
                              ? 'bg-emerald-500/15 text-emerald-400'
                              : 'bg-koi-red-500/15 text-koi-red-300'
                          }`}
                        >
                          {card.tag}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </MockupFrame>
    </div>
  );
}
