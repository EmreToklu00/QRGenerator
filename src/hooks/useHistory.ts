/**
 * @fileoverview QR Code History Management Hook
 * @description Manages localStorage-based history of generated QR codes
 * 
 * @module hooks/useHistory
 * @category Core Hooks
 * 
 * @features
 * - Persistent storage with localStorage
 * - Maximum 10 items (FIFO)
 * - Stores QR data, style, logo, and metadata
 * - Add, remove, and clear operations
 * - Automatic hydration on mount
 * 
 * @storage
 * - Key: 'qr_history'
 * - Format: JSON array of HistoryItem
 * - Max size: 10 items
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { QrType } from '@/constants/qrTypes';
import { QrStyle } from '@/constants/templatePresets';

export interface HistoryItem {
  id: string;
  type: QrType;
  data: Record<string, string>;
  dataUrl: string;
  createdAt: number;
  style?: QrStyle;
  logoDataUrl?: string | null;
  logoPadding?: number;
  logoPaddingColor?: string;
  logoPaddingRadius?: number;
  frameText?: string;
}

const STORAGE_KEY = 'qr_history';
const MAX_ITEMS = 10;

function load(): HistoryItem[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function useHistory() {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setItems(load());
  }, []);

  const add = useCallback((item: Omit<HistoryItem, 'id' | 'createdAt'>) => {
    setItems((prev) => {
      const next = [{ ...item, id: crypto.randomUUID(), createdAt: Date.now() }, ...prev].slice(
        0,
        MAX_ITEMS
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setItems([]);
  }, []);

  return { items, add, remove, clear };
}
