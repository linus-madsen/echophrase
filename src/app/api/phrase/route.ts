import { NextRequest, NextResponse } from 'next/server';

const languageNames: Record<string, string> = {
  es: 'Spanish',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  pt: 'Portuguese',
  ja: 'Japanese',
};

export async function POST(req: NextRequest) {
  const { language, level } = await req.json();
  
  const langName = languageNames[language] || 'Spanish';
  const difficulty = level === 'beginner' 
    ? 'very simple, 3-6 words, common vocabulary' 
    : 'moderate complexity, 6-12 words, varied vocabulary';

  const prompt = `Generate a single ${langName} phrase for language learning shadowing practice.

Requirements:
- Level: ${difficulty}
- Topic: everyday situations (greetings, shopping, travel, food, small talk)
- Must be natural and commonly used by native speakers
- Include the English translation

Respond in JSON format exactly like this:
{"text": "the phrase in ${langName}", "translation": "the English translation"}

Only output the JSON, nothing else.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9,
    }),
  });

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  try {
    const parsed = JSON.parse(content);
    return NextResponse.json(parsed);
  } catch {
    // Fallback if parsing fails
    return NextResponse.json({
      text: 'Hola, ¿cómo estás?',
      translation: 'Hello, how are you?',
    });
  }
}
