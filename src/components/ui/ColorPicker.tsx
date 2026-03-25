/**
 * @fileoverview Color Picker Component
 * @description Color input with optional transparent checkbox
 * 
 * @module components/ui/ColorPicker
 * @category UI Components
 * 
 * @features
 * - Native color picker input
 * - Optional transparent checkbox
 * - Hex color display
 * - Disabled state when transparent
 * - Dark mode support
 * 
 * @dependencies
 * - next-intl: Translations
 */

'use client';

import { useTranslations } from 'next-intl';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  allowTransparent?: boolean;
}

export default function ColorPicker({
  label,
  value,
  onChange,
  allowTransparent,
}: ColorPickerProps) {
  const t = useTranslations('controls');
  const isTransparent = value === 'transparent';

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={isTransparent ? '#ffffff' : value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isTransparent}
          className="w-9 h-9 rounded cursor-pointer border border-gray-300 dark:border-gray-600 disabled:opacity-40"
        />
        {allowTransparent && (
          <label className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              checked={isTransparent}
              onChange={(e) => onChange(e.target.checked ? 'transparent' : '#ffffff')}
              className="rounded"
            />
            {t('transparent')}
          </label>
        )}
        {!isTransparent && (
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{value}</span>
        )}
      </div>
    </div>
  );
}
