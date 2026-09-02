import React, { useEffect } from 'react';
import { personalInfo, projectsData, certificationsData, educationData } from '../data/portfolioData';
import { X, Printer } from 'lucide-react';

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
        {/* Modal Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-wider">
              Recruiter Document Preview
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-xs font-mono text-slate-300">Abhishek_Kumar_FullStack_Resume.pdf</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-indigo-400" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              title="Close Preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Content (Classic Recruiter-Compliant Format) */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-6 text-left text-slate-800 font-sans leading-relaxed">
          {/* Header */}
          <div className="border-b border-slate-300 pb-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-700 tracking-tight">
              {personalInfo.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-mono mt-1.5">
              <a href={personalInfo.contacts.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                LinkedIn
              </a>
              <span>•</span>
              <a href={personalInfo.contacts.github} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                GitHub
              </a>
              <span>•</span>
              <a href={`mailto:${personalInfo.contacts.email}`} className="text-blue-600 hover:underline">
                {personalInfo.contacts.email}
              </a>
              <span>•</span>
              <span>{personalInfo.contacts.phone}</span>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-wider text-blue-700 uppercase border-b border-slate-300 pb-1 mb-2">
              Technical Proficiencies
            </h2>
            <div className="text-xs space-y-1">
              <p>
                <strong>Languages:</strong> JavaScript, TypeScript, Python, C, C++, Java, SQL
              </p>
              <p>
                <strong>Frontend:</strong> React.js, Tailwind CSS, HTML5, CSS3, DOM Manipulation, Fetch API
              </p>
              <p>
                <strong>Backend & APIs:</strong> Node.js, Express.js, RESTful Architecture, Perenual API, WebSocket Concepts
              </p>
              <p>
                <strong>Databases & Tools:</strong> PostgreSQL, MongoDB, Git, GitHub, Postman, Vercel, Render
              </p>
              <p>
                <strong>Core Competencies:</strong> Operating Systems (DVFS, Scheduling), Data Structures & Algorithms, UI/UX Design
              </p>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-wider text-blue-700 uppercase border-b border-slate-300 pb-1 mb-3">
              Engineering Projects
            </h2>
            <div className="space-y-4">
              {projectsData.map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="flex items-baseline justify-between font-bold text-slate-900">
                    <span className="text-sm font-bold text-blue-700">{proj.title}</span>
                    <span className="font-mono text-[11px] text-slate-500">{proj.period}</span>
                  </div>
                  <p className="italic text-slate-600 my-0.5">{proj.tagline}</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-700 mt-1">
                    <li>
                      <strong>Problem:</strong> {proj.problem}
                    </li>
                    <li>
                      <strong>Architecture:</strong> {proj.solution}
                    </li>
                    <li>
                      <strong>Impact & Metrics:</strong>{' '}
                      {proj.metrics.map((m) => `${m.label}: ${m.value} (${m.detail})`).join(' • ')}
                    </li>
                  </ul>
                  <div className="font-mono text-[11px] text-slate-500 mt-1">
                    <strong>Tech:</strong> {proj.techStack.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-wider text-blue-700 uppercase border-b border-slate-300 pb-1 mb-2">
              Education
            </h2>
            <div className="space-y-2 text-xs">
              {educationData.map((edu, i) => (
                <div key={i} className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600">{edu.institution}, {edu.location}</div>
                  </div>
                  <div className="text-right font-mono text-[11px]">
                    <div className="font-bold text-blue-700">{edu.score}</div>
                    <div className="text-slate-500">{edu.period}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Achievements */}
          <div>
            <h2 className="text-xs font-mono font-bold tracking-wider text-blue-700 uppercase border-b border-slate-300 pb-1 mb-2">
              Certifications & Achievements
            </h2>
            <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
              <li>
                <strong>LeetCode Problem Solving:</strong> 100+ Solved Algorithmic Problems in Data Structures & Graph Traversals.
              </li>
              {certificationsData.map((c, i) => (
                <li key={i}>
                  <strong>{c.title}:</strong> {c.issuer} ({c.date}) — Credential ID: {c.credentialId}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
