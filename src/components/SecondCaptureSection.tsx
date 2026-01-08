import React from "react";
import { motion, MotionValue } from "framer-motion";

interface SecondCaptureSectionProps {
    textParallax: MotionValue<number>;
}

export const SecondCaptureSection: React.FC<SecondCaptureSectionProps> = ({ textParallax }) => {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#C9734B] py-20">
            {/* Background Parallax Title */}
            <motion.div
                style={{ x: textParallax }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10"
            >
                <h1 className="text-[15vw] font-black text-transparent stroke-white tracking-tighter scale-y-125"
                    style={{ WebkitTextStroke: "2px white", fontFamily: "Arial Black, sans-serif" }}>
                    ULTRA HD
                </h1>
            </motion.div>

            <div className="relative z-10 w-full max-w-7xl px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* Text Content */}
                <div className="flex flex-col space-y-10">
                    <h2 className="text-5xl md:text-7xl font-bold text-white leading-[0.9] tracking-tighter">
                        Capture Life's <br />
                        Best Moments <br />
                        with Clarity
                    </h2>
                    <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed max-w-md">
                        Minimal grain, exceptional photography. Retro look, modern power.
                        Designed to create every drop of emotion.
                    </p>
                    <button className="w-fit px-12 py-4 bg-white text-black rounded-full font-black text-sm tracking-[0.2em] uppercase shadow-xl hover:scale-105 transition-transform duration-300">
                        Contact Us
                    </button>
                </div>

                {/* Right Side (Camera Placeholder Area) */}
                <div className="relative flex flex-col items-end justify-center">
                    {/* The FloatingCamera in App.tsx handles the actual camera visuals usually, 
                         but we can put stats here */}
                    <div className="mt-24 md:mt-0 text-right">
                        <h3 className="text-7xl font-bold text-white mb-4">500K</h3>
                        <div className="w-full h-0.5 bg-white/50 mb-4" />
                        <p className="text-white/80 text-xs font-bold uppercase tracking-widest">
                            In our specialized <br /> market place creates <br /> for our community.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
