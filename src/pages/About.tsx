import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { HamburgerMenu } from '../components/HamburgerMenu';
import { ArrowDown, Camera, Aperture, Film, Award } from 'lucide-react';

const Section = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <section className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden ${className}`}>
        {children}
    </section>
);

export const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { mass: 0.1, stiffness: 100, damping: 20 });

    const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.5]);
    const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
    const heroY = useTransform(smoothProgress, [0, 0.2], [0, 100]);

    return (
        <div ref={containerRef} className="bg-black text-white selection:bg-red-600 selection:text-white font-sans">
            <Navbar theme="dark" />
            <HamburgerMenu />

            {/* --- HERO SECTION --- */}
            <Section className="h-screen py-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />

                <motion.div
                    style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
                    className="z-10 text-center px-4"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl font-mono text-neutral-400 mb-4 tracking-[0.5em] uppercase"
                    >
                        The Portfolio of
                    </motion.h2>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[12vw] md:text-[8vw] font-black uppercase leading-none tracking-tighter"
                    >
                        M. Kali Raj
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="mt-12 flex justify-center"
                    >
                        <ArrowDown className="w-8 h-8 md:w-12 md:h-12 animate-bounce text-neutral-500" />
                    </motion.div>
                </motion.div>
            </Section>

            {/* --- BIO / INTRO --- */}
            <Section className="bg-neutral-900 border-t border-neutral-800">
                <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=2835&auto=format&fit=crop"
                                alt="Photographer"
                                className="w-full aspect-[3/4] object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700 rounded-sm shadow-2xl"
                            />
                            {/* Decorative Frame */}
                            <div className="absolute top-4 -left-4 w-full h-full border border-neutral-700 -z-10 hidden md:block" />
                        </motion.div>
                    </div>

                    <div className="space-y-8">
                        <motion.h3
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-bold uppercase leading-tight"
                        >
                            Obsessed with <br />
                            <span className="text-red-600">The Unseen.</span>
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-neutral-400 font-light leading-relaxed"
                        >
                            Photography is more than just capturing light; it's about freezing a feeling.
                            From the bustling streets of urban sprawls to the quiet intimacy of studio portraits,
                            I seek the narrative hidden in the shadows.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-2 gap-6 pt-4"
                        >
                            <div>
                                <h4 className="font-mono text-sm text-red-500 uppercase tracking-wider mb-2">Experience</h4>
                                <p className="text-2xl font-bold">10+ Years</p>
                            </div>
                            <div>
                                <h4 className="font-mono text-sm text-red-500 uppercase tracking-wider mb-2">Projects</h4>
                                <p className="text-2xl font-bold">500+ Delivered</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Section>

            {/* --- PHILOSOPHY --- */}
            <section className="py-24 bg-black relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neutral-900 to-transparent opacity-50 pointer-events-none" />

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="mb-16">
                        <h2 className="text-[10vw] font-black text-neutral-800 leading-none select-none absolute top-0 left-0 -translate-y-1/2 opacity-30">VISION</h2>
                        <h3 className="text-3xl md:text-5xl font-bold uppercase relative ml-4 md:ml-12 mt-12">
                            My Approach
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Camera, title: "Technical Precision", desc: "Mastery of light, composition, and optics to create technically flawless imagery." },
                            { icon: Aperture, title: "Artistic Vision", desc: "Seeing what others miss. Finding beauty in the mundane and order in chaos." },
                            { icon: Film, title: "Cinematic Storytelling", desc: "Every frame contributes to a larger narrative, evoking emotion and curiosity." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="p-8 border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm hover:border-red-600/50 transition-colors group"
                            >
                                <item.icon className="w-12 h-12 text-neutral-500 group-hover:text-red-500 transition-colors mb-6" />
                                <h4 className="text-2xl font-bold uppercase mb-4">{item.title}</h4>
                                <p className="text-neutral-400 leading-relaxed font-light">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SELECTED WORKS SCROLL --- */}
            <section className="py-24 bg-neutral-900 overflow-hidden">
                <div className="container mx-auto px-6 mb-12 flex items-baseline justify-between">
                    <h3 className="text-4xl md:text-6xl font-black uppercase">Signature Style</h3>
                    <p className="hidden md:block font-mono text-neutral-500">SCROLL {'>>'}</p>
                </div>

                <motion.div
                    className="flex space-x-4 px-6 overflow-x-auto pb-8 scrollbar-hide"
                    whileTap={{ cursor: "grabbing" }}
                >
                    {[
                        "https://images.unsplash.com/photo-1542038784424-48ed22c97049?q=80&w=2674&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1504198266287-16594a975475?q=80&w=2670&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2670&auto=format&fit=crop"
                    ].map((src, i) => (
                        <motion.div
                            key={i}
                            className="min-w-[300px] md:min-w-[500px] aspect-[4/5] relative group overflow-hidden cursor-pointer"
                            whileHover={{ scale: 0.98 }}
                        >
                            <img src={src} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                                <span className="text-red-500 font-mono text-xs uppercase tracking-widest mb-2">Series 0{i + 1}</span>
                                <h4 className="text-2xl font-bold uppercase">Urban Decay</h4>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* --- RECOGNITION --- */}
            <Section className="bg-black py-24">
                <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
                    <Award className="w-16 h-16 text-red-600 mx-auto mb-8" />
                    <h3 className="text-3xl md:text-5xl font-black uppercase mb-12">Recognition & Awards</h3>
                    <div className="space-y-6">
                        {[
                            { year: "2023", award: "International Photography Awards", category: "Gold / Editorial" },
                            { year: "2022", award: "National Geo Travel", category: "Editor's Pick" },
                            { year: "2020", award: "Sony World Photography", category: "Shortlist" },
                            { year: "2018", award: "LensCulture Street Awards", category: "Finalist" },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col md:flex-row items-center justify-between border-b border-neutral-800 pb-6 hover:bg-neutral-900/50 transition-colors px-4 py-4 rounded">
                                <span className="font-mono text-neutral-500">{item.year}</span>
                                <span className="text-xl font-bold uppercase">{item.award}</span>
                                <span className="font-mono text-sm text-red-500">{item.category}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* --- MANIFESTO / CTA --- */}
            <Section className="bg-[#050505] min-h-[70vh]">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <p className="font-mono text-neutral-500 mb-8 uppercase tracking-widest">Let's Create Together</p>
                    <p className="text-3xl md:text-6xl font-bold leading-tight mb-12 max-w-5xl mx-auto">
                        "A camera is a save button for the mind's eye."
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-black text-lg md:text-xl font-bold uppercase py-4 px-12 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,59,48,0.5)]"
                    >
                        Get In Touch
                    </motion.button>
                </div>
            </Section>
        </div>
    );
};
