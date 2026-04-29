import { motion } from 'framer-motion';

export const SpaOperationsMockup = () => {
    return (
        <div className="absolute -right-4 top-[250px] md:top-[230px] w-[500px] h-[400px] pointer-events-none perspective-[2000px] z-0">
            <motion.div
                initial={{ rotateX: 15, rotateY: -15, z: 0 }}
                whileHover={{ rotateX: 5, rotateY: -5, z: 50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full h-full transform-style-3d text-sm font-sans"
            >
                {/* Main Dashboard Panel - Calendar/Bookings */}
                <div className="absolute top-0 left-12 w-[380px] h-[280px] bg-white rounded-xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] overflow-hidden border border-white/20 backdrop-blur-xl opacity-90">
                    <div className="h-10 bg-gray-50 flex items-center px-4 border-b border-gray-100 justify-between">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                        </div>
                        <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Schedule</div>
                        <div className="w-4 h-4 rounded-full bg-gray-200" />
                    </div>

                    <div className="flex h-[240px]">
                        {/* Time Column */}
                        <div className="w-12 border-r border-gray-100 flex flex-col pt-8 pb-2 px-2 gap-6 text-[8px] text-gray-400 text-right">
                            <div>09:00</div>
                            <div>10:00</div>
                            <div>11:00</div>
                            <div>12:00</div>
                        </div>

                        {/* Rooms/Staff Columns */}
                        <div className="flex-1 flex relative">
                            {/* Horizontal Grid Lines */}
                            <div className="absolute inset-0 flex flex-col justify-between pt-10 pb-4 pointer-events-none">
                                <div className="border-t border-gray-50 w-full"></div>
                                <div className="border-t border-gray-50 w-full"></div>
                                <div className="border-t border-gray-50 w-full"></div>
                                <div className="border-t border-gray-50 w-full"></div>
                            </div>

                            {/* Column 1: Massage Room */}
                            <div className="flex-1 border-r border-gray-50 relative">
                                <div className="h-8 border-b border-gray-100 flex items-center justify-center text-[9px] font-medium text-gray-500 bg-gray-50">Room 1</div>
                                {/* Appointment Block */}
                                <div className="absolute top-12 left-1 right-1 h-14 bg-rose-50 border border-rose-100 rounded-md p-1.5 shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-rose-400 mb-1" />
                                    <div className="w-3/4 h-1.5 bg-rose-200 rounded mb-1" />
                                    <div className="w-1/2 h-1.5 bg-rose-100 rounded" />
                                </div>
                                {/* Appointment Block 2 */}
                                <div className="absolute top-36 left-1 right-1 h-20 bg-blue-50 border border-blue-100 rounded-md p-1.5 shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-blue-400 mb-1" />
                                    <div className="w-full h-1.5 bg-blue-200 rounded mb-1" />
                                    <div className="w-2/3 h-1.5 bg-blue-100 rounded" />
                                </div>
                            </div>

                            {/* Column 2: Facial Room */}
                            <div className="flex-1 border-r border-gray-50 relative">
                                <div className="h-8 border-b border-gray-100 flex items-center justify-center text-[9px] font-medium text-gray-500 bg-gray-50">Room 2</div>
                                {/* Appointment Block */}
                                <div className="absolute top-20 left-1 right-1 h-24 bg-amber-50 border border-amber-100 rounded-md p-1.5 shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-amber-400 mb-1" />
                                    <div className="w-4/5 h-1.5 bg-amber-200 rounded mb-1" />
                                    <div className="w-3/5 h-1.5 bg-amber-100 rounded" />
                                </div>
                            </div>

                            {/* Column 3: Therapist */}
                            <div className="flex-1 relative">
                                <div className="h-8 border-b border-gray-100 flex items-center justify-center text-[9px] font-medium text-gray-500 bg-gray-50">Therapist</div>
                                {/* Appointment Block */}
                                <div className="absolute top-10 left-1 right-1 h-10 bg-emerald-50 border border-emerald-100 rounded-md p-1.5 shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 mb-1" />
                                    <div className="w-2/3 h-1.5 bg-emerald-200 rounded" />
                                </div>
                                <div className="absolute top-28 left-1 right-1 h-16 bg-purple-50 border border-purple-100 rounded-md p-1.5 shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-purple-400 mb-1" />
                                    <div className="w-5/6 h-1.5 bg-purple-200 rounded mb-1" />
                                    <div className="w-1/2 h-1.5 bg-purple-100 rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Notification Card (Parallax) */}
                <motion.div
                    initial={{ z: 20, y: 0, x: 0 }}
                    whileHover={{ z: 80, y: -15, x: -15 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute top-10 -left-6 w-56 p-3 bg-white/95 backdrop-blur-2xl rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] border border-gray-100 flex items-center gap-3"
                >
                    <div className="w-10 h-10 rounded-full bg-koi-red/10 flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-koi-red">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                            <path d="m9 16 2 2 4-4" />
                        </svg>
                    </div>
                    <div>
                        <div className="text-[10px] text-gray-400 font-semibold uppercase mb-0.5">New Booking</div>
                        <div className="text-xs font-bold text-gray-800">Swedish Massage</div>
                        <div className="text-[10px] text-gray-500">Today, 2:00 PM</div>
                    </div>
                </motion.div>

                {/* Floating Metrics Badge (Parallax) */}
                <motion.div
                    initial={{ z: 10, y: 0, x: 0 }}
                    whileHover={{ z: 60, y: 15, x: 10 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute bottom-16 right-4 w-48 p-4 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700"
                >
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <div className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Occupancy</div>
                            <div className="text-xl font-bold text-white">85%</div>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-400">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m3 16 4-4 4 4 8-8" /><path d="m11 8 8-8v8" />
                            </svg>
                            <span className="text-xs font-bold">+12%</span>
                        </div>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="w-[85%] h-full bg-gradient-to-r from-koi-red to-rose-400" />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};
