import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import MagnetButton from './ui/MagnetButton';
import { useTheme } from './ThemeContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { theme, toggleTheme, isDark } = useTheme();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 inset-x-0 z-50 flex justify-center pt-4 md:pt-6 px-4 transition-all duration-300`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className={`
            relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 border
            ${isScrolled
              ? isDark
                ? 'w-full max-w-4xl bg-slate-950/70 backdrop-blur-md border-white/10 shadow-2xl shadow-indigo-500/10'
                : 'w-full max-w-4xl bg-white/80 backdrop-blur-md border-slate-200 shadow-xl shadow-slate-200/50'
              : 'w-full max-w-7xl bg-transparent border-transparent'
            }
          `}
        >
          {/* Logo */}
          <a href="#" className={`flex items-center gap-2 font-display font-bold text-xl tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <img src="/logo.png" alt="Interview Expert Logo" className="w-8 h-8 rounded-lg object-contain" />
            <span></span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 0 : 180, scale: [1, 0.8, 1] }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </button>
            <a href="https://interviewxpert-ai.netlify.app/" className={`text-sm font-medium ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Log in</a>
            <MagnetButton variant="primary" className="!px-4 !py-2 !text-sm">
              Get Started
            </MagnetButton>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className={`p-1 ${isDark ? 'text-white' : 'text-slate-900'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed inset-0 z-40 pt-24 px-6 md:hidden ${isDark ? 'bg-slate-950/95' : 'bg-white/95 backdrop-blur-md'}`}
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl font-display font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}
              >
                {link.name}
              </a>
            ))}
            <div className={`h-px my-4 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
            <a href="https://interviewxpert-ai.netlify.app/" className={`text-xl font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Log in</a>
            <MagnetButton variant="primary" className="w-full justify-center">
              Get Started
            </MagnetButton>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
