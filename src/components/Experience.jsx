import React, { useState } from 'react';
import { Briefcase, GraduationCap, Award, Trophy, Calendar, MapPin, ChevronDown, ChevronUp, CheckCircle2, Medal, ShieldCheck } from 'lucide-react';
import { experiences, education, certifications, sportsAchievements } from '../data/portfolioData';

export default function Experience() {
  const [activeTab, setActiveTab] = useState('work');
  const [expandedItems, setExpandedItems] = useState({ 0: true });

  const toggleExpand = (idx) => {
    setExpandedItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleExpandAll = () => {
    const all = {};
    let count = experiences.length;
    if (activeTab === 'edu') count = education.length;
    if (activeTab === 'certs') count = certifications.length;
    if (activeTab === 'sports') count = sportsAchievements.length;
    for (let i = 0; i < count; i++) {
      all[i] = true;
    }
    setExpandedItems(all);
  };

  const handleCollapseAll = () => {
    setExpandedItems({});
  };

  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 text-xs font-semibold mb-3 border border-sky-100 dark:border-sky-900/40">
              Trajectory & Milestones
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Experience, Education & Sports.
            </h2>
          </div>

          {/* Controls: Tabs + Expand/Collapse */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => { setActiveTab('work'); setExpandedItems({ 0: true }); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'work'
                    ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Internships</span>
              </button>

              <button
                onClick={() => { setActiveTab('edu'); setExpandedItems({ 0: true }); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'edu'
                    ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Education</span>
              </button>

              <button
                onClick={() => { setActiveTab('certs'); setExpandedItems({ 0: true, 1: true }); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'certs'
                    ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Certifications</span>
              </button>

              <button
                onClick={() => { setActiveTab('sports'); setExpandedItems({ 0: true, 1: true }); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'sports'
                    ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>Sports ⚾</span>
              </button>
            </div>

            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={handleExpandAll}
                className="px-2 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Expand all"
              >
                Expand
              </button>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <button
                onClick={handleCollapseAll}
                className="px-2 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Collapse all"
              >
                Collapse
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Items */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
          
          {/* Work / Internship Tab */}
          {activeTab === 'work' && experiences.map((exp, idx) => {
            const isExpanded = !!expandedItems[idx];
            return (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-4 border-sky-500 group-hover:scale-125 transition-transform" />

                <div 
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={() => toggleExpand(idx)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                          {exp.role}
                        </h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300">
                          {exp.badge}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <button 
                        className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                    {exp.description}
                  </p>

                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 animate-fade-in">
                      <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
                        Key Deliverables & Highlights:
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((ach, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {exp.tech.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Education Tab */}
          {activeTab === 'edu' && education.map((edu, idx) => {
            const isExpanded = !!expandedItems[idx];
            return (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-4 border-indigo-500 group-hover:scale-125 transition-transform" />

                <div 
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={() => toggleExpand(idx)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {edu.degree}
                      </h3>
                      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">
                        {edu.institution}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {edu.period ? <span>{edu.period}</span> : null}
                      <button 
                        className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                    {edu.grade}
                  </p>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed animate-fade-in">
                      {edu.details}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Certifications Tab */}
          {activeTab === 'certs' && certifications.map((cert, idx) => {
            const isExpanded = !!expandedItems[idx];
            return (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-4 border-emerald-500 group-hover:scale-125 transition-transform" />

                <div 
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={() => toggleExpand(idx)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {cert.title}
                        </h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                          {cert.badge}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 mt-0.5">
                        {cert.issuer}
                      </p>
                    </div>

                    <button 
                      className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 self-end sm:self-auto"
                      aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed animate-fade-in">
                      {cert.description}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Sports Achievements Tab */}
          {activeTab === 'sports' && sportsAchievements.map((sp, idx) => {
            const isExpanded = !!expandedItems[idx];
            return (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-950 border-4 border-amber-500 group-hover:scale-125 transition-transform" />

                <div 
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-amber-200/50 dark:border-amber-900/30 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={() => toggleExpand(idx)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {sp.title}
                        </h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                          National Representation
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-1">
                        {sp.representation}
                      </p>
                    </div>

                    <button 
                      className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 self-end sm:self-auto"
                      aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed animate-fade-in">
                      {sp.details}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
