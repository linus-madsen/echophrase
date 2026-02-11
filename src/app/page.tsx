'use client';

import { useState } from 'react';
import LanguageSelector from '@/components/LanguageSelector';
import ShadowingWorkout from '@/components/ShadowingWorkout';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Testimonials from '@/components/landing/Testimonials';
import Footer from '@/components/landing/Footer';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [level, setLevel] = useState<'beginner' | 'intermediate'>('beginner');

  // Full landing page when no language selected
  if (!selectedLanguage) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
        <Hero />
        <Features />
        
        {/* Practice Section */}
        <section id="practice" className="py-16 px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              Start Practicing Now
            </h2>
            <p className="text-amber-700 mb-8">
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

  // Workout view when language is selected
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <button
            onClick={() => setSelectedLanguage(null)}
            className="text-amber-700 hover:text-amber-900 flex items-center gap-2"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-amber-900">🎙️ EchoPhrase</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setLevel('beginner')}
              className={`px-3 py-1 rounded-full text-sm ${
                level === 'beginner'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-200 text-amber-800'
              }`}
            >
              Beginner
            </button>
            <button
              onClick={() => setLevel('intermediate')}
              className={`px-3 py-1 rounded-full text-sm ${
                level === 'intermediate'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-200 text-amber-800'
              }`}
            >
              Intermediate
            </button>
          </div>
        </header>
        <ShadowingWorkout language={selectedLanguage} level={level} />
      </div>
    </main>
  );
}
