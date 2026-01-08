import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Play, Maximize2 } from 'lucide-react';

export const CinematicVideoSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { amount: 0.3, once: true });

    // Parallax Scroll Effect
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax values
    const videoY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

    return (
        <section
            ref={sectionRef}
            data-active={isInView}
            className="relative w-full min-h-screen flex items-center justify-center py-32 overflow-hidden bg-[#121212]"
        >
            {/* --- BACKGROUND ELEMENTS --- */}

            {/* Animated Spotlights */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[4000ms]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] mix-blend-screen" />
            </div>

            {/* Scrolling Timecode/Data Background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden flex flex-col justify-between py-10">
                <div className="w-full h-px bg-white/20 mb-2"></div>
                <div className="flex justify-between px-10 font-mono text-xs text-white">
                    <span>REC [00:03:14:22]</span>
                    <span>ISO 800</span>
                    <span>4K RAW</span>
                </div>
                <div className="w-full h-px bg-white/20 mt-2"></div>
            </div>


            {/* --- 2-COLUMN GRID LAYOUT --- */}
            <div className="relative z-10 w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center px-6 md:px-12">

                {/* --- LEFT COLUMN: TABLET VIDEO (Viewfinder Style) --- */}
                <motion.div
                    style={{ y: videoY }}
                    className="relative flex items-center justify-center md:justify-end md:pr-10 perspective-[1000px] order-2 md:order-1 z-10"
                >
                    <motion.div
                        initial={{ opacity: 0, rotateY: -15, scale: 0.9 }}
                        whileInView={{ opacity: 1, rotateY: -5, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative w-full max-w-[320px] md:max-w-[380px] aspect-[9/16] bg-black rounded-[2rem] shadow-2xl overflow-hidden ring-1 ring-white/10 group"
                    >
                        {/* Video Container */}
                        <div className="w-full h-full relative">
                            <video
                                src="/Screen Recording 2025-10-05 201956.mp4"
                                className="absolute inset-0 w-full h-full object-cover opacity-90"
                                autoPlay
                                muted
                                loop
                                playsInline
                            />

                            {/* Cinematic Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/20" />

                            {/* Viewfinder UI Overlay */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] font-mono text-red-500 font-bold flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> REC
                                    </span>
                                    <Maximize2 className="w-4 h-4 text-white/50" />
                                </div>

                                {/* Focus Box Animation */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white/30 rounded-sm opacity-50">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-3 bg-white/50" />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-1 bg-white/50" />
                                </div>

                                <div className="flex justify-between items-end text-[10px] font-mono text-white/60">
                                    <span>F2.8</span>
                                    <span>1/50</span>
                                    <span>4K 60FPS</span>
                                </div>
                            </div>

                            {/* Play Button (Fake Interaction) */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100">
                                    <Play className="w-6 h-6 text-white ml-1 fill-white" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Decorative Elements */}
                    <div className="absolute -z-10 top-10 -left-10 w-40 h-40 bg-orange-500/20 blur-[50px] rounded-full" />
                </motion.div>

                {/* --- RIGHT COLUMN: TEXT CONTENT --- */}
                {/* z-[60] to stay above floating elements if needed, but carefully indexed */}
                <motion.div
                    style={{ y: textY }}
                    className="flex flex-col justify-center text-[#FAF0E6] z-[60] pl-0 md:pl-10 order-1 md:order-2 text-center md:text-left"
                >
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-[560px] mx-auto md:mx-0"
                    >
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
                            <span className="w-8 h-[1px] bg-orange-500/50"></span>
                            <span className="text-xs font-black tracking-[0.4em] uppercase text-orange-500/80">
                                The Director's Cut
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-8">
                            <span className="block text-white">Not just footage.</span>
                            <span className="block text-white/50 font-serif italic font-light tracking-wide mt-2">
                                We film legacies.
                            </span>
                        </h1>

                        <div className="text-white/70 text-base md:text-xl font-light leading-relaxed space-y-6 mb-10 max-w-[480px] mx-auto md:mx-0">
                            <p className="md:border-l-2 md:border-orange-500/30 md:pl-6">
                                "Every frame intentional. Every cut meaningful.
                                We strip away the noise to reveal the cinematic soul of your story."
                            </p>
                        </div>

                        {/* CTA Button */}
                        <motion.button
                            initial="initial"
                            whileHover="hover"
                            whileTap={{ scale: 0.95 }}
                            className="relative px-8 py-4 bg-white text-black rounded-sm font-black tracking-[0.2em] uppercase overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] group"
                        >
                            <span className="relative z-10 flex items-center gap-3 text-xs">
                                Book a Film
                                <span className="w-4 h-[1px] bg-black group-hover:w-6 transition-all" />
                            </span>

                            <motion.div
                                className="absolute inset-0 bg-orange-500"
                                initial={{ x: "-100%" }}
                                variants={{
                                    hover: { x: "0%", transition: { duration: 0.3, ease: "easeInOut" } }
                                }}
                            />
                            <motion.div
                                className="absolute inset-0 bg-white mix-blend-difference pointer-events-none"
                                initial={{ opacity: 0 }}
                                variants={{ hover: { opacity: 1 } }}
                            />
                        </motion.button>

                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
