import React, { useRef, useState } from 'react';
import { motion, useInView, Variants, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { Camera, Zap, Aperture, Sparkles, Video, Palette, ArrowUpRight } from 'lucide-react';

// --- DOODLE COMPONENTS ---
// ... (rest of doodles same as before)
const drawVariant: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: { pathLength: { delay: 0.2, type: "spring", duration: 1.5, bounce: 0 }, opacity: { delay: 0.2, duration: 0.01 } }
    }
};

const DoodleUnderline = () => (
    <svg className="absolute -bottom-2 left-0 w-full h-[15px] pointer-events-none overflow-visible" viewBox="0 0 100 10" preserveAspectRatio="none">
        <motion.path
            d="M0,5 Q50,10 100,5"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2"
            variants={drawVariant}
            initial="hidden"
            whileInView="visible"
        />
    </svg>
);

const DoodleCircle = ({ className }: { className?: string }) => (
    <svg className={`absolute pointer-events-none overflow-visible ${className}`} viewBox="0 0 100 100">
        <motion.path
            d="M50,10 A40,40 0 1,1 50,90 A40,40 0 1,1 50,10"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5 5"
            variants={drawVariant}
        />
    </svg>
);

const DoodleArrow = ({ className }: { className?: string }) => (
    <svg className={`absolute pointer-events-none overflow-visible ${className}`} viewBox="0 0 50 50" width="50" height="50">
        <motion.path
            d="M10,40 Q25,10 40,20 M40,20 L30,20 M40,20 L35,30"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            variants={drawVariant}
        />
    </svg>
);

const DoodleCamera = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
    <motion.svg
        className={`absolute pointer-events-none overflow-visible ${className}`}
        viewBox="0 0 100 100"
        width="100"
        height="100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
    >
        <motion.rect
            x="10" y="30" width="80" height="50" rx="10"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ delay: delay, duration: 1.5, ease: "easeInOut" }}
        />
        <motion.circle
            cx="50" cy="55" r="18"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ delay: delay + 0.5, duration: 1.5, ease: "easeInOut" }}
        />
        <motion.circle
            cx="75" cy="40" r="5"
            fill="currentColor"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: delay + 1, type: "spring" }}
        />
        <motion.rect
            x="35" y="15" width="30" height="15" rx="4"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ delay: delay + 0.3, duration: 1 }}
        />
    </motion.svg>
);

const DoodleStar = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
    <motion.svg
        className={`absolute pointer-events-none ${className}`}
        viewBox="0 0 24 24"
        width="30"
        height="30"
        initial={{ scale: 0, rotate: -45 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ delay, type: "spring" }}
    >
        <path d="M12 2L15 9L22 9L17 14L19 21L12 17L5 21L7 14L2 9L9 9L12 2Z" fill="currentColor" opacity="0.6" />
    </motion.svg>
);

const DoodleSquiggle = ({ className }: { className?: string }) => (
    <svg className={`absolute pointer-events-none overflow-visible ${className}`} viewBox="0 0 100 20" preserveAspectRatio="none">
        <motion.path
            d="M0,10 Q25,0 50,10 T100,10"
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2"
            variants={drawVariant}
        />
    </svg>
);

// --- DATA ---

const services = [
    {
        id: 1,
        title: "Wedding Stories",
        description: "Your day, your legacy. We capture the unscripted magic of your wedding with cinematic grace.",
        icon: <Camera className="w-8 h-8" />,
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
        doodle: <DoodleCamera className="-top-10 -right-10 text-orange-500 rotate-12 scale-150 opacity-80" />,
        accent: "text-orange-500",
        bg: "bg-orange-500/10"
    },
    {
        id: 2,
        title: "Event Coverage",
        description: "High-octane energy, impeccably framed. From red carpets to underground raves.",
        icon: <Sparkles className="w-8 h-8" />,
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1200",
        doodle: <DoodleArrow className="-bottom-10 -left-10 text-pink-500 -rotate-45 scale-150 opacity-80" />,
        accent: "text-pink-500",
        bg: "bg-pink-500/10"
    },
    {
        id: 3,
        title: "Freelance / Creative",
        description: "Abstract visions, commercial shoots, and avant-garde art direction.",
        icon: <Zap className="w-8 h-8" />,
        image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=1200",
        doodle: <DoodleCircle className="top-1/2 -right-10 text-blue-500 scale-150 opacity-80" />,
        accent: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        id: 4,
        title: "Motorgraphy",
        description: "Speed, chrome, and cinematic motion. We bring the fast lane to life.",
        icon: <Zap className="w-8 h-8" />,
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1200",
        doodle: <Zap className="absolute top-4 right-4 text-amber-500 opacity-20" size={40} />,
        accent: "text-amber-500",
        bg: "bg-amber-500/10"
    },
    {
        id: 5,
        title: "Cinematography",
        description: "Commercials, music videos, and independent film production with soul.",
        icon: <Video className="w-8 h-8" />,
        image: "https://images.unsplash.com/photo-1485846234645-a62644ef7467?auto=format&fit=crop&q=80&w=1200",
        doodle: <DoodleUnderline />,
        accent: "text-purple-500",
        bg: "bg-purple-500/10"
    },
    {
        id: 6,
        title: "Editing Lab",
        description: "Professional color grading, sound design, and narrative-first editing.",
        icon: <Palette className="w-8 h-8" />,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
        doodle: <DoodleSquiggle className="top-0 left-0 w-24 h-12 text-cyan-500 opacity-50" />,
        accent: "text-cyan-500",
        bg: "bg-cyan-500/10"
    },
    {
        id: 7,
        title: "Full Production",
        description: "Multi-cam, drone ops, and complete coverage setups.",
        icon: <Aperture className="w-8 h-8" />,
        image: "https://images.unsplash.com/photo-1473177104440-f655ccbbd452?auto=format&fit=crop&q=80&w=1200",
        doodle: <Sparkles className="absolute bottom-4 right-4 text-emerald-500 opacity-20" size={40} />,
        accent: "text-emerald-500",
        bg: "bg-emerald-500/10"
    },

];

// --- COMPONENT ---

const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -1 : 1 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1 : -1, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative w-full h-full p-8 md:p-10 rounded-3xl border border-white/10 overflow-hidden group min-h-[400px]"
        >
            {/* Background Color Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    src={service.image}
                    alt=""
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-700" />
            </div>

            {/* Hover Doodle Trigger */}
            <motion.div
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            >
                {service.doodle}
            </motion.div>

            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div>
                    {/* Icon Box */}
                    <div className={`w-16 h-16 rounded-2xl bg-[#0E0E0E] ring-1 ring-white/10 ${service.accent} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg mb-8`}>
                        {service.icon}
                    </div>

                    <div>
                        <h3 className="text-3xl font-black text-white mb-3 font-sans tracking-tight group-hover:tracking-normal transition-all duration-300 uppercase">
                            {service.title}
                        </h3>
                        <p className="text-white/60 font-medium leading-relaxed group-hover:text-white/90 transition-colors">
                            {service.description}
                        </p>
                    </div>
                </div>

                {/* Number Watermark */}
                <div className="text-6xl font-black text-white/5 select-none font-serif self-end">
                    0{service.id}
                </div>
            </div>

            {/* Hand-drawn Border Effect on Hover */}
            <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-3xl transition-all duration-300 pointer-events-none transform scale-[1.02] -rotate-1" />
        </motion.div>
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
                <span className="relative z-10 transition-colors duration-500 group-hover:text-white">Let's Work Together</span>
                <ArrowUpRight className="relative z-10 w-5 h-5 transition-transform duration-500 group-hover:rotate-45 group-hover:text-white" />
                <span className="absolute inset-0 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left ease-[0.16,1,0.3,1]" />
            </motion.button>
        </motion.div>
    );
};

export const ServicesSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.1, once: true });

    // CTA Parallax Logic
    const ctaRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 150 };
    const ctaRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
    const ctaRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

    const handleCtaMouseMove = (e: React.MouseEvent) => {
        if (!ctaRef.current) return;
        const { left, top, width, height } = ctaRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - left) / width - 0.5);
        mouseY.set((e.clientY - top) / height - 0.5);
    };

    const handleCtaMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section
            ref={containerRef}
            data-active={isInView}
            className="relative w-full min-h-screen bg-[#0E0E0E] py-20 md:py-32 px-6 md:px-12 overflow-hidden"
        >
            {/* --- GLOBAL DOODLES --- */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <DoodleStar className="top-[10%] left-[5%] text-white/5 w-24 h-24" delay={0.5} />
                <DoodleStar className="top-[20%] right-[10%] text-orange-500/10 w-16 h-16" delay={0.7} />
                <DoodleStar className="bottom-[10%] left-[20%] text-blue-500/10 w-32 h-32" delay={0.9} />

                {/* Big Squiggle */}
                <svg className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] text-white/5 rotate-90" viewBox="0 0 100 100">
                    <path d="M10,50 Q25,25 40,50 T70,50 T100,50" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
            </div>

            {/* Header */}
            <div className="relative z-10 max-w-7xl mx-auto mb-16 md:mb-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full border border-orange-500/30 text-orange-400 text-xs font-bold tracking-widest uppercase mb-4 bg-orange-900/10 backdrop-blur-sm">
                        Experience & Expertise
                    </span>
                    <h1 className="text-5xl md:text-9xl font-black text-white tracking-tighter leading-none mb-4 uppercase">
                        Expertly Crafted <br />
                        <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">
                            Visuals.
                            <span className="text-orange-500 absolute -bottom-2 md:-bottom-6 left-0 w-full">
                                <DoodleUnderline />
                            </span>
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-white/50 text-lg md:text-xl font-light mt-8 leading-relaxed">
                        We blend technical precision with artistic soul to deliver visuals that resonate. From grand weddings to intimate portraits, your story is our priority.
                    </p>
                </motion.div>
            </div>

            {/* Bento Layout */}
            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {/* 1. Wedding (Large Featured) */}
                <div className="lg:col-span-2 lg:row-span-1">
                    <ServiceCard service={services[0]} index={0} />
                </div>

                {/* 2. Events (Square) */}
                <div className="lg:col-span-1 lg:row-span-1">
                    <ServiceCard service={services[1]} index={1} />
                </div>

                {/* 3. Freelance (Square) */}
                <div className="lg:col-span-1 lg:row-span-1">
                    <ServiceCard service={services[2]} index={2} />
                </div>

                {/* 4. Motorgraphy (Wide) */}
                <div className="md:col-span-2 lg:col-span-2">
                    <ServiceCard service={services[3]} index={3} />
                </div>

                {/* 5, 6, 7, 8. Bottom Row */}
                <div className="lg:col-span-1">
                    <ServiceCard service={services[4]} index={4} />
                </div>
                <div className="lg:col-span-1">
                    <ServiceCard service={services[5]} index={5} />
                </div>
                <div className="lg:col-span-1">
                    <ServiceCard service={services[6]} index={6} />
                </div>

            </div>

            {/* Process Section */}
            <div className="relative z-10 max-w-7xl mx-auto mt-60 mb-60 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        {
                            step: "01",
                            title: "THE VISION",
                            status: "CONCEPTUALIZE",
                            desc: "We dive deep into the soul of your narrative, defining the light, tone, and visual language that will define your legacy.",
                            accent: "from-orange-500/20 to-transparent"
                        },
                        {
                            step: "02",
                            title: "THE CAPTURE",
                            status: "EXECUTION",
                            desc: "Driven by state-of-the-art optics and artistic intuition, we freeze time with clinical precision and emotional depth.",
                            accent: "from-indigo-500/20 to-transparent"
                        },
                        {
                            step: "03",
                            title: "THE MASTERPIECE",
                            status: "DELIVERY",
                            desc: "Our labs refine every frame, blending professional color science with narrative-first editing to unveil the final epic.",
                            accent: "from-amber-500/20 to-transparent"
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="relative p-12 bg-[#121212] border border-white/5 rounded-[3rem] overflow-hidden group hover:bg-[#181818] transition-all duration-700"
                        >
                            {/* Ambient Glow */}
                            <div className={`absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br ${item.accent} rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />

                            {/* Focus Brackets */}
                            <div className="absolute top-8 left-8 w-6 h-6 border-t font-thin border-l border-white/10 group-hover:border-orange-500/50 transition-colors" />
                            <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-white/10 group-hover:border-orange-500/50 transition-colors" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-12">
                                    <div className="text-5xl font-black text-white/5 group-hover:text-white/10 group-hover:scale-110 transition-all duration-700 font-mono tracking-tighter">
                                        {item.step}
                                    </div>
                                    <span className="text-[8px] font-black tracking-[0.4em] text-orange-500/50 border border-orange-500/20 px-3 py-1 rounded-full bg-orange-500/5">
                                        {item.status}
                                    </span>
                                </div>

                                <motion.h4
                                    className="text-2xl font-black mb-6 tracking-[0.2em] group-hover:tracking-[0.3em] transition-all duration-700 text-white"
                                >
                                    {item.title}
                                </motion.h4>

                                <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed group-hover:text-zinc-300 transition-colors duration-500">
                                    {item.desc}
                                </p>

                                <div className="mt-12 flex items-center gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(j => (
                                            <div key={j} className="w-6 h-6 rounded-full border border-[#1a1a1a] bg-zinc-800" />
                                        ))}
                                    </div>
                                    <span className="text-[9px] font-bold text-zinc-500 tracking-[0.2em] uppercase">Archive Ready</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* --- CREATE YOUR STORY CTA --- */}
            <section
                ref={ctaRef}
                onMouseMove={handleCtaMouseMove}
                onMouseLeave={handleCtaMouseLeave}
                className="relative z-10 max-w-7xl mx-auto py-60 text-center perspective-[1200px]"
            >
                <motion.div
                    style={{
                        rotateX: ctaRotateX,
                        rotateY: ctaRotateY,
                        transformStyle: "preserve-3d",
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group flex flex-col items-center"
                >
                    {/* Refined Ambient Glow */}
                    <motion.div
                        style={{
                            x: useTransform(mouseX, [-0.5, 0.5], [-30, 30]),
                            y: useTransform(mouseY, [-0.5, 0.5], [-30, 30]),
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-orange-600/5 rounded-full blur-[140px] pointer-events-none group-hover:bg-orange-600/10 transition-colors duration-1000"
                    />

                    <div className="relative z-10 mb-16 pointer-events-none select-none" style={{ transform: "translateZ(30px)" }}>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-block py-2 px-6 rounded-full border border-orange-500/20 text-orange-400 text-[9px] font-black tracking-[0.5em] uppercase mb-10 backdrop-blur-md bg-orange-950/5"
                        >
                            Open for Collaboration
                        </motion.span>

                        <div className="relative">
                            <h2 className="text-7xl md:text-[11rem] font-black uppercase tracking-tighter leading-[0.75] text-white mix-blend-difference">
                                <motion.span
                                    initial={{ y: "20%", opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="block"
                                >
                                    Ready to <br />
                                </motion.span>
                                <motion.span
                                    initial={{ y: "20%", opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                                    className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-orange-500/80"
                                >
                                    Tell Your Story?
                                </motion.span>
                            </h2>

                            {/* Minimalist Vision Line */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ delay: 0.8, duration: 1.2, ease: "circOut" }}
                                className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-orange-500 to-transparent mt-12 relative opacity-50"
                            >
                                <motion.div
                                    animate={{ left: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-[1.5px] w-1 h-1 bg-white rounded-full blur-[1px]"
                                />
                            </motion.div>
                        </div>
                    </div>

                    <p className="max-w-lg mx-auto text-zinc-500 text-base md:text-lg font-light mb-20 tracking-wide leading-relaxed" style={{ transform: "translateZ(20px)" }}>
                        Let’s build a visual legacy together.
                    </p>

                    <div className="relative pt-6" style={{ transform: "translateZ(60px)" }}>
                        <MagneticButton />
                    </div>
                </motion.div>
            </section>

            {/* Bottom Tagline */}
            <div className="mt-20 text-center border-t border-white/5 pt-20">
                <div className="relative overflow-hidden h-24 flex items-center justify-center">
                    <motion.p
                        animate={{
                            x: [2000, -2000]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="text-zinc-900 font-black text-8xl leading-[0.8] whitespace-nowrap opacity-40 select-none pointer-events-none uppercase italic"
                    >
                        VISIONARY // CINEMATIC // BOLD // ARTISTIC // REBELLIOUS // STORYTELLING // ANTIGRAVITY // REVOLUTIONARY
                    </motion.p>
                </div>
            </div>
        </section>
    );
};
