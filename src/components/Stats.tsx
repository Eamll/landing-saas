'use client';

import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const stats = [
  { value: '$392K+', label: 'Paid out to Funded Traders', position: 'left' },
  { value: '14K+', label: 'No. of Funded Traders', position: 'right' },
  { value: '143+', label: 'No. of countries with traders registered at Fxology', position: 'left' },
  { value: '12h', label: 'Average Payout Time', position: 'center' },
];

// Grid line configuration - full viewport coverage
const LINE_SPACING = 160;

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [gridLines, setGridLines] = useState<{ horizontal: number[]; vertical: number[] }>({ horizontal: [], vertical: [] });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize grid lines based on viewport size
  useEffect(() => {
    const updateGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });

      const horizontal = [];
      const vertical = [];

      // Create lines covering entire viewport
      const numHorizontal = Math.ceil(height / LINE_SPACING) + 1;
      const numVertical = Math.ceil(width / LINE_SPACING) + 1;

      for (let i = 0; i < numHorizontal; i++) {
        horizontal.push(i * LINE_SPACING);
      }
      for (let i = 0; i < numVertical; i++) {
        vertical.push(i * LINE_SPACING);
      }

      setGridLines({ horizontal, vertical });
    };

    updateGrid();
    window.addEventListener('resize', updateGrid);
    return () => window.removeEventListener('resize', updateGrid);
  }, []);

  // Handle mouse move for grid effect - track relative to section
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Calculate line opacity based on distance from mouse
  const getLineOpacity = (linePos: number, isHorizontal: boolean) => {
    const mouseCoord = isHorizontal ? mousePos.y : mousePos.x;
    const distance = Math.abs(mouseCoord - linePos);
    const maxDistance = 200;
    const opacity = Math.max(0, 1 - distance / maxDistance);
    return opacity * 0.8;
  };

  // Calculate intersection glow intensity
  const getIntersectionGlow = (x: number, y: number) => {
    const distance = Math.sqrt(
      Math.pow(mousePos.x - x, 2) + Math.pow(mousePos.y - y, 2)
    );
    const maxDistance = 150;
    const intensity = Math.max(0, 1 - distance / maxDistance);
    return intensity;
  };

  // GSAP animations - triggered when section becomes visible
  useGSAP(() => {
    const section = sectionRef.current;
    const headerRef = section?.querySelector('.stats-header');
    const statElements = section?.querySelectorAll('.stat-item');

    if (section) {
      // Use IntersectionObserver to detect when section is visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Animate header
              if (headerRef) {
                gsap.fromTo(
                  headerRef,
                  { opacity: 0, y: 50 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                  }
                );
              }

              // Animate stats items with stagger
              if (statElements) {
                gsap.fromTo(
                  statElements,
                  { opacity: 0, y: 40, scale: 0.95 },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    delay: 0.3,
                    ease: 'power3.out'
                  }
                );
              }

              // Disconnect after animation triggers
              observer.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(section);

      return () => observer.disconnect();
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="snap-section relative overflow-hidden"
      style={{ background: '#050505', minHeight: '100vh' }}
    >
      {/* Grid Lines with Central Glow Effect - Full Viewport */}
      <div
        ref={gridRef}
        className="absolute inset-0 overflow-hidden"
      >
        {/* Horizontal lines - full width */}
        {gridLines.horizontal.map((y, i) => {
          const opacity = getLineOpacity(y, true);
          return (
            <div
              key={`h-${i}`}
              className="absolute"
              style={{
                top: y,
                left: 0,
                right: 0,
                height: '1px',
                background: opacity > 0.05
                  ? `linear-gradient(90deg,
                      rgba(34, 197, 94, ${opacity * 0.15}) 0%,
                      rgba(34, 197, 94, ${opacity * 0.4}) ${Math.max(0, (mousePos.x / dimensions.width) * 100 - 20)}%,
                      rgba(34, 197, 94, ${opacity * 0.8}) ${(mousePos.x / dimensions.width) * 100}%,
                      rgba(34, 197, 94, ${opacity * 0.4}) ${Math.min(100, (mousePos.x / dimensions.width) * 100 + 20)}%,
                      rgba(34, 197, 94, ${opacity * 0.15}) 100%)`
                  : 'rgba(34, 197, 94, 0.08)',
                boxShadow: opacity > 0.2 ? `0 0 ${12 * opacity}px rgba(34, 197, 94, ${opacity * 0.5})` : 'none',
                transition: 'box-shadow 0.1s ease'
              }}
            />
          );
        })}

        {/* Vertical lines - full height */}
        {gridLines.vertical.map((x, i) => {
          const opacity = getLineOpacity(x, false);
          return (
            <div
              key={`v-${i}`}
              className="absolute"
              style={{
                left: x,
                top: 0,
                bottom: 0,
                width: '1px',
                background: opacity > 0.05
                  ? `linear-gradient(180deg,
                      rgba(34, 197, 94, ${opacity * 0.15}) 0%,
                      rgba(34, 197, 94, ${opacity * 0.4}) ${Math.max(0, (mousePos.y / dimensions.height) * 100 - 20)}%,
                      rgba(34, 197, 94, ${opacity * 0.8}) ${(mousePos.y / dimensions.height) * 100}%,
                      rgba(34, 197, 94, ${opacity * 0.4}) ${Math.min(100, (mousePos.y / dimensions.height) * 100 + 20)}%,
                      rgba(34, 197, 94, ${opacity * 0.15}) 100%)`
                  : 'rgba(34, 197, 94, 0.08)',
                boxShadow: opacity > 0.2 ? `0 0 ${12 * opacity}px rgba(34, 197, 94, ${opacity * 0.5})` : 'none',
                transition: 'box-shadow 0.1s ease'
              }}
            />
          );
        })}

        {/* Intersection glow points */}
        {gridLines.horizontal.map((y, hi) =>
          gridLines.vertical.map((x, vi) => {
            const glow = getIntersectionGlow(x, y);
            if (glow < 0.15) return null;
            return (
              <div
                key={`int-${hi}-${vi}`}
                className="absolute pointer-events-none"
                style={{
                  left: x,
                  top: y,
                  width: '6px',
                  height: '6px',
                  marginLeft: '-3px',
                  marginTop: '-3px',
                  borderRadius: '50%',
                  background: `rgba(255, 255, 255, ${glow})`,
                  boxShadow: `0 0 ${25 * glow}px ${12 * glow}px rgba(34, 197, 94, ${glow * 0.7}),
                              0 0 ${50 * glow}px ${25 * glow}px rgba(34, 197, 94, ${glow * 0.4})`,
                }}
              />
            );
          })
        )}

        {/* Central cursor glow orb */}
        {mousePos.x > 0 && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              width: '300px',
              height: '300px',
              marginLeft: '-150px',
              marginTop: '-150px',
              background: 'radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.05) 40%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="stats-content relative z-10 flex flex-col justify-center" style={{ padding: '60px 48px', height: '100vh', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          {/* Header */}
          <div className="stats-header text-center" style={{ marginBottom: '48px' }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white" style={{ marginBottom: '16px', lineHeight: 1.2 }}>
              Traders from more than<br />
              <span className="text-white">150 countries around the world</span><br />
              have registered!
            </h2>
            <p className="text-white/50 text-xs md:text-sm" style={{ maxWidth: '500px', margin: '0 auto', lineHeight: 1.5 }}>
              We provide unique funded programs for Forex traders based upon which
              we search for the best partners to work together with.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="relative" style={{ height: '320px' }}>
            {/* $392K+ - Top Left */}
            <div className="stat-item absolute" style={{ left: '5%', top: '0' }}>
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white" style={{ marginBottom: '4px' }}>
                $392K<span className="text-green-500">+</span>
              </div>
              <div className="text-white/50 text-xs">Paid out to Funded Traders</div>
            </div>

            {/* 14K+ - Middle Right with chart decoration */}
            <div className="stat-item absolute" style={{ right: '10%', top: '20%' }}>
              <div className="flex items-end gap-3">
                <div>
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white" style={{ marginBottom: '4px' }}>
                    14K<span className="text-green-500">+</span>
                  </div>
                  <div className="text-white/50 text-xs">No. of Funded Traders</div>
                </div>
                {/* Chart decoration */}
                <div className="flex items-end gap-1" style={{ height: '70px' }}>
                  {[40, 60, 45, 80, 55, 90, 70, 100].map((height, i) => (
                    <div
                      key={i}
                      style={{
                        width: '6px',
                        height: `${height}%`,
                        background: i === 7 ? '#22c55e' : 'rgba(34, 197, 94, 0.3)',
                        borderRadius: '2px'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 143+ - Bottom Left */}
            <div className="stat-item absolute" style={{ left: '5%', top: '55%' }}>
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white" style={{ marginBottom: '4px' }}>
                143<span className="text-green-500">+</span>
              </div>
              <div className="text-white/50 text-xs" style={{ maxWidth: '180px' }}>
                No. of countries with traders<br />registered at Fxology
              </div>
            </div>

            {/* 12h - Bottom Center */}
            <div className="stat-item absolute" style={{ left: '50%', transform: 'translateX(-50%)', bottom: '0' }}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white" style={{ marginBottom: '4px' }}>
                  12<span className="text-green-500">h</span>
                </div>
                <div className="text-white/50 text-xs">Average Payout Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
