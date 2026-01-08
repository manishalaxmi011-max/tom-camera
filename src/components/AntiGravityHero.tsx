import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Search, ShoppingBag } from 'lucide-react'; // Assuming you use lucide-react for icons, or use standard SVGs

export const AntiGravityHero: React.FC = () => {
    const componentRef = useRef<HTMLDivElement>(null);
    const cameraRef = useRef<HTMLImageElement>(null);
    const polaroidsRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const polaroids = gsap.utils.toArray('.polaroid-item');

            // 1. Initial State: Force them to center and small
            gsap.set(polaroids, {
                x: 0,
                y: 0,
                scale: 0,
                opacity: 0
            });

            // 2. The Dispersal Animation (Explosion effect)
            gsap.to(polaroids, {
                duration: 1.8,
                opacity: 1,
                scale: 1,
                // Randomly scatter them around the camera
                x: (i) => (Math.random() * 400 - 200) + (i % 2 === 0 ? 100 : -100),
                y: (_i) => (Math.random() * 300 - 150),
                rotation: () => Math.random() * 60 - 30,
                stagger: 0.05,
                ease: "back.out(1.2)"
            });

            // 3. The Anti-Gravity Float (Continuous)
            polaroids.forEach((obj: any) => {
                gsap.to(obj, {
                    y: `+=${20 + Math.random() * 20}`, // Random float distance
                    rotation: `+=${5 + Math.random() * 5}`,
                    duration: 2 + Math.random() * 1.5,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    delay: Math.random() // Random start time so they don't move in sync
                });
            });

            // 4. Main Camera Slow Bobbing
            gsap.to(cameraRef.current, {
                y: 15,
                duration: 3,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });

        }, componentRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={componentRef}
            className="relative w-full min-h-screen bg-[#C86D45] overflow-hidden flex flex-col font-sans"
        >
            {/* --- ADDED: THE NAVBAR (Crucial for your UI) --- */}
            <nav className="absolute top-0 w-full flex items-center justify-between px-8 py-6 z-50 text-white">
                {/* Logo */}
                <div className="text-2xl font-black tracking-widest uppercase">
                    LUMIX
                </div>

                {/* Centered Links */}
                <div className="hidden md:flex space-x-8 text-xs font-bold tracking-widest uppercase opacity-80">
                    <a href="#" className="hover:opacity-100 transition">Sale</a>
                    <a href="#" className="hover:opacity-100 transition">Cameras</a>
                    <a href="#" className="hover:opacity-100 transition">Lenses</a>
                    <a href="#" className="hover:opacity-100 transition">Gallery</a>
                </div>

                {/* Right Icons */}
                <div className="flex items-center space-x-6">
                    <Search className="w-5 h-5 cursor-pointer hover:scale-110 transition" />
                    <div className="flex items-center space-x-1 cursor-pointer hover:scale-110 transition">
                        <ShoppingBag className="w-5 h-5" />
                        <span className="text-xs font-bold">(0)</span>
                    </div>
                </div>
            </nav>

            {/* --- Background ULTRA Text --- */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                <h1 className="text-[28vw] font-bold text-black/5 tracking-tighter select-none transform -rotate-6 scale-110">
                    ULTRA
                </h1>
            </div>

            {/* --- Main Content Grid --- */}
            <div className="container mx-auto px-6 md:px-12 flex-grow grid grid-cols-1 md:grid-cols-2 relative z-10">

                {/* Left: Text Content */}
                <div className="flex flex-col justify-center items-start text-white space-y-6 pt-20">
                    <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
                        Capture Life's Best <br />
                        Moments with Clarity
                    </h2>
                    <p className="max-w-md text-white/80 text-sm leading-relaxed">
                        Minimal grain, exceptional photography. Retro look, modern power.
                        It embodies a classic feel, designed to create every drop of emotion.
                        Features cutting-edge stabilization and sturdy design.
                    </p>

                    <div className="pt-4">
                        <button className="bg-white text-[#C86D45] px-8 py-3 rounded-full font-black tracking-widest text-xs uppercase hover:scale-105 hover:shadow-xl transition-all duration-300">
                            Buy Now
                        </button>
                    </div>

                    <div className="mt-12">
                        <div className="text-white border-l-2 border-white/40 pl-4 py-1">
                            <h3 className="text-3xl font-bold">50MP.</h3>
                            <p className="text-[10px] text-white/70 uppercase tracking-widest max-w-[120px] leading-tight mt-1">
                                Professional photography master.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: Camera & Polaroids */}
                <div className="relative flex items-center justify-center h-full">

                    {/* Floating Polaroids Container */}
                    <div ref={polaroidsRef} className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
                        {/* 6 Polaroid Cards */}
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="polaroid-item absolute w-28 h-36 bg-white p-2 shadow-xl"
                            >
                                <div className="w-full h-[75%] bg-gray-200 overflow-hidden mb-2">
                                    <img
                                        src={`https://picsum.photos/200/300?random=${i}`}
                                        alt="Polaroid"
                                        className="object-cover w-full h-full grayscale hover:grayscale-0 transition duration-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Camera (Must be highest Z-Index to stay on top) */}
                    <div className="relative z-20">
                        <img
                            ref={cameraRef}
                            /* REPLACE THIS WITH YOUR ACTUAL CAMERA IMAGE PATH */
                            src="/camera-mockup.png"
                            alt="Retro Camera"
                            className="w-[450px] md:w-[600px] object-contain drop-shadow-2xl transform rotate-[15deg]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};