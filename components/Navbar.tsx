import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import MagnetButton from './ui/MagnetButton';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

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
              ? 'w-full max-w-4xl bg-slate-950/70 backdrop-blur-md border-white/10 shadow-2xl shadow-indigo-500/10'
              : 'w-full max-w-7xl bg-transparent border-transparent'
            }
          `}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 font-display font-bold text-xl text-white tracking-tight">
            <img src="/logo.png" alt="Interview Expert Logo" className="w-8 h-8 rounded-lg object-contain" />
            <span></span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-slate-300 hover:text-white">Log in</a>
            <MagnetButton variant="primary" className="!px-4 !py-2 !text-sm">
              Get Started
            </MagnetButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-slate-950/95 pt-24 px-6 md:hidden"
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-display font-semibold text-slate-200"
              >
                {link.name}
              </a>
            ))}
            <div className="h-px bg-slate-800 my-4" />
            <a href="#" className="text-xl font-medium text-slate-400">Log in</a>
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