import React, { useState, useEffect } from 'react';
import Card3D from './Card3D';
import {
  Play,
  Pause,
  RotateCcw,
  Zap,
  Gauge,
  Cpu,
  Flame,
  Sparkles,
  Info,
} from 'lucide-react';

export default function CpuSimulatorDemo() {
  const [algorithm, setAlgorithm] = useState('dvfs'); // 'fcfs' or 'dvfs'
  const [isRunning, setIsRunning] = useState(true);
  const [cycle, setCycle] = useState(0);

  // Simulated tasks in queue
  const initialTasks = [
    { id: 'P1', name: 'Matrix Multiply', burst: 6, priority: 2, color: 'bg-indigo-500' },
    { id: 'P2', name: 'Database Query', burst: 4, priority: 1, color: 'bg-sky-500' },
    { id: 'P3', name: 'Image Filtering', burst: 8, priority: 3, color: 'bg-emerald-500' },
    { id: 'P4', name: 'TLS Encryption', burst: 5, priority: 2, color: 'bg-amber-500' },
  ];

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setCycle((prev) => (prev + 1) % 24);
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Dynamic values based on algorithm and execution cycle
  const isDvfs = algorithm === 'dvfs';
  const temperature = isDvfs ? Math.min(64, 52 + (cycle % 7) * 1.8) : Math.min(84, 68 + (cycle % 7) * 2.4);
  const cpuFrequency = isDvfs ? (cycle % 2 === 0 ? '2.4 GHz' : '2.8 GHz') : '3.6 GHz (Static)';
  const voltage = isDvfs ? '0.98 V' : '1.28 V';
  const energyConsumed = isDvfs ? '41.2 Joules' : '51.4 Joules';
  const energySavings = isDvfs ? '19.86% Reduced' : '0.00% (Baseline)';

  return (
    <section id="simulation" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono font-semibold tracking-wide uppercase mb-3">
          <Cpu className="w-3.5 h-3.5" />
          <span>Interactive Systems Demo</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          DVFS & Thermal Scheduling Simulator
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
          An interactive recreation of my C-based systems project. Compare standard FCFS execution with dynamic frequency scaling to observe the 19.86% energy savings in real time.
        </p>
      </div>

      {/* Simulator Interface */}
      <Card3D className="p-6 sm:p-8 border border-slate-200 dark:border-slate-800" glowColor="rgba(59, 130, 246, 0.2)">
        {/* Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          {/* Mode Switcher */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setAlgorithm('dvfs')}
              className={`px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                isDvfs
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>DVFS + Thermal-Aware (Abhishek's Model)</span>
            </button>
            <button
              onClick={() => setAlgorithm('fcfs')}
              className={`px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                !isDvfs
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Standard FCFS (Baseline)</span>
            </button>
          </div>

          {/* Player controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isRunning ? 'Pause' : 'Resume'}</span>
            </button>
            <button
              onClick={() => setCycle(0)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
              title="Reset Execution Cycle"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Live Gauges & System Telemetry */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-1">
              <span>CORE TEMPERATURE</span>
              <Flame className={`w-4 h-4 ${isDvfs ? 'text-emerald-500' : 'text-rose-500 animate-pulse'}`} />
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {temperature.toFixed(1)}°C
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {isDvfs ? 'Thermal Throttling Active' : 'Thermal Saturation Warning'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-1">
              <span>FREQUENCY & VOLTS</span>
              <Gauge className="w-4 h-4 text-sky-500" />
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {cpuFrequency}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Voltage: {voltage}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-1">
              <span>TOTAL ENERGY DISSIPATED</span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {energyConsumed}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Cumulative Joules
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/20">
            <div className="flex items-center justify-between text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold mb-1">
              <span>NET POWER SAVINGS</span>
              <Sparkles className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="text-2xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
              {energySavings}
            </div>
            <div className="text-[11px] text-indigo-500 dark:text-indigo-300 mt-1">
              Verified Benchmark Impact
            </div>
          </div>
        </div>

        {/* Real-Time Gantt Timeline Visualizer */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Simulated Execution Timeline (Cycle: {cycle}/24)
            </span>
            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">
              Core Status: {isRunning ? 'Active Execution' : 'Paused'}
            </span>
          </div>

          {/* Timeline Bar */}
          <div className="h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 flex gap-1 overflow-hidden relative">
            {initialTasks.map((t, idx) => {
              const active = Math.floor(cycle / 6) === idx;
              return (
                <div
                  key={t.id}
                  className={`flex-1 rounded-lg flex items-center justify-center text-xs font-mono font-bold text-white transition-all duration-300 ${
                    t.color
                  } ${active ? 'ring-2 ring-white dark:ring-slate-300 scale-[1.02] shadow-md' : 'opacity-60'}`}
                >
                  {t.id}: {t.name} {active && '▶'}
                </div>
              );
            })}
          </div>

          {/* Informational Callout */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
            <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <span>
              <strong>Algorithmic Rationale:</strong> DVFS dynamically scales frequency and operating voltage according to instantaneous process priority, queue burst deadlines, and thermal feedback curves. This prevents unnecessary heat accumulation during I/O delays and delivers a verified <strong>19.86% energy reduction</strong> over unthrottled FCFS dispatching.
            </span>
          </div>
        </div>
      </Card3D>
    </section>
  );
}
