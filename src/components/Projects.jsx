import React from 'react';
import { projectsData } from '../data/portfolioData';
import Card3D from './Card3D';
import {
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Sparkles,
  ArrowUpRight,
  Cpu,
} from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-mono font-semibold tracking-wide uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Case Studies & Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Featured Engineering Projects
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
          Framed using the industry-standard Problem-Solution-Metrics paradigm, highlighting technical depth, architectural trade-offs, and measurable outcomes.
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-12">
        {projectsData.map((project) => (
          <Card3D
            key={project.id}
            className="p-6 sm:p-8 lg:p-10 border border-slate-200 dark:border-slate-800"
            glowColor={
              project.accentColor === 'emerald'
                ? 'rgba(16, 185, 129, 0.15)'
                : project.accentColor === 'blue'
                ? 'rgba(59, 130, 246, 0.18)'
                : 'rgba(168, 85, 247, 0.18)'
            }
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Context, Problem, and Solution */}
              <div className="lg:col-span-7 space-y-6">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-md text-xs font-mono font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {project.period}
                  </span>
                  {project.id === 'cpu-scheduler' && (
                    <a
                      href="#simulation"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline ml-auto"
                    >
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Live Simulation Demo ↓</span>
                    </a>
                  )}
                </div>

                {/* Title and Tagline */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base font-medium text-slate-600 dark:text-slate-300">
                    {project.tagline}
                  </p>
                </div>

                {/* Problem Statement Box */}
                <div className="p-4 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-left">
                  <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>The Engineering Problem</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                {/* Technical Solution */}
                <div className="p-4 rounded-xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 text-left">
                  <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1.5">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>Architectural Solution</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>

                {/* Tech Stack Tags */}
                <div className="pt-2">
                  <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
                    Technologies & Protocols
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs rounded-lg font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Key Metrics & Action Links */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 lg:border-l lg:border-slate-200 dark:lg:border-slate-800/80 lg:pl-8">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span>Measured Impact & Benchmarks</span>
                  </div>

                  {/* Metrics Cards */}
                  <div className="space-y-3">
                    {project.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-4 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 transition-all hover:border-indigo-500/30"
                      >
                        <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500 dark:from-indigo-400 dark:to-teal-300 font-mono">
                          {metric.value}
                        </div>
                        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                          {metric.label}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {metric.detail}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* External Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors shadow-sm"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>

                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shadow-md shadow-indigo-500/20"
                  >
                    <span>Live Architecture</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </Card3D>
        ))}
      </div>
    </section>
  );
}
