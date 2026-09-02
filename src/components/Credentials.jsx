import React from 'react';
import { certificationsData, educationData, personalInfo } from '../data/portfolioData';
import Card3D from './Card3D';
import {
  Award,
  GraduationCap,
  CheckCircle2,
  ExternalLink,
  Code2,
  Calendar,
  MapPin,
  Trophy,
} from 'lucide-react';

export default function Credentials() {
  return (
    <section id="credentials" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-semibold tracking-wide uppercase mb-3">
          <Trophy className="w-3.5 h-3.5" />
          <span>Verification & Rigor</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          Credentials, Certifications & Education
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
          Academic excellence, proctored examinations, and algorithmic milestones demonstrating continuous engineering discipline.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: LeetCode & Proctored Certifications */}
        <div className="lg:col-span-7 space-y-8">
          {/* LeetCode Milestone Card */}
          <Card3D className="p-6 sm:p-7 border border-slate-200 dark:border-slate-800" glowColor="rgba(245, 158, 11, 0.18)">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                    Algorithmic Problem Solving
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    LeetCode Verified Competitive Profile
                  </p>
                </div>
              </div>

              <a
                href={personalInfo.contacts.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold transition-colors border border-amber-500/20"
              >
                <span>View LeetCode Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-3 my-5 text-center">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
                  100+
                </div>
                <div className="text-[11px] text-slate-500 font-medium">Problems Solved</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-500">
                  C++ / JS
                </div>
                <div className="text-[11px] text-slate-500 font-medium">Core Languages</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-500">
                  DSA
                </div>
                <div className="text-[11px] text-slate-500 font-medium">Trees, Graphs, DP</div>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Consistently practicing time & space complexity optimization, graph traversals (BFS/DFS), two-pointer techniques, and dynamic programming paradigms to write production-grade, bug-free code.
            </p>
          </Card3D>

          {/* Certifications List */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pb-1">
              <Award className="w-4 h-4 text-indigo-500" />
              <span>Proctored Professional Certifications</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {certificationsData.map((cert, index) => (
                <Card3D
                  key={index}
                  className="p-4 flex flex-col justify-between border border-slate-200 dark:border-slate-800"
                  glowColor="rgba(99, 102, 241, 0.12)"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                        {cert.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {cert.date}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 dark:text-white tracking-tight mb-1">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {cert.issuer}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    <span>Credential: {cert.credentialId}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                </Card3D>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Academic Timeline */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pb-1">
            <GraduationCap className="w-4 h-4 text-sky-500" />
            <span>Academic Background</span>
          </div>

          <div className="space-y-4">
            {educationData.map((edu, idx) => (
              <Card3D
                key={idx}
                className="p-5 sm:p-6 border border-slate-200 dark:border-slate-800"
                glowColor="rgba(56, 189, 248, 0.14)"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">
                    {edu.degree}
                  </h4>
                  <span className="shrink-0 text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {edu.score}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {edu.institution}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {edu.location}
                  </span>
                </div>

                {edu.highlights && (
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                    {edu.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card3D>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
