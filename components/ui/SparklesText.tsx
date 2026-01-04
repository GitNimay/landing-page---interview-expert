"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { useTheme } from "../ThemeContext";

export const SparklesText = ({
    text,
    colors = { first: "#A07CFE", second: "#FE8FB5" },
    className,
    sparklesCount = 10,
}: {
    text: string;
    colors?: { first: string; second: string };
    className?: string;
    sparklesCount?: number;
}) => {
    const { isDark } = useTheme();

    return (
        <div
            className={cn(
                "flex items-center justify-center w-full",
                className
            )}
        >
            <div className="relative inline-block">
                <motion.span
                    initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`relative z-10 block text-transparent bg-clip-text bg-gradient-to-r ${isDark
                        ? 'from-indigo-300 via-white to-indigo-300'
                        : 'from-indigo-600 via-slate-800 to-indigo-600'
                        }`}
                >
                    {text}
                </motion.span>

                {/* Spotlight beam effect */}
                <div className="absolute inset-0 opacity-0 animate-spotlight-beam">
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] blur-[100px] rounded-full mix-blend-screen filter ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-300/30'}`}></div>
                </div>

                {/* Sparkles */}
                {Array.from({ length: sparklesCount }).map((_, i) => (
                    <Sparkle
                        key={i}
                        color={i % 2 === 0 ? colors.first : colors.second}
                        delay={i * 0.1}
                    />
                ))}
            </div>
        </div>
    );
};

const Sparkle: React.FC<{ color: string; delay: number }> = ({ color, delay }) => {
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: [0, 180],
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: delay,
                repeatDelay: Math.random() * 2 + 1,
            }}
            style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: "translate(-50%, -50%)",
            }}
            className="absolute w-4 h-4 z-20 pointer-events-none"
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M8 0L9.79611 6.20389L16 8L9.79611 9.79611L8 16L6.20389 9.79611L0 8L6.20389 6.20389L8 0Z"
                    fill={color}
                />
            </svg>
        </motion.span>
    );
};

