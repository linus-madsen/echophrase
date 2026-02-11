import Link from 'next/link';

export const metadata = {
  title: 'Spanish Shadowing Practice | EchoPhrase',
  description: 'Practice Spanish pronunciation with AI-powered shadowing. Listen to native speakers, repeat, and get instant feedback on your accent.',
  keywords: 'Spanish pronunciation, learn Spanish, Spanish shadowing, Spanish accent practice',
};

export default function SpanishPage() {
  const phrases = [
    { es: '¿Cómo estás?', en: 'How are you?' },
    { es: 'Me llamo...', en: 'My name is...' },
    { es: '¿Dónde está el baño?', en: 'Where is the bathroom?' },
    { es: 'Mucho gusto', en: 'Nice to meet you' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <Link href="/" className="text-amber-700 hover:text-amber-900 mb-8 inline-block">
          ← All Languages
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <span className="text-6xl">🇪🇸</span>
          <div>
            <h1 className="text-4xl font-bold text-amber-900">Spanish Shadowing</h1>
            <p className="text-amber-700">Practice your Spanish pronunciation</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Why Practice Spanish Pronunciation?</h2>
          <p className="text-amber-700 mb-4">
            Spanish is spoken by over 500 million people worldwide. Good pronunciation helps you:
          </p>
          <ul className="space-y-2 text-amber-700">
            <li>• Be understood by native speakers in Spain and Latin America</li>
            <li>• Sound more natural and confident</li>
            <li>• Improve your listening comprehension</li>
            <li>• Master the rolling R and ñ sounds</li>
          </ul>
        </div>

        <div className="bg-amber-100 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Common Phrases to Practice</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {phrases.map((p, i) => (
              <div key={i} className="bg-white rounded-xl p-4">
                <p className="text-lg font-medium text-amber-900">{p.es}</p>
                <p className="text-amber-600 text-sm">{p.en}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/?lang=es"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all hover:scale-105"
          >
            Start Spanish Practice →
          </Link>
        </div>
      </div>
    </main>
  );
}
