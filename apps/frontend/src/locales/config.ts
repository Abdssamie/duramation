export const defaultLocale = 'en';

export const dictionaries = {
  en: () => import('./dictionaries/en.json').then(module => module.default),
  fr: () => import('./dictionaries/fr.json').then(module => module.default),
  ar: () => import('./dictionaries/ar.json').then(module => module.default)
};

export type Locale = keyof typeof dictionaries;

export const getLocales = () => Object.keys(dictionaries) as Array<Locale>;
