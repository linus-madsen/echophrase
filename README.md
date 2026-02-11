# 🎙️ EchoPhrase

AI-powered shadowing workouts for language learning pronunciation practice.

## What is Shadowing?

Shadowing is a language learning technique where you listen to native speech and immediately repeat it, mimicking the pronunciation, rhythm, and intonation. It's proven to dramatically improve speaking fluency and pronunciation.

## Features

- **6 Languages**: Spanish, French, German, Italian, Portuguese, Japanese
- **AI-Generated Phrases**: Level-appropriate phrases for beginners and intermediate learners
- **Native TTS Audio**: High-quality text-to-speech for accurate pronunciation models
- **Speech Recognition**: Records your voice and transcribes it using Whisper
- **Instant Feedback**: See how your pronunciation compares to the target phrase
- **Streak Tracking**: Stay motivated with local progress tracking

## Tech Stack

- **Next.js 16** with App Router
- **OpenAI TTS** for native audio generation
- **OpenAI Whisper** for speech transcription
- **Tailwind CSS** for styling
- **TypeScript** for type safety

## Getting Started

1. Clone the repo
2. Copy `.env.example` to `.env.local` and add your OpenAI API key
3. Run `npm install`
4. Run `npm run dev`
5. Open http://localhost:3000

## How It Works

1. **Choose a language** from the home screen
2. **Select your level** (Beginner or Intermediate)
3. **Click "Start Workout"** to get a phrase
4. **Listen** to the native pronunciation
5. **Record yourself** saying the phrase
6. **Get feedback** on your pronunciation accuracy
7. **Repeat** to build your streak!

## License

MIT
