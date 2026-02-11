import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <section className="py-16 px-8 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Shadowing Works
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <span className="text-4xl mb-2 block">{feature.icon}</span>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
