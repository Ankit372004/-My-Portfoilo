import React, { useState } from 'react';
import { 
  Code2, 
  Server, 
  Cloud, 
  Layers, 
  Search, 
  Star, 
  CheckCircle2, 
  Sparkles,
  Cpu,
  Database,
  Terminal,
  Zap,
  Box,
  Palette,
  FileCode2,
  Boxes,
  Eye,
  Wrench,
  Network,
  Activity,
  GitBranch,
  BarChart3
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

// Map icon names to Lucide icons
const iconMap = {
  Code2: <Code2 className="w-4 h-4 text-sky-500" />,
  FileCode2: <FileCode2 className="w-4 h-4 text-blue-500" />,
  Palette: <Palette className="w-4 h-4 text-pink-500" />,
  Boxes: <Boxes className="w-4 h-4 text-purple-500" />,
  Eye: <Eye className="w-4 h-4 text-emerald-500" />,
  Wrench: <Wrench className="w-4 h-4 text-amber-500" />,
  Server: <Server className="w-4 h-4 text-emerald-500" />,
  Cpu: <Cpu className="w-4 h-4 text-violet-500" />,
  Database: <Database className="w-4 h-4 text-indigo-500" />,
  Zap: <Zap className="w-4 h-4 text-amber-500" />,
  Network: <Network className="w-4 h-4 text-teal-500" />,
  Activity: <Activity className="w-4 h-4 text-rose-500" />,
  Box: <Box className="w-4 h-4 text-blue-500" />,
  Cloud: <Cloud className="w-4 h-4 text-sky-500" />,
  GitBranch: <GitBranch className="w-4 h-4 text-orange-500" />,
  Terminal: <Terminal className="w-4 h-4 text-slate-400" />,
  CheckCircle2: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
  BarChart3: <BarChart3 className="w-4 h-4 text-purple-500" />
};

export default function Skills({ onSelectSkillFilter }) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Collect all skills
  const allSkills = skillCategories.flatMap(cat => 
    cat.skills.map(s => ({ ...s, category: cat.category }))
  );

  // Filter skills
  const filteredSkills = allSkills.filter(skill => {
    const matchesCategory = 
      activeTab === 'all' || 
      (activeTab === 'frontend' && skill.category.includes('Frontend')) ||
      (activeTab === 'backend' && skill.category.includes('Backend')) ||
      (activeTab === 'cloud' && (skill.category.includes('DevOps') || skill.category.includes('Cloud')));

    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSkillClick = (skillName) => {
    // When a skill card is clicked, trigger project filtering or notification
    onSelectSkillFilter?.(skillName);
  };

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 text-xs font-semibold mb-3 border border-sky-100 dark:border-sky-900/40">
              Technical Proficiencies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Tools & frameworks I wield in production.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
              Click any skill card to search related projects in the showcase below.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter skills (e.g. React, AWS)..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
          {[
            { id: 'all', label: 'All Technologies' },
            { id: 'frontend', label: 'Frontend & UI' },
            { id: 'backend', label: 'Backend & APIs' },
            { id: 'cloud', label: 'DevOps & Cloud' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <span className="text-xs text-slate-400 ml-auto hidden sm:inline">
            Showing {filteredSkills.length} skills
          </span>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              onClick={() => handleSkillClick(skill.name)}
              className="group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 dark:hover:border-sky-500/50 shadow-sm hover:shadow-md transition-all cursor-pointer relative"
              title={`Click to filter projects using ${skill.name}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                    {iconMap[skill.icon] || <Code2 className="w-4 h-4 text-sky-500" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      {skill.exp} experience
                    </span>
                  </div>
                </div>

                {skill.highlight && (
                  <span className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Star className="w-3 h-3 fill-amber-500" />
                    Core
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-slate-500 dark:text-slate-400">Proficiency</span>
                  <span className="font-mono font-medium text-slate-700 dark:text-slate-300">{skill.level}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-700 ease-out group-hover:brightness-110"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-sky-500 pt-1 border-t border-slate-100 dark:border-slate-800/60">
                <span>Category: {skill.category.split(' ')[0]}</span>
                <span className="underline">View projects &rarr;</span>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No skills found matching "{searchQuery}".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
              className="mt-3 px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-500 text-white"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

