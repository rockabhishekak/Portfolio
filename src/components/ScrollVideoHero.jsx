import React, { useEffect, useRef, useState, useCallback } from 'react';
import { personalInfo } from '../data/portfolioData';
import {
  ArrowRight,
  Download,
  Play,
  Pause,
  RotateCcw,
  MousePointer,
  ChevronDown,
  Cpu,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const TOTAL_FRAMES = 120;

export default function ScrollVideoHero({ isDark, onOpenResume }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // References for animation loop and smooth lerp
  const animFrameRef = useRef(null);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const isPlayingRef = useRef(false);

  // Helper to draw a frame maintaining aspect-ratio cover
  const drawFrame = useCallback((img) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Calculate aspect ratio cover
    const canvasRatio = displayWidth / displayHeight;
    const imgRatio = img.width / img.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = displayWidth;
      drawHeight = displayWidth / imgRatio;
      offsetX = 0;
      offsetY = (displayHeight - drawHeight) / 2;
    } else {
      drawHeight = displayHeight;
      drawWidth = displayHeight * imgRatio;
      offsetX = (displayWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    // Subtle ambient lighting vignette overlay
    const gradient = ctx.createRadialGradient(
      displayWidth / 2,
      displayHeight / 2,
      displayHeight * 0.3,
      displayWidth / 2,
      displayHeight / 2,
      displayHeight * 0.8
    );
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(
      1,
      isDark ? 'rgba(9, 13, 22, 0.45)' : 'rgba(248, 250, 252, 0.25)'
    );

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    ctx.restore();
  }, [isDark]);

  const imagesRef = useRef([]);

  // Preload frames
  useEffect(() => {
    let loadedCount = 0;
    const imgs = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(4, '0');
      img.src = `/frames/frame_${frameNum}.jpg`;

      img.onload = () => {
        loadedCount++;
        const pct = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
        setLoadProgress(pct);
        if (loadedCount === 1) {
          drawFrame(img);
        }
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      imgs.push(img);
    }

    imagesRef.current = imgs;

    return () => {
      imgs.length = 0;
    };
  }, [drawFrame]);

  // Scroll listener that updates target frame
  useEffect(() => {
    const handleScroll = () => {
      if (isPlayingRef.current) return;
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableDistance = rect.height - windowHeight;

      if (totalScrollableDistance <= 0) return;

      // Calculate progress between 0 and 1
      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollableDistance));
      setScrollProgress(progress);

      const target = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));
      targetFrameRef.current = target;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth frame interpolation loop (Lerp)
  useEffect(() => {
    let lastTime = 0;

    const renderLoop = (time) => {
      if (isPlayingRef.current) {
        // Auto-play mode (20 fps playback)
        if (time - lastTime > 1000 / 20) {
          targetFrameRef.current = (targetFrameRef.current + 1) % TOTAL_FRAMES;
          currentFrameRef.current = targetFrameRef.current;
          lastTime = time;
        }
      } else {
        // Inertial damping toward target frame for silky smooth scroll
        const diff = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(diff) > 0.05) {
          currentFrameRef.current += diff * 0.15;
        } else {
          currentFrameRef.current = targetFrameRef.current;
        }
      }

      const frameIndex = Math.round(currentFrameRef.current);
      setCurrentFrame(frameIndex);

      if (imagesRef.current[frameIndex]) {
        drawFrame(imagesRef.current[frameIndex]);
      }

      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [drawFrame]);

  // Toggle Auto Play / Scroll mode
  const togglePlay = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      isPlayingRef.current = next;
      return next;
    });
  };

  const handleReset = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    targetFrameRef.current = 0;
    currentFrameRef.current = 0;
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full"
      style={{ height: '280vh' }}
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background Canvas Frame */}
        <div className="absolute inset-0 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover select-none pointer-events-none transition-opacity duration-700"
          />

          {/* Dark / Light edge blend filters */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#090d16] via-transparent to-[#090d16]/70 dark:opacity-100 opacity-0 transition-opacity duration-300" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-50 via-transparent to-slate-50/70 dark:opacity-0 opacity-100 transition-opacity duration-300" />

          {/* Ambient Glow Orbs */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
        </div>

        {/* Loading Progress Overlay (if loading initial assets) */}
        {!isLoaded && loadProgress < 100 && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#090d16]/90 backdrop-blur-md text-white transition-opacity duration-500">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 p-[1px] mb-4 animate-spin">
              <div className="w-full h-full rounded-2xl bg-[#090d16]" />
            </div>
            <div className="font-mono text-sm font-bold text-slate-200">
              Loading Interactive Experience...
            </div>
            <div className="w-48 h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-indigo-500 rounded-full transition-all duration-200"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <div className="font-mono text-xs text-slate-400 mt-2">
              {loadProgress}% Cached
            </div>
          </div>
        )}

        {/* Interactive Floating Text Phases (Flanking Left & Right to keep face unobstructed) */}
        <div className="relative z-20 max-w-[1720px] mx-auto w-full px-4 sm:px-8 lg:px-14 h-full flex flex-col justify-between pt-24 pb-8 pointer-events-none">
          
          {/* Main Flank Area */}
          <div className="relative w-full flex-1 flex items-center justify-between">
            {/* Phase 1 (0.00 - 0.35 Progress): Main Intro & CTAs on Far Left */}
            <div
              className={`max-w-sm sm:max-w-md lg:max-w-lg mr-auto text-left transition-all duration-700 transform ${
                scrollProgress <= 0.35
                  ? 'opacity-100 translate-x-0 pointer-events-auto'
                  : 'opacity-0 -translate-x-12 pointer-events-none'
              }`}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-medium mb-3 backdrop-blur-xl shadow-lg">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>{personalInfo.status}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2 drop-shadow-sm">
                {personalInfo.name}
              </h1>

              <p className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-400 to-indigo-500 mb-3">
                {personalInfo.role}
              </p>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-5 backdrop-blur-xl bg-white/70 dark:bg-slate-900/75 p-4 rounded-2xl border border-white/60 dark:border-slate-800/80 shadow-xl leading-relaxed">
                {personalInfo.bio}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all hover:scale-105"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold backdrop-blur-md transition-all hover:scale-105 shadow-sm"
                >
                  <Download className="w-4 h-4 text-indigo-500" />
                  <span>Resume (PDF)</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <a
                    href={personalInfo.contacts.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center transition-all hover:scale-105"
                    title="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={personalInfo.contacts.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center transition-all hover:scale-105"
                    title="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Phase 2 (0.35 - 0.70 Progress): Full Stack Depth Callout on Far Right */}
            <div
              className={`max-w-sm sm:max-w-md lg:max-w-lg ml-auto text-right transition-all duration-700 transform ${
                scrollProgress > 0.35 && scrollProgress <= 0.70
                  ? 'opacity-100 translate-x-0 pointer-events-auto'
                  : 'opacity-0 translate-x-12 pointer-events-none'
              }`}
            >
              <div className="p-5 sm:p-6 rounded-2xl bg-white/80 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold uppercase">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Systems & Full-Stack Rigor</span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  High Performance. Clean Code. Measurable Impact.
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  From responsive modern interfaces in React & TypeScript to low-level CPU scheduling simulations in C achieving a verified <strong>19.86% energy reduction</strong>.
                </p>
                <div className="flex flex-wrap gap-1.5 justify-end pt-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    React.js
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    TypeScript
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    Node.js
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    PostgreSQL
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    C / DVFS
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stage: Phase 3 Metrics & Bottom Controls */}
          <div className="space-y-4">
            {/* Phase 3 (0.70 - 1.00 Progress): 4 Metrics Cards & Scroll Prompt */}
            <div
              className={`transition-all duration-700 transform ${
                scrollProgress > 0.70
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-12 pointer-events-none'
              }`}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-4xl mx-auto">
                {personalInfo.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl text-left"
                  >
                    <div className="text-2xl sm:text-3xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-indigo-500">
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                      {stat.detail}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-5">
                <a
                  href="#skills"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 hover:bg-indigo-500 transition-all hover:scale-105"
                >
                  <span>Continue to Skills Matrix & Projects</span>
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </a>
              </div>
            </div>

            {/* Bottom Control Bar: Frame Scrub, Auto-Play, and Scroll Hint */}
            <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-200/40 dark:border-slate-800/40 pointer-events-auto">
              {/* Scroll Indicator */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400">
                <MousePointer className="w-4 h-4 text-amber-500 animate-pulse" />
                <span>Scroll down to animate frame by frame</span>
              </div>

              {/* Play/Pause & Frame Counter */}
              <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-sm">
                <button
                  onClick={togglePlay}
                  className="w-7 h-7 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-all shadow-sm"
                  title={isPlaying ? 'Pause Auto-Play' : 'Start Auto-Play'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={handleReset}
                  className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all"
                  title="Reset to Frame 1"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
                <div className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 ml-1">
                  Frame {String(currentFrame + 1).padStart(3, '0')}/{TOTAL_FRAMES}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
