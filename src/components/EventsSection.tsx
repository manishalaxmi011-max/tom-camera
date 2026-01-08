import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const events = [
    {
        id: "01",
        title: "Gala de Nuit",
        location: "Paris, France",
        date: "DEC 2024",
        image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=1200",
        type: "Corporate"
    },
    {
        id: "02",
        title: "Neon Horizon",
        location: "Tokyo, Japan",
        date: "JAN 2025",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200",
        type: "Nightlife"
    },
    {
        id: "03",
        title: "Velvet Fashion",
        location: "Milan, Italy",
        date: "FEB 2025",
        image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1200",
        type: "Runway"
    },
    {
        id: "04",
        title: "Golden Hour",
        location: "Santorini, Greece",
        date: "MAR 2025",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
        type: "Private"
    }
];

export const EventsSection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax Transforms
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    // Vertical parallax for columns - specific pixel values for reliable negation
    const p1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const p2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    // Smooth spring physics
    const p1Spring = useSpring(p1, { stiffness: 100, damping: 30 });
    const p2Spring = useSpring(p2, { stiffness: 100, damping: 30 });

    return (
        <section
            ref={containerRef}
            className="relative w-full py-32 bg-[#050505] text-[#E0E0E0] overflow-hidden"
        >
            {/* Subtle Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header Section */}
                <motion.div
                    style={{ opacity, y }}
                    className="flex flex-col md:flex-row items-end justify-between mb-24 pb-8 border-b border-white/10"
                >
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-1.5 h-1.5 bg-[#C66E4B] rounded-full" />
                            <span className="text-xs font-medium tracking-[0.4em] uppercase text-zinc-500">Global Coverage</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-serif text-white leading-[0.9]">
                            Moments <br />
                            <span className="italic opacity-50 font-light">Unfiltered.</span>
                        </h2>
                    </div>

                    <div className="mt-8 md:mt-0 flex flex-col items-end gap-2">
                        <p className="text-right text-sm md:text-base text-zinc-400 max-w-xs font-light leading-relaxed">
                            From intimate gatherings to stadium spectacles. We bring the lens that captures the soul of the event.
                        </p>
                        <button className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors mt-4">
                            <span className="text-xs tracking-[0.2em] uppercase border-b border-transparent group-hover:border-[#C66E4B] pb-0.5 transition-all">View Calendar</span>
                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </button>
                    </div>
                </motion.div>

                {/* Events Grid / Composition */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">

                    {/* Column 1 - Starts Lower */}
                    <div className="md:col-span-5 md:mt-32 space-y-12">
                        {events.filter((_, i) => i % 2 === 0).map((event, index) => (
                            <EventCard key={event.id} event={event} yValue={p1Spring} index={index} />
                        ))}
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block md:col-span-2"></div>

                    {/* Column 2 - Starts Higher */}
                    <div className="md:col-span-5 space-y-12 md:-mt-12">
                        {events.filter((_, i) => i % 2 !== 0).map((event, index) => (
                            <EventCard key={event.id} event={event} yValue={p2Spring} index={index + 2} />
                        ))}
                        <div className="h-32 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-zinc-600 text-xs tracking-widest uppercase mb-2">And many more</p>
                                <div className="h-16 w-[1px] bg-gradient-to-b from-zinc-800 to-transparent mx-auto"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

const EventCard = ({ event, yValue, index }: { event: any, yValue: any, index: number }) => {
    // Simple math to make columns move in opposite directions if preferred, 
    // or just pass different springs. 
    // Here we assume yValue is already the correct spring (p1 or p2).

    return (
        <motion.div
            style={{ y: yValue }}
            className="group relative w-full aspect-[3/4] overflow-hidden bg-zinc-900 cursor-pointer"
        >
            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between transition-all duration-500 bg-black/20 group-hover:bg-black/40">
                <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transform -translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-[10px] font-bold tracking-widest border border-white/30 px-2 py-1 uppercase text-white">{event.type}</span>
                    <ArrowUpRight className="text-white w-5 h-5" />
                </div>

                <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span className="block text-[10px] tracking-[0.3em] font-medium text-[#C66E4B] mb-2 uppercase">{event.date}</span>
                    <h3 className="text-3xl font-serif text-white italic mb-1">{event.title}</h3>
                    <p className="text-xs tracking-widest text-zinc-300 uppercase">{event.location}</p>
                </div>
            </div>

            <motion.img
                src={event.image}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
            />

            {/* Hover Glare Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </motion.div>
    );
};
