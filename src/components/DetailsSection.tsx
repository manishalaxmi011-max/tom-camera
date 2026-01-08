import React from "react";
import { motion, MotionValue } from "framer-motion";

interface DetailsSectionProps {
    textParallax: MotionValue<number>;
}

export const DetailsSection: React.FC<DetailsSectionProps> = ({ textParallax }) => {
    return (
        // MAIN CONTAINER: Full Screen, Straight, Orange Background
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#C9734B]">

            {/* --- BACKGROUND WATERMARK ("ULTRA HD") --- */}
            <motion.div
                style={{ x: textParallax }}
                className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
            >
                <h1
                    className="font-black tracking-tighter opacity-10 select-none whitespace-nowrap"
                    style={{
                        fontSize: "15vw", // Large but fits better
                        fontFamily: "Arial Black, sans-serif",
                        color: "transparent",
                        WebkitTextStroke: "2px white", // Clean white outline
                        transform: "scaleY(1.2)", // Tall font style
                    }}
                >
                    ULTRA HD
                </h1>
            </motion.div>

            {/* --- CONTENT CONTAINER (Straight Layout) --- */}
            <div className="relative z-10 w-full max-w-7xl px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-full">

                {/* LEFT COLUMN: TEXT & BUTTON */}
                <div className="flex flex-col justify-center space-y-8">

                    {/* HEADLINE */}
                    <h2 className="text-white font-bold leading-tight tracking-tight"
                        style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)" }} // Responsive, big but clean
                    >
                        Capture Life's <br />
                        Best Moments <br />
                        with Clarity
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-white/90 text-base md:text-lg font-medium leading-relaxed max-w-lg">
                        Minimal grain, exceptional photography. Retro look, modern power.
                        It embodies a classic feel, designed to create every drop of emotion.
                    </p>

                    {/* BUY NOW BUTTON - Straight Pill Shape */}
                    <div>
                        <button
                            className="bg-white text-black shadow-lg hover:scale-105 transition-transform duration-300"
                            style={{
                                padding: "16px 48px",
                                borderRadius: "9999px", // Perfect pill shape
                                fontWeight: "800",
                                fontSize: "1rem",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                            }}
                        >
                            CONTACT US
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN: CAMERA IMAGE & STATS */}
                <div className="relative w-full flex justify-center items-center">

                    {/* CAMERA IMAGE - Straight */}
                    <motion.div
                        className="w-full max-w-xl z-20 relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >

                    </motion.div>

                    {/* STATS - Straight, positioned relative to this column */}
                    <div className="absolute -bottom-10 right-0 md:right-10 text-right z-30">
                        <h3 className="text-white font-bold leading-none mb-3"
                            style={{ fontSize: "4rem" }}
                        >
                            500K
                        </h3>

                        <div className="h-[2px] bg-white/50 w-full mb-3"></div>

                        <p className="text-white/80 text-xs uppercase tracking-widest font-bold">
                            In our specialized <br /> marketplace creates <br /> for our community.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};