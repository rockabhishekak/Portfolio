# Abhishek Kumar — Full Stack Developer & Systems Engineer Portfolio

A modern, minimal, 3D-styled personal portfolio website engineered with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Apple-Style Scrollytelling**.

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%20v4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 🌟 Key Highlights & Features

- **Cinematic Apple-Style Scrollytelling:** Scroll-driven frame animation (120 HD frames) with inertial damping/lerp for buttery-smooth 60fps playback.
- **Dual Visual Modes:** Floating toggle between **Cinematic Video Scroll** and **Interactive 3D Geometric Mesh**.
- **Interactive 3D Perspective Tilt:** Custom physics-based 3D tilt cards (`Card3D.jsx`) with dynamic specular glare and ambient light diffusion.
- **Interactive CPU Simulator:** A live systems demonstration allowing visitors to benchmark **Dynamic Voltage & Frequency Scaling (DVFS)** vs standard **FCFS**, observing the verified **19.86% energy reduction**.
- **Dark & Light Mode:** Complete theme system with zero-flash persistence via `localStorage` and system preference detection.
- **Recruiter-Friendly Case Studies:** Top 3 engineering projects structured using the **Problem — Architecture/Solution — Metrics** paradigm.
- **One-Click Instant Resume Preview:** Embedded modal for instant recruiter review and print-ready PDF download.
- **Quick Connect:** Interactive contact form with one-click email copy to clipboard.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React 19, JavaScript (ES6+), Tailwind CSS v4, Lucide Icons
- **Build Tool:** Vite 8 (Ultra-fast HMR and ~500ms production builds)
- **3D & Animation Engine:** HTML5 Canvas, WebGL Mathematical Particle Projections, CSS 3D Transforms (`preserve-3d`, `perspective: 1000px`)
- **Linter & Quality:** Oxlint (0 errors, 0 warnings)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rockabhishekak/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 📂 Project Structure

```
├── public/
│   ├── favicon.svg              # Custom branded AK favicon
│   └── frames/                  # 120 optimized high-res scrollytelling frames
├── src/
│   ├── components/
│   │   ├── Card3D.jsx           # Reusable 3D tilt perspective wrapper
│   │   ├── ContactSection.jsx   # Contact channels & interactive form
│   │   ├── CpuSimulatorDemo.jsx # Interactive 19.86% energy reduction visualizer
│   │   ├── Credentials.jsx      # LeetCode metrics, Certifications, Education
│   │   ├── Footer.jsx           # Minimal system status & social links
│   │   ├── Hero3D.jsx           # Interactive 3D particle mesh hero
│   │   ├── Icons.jsx            # Pixel-perfect SVG brand icons
│   │   ├── Navbar.jsx           # Glassmorphic header & theme toggle
│   │   ├── Projects.jsx         # Problem-Solution-Metrics project showcases
│   │   ├── ResumeModal.jsx      # Instant printable CV modal
│   │   ├── ScrollVideoHero.jsx  # Apple-style scroll-driven frame canvas
│   │   └── SkillsMatrix.jsx     # Frontend, Backend, Databases, Core CS matrix
│   ├── data/
│   │   └── portfolioData.js     # Structured CV content, metrics, case studies
│   ├── App.jsx                  # Theme state, mode switcher, main layout
│   ├── index.css                # Tailwind v4, 3D utilities, glassmorphism
│   └── main.jsx                 # Application entry point
├── package.json
└── vite.config.js
```

---

## 👤 Author

**Abhishek Kumar**
- **Role:** Full Stack Developer & Systems Engineer
- **Education:** B.Tech Computer Science & Engineering, Lovely Professional University (CGPA: 8.38)
- **LinkedIn:** [linkedin.com/in/akabhishekak](https://www.linkedin.com/in/akabhishekak/)
- **GitHub:** [github.com/rockabhishekak](https://github.com/rockabhishekak/)
- **Email:** [abhishekji7631@gmail.com](mailto:abhishekji7631@gmail.com)
