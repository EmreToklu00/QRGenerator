/**
 * @fileoverview Theme Switcher Component
 * @description Dropdown for switching between Light and Dark themes
 * 
 * @module components/layout/ThemeSwitcher
 * @category Layout Components
 * @subcategory Switchers
 * 
 * @features
 * - Click-based dropdown (mobile-friendly)
 * - LocalStorage persistence (theme key)
 * - Default theme: Light
 * - Theme options: Light, Dark
 * - Icon indicators (Sun, Moon)
 * - Active theme highlighting
 * - Backdrop for mobile
 * - Smooth transitions (0.3s)
 * - Dark mode support
 * 
 * @state
 * @property {boolean} isOpen - Dropdown open/close state
 * 
 * @localstorage
 * - Key: 'theme'
 * - Values: 'light' | 'dark'
 * - Default: 'light'
 * 
 * @dependencies
 * - lucide-react: Moon, Sun, ChevronDown icons
 * - @/hooks/useTheme: Theme state management
 */

'use client';

import { useState } from 'react';
import { Moon, Sun, ChevronDown } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const THEME_NAMES = {
  light: { icon: Sun, label: 'Light' },
  dark: { icon: Moon, label: 'Dark' },
} as const;

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentTheme = THEME_NAMES[theme as 'light' | 'dark'] || THEME_NAMES.light;
  const CurrentIcon = currentTheme.icon;

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Tema seç"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <CurrentIcon size={14} />
        <span className="hidden sm:inline">{currentTheme.label}</span>
        <ChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 sm:hidden" onClick={() => setIsOpen(false)} />

          <div className="absolute right-0 top-full mt-1 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 min-w-[120px]">
            {(Object.keys(THEME_NAMES) as Array<keyof typeof THEME_NAMES>).map((themeKey) => {
              const { icon: Icon, label } = THEME_NAMES[themeKey];
              return (
                <button
                  key={themeKey}
                  onClick={() => handleThemeChange(themeKey)}
                  className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 ${
                    themeKey === theme
                      ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
