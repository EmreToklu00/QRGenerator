/**
 * @fileoverview Action Buttons Component
 * @description Download, copy, print, and share buttons for QR codes
 * 
 * @module components/output/ActionButtons
 * @category Output Components
 * 
 * @features
 * - Download PNG button
 * - Download SVG button
 * - Copy to clipboard with success feedback
 * - Print button
 * - Native share button (if supported)
 * - Icon indicators for each action
 * - Disabled state when no QR code
 * 
 * @dependencies
 * - @/services/download: Download utilities
 * - @/services/print: Print functionality
 * - @/services/qr: SVG generation
 * - @/hooks/useClipboard: Clipboard operations
 * - @/hooks/useShare: Native share API
 * - lucide-react: Icons
 * - next-intl: Translations
 */

'use client';

import { Download, Copy, Check, Printer, Share2 } from 'lucide-react';
import { downloadPng, downloadSvg } from '@/services/download';
import { printQr } from '@/services/print';
import { generateSvgString } from '@/services/qr';
import { useClipboard } from '@/hooks/useClipboard';
import { useShare } from '@/hooks/useShare';
import { QrStyle } from '@/constants/templatePresets';
import { useTranslations } from 'next-intl';

interface ActionButtonsProps {
  dataUrl: string | null;
  qrData: string;
  style: QrStyle;
}

export default function ActionButtons({ dataUrl, qrData, style }: ActionButtonsProps) {
  const t = useTranslations('actions');
  const { copy, copied } = useClipboard();
  const { share, isSupported } = useShare();

  if (!dataUrl) return null;

  const handleSvg = async () => {
    const svg = await generateSvgString(qrData, style);
    downloadSvg(svg, 'qrcode').catch();
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => downloadPng(dataUrl, 'qrcode')}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
      >
        <Download size={14} /> {t('downloadPng')}
      </button>
      <button
        onClick={handleSvg}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
      >
        <Download size={14} /> {t('downloadSvg')}
      </button>
      <button
        onClick={() => copy(dataUrl)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
      >
        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
        {copied ? t('copied') : t('copy')}
      </button>
      <button
        onClick={() => printQr(dataUrl)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
      >
        <Printer size={14} /> {t('print')}
      </button>
      {isSupported && (
        <button
          onClick={() => share(dataUrl)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
        >
          <Share2 size={14} /> {t('share')}
        </button>
      )}
    </div>
  );
}
