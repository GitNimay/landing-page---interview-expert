import React from 'react';
import { useTheme } from './ThemeContext';

const Footer: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <footer className={`backdrop-blur border-t py-12 text-sm relative z-10 ${isDark ? 'bg-slate-950/80 border-slate-900' : 'bg-white border-slate-200'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">IE</div>
            <span className={`font-display font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Interview Expert</span>
          </div>

          <div className={`flex gap-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <a href="#features" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Features</a>
            <a href="#pricing" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Pricing</a>
            <a href="#" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Docs</a>
            <a href="#" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Privacy</a>
          </div>

          <div className={isDark ? 'text-slate-600' : 'text-slate-400'}>
            © {new Date().getFullYear()} Interview Expert.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
