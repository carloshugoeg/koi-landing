import { m, useReducedMotion } from 'framer-motion';
import { useIsVisible } from '../../hooks/useIsVisible';
import { FloatCard, MockupFrame, WindowChrome } from './MockupFrame';

const MEALS = [
  { day: 'Lun', meal: 'Desayuno alto en proteína', kcal: '420' },
  { day: 'Mar', meal: 'Almuerzo mediterráneo', kcal: '560' },
  { day: 'Mié', meal: 'Cena ligera + colación', kcal: '480' },
  { day: 'Jue', meal: 'Día de control — ayuno 12h', kcal: '—' },
  { day: 'Vie', meal: 'Menú libre supervisado', kcal: '610' },
];

// Gentle downward weight trend, drawn left → right
const TREND_PATH = 'M4 14 C 18 12, 30 22, 44 20 S 70 12, 84 16 S 108 26, 124 30';

export default function NutreaMockup() {
  const { ref, isVisible } = useIsVisible();
  const reduced = useReducedMotion();

  return (
    <div ref={ref}>
      <MockupFrame
        label="Vista previa de Nutrea: expediente de paciente con plan semanal y tendencia de peso"
        float={
          <FloatCard depth={56} className="right-[-4%] bottom-[14%] px-[1.1em] py-[0.9em]">
            <div className="flex items-center gap-[0.7em]">
              <span className="flex items-center justify-center w-[1.6em] h-[1.6em] rounded-full bg-koi-red-500/20 text-koi-red-300 text-[0.85em]">◷</span>
              <div>
                <p className="text-[0.9em] font-semibold text-white">Próxima cita</p>
                <p className="text-[0.75em] text-white/50">Jueves · 10:00</p>
              </div>
            </div>
          </FloatCard>
        }
      >
        <WindowChrome title="Nutrea — Expediente" />
        <div className="flex-1 min-h-0 p-[1.1em]">
          {/* Patient header */}
          <div className="flex items-center gap-[0.8em] mb-[1em]">
            <span className="flex items-center justify-center w-[2.4em] h-[2.4em] rounded-full bg-gradient-to-br from-koi-red-500/40 to-koi-ember/40 text-[0.9em] font-bold text-white">
              ML
            </span>
            <div>
              <p className="text-[0.95em] font-semibold text-white">María L.</p>
              <p className="text-[0.7em] text-white/40">Plan de mantenimiento · Semana 6</p>
            </div>
            <span className="ml-auto px-[0.7em] py-[0.3em] rounded-full bg-emerald-500/15 text-emerald-400 text-[0.7em] font-medium">
              Al día
            </span>
          </div>

          <div className="flex gap-[1em]">
            {/* Weekly plan */}
            <div className="flex-[1.3] rounded-[0.7em] bg-white/[0.03] border border-white/8 p-[0.8em]">
              <p className="text-[0.75em] font-semibold text-white/60 uppercase tracking-wide mb-[0.7em]">Plan semanal</p>
              <ul className="space-y-[0.55em]">
                {MEALS.map(({ day, meal, kcal }) => (
                  <li key={day} className="flex items-center gap-[0.7em]">
                    <span className="w-[2.2em] shrink-0 text-[0.7em] font-bold text-koi-red-300">{day}</span>
                    <span className="flex-1 text-[0.75em] text-white/70 truncate">{meal}</span>
                    <span className="text-[0.65em] text-white/35 tabular-nums">{kcal}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weight trend */}
            <div className="flex-1 rounded-[0.7em] bg-koi-raised border border-white/10 p-[0.8em] flex flex-col">
              <p className="text-[0.75em] font-semibold text-white/60 uppercase tracking-wide">Tendencia de peso</p>
              <div className="flex-1 flex items-center">
                <svg viewBox="0 0 128 40" className="w-full" aria-hidden="true">
                  <m.path
                    d={TREND_PATH}
                    fill="none"
                    stroke="url(#nutrea-line)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: reduced ? 1 : 0 }}
                    animate={{ pathLength: isVisible || reduced ? 1 : 0 }}
                    transition={{ duration: 1.4, ease: 'easeOut' }}
                  />
                  <defs>
                    <linearGradient id="nutrea-line" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#ff6a4d" />
                      <stop offset="1" stopColor="#ff7a2f" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p className="text-[0.7em] text-white/40">Registro constante, sin fricción</p>
            </div>
          </div>
        </div>
      </MockupFrame>
    </div>
  );
}
