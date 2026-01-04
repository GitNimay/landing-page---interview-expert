import React from 'react';
import { ThemeProvider } from './components/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import WhoItsFor from './components/sections/WhoItsFor';
import Features from './components/sections/Features';
import HowItWorks from './components/sections/HowItWorks';
import LiveDemo from './components/sections/LiveDemo';
import Pricing from './components/sections/Pricing';
import FAQ from './components/sections/FAQ';
import FinalCTA from './components/sections/FinalCTA';
import Footer from './components/Footer';
import NeuralBackground from './components/ui/NeuralBackground';
import CustomCursor from './components/ui/CustomCursor';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200 dark:selection:text-indigo-200">
        <NeuralBackground />
        <CustomCursor />
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <WhoItsFor />
            <Features />
            <HowItWorks />
            <LiveDemo />
            <Pricing />
            <FAQ />
            <FinalCTA />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
