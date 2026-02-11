'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
          
          const similarity = calculateSimilarity(
            phrase?.text.toLowerCase() || '',
            data.text.toLowerCase()
          );
          setScore(Math.round(similarity * 100));
          
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
        <Badge variant="secondary" className="text-lg px-4 py-2">
          🔥 {streak} streak
        </Badge>
      </div>

      {/* Main card */}
      <Card className="shadow-xl">
        <CardContent className="p-8">
          {!phrase ? (
            <div className="text-center py-12">
              <Button
                size="lg"
                onClick={fetchPhrase}
                disabled={loading}
                className="text-xl px-8 py-6"
              >
                {loading ? 'Loading...' : 'Start Workout 🎯'}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Phrase display */}
              <div className="text-center">
                <p className="text-3xl font-medium mb-2">{phrase.text}</p>
                <p className="text-lg text-muted-foreground">{phrase.translation}</p>
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
                    <Button
                      variant="secondary"
                      onClick={playAudio}
                      disabled={isPlaying}
                    >
                      {isPlaying ? '🔊 Playing...' : '▶️ Listen'}
                    </Button>
                  </div>
                </>
              )}

              {/* Recording controls */}
              <div className="flex justify-center">
                {!isRecording ? (
                  <Button
                    variant="destructive"
                    onClick={startRecording}
                  >
                    🎤 Record Your Voice
                  </Button>
                ) : (
                  <Button
                    variant="destructive"
                    onClick={stopRecording}
                    className="animate-pulse"
                  >
                    ⏹️ Stop Recording
                  </Button>
                )}
              </div>

              {/* Results */}
              {userTranscript !== null && (
                <div className="border-t pt-6 space-y-4">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-1">You said:</p>
                    <p className="text-xl font-medium">{userTranscript || '(no speech detected)'}</p>
                  </div>
                  
                  {score !== null && (
                    <Alert className="text-center">
                      <AlertDescription>
                        <span className="text-5xl block mb-2">{getScoreEmoji(score)}</span>
                        <p className="text-3xl font-bold">{score}%</p>
                        <p className="text-muted-foreground">{getScoreMessage(score)}</p>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}

              {/* Next phrase button */}
              <div className="flex justify-center pt-4">
                <Button
                  onClick={fetchPhrase}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Next Phrase →'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
