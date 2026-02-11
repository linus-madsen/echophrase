import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const metadata = {
  title: 'How Shadowing Works | EchoPhrase',
  description: 'Learn how the shadowing technique improves your pronunciation and speaking fluency in any language.',
};

export default function HowItWorksPage() {
  const steps = [
    { number: '1', title: 'Choose Your Language', description: 'Select from Spanish, French, German, Italian, Portuguese, or Japanese.', icon: '🌍' },
    { number: '2', title: 'Listen Carefully', description: 'Hear a native-quality phrase spoken with natural rhythm and intonation.', icon: '👂' },
    { number: '3', title: 'Repeat Immediately', description: 'Record yourself saying the same phrase, mimicking the pronunciation.', icon: '🗣️' },
    { number: '4', title: 'Get AI Feedback', description: 'Our AI compares your speech to the target and shows your accuracy score.', icon: '📊' },
    { number: '5', title: 'Practice Daily', description: 'Build a streak and watch your pronunciation improve over time.', icon: '📈' },
  ];

  return (
    <main className="min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">← Back to Practice</Link>
        </Button>

        <h1 className="text-4xl font-bold mb-4">How Shadowing Works</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Shadowing is a language learning technique where you listen to native speech and 
          immediately repeat it, mimicking everything you hear. It's been used by polyglots 
          and language professionals for decades.
        </p>

        <div className="space-y-6 mb-16">
          {steps.map((step) => (
            <Card key={step.number}>
              <CardContent className="flex gap-6 p-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  {step.number}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{step.icon}</span>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Alert className="mb-12">
          <AlertDescription>
            <h2 className="text-xl font-bold mb-4">Why Shadowing Is Effective</h2>
            <ul className="space-y-2">
              <li>✓ <strong>Improves pronunciation</strong> by training your mouth muscles</li>
              <li>✓ <strong>Builds listening comprehension</strong> through focused attention</li>
              <li>✓ <strong>Develops natural rhythm</strong> and intonation patterns</li>
              <li>✓ <strong>Increases speaking confidence</strong> with daily practice</li>
              <li>✓ <strong>Works for any language</strong> at any level</li>
            </ul>
          </AlertDescription>
        </Alert>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/">Start Practicing Now →</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
