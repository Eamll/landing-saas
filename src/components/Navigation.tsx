'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );

    tl.fromTo(
      linksRef.current?.children || [],
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power3.out'
      },
      '-=0.3'
    );

    tl.fromTo(
      actionsRef.current?.children || [],
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power3.out'
      },
      '-=0.2'
    );
  }, { scope: navRef });

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ padding: '24px 48px 16px 48px' }}
    >
      <div
        className="flex items-center justify-between"
        style={{ maxWidth: '1600px', margin: '0 auto', width: '100%' }}
      >
        {/* Logo - fixed width, doesn't shrink */}
        <div
          ref={logoRef}
          className="flex items-center gap-3 opacity-0"
          style={{ flexShrink: 0 }}
        >
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-black" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">Nology</span>
        </div>

        {/* Navigation Links - starts after logo, proper spacing */}
        <div
          ref={linksRef}
          className="hidden xl:flex items-center"
          style={{ marginLeft: '48px', gap: '8px' }}
        >
          <a href="#" className="nav-link active opacity-0">Home</a>
          <a href="#" className="nav-link opacity-0" style={{ padding: '8px 16px' }}>How it Works</a>
          <a href="#" className="nav-link opacity-0" style={{ padding: '8px 16px' }}>Programs</a>
          <a href="#" className="nav-link opacity-0" style={{ padding: '8px 16px' }}>Support</a>
          <a href="#" className="nav-link opacity-0" style={{ padding: '8px 16px' }}>Careers</a>
          <a href="#" className="nav-link opacity-0" style={{ padding: '8px 16px' }}>Become a Partner</a>
          <a href="#" className="nav-link opacity-0" style={{ padding: '8px 16px' }}>Login / Register</a>
        </div>

        {/* Action Buttons - fixed width, doesn't shrink */}
        <div
          ref={actionsRef}
          className="flex items-center gap-4"
          style={{ flexShrink: 0 }}
        >
          <div className="hidden sm:flex items-center gap-2 text-sm text-white/70 opacity-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            English
          </div>
          <button className="btn-primary text-sm opacity-0">
            Start a challenge
            <span className="w-5 h-5 bg-black/20 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
          <button className="btn-secondary text-sm opacity-0">Free trial</button>
        </div>
      </div>
    </nav>
  );
}
