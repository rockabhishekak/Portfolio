import React, { useState, useRef } from 'react';

/**
 * Card3D: Interactive 3D perspective tilt component with dynamic specular sheen
 */
export default function Card3D({ children, className = '', glowColor = 'rgba(99, 102, 241, 0.15)' }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-8 to 8 deg for subtle, high-end feel)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = -((y - centerY) / centerY) * 8;

    // Glare position in percent
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
      className="relative group transition-transform duration-200 ease-out"
    >
      <div
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
        className={`glass-card rounded-2xl relative overflow-hidden transition-all duration-200 ease-out ${className}`}
      >
        {/* Dynamic Specular Sheen Layer */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle 320px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.22), transparent 70%)`,
            opacity: glare.opacity,
          }}
        />

        {/* Ambient Corner Glow */}
        <div
          className="pointer-events-none absolute -top-16 -right-16 w-36 h-36 rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-40 z-0"
          style={{ background: glowColor }}
        />

        <div className="relative z-10 preserve-3d">
          {children}
        </div>
      </div>
    </div>
  );
}
