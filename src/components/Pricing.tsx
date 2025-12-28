'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const pricingPlans = [
  {
    name: 'Starter',
    billing: 'Billed monthly',
    price: '99',
    description: 'Ideal for beginner traders',
    features: [
      'Access to $5,000 account',
      '1 trading account',
      '5% profit target',
      'Basic support',
    ],
  },
  {
    name: 'Pro',
    billing: 'Billed monthly',
    price: '199',
    description: 'Ideal for serious traders',
    featured: true,
    badge: 'MOST POPULAR',
    features: [
      'Access to $25,000 account',
      'Up to 3 trading accounts',
      '5% profit target',
      'Priority support',
    ],
  },
  {
    name: 'Premium',
    billing: 'Billed monthly',
    price: '399',
    description: 'Best for professional traders',
    features: [
      'Access to $50,000 account',
      'Up to 5 trading accounts',
      '5% profit target',
      'Dedicated support',
    ],
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    if (!isVisible) return;

    gsap.fromTo(
      '.pricing-animate',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
    );
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="snap-section relative overflow-hidden"
      style={{ background: '#0a0a0a', minHeight: '100vh' }}
    >
      {/* Ambient glow behind featured card */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.12) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-16">
        {/* Header */}
        <h2 className="pricing-animate text-4xl md:text-5xl lg:text-6xl font-semibold text-white text-center mb-4">
          Choose your Plan
        </h2>
        <p className="pricing-animate text-white/40 text-center mb-16 text-lg">
          Discover the perfect plan tailored just for you.
        </p>

        {/* Pricing Cards */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-6 w-full max-w-5xl">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-animate relative flex flex-col w-full max-w-sm rounded-3xl transition-all duration-300 ${
                plan.featured
                  ? ''
                  : 'bg-white/[0.03] border border-white/10 hover:border-white/20'
              }`}
              style={{
                padding: '40px 32px',
                ...(plan.featured ? {
                  background: 'linear-gradient(180deg, rgba(34, 197, 94, 0.15) 0%, rgba(34, 197, 94, 0.03) 40%, rgba(20, 20, 20, 0.95) 100%)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  boxShadow: '0 0 60px rgba(34, 197, 94, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
                } : {})
              }}
            >
              {/* Badge for featured */}
              {plan.badge && (
                <div
                  className="absolute px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    top: '32px',
                    right: '32px',
                    background: 'rgba(34, 197, 94, 0.2)',
                    color: '#4ade80',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                  }}
                >
                  {plan.badge}
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-semibold text-white" style={{ marginBottom: '8px' }}>
                {plan.name}
              </h3>
              <p className="text-white/30 text-sm" style={{ marginBottom: '32px' }}>
                {plan.billing}
              </p>

              {/* Price */}
              <div style={{ marginBottom: '8px' }}>
                <span className="text-5xl font-bold text-white">${plan.price}</span>
                <span className="text-white/40 text-lg" style={{ marginLeft: '8px' }}>/ month</span>
              </div>
              <p className="text-white/40 text-sm" style={{ marginBottom: '40px' }}>
                {plan.description}
              </p>

              {/* Features */}
              <div className="flex-1" style={{ marginBottom: '40px' }}>
                {plan.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center"
                    style={{ gap: '14px', marginBottom: index < plan.features.length - 1 ? '20px' : '0' }}
                  >
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'rgba(34, 197, 94, 0.15)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                      }}
                    >
                      <svg
                        className="text-green-400"
                        style={{ width: '14px', height: '14px' }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/60" style={{ fontSize: '15px' }}>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                className="w-full rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
                style={{
                  padding: '18px 24px',
                  ...(plan.featured ? {
                    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(34, 197, 94, 0.7) 100%)',
                    color: '#000',
                    boxShadow: '0 4px 20px rgba(34, 197, 94, 0.3)',
                  } : {
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  })
                }}
              >
                Get it now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
