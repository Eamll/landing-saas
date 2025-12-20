import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import SmoothScroll from '@/components/SmoothScroll';

export default function Home() {
  return (
    <main className="bg-[#0a0a0a]">
      <Navigation />
      <SmoothScroll>
        <Hero />
        <Stats />
      </SmoothScroll>
    </main>
  );
}
