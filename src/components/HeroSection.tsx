import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

export const HeroSection: React.FC = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Parallax values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
            mouseX.set(e.clientX / window.innerWidth - 0.5);
            mouseY.set(e.clientY / window.innerHeight - 0.5);
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, [mouseX, mouseY]);

    const letters = "CAPTURE".split("");
    const letters2 = "MOMENTS".split("");

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center z-10 overflow-hidden perspective-[1000px]">
            {/* Film Grain Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />

            {/* Background Cinematic Glows */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Decorative Brackets */}
            <div className="absolute top-24 left-10 w-12 h-12 border-t border-l border-zinc-300"></div>
            <div className="absolute top-24 right-10 w-12 h-12 border-t border-r border-zinc-300"></div>
            <div className="absolute bottom-10 left-10 w-12 h-12 border-b border-l border-zinc-300"></div>
            <div className="absolute bottom-10 right-10 w-12 h-12 border-b border-r border-zinc-300"></div>

            {/* Focus Ring Cursor Element */}
            <motion.div
                className="fixed top-0 left-0 w-20 h-20 border border-orange-500/30 rounded-full pointer-events-none z-40 flex items-center justify-center"
                animate={{
                    x: mousePos.x - 40,
                    y: mousePos.y - 40,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 100, mass: 0.5 }}
            >
                <div className="w-1 h-1 bg-orange-500 rounded-full" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-orange-500/50" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-orange-500/50" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-orange-500/50" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-orange-500/50" />
            </motion.div>

            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="flex flex-col items-center justify-center z-10 mt-[-60px]"
            >
                {/* Line 1 */}
                <div className="flex pb-2 pt-2" style={{ transform: "translateZ(80px)" }}>
                    {letters.map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[14vw] leading-[0.9] font-black text-[#1a1a1a] tracking-[-0.05em] inline-block"
                        >
                            {char}
                        </motion.span>
                    ))}
                </div>

                {/* Line 2 */}
                <div className="flex ml-32 pb-4 pt-4" style={{ transform: "translateZ(120px)" }}>
                    {letters2.map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[14vw] leading-[0.9] font-black text-[#1a1a1a] tracking-[-0.05em] inline-block"
                        >
                            {char}
                        </motion.span>
                    ))}
                </div>

                {/* Vertical Tagline */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className="absolute -left-20 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 hidden xl:flex"
                    style={{ transform: "translateZ(40px)" }}
                >
                    <div className="w-px h-20 bg-zinc-300" />
                    <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-zinc-400 [writing-mode:vertical-lr] rotate-180">
                        Visual Legacy • Since 2024
                    </span>
                </motion.div>
            </motion.div>

            {/* Bottom Left Badge */}
            <div className="absolute left-20 bottom-32 z-20 hidden md:block">
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: -12 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    whileHover={{ rotate: 0, scale: 1.1 }}
                    className="bg-[#1a1a1a] text-white rounded-full w-24 h-24 flex items-center justify-center cursor-pointer shadow-2xl group border border-white/10"
                >
                    <div className="text-center relative z-10">
                        <p className="text-[8px] font-black leading-tight tracking-[0.2em] group-hover:text-orange-400 transition-colors">EXPLORE</p>
                        <p className="text-[8px] font-medium leading-tight opacity-50">STORY</p>
                    </div>
                </motion.div>
            </div>

            {/* Right Status Block */}
            <div className="absolute right-20 bottom-40 z-20 hidden md:block text-right">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="relative p-6 border-r-2 border-orange-500/30"
                >
                    <p className="text-[10px] font-black text-zinc-800 mb-2 tracking-[0.3em] uppercase">Premium Optics</p>
                    <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-[0.2em]">Crafted For Perfection</p>
                </motion.div>
            </div>
        </section>
    );
};
