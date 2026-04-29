import { motion } from 'framer-motion';

export const RestaurantOSMockup = () => {
    return (
        <div className="absolute -right-4 top-[240px] md:top-[220px] w-[500px] h-[400px] pointer-events-none perspective-[2000px] z-0">
            <motion.div
                initial={{ rotateX: 10, rotateY: -15, z: 0 }}
                whileHover={{ rotateX: 5, rotateY: -5, z: 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full h-full transform-style-3d text-sm font-sans scale-[0.6] md:scale-[0.7] origin-top-right md:origin-top"
            >
                {/* Main Dashboard Panel - Restaurant Management Software */}
                <div className="absolute top-10 right-10 md:right-20 w-[420px] h-[260px] bg-white rounded-xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)] overflow-hidden border border-gray-200">
                    {/* Header */}
                    <div className="h-10 bg-white flex items-center justify-between px-4 border-b border-gray-100 dark:bg-zinc-900 border-b-zinc-800">
                        <div className="flex gap-4 items-center">
                            <div className="text-[14px] font-black text-koi-red tracking-tight">FUDO</div>
                            <div className="flex gap-2">
                                <div className="w-5 h-4 rounded bg-gray-100 dark:bg-zinc-800" />
                                <div className="w-5 h-4 rounded bg-gray-100 dark:bg-zinc-800" />
                                <div className="w-5 h-4 rounded bg-gray-100 dark:bg-zinc-800 hidden md:block" />
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <div className="w-16 h-3 bg-gray-100 dark:bg-zinc-800 rounded" />
                            <div className="w-5 h-5 rounded-full bg-orange-100 text-[10px] flex items-center justify-center font-bold text-orange-600">ZH</div>
                        </div>
                    </div>
                    {/* Subheader */}
                    <div className="h-8 bg-gray-700 dark:bg-zinc-800 flex items-center px-4">
                        <div className="text-[10px] font-bold text-white uppercase tracking-wider">Reportes</div>
                    </div>
                    <div className="flex h-[calc(100%-72px)] bg-gray-50 dark:bg-zinc-950">
                        {/* Sidebar */}
                        <div className="w-16 bg-gray-700 dark:bg-zinc-900 border-t border-gray-600 dark:border-zinc-800 flex flex-col pt-2 shadow-inner">
                            <div className="h-6 w-full bg-koi-red flex items-center px-2 mb-1">
                                <div className="w-full h-1.5 bg-white/70 rounded" />
                            </div>
                            <div className="h-6 w-full flex items-center px-2">
                                <div className="w-3/4 h-1.5 bg-white/30 rounded" />
                            </div>
                            <div className="h-6 w-full flex items-center px-2">
                                <div className="w-2/3 h-1.5 bg-white/30 rounded" />
                            </div>
                            <div className="h-6 w-full flex items-center px-2">
                                <div className="w-4/5 h-1.5 bg-white/20 rounded" />
                            </div>
                        </div>
                        {/* Content Area */}
                        <div className="flex-1 p-3 flex flex-col gap-3 overflow-hidden bg-gray-100/50 dark:bg-zinc-900/50">
                            {/* Chart Area */}
                            <div className="flex-1 bg-white dark:bg-zinc-900 rounded border border-gray-200 dark:border-zinc-800 p-2 relative shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex gap-3">
                                        <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm border border-emerald-500 bg-emerald-100" /><div className="w-10 h-1.5 bg-gray-200 dark:bg-zinc-700 rounded" /></div>
                                        <div className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm border border-orange-500 bg-orange-100" /><div className="w-10 h-1.5 bg-gray-200 dark:bg-zinc-700 rounded" /></div>
                                    </div>
                                </div>
                                <div className="absolute inset-x-2 bottom-2 top-8">
                                    {/* Grid */}
                                    <div className="absolute w-full h-full flex flex-col justify-between border-l border-b border-gray-200 dark:border-zinc-800 pb-1">
                                        <div className="w-full border-t border-dashed border-gray-100 dark:border-zinc-800" />
                                        <div className="w-full border-t border-dashed border-gray-100 dark:border-zinc-800" />
                                        <div className="w-full border-t border-dashed border-gray-100 dark:border-zinc-800" />
                                    </div>
                                    {/* Line Chart Emerald */}
                                    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                                        <path d="M0,40 L0,20 Q10,10 20,15 T40,5 T60,25 T70,5 T80,15 T100,20 L100,40 Z" fill="#34d399" opacity="0.3" />
                                        <path d="M0,20 Q10,10 20,15 T40,5 T60,25 T70,5 T80,15 T100,20" fill="none" stroke="#10b981" strokeWidth="1.5" />
                                        <circle cx="20" cy="15" r="1.5" fill="#10b981" />
                                        <circle cx="40" cy="5" r="1.5" fill="#10b981" />
                                        <circle cx="60" cy="25" r="1.5" fill="#10b981" />
                                        <circle cx="70" cy="5" r="1.5" fill="#10b981" />
                                        <circle cx="80" cy="15" r="1.5" fill="#10b981" />
                                    </svg>
                                    {/* Line Chart Orange */}
                                    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
                                        <path d="M0,30 Q10,5 20,20 T40,2 T60,20 T80,8 T90,20 T100,10" fill="none" stroke="#f97316" strokeWidth="1.5" />
                                        <circle cx="20" cy="20" r="1.5" fill="#f97316" />
                                        <circle cx="40" cy="2" r="1.5" fill="#f97316" />
                                        <circle cx="60" cy="20" r="1.5" fill="#f97316" />
                                        <circle cx="80" cy="8" r="1.5" fill="#f97316" />
                                        <circle cx="90" cy="20" r="1.5" fill="#f97316" />
                                    </svg>
                                </div>
                            </div>
                            {/* Pie Chart & Stats Area */}
                            <div className="h-16 flex gap-3">
                                <div className="flex-1 bg-white dark:bg-zinc-900 shadow-sm border border-gray-200 dark:border-zinc-800 rounded flex items-center justify-center gap-6">
                                    <div className="w-10 h-10 rounded-full border-[6px] border-[#f97316] border-l-[#334155] border-b-[#334155] -rotate-12"></div>
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#f97316] rounded-sm" /><div className="w-16 h-1.5 bg-gray-200 dark:bg-zinc-700 rounded" /></div>
                                        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-[#334155] rounded-sm" /><div className="w-12 h-1.5 bg-gray-200 dark:bg-zinc-700 rounded" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Computer - Pizzeria */}
                <motion.div
                    initial={{ z: 20, x: 0, y: 10 }}
                    whileHover={{ z: 80, x: -20, y: -10 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute top-12 left-[-10px] md:-left-20 w-[260px] h-[170px] bg-stone-900 rounded-lg shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] border border-stone-700 overflow-hidden flex flex-col ring-1 ring-white/10"
                >
                    <div className="h-5 bg-stone-800 flex items-center px-2 gap-1.5 border-b border-stone-700 shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        <div className="mx-auto w-24 h-1.5 bg-stone-700 rounded" />
                    </div>
                    {/* Hero section Tentazioni */}
                    <div className="flex-1 relative flex flex-col items-center justify-center p-3 bg-[#1c1410]">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a08] to-transparent opacity-80 z-0"></div>
                        <div className="w-32 h-32 rounded-full border-[8px] border-[#100b09] bg-[#2a1d18] absolute opacity-60 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center z-0">
                            <div className="w-24 h-24 rounded-full bg-[#1c1410] inner-shadow"></div>
                        </div>

                        <div className="z-10 flex flex-col items-center mt-2 w-full text-center">
                            <div className="text-[6px] text-white/70 italic mb-0.5 font-serif">Pizzería Italiana</div>
                            <div className="font-serif text-white text-[20px] tracking-wide mb-1 shadow-sm leading-none">Tentazioni</div>
                            <div className="w-3/4 flex flex-col gap-1 items-center mt-2 mb-3">
                                <div className="w-full h-1 bg-white/40 rounded-full text-center"></div>
                                <div className="w-2/3 h-1 bg-white/40 rounded-full text-center"></div>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-16 h-5 bg-[#334155] rounded text-[6px] text-white flex items-center justify-center font-bold tracking-wider">Cotizar Evento</div>
                                <div className="w-16 h-5 bg-transparent border border-white/40 rounded text-[6px] text-white flex items-center justify-center font-bold tracking-wider hover:bg-white/10">Reservar Mesa</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Floating Phone - Sushi */}
                <motion.div
                    initial={{ z: 40, x: 0, y: 70 }}
                    whileHover={{ z: 100, x: 20, y: 50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute bottom-[-10px] right-2 md:-right-28 w-[120px] h-[240px] bg-zinc-900 rounded-[1.2rem] shadow-[0_30px_50px_-10px_rgba(0,0,0,0.8)] border-[5px] border-zinc-800 overflow-hidden flex flex-col relative ring-1 ring-white/5"
                >
                    {/* Notch */}
                    <div className="absolute top-0 inset-x-0 h-4 bg-zinc-800 rounded-b-xl w-1/2 mx-auto z-20"></div>

                    {/* Sushi site content */}
                    <div className="flex-1 relative bg-[#0a0a0a] flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1005] via-[#0f0a05] to-[#0a0a0a] z-0"></div>
                        <div className="absolute top-4 left-[-20px] w-24 h-24 bg-orange-600/30 rounded-full blur-[20px] z-0"></div>
                        <div className="absolute bottom-[-10px] right-[-10px] w-20 h-20 bg-green-600/20 rounded-full blur-[15px] z-0"></div>

                        {/* Header */}
                        <div className="h-10 pt-5 px-3 flex justify-between items-center z-10">
                            <div className="w-14 h-1.5 bg-white/90 rounded" />
                            <div className="w-3 h-2.5 flex flex-col justify-between">
                                <div className="w-full h-[1.5px] bg-white/90"></div>
                                <div className="w-full h-[1.5px] bg-white/90"></div>
                            </div>
                        </div>

                        {/* Hero */}
                        <div className="flex-1 flex flex-col justify-center px-4 z-10 w-full mt-4">
                            <div className="text-[20px] font-black text-white leading-[0.85] tracking-tighter self-start">ZAKEN</div>
                            <div className="text-[20px] font-black text-[#f05023] leading-[0.85] tracking-tighter mb-2 self-start">NAYO</div>
                            <div className="text-[6px] text-green-500/80 uppercase tracking-widest font-bold mb-4 self-start">Sushi con actitud</div>

                            <div className="w-full flex gap-1.5 mt-2">
                                <div className="flex-1 h-6 bg-[#f05023] rounded-[3px] text-[6px] text-white font-bold flex items-center justify-center">PEDIR AHORA</div>
                                <div className="flex-1 h-6 border-[1px] border-white/30 rounded-[3px] text-[6px] text-white font-bold flex items-center justify-center">VER MENU</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
};
