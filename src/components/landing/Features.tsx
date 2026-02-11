export default function Features() {
  const features = [
    {
      icon: '🎧',
      title: 'Listen to Native Audio',
      description: 'AI-generated phrases spoken with natural pronunciation and intonation.',
    },
    {
      icon: '🎤',
      title: 'Record Your Voice',
      description: 'Use your microphone to repeat the phrase. Works on any device.',
    },
    {
      icon: '📊',
      title: 'Get Instant Feedback',
      description: 'AI compares your pronunciation and shows you exactly where to improve.',
    },
    {
      icon: '🔥',
      title: 'Build Your Streak',
      description: 'Stay motivated with daily practice streaks and progress tracking.',
    },
    {
      icon: '🌍',
      title: '6 Languages',
      description: 'Spanish, French, German, Italian, Portuguese, and Japanese.',
    },
    {
      icon: '🆓',
      title: 'Free to Use',
      description: 'No account required. Start practicing immediately.',
    },
  ];

  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-amber-900 text-center mb-12">
          Why Shadowing Works
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl bg-amber-50 hover:shadow-lg transition-shadow">
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="text-xl font-bold text-amber-900 mb-2">{feature.title}</h3>
              <p className="text-amber-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
