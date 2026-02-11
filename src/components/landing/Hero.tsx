'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="py-20 px-8 text-center">
      <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-6">
        Master Any Language Through
        <span className="text-amber-600"> Shadowing</span>
      </h1>
      <p className="text-xl text-amber-700 max-w-2xl mx-auto mb-8">
        Listen to native speakers, repeat what you hear, and get instant AI feedback 
        on your pronunciation. The scientifically-proven technique used by polyglots worldwide.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          href="/#practice"
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all hover:scale-105"
        >
          Start Free Practice →
        </Link>
        <Link
          href="/how-it-works"
          className="bg-white hover:bg-amber-50 text-amber-700 font-bold py-4 px-8 rounded-2xl text-lg border-2 border-amber-300 transition-all"
        >
          How It Works
        </Link>
      </div>
    </section>
  );
}
