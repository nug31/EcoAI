import { useLanguage } from '../contexts/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
      >
        <span className="text-lg">
          {language === 'en' ? '🇮🇩' : '🇺🇸'}
        </span>
        <span className="text-white">
          {language === 'en' ? 'ID' : 'EN'}
        </span>
      </button>
    </div>
  );
}
