/**
 * @fileoverview Template Selector Component
 * @description Displays and applies pre-made QR style templates
 * 
 * @module components/templates/TemplateSelector
 * @category Template Components
 * 
 * @features
 * - 12 pre-made templates
 * - Mini QR preview showing colors
 * - One-click template application
 * - Hover effects
 * - Dark mode support
 * 
 * @dependencies
 * - @/constants/templatePresets: Template definitions
 * - @/services/templates: Template application logic
 * - next-intl: Translations
 */

'use client';

import { TEMPLATES } from '@/constants/templatePresets';
import { QrStyle } from '@/constants/templatePresets';
import { applyTemplate } from '@/services/templates';
import { useTranslations } from 'next-intl';

interface TemplateSelectorProps {
  currentStyle: QrStyle;
  onApply: (style: QrStyle) => void;
}

export default function TemplateSelector({ currentStyle, onApply }: TemplateSelectorProps) {
  const t = useTranslations('create');
  
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('templates')}</p>
      <div className="flex flex-wrap gap-2">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => onApply(applyTemplate(t.id, currentStyle))}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors group"
            title={t.label}
          >
            <div className="flex flex-col gap-0.5">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-0.5">
                  {[...Array(3)].map((_, j) => (
                    <div
                      key={j}
                      className="w-2 h-2 rounded-sm"
                      style={{
                        backgroundColor:
                          (i === 0 && j === 0) ||
                          (i === 0 && j === 2) ||
                          (i === 2 && j === 0) ||
                          (i === 1 && j === 1)
                            ? t.style.darkColor
                            : t.style.lightColor === 'transparent'
                              ? 'transparent'
                              : t.style.lightColor,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              {t.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
