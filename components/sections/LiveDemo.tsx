import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, CheckCircle2, AlertCircle } from 'lucide-react';
import FadeIn from '../ui/FadeIn';
import { BackgroundBeams } from '../ui/BackgroundBeams';
import { useTheme } from '../ThemeContext';

const LiveDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'candidate' | 'recruiter'>('candidate');
  const [isPlaying, setIsPlaying] = useState(false);
  const { isDark } = useTheme();

  return (
    <section className={`py-24 bg-gradient-to-b relative ${isDark ? 'from-transparent to-slate-900/50' : 'from-transparent to-slate-100/50'}`}>
      <BackgroundBeams className="absolute inset-0 opacity-30" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className={`text-3xl md:text-5xl font-display font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>See it in action</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Watch how our AI analyzes a candidate's response in real-time, providing instant feedback on confidence, clarity, and technical accuracy.</p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className={`flex items-center justify-center gap-1 p-1 backdrop-blur rounded-full border inline-flex mx-auto mt-8 relative z-0 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              {['candidate', 'recruiter'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`
                    relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 capitalize z-10
                    ${activeTab === tab ? 'text-white' : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}
                  `}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-indigo-600 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {tab} View
                </button>
              ))}
            </div>
          </FadeIn>
        </div>

        <div className={`max-w-4xl mx-auto backdrop-blur-xl border rounded-2xl overflow-hidden shadow-2xl relative min-h-[400px] ${isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white border-slate-200'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-4 md:p-8 h-full"
            >
              {activeTab === 'candidate' ? (
                <div className="max-w-2xl mx-auto">
                  {/* Analysis Panel */}
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${isDark ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-200'}`}>
                          <AlertCircle size={20} />
                        </div>
                        <div>
                          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Real-time Insights</h3>
                          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>AI detects nuances instantly</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {[
                          { label: "Confidence Score", value: "92%", color: "text-green-400", bar: "bg-green-500", width: "92%" },
                          { label: "Technical Accuracy", value: "88%", color: "text-indigo-400", bar: "bg-indigo-500", width: "88%" },
                          { label: "Communication Clarity", value: "95%", color: "text-teal-400", bar: "bg-teal-500", width: "95%" },
                        ].map((metric, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>{metric.label}</span>
                              <span className={`font-mono font-bold ${metric.color}`}>{metric.value}</span>
                            </div>
                            <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: metric.width }}
                                transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                className={`h-full rounded-full ${metric.bar}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={`rounded-xl p-6 border relative overflow-hidden ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      {/* Generative Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-teal-500/10 animate-pulse pointer-events-none" />

                      <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 relative z-10 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        Live Feedback
                      </h4>
                      <div className="space-y-3 relative z-10">
                        {[
                          "Great use of the STAR method to structure your answer.",
                          "Maintained excellent eye contact throughout the response.",
                          "Consider elaborating more on the technical challenges faced."
                        ].map((feedback, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + (i * 0.5) }}
                            className={`flex gap-3 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                          >
                            <CheckCircle2 className="text-indigo-500 shrink-0 mt-0.5" size={16} />
                            <motion.span
                              initial={{ opacity: 0 }}
                              whileInView={{ opacity: 1 }}
                              transition={{ duration: 1, delay: 1 + (i * 0.5) }}
                            >
                              {feedback}
                            </motion.span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div className={`flex flex-col md:flex-row items-start md:items-center justify-between border-b pb-4 gap-4 md:gap-0 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                    <div>
                      <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Candidate Evaluation: John Doe</h3>
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Applied for: Product Designer</p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <button className={`flex-1 md:flex-none px-3 py-1 rounded text-sm font-medium ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'}`}>Reject</button>
                      <button className="flex-1 md:flex-none px-3 py-1 bg-indigo-600 text-white rounded text-sm font-medium hover:bg-indigo-500">Advance</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {['Communication', 'Problem Solving', 'Culture Fit'].map((crit, i) => (
                      <div key={crit} className={`p-4 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                        <span className={`text-xs uppercase font-bold ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>{crit}</span>
                        <div className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{8 + i}/10</div>
                      </div>
                    ))}
                  </div>
                  <div className={`p-4 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>AI Summary</h4>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Candidate demonstrated strong user empathy and process knowledge. However, when asked about conflict resolution, their answer lacked specific examples. Recommended to probe deeper on team collaboration in next round.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
