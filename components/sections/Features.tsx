import React from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart3, MessageSquareText, FileText, LineChart, Users, Brain, ShieldCheck } from 'lucide-react';
import FadeIn from '../ui/FadeIn';
import { SparklesText } from '../ui/SparklesText';
import { useTheme } from '../ThemeContext';

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

const Feature = ({
  title,
  description,
  icon,
  index,
  isDark,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  isDark: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col py-10 relative group/feature",
        isDark ? "border-slate-800" : "border-slate-200",
        "border-b lg:border-b-0", // Mobile: border-b. Desktop: reset default border-b logic
        "lg:border-r", // Desktop: default right border
        (index === 0 || index === 4) && "lg:border-l", // Desktop: Left border for first column
        index < 4 && "lg:border-b" // Desktop: Bottom border for first row
      )}
    >
      {/* Hover Gradient Background */}
      <div className={`opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full pointer-events-none ${isDark ? 'bg-gradient-to-b from-indigo-500/5 to-transparent' : 'bg-gradient-to-b from-indigo-100/50 to-transparent'}`} />

      {/* Icon */}
      <div className={`mb-4 relative z-10 px-10 transition-colors duration-200 ${isDark ? 'text-slate-400 group-hover/feature:text-indigo-400' : 'text-slate-500 group-hover/feature:text-indigo-600'}`}>
        {icon}
      </div>

      {/* Title with sliding accent */}
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className={`absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full transition-all duration-200 origin-center ${isDark ? 'bg-slate-700 group-hover/feature:bg-indigo-500' : 'bg-slate-300 group-hover/feature:bg-indigo-500'}`} />
        <span className={`group-hover/feature:translate-x-2 transition duration-200 inline-block ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
          {title}
        </span>
      </div>

      {/* Description */}
      <p className={`text-sm max-w-xs relative z-10 px-10 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        {description}
      </p>
    </div>
  );
};

const Features: React.FC = () => {
  const { isDark } = useTheme();

  const features = [
    {
      title: "Real-time analysis",
      description: "Track eye contact, posture, and expressions during the interview to spot confidence.",
      icon: <Activity className="w-6 h-6" />,
    },
    {
      title: "Smart scoring",
      description: "Rate structure, clarity, and technical correctness — with one combined Interview Score.",
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      title: "Live transcript",
      description: "See transcripts as you speak, with role-specific keywords highlighted instantly.",
      icon: <MessageSquareText className="w-6 h-6" />,
    },
    {
      title: "Detailed reports",
      description: "Get a detailed breakdown of strengths, gaps, and suggested practice questions.",
      icon: <FileText className="w-6 h-6" />,
    },
    {
      title: "Progress tracking",
      description: "Compare sessions over time and see how your Interview Score improves.",
      icon: <LineChart className="w-6 h-6" />,
    },
    {
      title: "Team collaboration",
      description: "Recruiters can add notes, override AI scores, and share with the panel.",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Contextual Feedback",
      description: "AI understands the context of your answer, not just keywords.",
      icon: <Brain className="w-6 h-6" />,
    },
    {
      title: "Privacy First",
      description: "Your video and audio data is processed securely and never used for training without consent.",
      icon: <ShieldCheck className="w-6 h-6" />,
    },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <FadeIn>
            <SparklesText
              text="Everything you need to master the interview"
              className={`text-2xl md:text-5xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}
            />
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Our AI-powered platform provides comprehensive tools to help you prepare, practice, and perfect your interview skills.</p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FadeIn key={feature.title} delay={index * 0.1} className="h-full">
              <Feature {...feature} index={index} isDark={isDark} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
