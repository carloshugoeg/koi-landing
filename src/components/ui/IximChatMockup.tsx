import { motion } from 'framer-motion';

export const IximChatMockup = () => {
    return (
        <div className="absolute -right-4 md:-right-8 top-[280px] md:top-[250px] w-[500px] h-[400px] pointer-events-none perspective-[2000px] z-0">
            <motion.div
                initial={{ rotateX: 10, rotateY: -10, z: 0 }}
                whileHover={{ rotateX: 2, rotateY: -5, z: 40 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative w-full h-full transform-style-3d text-sm font-sans scale-[0.65] md:scale-[0.7] origin-top-left md:origin-top"
            >
                {/* Main WhatsApp-style Chat Interface */}
                <div className="absolute top-0 left-12 w-[320px] h-[420px] bg-[#0b141a] rounded-[2rem] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] border-[6px] border-gray-800 overflow-hidden flex flex-col">
                    {/* Header */}
                    <div className="h-16 bg-[#202c33] flex items-center px-4 shrink-0 gap-3 z-10 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 border-2 border-emerald-500">
                            <span className="text-white text-lg font-bold">🌽</span>
                        </div>
                        <div className="flex-1">
                            <div className="text-white font-semibold text-[15px]">IximChat Assistant</div>
                            <div className="text-emerald-500 text-[12px] font-medium">Online</div>
                        </div>
                        <div className="flex gap-3">
                            <div className="w-5 h-5 rounded-full bg-white/10" />
                            <div className="w-5 h-5 rounded-full bg-white/10" />
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 bg-[#0b141a] p-4 flex flex-col gap-4 relative overflow-hidden">
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-[0.03] z-0"
                            style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '12px 12px' }}>
                        </div>

                        {/* Date badge */}
                        <div className="flex justify-center relative z-10">
                            <div className="bg-[#202c33] text-gray-300 text-[11px] px-3 py-1 rounded-lg">Today</div>
                        </div>

                        {/* User Message */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#005c4b] text-white p-3 rounded-2xl rounded-tr-sm self-end max-w-[85%] relative z-10 text-[13px] shadow-sm"
                        >
                            What's the optimal harvest time for Plot 4?
                            <div className="text-[10px] text-emerald-200 text-right mt-1">09:41 AM</div>
                        </motion.div>

                        {/* Bot Message with Chart/Data */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-[#202c33] text-white p-3 rounded-2xl rounded-tl-sm self-start max-w-[90%] relative z-10 text-[13px] shadow-sm"
                        >
                            <p className="mb-2 leading-relaxed">Based on recent weather data and soil moisture sensors, <strong className="text-emerald-400">Plot 4 (Corn)</strong> will reach optimal harvest conditions in <strong className="text-emerald-400">3 days</strong>.</p>

                            {/* Embedded Mini Insight Card */}
                            <div className="bg-[#111b21] rounded-xl p-3 border border-gray-700/50 mt-2 mb-1">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-400 text-[11px] uppercase tracking-wider">Expected Yield</span>
                                    <span className="text-emerald-500 font-bold text-[12px]">↑ 12%</span>
                                </div>
                                <div className="w-full h-8 flex gap-1 items-end opacity-80">
                                    <div className="w-1/5 bg-emerald-900 rounded-t-sm h-[40%]" />
                                    <div className="w-1/5 bg-emerald-800 rounded-t-sm h-[50%]" />
                                    <div className="w-1/5 bg-emerald-700 rounded-t-sm h-[70%]" />
                                    <div className="w-1/5 bg-emerald-600 rounded-t-sm h-[85%]" />
                                    <div className="w-1/5 bg-emerald-500 rounded-t-sm h-[100%]" />
                                </div>
                            </div>
                            <div className="text-[10px] text-gray-400 text-right mt-1">09:42 AM</div>
                        </motion.div>
                    </div>

                    {/* Input Area */}
                    <div className="h-16 bg-[#202c33] flex items-center px-3 z-10 shrink-0 gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                            <div className="w-4 h-4 rounded bg-white/20" />
                        </div>
                        <div className="flex-1 h-10 bg-[#2a3942] rounded-full px-4 flex items-center">
                            <span className="text-gray-400 text-[14px]">Message...</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
                            <div className="w-4 h-4 rounded-full bg-white" />
                        </div>
                    </div>
                </div>

                {/* Floating Farm Metric Badge (Parallax) */}
                <motion.div
                    initial={{ z: 20, y: 0, x: 0 }}
                    whileHover={{ z: 80, y: -15, x: -20 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute top-[40px] left-0 md:-left-12 w-48 p-3 bg-white/5 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_-5px_rgba(0,0,0,0.5)] border border-white/10"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/30">
                            🌱
                        </div>
                        <div>
                            <div className="text-white font-semibold text-[13px]">Soil Moisture</div>
                            <div className="text-gray-400 text-[10px]">Plot 4 Sensors</div>
                        </div>
                    </div>
                    <div className="flex justify-between items-end mt-2">
                        <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-emerald-500 h-full w-[84%]" />
                        </div>
                        <div className="text-[11px] font-bold text-emerald-400 ml-3">84%</div>
                    </div>
                </motion.div>

                {/* Second Floating Element */}
                <motion.div
                    initial={{ z: 10, y: 0, x: 0 }}
                    whileHover={{ z: 60, y: 15, x: 20 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute bottom-20 right-4 md:-right-10 w-40 p-3 bg-emerald-950/80 backdrop-blur-md rounded-2xl shadow-2xl border border-emerald-800/50"
                >
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">☀️</span>
                        <div className="text-[12px] font-semibold text-emerald-100">Weather Alert</div>
                    </div>
                    <div className="text-[11px] text-emerald-200/80 leading-tight">
                        Clear skies next 48h. Ideal for spraying.
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};
