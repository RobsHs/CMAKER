/**
 * Localization Types
 */

export type SupportedLocale = 'en' | 'id';

export interface LocaleInfo {
  code: SupportedLocale;
  name: string;
  flag: string;
}

export const SUPPORTED_LOCALES: LocaleInfo[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' }
];
