/**
 * @fileoverview Global Header Component
 * @description Sticky header with logo, theme switcher, and language selector
 * 
 * @module components/layout/Header
 * @category Layout Components
 * 
 * @features
 * - Sticky positioning with backdrop blur
 * - Logo with home navigation
 * - Theme switcher (Light/Dark)
 * - Language switcher (TR/EN)
 * - Responsive design
 * - Dark mode support
 * 
 * @dependencies
 * - next/navigation: Router and params
 * - ./LanguageSwitcher: Language selection dropdown
 * - ./ThemeSwitcher: Theme selection dropdown
 * 
 */

'use client';

import { useRouter, useParams } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) || 'tr';

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <button
          onClick={() => router.push(`/${locale}`)}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img src="/icon-192.png" alt="QR Generator" className="w-7 h-7 rounded-lg" />
          <span className="font-semibold text-gray-900 dark:text-white text-sm">QR Generator</span>
        </button>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
