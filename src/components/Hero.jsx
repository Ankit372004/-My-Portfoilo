import React, { useState } from 'react';
import { ArrowRight, Copy, Check, Download, Github, Linkedin, Twitter, Mail, Sparkles, Terminal, Code2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ onOpenResume, onShowToast, onToggleTerminal }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email).then(() => {
      setCopied(true);
      onShowToast?.({ type: 'success', message: 'Email copied to clipboard!' });
      setTimeout(() => setCopied(false), 2500);
    });
  };

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
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-sky-500/10 dark:bg-sky-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[250px] bg-indigo-500/10 dark:bg-indigo-500/15 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {personalInfo.availability}
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Aspiring Software Engineer &{' '}
                <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Full Stack Developer.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Hi, I'm <span className="font-semibold text-slate-900 dark:text-white">{personalInfo.name}</span>. A pre-final year Computer Science Engineering student at <strong className="text-slate-900 dark:text-white">Chandigarh University (Class of 2027)</strong>. Passionate about C/C++, Java, MERN stack, ML, and Cloud technologies. National-level athlete with a strong drive for problem solving and continuous growth.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => handleScrollTo('projects')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 shadow-md shadow-slate-900/10 transition-all hover:scale-102 active:scale-98"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleScrollTo('contact')}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all hover:scale-102 active:scale-98"
              >
                <Mail className="w-4 h-4 text-sky-500" />
                <span>Get in Touch</span>
              </button>

              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-medium rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
              </button>

              {/* Resume Button */}
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs font-medium rounded-xl bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/50 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-900/60 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>View CV / Resume</span>
              </button>
            </div>

            {/* Social Links Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-4 text-slate-500 dark:text-slate-400">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500">Profiles:</span>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={personalInfo.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors"
                aria-label="LeetCode Profile"
              >
                LeetCode
              </a>
              <a
                href={personalInfo.socials.codolio}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 transition-colors"
                aria-label="Codolio Profile"
              >
                Codolio
              </a>
              <button
                onClick={onToggleTerminal}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                title="Launch CLI Terminal"
              >
                <Terminal className="w-3.5 h-3.5 text-sky-500" />
                <span>CLI</span>
              </button>
            </div>
          </div>

          {/* Right Column: Profile Showcase & Architecture Card */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Portrait Card with Real Photo */}
            <div className="relative mx-auto max-w-md rounded-3xl bg-white/80 dark:bg-slate-900/90 p-3 sm:p-4 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md">
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-slate-900 group">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>

                {/* Floating Badges */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 text-emerald-400 text-xs font-semibold backdrop-blur-md border border-emerald-500/30 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Class of 2027
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-400 border border-amber-500/30 font-medium">
                    National Athlete ⚾
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">{personalInfo.name}</h3>
                    <p className="text-xs text-slate-300 font-medium mt-0.5">B.E CSE • Chandigarh University</p>
                  </div>
                  <button
                    onClick={onOpenResume}
                    className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-sky-500 hover:bg-sky-600 text-white backdrop-blur-md shadow-sm transition-all hover:scale-105"
                  >
                    View CV &rarr;
                  </button>
                </div>
              </div>

              {/* Collapsible / Clean Code Drawer underneath */}
              <div className="mt-3 rounded-2xl bg-slate-950 text-slate-100 p-4 border border-slate-800/80 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1.5 text-sky-400">
                    <Code2 className="w-3.5 h-3.5" />
                    fresher.config.ts
                  </span>
                  <span className="text-emerald-400 text-[10px]">active</span>
                </div>

                <div className="pt-2.5 space-y-1 text-[11px] leading-relaxed">
                  <div>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-sky-300">fresher</span> = {'{'}
                  </div>
                  <div className="pl-3 text-slate-400">
                    name: <span className="text-emerald-300">"{personalInfo.name}"</span>,
                  </div>
                  <div className="pl-3 text-slate-400">
                    education: <span className="text-emerald-300">"B.E CSE @ Chandigarh University"</span>,
                  </div>
                  <div className="pl-3 text-slate-400">
                    cgpa: <span className="text-amber-300">7.08</span>,
                  </div>
                  <div className="pl-3 text-slate-400">
                    languages: [<span className="text-amber-300">"C"</span>, <span className="text-amber-300">"C++"</span>, <span className="text-amber-300">"Java"</span>, <span className="text-amber-300">"Python"</span>],
                  </div>
                  <div className="pl-3 text-slate-400">
                    web: <span className="text-sky-300">"MERN Stack (React, Node, Mongo, MySQL)"</span>,
                  </div>
                  <div className="pl-3 text-slate-400">
                    status: <span className="text-emerald-400">"Open to SWE Internships & Roles"</span>
                  </div>
                  <div>{'};'}</div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Production Internship Done
                  </span>
                  <button
                    onClick={onToggleTerminal}
                    className="text-sky-400 hover:text-sky-300 hover:underline flex items-center gap-1"
                  >
                    launch CLI terminal &gt;
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {personalInfo.stats.map((stat, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 backdrop-blur-md shadow-sm hover:border-sky-500/40 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

