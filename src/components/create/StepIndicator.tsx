/**
 * @fileoverview Step Indicator Component
 * @description Visual progress indicator for 3-step wizard
 * 
 * @module components/create/StepIndicator
 * @category Create Components
 * 
 * @features
 * - 3 steps: Info, Style, Output
 * - Current step highlighting
 * - Completed step checkmarks
 * - Progress line between steps
 * - Responsive design (mobile/desktop)
 * - Dark mode support
 */

import { useTranslations } from 'next-intl';

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const t = useTranslations('create');

  return (
    <div className="flex items-center gap-1 md:gap-2 overflow-x-auto pb-2 md:pb-0">
      {[1, 2, 3].map((s, i) => (
        <div key={s} className="flex items-center gap-1 md:gap-2 flex-1 min-w-0">
          <div className="flex items-center gap-1 md:gap-2 min-w-0">
            <div
              className={`w-8 h-8 md:w-6 md:h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors flex-shrink-0
              ${currentStep === s ? 'bg-indigo-600 text-white' : currentStep > s ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}
            >
              {currentStep > s ? '✓' : s}
            </div>
            <span
              className={`text-xs font-medium transition-colors truncate ${currentStep === s ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400 dark:text-gray-600'}`}
            >
              {t(`steps.${s === 1 ? 'info' : s === 2 ? 'style' : 'output'}`)}
            </span>
          </div>
          {i < 2 && (
            <div
              className={`flex-1 h-px transition-colors ${currentStep > s ? 'bg-indigo-200 dark:bg-indigo-800' : 'bg-gray-100 dark:bg-gray-800'}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
