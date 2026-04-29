import { motion } from 'framer-motion';
import { useIsVisible } from '../../hooks/useIsVisible';

export const CrmMockup = () => {
    const { ref, isVisible } = useIsVisible();

    return (
        <div ref={ref} className="absolute right-0 bottom-0 md:-right-10 md:-bottom-10 w-[600px] h-[350px] pointer-events-none perspective-[1200px] z-0 opacity-90 group-hover:opacity-100 transition-opacity duration-500">
            <motion.div
                initial={{ rotateX: 20, rotateY: -10, rotateZ: 2, scale: 0.95 }}
                whileHover={{ rotateX: 10, rotateY: -5, rotateZ: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full h-full transform-style-3d text-sm font-sans"
            >
                {/* Main Dashboard Panel */}
                <div className="absolute inset-0 bg-gray-950 rounded-tl-xl rounded-tr-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="h-12 bg-white/5 border-b border-white/5 flex items-center px-6 justify-between shrink-0">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                            <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-16 bg-white/10 rounded-full" />
                            <div className="h-6 w-6 rounded-full bg-white/10" />
                        </div>
                    </div>

                    {/* Columns (Kanban Board) */}
                    <div className="flex-1 p-6 flex gap-4 overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-koi-red/5 via-transparent to-transparent">

                        {/* New Leads Column */}
                        <div className="flex-1 flex flex-col gap-3 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">New Leads</div>
                                <div className="text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded-full">3</div>
                            </div>

                            <motion.div className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors">
                                <div className="w-20 h-2.5 bg-white/20 rounded mb-2" />
                                <div className="flex justify-between items-end mt-4">
                                    <div className="w-16 h-2 bg-white/10 rounded" />
                                    <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-[8px] text-rose-300 font-bold border border-rose-500/30">JS</div>
                                </div>
                            </motion.div>

                            <motion.div className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors">
                                <div className="w-24 h-2.5 bg-white/20 rounded mb-2" />
                                <div className="flex justify-between items-end mt-4">
                                    <div className="w-12 h-2 bg-white/10 rounded" />
                                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-[8px] text-blue-300 font-bold border border-blue-500/30">MR</div>
                                </div>
                            </motion.div>
                        </div>

                        {/* In Progress Column */}
                        <div className="flex-1 flex flex-col gap-3 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-[11px] font-semibold text-koi-red/70 uppercase tracking-wider">In Progress</div>
                                <div className="text-xs bg-koi-red/10 text-koi-red px-2 py-0.5 rounded-full">2</div>
                            </div>

                            {/* Animated Moving Card */}
                            <motion.div
                                animate={isVisible ? {
                                    y: [40, 0, 0, 40],
                                    opacity: [0, 1, 1, 0],
                                    scale: [0.95, 1, 1, 0.95]
                                } : undefined}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    times: [0, 0.1, 0.9, 1],
                                    ease: "easeInOut"
                                }}
                                className="bg-koi-red/10 border border-koi-red/30 rounded-lg p-3 shadow-[0_0_15px_rgba(233,32,16,0.15)]"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="w-24 h-2.5 bg-white/30 rounded" />
                                    <div className="w-2 h-2 rounded-full bg-koi-red animate-pulse" />
                                </div>
                                <div className="flex justify-between items-end mt-4">
                                    <div className="w-20 h-2 bg-white/20 rounded" />
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-[8px] text-emerald-300 font-bold border border-emerald-500/30">AL</div>
                                </div>
                            </motion.div>

                            <motion.div className="bg-white/5 border border-white/10 rounded-lg p-3">
                                <div className="w-16 h-2.5 bg-white/20 rounded mb-2" />
                                <div className="flex justify-between items-end mt-4">
                                    <div className="w-14 h-2 bg-white/10 rounded" />
                                    <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-[8px] text-purple-300 font-bold border border-purple-500/30">TC</div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Closed Won Column */}
                        <div className="flex-1 flex flex-col gap-3 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-[11px] font-semibold text-emerald-500/70 uppercase tracking-wider">Closed Won</div>
                                <div className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full">12</div>
                            </div>

                            <motion.div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-20 h-2.5 bg-white/20 rounded" />
                                    <svg className="w-3 h-3 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div className="flex justify-between items-end mt-4">
                                    <div className="w-24 h-2 bg-white/10 rounded" />
                                    <div className="text-[10px] font-bold text-emerald-400">$2.4k</div>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>

                {/* Floating Metric 1 */}
                <motion.div
                    animate={isVisible ? { y: [-5, 5, -5] } : undefined}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 right-12 bg-gray-900 border border-white/10 rounded-xl p-3 shadow-2xl backdrop-blur-md flex items-center gap-3"
                    style={{ transform: "translateZ(30px)" }}
                >
                    <div className="w-8 h-8 rounded-lg bg-koi-red/10 flex items-center justify-center border border-koi-red/20">
                        <svg className="w-4 h-4 text-koi-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-[9px] text-white/50 font-medium uppercase tracking-wider mb-0.5">Conversion</div>
                        <div className="text-sm font-bold text-white">24.8%</div>
                    </div>
                </motion.div>

                {/* Floating Metric 2 */}
                <motion.div
                    animate={isVisible ? { y: [5, -5, 5] } : undefined}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-12 -left-6 bg-gray-900 border border-white/10 rounded-xl p-3 shadow-2xl backdrop-blur-md"
                    style={{ transform: "translateZ(40px)" }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <div className="text-[10px] text-white/70 font-medium">Pipeline Value</div>
                    </div>
                    <div className="text-lg font-bold text-emerald-400">$124,500</div>
                    <div className="w-24 h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "75%" }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="h-full bg-gradient-to-r from-emerald-500/50 to-emerald-400 rounded-full"
                        />
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
};
