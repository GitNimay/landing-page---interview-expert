import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '../ui/FadeIn';
import { useTheme } from '../ThemeContext';

const FAQItem: React.FC<{ question: string, answer: string, isDark: boolean }> = ({ question, answer, isDark }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full py-6 flex items-center justify-between text-left transition-colors ${isDark ? 'hover:text-indigo-400' : 'hover:text-indigo-600'}`}
      >
        <span className={`text-lg font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{question}</span>
        <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>
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
            <p className={`pb-6 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
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
  const { isDark } = useTheme();

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
    <section id="faq" className={`py-24 backdrop-blur-sm ${isDark ? 'bg-slate-950/40' : 'bg-slate-50'}`}>
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className={`text-3xl md:text-5xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>Frequently asked questions</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Everything you need to know about Interview Expert.</p>
          </FadeIn>
        </div>
        <div className="flex flex-col space-y-4">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <FAQItem question={faq.question} answer={faq.answer} isDark={isDark} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
