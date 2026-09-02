import React, { useEffect, useRef } from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import Card3D from './Card3D';

export default function Hero3D({ isDark, onOpenResume }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D Polyhedron / Particle Icosahedron generation
    const numPoints = 42;
    const points = [];
    const radius = Math.min(width, height) * 0.28;

    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      points.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
      });
    }

    let rotX = 0;
    let rotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;
      targetRotY = (mouseX / width) * 1.5;
      targetRotX = -(mouseY / height) * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth dampening towards target rotation
      rotX += (targetRotX - rotX) * 0.05 + 0.002;
      rotY += (targetRotY - rotY) * 0.05 + 0.004;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const fov = 380;
      const projected = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // 3D Rotation along Y then X
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;

        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Perspective projection
        const scale = fov / (fov + z2 + radius * 1.2);
        const projX = x1 * scale + width / 2;
        const projY = y2 * scale + height / 2;

        projected.push({ x: projX, y: projY, z: z2, scale });
      }

      // Draw 3D connecting lines between close vertices
      const maxDist = 95 * (width < 640 ? 0.75 : 1);
      ctx.lineWidth = 1;

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.35;
            if (isDark) {
              ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            } else {
              ctx.strokeStyle = `rgba(79, 70, 229, ${alpha * 0.8})`;
            }
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw vertices (glowing spheres)
      for (let i = 0; i < projected.length; i++) {
        const pt = projected[i];
        const dotRadius = Math.max(1.8, pt.scale * 3.8);

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, dotRadius, 0, Math.PI * 2);

        if (isDark) {
          ctx.fillStyle = i % 2 === 0 ? '#38bdf8' : '#818cf8';
          ctx.shadowColor = '#6366f1';
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = i % 2 === 0 ? '#2563eb' : '#4f46e5';
          ctx.shadowColor = '#4f46e5';
          ctx.shadowBlur = 4;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <section id="about" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* 3D Interactive WebGL/Canvas Background */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-80 dark:opacity-90">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Ambient Gradient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-500/20 via-sky-500/15 to-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-glow" />

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center">
        {/* Availability Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-medium mb-6 shadow-sm backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>{personalInfo.status}</span>
        </div>

        {/* Name and Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-500 to-indigo-400 dark:from-indigo-400 dark:via-sky-300 dark:to-teal-300">{personalInfo.name}</span>
        </h1>

        <p className="text-lg sm:text-2xl font-medium text-slate-700 dark:text-slate-200 max-w-3xl mx-auto mb-4 tracking-tight">
          {personalInfo.role}
        </p>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          {personalInfo.bio}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>Explore Engineering Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-semibold backdrop-blur-md transition-all hover:scale-[1.03] active:scale-[0.98] shadow-sm"
          >
            <Download className="w-4 h-4 text-indigo-500" />
            <span>Download Resume (PDF)</span>
          </button>

          <a
            href={personalInfo.contacts.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500/50 backdrop-blur-md transition-all hover:scale-105"
            title="GitHub Profile"
          >
            <GithubIcon className="w-5 h-5" />
          </a>

          <a
            href={personalInfo.contacts.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-slate-300 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50 backdrop-blur-md transition-all hover:scale-105"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
        </div>

        {/* 3D Metric Highlights Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          {personalInfo.stats.map((item, idx) => (
            <Card3D key={idx} className="p-4 sm:p-5" glowColor="rgba(56, 189, 248, 0.2)">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {item.label}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
                {item.value}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-tight">
                {item.detail}
              </p>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
}
