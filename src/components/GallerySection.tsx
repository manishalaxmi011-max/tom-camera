import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from 'framer-motion';
import { Camera, Maximize2, MoreHorizontal } from 'lucide-react';

// --- Configuration: Final Positions for the "Scattered" look ---
const images = [
    // Left Column
    {
        src: "https://images.unsplash.com/photo-1520390138845-fd2d229dd552?auto=format&fit=crop&q=80&w=800",
        top: "15%", left: "10%", rotate: "-6deg", triggerStart: 0.05,
        meta: { iso: "400", shutter: "1/500", date: "JUN 24" }
    },
    {
        src: "https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?auto=format&fit=crop&q=80&w=800",
        top: "55%", left: "5%", rotate: "3deg", triggerStart: 0.15,
        meta: { iso: "800", shutter: "1/60", date: "AUG 12" }
    },
    // Right Column
    {
        src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
        top: "20%", right: "8%", rotate: "8deg", triggerStart: 0.1,
        meta: { iso: "100", shutter: "1/1000", date: "SEP 01" }
    },
    {
        src: "https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80&w=800",
        top: "60%", right: "5%", rotate: "-4deg", triggerStart: 0.25,
        meta: { iso: "200", shutter: "1/250", date: "OCT 05" }
    },
    // Inner/Center Scatter (Avoids absolute center)
    {
        src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800",
        top: "75%", left: "28%", rotate: "-12deg", triggerStart: 0.35,
        meta: { iso: "1600", shutter: "1/30", date: "DEC 31" }
    },
];

// --- Floating Image Component ---
const FloatingImage = ({
    img,
    scrollYProgress
}: {
    img: typeof images[0],
    scrollYProgress: MotionValue<number>
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const imageRef = useRef<HTMLDivElement>(null);

    // Animation timeline
    const range = [img.triggerStart, img.triggerStart + 0.25];
    const top = useTransform(scrollYProgress, range, ["50%", img.top]);

    // Smooth entry
    const left = img.left ? useTransform(scrollYProgress, range, ["50%", img.left]) : undefined;
    const right = img.right ? useTransform(scrollYProgress, range, ["50%", img.right]) : undefined;
    const opacity = useTransform(scrollYProgress, range, [0, 1]);
    const scale = useTransform(scrollYProgress, range, [0.5, 1]);
    const blur = useTransform(scrollYProgress, range, ["10px", "0px"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return;
        const rect = imageRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setMousePosition({
            x: (e.clientX - centerX) / 15,
            y: (e.clientY - centerY) / 15
        });
    };

    return (
        <motion.div
            ref={imageRef}
            style={{ top, left, right, opacity, scale, filter: `blur(${blur.get()})` }} // Dynamic blur needs custom handling or just rely on CSS
            className="absolute z-10 perspective-[1000px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setMousePosition({ x: 0, y: 0 }); }}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="relative bg-white p-3 md:p-4 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] rounded-sm group cursor-none"
                style={{ rotate: isHovered ? 0 : img.rotate }}
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y + (isHovered ? -10 : 0),
                    rotateY: mousePosition.x * 0.2,
                    rotateX: -mousePosition.y * 0.2,
                    scale: isHovered ? 1.05 : 1,
                    zIndex: isHovered ? 50 : 10,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
                {/* Photo Container */}
                <div className="relative w-28 md:w-56 aspect-[3/4] overflow-hidden bg-neutral-100">
                    <motion.img
                        src={img.src}
                        className="w-full h-full object-cover"
                        animate={{ scale: isHovered ? 1.1 : 1 }}
                        transition={{ duration: 0.5 }}
                    />

                    {/* Premium Glare Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Metadata Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-between items-center">
                        <div className="flex gap-2 text-[8px] font-mono text-white/90">
                            <span>ISO{img.meta.iso}</span>
                            <span>{img.meta.shutter}</span>
                        </div>
                        <Camera className="w-3 h-3 text-white/50" />
                    </div>
                </div>

                {/* Card Footer UI */}
                <div className="mt-3 flex justify-between items-end px-1">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black tracking-widest text-neutral-400 uppercase">Archive</span>
                        <span className="text-[10px] font-bold text-neutral-800 font-mono">{img.meta.date}</span>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-neutral-300" />
                </div>

            </motion.div>
        </motion.div>
    );
};

export const GallerySection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Flash Logic
    const [showFlash, setShowFlash] = useState(false);
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (v) => {
            if (v > 0.1 && v < 0.4 && Math.random() > 0.8) {
                setShowFlash(true);
                setTimeout(() => setShowFlash(false), 50);
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    return (
        <section ref={containerRef} className="relative h-[250vh] bg-[#F3F0EA]">

            {/* Sticky Viewport */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* Flash Layer */}
                <AnimatePresence>
                    {showFlash && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-white z-[60] pointer-events-none mix-blend-hard-light"
                        />
                    )}
                </AnimatePresence>

                {/* --- Grid Background (Matches Capture Section) --- */}
                <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#E6E1D6_1px,transparent_1px),linear-gradient(to_bottom,#E6E1D6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] opacity-60" />

                {/* --- Main Content Layout --- */}
                <div className="relative w-full max-w-[1600px] h-full p-8 md:p-12 flex flex-col justify-between z-10 pointer-events-none">

                    {/* Top Section */}
                    <div className="flex justify-between items-start pointer-events-auto">
                        {/* Title */}
                        <div>
                            <h2 className="text-[12vw] md:text-[8rem] font-black tracking-tighter leading-[0.8] text-[#3E3E3E] uppercase mix-blend-multiply">
                                Frozen <span className="text-[#EB7E44]">In</span> <br />
                                Motion.
                            </h2>
                        </div>

                        {/* Description / Button */}
                        <div className="hidden md:flex flex-col items-end text-right">
                            <p className="text-[11px] font-bold tracking-[0.2em] leading-loose text-[#5A5A5A] uppercase font-mono mb-8">
                                RAW // UNFILTERED // TIMELESS
                            </p>
                            <button className="group relative px-6 py-3 bg-white border border-[#E6E1D6] text-[#3E3E3E] rounded-full text-[9px] font-black tracking-[0.2em] uppercase overflow-hidden hover:shadow-xl transition-all duration-300">
                                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                                    View Full Gallery <Maximize2 className="w-3 h-3" />
                                </span>
                                <div className="absolute inset-0 bg-[#3E3E3E] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                            </button>
                        </div>
                    </div>

                    {/* Bottom Indicator */}
                    <div className="flex justify-between items-end pb-12 pointer-events-auto">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full border border-[#3E3E3E]/10 flex items-center justify-center">
                                <span className="font-mono text-[10px] text-[#3E3E3E]">03</span>
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3E3E3E]/40">Scroll to Explore</span>
                        </div>
                    </div>

                </div>

                {/* --- Floating Images Container --- */}
                <div className="absolute inset-0 pointer-events-none">
                    {images.map((img, i) => (
                        <FloatingImage key={i} img={img} scrollYProgress={scrollYProgress} />
                    ))}
                </div>

                {/* --- Center Focus Ring (Behind Camera) --- */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vh] h-[40vh] border border-[#3E3E3E]/5 rounded-full z-0 animate-[spin_20s_linear_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vh] h-[35vh] border border-dashed border-[#EB7E44]/20 rounded-full z-0" />

            </div>
        </section>
    );
};