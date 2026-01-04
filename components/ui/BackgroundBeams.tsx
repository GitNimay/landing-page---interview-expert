"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { useTheme } from "../ThemeContext";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    const { isDark } = useTheme();
    const bgColor = isDark ? 'bg-slate-950' : 'bg-slate-50';
    const glowColor = isDark ? 'bg-indigo-500/20' : 'bg-indigo-300/30';

    return (
        <div
            className={cn(
                `absolute h-full w-full inset-0 ${bgColor} [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]`,
                className
            )}
        >
            <div className={`absolute inset-0 ${bgColor} [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]`}></div>
            <div className={`absolute w-full h-full ${bgColor} [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]`}></div>
            <div className="absolute inset-0 opacity-0 animate-spotlight-beam">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ${glowColor} blur-[100px] rounded-full mix-blend-screen filter`} />
            </div>
        </div>
    );
};

