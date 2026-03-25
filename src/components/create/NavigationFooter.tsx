/**
 * @fileoverview Navigation Footer Component
 * @description Sticky footer with navigation buttons for wizard steps
 * 
 * @module components/create/NavigationFooter
 * @category Create Components
 * 
 * @features
 * - Back button (always visible)
 * - Next/Continue button (steps 1-2)
 * - Skip button (step 2 only)
 * - Sticky bottom positioning
 * - Backdrop blur effect
 * - Safe area insets for iOS
 * - 44px touch targets for accessibility
 * - Dark mode support
 * 
 * @dependencies
 * - next-intl: Translations
 * - lucide-react: Icons
 */

import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, SkipForward } from 'lucide-react';

interface NavigationFooterProps {
  step: number;
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
}

export default function NavigationFooter({ step, onBack, onNext, onSkip }: NavigationFooterProps) {
  const t = useTranslations('create');

  return (
    <footer className="sticky bottom-0 z-30 border-t border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md safe-area-inset-bottom">
      <div className="max-w-5xl mx-auto px-4 h-14 md:h-16 flex items-center justify-between gap-2 md:gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1 md:gap-1.5 px-3 md:px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[44px] touch-manipulation"
        >
          <ArrowLeft size={14} /> {t('back')}
        </button>

        <div className="flex items-center gap-2">
          {step === 2 && (
            <button
              onClick={onSkip}
              className="flex items-center gap-1 md:gap-1.5 px-3 md:px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[44px] touch-manipulation"
            >
              <SkipForward size={14} /> {t('skip')}
            </button>
          )}
          {step < 3 && (
            <button
              onClick={onNext}
              className="flex items-center gap-1.5 md:gap-2 px-4 md:px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors min-h-[44px] touch-manipulation"
            >
              {step === 2 ? t('continue') : t('next')} <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
