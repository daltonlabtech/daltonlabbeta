import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import ptTranslation from '@/locales/pt/translation.json';
import enTranslation from '@/locales/en/translation.json';
import esTranslation from '@/locales/es/translation.json';
import frTranslation from '@/locales/fr/translation.json';
import deTranslation from '@/locales/de/translation.json';
import itTranslation from '@/locales/it/translation.json';
import zhTranslation from '@/locales/zh/translation.json';
import jaTranslation from '@/locales/ja/translation.json';

export const supportedLanguages = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
] as const;

export type SupportedLanguage = typeof supportedLanguages[number]['code'];

const resources = {
  pt: { translation: ptTranslation },
  en: { translation: enTranslation },
  es: { translation: esTranslation },
  fr: { translation: frTranslation },
  de: { translation: deTranslation },
  it: { translation: itTranslation },
  zh: { translation: zhTranslation },
  ja: { translation: jaTranslation },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    supportedLngs: supportedLanguages.map(lang => lang.code),
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    
    interpolation: {
      escapeValue: false,
    },
    
    react: {
      useSuspense: false,
    },
  });

// Update HTML lang attribute when language changes
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

// Set initial lang attribute
if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language || 'pt';
}

export default i18n;
