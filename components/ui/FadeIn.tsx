import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    fullWidth?: boolean;
    blur?: boolean;
}

const FadeIn: React.FC<FadeInProps> = ({
    children,
    delay = 0,
    duration = 0.5,
    className = '',
    direction = 'up',
    fullWidth = false,
    blur = true
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

    // Add a small random delay to create a more natural, staggered feel
    // We use a fixed seed based on children to avoid hydration mismatches if possible, 
    // but for simple visual randomness, a stable random effect on mount is fine.
    // However, to be safe with SSR, we'll stick to the passed delay or a deterministic pseudo-random if needed.
    // For now, let's just add a tiny bit of randomness if it's not 0, or just keep it simple.
    // The user asked for "random scroll animations", so let's add a small random factor to the delay.
    const randomDelay = React.useMemo(() => Math.random() * 0.2, []);
    const finalDelay = delay + randomDelay;

    const getInitial = () => {
        const initialBlur = blur ? { filter: 'blur(10px)' } : {};
        switch (direction) {
            case 'up': return { opacity: 0, y: 20, ...initialBlur };
            case 'down': return { opacity: 0, y: -20, ...initialBlur };
            case 'left': return { opacity: 0, x: 20, ...initialBlur };
            case 'right': return { opacity: 0, x: -20, ...initialBlur };
            default: return { opacity: 0, ...initialBlur };
        }
    };

    const getAnimate = () => {
        const animateBlur = blur ? { filter: 'blur(0px)' } : {};
        switch (direction) {
            case 'up': return { opacity: 1, y: 0, ...animateBlur };
            case 'down': return { opacity: 1, y: 0, ...animateBlur };
            case 'left': return { opacity: 1, x: 0, ...animateBlur };
            case 'right': return { opacity: 1, x: 0, ...animateBlur };
            default: return { opacity: 1, ...animateBlur };
        }
    };

    return (
        <motion.div
            ref={ref}
            initial={getInitial()}
            animate={isInView ? getAnimate() : getInitial()}
            transition={{ duration, delay: finalDelay, ease: "easeOut" }}
            className={`${className} ${fullWidth ? 'w-full' : ''}`}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;
