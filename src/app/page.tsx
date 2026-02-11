'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import LanguageSelector from '@/components/LanguageSelector';
import ShadowingWorkout from '@/components/ShadowingWorkout';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Testimonials from '@/components/landing/Testimonials';
import Footer from '@/components/landing/Footer';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [level, setLevel] = useState<'beginner' | 'intermediate'>('beginner');

  if (!selectedLanguage) {
    return (
      <main className="min-h-screen">
        <Hero />
        <Features />
        
        <section id="practice" className="py-16 px-8 bg-background">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Start Practicing Now
            </h2>
            <p className="text-muted-foreground mb-8">
              Choose a language and begin your shadowing workout
            </p>
            <LanguageSelector onSelect={setSelectedLanguage} />
          </div>
        </section>

        <Testimonials />
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30 p-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => setSelectedLanguage(null)}
          >
            ← Back
          </Button>
          <h1 className="text-2xl font-bold">🎙️ EchoPhrase</h1>
          <div className="flex gap-2">
            <Button
              variant={level === 'beginner' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLevel('beginner')}
            >
              Beginner
            </Button>
            <Button
              variant={level === 'intermediate' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLevel('intermediate')}
            >
              Intermediate
            </Button>
          </div>
        </header>
        <ShadowingWorkout language={selectedLanguage} level={level} />
      </div>
    </main>
  );
}
