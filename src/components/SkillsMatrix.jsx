import React, { useState } from 'react';
import { skillsData } from '../data/portfolioData';
import Card3D from './Card3D';
import {
  Code2,
  FileCode,
  Cpu,
  Palette,
  Layers,
  Layout,
  Workflow,
  Server,
  Zap,
  Network,
  Terminal,
  Code,
  Coffee,
  Boxes,
  Database,
  GitBranch,
  Send,
  Cloud,
  Binary,
  Gauge,
  HardDrive,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { FigmaIcon } from './Icons';

const iconMap = {
  Code2,
  FileCode,
  Cpu,
  Palette,
  Layers,
  Layout,
  Workflow,
  Server,
  Zap,
  Network,
  Terminal,
  Code,
  Coffee,
  Boxes,
  Database,
  GitBranch,
  Send,
  Cloud,
  Binary,
  Gauge,
  HardDrive,
  Figma: FigmaIcon,
};

export default function SkillsMatrix() {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { key: 'all', label: 'All Proficiencies' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend & Systems' },
    { key: 'databaseCloud', label: 'Databases & Cloud' },
    { key: 'fundamentals', label: 'Core CS & Rigor' },
  ];

  const sectionsToDisplay =
    activeTab === 'all'
      ? Object.entries(skillsData)
      : Object.entries(skillsData).filter(([key]) => key === activeTab);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-semibold tracking-wide uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Technical Proficiencies</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Architected for Full-Stack Scalability
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
          A structured inventory of modern frontend frameworks, backend microservices, database storage systems, and systems-level algorithmic capabilities.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === cat.key
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-105'
                  : 'bg-slate-100 dark:bg-slate-900/70 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grids */}
      <div className="space-y-12">
        {sectionsToDisplay.map(([categoryKey, section]) => (
          <div key={categoryKey} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-slate-200 dark:border-slate-800/80 pb-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                {section.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                {section.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {section.skills.map((skill, idx) => {
                const IconComponent = iconMap[skill.icon] || Code2;
                return (
                  <Card3D
                    key={idx}
                    className="p-4 flex flex-col justify-between h-32"
                    glowColor="rgba(99, 102, 241, 0.12)"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                        {skill.level}
                      </span>
                    </div>

                    <div className="mt-auto">
                      <div className="font-semibold text-sm text-slate-900 dark:text-white tracking-tight">
                        {skill.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>Verified Proficiency</span>
                      </div>
                    </div>
                  </Card3D>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
