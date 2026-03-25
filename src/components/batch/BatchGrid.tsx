/**
 * @fileoverview Batch Grid Component
 * @description Displays grid of generated QR codes from batch operation
 * 
 * @module components/batch/BatchGrid
 * @category Batch Components
 * 
 * @features
 * - Grid layout (2-4 columns responsive)
 * - QR preview thumbnails
 * - Individual download buttons
 * - Bulk ZIP download button
 * - Success/error count display
 * - Error state for failed generations
 * - Empty state handling
 * 
 * @dependencies
 * - @/hooks/useBatch: BatchItem type
 * - @/services/download: Download utilities
 * - next-intl: Translations
 */

'use client';

import { BatchItem } from '@/hooks/useBatch';
import { downloadPng } from '@/services/download';
import { useTranslations } from 'next-intl';

interface BatchGridProps {
  items: BatchItem[];
  onDownloadAll: () => void;
}

export default function BatchGrid({ items, onDownloadAll }: BatchGridProps) {
  const t = useTranslations('batch');
  
  if (!items.length) return null;

  const validCount = items.filter((i) => i.dataUrl).length;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('count', { valid: validCount, total: items.length })}
        </p>
        {validCount > 0 && (
          <button
            onClick={onDownloadAll}
            className="text-sm px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
          >
            ⬇️ {t('downloadZip')}
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-1 p-2 rounded-xl border border-gray-100 dark:border-gray-800"
          >
            {item.dataUrl ? (
              <>
                <img
                  src={item.dataUrl}
                  alt={item.input}
                  className="w-full aspect-square object-contain rounded-lg bg-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.input}</p>
                <button
                  onClick={() => downloadPng(item.dataUrl!, `qrcode-${idx + 1}`)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline text-left"
                >
                  ⬇️ {t('download')}
                </button>
              </>
            ) : (
              <div className="w-full aspect-square flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/20">
                <p className="text-xs text-red-500 text-center px-1">{item.error}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
