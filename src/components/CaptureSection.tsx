import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export const CaptureSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    // Removed unused useInView hook to fix lint error

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full flex items-center justify-center p-6 md:p-12 z-20 bg-[#F3F0EA] overflow-hidden"
        >
            {/* --- Main Card Container --- */}
            <div className="relative w-full max-w-[1600px] h-[85vh] md:h-[90vh] bg-[#F5F2EC] rounded-[3rem] overflow-hidden border border-[#E6E1D6] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.05)]">

                {/* 1. Grid Background Pattern */}
                <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#E6E1D6_1px,transparent_1px),linear-gradient(to_bottom,#E6E1D6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] opacity-60" />

                {/* 2. Top Right Content Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="absolute top-12 right-12 md:top-24 md:right-24 z-20 flex flex-col items-end text-right max-w-sm"
                >
                    <p className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] leading-loose text-[#5A5A5A] uppercase font-mono mb-10">
                        We don't just take photos; we orchestrate <br />
                        light. Our lens is a portal to your most <br />
                        vivid memories, captured with clinical <br />
                        precision and artistic soul.
                    </p>

                    <button className="group relative px-8 py-4 bg-[#3E3E3E] text-white rounded-full text-[10px] font-black tracking-[0.25em] uppercase overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300">
                        <span className="relative z-10 flex items-center gap-2">
                            View Archives
                        </span>
                        <div className="absolute inset-0 bg-[#2A2A2A] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    </button>
                </motion.div>

                {/* 3. Main Headline (Left Aligned) */}
                <div className="absolute top-1/2 -translate-y-1/2 left-12 md:left-24 z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-[12vw] md:text-[9rem] font-black tracking-tighter leading-[0.85] text-[#3E3E3E] uppercase mix-blend-multiply">
                            Frozen <span className="text-[#3E3E3E]">In</span> <br />
                            <span className="text-[#EB7E44]">Motion.</span>
                        </h1>
                    </motion.div>
                </div>

                {/* 4. Decorative Orange Circle (Behind Camera Position) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-orange-500/20 rounded-full animate-[spin_60s_linear_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-dashed border-orange-500/30 rounded-full opacity-50" />

            </div>
        </section>
    );
};
