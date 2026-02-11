import Link from 'next/link';

export const metadata = {
  title: 'About EchoPhrase | AI Shadowing Practice',
  description: 'Learn about EchoPhrase and the science behind shadowing for language learning.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <Link href="/" className="text-amber-700 hover:text-amber-900 mb-8 inline-block">
          ← Back to Practice
        </Link>

        <h1 className="text-4xl font-bold text-amber-900 mb-8">About EchoPhrase</h1>

        <div className="prose prose-amber max-w-none">
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Our Mission</h2>
            <p className="text-amber-700 text-lg">
              EchoPhrase exists to make pronunciation practice accessible to every language 
              learner. We believe that speaking confidently is the key to true fluency, and 
              shadowing is the fastest path to get there.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">The Science of Shadowing</h2>
            <p className="text-amber-700 mb-4">
              Shadowing was developed by Professor Alexander Arguelles and has been refined 
              by polyglots like Luca Lampariello and Steve Kaufmann. Research shows that:
            </p>
            <ul className="space-y-2 text-amber-700">
              <li>• Immediate repetition strengthens neural pathways for speech</li>
              <li>• Mimicking prosody (rhythm, stress) improves comprehension</li>
              <li>• Regular practice leads to automatic, natural-sounding speech</li>
              <li>• Combining listening and speaking accelerates learning</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">How We're Different</h2>
            <ul className="space-y-3 text-amber-700">
              <li><strong>🆓 Free Forever:</strong> No signup, no subscription, no limits</li>
              <li><strong>🤖 AI-Powered:</strong> Real-time pronunciation feedback</li>
              <li><strong>🎯 Focused:</strong> We do one thing—shadowing—and do it well</li>
              <li><strong>📱 Web-Based:</strong> Works on any device with a browser</li>
            </ul>
          </div>

          <div className="bg-amber-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Built by Language Learners</h2>
            <p className="text-amber-700">
              EchoPhrase was built by a team of language enthusiasts who struggled with 
              pronunciation themselves. We know how frustrating it is to read and understand 
              a language but freeze when speaking. This tool is our solution—and now it's yours.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/feedback"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all hover:scale-105"
          >
            Share Your Thoughts →
          </Link>
        </div>
      </div>
    </main>
  );
}
