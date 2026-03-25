/**
 * @fileoverview Internationalization Configuration
 * @description next-intl configuration for multi-language support
 * 
 * @module i18n
 * @category Configuration
 * 
 * @features
 * - Supported locales: tr (Turkish), en (English)
 * - Default locale: en
 * - Dynamic message loading from JSON files
 * - Type-safe locale definitions
 * 
 * @locales
 * - tr: Turkish translations (src/locales/tr.json)
 * - en: English translations (src/locales/en.json)
 */

import { getRequestConfig } from 'next-intl/server';

export const locales = ['tr', 'en'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
