import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Mail, Heart, Terminal, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer({ onOpenResume, onToggleTerminal }) {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a0d14] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Branding & Status */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-sky-500/30">
              <img 
                src={personalInfo.avatar} 
                alt={personalInfo.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900 dark:text-white">
                {personalInfo.name} • {personalInfo.title}
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>System status: 100% operational</span>
              </div>
            </div>
          </div>

          {/* Center: Navigation shortcuts */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
            <button onClick={() => handleScrollTo('hero')} className="hover:text-sky-500 transition-colors">
              Home
            </button>
            <button onClick={() => handleScrollTo('about')} className="hover:text-sky-500 transition-colors">
              About
            </button>
            <button onClick={() => handleScrollTo('projects')} className="hover:text-sky-500 transition-colors">
              Projects
            </button>
            <button onClick={() => handleScrollTo('skills')} className="hover:text-sky-500 transition-colors">
              Skills
            </button>
            <button onClick={() => handleScrollTo('contact')} className="hover:text-sky-500 transition-colors">
              Contact
            </button>
            <button onClick={onOpenResume} className="hover:text-sky-500 transition-colors">
              Resume
            </button>
            <button onClick={onToggleTerminal} className="hover:text-sky-500 transition-colors flex items-center gap-1 font-mono">
              <Terminal className="w-3 h-3 text-sky-500" />
              CLI Shell
            </button>
          </div>

          {/* Right: Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 transition-colors"
              title="Back to Top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 text-center gap-2">
          <p>© {currentYear} {personalInfo.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with React 18, Vite & Tailwind CSS. Designed with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}

