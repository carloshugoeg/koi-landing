import { m, useReducedMotion } from 'framer-motion';
import { useIsVisible } from '../../hooks/useIsVisible';
import { FloatCard, MockupFrame, WindowChrome } from './MockupFrame';

const MESAS = [
  { n: 1, state: 'free' },
  { n: 2, state: 'busy' },
  { n: 3, state: 'busy' },
  { n: 4, state: 'active' },
  { n: 5, state: 'free' },
  { n: 6, state: 'busy' },
  { n: 7, state: 'free' },
  { n: 8, state: 'free' },
] as const;

const TICKET = [
  { qty: 2, item: 'Pizza Margherita', price: 'Q170' },
  { qty: 1, item: 'Ensalada Caprese', price: 'Q65' },
  { qty: 3, item: 'Limonada de fresa', price: 'Q54' },
];

export default function PosMockup() {
  const { ref, isVisible } = useIsVisible();
  const reduced = useReducedMotion();

  return (
    <div ref={ref}>
      <MockupFrame
        label="Vista previa de Infinito POS: mapa de mesas y comanda activa"
        float={
          <FloatCard depth={56} className="left-[-5%] bottom-[10%] px-[1.1em] py-[0.9em]">
            <m.div
              initial={false}
              animate={
                reduced || !isVisible
                  ? { opacity: 1, y: 0 }
                  : { opacity: [0, 1, 1, 0], y: [8, 0, 0, 8] }
              }
              transition={reduced ? undefined : { duration: 7, times: [0, 0.06, 0.62, 0.68], repeat: Infinity }}
              className="flex items-center gap-[0.7em]"
            >
              <span className="flex items-center justify-center w-[1.6em] h-[1.6em] rounded-full bg-emerald-500/20 text-emerald-400 text-[0.9em]">✓</span>
              <div>
                <p className="text-[0.9em] font-semibold text-white">Comanda enviada a cocina</p>
                <p className="text-[0.75em] text-white/50">Mesa 4 · hace un momento</p>
              </div>
            </m.div>
          </FloatCard>
        }
      >
        <WindowChrome title="Infinito POS — Salón" />
        <div className="flex flex-1 min-h-0 p-[1.1em] gap-[1.1em]">
          {/* Mesa map */}
          <div className="flex-[1.4]">
            <div className="flex items-center justify-between mb-[0.9em]">
              <p className="text-[0.95em] font-semibold text-white/90">Salón principal</p>
              <span className="text-[0.75em] text-white/40">Turno de noche</span>
            </div>
            <div className="grid grid-cols-4 gap-[0.7em]">
              {MESAS.map(({ n, state }) => (
                <div
                  key={n}
                  className={
                    state === 'active'
                      ? 'aspect-square rounded-[0.6em] bg-koi-red-500/25 border border-koi-red-400/60 flex flex-col items-center justify-center'
                      : state === 'busy'
                        ? 'aspect-square rounded-[0.6em] bg-white/10 border border-white/15 flex flex-col items-center justify-center'
                        : 'aspect-square rounded-[0.6em] bg-white/[0.04] border border-white/8 flex flex-col items-center justify-center'
                  }
                >
                  <span className={`text-[0.85em] font-bold ${state === 'active' ? 'text-koi-red-300' : state === 'busy' ? 'text-white/80' : 'text-white/30'}`}>
                    {n}
                  </span>
                  <span className="text-[0.6em] text-white/40 mt-[0.2em]">
                    {state === 'free' ? 'Libre' : state === 'active' ? 'Comanda' : 'Ocupada'}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-[1em] flex items-center gap-[1.2em] text-[0.7em] text-white/40">
              <span className="flex items-center gap-[0.4em]"><i className="w-[0.7em] h-[0.7em] rounded-[0.2em] bg-white/10 border border-white/15" />Ocupada</span>
              <span className="flex items-center gap-[0.4em]"><i className="w-[0.7em] h-[0.7em] rounded-[0.2em] bg-koi-red-500/25 border border-koi-red-400/60" />Con comanda</span>
            </div>
          </div>

          {/* Active ticket */}
          <div className="flex-1 rounded-[0.7em] bg-koi-raised border border-white/10 p-[1em] flex flex-col">
            <div className="flex items-center justify-between pb-[0.7em] border-b border-white/10">
              <p className="text-[0.9em] font-semibold text-white">Mesa 4</p>
              <span className="text-[0.7em] text-white/40">Comanda #128</span>
            </div>
            <ul className="py-[0.7em] flex-1 space-y-[0.6em]">
              {TICKET.map(({ qty, item, price }) => (
                <li key={item} className="flex items-baseline justify-between gap-[0.5em]">
                  <span className="text-[0.8em] text-white/75">
                    <span className="text-white/40">{qty}×</span> {item}
                  </span>
                  <span className="text-[0.8em] text-white/50 tabular-nums">{price}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between pt-[0.7em] border-t border-white/10 mb-[0.8em]">
              <span className="text-[0.8em] text-white/60">Total</span>
              <span className="text-[1em] font-bold text-white tabular-nums">Q289</span>
            </div>
            <div className="rounded-full bg-gradient-to-r from-koi-red-500 to-koi-ember text-center py-[0.55em] text-[0.8em] font-semibold text-white">
              Enviar a cocina
            </div>
          </div>
        </div>
      </MockupFrame>
    </div>
  );
}
