import { NextRequest, NextResponse } from 'next/server';

// Voice selection based on language for more natural pronunciation
const voiceMap: Record<string, string> = {
  es: 'nova',    // Works well for Spanish
  fr: 'shimmer', // Good for French
  de: 'onyx',    // Good for German
  it: 'nova',    // Works for Italian
  pt: 'nova',    // Works for Portuguese
  ja: 'nova',    // Works for Japanese
};

export async function POST(req: NextRequest) {
  const { text, language } = await req.json();
  
  const voice = voiceMap[language] || 'nova';

  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'tts-1',
      input: text,
      voice: voice,
      speed: 0.9, // Slightly slower for learners
    }),
  });

  const audioBuffer = await response.arrayBuffer();
  
  return new NextResponse(audioBuffer, {
    headers: {
      'Content-Type': 'audio/mpeg',
    },
  });
}
