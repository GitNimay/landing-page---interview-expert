import React from 'react';
import { useTheme } from './ThemeContext';

const Footer: React.FC = () => {
  const { isDark } = useTheme();

  const contributors = [
    { name: 'Nimesh Kulkarni', url: 'https://nimesh-portfolio-iota.vercel.app/' },
    { name: 'Aaradhya Pathak', url: 'https://portfolioaaradhya.netlify.app' },
  ];

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

        {/* Divider */}
        <div className={`my-8 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-slate-700 to-transparent' : 'bg-gradient-to-r from-transparent via-slate-300 to-transparent'}`} />

        {/* Contributors Section */}
        <div className="flex flex-col items-center gap-4">
          <span className={`text-xs uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Built with ♥ by
          </span>
          <div className="flex flex-wrap justify-center gap-6">
            {contributors.map((contributor, index) => (
              <a
                key={index}
                href={contributor.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  group relative px-4 py-2 rounded-full
                  transition-all duration-300 ease-out
                  hover:scale-105 active:scale-95
                  ${isDark
                    ? 'bg-slate-800/50 hover:bg-slate-700/70 border border-slate-700/50 hover:border-indigo-500/50'
                    : 'bg-slate-100/80 hover:bg-slate-200/90 border border-slate-200 hover:border-indigo-400/50'
                  }
                `}
              >
                {/* Glow effect on hover */}
                <div className={`
                  absolute inset-0 rounded-full opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                  ${isDark
                    ? 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10'
                    : 'bg-gradient-to-r from-indigo-400/10 via-purple-400/10 to-pink-400/10'
                  }
                `} />

                <span className={`
                  relative font-medium text-sm
                  transition-all duration-300
                  bg-clip-text
                  ${isDark
                    ? 'text-slate-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:via-purple-400 group-hover:to-pink-400'
                    : 'text-slate-600 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-pink-600'
                  }
                `}>
                  {contributor.name}
                </span>

                {/* Arrow indicator */}
                <span className={`
                  inline-block ml-2 opacity-0 -translate-x-2
                  group-hover:opacity-100 group-hover:translate-x-0
                  transition-all duration-300
                  ${isDark ? 'text-indigo-400' : 'text-indigo-600'}
                `}>
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
