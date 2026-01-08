import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Search, Menu } from 'lucide-react';

export default function App() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // --- REFINED ANIMATIONS TO MATCH VIDEO ---
    // 1. Move Down: Camera moves down slightly to settle in the orange section
    const cameraY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    // 2. Move Right: Drifts from center to the right side
    const cameraX = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    // 3. Rotate: A subtle tilt as seen in the reference
    const cameraRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

    // 4. Scale: Slight zoom in for impact
    const cameraScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <div ref={containerRef} className="relative bg-[#F0EFEA] font-sans selection:bg-orange-200 overflow-x-hidden">

            {/* --- NAVBAR --- */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 mix-blend-difference text-white">
                <div className="text-xl font-bold tracking-tighter">LUMIXIA</div>
                <div className="hidden md:flex bg-white/10 backdrop-blur-md rounded-full px-6 py-3 space-x-6 text-xs font-semibold tracking-widest border border-white/10">
                    <span className="hover:text-orange-400 cursor-pointer transition">CAMERAS</span>
                    <span className="hover:text-orange-400 cursor-pointer transition">LENSES</span>
                    <span className="hover:text-orange-400 cursor-pointer transition">GALLERY</span>
                </div>
                <div className="flex items-center space-x-4">
                    <Search size={20} />
                    <div className="flex items-center space-x-1">
                        <ShoppingBag size={20} />
                        <span className="text-xs font-bold">CART (0)</span>
                    </div>
                </div>
            </nav>

            {/* --- FIXED CAMERA LAYER (Z-INDEX 40) --- */}
            {/* Sits ABOVE the background, but BELOW the text in the next section */}
            <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-40 flex items-center justify-center">
                <motion.img
                    src="/camera.png" // Make sure this file is in your public folder
                    alt="Vintage Camera"
                    style={{
                        y: cameraY,
                        x: cameraX,
                        rotate: cameraRotate,
                        scale: cameraScale
                    }}
                    className="w-[500px] md:w-[700px] drop-shadow-2xl object-contain mt-10"
                />
            </div>

            {/* --- SECTION 1: HERO (Z-INDEX 10) --- */}
            <section className="relative h-screen w-full flex flex-col items-center justify-center bg-[#F0EFEA] z-10">
                <div className="flex flex-col items-center justify-center z-0 mt-[-50px]">
                    <h1 className="text-[13vw] leading-[0.85] font-black text-[#1a1a1a] tracking-tighter text-center">
                        CAPTURE
                    </h1>
                    <h1 className="text-[13vw] leading-[0.85] font-black text-[#1a1a1a] tracking-tighter text-center">
                        MOMENTS
                    </h1>
                </div>

                {/* Floating Circle Badge */}
                <div className="absolute left-10 bottom-32 z-20 hidden md:block">
                    <div className="bg-black text-white rounded-full w-24 h-24 flex flex-col items-center justify-center -rotate-12 hover:rotate-0 transition duration-500 cursor-pointer">
                        <p className="text-[10px] font-bold">EXPLORE</p>
                        <p className="text-[10px]">NOW</p>
                    </div>
                </div>

                {/* New Arrival Text */}
                <div className="absolute right-10 bottom-32 max-w-xs text-right z-20 hidden md:block">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">New Arrival</p>
                    <p className="text-xs font-medium text-gray-800 leading-relaxed">
                        Discover clarity in every shot. Designed for creators, storytellers, and professionals.
                    </p>
                </div>
            </section>

            {/* --- SECTION 2: DETAILS (Z-INDEX 30) --- */}
            {/* Background is Orange, Text is Z-50 to go OVER camera */}
            <section className="relative min-h-screen w-full bg-[#C86D45] flex items-center z-30">

                {/* Background "ULTRA HD" Text (Low Opacity) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none overflow-hidden">
                    <div className="w-full h-full relative">
                        <h1 className="absolute top-10 left-[-5%] text-[18vw] font-black text-[#A05232] tracking-tighter leading-none opacity-40 rotate-[-2deg]">
                            ULTRA
                        </h1>
                        <h1 className="absolute bottom-20 right-[-5%] text-[18vw] font-black text-[#A05232] tracking-tighter leading-none opacity-40 rotate-[-2deg]">
                            HD
                        </h1>
                    </div>
                </div>

                {/* Content Container */}
                <div className="container mx-auto px-10 grid grid-cols-1 md:grid-cols-2 w-full h-full relative z-50">

                    {/* Left Side: Text Content (Higher Z-Index to overlap camera) */}
                    <div className="flex flex-col justify-center space-y-8 text-white pt-20 md:pt-0">
                        <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mix-blend-overlay">
                            Capture Life's Best <br /> Moments with Clarity.
                        </h2>
                        <p className="text-white/90 max-w-md text-sm md:text-base leading-relaxed font-light">
                            Minimal grain, exceptional photography. Retro look, modern power.
                            This camera is designed to handle every drop, with cutting-edge stabilization.
                        </p>
                        <div>
                            <button className="bg-white text-[#C86D45] rounded-full px-10 py-4 text-xs font-black tracking-widest hover:bg-black hover:text-white transition-all shadow-xl">
                                BUY NOW
                            </button>
                        </div>
                    </div>

                    {/* Right Side: Empty (Camera slides in here) */}
                    <div className="relative">
                        {/* Specs floating in bottom corner */}
                        <div className="absolute bottom-0 right-0 text-white border-l border-white/40 pl-4 mb-10 hidden md:block">
                            <h3 className="text-4xl font-bold">50MP</h3>
                            <p className="text-[10px] text-white/70 uppercase tracking-widest">Sensor Resolution</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Spacer for scrolling feel */}
            <div className="h-[10vh] bg-[#C86D45]"></div>
        </div>
    );
}