import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../ui/FadeIn';

const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-indigo-400 transition-colors"
      >
        <span className="text-lg font-medium text-slate-200">{question}</span>
        <span className="text-slate-500">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    {
      question: "Is Interview Expert suitable for first-time job seekers?",
      answer: "Absolutely. We have specific tracks for internships and entry-level roles that focus on foundational behavioral questions and confidence building."
    },
    {
      question: "Can I use it with real interviews or only mock sessions?",
      answer: "Currently, Interview Expert is optimized for mock sessions to provide a safe practice environment. However, our Enterprise plan for Recruiters supports live interview evaluation."
    },
    {
      question: "How accurate is the AI scoring?",
      answer: "Our models are trained on thousands of successful tech and behavioral interviews. While AI is a tool, our scoring correlates highly with human recruiter evaluations in beta tests."
    },
    {
      question: "How do you handle my data and video recordings?",
      answer: "Privacy is our priority. Video is processed in real-time and not permanently stored unless you explicitly save the session. We are SOC-2 compliant."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-950/40 backdrop-blur-sm">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Frequently asked questions</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to know about Interview Expert.</p>
          </FadeIn>
        </div>
        <div className="flex flex-col space-y-4">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <FAQItem question={faq.question} answer={faq.answer} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;