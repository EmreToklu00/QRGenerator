/**
 * @fileoverview Native Share Hook
 * @description Shares QR code images using Web Share API
 * 
 * @module hooks/useShare
 * @category Utility Hooks
 * 
 * @features
 * - Native share dialog on mobile/desktop
 * - Shares PNG files
 * - Feature detection for API support
 * - Graceful handling of user cancellation
 */

'use client';

import { useCallback } from 'react';

export function useShare() {
  const isSupported = typeof navigator !== 'undefined' && !!navigator.share;

  const share = useCallback(
    async (dataUrl: string, title = 'QR Code') => {
      if (!isSupported) return;
      try {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], 'qrcode.png', { type: 'image/png' });
        await navigator.share({ title, files: [file] });
      } catch {
      }
    },
    [isSupported]
  );

  return { share, isSupported };
}
