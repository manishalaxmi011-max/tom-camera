import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface FloatingCameraProps {
    cameraY: MotionValue<string>;
    cameraX: MotionValue<string>;
    cameraRotate: MotionValue<number>;
    cameraScale: MotionValue<number>;
    opacity?: MotionValue<number>;
}

export const FloatingCamera: React.FC<FloatingCameraProps> = ({ cameraY, cameraX, cameraRotate, cameraScale, opacity }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-50 flex items-center justify-center">
            <motion.img
                src="/camera.png"
                alt="Vintage Camera"
                style={{
                    y: cameraY,
                    x: cameraX,
                    rotate: cameraRotate,
                    scale: cameraScale,
                    opacity: opacity || 1
                }}
                className="w-[60vw] max-w-[280px] md:max-w-none md:w-[680px] drop-shadow-2xl object-contain mt-8"
            />
        </div>
    );
};
