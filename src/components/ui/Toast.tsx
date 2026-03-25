/**
 * @fileoverview Toast Notification System
 * @description Context-based toast notifications with auto-dismiss
 * 
 * @module components/ui/Toast
 * @category UI Components
 * 
 * @features
 * - 3 toast types: success, error, info
 * - Auto-dismiss after 3 seconds
 * - Click to dismiss manually
 * - Multiple toasts stacking
 * - Slide-in animation from right
 * - Icon indicators for each type
 * - Fixed bottom-right positioning
 * - Context API for global access
 * 
 * @usage
 * ```tsx
 * const { show } = useToast();
 * show('Success message', 'success');
 * ```
 */

'use client';

import {createContext, useContext, useState, useCallback, useRef, ReactNode} from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  show: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({ show: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const ICONS: Record<ToastType, string> = { success: '✅', error: '❌', info: 'ℹ️' };
const COLORS: Record<ToastType, string> = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  info: 'bg-indigo-600',
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
  }, []);

  const show = useCallback(
    (message: string, type: ToastType = 'info') => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message, type }]);
      const timer = setTimeout(() => remove(id), 3000);
      timers.current.set(id, timer);
    },
    [remove]
  );

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            onClick={() => remove(t.id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg cursor-pointer animate-in slide-in-from-right-4 fade-in duration-200 ${COLORS[t.type]}`}
          >
            <span>{ICONS[t.type]}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
