/**
 * @fileoverview Theme Management Hook
 * @description Manages light/dark theme with localStorage persistence
 * 
 * @module hooks/useTheme
 * @category UI Hooks
 * 
 * @features
 * - Light/Dark mode toggle
 * - Persistent storage with localStorage
 * - Smooth transitions (300ms)
 * - SSR-safe with mounted check
 * - Default: light theme
 * 
 * @storage
 * - Key: 'theme'
 * - Values: 'light' | 'dark'
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((themeToApply: Theme) => {
    const root = document.documentElement;

    root.style.setProperty('transition', 'background-color 0.3s ease, color 0.3s ease');

    if (themeToApply === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    setTimeout(() => {
      root.style.removeProperty('transition');
    }, 300);
  }, []);

  useEffect(() => {
    setMounted(true);

    const stored = localStorage.getItem('theme') as Theme | null;
    const initial = stored || 'light';
    setThemeState(initial);
    applyTheme(initial);
  }, [applyTheme]);

  const setTheme = useCallback(
    (mode: Theme) => {
      if (!mounted) return;
      setThemeState(mode);
      localStorage.setItem('theme', mode);
      applyTheme(mode);
    },
    [mounted, applyTheme]
  );

  return { theme, setTheme };
}
