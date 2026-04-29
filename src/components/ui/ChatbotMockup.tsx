import { motion } from 'framer-motion';
import { useIsVisible } from '../../hooks/useIsVisible';

export const ChatbotMockup = () => {
    const { ref, isVisible } = useIsVisible();

    return (
        <div ref={ref} className="absolute right-[-40px] top-6 w-[260px] h-[400px] pointer-events-none z-0 rotate-[5deg] group-hover:rotate-[2deg] group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-700">
            {/* Phone Frame */}
            <div className="w-full h-full bg-gray-900 rounded-[2rem] border-[6px] border-gray-800 shadow-2xl overflow-hidden flex flex-col relative before:absolute before:inset-0 before:rounded-[1.75rem] before:border before:border-white/10 before:z-10">
                {/* Header */}
                <div className="h-16 bg-gray-800/80 backdrop-blur-md flex items-center px-4 shrink-0 border-b border-gray-700 relative z-20">
                    <div className="w-8 h-8 rounded-full bg-koi-red/20 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-koi-red" />
                    </div>
                    <div className="ml-3">
                        <div className="text-sm font-semibold text-white">Koi Assistant</div>
                        <div className="text-[10px] text-green-400 tracking-wider font-medium">ONLINE</div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 p-4 flex flex-col gap-4 relative overflow-hidden bg-[#0a0a0a] z-0">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03]"
                        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '12px 12px' }} />

                    {/* Messages */}
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95, transformOrigin: 'top left' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 text-xs w-[85%] text-white shadow-sm font-medium leading-relaxed"
                    >
                        Hi! How can I help you grow your business today?
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, transformOrigin: 'top right' }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 0.4 }}
                        className="bg-koi-red rounded-2xl rounded-tr-sm p-3 text-xs w-[85%] text-white self-end shadow-sm font-medium leading-relaxed"
                    >
                        I need to automate my WhatsApp sales.
                    </motion.div>

                    {/* Animated Typing & Response Sequence */}
                    <div className="relative flex-1 w-full">
                        {/* Typing Bubble */}
                        <motion.div
                            animate={isVisible ? {
                                opacity: [0, 1, 1, 0, 0, 0],
                                y: [5, 0, 0, -5, -5, 5]
                            } : undefined}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                times: [0, 0.05, 0.3, 0.35, 0.95, 1],
                                ease: "easeInOut"
                            }}
                            className="absolute top-0 left-0 bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 inline-flex items-center gap-1.5 shadow-sm w-fit"
                        >
                            <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={isVisible ? { y: [0, -3, 0] } : undefined} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} />
                            <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={isVisible ? { y: [0, -3, 0] } : undefined} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} />
                            <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" animate={isVisible ? { y: [0, -3, 0] } : undefined} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} />
                        </motion.div>

                        {/* Final Response */}
                        <motion.div
                            animate={isVisible ? {
                                opacity: [0, 0, 0, 1, 1, 0],
                                y: [10, 10, 5, 0, 0, -5],
                                scale: [0.95, 0.95, 0.95, 1, 1, 0.95]
                            } : undefined}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                times: [0, 0.3, 0.35, 0.4, 0.95, 1],
                                ease: "easeOut"
                            }}
                            className="absolute top-0 left-0 bg-gray-800 rounded-2xl rounded-tl-sm p-3 text-xs w-[90%] text-white shadow-sm font-medium leading-relaxed transform-gpu"
                            style={{ transformOrigin: 'top left' }}
                        >
                            Perfect! I can set up an AI agent that handles inquiries and books appointments directly in your calendar. 🚀
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
};
