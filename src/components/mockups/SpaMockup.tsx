import { m, useReducedMotion } from 'framer-motion';
import { useIsVisible } from '../../hooks/useIsVisible';
import { FloatCard, MockupFrame, WindowChrome } from './MockupFrame';

const HOURS = ['13:00', '14:00', '15:00', '16:00'];

// col: 0 = Cabina 1, 1 = Cabina 2, 2 = Terapeuta
const BOOKINGS = [
  { col: 0, row: 0, span: 1, label: 'Facial hidratante', tone: 'ember' },
  { col: 0, row: 2, span: 2, label: 'Piedras calientes', tone: 'red' },
  { col: 1, row: 1, span: 1, label: 'Masaje relajante', tone: 'red' },
  { col: 1, row: 3, span: 1, label: 'Aromaterapia', tone: 'neutral' },
  { col: 2, row: 0, span: 2, label: 'Sofía · turno A', tone: 'neutral' },
  { col: 2, row: 2, span: 2, label: 'Andrea · turno B', tone: 'ember' },
] as const;

const toneClasses = {
  red: 'bg-koi-red-500/20 border-koi-red-400/40 text-koi-red-200',
  ember: 'bg-koi-ember/15 border-koi-ember/40 text-orange-200',
  neutral: 'bg-white/8 border-white/15 text-white/70',
} as const;

export default function SpaMockup() {
  const { ref, isVisible } = useIsVisible();
  const reduced = useReducedMotion();

  return (
    <div ref={ref}>
      <MockupFrame
        label="Vista previa de SpaApp: agenda del día por cabina y terapeuta"
        float={
          <FloatCard depth={56} className="left-[-5%] top-[12%] px-[1.1em] py-[0.9em]">
            <m.div
              initial={false}
              animate={
                reduced || !isVisible
                  ? { opacity: 1, y: 0 }
                  : { opacity: [0, 1, 1, 0], y: [8, 0, 0, 8] }
              }
              transition={reduced ? undefined : { duration: 7.4, times: [0, 0.06, 0.6, 0.66], repeat: Infinity, delay: 0.8 }}
              className="flex items-center gap-[0.7em]"
            >
              <span className="flex items-center justify-center w-[1.6em] h-[1.6em] rounded-full bg-koi-red-500/20 text-koi-red-300 text-[0.85em]">✚</span>
              <div>
                <p className="text-[0.9em] font-semibold text-white">Nueva reserva</p>
                <p className="text-[0.75em] text-white/50">Masaje relajante · 14:00</p>
              </div>
            </m.div>
          </FloatCard>
        }
      >
        <WindowChrome title="SpaApp — Agenda del día" />
        <div className="flex-1 min-h-0 p-[1.1em] flex flex-col">
          <div className="flex items-center justify-between mb-[0.9em]">
            <p className="text-[0.95em] font-semibold text-white/90">Hoy · Jueves</p>
            <span className="text-[0.75em] text-white/40">3 espacios libres</span>
          </div>

          {/* Schedule grid */}
          <div className="grid grid-cols-[2.8em_1fr_1fr_1fr] gap-[0.45em] flex-1">
            <div />
            {['Cabina 1', 'Cabina 2', 'Terapeuta'].map((h) => (
              <p key={h} className="text-[0.7em] font-semibold text-white/50 text-center truncate">{h}</p>
            ))}
            {HOURS.map((hour, row) => (
              <div key={hour} className="contents">
                <p className="text-[0.65em] text-white/35 tabular-nums pt-[0.3em]">{hour}</p>
                {[0, 1, 2].map((col) => {
                  const booking = BOOKINGS.find((b) => b.col === col && b.row === row);
                  const covered = BOOKINGS.some((b) => b.col === col && row > b.row && row < b.row + b.span);
                  if (covered) return null;
                  if (!booking) {
                    return <div key={col} className="rounded-[0.4em] border border-dashed border-white/8 min-h-[2.2em]" />;
                  }
                  return (
                    <div
                      key={col}
                      style={booking.span > 1 ? { gridRow: `span ${booking.span}` } : undefined}
                      className={`rounded-[0.4em] border px-[0.55em] py-[0.4em] ${toneClasses[booking.tone]}`}
                    >
                      <p className="text-[0.68em] font-semibold leading-tight">{booking.label}</p>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Day occupancy */}
          <div className="mt-[0.9em]">
            <div className="flex items-center justify-between mb-[0.35em]">
              <span className="text-[0.7em] text-white/50">Ocupación del día</span>
            </div>
            <div className="h-[0.5em] rounded-full bg-white/8 overflow-hidden">
              <m.div
                initial={{ width: reduced ? '72%' : '8%' }}
                animate={{ width: isVisible || reduced ? '72%' : '8%' }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-koi-red-500 to-koi-ember"
              />
            </div>
          </div>
        </div>
      </MockupFrame>
    </div>
  );
}
