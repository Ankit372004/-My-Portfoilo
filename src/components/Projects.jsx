import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, ArrowUpRight, Search, X, Sparkles, Filter, Layers } from 'lucide-react';
import { projects, categories } from '../data/portfolioData';

export default function Projects({ onSelectProject, externalFilter, onClearExternalFilter }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // If parent passes externalFilter (e.g. clicked from Skills section)
  useEffect(() => {
    if (externalFilter) {
      setSearchQuery(externalFilter);
      setSelectedCategory('all');
    }
  }, [externalFilter]);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      project.title.toLowerCase().includes(q) ||
      project.subtitle.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.tags.some(tag => tag.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const handleTagClick = (e, tag) => {
    e.stopPropagation();
    setSearchQuery(tag);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    onClearExternalFilter?.();
  };

  return (
    <section id="projects" className="py-20 md:py-28 bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 text-xs font-semibold mb-3 border border-sky-100 dark:border-sky-900/40">
              Selected Work
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured engineering projects.
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
              Production-grade applications built for scale, resilience, and delightful ergonomics.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, tech (e.g. Next.js)..."
              className="w-full pl-10 pr-9 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); onClearExternalFilter?.(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => {
            const count = cat.id === 'all' 
              ? projects.length 
              : projects.filter(p => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-xl transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected 
                    ? 'bg-white/20 dark:bg-slate-900/20 text-white dark:text-slate-900' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}

          {searchQuery && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 text-xs font-mono ml-auto">
              <span>Filter: "{searchQuery}"</span>
              <button onClick={() => { setSearchQuery(''); onClearExternalFilter?.(); }} className="hover:text-rose-500">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Card Image */}
              <div 
                className="relative h-48 w-full overflow-hidden bg-slate-950 cursor-pointer"
                onClick={() => onSelectProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                {/* Badges on image */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-white/10">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/90 text-white backdrop-blur-md">
                      Featured
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-[11px] font-medium text-emerald-300 bg-slate-900/80 px-2 py-0.5 rounded-md backdrop-blur-md border border-emerald-500/20">
                    {project.metrics}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 
                    onClick={() => onSelectProject(project)}
                    className="text-lg font-bold text-slate-900 dark:text-white tracking-tight cursor-pointer hover:text-sky-500 transition-colors flex items-center justify-between"
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {project.subtitle}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag, tIdx) => (
                    <button
                      key={tIdx}
                      onClick={(e) => handleTagClick(e, tag)}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 hover:bg-sky-100 dark:bg-slate-800 dark:hover:bg-sky-950/60 text-slate-700 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400 border border-slate-200 dark:border-slate-700/60 transition-colors"
                      title={`Filter by tag ${tag}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {/* Working Action Buttons */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors text-center"
                  >
                    Case Study
                  </button>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/40 dark:hover:bg-sky-900/50 text-sky-600 dark:text-sky-400 transition-colors"
                    title="Live App Demo"
                    aria-label={`Live Demo for ${project.title}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                    title="GitHub Repository"
                    aria-label={`Source Code for ${project.title}`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
            <Layers className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              No matching projects found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              We couldn't find any projects matching your current search criteria. Try a different keyword or reset filters.
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-4 px-4 py-2 text-xs font-semibold rounded-xl bg-sky-500 hover:bg-sky-600 text-white transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

