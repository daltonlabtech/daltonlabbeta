import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Only PT is bundled; other languages are lazy-loaded on demand
import ptTranslation from '@/locales/pt/translation.json';

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

const lazyLanguageLoaders: Record<string, () => Promise<{ default: Record<string, unknown> }>> = {
  en: () => import('@/locales/en/translation.json'),
  es: () => import('@/locales/es/translation.json'),
  fr: () => import('@/locales/fr/translation.json'),
  de: () => import('@/locales/de/translation.json'),
  it: () => import('@/locales/it/translation.json'),
  zh: () => import('@/locales/zh/translation.json'),
  ja: () => import('@/locales/ja/translation.json'),
};

const resources = {
  pt: { translation: ptTranslation },
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

// Lazy-load non-PT languages on demand
i18n.on('languageChanged', async (lng) => {
  document.documentElement.lang = lng;
  
  if (lng !== 'pt' && !i18n.hasResourceBundle(lng, 'translation')) {
    const loader = lazyLanguageLoaders[lng];
    if (loader) {
      const module = await loader();
      i18n.addResourceBundle(lng, 'translation', module.default, true, true);
    }
  }
});

// If browser detected a non-PT language, load it now
const detectedLng = i18n.language;
if (detectedLng && detectedLng !== 'pt' && !i18n.hasResourceBundle(detectedLng, 'translation')) {
  const loader = lazyLanguageLoaders[detectedLng];
  if (loader) {
    loader().then((module) => {
      i18n.addResourceBundle(detectedLng, 'translation', module.default, true, true);
      i18n.changeLanguage(detectedLng);
    });
  }
}

// Set initial lang attribute
if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language || 'pt';
}

export default i18n;
