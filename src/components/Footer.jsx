import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-sky-400 p-[1px]">
            <div className="w-full h-full rounded-lg bg-white dark:bg-slate-950 flex items-center justify-center font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">
              AK
            </div>
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {personalInfo.name}
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Full Stack Developer • Lovely Professional University
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>System Status: Open to Full-Time / SDE Roles</span>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <a
            href={personalInfo.contacts.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.contacts.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${personalInfo.contacts.email}`}
            className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center transition-all hover:scale-105"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-100 dark:border-slate-900 text-center text-xs text-slate-400 font-mono">
        Designed with 3D perspective, Tailwind CSS & React. Built for high performance and recruiter scannability.
      </div>
    </footer>
  );
}
