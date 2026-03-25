/**
 * @fileoverview QR Code Generator Hook
 * @description Main hook for managing QR code generation state and operations
 * 
 * @module hooks/useQrGenerator
 * @category Core Hooks
 * 
 * @features
 * - QR code generation with debouncing (150ms)
 * - Style management (colors, gradients, patterns)
 * - Logo upload and customization
 * - Frame text support
 * - Auto-regeneration on style changes
 * - Error handling and loading states
 * 
 * @performance
 * - Debounced regeneration to prevent excessive renders
 * - Memoized callbacks to prevent unnecessary re-renders
 * - Ref-based data storage to avoid stale closures
 */

'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { QrStyle, DEFAULT_STYLE } from '@/constants/templatePresets';
import { generateQrDataUrl } from '@/services/qr';

export interface QrState {
  dataUrl: string | null;
  style: QrStyle;
  logoDataUrl: string | null;
  logoPadding: number;
  logoPaddingColor: string;
  logoPaddingRadius: number;
  frameText: string;
  isGenerating: boolean;
  error: string | null;
}

export function useQrGenerator() {
  const [state, setState] = useState<QrState>({
    dataUrl: null,
    style: DEFAULT_STYLE,
    logoDataUrl: null,
    logoPadding: 16,
    logoPaddingColor: 'transparent',
    logoPaddingRadius: 50,
    frameText: '',
    isGenerating: false,
    error: null,
  });

  const qrDataRef = useRef<string>('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const regenerate = useCallback(
    (
      data: string,
      style: QrStyle,
      logoDataUrl: string | null,
      logoPadding: number,
      logoPaddingColor: string,
      logoPaddingRadius: number,
      frameText: string
    ) => {
      if (!data) return;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        setState((s) => ({ ...s, isGenerating: true, error: null }));
        try {
          const dataUrl = await generateQrDataUrl({
            data,
            style,
            logoDataUrl: logoDataUrl ?? undefined,
            logoPadding,
            logoPaddingColor,
            logoPaddingRadius,
            frameText: frameText || undefined,
          });
          setState((s) => ({ ...s, dataUrl, isGenerating: false }));
        } catch {
          setState((s) => ({ ...s, error: 'Failed to generate QR code', isGenerating: false }));
        }
      }, 150);
    },
    []
  );

  useEffect(() => {
    if (!qrDataRef.current) return;
    regenerate(
      qrDataRef.current,
      state.style,
      state.logoDataUrl,
      state.logoPadding,
      state.logoPaddingColor,
      state.logoPaddingRadius,
      state.frameText
    );
  }, [
    state.style,
    state.logoDataUrl,
    state.logoPadding,
    state.logoPaddingColor,
    state.logoPaddingRadius,
    state.frameText,
  ]);

  const generate = useCallback(
    async (qrData: string) => {
      if (!qrData) return;
      qrDataRef.current = qrData;
      regenerate(
        qrData,
        state.style,
        state.logoDataUrl,
        state.logoPadding,
        state.logoPaddingColor,
        state.logoPaddingRadius,
        state.frameText
      );
    },
    [
      state.style,
      state.logoDataUrl,
      state.logoPadding,
      state.logoPaddingColor,
      state.logoPaddingRadius,
      state.frameText,
      regenerate,
    ]
  );

  const updateStyle = useCallback((partial: Partial<QrStyle>) => {
    setState((s) => ({ ...s, style: { ...s.style, ...partial } }));
  }, []);

  const setLogo = useCallback((dataUrl: string | null) => {
    setState((s) => ({ ...s, logoDataUrl: dataUrl }));
  }, []);

  const setLogoPadding = useCallback((padding: number) => {
    setState((s) => ({ ...s, logoPadding: padding }));
  }, []);

  const setLogoPaddingColor = useCallback((color: string) => {
    setState((s) => ({ ...s, logoPaddingColor: color }));
  }, []);

  const setLogoPaddingRadius = useCallback((radius: number) => {
    setState((s) => ({ ...s, logoPaddingRadius: radius }));
  }, []);

  const setFrameText = useCallback((text: string) => {
    setState((s) => ({ ...s, frameText: text }));
  }, []);

  const applyTemplate = useCallback((style: QrStyle) => {
    setState((s) => ({ ...s, style }));
  }, []);

  return {
    ...state,
    generate,
    updateStyle,
    setLogo,
    setLogoPadding,
    setLogoPaddingColor,
    setLogoPaddingRadius,
    setFrameText,
    applyTemplate,
  };
}
