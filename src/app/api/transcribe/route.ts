import { NextRequest, NextResponse } from 'next/server';

const languageCodes: Record<string, string> = {
  es: 'es',
  fr: 'fr',
  de: 'de',
  it: 'it',
  pt: 'pt',
  ja: 'ja',
};

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const audio = formData.get('audio') as Blob;
  const language = formData.get('language') as string;
  
  if (!audio) {
    return NextResponse.json({ error: 'No audio provided' }, { status: 400 });
  }

  // Convert to File for OpenAI API
  const audioFile = new File([audio], 'recording.webm', { type: 'audio/webm' });
  
  const whisperFormData = new FormData();
  whisperFormData.append('file', audioFile);
  whisperFormData.append('model', 'whisper-1');
  whisperFormData.append('language', languageCodes[language] || 'es');

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: whisperFormData,
  });

  const data = await response.json();
  
  return NextResponse.json({ text: data.text || '' });
}
