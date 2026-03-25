/**
 * @fileoverview QR Code Preview Component
 * @description Displays QR code preview with loading, error, and empty states
 * 
 * @module components/canvas/QrPreview
 * @category Canvas Components
 * @subcategory Preview
 * 
 * @features
 * - QR code image display
 * - Loading state with spinner
 * - Error message display
 * - Empty state with icon and instructions
 * - Fade-in animation on load
 * - Aspect-square responsive container
 * - Dark mode support
 * - Memoized for performance
 * 
 * @props
 * @param {string | null} dataUrl - Base64 encoded QR code image (data:image/png;base64,...)
 * @param {boolean} isGenerating - Loading state indicator
 * @param {string | null} error - Error message if generation failed
 * 
 * @performance
 * - Wrapped with React.memo to prevent unnecessary re-renders
 * - Only re-renders when props change
 * - Lazy image loading
 * 
 * @states
 * 1. Loading: Shows spinner with "Oluşturuluyor..." text
 * 2. Error: Shows error message in red
 * 3. Success: Shows QR code with fade-in animation
 * 4. Empty: Shows smartphone icon with instructions
 * 
 * @dependencies
 * - lucide-react: Smartphone icon
 * - react: memo for optimization
 */

'use client';

import { Smartphone } from 'lucide-react';
import { memo } from 'react';

interface QrPreviewProps {
  dataUrl: string | null;
  isGenerating: boolean;
  error: string | null;
}

const QrPreview = memo(function QrPreview({ dataUrl, isGenerating, error }: QrPreviewProps) {
  return (
    <div className="flex items-center justify-center w-full aspect-square max-w-sm mx-auto rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-900">
      {isGenerating && (
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Oluşturuluyor...</span>
        </div>
      )}

      {!isGenerating && error && <p className="text-sm text-red-500 px-4 text-center">{error}</p>}

      {!isGenerating && !error && dataUrl && (
        <div className="relative w-full h-full p-4">
          <img
            src={dataUrl}
            alt="QR Kod"
            className="relative w-full h-full object-contain animate-in fade-in duration-300"
          />
        </div>
      )}

      {!isGenerating && !error && !dataUrl && (
        <div className="flex flex-col items-center gap-2 text-gray-300 dark:text-gray-600 select-none">
          <Smartphone size={48} strokeWidth={1} />
          <p className="text-sm text-center px-4">Bilgileri girerek QR kodunuzu oluşturun</p>
        </div>
      )}
    </div>
  );
});

export default QrPreview;
