import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Reviews from '@/components/Reviews';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
  return (
    <main className="bg-[#0a0a0a]">
      <Navigation />
      <SmoothScroll>
        <Hero />
        <Stats />
        <Features />
        <Pricing />
        <Reviews />
      </SmoothScroll>
    </main>
  );
}
