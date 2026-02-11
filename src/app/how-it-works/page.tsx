import Link from 'next/link';

export const metadata = {
  title: 'How Shadowing Works | EchoPhrase',
  description: 'Learn how the shadowing technique improves your pronunciation and speaking fluency in any language.',
};

export default function HowItWorksPage() {
  const steps = [
    {
      number: '1',
      title: 'Choose Your Language',
      description: 'Select from Spanish, French, German, Italian, Portuguese, or Japanese.',
      icon: '🌍',
    },
    {
      number: '2',
      title: 'Listen Carefully',
      description: 'Hear a native-quality phrase spoken with natural rhythm and intonation.',
      icon: '👂',
    },
    {
      number: '3',
      title: 'Repeat Immediately',
      description: 'Record yourself saying the same phrase, mimicking the pronunciation.',
      icon: '🗣️',
    },
    {
      number: '4',
      title: 'Get AI Feedback',
      description: 'Our AI compares your speech to the target and shows your accuracy score.',
      icon: '📊',
    },
    {
      number: '5',
      title: 'Practice Daily',
      description: 'Build a streak and watch your pronunciation improve over time.',
      icon: '📈',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <Link href="/" className="text-amber-700 hover:text-amber-900 mb-8 inline-block">
          ← Back to Practice
        </Link>

        <h1 className="text-4xl font-bold text-amber-900 mb-4">How Shadowing Works</h1>
        <p className="text-xl text-amber-700 mb-12">
          Shadowing is a language learning technique where you listen to native speech and 
          immediately repeat it, mimicking everything you hear. It's been used by polyglots 
          and language professionals for decades.
        </p>

        <div className="space-y-8 mb-16">
          {steps.map((step) => (
            <div key={step.number} className="flex gap-6 bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex-shrink-0 w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {step.number}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{step.icon}</span>
                  <h3 className="text-xl font-bold text-amber-900">{step.title}</h3>
                </div>
                <p className="text-amber-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-amber-100 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Why Shadowing Is Effective</h2>
          <ul className="space-y-3 text-amber-800">
            <li>✓ <strong>Improves pronunciation</strong> by training your mouth muscles</li>
            <li>✓ <strong>Builds listening comprehension</strong> through focused attention</li>
            <li>✓ <strong>Develops natural rhythm</strong> and intonation patterns</li>
            <li>✓ <strong>Increases speaking confidence</strong> with daily practice</li>
            <li>✓ <strong>Works for any language</strong> at any level</li>
          </ul>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all hover:scale-105"
          >
            Start Practicing Now →
          </Link>
        </div>
      </div>
    </main>
  );
}
