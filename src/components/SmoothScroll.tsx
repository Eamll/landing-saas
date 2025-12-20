'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const totalSections = useRef(0);

  useEffect(() => {
    // Get all sections
    if (containerRef.current) {
      sectionsRef.current = Array.from(
        containerRef.current.querySelectorAll('.snap-section')
      ) as HTMLElement[];
      totalSections.current = sectionsRef.current.length;
    }

    // Prevent default scroll
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    // Handle wheel event for smooth transitions
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isAnimating) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSection = currentSection + direction;

      if (nextSection >= 0 && nextSection < totalSections.current) {
        scrollToSection(nextSection);
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;

      let direction = 0;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        direction = 1;
        e.preventDefault();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        direction = -1;
        e.preventDefault();
      }

      if (direction !== 0) {
        const nextSection = currentSection + direction;
        if (nextSection >= 0 && nextSection < totalSections.current) {
          scrollToSection(nextSection);
        }
      }
    };

    // Handle touch events for mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;

      if (Math.abs(diff) > 50) {
        const direction = diff > 0 ? 1 : -1;
        const nextSection = currentSection + direction;

        if (nextSection >= 0 && nextSection < totalSections.current) {
          scrollToSection(nextSection);
        }
      }
    };

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      document.body.style.overflow = '';
    };
  }, [currentSection, isAnimating]);

  const scrollToSection = (index: number) => {
    if (isAnimating || !containerRef.current) return;

    setIsAnimating(true);

    const targetY = index * window.innerHeight;

    // Smooth GSAP animation
    gsap.to(containerRef.current, {
      y: -targetY,
      duration: 1.2,
      ease: 'power3.inOut',
      onComplete: () => {
        setCurrentSection(index);
        setIsAnimating(false);
      }
    });
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div ref={containerRef} className="will-change-transform">
        {children}
      </div>

      {/* Section indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {Array.from({ length: totalSections.current || 2 }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSection === i
                ? 'bg-green-500 scale-125'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
