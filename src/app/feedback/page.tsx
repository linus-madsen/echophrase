'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState('');
  const [type, setType] = useState('general');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
      <main className="min-h-screen bg-muted/30 p-8">
        <div className="max-w-2xl mx-auto text-center py-20">
          <span className="text-6xl mb-4 block">🙏</span>
          <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
          <p className="text-muted-foreground mb-8">
            Your feedback helps us make EchoPhrase better for everyone.
          </p>
          <Button asChild>
            <Link href="/">← Back to Practice</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30 p-8">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">← Back to Practice</Link>
        </Button>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Share Your Feedback</CardTitle>
            <CardDescription>
              Help us improve EchoPhrase. We read every piece of feedback carefully.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label>Type of Feedback</Label>
                <RadioGroup value={type} onValueChange={setType} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="general" id="general" />
                    <Label htmlFor="general">💬 General</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="feature" id="feature" />
                    <Label htmlFor="feature">💡 Feature Idea</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bug" id="bug" />
                    <Label htmlFor="bug">🐛 Bug Report</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Your Feedback</Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                  rows={5}
                  placeholder="Tell us what you think..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (optional - for follow-up)</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>

              <Button type="submit" className="w-full">
                Submit Feedback
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
