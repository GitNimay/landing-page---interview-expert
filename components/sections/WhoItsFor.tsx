import React from 'react';
import { motion } from 'framer-motion';
import { User, Users, Check } from 'lucide-react';
import FadeIn from '../ui/FadeIn';
import { Cover } from '../ui/Cover';
import { TextReveal } from '../ui/TextReveal';

const WhoItsFor: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-2xl md:text-5xl font-display font-bold text-white mb-4 flex justify-center items-center gap-2 flex-wrap">
              Built for <Cover className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-500">candidates</Cover> and <Cover className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-indigo-500">hiring teams</Cover>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-slate-400 max-w-2xl mx-auto">Whether you're practicing for your dream job or evaluating the next top talent, Interview Expert bridges the gap.</p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Candidates Card */}
          <FadeIn delay={0.2} direction="right" className="h-full">
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800 relative overflow-hidden group hover:border-indigo-500/30 transition-colors h-full"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <User size={120} />
              </div>
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6 border border-indigo-500/20">
                <User size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">For Candidates</h3>
              <ul className="space-y-4">
                {[
                  "Practice mock interviews with real-time AI feedback.",
                  "Measure your progress with session history & scoreboards.",
                  "Get tailored suggestions for better answers & body language."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <Check className="text-indigo-500 shrink-0 mt-1" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </FadeIn>

          {/* Recruiters Card */}
          <FadeIn delay={0.4} direction="left" className="h-full">
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800 relative overflow-hidden group hover:border-teal-500/30 transition-colors h-full"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users size={120} />
              </div>
              <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6 border border-teal-500/20">
                <Users size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">For Hiring Teams</h3>
              <ul className="space-y-4">
                {[
                  "Standardized scoring across all candidates.",
                  "Behavioral and communication insights at a glance.",
                  "Share AI-powered summaries with the hiring panel."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <Check className="text-teal-500 shrink-0 mt-1" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;