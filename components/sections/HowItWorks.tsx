import React from 'react';
import { motion } from 'framer-motion';
import { Video, Brain, FileText, ArrowRight, ArrowDown } from 'lucide-react';
import FadeIn from '../ui/FadeIn';
import { GlowingEffect } from '../ui/glowing-effect';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Start your session",
      description: "Choose a role (e.g., SDE, DevOps, Product) and start a mock or live interview.",
      icon: <Video size={32} />
    },
    {
      number: "02",
      title: "AI analyzes in real time",
      description: "Our AI tracks what you say, how you say it, and how you present yourself instantly.",
      icon: <Brain size={32} />
    },
    {
      number: "03",
      title: "Get an actionable report",
      description: "Receive a scorecard, feedback, and practice recommendations within seconds.",
      icon: <FileText size={32} />
    }
  ];

  return (
    <section id="how-it-works" className="py-24 border-t border-slate-800/50 bg-slate-950/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">How it works</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-slate-400 max-w-2xl mx-auto">Three simple steps to interview mastery.</p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <FadeIn key={index} delay={index * 0.2} className="relative">
              <div className="relative z-10 h-full group">
                <div className="relative h-full rounded-2xl border border-slate-800 bg-slate-900/50 p-8 overflow-hidden">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-indigo-500/20 shadow-lg shadow-indigo-500/5">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>

              {/* Connector Arrow (Desktop) */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20 text-indigo-500/50"
                  animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight size={32} />
                </motion.div>
              )}

              {/* Connector Arrow (Mobile) */}
              {index < steps.length - 1 && (
                <motion.div
                  className="md:hidden flex justify-center py-4 text-indigo-500/50"
                  animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowDown size={32} />
                </motion.div>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;