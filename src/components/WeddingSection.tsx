import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const WeddingSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { amount: 0.3, once: true });

    // Doodle Animation Variants (Paths)
    const draw: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay: 0.5, type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay: 0.5, duration: 0.01 }
            }
        }
    };

    return (
        <section
            ref={sectionRef}
            data-in-view={isInView ? "true" : "false"}
            className="relative w-full min-h-screen flex items-center justify-between py-20 px-6 md:px-20 overflow-hidden bg-[#FAF0E6]"
        >
            {/* --- BACKGROUND DOODLES (Fixed Position) --- */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
                {/* Top Right Swirl - Dark Color for Light BG */}
                <div className="absolute -top-20 -right-20 rotate-45 text-[#8B4513]">
                    <svg width="400" height="400" viewBox="0 0 200 200">
                        <motion.path
                            d="M10,80 Q50,10 90,80 T170,80"
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth="2"
                            variants={draw}
                            initial="hidden"
                            whileInView="visible"
                        />
                    </svg>
                </div>
            </div>

            {/* --- TEXT CONTENT (Left) --- */}
            <div className="relative z-20 max-w-[600px] text-[#5D2E1F]"> {/* Dark Text for Light BG */}
                {/* Header Icon & Label */}
                <div className="flex items-center gap-3 mb-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {/* Ring Icon */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#A0522D]">
                            <circle cx="9" cy="12" r="5" />
                            <circle cx="15" cy="12" r="5" />
                            <path d="M9 7L9.5 5.5L11 5" strokeLinecap="round" />
                        </svg>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-sm font-bold tracking-[0.2em] uppercase text-[#8B4513]"
                    >
                        Wedding Photography
                    </motion.h2>
                </div>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative text-5xl md:text-7xl font-bold leading-[1.1] mb-8"
                >
                    Your day.<br />
                    <span className="relative inline-block font-serif italic font-light text-[#A0522D]">
                        Your story.
                        {/* Underline Doodle */}
                        <svg className="absolute w-full h-[20px] -bottom-2 left-0 pointer-events-none overflow-visible" viewBox="0 0 200 20">
                            <motion.path
                                d="M0,10 Q100,20 200,5"
                                fill="transparent"
                                stroke="#A0522D"
                                strokeWidth="3"
                                strokeLinecap="round"
                                variants={draw}
                                initial="hidden"
                                whileInView="visible"
                            />
                        </svg>
                    </span>
                </motion.h1>

                {/* Body Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="space-y-6 text-lg md:text-xl font-light leading-relaxed text-[#5D2E1F]/90"
                >
                    <p className="font-bold text-2xl mb-2 text-[#5D2E1F]">No retakes. Just real.</p>
                    <p>
                        Every smile, tear, and laugh — captured naturally as it happens.
                        No forced poses. No missed moments. Just timeless memories.
                    </p>

                    {/* CTA Button */}
                    <div className="pt-4">
                        <motion.button
                            whileHover={{ scale: 1.05, gap: "1rem" }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex items-center gap-3 px-8 py-4 bg-[#5D2E1F] text-[#FAF0E6] text-sm tracking-[0.15em] uppercase font-bold rounded-full shadow-xl hover:bg-[#4A2518] transition-all"
                        >
                            View Our Work
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </div>

                    <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-base border-t border-[#8B4513]/20">
                        <div>
                            <strong className="block uppercase text-xs tracking-wider mb-2 opacity-60">Best For</strong>
                            Weddings, Rituals, Receptions
                        </div>
                        <div>
                            <strong className="block uppercase text-xs tracking-wider mb-2 opacity-60">Vibe</strong>
                            Emotional • Elegant • Forever
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* --- FLYING PHOTOS (Right) --- */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block pointer-events-none">
                {/* Floating Heart Doodle */}
                <div className="absolute top-[18%] right-[12%] z-20 text-[#A0522D] opacity-80">
                    <motion.svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1, rotate: [0, 10, -10, 0] }}
                        transition={{ delay: 1.5, duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </motion.svg>
                </div>

                {/* Photo 1 */}
                <motion.div
                    initial={{ y: 200, opacity: 0, rotate: 10 }}
                    whileInView={{ y: 0, opacity: 1, rotate: -5 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute top-[20%] right-[15%] w-[220px] aspect-[4/5] bg-white p-3 shadow-2xl rotate-[-6deg]"
                >
                    <div className="w-full h-full bg-gray-200 overflow-hidden relative">
                        <img src="/photo1.jpg" className="w-full h-full object-cover" alt="Wedding Moment" />
                        <div className="absolute -top-3 left-10 w-24 h-6 bg-white/40 rotate-2 backdrop-blur-sm shadow-sm" />
                    </div>
                </motion.div>

                {/* Photo 2 */}
                <motion.div
                    initial={{ y: -150, opacity: 0, rotate: -15 }}
                    whileInView={{ y: 0, opacity: 1, rotate: 8 }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                    className="absolute top-[50%] right-[35%] w-[200px] aspect-square bg-white p-3 shadow-2xl rotate-[12deg] z-10"
                >
                    <div className="w-full h-full bg-gray-200 overflow-hidden relative">
                        <img src="/photo2.jpg" className="w-full h-full object-cover" alt="Wedding Detail" />
                        <div className="absolute -top-2 right-10 w-20 h-6 bg-white/40 -rotate-3 backdrop-blur-sm shadow-sm" />
                    </div>
                </motion.div>

                {/* Photo 3 */}
                <motion.div
                    initial={{ x: 100, opacity: 0, rotate: 5 }}
                    whileInView={{ x: 0, opacity: 1, rotate: 25 }}
                    transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
                    className="absolute top-[60%] right-[5%] w-[180px] aspect-[4/5] bg-white p-3 shadow-2xl z-0"
                >
                    <div className="w-full h-full bg-gray-200 overflow-hidden relative">
                        <img src="/photo3.jpg" className="w-full h-full object-cover" alt="Wedding Emotion" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
