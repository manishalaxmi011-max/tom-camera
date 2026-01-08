import React, { useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const CTASection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.3, once: true });

    // Mouse interaction for background and tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (clientX - left) / width - 0.5;
        const y = (clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            data-active={isInView}
            className="relative w-full min-h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden text-[#FAF0E6] perspective-[1000px]"
        >
            {/* Cinematic Background Engine */}
            <motion.div
                style={{
                    x: useTransform(mouseX, [-0.5, 0.5], [-100, 100]),
                    y: useTransform(mouseY, [-0.5, 0.5], [-100, 100]),
                }}
                className="absolute inset-0 z-0 opacity-40 pointer-events-none"
            >
                <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[180px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-zinc-800/20 rounded-full blur-[150px]" />
            </motion.div>

            {/* Grain & Grid */}
            <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />

            <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-10"
                >
                    <span className="inline-block py-1.5 px-4 rounded-full border border-orange-500/20 text-orange-500 text-[10px] font-black tracking-[0.4em] uppercase mb-12 bg-orange-950/10 backdrop-blur-sm">
                        Available Worldwide // Now Booking for 2024
                    </span>

                    <motion.div style={{ rotateX, rotateY }} className="will-change-transform">
                        <h1 className="text-8xl md:text-[14rem] font-black tracking-tighter leading-[0.75] text-white uppercase mix-blend-difference mb-12">
                            Capture <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-600 to-amber-700 block">
                                Your Vision
                            </span>
                        </h1>
                    </motion.div>

                    <p className="max-w-2xl mx-auto text-zinc-500 text-lg md:text-xl font-light mb-16 tracking-wide leading-relaxed">
                        We don't just take photos; we preserve legacies. Let's create something that stands the test of time.
                    </p>
                </motion.div>

                {/* Magnetic Interactive Button */}
                <div className="flex flex-col items-center gap-12">
                    <MagneticButton />

                    {/* Trust Indicators */}
                    <div className="flex items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                        <span className="text-[10px] font-black tracking-[0.3em]">RELIABLE PARTNER</span>
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        <span className="text-[10px] font-black tracking-[0.3em]">EST. 2023</span>
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        <span className="text-[10px] font-black tracking-[0.3em]">TOP TIER QUALITY</span>
                    </div>
                </div>
            </div>

            {/* Bottom Signature Line */}
            <div className="absolute bottom-12 left-0 right-0 px-12 flex justify-between items-end z-20 overflow-hidden">
                <div className="flex flex-col font-mono text-[9px] text-zinc-600 tracking-[0.3em]">
                    <span>STATUS: NOW BOOKING</span>
                    <span>SECURE COMMUNICATION</span>
                </div>

                <div className="text-[150px] font-black text-white/5 leading-[0.7] translate-y-1/2 pointer-events-none select-none uppercase italic tracking-tighter">
                    ANTI GRAVITY
                </div>

                <div className="flex gap-8 text-[9px] font-black tracking-[0.4em] text-zinc-500 uppercase">
                    {['IG', 'TW', 'LI'].map((item) => (
                        <span key={item} className="hover:text-orange-500 transition-colors cursor-pointer">{item}</span>
                    ))}
                </div>
            </div>
        </section>
    );
};

const MagneticButton = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;

        if (!ref.current) return;

        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (clientX - (left + width / 2)) * 0.4;
        const y = (clientY - (top + height / 2)) * 0.4;
        setPosition({ x, y });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            className="inline-block"
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 0 50px rgba(234, 88, 12, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center justify-center gap-6 bg-white text-black px-16 py-8 rounded-[2rem] text-[10px] font-black tracking-[0.6em] uppercase overflow-hidden transition-all duration-500"
            >
                <span className="relative z-10 transition-colors duration-500 group-hover:text-white">Begin Journey</span>
                <ArrowUpRight className="relative z-10 w-5 h-5 transition-transform duration-500 group-hover:rotate-45 group-hover:text-white" />

                {/* Hover Fill */}
                <span className="absolute inset-0 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left ease-[0.16,1,0.3,1]" />
            </motion.button>
        </motion.div>
    );
}
