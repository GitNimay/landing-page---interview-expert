import React from 'react';
import { motion } from 'framer-motion';
import MagnetButton from '../ui/MagnetButton';
import FadeIn from '../ui/FadeIn';
import { BackgroundBeams } from '../ui/BackgroundBeams';
import { useTheme } from '../ThemeContext';

const FinalCTA: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section className="relative overflow-hidden py-32">
      {/* Glow effect from bottom */}
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t pointer-events-none ${isDark ? 'from-indigo-900/40 to-transparent' : 'from-indigo-100/80 to-transparent'}`} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <FadeIn>
          <h2 className={`text-4xl md:text-6xl font-display font-bold mb-6 leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Ready to master your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">next interview?</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className={`text-lg mb-10 max-w-2xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Join thousands of candidates who have landed their dream jobs using Interview Expert's AI-powered feedback.
          </p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagnetButton className="px-8 py-4 text-lg min-w-[200px] justify-center">
              Get Started Free
            </MagnetButton>
            <button className={`px-8 py-4 rounded-full font-medium transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
              Schedule Demo
            </button>
          </div>
        </FadeIn>
      </div>
      <BackgroundBeams />
    </section>
  );
};

export default FinalCTA;
