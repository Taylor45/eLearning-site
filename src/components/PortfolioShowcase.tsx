import React, { useState } from 'react';
import { PortfolioProject } from '../types';
import { PORTFOLIO_PROJECTS } from '../data';
import { Search, SlidersHorizontal, ExternalLink, Award, Sparkles, BookOpen, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface PortfolioShowcaseProps {
  setActiveTab: (tab: string) => void;
}

export default function PortfolioShowcase({ setActiveTab }: PortfolioShowcaseProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Storyline Courses', 'eBooks & OER', 'ID Tools & AI'];

  // Filtering logic
  const filteredProjects = PORTFOLIO_PROJECTS.filter((project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          Interactive Portfolio
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Bruce Mabasa's Project Highlights
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Explore a selection of live, fully interactive eLearning courses, digital storyboards, custom instructional utilities, and artificial intelligence models deployed in high-adoption learning ecosystems.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Box */}
          <div className="relative md:col-span-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, tags, or technology..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-hidden focus:border-brand text-slate-100 placeholder-slate-500"
            />
          </div>

          {/* Category Filter */}
          <div className="md:col-span-6">
            <div className="flex flex-wrap gap-2 md:justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat === 'All' ? 'All Formats' : cat}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:border-white/20 transition-all flex flex-col justify-between group shadow-xl"
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur-md border border-white/10 text-slate-200 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-grow">
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-lg text-white group-hover:text-blue-400 transition-colors tracking-tight leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Achievements List */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">Key Features</span>
                  <ul className="space-y-1 text-[11px] text-slate-300 font-medium">
                    {project.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-1.5">
                        <span className="text-blue-500 font-bold mt-0.5">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-0.5 bg-white/5 border border-white/5 text-[9px] font-mono text-slate-400 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Actions */}
              <div className="px-6 py-4 bg-white/2 border-t border-white/5 flex gap-2 items-center justify-end">
                {project.processUrl && (
                  <a
                    href={project.processUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition-all"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Storyboard
                  </a>
                )}
                {project.courseUrl && (
                  <a
                    href={project.courseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition-all shadow-md shadow-blue-600/15"
                  >
                    <span>Launch</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
          <Award className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white">No projects found</h3>
          <p className="text-sm text-slate-400 mt-1">Try modifying your search or filters.</p>
        </div>
      )}

      {/* Featured Badge Promo Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border border-blue-500/20 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <h4 className="font-display font-extrabold text-lg text-white">Need a Bespoke Learning Solution?</h4>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            I specialize in engineering system-wide LMS configurations, deploying custom xAPI tracking architectures, and building custom generative AI microlearning assistants. Let's design something unique.
          </p>
        </div>
        <button
          onClick={() => {
            setActiveTab('home');
            setTimeout(() => {
              document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-blue-600/25 transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0"
        >
          <span>Request Custom Solution</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
