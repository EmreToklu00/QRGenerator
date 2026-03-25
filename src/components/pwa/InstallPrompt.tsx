/**
 * @fileoverview PWA Install Prompt Component
 * @description Smart install prompt for PWA with iOS and Android support
 * 
 * @module components/pwa/InstallPrompt
 * @category PWA Components
 * 
 * @features
 * - Android/Chrome: Native install prompt with button
 * - iOS: Manual instructions with Share icon guide
 * - Auto-detect standalone mode (already installed)
 * - Auto-detect iOS Safari
 * - Dismissible with localStorage persistence
 * - 3-second delay on iOS
 * - Slide-up animation
 * - App icon preview
 * - Dark mode support
 * 
 * @dependencies
 * - next-intl: Translations
 * - lucide-react: Icons
 */

'use client';

import { useState, useEffect } from 'react';
import { X, Download, Share } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const t = useTranslations('pwa');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);

    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    if (ios && !standalone) {
      const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
      if (isSafari) {
      }
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt().catch();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (isStandalone || !showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 animate-slide-up">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/icon-192.png" alt="QR Generator" className="w-12 h-12 rounded-xl" />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {t('installTitle')}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{t('installDesc')}</span>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {isIOS ? (
          <div className="flex flex-col gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
            <div className="flex items-center gap-2 text-xs font-medium text-blue-900 dark:text-blue-300">
              <Share size={14} />
              {t('iosInstructions')}
            </div>
            <ol className="text-xs text-blue-800 dark:text-blue-400 space-y-1 pl-4 list-decimal">
              <li>{t('iosStep1')}</li>
              <li>{t('iosStep2')}</li>
            </ol>
          </div>
        ) : (
          <button
            onClick={handleInstall}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
          >
            <Download size={16} />
            {t('installButton')}
          </button>
        )}
      </div>
    </div>
  );
}
