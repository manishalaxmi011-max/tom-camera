import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { HamburgerMenu } from '../components/HamburgerMenu';
import { ArrowUpRight, Aperture } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getWorks } from '../services/api';

const CATEGORIES = ["All", "Wedding", "Cinematography", "Events", "Motorgraphy", "Other"] as const;
type Category = typeof CATEGORIES[number];

export const Work = () => {
    const [activeCategory, setActiveCategory] = useState<Category>("All");
    const [works, setWorks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const loadWorks = async () => {
            try {
                const data = await getWorks();
                setWorks(data);
            } catch (err) {
                console.error("Failed to load works", err);
            } finally {
                setLoading(false);
            }
        };
        loadWorks();
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const filteredItems = (activeCategory === "All"
        ? works
        : works.filter(item => item.category === activeCategory)
    ).filter(item => item && item.category && item.title); // Filter out test/invalid data

    return (
        <div className="relative min-h-screen bg-[#050505] text-white selection:bg-orange-500 overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <motion.div
                    animate={{
                        x: mousePos.x * 0.05,
                        y: mousePos.y * 0.05
                    }}
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-600/5 blur-[150px] rounded-full"
                />
            </div>

            <div className="absolute top-0 left-0 right-0 z-50">
                <Navbar theme="dark" />
            </div>
            <HamburgerMenu />

            {/* --- CINEMATIC HEADER --- */}
            <div className="pt-48 pb-20 px-6 md:px-10 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
                    >
                        <div className="flex-1">
                            <h1 className="text-8xl md:text-[12rem] font-black uppercase tracking-tighter leading-[0.8] mix-blend-difference">
                                The <span className="text-orange-600">Gallery</span>
                            </h1>
                            <p className="mt-8 text-xl text-zinc-500 max-w-xl font-light italic uppercase tracking-widest leading-relaxed">
                                A curated collection of cinematic moments and visual stories captured through our lens.
                            </p>
                        </div>

                        <div className="flex flex-col items-end gap-4">
                            <div className="flex gap-2">
                                <Aperture className="animate-spin-slow text-orange-600" size={24} />
                                <span className="font-mono text-[10px] tracking-[0.4em] text-zinc-600">LENS_STOCKED_v4.1</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Filter Navigation */}
                    <div className="flex flex-wrap items-center gap-4 border-b border-white/5 pb-12">
                        {CATEGORIES.map((cat, i) => (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`
                                    relative px-8 py-3 rounded-full text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-500 overflow-hidden
                                    ${activeCategory === cat ? 'bg-orange-600 text-black' : 'bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10'}
                                `}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- ADAPTIVE GRID LAYOUT --- */}
            <div className="px-6 md:px-10 pb-40 max-w-[1900px] mx-auto min-h-[600px] relative z-10">
                {loading ? (
                    <div className="h-[60vh] flex flex-col items-center justify-center text-zinc-800 gap-6">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                            <Aperture size={80} strokeWidth={0.5} />
                        </motion.div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.8em] animate-pulse">INITIATING_COLLECTION</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((item, i) => {
                                // Dynamic grid behavior: every 4th item is a feature (large)
                                const isFeature = i % 4 === 0;
                                return (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        transition={{
                                            duration: 0.8,
                                            ease: [0.16, 1, 0.3, 1],
                                            delay: (i % 8) * 0.05
                                        }}
                                        key={item.id}
                                        onClick={() => navigate(`/work/${item.id}`)}
                                        className={`
                                            group relative cursor-pointer overflow-hidden rounded-[2.5rem] border border-white/10 hover:border-orange-500/50 transition-colors duration-700
                                            ${isFeature ? 'md:col-span-8 h-[70vh]' : 'md:col-span-4 h-[50vh]'}
                                        `}
                                    >
                                        {/* Image Engine */}
                                        <div className="absolute inset-0 z-0">
                                            <motion.img
                                                whileHover={{ scale: 1.15 }}
                                                src={item.coverImage || item.images?.[0]}
                                                referrerPolicy="no-referrer"
                                                alt=""
                                                className="w-full h-full object-cover transition-all duration-1000 ease-out"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                        </div>

                                        {/* HUD Overlay */}
                                        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                            <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <div className="text-[9px] font-mono tracking-[0.5em] text-orange-500">REF_{item.id}</div>
                                                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md">
                                                    <ArrowUpRight size={18} />
                                                </div>
                                            </div>

                                            <div>
                                                <span className="text-orange-500 text-[9px] font-black tracking-[0.5em] uppercase mb-3 block">
                                                    {item.category.replace('graphy', '')}
                                                </span>
                                                <h3 className="text-4xl md:text-5xl font-black text-white uppercase leading-[0.8] tracking-tighter mb-4">
                                                    {item.title}
                                                </h3>
                                                <div className="h-[1px] w-0 group-hover:w-full bg-white/20 transition-all duration-700" />
                                            </div>
                                        </div>

                                        {/* Reveal Mask */}
                                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-orange-600/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 pointer-events-none" />
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* --- CTA SECTION --- */}
            <div className="relative py-40 border-t border-white/5 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <motion.h2
                        whileInView={{ y: [20, 0], opacity: [0, 1] }}
                        className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-16 leading-none"
                    >
                        Ready to <br /><span className="text-orange-600">tell yours?</span>
                    </motion.h2>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/contact')}
                        className="px-16 py-6 bg-white text-black rounded-full font-black text-xs uppercase tracking-[0.4em] hover:bg-orange-600 hover:text-white transition-all shadow-4xl shadow-orange-900/20"
                    >
                        Let's Get Started
                    </motion.button>
                </div>
                {/* Decorative BG Text */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden whitespace-nowrap opacity-[0.02] pointer-events-none font-black text-[30rem] select-none uppercase">
                    ANTI GRAVITY
                </div>
            </div>
        </div>
    );
};
