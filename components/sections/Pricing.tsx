import React from 'react';
import { motion } from 'framer-motion';
import MagnetButton from '../ui/MagnetButton';
import FadeIn from '../ui/FadeIn';
import { Check, X } from 'lucide-react';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: "Starter",
      target: "For Candidates",
      price: "$0",
      period: "/month",
      features: ["3 Mock Interviews / mo", "Real-time AI Feedback", "Basic Scorecards"],
      cta: "Start Free Trial",
      featured: false
    },
    {
      name: "Pro",
      target: "Power Users",
      price: "$29",
      period: "/month",
      features: ["Unlimited Sessions", "Detailed Behavioral Analytics", "Interview Library", "Advanced Practice Modes"],
      cta: "Upgrade to Pro",
      featured: true
    },
    {
      name: "Team",
      target: "Hiring Teams",
      price: "Custom",
      period: "",
      features: ["Multiple Recruiter Seats", "Shared Scorecards", "ATS Integration", "Priority Support"],
      cta: "Contact Sales",
      featured: false
    }
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Simple, transparent pricing</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-slate-400 max-w-2xl mx-auto">Start for free, upgrade when you need more power.</p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <FadeIn key={index} delay={index * 0.1} className="h-full">
              <motion.div
                whileHover={{ y: -5 }}
                className={`
                  relative p-8 rounded-2xl border flex flex-col h-full backdrop-blur-md
                  ${plan.featured
                    ? 'bg-slate-900/80 border-indigo-500/50 shadow-2xl shadow-indigo-500/10'
                    : 'bg-slate-950/50 border-slate-800'
                  }
                `}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-display font-bold text-white">{plan.price}</span>
                    {plan.price !== "Free" && <span className="text-slate-400">{plan.period}</span>}
                  </div>
                  <p className="text-slate-400 text-sm">{plan.target}</p>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <Check className={`shrink-0 mt-0.5 ${plan.featured ? 'text-indigo-400' : 'text-slate-500'}`} size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <MagnetButton
                  variant={plan.featured ? 'primary' : 'secondary'}
                  className="w-full justify-center"
                >
                  {plan.cta}
                </MagnetButton>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <p className="text-center text-slate-500 text-sm mt-12">
          Custom enterprise plans available on request.
        </p>
      </div>
    </section>
  );
};

export default Pricing;