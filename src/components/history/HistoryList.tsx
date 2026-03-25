/**
 * @fileoverview History List Component
 * @description Displays recent QR code history with preview and actions
 * 
 * @module components/history/HistoryList
 * @category History Components
 * 
 * @features
 * - List of last 10 QR codes
 * - QR preview thumbnails
 * - Type icon and label
 * - Data preview (truncated)
 * - Click to select and prefill
 * - Remove individual items
 * - Clear all history
 * - Hover effects
 * - Empty state handling
 * 
 * @dependencies
 * - @/hooks/useHistory: HistoryItem type
 * - @/constants/qrTypes: QR type definitions
 * - lucide-react: Icons
 */

'use client';

import { X, Trash2 } from 'lucide-react';
import { HistoryItem } from '@/hooks/useHistory';
import { QR_TYPES } from '@/constants/qrTypes';

interface HistoryListProps {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function HistoryList({ items, onSelect, onRemove, onClear }: HistoryListProps) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Son Oluşturulanlar</p>
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={12} /> Temizle
        </button>
      </div>
      <div className="flex flex-col gap-1">
        {items.map((item) => {
          const typeDef = QR_TYPES.find((t) => t.id === item.type);
          const Icon = typeDef?.icon;
          const preview = Object.values(item.data).filter(Boolean)[0] || '';
          return (
            <div
              key={item.id}
              className="flex items-center gap-2 p-2 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group"
            >
              <img
                src={item.dataUrl}
                alt="QR"
                className="w-10 h-10 rounded object-contain bg-white"
              />
              <button onClick={() => onSelect(item)} className="flex-1 text-left min-w-0">
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                  {Icon && <Icon size={11} />} {typeDef?.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{preview}</p>
              </button>
              <button
                onClick={() => onRemove(item.id)}
                className="text-gray-300 dark:text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
