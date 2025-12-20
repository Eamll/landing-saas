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

    // Logo animation
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );

    // Navigation links stagger animation
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

    // Action buttons animation
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
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div ref={logoRef} className="flex items-center gap-3 opacity-0">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-black" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">Nology</span>
        </div>

        {/* Navigation Links */}
        <div ref={linksRef} className="hidden lg:flex items-center gap-1">
          <a href="#" className="nav-link active opacity-0">Home</a>
          <a href="#" className="nav-link px-4 py-2 opacity-0">How it Works</a>
          <a href="#" className="nav-link px-4 py-2 opacity-0">Programs</a>
          <a href="#" className="nav-link px-4 py-2 opacity-0">Support</a>
          <a href="#" className="nav-link px-4 py-2 opacity-0">Careers</a>
          <a href="#" className="nav-link px-4 py-2 opacity-0">Become a Partner</a>
          <a href="#" className="nav-link px-4 py-2 opacity-0">Login / Register</a>
        </div>

        {/* Action Buttons */}
        <div ref={actionsRef} className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-white/70 opacity-0">
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
