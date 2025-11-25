import React from "react";
import { motion } from "framer-motion";

interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

interface BentoGridItemProps {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}

export const BentoGridItem: React.FC<BentoGridItemProps> = ({
  className,
  title,
  description,
  header,
  icon,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`
        row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-slate-900/50 dark:border-white/[0.1] bg-white border border-transparent justify-between flex flex-col space-y-4 border-slate-800/50
        ${className}
      `}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="mb-2 text-indigo-400">
          {icon}
        </div>
        <div className="font-display font-bold text-slate-100 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-slate-400 text-sm">
          {description}
        </div>
      </div>
    </motion.div>
  );
};