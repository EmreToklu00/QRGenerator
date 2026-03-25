/**
 * @fileoverview Language Switcher Component
 * @description Dropdown for switching between Turkish and English
 * 
 * @module components/layout/LanguageSwitcher
 * @category Layout Components
 * @subcategory Switchers
 * 
 * @features
 * - Click-based dropdown (mobile-friendly)
 * - LocalStorage persistence (user-locale key)
 * - Default language: English
 * - Responsive labels (full name on desktop, short code on mobile)
 * - Active language highlighting
 * - Backdrop for mobile
 * - Smooth transitions
 * - Dark mode support
 * 
 * @state
 * @property {boolean} isOpen - Dropdown open/close state
 * 
 * @localstorage
 * - Key: 'user-locale'
 * - Values: 'tr' | 'en'
 * - Default: 'en'
 * 
 * @dependencies
 * - next/navigation: Router, pathname, params
 * - lucide-react: Globe, ChevronDown icons
 * - @/i18n: Locale types and list
 */

'use client';

import { useState, useEffect } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { Globe, ChevronDown } from 'lucide-react';
import { locales, type Locale } from '@/i18n';

const LOCALE_NAMES: Record<Locale, { full: string; short: string }> = {
  tr: { full: 'Türkçe', short: 'TR' },
  en: { full: 'English', short: 'EN' },
};

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = (params.locale as Locale) || 'en';
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // First load: if no preference in localStorage, default to English
    const stored = localStorage.getItem('user-locale');
    if (!stored) {
      localStorage.setItem('user-locale', 'en');

      if (currentLocale !== 'en') {
        const segments = pathname.split('/').filter(Boolean);
        if (locales.includes(segments[0] as Locale)) {
          segments[0] = 'en';
        } else {
          segments.unshift('en');
        }
        router.replace('/' + segments.join('/'));
      }
    }
  }, [currentLocale, pathname, router]);

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    localStorage.setItem('user-locale', newLocale);

    const segments = pathname.split('/').filter(Boolean);
    if (locales.includes(segments[0] as Locale)) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    setIsOpen(false);
    router.replace('/' + segments.join('/'));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <Globe size={14} />
        <span className="hidden sm:inline">{LOCALE_NAMES[currentLocale].full}</span>
        <span className="sm:hidden font-medium">{LOCALE_NAMES[currentLocale].short}</span>
        <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 sm:hidden" onClick={() => setIsOpen(false)} />

          <div className="absolute right-0 top-full mt-1 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[120px]">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => switchLocale(locale)}
                className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  locale === currentLocale
                    ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="hidden sm:inline">{LOCALE_NAMES[locale].full}</span>
                <span className="sm:hidden">{LOCALE_NAMES[locale].short}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
