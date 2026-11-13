import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Compass, ShieldCheck, HeartHandshake, Zap, Calendar, ExternalLink, ArrowRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function About({ onOpenResume, onShowToast }) {
  const [currentTime, setCurrentTime] = useState('');
  const [isWorkingHour, setIsWorkingHour] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Asia/Kolkata
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      const timeStr = new Intl.DateTimeFormat('en-US', options).format(now);
      setCurrentTime(timeStr);

      // Check if between 9am and 7pm IST
      const istHours = (now.getUTCHours() + 5.5) % 24;
      setIsWorkingHour(istHours >= 9 && istHours < 19);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyLocation = () => {
    navigator.clipboard.writeText(`${personalInfo.location} (${personalInfo.timezone})`).then(() => {
      onShowToast?.({ type: 'success', message: 'Location & Timezone copied!' });
    });
  };

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="about" className="py-20 md:py-28 bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 text-xs font-semibold mb-3 border border-sky-100 dark:border-sky-900/40">
            About Ankit Kumar
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Passionate about problem solving, algorithms, and full-stack software development.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6 text-slate-600 dark:text-slate-300 text-base leading-relaxed">
            <p>
              I am a pre-final year <strong className="text-slate-900 dark:text-white">Computer Science & Engineering student at Chandigarh University</strong> (graduating in 2027) with a CGPA of 7.08/10. I possess a strong foundation in core software engineering principles: <span className="text-sky-600 dark:text-sky-400 font-medium">Data Structures & Algorithms, Object-Oriented Programming (OOPs), Operating Systems, and Computer Networks</span>.
            </p>

            <p>
              During my software engineering internship at <strong className="text-slate-900 dark:text-white">Bhuma Infotech Pvt. Ltd.</strong>, I built end-to-end features for an enterprise Material Management System, linking responsive React.js frontend interfaces with Node.js RESTful APIs and secure database transactions.
            </p>

            <p>
              Beyond the terminal, I am a <span className="text-amber-600 dark:text-amber-400 font-semibold">Two-Time National Level Athlete</span> (Baseball & Softball representing Bihar) and a district cricketer. Playing competitive sports has instilled in me supreme discipline, high-pressure resilience, leadership, and proactive team collaboration.
            </p>

            {/* Core Values / Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <Zap className="w-5 h-5 text-amber-500 mb-2" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Strong DSA & OOPs</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Solid algorithmic reasoning in C, C++, and Java with clean modular design.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-500 mb-2" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Full Stack (MERN)</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Building responsive React UIs, Node REST APIs, and MySQL/Mongo stores.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                <HeartHandshake className="w-5 h-5 text-sky-500 mb-2" />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Athlete Mindset</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  National sports background driving discipline, teamwork, and persistence.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleScrollToContact}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <span>Discuss Collaboration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <span>Read Full Background</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Context & Fact Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Live Clock & Working Hours Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 text-xs font-semibold uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-sky-500" />
                  Local Time & Availability
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  isWorkingHour 
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {isWorkingHour ? '🟢 Business Hours' : '🌙 Off Work / Flexible'}
                </span>
              </div>

              <div className="text-3xl font-mono font-bold text-slate-900 dark:text-white tracking-tight">
                {currentTime || '06:45:00 AM'}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Indian Standard Time (IST, UTC+5:30)
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-sky-500" />
                  <span>{personalInfo.location}</span>
                </div>
                <button
                  onClick={handleCopyLocation}
                  className="text-sky-600 dark:text-sky-400 hover:underline text-[11px] font-medium"
                >
                  Copy Timezone
                </button>
              </div>
            </div>

            {/* Quick Fact / Focus Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-4 h-4 text-sky-500" />
                Current Academic & Engineering Focus
              </h3>
              
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-start gap-2">
                  <span className="text-sky-500 font-bold">•</span>
                  <span><strong>Full Stack MERN:</strong> Developing scalable web systems with React, Node.js, Express, MySQL, and MongoDB.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sky-500 font-bold">•</span>
                  <span><strong>Competitive DSA:</strong> Algorithmic problem-solving in C++ and Java on LeetCode and Codolio.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-sky-500 font-bold">•</span>
                  <span><strong>AI, IoT & Optical Research:</strong> LSTM smart home energy forecasting & OCDMA optical communications.</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

