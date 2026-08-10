import { m, useReducedMotion } from 'framer-motion';
import { useIsVisible } from '../../hooks/useIsVisible';
import { FloatCard, MockupFrame } from './MockupFrame';

const MESSAGES = [
  {
    from: 'user',
    text: '¿Cuándo es el momento óptimo de cosecha para la Parcela 4?',
  },
  {
    from: 'bot',
    text: 'Según el clima reciente y los sensores de humedad, la Parcela 4 (maíz) alcanzará condiciones óptimas de cosecha en 3 días.',
  },
  {
    from: 'bot',
    text: 'Cielo despejado las próximas 48 h — ideal para aspersión.',
  },
] as const;

export default function IximChatMockup() {
  const { ref, isVisible } = useIsVisible();
  const reduced = useReducedMotion();
  const show = isVisible || !!reduced;

  return (
    <div ref={ref}>
      <MockupFrame
        label="Vista previa de IximChat: conversación de WhatsApp con el asistente agrícola"
        aspect="aspect-[4/3]"
        float={
          <FloatCard depth={56} className="right-[2%] bottom-[10%] px-[1.1em] py-[0.9em]">
            <div>
              <p className="text-[0.75em] text-white/50 mb-[0.3em]">Humedad del suelo</p>
              <div className="flex items-center gap-[0.6em]">
                <div className="w-[6em] h-[0.45em] rounded-full bg-white/10 overflow-hidden">
                  <m.div
                    initial={{ width: reduced ? '84%' : '10%' }}
                    animate={{ width: show ? '84%' : '10%' }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="h-full rounded-full bg-emerald-400"
                  />
                </div>
                <span className="text-[0.8em] font-semibold text-emerald-400 tabular-nums">84%</span>
              </div>
            </div>
          </FloatCard>
        }
      >
        {/* Phone centered on a field-green wash */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_60%)]" />
        <div className="absolute inset-y-[6%] left-1/2 -translate-x-1/2 w-[46%] rounded-[1.4em] bg-koi-black border border-white/15 shadow-float overflow-hidden flex flex-col">
          {/* WhatsApp-style header */}
          <div className="flex items-center gap-[0.6em] px-[0.9em] py-[0.7em] bg-white/[0.05] border-b border-white/10">
            <span className="flex items-center justify-center w-[1.9em] h-[1.9em] rounded-full bg-emerald-500/25 text-emerald-300 text-[0.8em] font-bold">
              Ix
            </span>
            <div>
              <p className="text-[0.8em] font-semibold text-white leading-tight">IximChat</p>
              <p className="text-[0.65em] text-emerald-400 leading-tight">en línea</p>
            </div>
          </div>

          {/* Conversation */}
          <div className="flex-1 px-[0.7em] py-[0.8em] space-y-[0.6em] overflow-hidden">
            {MESSAGES.map((msg, i) => (
              <m.div
                key={i}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: reduced ? 0 : 0.5 + i * 0.9 }}
                className={
                  msg.from === 'user'
                    ? 'ml-[15%] rounded-[0.7em] rounded-br-[0.2em] bg-emerald-600/30 px-[0.7em] py-[0.5em]'
                    : 'mr-[15%] rounded-[0.7em] rounded-bl-[0.2em] bg-white/10 px-[0.7em] py-[0.5em]'
                }
              >
                <p className="text-[0.7em] text-white/90 leading-snug">{msg.text}</p>
              </m.div>
            ))}
            {/* Typing indicator after the exchange */}
            <m.div
              initial={reduced ? false : { opacity: 0 }}
              animate={show && !reduced ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
              transition={{ duration: 2.4, times: [0, 0.15, 0.8, 1], delay: 3.6, repeat: Infinity, repeatDelay: 3 }}
              className="mr-[15%] inline-flex items-center gap-[0.3em] rounded-[0.7em] bg-white/10 px-[0.7em] py-[0.5em]"
            >
              {[0, 1, 2].map((d) => (
                <span key={d} className="w-[0.35em] h-[0.35em] rounded-full bg-white/50" />
              ))}
            </m.div>
          </div>
        </div>
      </MockupFrame>
    </div>
  );
}
