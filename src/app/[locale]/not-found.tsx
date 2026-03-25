'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Home, ArrowRight, QrCode } from 'lucide-react';
import { QR_TYPES } from '@/constants/qrTypes';
import { TYPE_COLORS } from '@/constants/typeColors';

export default function NotFound() {
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  const t = useTranslations('notFound');

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[70vh] px-4 text-center overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-indigo-100/60 dark:bg-indigo-900/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-violet-100/40 dark:bg-violet-900/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-50/30 dark:bg-indigo-900/5 blur-3xl pointer-events-none" />

      <span className="relative text-[8rem] sm:text-[10rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 select-none my-6">
        404
      </span>

      <div className="relative flex flex-col items-center gap-2">
        <p className="text-sm text-gray-400 dark:text-gray-500 max-w-sm leading-relaxed">
          {t('title')}
        </p>
      </div>

      <div className="relative flex flex-wrap items-center justify-center gap-3 mt-8">
        <Link
          href={`/${locale}`}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
        >
          <Home size={15} /> {t('home')}
        </Link>
        <Link
          href={`/${locale}/create/url`}
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
        >
          <QrCode size={15} /> {t('createQr')}
          <ArrowRight
            size={14}
            className="opacity-60 group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      </div>

      <div className="relative flex flex-col items-center gap-3 mt-12">
        <span className="text-xs font-medium text-gray-300 dark:text-gray-600 uppercase tracking-widest">
          {t('quickStart')}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {QR_TYPES.map((t) => {
            const Icon = t.icon;
            const c = TYPE_COLORS[t.id] ?? {
              iconBg: 'bg-gray-100 dark:bg-gray-800',
              icon: 'text-gray-500',
            };
            return (
              <Link
                key={t.id}
                href={`/${locale}/create/${t.id}`}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm transition-all"
              >
                <span
                  className={`flex items-center justify-center w-7 h-7 rounded-lg ${c.iconBg} ${c.icon}`}
                >
                  <Icon size={14} />
                </span>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {t.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
