'use client';

import { useState, useRef, useEffect } from 'react';

interface Props {
  language: string;
  level: 'beginner' | 'intermediate';
}

interface Phrase {
  text: string;
  translation: string;
}

export default function ShadowingWorkout({ language, level }: Props) {
  const [phrase, setPhrase] = useState<Phrase | null>(null);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [userTranscript, setUserTranscript] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    // Load streak from localStorage
    const saved = localStorage.getItem('echophrase-streak');
    if (saved) setStreak(parseInt(saved, 10));
  }, []);

  const fetchPhrase = async () => {
    setLoading(true);
    setUserTranscript(null);
    setScore(null);
    setAudioUrl(null);
    
    try {
      const res = await fetch('/api/phrase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, level }),
      });
      const data = await res.json();
      setPhrase(data);
      
      // Generate TTS
      const ttsRes = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: data.text, language }),
      });
      const audioBlob = await ttsRes.blob();
      setAudioUrl(URL.createObjectURL(audioBlob));
    } catch (err) {
      console.error('Error fetching phrase:', err);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        stream.getTracks().forEach(track => track.stop());
        
        // Send to transcription API
        const formData = new FormData();
        formData.append('audio', blob);
        formData.append('language', language);
        
        try {
          const res = await fetch('/api/transcribe', {
            method: 'POST',
            body: formData,
          });
          const data = await res.json();
          setUserTranscript(data.text);
          
          // Calculate similarity score
          const similarity = calculateSimilarity(
            phrase?.text.toLowerCase() || '',
            data.text.toLowerCase()
          );
          setScore(Math.round(similarity * 100));
          
          // Update streak if good score
          if (similarity >= 0.7) {
            const newStreak = streak + 1;
            setStreak(newStreak);
            localStorage.setItem('echophrase-streak', newStreak.toString());
          }
        } catch (err) {
          console.error('Transcription error:', err);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Microphone access denied:', err);
      alert('Please allow microphone access to record your voice.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Levenshtein-based similarity
  const calculateSimilarity = (a: string, b: string): number => {
    const aWords = a.split(/\s+/).filter(Boolean);
    const bWords = b.split(/\s+/).filter(Boolean);
    
    if (aWords.length === 0 && bWords.length === 0) return 1;
    if (aWords.length === 0 || bWords.length === 0) return 0;
    
    let matches = 0;
    for (const word of bWords) {
      if (aWords.some(w => w.includes(word) || word.includes(w))) {
        matches++;
      }
    }
    
    return matches / Math.max(aWords.length, bWords.length);
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return '🌟';
    if (score >= 70) return '✨';
    if (score >= 50) return '👍';
    return '💪';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Perfect!';
    if (score >= 70) return 'Great job!';
    if (score >= 50) return 'Good effort!';
    return 'Keep practicing!';
  };

  return (
    <div className="space-y-6">
      {/* Streak display */}
      <div className="flex justify-center">
        <div className="bg-amber-200 px-4 py-2 rounded-full flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <span className="font-bold text-amber-900">{streak} streak</span>
        </div>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-3xl shadow-xl p-8">
        {!phrase ? (
          <div className="text-center py-12">
            <button
              onClick={fetchPhrase}
              disabled={loading}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-2xl text-xl transition-all hover:scale-105 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Start Workout 🎯'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Phrase display */}
            <div className="text-center">
              <p className="text-3xl font-medium text-amber-900 mb-2">{phrase.text}</p>
              <p className="text-lg text-amber-600">{phrase.translation}</p>
            </div>

            {/* Audio player */}
            {audioUrl && (
              <>
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onEnded={() => setIsPlaying(false)}
                  className="hidden"
                />
                <div className="flex justify-center">
                  <button
                    onClick={playAudio}
                    disabled={isPlaying}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 disabled:opacity-50"
                  >
                    {isPlaying ? '🔊 Playing...' : '▶️ Listen'}
                  </button>
                </div>
              </>
            )}

            {/* Recording controls */}
            <div className="flex justify-center">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2"
                >
                  🎤 Record Your Voice
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 animate-pulse"
                >
                  ⏹️ Stop Recording
                </button>
              )}
            </div>

            {/* Results */}
            {userTranscript !== null && (
              <div className="border-t pt-6 space-y-4">
                <div className="text-center">
                  <p className="text-lg text-gray-600 mb-1">You said:</p>
                  <p className="text-xl font-medium text-gray-800">{userTranscript || '(no speech detected)'}</p>
                </div>
                
                {score !== null && (
                  <div className="text-center bg-amber-50 rounded-2xl p-6">
                    <span className="text-5xl">{getScoreEmoji(score)}</span>
                    <p className="text-3xl font-bold text-amber-900 mt-2">{score}%</p>
                    <p className="text-amber-700">{getScoreMessage(score)}</p>
                  </div>
                )}
              </div>
            )}

            {/* Next phrase button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={fetchPhrase}
                disabled={loading}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Next Phrase →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
