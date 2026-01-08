import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const MotorgraphySection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { amount: 0.3, once: true });

    return (
        <section
            ref={sectionRef}
            data-active={isInView}
            className="relative w-full h-screen overflow-hidden flex items-center"
        >
            {/* --- BACKGROUND VIDEO --- */}
            <div className="absolute inset-0 z-0">
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="/public\Screen Recording 2025-10-09 105308.mp4" type="video/mp4" />
                </video>

                {/* Dark Overlay & Gradient */}
                <div className="absolute inset-0 bg-black/20 bg-gradient-to-r from-black/60 via-black/40 to-black/70 pointer-events-none" />
            </div>

            {/* --- CONTENT (Right Aligned, Camera on Left) --- */}
            <div className="relative z-[100] w-full max-w-[1400px] mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 h-full items-center">
                {/* Left side empty for Camera to occupy */}
                <div />

                {/* Right Side Content */}
                <div className="flex flex-col justify-center text-left text-white md:pl-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-sm font-bold tracking-[0.25em] uppercase text-red-500 mb-4 flex items-center gap-3">
                            <span className="w-6 h-[2px] bg-red-600" />
                            Motorgraphy
                        </h2>

                        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
                            Built for speed.<br />
                            <span className="text-white/80 font-serif italic font-light">Shot with control.</span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-[500px] mb-10">
                            From roaring engines to razor-sharp details, we capture bikes and cars with power, precision, and cinematic intent.
                            <br /><br />
                            Every shot freezes speed. Every frame tells a story.
                        </p>

                        <motion.button
                            whileHover={{ x: 10 }}
                            className="group flex items-center gap-4 text-white uppercase tracking-widest font-bold text-sm"
                        >
                            <span className="border-b border-white/30 pb-1 group-hover:border-red-500 transition-colors">
                                View Motor Shoots
                            </span>
                            <ArrowRight className="w-5 h-5 text-red-500 group-hover:translate-x-2 transition-transform" />
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
