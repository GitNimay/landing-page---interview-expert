import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });

            // Check if hovering over a clickable element
            const target = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') !== null ||
                target.closest('a') !== null
            );
        };

        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    return (
        <>
            {/* Main Dot */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-indigo-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                animate={{
                    x: mousePosition.x - 8,
                    y: mousePosition.y - 8,
                    scale: isPointer ? 1.5 : 1,
                }}
                transition={{
                    type: "tween",
                    ease: "backOut",
                    duration: 0.1
                }}
            />

            {/* Trailing Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-indigo-400 rounded-full pointer-events-none z-[9998]"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isPointer ? 1.5 : 1,
                    opacity: isPointer ? 0.8 : 0.4,
                }}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.5
                }}
            />
        </>
    );
};

export default CustomCursor;
