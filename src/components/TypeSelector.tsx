/**
 * @fileoverview Type Selector Component
 * @description Pill-style buttons for selecting QR type
 * 
 * @module components/TypeSelector
 * @category UI Components
 * 
 * @features
 * - 9 QR type buttons
 * - Icon + label for each type
 * - Active state highlighting
 * - Pill-shaped design
 * - Responsive flex wrap
 * - Dark mode support
 */

'use client';

import { QrType, QR_TYPES } from '@/constants/qrTypes';

interface TypeSelectorProps {
  selected: QrType;
  onChange: (type: QrType) => void;
}

export default function TypeSelector({ selected, onChange }: TypeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {QR_TYPES.map((t) => {
        const Icon = t.icon;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors
              ${
                selected === t.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            <Icon size={14} />
            <span>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}
