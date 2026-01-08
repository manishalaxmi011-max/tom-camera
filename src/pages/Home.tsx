import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { SecondCaptureSection } from '../components/SecondCaptureSection';
import { GallerySection } from '../components/GallerySection';
import { CinematicVideoSection } from '../components/CinematicVideoSection';
import { WeddingSection } from '../components/WeddingSection';
import { MotorgraphySection } from '../components/MotorgraphySection';
import { EventsSection } from '../components/EventsSection';
import { CTASection } from '../components/CTASection';
import { FloatingCamera } from '../components/FloatingCamera';
import { HamburgerMenu } from '../components/HamburgerMenu';

export const Home = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // --- ANIMATIONS ---

    // 1. Flash Effect
    const flashOpacity = useTransform(scrollYProgress, [0.18, 0.2, 0.22], [0, 1, 0]);

    // 2. Background Color Timeline
    // 0-0.35 (Hero/Details/Gallery): Light #F3F0EA
    // 0.40-0.50 (Cinematic): Dark #121212
    // 0.55-0.65 (Wedding): Light #FAF0E6
    // 0.70-1.00 (Motorgraphy/Events/CTA): Dark #050505
    const bgColor = useTransform(
        scrollYProgress,
        [0, 0.35, 0.40, 0.50, 0.55, 0.65, 0.70, 1],
        ["#F3F0EA", "#F3F0EA", "#121212", "#121212", "#FAF0E6", "#FAF0E6", "#050505", "#050505"]
    );

    // 3. Camera Position (Y)
    const cameraY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);

    // 4. Camera X Position
    // Hero (0): Center
    // Details (0.15): Right 25% (Reveals Left Text)
    // Gallery (0.30): Center (Sticky Flash)
    // Cinematic (0.45): Left -25% (Reveals Right Text)
    // Wedding (0.60): Right 20% (Reveals Left Text)
    // Motorgraphy (0.75): Left -25% (Reveals Right Text)
    // Events (0.90): Center (Grid)
    const cameraX = useTransform(
        scrollYProgress,
        [0, 0.15, 0.20, 0.28, 0.35, 0.42, 0.48, 0.55, 0.60, 0.68, 0.75, 0.85, 0.9],
        ["0%", "25%", "25%", "0%", "0%", "-25%", "-25%", "20%", "20%", "-25%", "-25%", "0%", "0%"]
    );

    // 5. Camera Rotation
    const cameraRotate = useTransform(
        scrollYProgress,
        [0, 0.15, 0.30, 0.45, 0.60, 0.75, 0.90],
        [0, -10, 0, 10, -5, 12, 0]
    );

    // 6. Camera Scale
    const cameraScale = useTransform(
        scrollYProgress,
        [0, 0.15, 0.30, 0.45, 0.60, 0.75, 0.90],
        [1, 0.9, 1.1, 0.8, 0.85, 0.8, 1]
    );

    // 6.1 Camera Opacity (Fade out before CTA)
    const cameraOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);

    // 7. Navbar Opacity
    const navOpacity = useTransform(scrollYProgress, [0.05, 0.15], [1, 0]);



    // 11. Text Parallax
    const textParallax = useTransform(scrollYProgress, [0.2, 0.35], [50, -50]);

    // 12. Scrolling Text background
    const scrollingTextOpacity = useTransform(scrollYProgress, [0.25, 0.3, 0.38, 0.42], [0, 1, 1, 0]);
    const scrollingTextX = useTransform(scrollYProgress, [0.25, 0.5], ["100%", "-50%"]);
    const scrollingTextX2 = useTransform(scrollYProgress, [0.25, 0.5], ["-50%", "100%"]);


    return (
        <motion.div
            ref={containerRef}
            style={{ backgroundColor: bgColor }}
            className="relative font-sans selection:bg-orange-200 overflow-x-hidden"
        >

            {/* --- FLASH SHUTTER LAYER --- */}
            <motion.div
                style={{ opacity: flashOpacity }}
                className="fixed inset-0 z-[60] bg-white pointer-events-none mix-blend-hard-light"
            />



            {/* --- SCROLLING TEXT BACKGROUND --- */}
            <motion.div
                style={{ opacity: scrollingTextOpacity }}
                className="fixed top-0 left-0 w-full h-full z-30 pointer-events-none flex flex-col items-center justify-center mix-blend-multiply overflow-hidden"
            >
                {/* Row 1 - Left to Right */}
                <motion.div style={{ x: scrollingTextX }} className="whitespace-nowrap mb-8">
                    <h1
                        className="font-serif font-bold tracking-widest select-none"
                        style={{
                            fontSize: "10vw",
                            color: "#8B4513", // Saddle Brown
                            opacity: 0.3,
                        }}
                    >
                        PREMIUM OPTICS • VINTAGE SOUL • TIMELESS •
                    </h1>
                </motion.div>

                {/* Row 2 - Right to Left */}
                <motion.div style={{ x: scrollingTextX2 }} className="whitespace-nowrap">
                    <h1
                        className="font-serif font-bold tracking-widest select-none"
                        style={{
                            fontSize: "10vw",
                            color: "#8B4513", // Saddle Brown
                            opacity: 0.3,
                        }}
                    >
                        • PHOTOGRAPHY • CAPTURE LIFE • ARTISTRY
                    </h1>
                </motion.div>
            </motion.div>

            <motion.div style={{ opacity: navOpacity }} className="fixed top-0 left-0 right-0 z-50">
                <Navbar />
            </motion.div>



            {/* --- FLOATING CAMERA --- */}
            <FloatingCamera
                cameraY={cameraY}
                cameraX={cameraX}
                cameraRotate={cameraRotate}
                cameraScale={cameraScale}
                opacity={cameraOpacity}
            />

            {/* --- SECTIONS --- */}
            <HamburgerMenu />

            <div id="hero">
                <HeroSection />
            </div>

            <div id="details">
                <SecondCaptureSection textParallax={textParallax} />
            </div>

            <div id="gallery">
                <GallerySection />
            </div>

            <div id="cinematic">
                <CinematicVideoSection />
            </div>

            <div id="wedding">
                <WeddingSection />
            </div>

            <div id="motorgraphy">
                <MotorgraphySection />
            </div>

            <div id="events">
                <EventsSection />
            </div>

            <div id="cta">
                <CTASection />
            </div>

            {/* Footer Spacer */}
            <div className="h-[10vh] bg-[#F7F7F7]"></div>
        </motion.div>
    );
}
