import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const MENU_ITEMS = [
    { label: "Home", id: "hero" },
    { label: "Services", id: "services-page" },
    { label: "Work", id: "work-page" },
    { label: "About", id: "about-page" },
    { label: "Contact", id: "contact-page" },
    { label: "Details", id: "details" },
    { label: "Gallery", id: "gallery" },
    { label: "Films", id: "cinematic" },
    { label: "Wedding", id: "wedding" },
    { label: "Motorgraphy", id: "motorgraphy" },
    { label: "Events", id: "events" },
];

export const HamburgerMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (id: string) => {
        if (id === 'services-page') {
            navigate('/services');
            setIsOpen(false);
            return;
        }
        if (id === 'work-page') {
            navigate('/work');
            setIsOpen(false);
            return;
        }
        if (id === 'about-page') {
            navigate('/about');
            setIsOpen(false);
            return;
        }
        if (id === 'contact-page') {
            navigate('/contact');
            setIsOpen(false);
            return;
        }

        if (location.pathname !== '/') {
            navigate('/');
            // Optional: You could pass state here to scroll after navigation
            // navigate('/', { state: { scrollTo: id } });
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsOpen(false);
    };

    return (
        <>
            {/* --- HAMBURGER BUTTON (Fixed Left) --- */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] p-4 group cursor-pointer mix-blend-difference text-white"
            >
                <div className="flex flex-col gap-[6px] items-start">
                    {/* Line 1 */}
                    <motion.div
                        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                        className="w-8 h-[2px] bg-current origin-center transition-all duration-300"
                    />
                    {/* Line 2 */}
                    <motion.div
                        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="w-6 h-[2px] bg-current transition-all duration-300 group-hover:w-8"
                    />
                    {/* Line 3 */}
                    <motion.div
                        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                        className="w-4 h-[2px] bg-current origin-center transition-all duration-300 group-hover:w-8"
                    />
                </div>
            </motion.button>

            {/* --- SIDE DRAWER --- */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop Dim */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[90]"
                        />

                        {/* Drawer Panel */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "tween", ease: [0.32, 0, 0.24, 1], duration: 0.5 }}
                            className="fixed top-0 left-0 h-full w-[300px] bg-[#2A1A12] z-[95] flex flex-col justify-center px-10 shadow-2xl"
                        >
                            {/* Texture Overlay */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                                }}>
                            </div>

                            <nav className="relative z-10 flex flex-col gap-6">
                                {MENU_ITEMS.map((item, index) => (
                                    <motion.button
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + index * 0.1 }}
                                        onClick={() => handleNavigation(item.id)}
                                        className="text-left group"
                                    >
                                        <span className="block text-3xl font-bold text-[#D0C0B0] group-hover:text-white group-hover:translate-x-2 transition-all duration-300 font-sans tracking-wide">
                                            {item.label}
                                        </span>

                                    </motion.button>
                                ))}
                            </nav>

                            {/* Decorative Bottom Text */}
                            <div className="absolute bottom-10 left-10 text-[#8B4513] text-xs uppercase tracking-[0.2em] opacity-60">
                                Est. 2024 • Stories
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};
