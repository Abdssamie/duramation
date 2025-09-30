import 'server-only';
import { cookies } from 'next/headers'
import { defaultLocale, getLocales, dictionaries, type Locale } from '@/locales/config'

export const getLocale = async (): Promise<Locale> => {
  const cookiesStore = await cookies();
  const localeCookies = cookiesStore.get('locale')?.value ?? defaultLocale;

  if (!getLocales().includes(localeCookies as Locale)) {
    return defaultLocale;
  }

  return localeCookies as Locale;
};

export const getDictionary = async () => {
  const locale = await getLocale()
  return dictionaries[locale]()
};