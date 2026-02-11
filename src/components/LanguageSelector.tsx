'use client';

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
        <button
          key={lang.code}
          onClick={() => onSelect(lang.code)}
          className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 flex flex-col items-center gap-2"
        >
          <span className="text-5xl">{lang.flag}</span>
          <span className="text-lg font-medium text-amber-900">{lang.name}</span>
        </button>
      ))}
    </div>
  );
}
