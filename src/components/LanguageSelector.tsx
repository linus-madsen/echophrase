'use client';

import { Card, CardContent } from '@/components/ui/card';

interface LanguageSelectorProps {
  onSelect: (language: string) => void;
}

const languages = [
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
];

export default function LanguageSelector({ onSelect }: LanguageSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {languages.map((lang) => (
        <Card
          key={lang.code}
          className="cursor-pointer hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-primary"
          onClick={() => onSelect(lang.code)}
        >
          <CardContent className="p-6 flex flex-col items-center gap-2">
            <span className="text-5xl">{lang.flag}</span>
            <span className="text-lg font-medium">{lang.name}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
