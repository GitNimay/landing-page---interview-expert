import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Brain, ScanFace, Lock } from 'lucide-react';
import MagnetButton from '../ui/MagnetButton';
import { GlowingEffect } from '../ui/glowing-effect';
import FadeIn from '../ui/FadeIn';
import { Spotlight } from '../ui/Spotlight';
import { TextReveal } from '../ui/TextReveal';

const Hero: React.FC = () => {
  const [isLive, setIsLive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Simulation State
  const [metrics, setMetrics] = useState({
    confidence: 0,
    technical: 0,
    pacing: 0,
    eyeContact: 0
  });

  const startDemo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsLive(true);
    } catch (err) {
      console.error("Camera access denied", err);
      alert("Please allow camera access to try the live demo.");
    }
  };

  const stopDemo = () => {
    setIsLive(false);
    setMetrics({
      confidence: 0,
      technical: 0,
      pacing: 0,
      eyeContact: 0
    });

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    if (!isLive) return;

    // Simulate metrics ramping up and fluctuating
    const interval = setInterval(() => {
      setMetrics(prev => ({
        confidence: Math.min(Math.max(prev.confidence + (Math.random() > 0.5 ? 2 : -0.5), 0), 92 + Math.random() * 3),
        technical: Math.min(Math.max(prev.technical + (Math.random() > 0.5 ? 3 : -1), 0), 85 + Math.random() * 4),
        pacing: Math.min(Math.max(prev.pacing + (Math.random() > 0.5 ? 5 : -2), 0), 75 + Math.random() * 5),
        eyeContact: Math.min(Math.max(prev.eyeContact + (Math.random() > 0.5 ? 4 : -1), 0), 88 + Math.random() * 2)
      }));
    }, 200);

    // Auto-stop the demo after 30 seconds
    const timeout = setTimeout(() => {
      stopDemo();
    }, 30000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isLive]);

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Helper to format pacing text based on value
  const getPacingLabel = (val: number) => {
    if (val === 0) return "-";
    if (val < 30) return "Slow";
    if (val < 70) return "Optimal";
    return "Fast";
  };

  const getPacingColor = (val: number) => {
    if (val === 0) return "text-slate-500";
    if (val < 30) return "text-yellow-400";
    if (val < 70) return "text-green-400";
    return "text-yellow-400";
  };

  const getPacingBarColor = (val: number) => {
    if (val < 30) return "bg-yellow-500";
    if (val < 70) return "bg-green-500";
    return "bg-yellow-500";
  };

  return (
    <div className="relative min-h-screen pt-24 pb-16 flex flex-col items-center justify-center overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="container mx-auto px-4 flex flex-col items-center relative z-20">

        {/* Badge */}
        <FadeIn delay={0.2}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs font-medium text-indigo-300 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            For Candidates & Hiring Teams
          </div>
        </FadeIn>

        {/* Headlines */}
        <div className="text-center mb-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-display font-bold text-white leading-tight">
            <TextReveal text="Ace every interview with" className="justify-center" />
            <br />
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400 animate-gradient inline-block"
              style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
            >
              real-time AI feedback
            </span>
          </h1>
        </div>

        {/* CTAs */}
        <FadeIn delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
            <MagnetButton variant="primary">
              Start Free Trial
            </MagnetButton>
            <MagnetButton variant="secondary">
              <PlayCircle size={18} />
              Watch 2-min Demo
            </MagnetButton>
          </div>
        </FadeIn>

        {/* Mock UI */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="w-full max-w-5xl rounded-xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-indigo-500/10 overflow-hidden relative"
        >
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          {/* Header of Mock UI */}
          <div className="h-10 border-b border-slate-800 flex items-center px-4 gap-2 bg-slate-950/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <div className="ml-4 px-3 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400 font-mono flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-red-500 animate-pulse' : 'bg-slate-500'}`} />
              {isLive ? 'LIVE ANALYSIS • 00:00:12' : 'READY TO START'}
            </div>
          </div>

          {/* Content of Mock UI */}
          <div className="flex flex-col md:flex-row h-[500px]">
            {/* Left: Video Feed */}
            <div className="flex-1 bg-slate-950 relative p-4 flex items-center justify-center border-r border-slate-800 overflow-hidden">
              <div className="relative w-full h-full rounded-lg bg-slate-900 overflow-hidden group border border-slate-800/50">

                {/* Video Element */}
                <video
                  ref={videoRef}
                  className={`w-full h-full object-cover transition-opacity duration-700 ${isLive ? 'opacity-100' : 'opacity-0'}`}
                  autoPlay
                  muted
                  playsInline
                />

                {/* Placeholder / Start Button */}
                {!isLive && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 opacity-50" />
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
                      backgroundSize: '24px 24px'
                    }}></div>

                    <button
                      onClick={startDemo}
                      className="group relative z-20 flex flex-col items-center gap-4 transition-transform hover:scale-105 active:scale-95"
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.4)] group-hover:shadow-[0_0_60px_rgba(99,102,241,0.6)] transition-shadow duration-300 border border-white/20">
                        <ScanFace size={32} className="text-white" />
                      </div>
                      <div className="text-center">
                        <span className="block text-lg font-bold text-white">Enable Camera</span>
                        <span className="text-sm text-slate-400">to try live analysis</span>
                      </div>
                    </button>
                    <div className="absolute bottom-8 text-xs text-slate-500 flex items-center gap-1.5">
                      <Lock size={10} />
                      Video is processed locally in browser. No data saved.
                    </div>
                  </div>
                )}

                {/* Overlays (Only visible when live) */}
                {isLive && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-mono text-green-400 border border-green-500/20 shadow-lg flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      Eye Contact: Good ({Math.round(metrics.eyeContact)}%)
                    </motion.div>

                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 w-max">
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
                        className="px-4 py-2 bg-indigo-500/20 border border-indigo-500/50 text-indigo-200 text-xs rounded-full backdrop-blur-md flex items-center gap-2 shadow-lg"
                      >
                        <Brain size={12} /> Structuring Answer...
                      </motion.div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right: Analysis Panel */}
            <div className="w-full md:w-80 bg-slate-900/50 p-6 flex flex-col gap-6 backdrop-blur-sm">

              {/* Scores */}
              <div className="space-y-5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  Live Metrics
                </h3>

                <div className="space-y-4">
                  {/* Confidence Metric */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm text-slate-300">
                      <span>Confidence</span>
                      <span className="text-green-400 font-mono">{Math.round(metrics.confidence)}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-green-500 rounded-full"
                        animate={{ width: `${metrics.confidence}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                      />
                    </div>
                  </div>

                  {/* Technical Depth Metric */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm text-slate-300">
                      <span>Technical Depth</span>
                      <span className="text-indigo-400 font-mono">{Math.round(metrics.technical)}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-indigo-500 rounded-full"
                        animate={{ width: `${metrics.technical}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                      />
                    </div>
                  </div>

                  {/* Pacing Metric */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm text-slate-300">
                      <span>Pacing</span>
                      <span className={`font-mono transition-colors duration-300 ${getPacingColor(metrics.pacing)}`}>
                        {getPacingLabel(metrics.pacing)}
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full transition-colors duration-300 ${getPacingBarColor(metrics.pacing)}`}
                        animate={{ width: `${metrics.pacing}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Transcript Snippet */}
              <div className="flex-1 overflow-hidden flex flex-col pt-2 border-t border-slate-800/50">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
                  Transcript
                </h3>
                <div className="flex-1 bg-slate-950/30 rounded-lg p-3 text-xs text-slate-400 font-mono leading-relaxed overflow-y-auto border border-slate-800/50 scrollbar-thin scrollbar-thumb-slate-800">
                  <p className="mb-3 opacity-90">
                    <span className="text-indigo-400 font-bold">Candidate:</span> So, regarding the scalability issue, I would implement a <span className="text-indigo-100 bg-indigo-500/20 px-1 py-0.5 rounded border border-indigo-500/30">load balancer</span> to distribute traffic...
                  </p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <span className="text-teal-400 font-bold">AI Note:</span> Good use of technical terminology. Consider elaborating on the specific algorithm.
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trusted By Logos */}


      </div>
    </div>
  );
};

export default Hero;