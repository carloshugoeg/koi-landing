import { motion } from 'framer-motion';

export const KoiNutritionMockupV2 = () => {
    return (
        <div className="absolute -right-4 top-[250px] md:top-[230px] w-[500px] h-[400px] pointer-events-none perspective-[2000px] z-0">
            <motion.div
                initial={{ rotateX: 15, rotateY: -15, z: 0 }}
                whileHover={{ rotateX: 5, rotateY: -5, z: 50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full h-full transform-style-3d text-sm font-sans"
            >
                {/* Main Dashboard Panel */}
                <div className="absolute top-0 left-12 w-[380px] h-[280px] bg-white rounded-xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] overflow-hidden border border-white/20 backdrop-blur-xl opacity-90 flex flex-col">
                    <div className="h-10 bg-gray-50 flex items-center px-4 border-b border-gray-100 shrink-0">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                        </div>
                        <div className="mx-auto h-4 w-32 bg-gray-200 rounded-full" />
                    </div>
                    <div className="p-5 flex gap-4 flex-1">
                        {/* Sidebar */}
                        <div className="w-16 h-full flex flex-col gap-3 shrink-0">
                            <div className="w-8 h-8 rounded-lg bg-green-100" />
                            <div className="w-8 h-8 rounded-lg bg-gray-100" />
                            <div className="w-8 h-8 rounded-lg bg-gray-100" />
                            <div className="w-8 h-8 rounded-lg bg-gray-100" />
                        </div>
                        {/* Main Content */}
                        <div className="flex-1 flex flex-col gap-4 min-min-w-0">
                            <div className="flex gap-4 shrink-0">
                                {/* Mini Bar Chart Box */}
                                <div className="h-20 flex-1 bg-white rounded-lg border border-gray-100 p-2.5 shadow-sm flex flex-col justify-between">
                                    <div className="flex items-center justify-between">
                                        <div className="w-10 h-2 bg-gray-200 rounded" />
                                        <div className="text-[8px] text-emerald-500 font-bold">+5%</div>
                                    </div>
                                    <div className="flex items-end justify-between h-8 gap-1">
                                        <div className="w-full bg-emerald-100 rounded-t-[2px] h-[30%]" />
                                        <div className="w-full bg-emerald-200 rounded-t-[2px] h-[50%]" />
                                        <div className="w-full bg-emerald-300 rounded-t-[2px] h-[40%]" />
                                        <div className="w-full bg-emerald-400 rounded-t-[2px] h-[80%]" />
                                        <div className="w-full bg-emerald-500 rounded-t-[2px] h-[100%]" />
                                        <div className="w-full bg-emerald-300 rounded-t-[2px] h-[60%]" />
                                    </div>
                                </div>
                                {/* Mini Area Chart Box */}
                                <div className="h-20 flex-1 bg-white rounded-lg border border-gray-100 p-2.5 shadow-sm flex flex-col relative overflow-hidden">
                                    <div className="flex items-center justify-between z-10">
                                        <div className="w-12 h-2 bg-gray-200 rounded" />
                                    </div>
                                    <div className="flex items-baseline gap-1 mt-1 z-10">
                                        <div className="text-[10px] font-bold text-gray-700">1,240</div>
                                        <div className="text-[7px] text-gray-400">kcal</div>
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 h-10 w-full z-0">
                                        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
                                            <path d="M0,40 L0,30 Q20,35 40,20 T80,25 L100,10 L100,40 Z" fill="#fef3c7" opacity="0.6" />
                                            <path d="M0,30 Q20,35 40,20 T80,25 L100,10" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 bg-white rounded-lg border border-gray-100 p-4 relative overflow-hidden flex flex-col min-h-0">
                                <div className="flex items-center justify-between mb-2 z-10 shrink-0">
                                    <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Weight Trend</div>
                                    <div className="w-12 h-2 bg-gray-100 rounded-full" />
                                </div>
                                {/* Realistic Data Chart Area */}
                                <div className="flex-1 w-full relative z-0 mt-2 min-h-0">
                                    {/* Horizontal grid lines */}
                                    <div className="absolute top-0 w-full border-t border-dashed border-gray-200" />
                                    <div className="absolute top-1/3 w-full border-t border-dashed border-gray-200" />
                                    <div className="absolute top-2/3 w-full border-t border-dashed border-gray-200" />
                                    <div className="absolute bottom-0 w-full border-t border-dashed border-gray-400" />

                                    {/* SVG Line Chart */}
                                    <svg className="absolute inset-x-0 bottom-0 w-full h-[120%]" preserveAspectRatio="none" viewBox="0 0 100 100">
                                        <title>Patient Trend</title>
                                        {/* Shadow/Glow effect */}
                                        <path
                                            d="M0,80 Q20,50 40,65 T80,35 L100,45"
                                            fill="none"
                                            stroke="#d1fae5"
                                            strokeWidth="6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            transform="translate(0, 4)"
                                        />
                                        {/* Main Line */}
                                        <path
                                            d="M0,80 Q20,50 40,65 T80,35 L100,45"
                                            fill="none"
                                            stroke="#10b981"
                                            strokeWidth="3.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />

                                        {/* Subtle Fill underneath line */}
                                        <path
                                            d="M0,80 Q20,50 40,65 T80,35 L100,45 L100,105 L0,105 Z"
                                            fill="url(#v2-chart-gradient)"
                                            opacity="0.25"
                                        />
                                        <defs>
                                            <linearGradient id="v2-chart-gradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#10b981" />
                                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>

                                        {/* Data Points */}
                                        <circle cx="0" cy="80" r="4" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                                        <circle cx="40" cy="65" r="4" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                                        <circle cx="80" cy="35" r="4" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                                        <circle cx="100" cy="45" r="4" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Patient Card (Parallax) */}
                <motion.div
                    initial={{ z: 20, y: 0, x: 0 }}
                    whileHover={{ z: 80, y: -20, x: -10 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute top-[-20px] left-[-20px] w-64 p-4 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] border border-gray-100"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                            VS
                        </div>
                        <div>
                            <div className="w-24 h-4 bg-gray-800 rounded mb-1" />
                            <div className="w-16 h-3 bg-gray-300 rounded" />
                        </div>
                    </div>
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="text-[10px] text-gray-400 uppercase font-semibold mb-1">IMC</div>
                            <div className="text-xl font-bold text-amber-500">22.4</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Evolución</div>
                            <div className="text-sm font-bold text-emerald-500">-2.1 kg</div>
                        </div>
                    </div>
                </motion.div>

                {/* Floating Metrics Badge (Parallax) */}
                <motion.div
                    initial={{ z: 10, y: 0, x: 0 }}
                    whileHover={{ z: 60, y: 10, x: 20 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute bottom-20 right-10 w-48 p-4 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700"
                >
                    <div className="flex justify-between items-center mb-2">
                        <div className="w-4 h-4 rounded-full bg-koi-red" />
                        <div className="w-12 h-3 bg-gray-700 rounded" />
                    </div>
                    <div className="w-[80%] h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="w-[65%] h-full bg-gradient-to-r from-koi-red to-orange-400" />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};
