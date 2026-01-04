"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { useTheme } from "../ThemeContext";

export const Cover = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const [hovered, setHovered] = React.useState(false);
    const { isDark } = useTheme();

    const ref = React.useRef<HTMLDivElement>(null);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setHovered(!hovered)}
            ref={ref}
            className={`relative group/cover inline-block px-2 py-2 transition duration-200 rounded-sm cursor-pointer ${isDark
                    ? 'bg-neutral-900 hover:bg-neutral-800'
                    : 'bg-indigo-50 hover:bg-indigo-100'
                }`}
        >
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`h-full w-full absolute inset-0 opacity-50 z-0 ${isDark ? 'bg-neutral-800' : 'bg-indigo-100'}`}
                    />
                )}
            </AnimatePresence>
            <div className="relative z-10 flex items-center gap-2">
                {children}
                <Sparkles isDark={isDark} />
            </div>
            <motion.span
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: hovered ? -10 : 0, opacity: hovered ? 0 : 1 }}
                className={`text-sm absolute right-0 bottom-0 translate-y-full opacity-0 group-hover/cover:opacity-100 transition duration-200 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}
            >

            </motion.span>
            <Beam className="-top-1 left-0" hovered={hovered} duration={2} delay={0} />
            <Beam className="-bottom-1 right-0" hovered={hovered} duration={2} delay={0.5} />
            <Beam className="top-0 -left-1 h-full w-[2px]" hovered={hovered} duration={2} delay={1} vertical />
            <Beam className="bottom-0 -right-1 h-full w-[2px]" hovered={hovered} duration={2} delay={1.5} vertical />
        </div>
    );
};

const Beam = ({
    className,
    hovered,
    duration,
    delay,
    vertical = false,
}: {
    className?: string;
    hovered: boolean;
    duration: number;
    delay: number;
    vertical?: boolean;
}) => {
    return (
        <motion.div
            initial={{
                width: vertical ? "2px" : "0%",
                height: vertical ? "0%" : "2px",
            }}
            animate={{
                width: vertical ? "2px" : hovered ? "100%" : "0%",
                height: vertical ? (hovered ? "100%" : "0%") : "2px",
            }}
            transition={{
                duration,
                delay,
                ease: "easeInOut",
            }}
            className={cn(
                "absolute bg-indigo-500",
                className
            )}
        />
    );
};

const Sparkles = ({ isDark }: { isDark: boolean }) => {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                }}
                className={`w-full h-full blur-xl ${isDark ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20' : 'bg-gradient-to-r from-indigo-400/30 to-purple-400/30'}`}
            />
        </div>
    )
}

