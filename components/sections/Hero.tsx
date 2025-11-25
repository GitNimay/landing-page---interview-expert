import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
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

  // Tilt Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

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
            {/* Animated text with character reveal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              {"Ace every interview with".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.03,
                    ease: "easeOut"
                  }}
                  className="inline-block"
                  style={{ display: char === " " ? "inline" : "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>
            <br />
            {/* Gradient text with multiple animations */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: [0, -5, 0],
              }}
              transition={{
                opacity: { duration: 0.5, delay: 0.6 },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 1
                }
              }}
              className="relative inline-block"
            >
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-400 inline-block relative"
                style={{
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  backgroundSize: '200% 200%',
                  animation: 'gradient 4s ease infinite'
                }}
              >
                real-time AI feedback
                {/* Shimmer effect overlay */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                  style={{
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                  }}
                  animate={{
                    opacity: [0, 0.3, 0],
                    backgroundPosition: ['-200% 0', '200% 0'],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: "easeInOut"
                  }}
                >
                  real-time AI feedback
                </motion.span>
              </span>
              {/* Glow effect */}
              <motion.span
                className="absolute inset-0 blur-2xl opacity-40"
                style={{
                  background: 'linear-gradient(to right, rgb(129, 140, 248), rgb(192, 132, 252), rgb(45, 212, 191))',
                  filter: 'blur(40px)',
                  zIndex: -1,
                }}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            </motion.span>
          </h1>
        </div>

        {/* CTAs */}
        <FadeIn delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <MagnetButton variant="primary">
              Start Free Trial
            </MagnetButton>
          </div>
        </FadeIn>

        {/* Mock UI */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full max-w-5xl rounded-xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-indigo-500/10 overflow-hidden relative perspective-1000"
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
          <div className="flex flex-col md:flex-row h-auto md:h-[500px]">
            {/* Left: Video Feed */}
            <div className="w-full h-[350px] md:h-auto md:flex-1 bg-slate-950 relative p-2 md:p-4 flex items-center justify-center md:border-r border-slate-800 overflow-hidden">
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
                      className="group relative z-20 flex flex-col items-center gap-2 md:gap-4 transition-transform hover:scale-105 active:scale-95"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.4)] group-hover:shadow-[0_0_60px_rgba(99,102,241,0.6)] transition-shadow duration-300 border border-white/20">
                        <ScanFace size={28} className="md:size-8 text-white" />
                      </div>
                      <div className="text-center px-2">
                        <span className="block text-base md:text-lg font-bold text-white">Enable Camera</span>
                        <span className="text-xs md:text-sm text-slate-400">to try live analysis</span>
                      </div>
                    </button>
                    <div className="absolute bottom-4 md:bottom-8 text-[10px] md:text-xs text-slate-500 flex items-center gap-1.5 px-2">
                      <Lock size={10} />
                      <span className="hidden sm:inline">Video is processed locally in browser. No data saved.</span>
                      <span className="sm:hidden">Processed locally. No data saved.</span>
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
                <div className="flex-1 bg-slate-950/30 rounded-lg p-3 text-xs text-slate-400 font-mono leading-relaxed overflow-y-auto border border-slate-800/50 scrollbar-thin scrollbar-thumb-slate-800 relative">
                  {!isLive && (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-600 italic">
                      Start camera to analyze speech...
                    </div>
                  )}
                  {isLive && (
                    <>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="mb-3 opacity-90"
                      >
                        <span className="text-indigo-400 font-bold">Candidate:</span> So, regarding the scalability issue, I would implement a <span className="text-indigo-100 bg-indigo-500/20 px-1 py-0.5 rounded border border-indigo-500/30">load balancer</span> to distribute traffic...
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3.5 }}
                      >
                        <span className="text-teal-400 font-bold">AI Note:</span> Good use of technical terminology. Consider elaborating on the specific algorithm.
                      </motion.p>
                    </>
                  )}
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