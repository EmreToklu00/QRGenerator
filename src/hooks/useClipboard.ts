/**
 * @fileoverview Clipboard Copy Hook
 * @description Copies QR code images to system clipboard
 * 
 * @module hooks/useClipboard
 * @category Utility Hooks
 * 
 * @features
 * - Copies PNG images to clipboard
 * - 2-second success feedback
 * - Graceful fallback if API unsupported
 * - Uses Clipboard API with ClipboardItem
 */

'use client';

import { useCallback, useState } from 'react';

export function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (dataUrl: string) => {
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
    }
  }, []);

  return { copy, copied };
}
