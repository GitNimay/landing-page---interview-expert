import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagnetButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

const MagnetButton: React.FC<MagnetButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.1, y: y * 0.1 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative px-6 py-3 rounded-full font-medium transition-colors duration-300 flex items-center justify-center gap-2 text-sm md:text-base";
  
  const variants = {
    primary: "bg-white text-black hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.3)] border border-transparent",
    secondary: "bg-transparent text-white border border-slate-700 hover:bg-slate-800 hover:border-slate-500",
    ghost: "bg-transparent text-slate-300 hover:text-white"
  };

  return (
    <motion.button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {variant === 'primary' && (
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-20 blur-lg" />
      )}
    </motion.button>
  );
};

export default MagnetButton;