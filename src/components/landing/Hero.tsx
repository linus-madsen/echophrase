'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="py-20 px-8 text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-6">
        Master Any Language Through
        <span className="text-primary"> Shadowing</span>
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        Listen to native speakers, repeat what you hear, and get instant AI feedback 
        on your pronunciation. The scientifically-proven technique used by polyglots worldwide.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Button size="lg" asChild>
          <Link href="/#practice">Start Free Practice →</Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/how-it-works">How It Works</Link>
        </Button>
      </div>
    </section>
  );
}
