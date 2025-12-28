'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const reviewsRow1 = [
  {
    id: 1,
    name: 'Satoshi',
    location: 'JP',
    date: '2 days ago',
    rating: 5,
    title: 'Professional and attentive',
    text: 'Besides the good prices that is on offer. The application has improved dramatically.',
    avatar: null,
    avatarBg: '#4F46E5',
  },
  {
    id: 2,
    name: 'RC',
    location: 'CA',
    date: '3 days ago',
    rating: 5,
    title: 'I had no issue with the purchase',
    text: 'I had no issue with the purchase. Pretty straight forward, and easy. Will be looking forward to purchasing from them in the future!',
    avatar: null,
    avatarBg: '#06B6D4',
  },
  {
    id: 3,
    name: 'Alex M.',
    location: 'US',
    date: '4 days ago',
    rating: 5,
    title: 'Excellent trading conditions',
    text: 'The spreads are tight and execution is fast. Exactly what I was looking for in a prop firm.',
    avatar: null,
    avatarBg: '#8B5CF6',
  },
  {
    id: 4,
    name: 'Chen Wei',
    location: 'SG',
    date: '5 days ago',
    rating: 5,
    title: 'Great support team',
    text: 'Support team responds quickly and helps resolve any issues. Very professional service.',
    avatar: null,
    avatarBg: '#F59E0B',
  },
  {
    id: 5,
    name: 'Marco P.',
    location: 'IT',
    date: '1 week ago',
    rating: 5,
    title: 'Smooth payout process',
    text: 'Got my first payout within 24 hours. The whole process was seamless and transparent.',
    avatar: null,
    avatarBg: '#10B981',
  },
  {
    id: 11,
    name: 'Nina K.',
    location: 'DE',
    date: '1 week ago',
    rating: 5,
    title: 'Excellent platform',
    text: 'Very intuitive trading platform with great tools. The charts and analysis features are top-notch.',
    avatar: null,
    avatarBg: '#EC4899',
  },
  {
    id: 12,
    name: 'Tom H.',
    location: 'NL',
    date: '2 weeks ago',
    rating: 5,
    title: 'Fair trading rules',
    text: 'Unlike other prop firms, the rules here are actually fair and achievable. No hidden catches.',
    avatar: null,
    avatarBg: '#14B8A6',
  },
];

const reviewsRow2 = [
  {
    id: 6,
    name: 'David Fx',
    location: 'NG',
    date: '3 days ago',
    rating: 5,
    title: 'I like the trading platform',
    text: 'Quick response every time I reach out for help. Fast withdrawals. They have a good trading platform. Smooth experience.',
    avatar: null,
    avatarBg: '#1F2937',
  },
  {
    id: 7,
    name: 'Lora J.',
    location: 'CA',
    date: '5 days ago',
    rating: 5,
    title: 'So far so good',
    text: 'Besides the good prices that is on offer. The application has improved dramatically.',
    avatar: null,
    avatarBg: '#EC4899',
  },
  {
    id: 8,
    name: 'James T.',
    location: 'UK',
    date: '1 week ago',
    rating: 5,
    title: 'Best prop firm experience',
    text: 'After trying several prop firms, this is by far the best. Fair rules and great conditions.',
    avatar: null,
    avatarBg: '#EF4444',
  },
  {
    id: 9,
    name: 'Sarah K.',
    location: 'AU',
    date: '1 week ago',
    rating: 5,
    title: 'Highly recommend',
    text: 'The evaluation process was challenging but fair. Now funded and trading profitably.',
    avatar: null,
    avatarBg: '#22C55E',
  },
  {
    id: 10,
    name: 'Ahmed R.',
    location: 'AE',
    date: '2 weeks ago',
    rating: 5,
    title: 'Professional service',
    text: 'Everything works as advertised. No hidden rules or surprises. Very transparent.',
    avatar: null,
    avatarBg: '#6366F1',
  },
  {
    id: 13,
    name: 'Luis G.',
    location: 'ES',
    date: '2 weeks ago',
    rating: 5,
    title: 'Great customer service',
    text: 'The support team is always helpful and responsive. They resolved my issue within hours.',
    avatar: null,
    avatarBg: '#F97316',
  },
  {
    id: 14,
    name: 'Yuki T.',
    location: 'JP',
    date: '3 weeks ago',
    rating: 5,
    title: 'Reliable and trustworthy',
    text: 'Been trading with them for months now. Consistent payouts and no issues whatsoever.',
    avatar: null,
    avatarBg: '#A855F7',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={star <= rating ? 'text-green-500' : 'text-white/20'}
          style={{ width: '12px', height: '12px' }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TrustpilotStars() {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className="flex items-center justify-center"
          style={{
            width: '22px',
            height: '22px',
            background: star <= 4 ? '#00B67A' : 'linear-gradient(90deg, #00B67A 50%, #DCDCE6 50%)',
          }}
        >
          <svg
            className="text-white"
            style={{ width: '12px', height: '12px' }}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      ))}
    </div>
  );
}

interface Review {
  id: number;
  name: string;
  location: string;
  date: string;
  rating: number;
  title: string;
  text: string;
  avatar: string | null;
  avatarBg: string;
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="flex-shrink-0 p-6 rounded-2xl flex flex-col"
      style={{
        width: '340px',
        minHeight: '180px',
        background: 'rgba(20, 20, 20, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-full text-white font-semibold text-sm"
            style={{
              width: '36px',
              height: '36px',
              background: review.avatarBg,
            }}
          >
            {review.name.charAt(0)}
          </div>
          <div>
            <p className="text-white text-sm font-medium">{review.name}</p>
            <p className="text-white/40 text-xs">{review.date} · @{review.location}</p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>

      {/* Content */}
      <h4 className="text-white font-semibold text-sm mb-3">{review.title}</h4>
      <p className="text-white/50 text-sm leading-relaxed flex-1">{review.text}</p>
    </div>
  );
}

export default function Reviews() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
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

  // Animate title
  useGSAP(() => {
    if (!isVisible) return;

    gsap.fromTo(
      '.reviews-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, [isVisible]);

  // Infinite carousel animation
  useGSAP(() => {
    if (!isVisible || !row1Ref.current || !row2Ref.current) return;

    // Calculate width of one set of reviews (total / 3 since we tripled)
    const row1Width = row1Ref.current.scrollWidth / 3;
    const row2Width = row2Ref.current.scrollWidth / 3;

    // Row 1 moves right (starts from left, moves to 0, then resets)
    gsap.fromTo(
      row1Ref.current,
      { x: -row1Width },
      {
        x: 0,
        duration: 40,
        ease: 'none',
        repeat: -1,
      }
    );

    // Row 2 moves left (starts from 0, moves left, then resets)
    gsap.fromTo(
      row2Ref.current,
      { x: 0 },
      {
        x: -row2Width,
        duration: 40,
        ease: 'none',
        repeat: -1,
      }
    );
  }, [isVisible]);

  // Duplicate reviews for seamless infinite loop
  const row1Reviews = [...reviewsRow1, ...reviewsRow1, ...reviewsRow1];
  const row2Reviews = [...reviewsRow2, ...reviewsRow2, ...reviewsRow2];

  return (
    <section
      ref={sectionRef}
      className="snap-section relative overflow-hidden"
      style={{ background: '#0a0a0a', minHeight: '100vh' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.06) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col justify-center py-16">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          {/* Trustpilot Badge */}
          <div className="reviews-title flex items-center gap-3 mb-6">
            <div className="text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="text-white font-medium text-sm">Excellent</span>
                <span className="text-white/60 text-xs">4.5</span>
              </div>
              <TrustpilotStars />
              <p className="text-white/40 text-xs mt-1">Based on 802 reviews</p>
            </div>
            <div className="flex items-center gap-1.5 pl-3 border-l border-white/10">
              <svg
                viewBox="0 0 24 24"
                style={{ width: '18px', height: '18px' }}
                fill="#00B67A"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="text-white text-sm font-medium">Trustpilot</span>
            </div>
          </div>

          {/* Title */}
          <div className="reviews-title">
            <h2
              className="font-semibold text-white leading-tight"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
            >
              Here you can find
            </h2>
            <h2
              className="font-semibold text-green-500 leading-tight"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
            >
              our reviews
            </h2>
          </div>
        </div>

        {/* Carousel Rows */}
        <div className="relative">
          <div className="overflow-hidden py-8" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {/* Row 1 - Moves Right */}
            <div className="relative">
              <div
                ref={row1Ref}
                className="flex gap-6"
                style={{ width: 'max-content' }}
              >
                {row1Reviews.map((review, index) => (
                  <ReviewCard key={`row1-${review.id}-${index}`} review={review} />
                ))}
              </div>
            </div>

            {/* Row 2 - Moves Left */}
            <div className="relative">
              <div
                ref={row2Ref}
                className="flex gap-6"
                style={{ width: 'max-content' }}
              >
                {row2Reviews.map((review, index) => (
                  <ReviewCard key={`row2-${review.id}-${index}`} review={review} />
                ))}
              </div>
            </div>
          </div>

          {/* Elliptical vignette overlay - only left/right sides */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                linear-gradient(to right, #0a0a0a 0%, rgba(10, 10, 10, 0.8) 5%, transparent 20%, transparent 80%, rgba(10, 10, 10, 0.8) 95%, #0a0a0a 100%)
              `,
            }}
          />
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-8 right-8 flex flex-col gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: i === 0 ? '#22C55E' : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
