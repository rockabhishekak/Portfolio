import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ScrollVideoHero from './components/ScrollVideoHero';
import Hero3D from './components/Hero3D';
import SkillsMatrix from './components/SkillsMatrix';
import Projects from './components/Projects';
import CpuSimulatorDemo from './components/CpuSimulatorDemo';
import Credentials from './components/Credentials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import { Film, Box } from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [heroMode, setHeroMode] = useState('video'); // 'video' or 'mesh'

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 bg-grid-pattern relative selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      {/* Sticky Glass Navbar */}
      <Navbar
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Floating Hero Mode Switcher */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl">
        <button
          onClick={() => setHeroMode('video')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
            heroMode === 'video'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          title="Apple-style Video Scrollytelling"
        >
          <Film className="w-3.5 h-3.5" />
          <span>Cinematic Scroll</span>
        </button>
        <button
          onClick={() => setHeroMode('mesh')}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
            heroMode === 'mesh'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          title="Interactive 3D Particle Mesh"
        >
          <Box className="w-3.5 h-3.5" />
          <span>3D Mesh</span>
        </button>
      </div>

      {/* Main Content Sections */}
      <main className="relative z-10">
        {heroMode === 'video' ? (
          <ScrollVideoHero
            isDark={isDark}
            onOpenResume={() => setIsResumeOpen(true)}
          />
        ) : (
          <Hero3D
            isDark={isDark}
            onOpenResume={() => setIsResumeOpen(true)}
          />
        )}
        <SkillsMatrix />
        <Projects />
        <CpuSimulatorDemo />
        <Credentials />
        <ContactSection />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Instant Resume Preview Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
