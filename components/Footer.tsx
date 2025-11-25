import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950/80 backdrop-blur border-t border-slate-900 py-12 text-sm relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">IE</div>
            <span className="font-display font-bold text-slate-200">Interview Expert</span>
          </div>
          
          <div className="flex gap-8 text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
          
          <div className="text-slate-600">
            © {new Date().getFullYear()} Interview Expert.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;