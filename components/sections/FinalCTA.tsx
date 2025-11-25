import React from 'react';
import { motion } from 'framer-motion';
import MagnetButton from '../ui/MagnetButton';
import FadeIn from '../ui/FadeIn';
import { BackgroundBeams } from '../ui/BackgroundBeams';

const FinalCTA: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-32">
      {/* Glow effect from bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-t from-indigo-900/40 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
            Ready to master your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400">next interview?</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of candidates who have landed their dream jobs using Interview Expert's AI-powered feedback.
          </p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagnetButton className="px-8 py-4 text-lg min-w-[200px] justify-center">
              Get Started Free
            </MagnetButton>
            <button className="px-8 py-4 rounded-full text-slate-300 font-medium hover:text-white transition-colors">
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