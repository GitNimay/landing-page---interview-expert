import React from 'react';
import { motion } from 'framer-motion';
import { User, Users, Check } from 'lucide-react';
import FadeIn from '../ui/FadeIn';
import { Cover } from '../ui/Cover';
import { TextReveal } from '../ui/TextReveal';
import { useTheme } from '../ThemeContext';

const WhoItsFor: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className={`text-2xl md:text-5xl font-display font-bold mb-4 flex justify-center items-center gap-2 flex-wrap ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Built for <Cover className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-teal-500">candidates</Cover> and <Cover className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-indigo-500">hiring teams</Cover>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Whether you're practicing for your dream job or evaluating the next top talent, Interview Expert bridges the gap.</p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Candidates Card */}
          <FadeIn delay={0.2} direction="right" className="h-full">
            <motion.div
              whileHover={{ y: -5 }}
              className={`p-8 rounded-2xl backdrop-blur-md border relative overflow-hidden group transition-colors h-full ${isDark
                  ? 'bg-slate-900/40 border-slate-800 hover:border-indigo-500/30'
                  : 'bg-white border-slate-200 hover:border-indigo-300 shadow-lg'
                }`}
            >
              <div className={`absolute top-0 right-0 p-4 transition-opacity ${isDark ? 'opacity-10 group-hover:opacity-20' : 'opacity-5 group-hover:opacity-10'}`}>
                <User size={120} />
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 border ${isDark ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-200'}`}>
                <User size={24} />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>For Candidates</h3>
              <ul className="space-y-4">
                {[
                  "Practice mock interviews with real-time AI feedback.",
                  "Measure your progress with session history & scoreboards.",
                  "Get tailored suggestions for better answers & body language."
                ].map((item, i) => (
                  <li key={i} className={`flex items-start gap-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
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
              className={`p-8 rounded-2xl backdrop-blur-md border relative overflow-hidden group transition-colors h-full ${isDark
                  ? 'bg-slate-900/40 border-slate-800 hover:border-teal-500/30'
                  : 'bg-white border-slate-200 hover:border-teal-300 shadow-lg'
                }`}
            >
              <div className={`absolute top-0 right-0 p-4 transition-opacity ${isDark ? 'opacity-10 group-hover:opacity-20' : 'opacity-5 group-hover:opacity-10'}`}>
                <Users size={120} />
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 border ${isDark ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' : 'bg-teal-50 text-teal-600 border-teal-200'}`}>
                <Users size={24} />
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>For Hiring Teams</h3>
              <ul className="space-y-4">
                {[
                  "Standardized scoring across all candidates.",
                  "Behavioral and communication insights at a glance.",
                  "Share AI-powered summaries with the hiring panel."
                ].map((item, i) => (
                  <li key={i} className={`flex items-start gap-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
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
