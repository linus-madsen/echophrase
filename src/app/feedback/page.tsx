'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState('');
  const [type, setType] = useState<'bug' | 'feature' | 'general'>('general');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store feedback (will be sent to API)
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, feedback, email, timestamp: new Date().toISOString() }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit feedback:', err);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
        <div className="max-w-2xl mx-auto text-center py-20">
          <span className="text-6xl mb-4 block">🙏</span>
          <h1 className="text-3xl font-bold text-amber-900 mb-4">Thank You!</h1>
          <p className="text-amber-700 mb-8">
            Your feedback helps us make EchoPhrase better for everyone.
          </p>
          <Link href="/" className="text-amber-600 hover:text-amber-800 underline">
            ← Back to Practice
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-amber-700 hover:text-amber-900 mb-8 inline-block">
          ← Back to Practice
        </Link>
        
        <h1 className="text-4xl font-bold text-amber-900 mb-4">Share Your Feedback</h1>
        <p className="text-amber-700 mb-8">
          Help us improve EchoPhrase. We read every piece of feedback carefully.
        </p>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div>
            <label className="block text-amber-900 font-medium mb-2">Type of Feedback</label>
            <div className="flex gap-4">
              {(['general', 'feature', 'bug'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={\`px-4 py-2 rounded-lg capitalize \${
                    type === t
                      ? 'bg-amber-500 text-white'
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }\`}
                >
                  {t === 'bug' ? '🐛 Bug Report' : t === 'feature' ? '💡 Feature Idea' : '💬 General'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-amber-900 font-medium mb-2">Your Feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
              rows={5}
              placeholder="Tell us what you think..."
              className="w-full p-4 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-amber-900 font-medium mb-2">
              Email (optional - for follow-up)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full p-4 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-all"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </main>
  );
}
