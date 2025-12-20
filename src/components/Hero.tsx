'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// Floating math elements - positioned within safe content area
const mathElements = [
  { content: '(12+12)', x: '12%', y: '32%', boxed: false },
  { content: '-15+6', x: '18%', y: '52%', boxed: false },
  { content: '3y', x: '10%', y: '62%', boxed: false },
  { content: '24', x: '15%', y: '75%', boxed: true },
  { content: '12', x: '82%', y: '32%', boxed: true },
  { content: '17+6=4', x: '78%', y: '52%', boxed: false },
  { content: '-8', x: '85%', y: '65%', boxed: false },
  { content: '5x5', x: '80%', y: '78%', boxed: true },
  { content: '8', x: '88%', y: '85%', boxed: false },
];

const features = [
  'Instant Withdrawals',
  'Fast payouts',
  '$100k+ Drawdown',
  '5-Star support',
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mathRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.registerPlugin();
    const tl = gsap.timeline({ delay: 0.8 });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
    );

    const titleWords = titleRef.current?.querySelectorAll('.word') || [];
    tl.fromTo(
      titleWords,
      { opacity: 0, y: 60, rotationX: -40 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      },
      '-=0.3'
    );

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    );

    const featureBadges = featuresRef.current?.children || [];
    tl.fromTo(
      featureBadges,
      { opacity: 0, y: 20, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.5)'
      },
      '-=0.3'
    );

    const ctaButtons = ctaRef.current?.children || [];
    tl.fromTo(
      ctaButtons,
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: 'back.out(1.7)'
      },
      '-=0.2'
    );

    mathRefs.current.forEach((el, index) => {
      if (el) {
        const randomX = (Math.random() - 0.5) * 100;
        const randomY = (Math.random() - 0.5) * 100;
        const randomRotation = (Math.random() - 0.5) * 30;

        tl.fromTo(
          el,
          {
            opacity: 0,
            x: randomX,
            y: randomY,
            rotation: randomRotation,
            scale: 0.5
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out'
          },
          1 + index * 0.1
        );

        gsap.to(el, {
          y: '+=10',
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2
        });
      }
    });

  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Aurora Background */}
      <div className="aurora-bg" />

      {/* Math elements container */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full max-w-[1600px] mx-auto px-6 sm:px-12 lg:px-20">
          {mathElements.map((math, index) => (
            <div
              key={index}
              ref={(el) => { mathRefs.current[index] = el; }}
              className={`math-element ${math.boxed ? 'boxed' : ''}`}
              style={{ left: math.x, top: math.y, opacity: 0 }}
            >
              {math.content}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content - absolute positioned and centered */}
      <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-12 lg:px-16">
        <div className="text-center max-w-4xl w-full">
          {/* Badge */}
          <div ref={badgeRef} className="mb-8 opacity-0">
            <span className="inline-flex items-center gap-2 text-sm text-white/60">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Our Capital, Your
              <span className="text-green-500">Success</span>
            </span>
          </div>

          {/* Main Title */}
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ perspective: '1000px' }}
          >
            <span className="word inline-block">No</span>{' '}
            <span className="word inline-block">Time</span>{' '}
            <span className="word inline-block">Limit</span>{' '}
            <span className="word inline-block text-green-400">Prop</span>{' '}
            <span className="word inline-block text-green-400">Firm</span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-green-400/80 mb-10 opacity-0">
            Conquer the market
          </p>

          {/* Feature Badges */}
          <div ref={featuresRef} className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="feature-badge opacity-0">
                {feature}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap justify-center gap-4">
            <button className="btn-primary opacity-0">
              Start a challenge
              <span className="w-6 h-6 bg-black/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
            <button className="btn-secondary opacity-0">Free trial</button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-6 sm:right-12 lg:right-16 text-sm text-white/50">
        Scroll to explore ↓
      </div>
    </section>
  );
}
