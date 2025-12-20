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

// Grid configuration
const GRID_COLS = 20;
const GRID_ROWS = 12;
const CELL_SIZE = 80;

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [cells, setCells] = useState<{ id: number; x: number; y: number; opacity: number }[]>([]);

  // Initialize grid cells
  useEffect(() => {
    const newCells = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        newCells.push({
          id: row * GRID_COLS + col,
          x: col * CELL_SIZE,
          y: row * CELL_SIZE,
          opacity: 0
        });
      }
    }
    setCells(newCells);
  }, []);

  // Handle mouse move for grid effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
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

  // Calculate cell opacity based on distance from mouse
  const getCellOpacity = (cellX: number, cellY: number) => {
    const cellCenterX = cellX + CELL_SIZE / 2;
    const cellCenterY = cellY + CELL_SIZE / 2;
    const distance = Math.sqrt(
      Math.pow(mousePos.x - cellCenterX, 2) + Math.pow(mousePos.y - cellCenterY, 2)
    );
    const maxDistance = 250;
    const opacity = Math.max(0, 1 - distance / maxDistance);
    return opacity;
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
      {/* Grid Background with Hover Effect */}
      <div
        ref={gridRef}
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: 0.8 }}
      >
        {cells.map((cell) => {
          const opacity = getCellOpacity(cell.x, cell.y);
          return (
            <div
              key={cell.id}
              className="absolute"
              style={{
                left: cell.x,
                top: cell.y,
                width: CELL_SIZE,
                height: CELL_SIZE,
                border: '1px solid',
                borderColor: `rgba(34, 197, 94, ${opacity * 0.6})`,
                background: `rgba(34, 197, 94, ${opacity * 0.05})`,
                boxShadow: opacity > 0.1 ? `inset 0 0 ${20 * opacity}px rgba(34, 197, 94, ${opacity * 0.1})` : 'none',
                transition: 'border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease'
              }}
            />
          );
        })}
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
