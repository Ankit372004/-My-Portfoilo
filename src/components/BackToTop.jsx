import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setVisible(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 animate-fade-in">
      <button
        onClick={scrollToTop}
        className="relative group p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-slate-700 dark:text-slate-200 hover:text-sky-500 transition-all hover:scale-105 active:scale-95"
        title="Scroll to top"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
        
        {/* Progress ring svg */}
        <svg className="absolute -inset-1 w-[46px] h-[46px] pointer-events-none -rotate-90">
          <circle
            cx="23"
            cy="23"
            r="19"
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            className="text-slate-200 dark:text-slate-800"
          />
          <circle
            cx="23"
            cy="23"
            r="19"
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            strokeDasharray={119.38}
            strokeDashoffset={119.38 - (119.38 * scrollProgress) / 100}
            className="text-sky-500 transition-all duration-150"
          />
        </svg>
      </button>
    </div>
  );
}

