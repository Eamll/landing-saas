'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Feature panels data
const featurePanels = [
  {
    id: 1,
    type: 'hero',
    title: 'Swap',
    titleAccent: '-free',
    subtitle: 'for',
    subtitleAccent: '28',
    subtitleEnd: 'pairs',
  },
  {
    id: 2,
    type: 'split',
    heading: 'Our Capital',
    subheading: 'Your Success',
    cardTitle: 'What is Fxology?',
    cardHeading: 'Trade on Forex and other markets with',
    cardDescription: 'Start trading with our capital. We provide the funds, you provide the skills. Keep up to 90% of your profits.',
  },
  {
    id: 3,
    type: 'hero',
    title: 'No Time',
    titleAccent: '',
    subtitle: '',
    subtitleAccent: 'Limits',
    subtitleEnd: '',
    description: 'Take your time to prove your trading skills. We believe in sustainable growth.',
  },
  {
    id: 4,
    type: 'hero',
    title: 'Up to',
    titleAccent: '',
    subtitle: '',
    subtitleAccent: '$200K',
    subtitleEnd: '',
    description: 'Get funded with accounts up to $200,000. Scale your trading career with us.',
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [currentPanel, setCurrentPanel] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [titleAnimated, setTitleAnimated] = useState(false);
  const isAnimatingRef = useRef(false);

  // Detect when section becomes visible
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const inView = entry.isIntersecting && entry.intersectionRatio > 0.3;
          setIsActive(inView);
        });
      },
      { threshold: [0.3, 0.5, 0.9] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Title entrance animation
  useGSAP(() => {
    if (!isActive || titleAnimated || !titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { y: 200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        onComplete: () => setTitleAnimated(true),
      }
    );
  }, [isActive, titleAnimated]);

  // Handle horizontal scroll within this section
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      // Only handle if section is in view (with some tolerance)
      const isInView = rect.top > -100 && rect.top < 100;
      if (!isInView) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextPanel = currentPanel + direction;

      // Check if we should handle this scroll or let it pass through
      const shouldHandle =
        (direction > 0 && currentPanel < featurePanels.length - 1) || // Scrolling down and not at last panel
        (direction < 0 && currentPanel > 0); // Scrolling up and not at first panel

      if (shouldHandle) {
        // Prevent vertical scrolling - we're handling horizontally
        e.preventDefault();
        e.stopPropagation();

        if (isAnimatingRef.current) return;

        isAnimatingRef.current = true;
        setCurrentPanel(nextPanel);

        gsap.to(panelsRef.current, {
          x: -nextPanel * window.innerWidth,
          duration: 1,
          ease: 'power3.inOut',
          onComplete: () => {
            isAnimatingRef.current = false;
          },
        });
      }
      // If not handling, let the event bubble up for vertical scroll
    };

    // Use capture phase to intercept before SmoothScroll
    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    return () => window.removeEventListener('wheel', handleWheel, { capture: true });
  }, [currentPanel]);

  return (
    <section
      ref={sectionRef}
      className="snap-section relative overflow-hidden"
      style={{ background: '#0a0a0a', height: '100vh' }}
    >
      {/* Horizontal scrolling panels container */}
      <div
        ref={panelsRef}
        className="absolute inset-0 flex will-change-transform"
        style={{ width: `${featurePanels.length * 100}vw` }}
      >
        {featurePanels.map((panel, index) => (
          <div
            key={panel.id}
            className="relative flex items-center justify-center"
            style={{ width: '100vw', height: '100vh' }}
          >
            {panel.type === 'hero' && index === 0 ? (
              // First panel - Swap-free title with entrance animation
              <div ref={titleRef} className="text-center" style={{ opacity: 0 }}>
                <h2
                  className="font-bold leading-none tracking-tight"
                  style={{ fontSize: 'clamp(70px, 14vw, 180px)' }}
                >
                  <span className="text-green-500">{panel.title}</span>
                  <span className="text-white">{panel.titleAccent}</span>
                </h2>
                <h3
                  className="font-bold leading-none tracking-tight"
                  style={{ fontSize: 'clamp(50px, 10vw, 140px)' }}
                >
                  <span className="text-white/70">{panel.subtitle} </span>
                  <span className="text-green-500">{panel.subtitleAccent}</span>
                  <span className="text-white/70"> {panel.subtitleEnd}</span>
                </h3>
              </div>
            ) : panel.type === 'split' ? (
              // Split panel - Our Capital Your Success
              <div className="flex items-center justify-center gap-12 lg:gap-20 px-8 lg:px-16 w-full max-w-7xl">
                {/* Left side - 3D wireframe effect */}
                <div className="flex-1 flex flex-col items-center">
                  <div
                    className="relative mb-8"
                    style={{
                      width: '280px',
                      height: '280px',
                    }}
                  >
                    {/* Outer frame */}
                    <div
                      className="absolute inset-0"
                      style={{
                        border: '1px solid rgba(34, 197, 94, 0.4)',
                        transform: 'perspective(600px) rotateX(20deg) rotateY(-20deg)',
                        background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, transparent 60%)',
                      }}
                    />
                    {/* Inner frame */}
                    <div
                      className="absolute"
                      style={{
                        top: '15%',
                        left: '15%',
                        right: '15%',
                        bottom: '15%',
                        border: '1px solid rgba(34, 197, 94, 0.25)',
                        transform: 'perspective(600px) rotateX(20deg) rotateY(-20deg)',
                      }}
                    />
                    {/* Glow effect */}
                    <div
                      className="absolute"
                      style={{
                        top: '50%',
                        left: '50%',
                        width: '60%',
                        height: '60%',
                        transform: 'translate(-50%, -50%)',
                        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%)',
                        filter: 'blur(20px)',
                      }}
                    />
                  </div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center">
                    Our Capital
                  </h3>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-500 text-center">
                    Your Success
                  </h3>
                </div>

                {/* Right side - Info card */}
                <div className="flex-1 max-w-md">
                  <div
                    className="p-8 rounded-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <span className="text-xs text-white/40 uppercase tracking-widest">
                      {panel.cardTitle}
                    </span>
                    <h4 className="text-xl md:text-2xl font-semibold text-white mt-4 mb-4 leading-tight">
                      Trade on <span className="text-green-500">Forex</span> and other
                      <br />markets with
                    </h4>
                    <p className="text-white/40 text-sm mb-6 leading-relaxed">
                      {panel.cardDescription}
                    </p>
                    {/* Progress bar */}
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                        style={{ width: '75%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Other hero panels
              <div className="text-center px-8 max-w-5xl">
                <h2
                  className="font-bold leading-none tracking-tight mb-4"
                  style={{ fontSize: 'clamp(60px, 12vw, 150px)' }}
                >
                  <span className="text-white">{panel.title}</span>
                </h2>
                <h3
                  className="font-bold leading-none tracking-tight mb-8"
                  style={{ fontSize: 'clamp(60px, 12vw, 150px)' }}
                >
                  <span className="text-green-500">{panel.subtitleAccent}</span>
                </h3>
                {panel.description && (
                  <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    {panel.description}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Panel progress indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {featurePanels.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (isAnimatingRef.current) return;
              isAnimatingRef.current = true;
              setCurrentPanel(i);
              gsap.to(panelsRef.current, {
                x: -i * window.innerWidth,
                duration: 1,
                ease: 'power3.inOut',
                onComplete: () => {
                  isAnimatingRef.current = false;
                },
              });
            }}
            className="group relative h-1 rounded-full overflow-hidden transition-all duration-300"
            style={{ width: currentPanel === i ? '48px' : '24px' }}
          >
            <div className="absolute inset-0 bg-white/20" />
            <div
              className="absolute inset-0 bg-green-500 transition-transform duration-300 origin-left"
              style={{
                transform: currentPanel === i ? 'scaleX(1)' : 'scaleX(0)',
              }}
            />
          </button>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 right-10 text-white/30 text-sm">
        {currentPanel < featurePanels.length - 1 ? 'Scroll to explore →' : ''}
      </div>
    </section>
  );
}
