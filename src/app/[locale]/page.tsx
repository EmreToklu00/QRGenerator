/**
 * @fileoverview Home Page
 * @description Landing page with hero, QR types, history, and how-it-works sections
 * 
 * @module app/[locale]/page
 * @category Pages
 * 
 * @features
 * - Hero section with gradient background
 * - 8 QR type cards with icons and colors
 * - How-it-works 4-step guide
 * - Recent history with prefill support
 * - Responsive grid layouts
 * - Smooth scroll navigation
 * - Dark mode support
 * 
 * @routes
 * - /[locale] - Home page
 * 
 * @dependencies
 * - @/hooks/useHistory: History management
 * - @/constants/qrTypes: QR type definitions
 * - @/constants/typeColors: Color schemes
 * - next-intl: Translations
 */

'use client';

import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Clock, ArrowRight, Sparkles, ChevronRight, Star } from 'lucide-react';
import { useHistory } from '@/hooks/useHistory';
import { QR_TYPES } from '@/constants/qrTypes';
import { TYPE_COLORS } from '@/constants/typeColors';
import { ComponentType, memo } from 'react';

const HistoryItem = memo(function HistoryItem({
  item,
  colors,
  Icon,
  typeDef,
  preview,
  onSelect,
  onRemove,
  t,
}: {
  item: ReturnType<typeof useHistory>['items'][number];
  colors: { bg: string; iconBg: string; icon: string; border: string };
  Icon?: ComponentType<{ size: number }>;
  typeDef?: (typeof QR_TYPES)[number];
  preview: string;
  onSelect: () => void;
  onRemove: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div
      onClick={onSelect}
      className={`group relative flex flex-col gap-2 p-3 rounded-2xl border border-gray-100 dark:border-gray-800 ${colors.border} ${colors.bg} cursor-pointer transition-all hover:shadow-md`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 w-5 h-5 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-400 hover:text-red-400 transition-all text-xs shadow-sm"
      >
        ✕
      </button>
      <img
        src={item.dataUrl}
        alt="QR"
        loading="lazy"
        className="w-full aspect-square rounded-xl object-contain bg-white"
      />
      <div className="flex flex-col gap-0.5 px-0.5">
        <span className={`text-xs font-semibold flex items-center gap-1 ${colors.icon}`}>
          {Icon && <Icon size={10} />} {typeDef ? t(`types.${typeDef.id}.label`) : ''}
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500 truncate">{preview}</span>
      </div>
    </div>
  );
});

export default function Home() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations();
  const { items, remove, clear } = useHistory();

  const handleHistorySelect = (item: ReturnType<typeof useHistory>['items'][number]) => {
    const prefill = JSON.stringify({
      data: item.data,
      style: item.style,
      logoDataUrl: item.logoDataUrl,
      logoPadding: item.logoPadding,
      logoPaddingColor: item.logoPaddingColor,
      logoPaddingRadius: item.logoPaddingRadius,
      frameText: item.frameText,
    });
    router.push(`/${locale}/create/${item.type}?prefill=${encodeURIComponent(prefill)}`);
  };

  return (
    <div className="flex flex-col bg-white dark:bg-gray-950">
      <section className="relative overflow-hidden border-b border-gray-100 dark:border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-indigo-100/60 dark:bg-indigo-900/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-violet-100/40 dark:bg-violet-900/10 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-20 sm:py-28 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 flex flex-col gap-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 px-3 py-1 rounded-full w-fit">
              <Star size={10} fill="currentColor" /> {t('hero.badge')}
            </span>
            <div className="flex flex-col gap-3">
              <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.1]">
                {t('hero.title')}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                  {t('hero.titleHighlight')}
                </span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-md">
                {t('hero.description')}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => router.push(`/${locale}/create/url`)}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
              >
                <Sparkles size={15} /> {t('hero.ctaStart')}
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
              <button
                onClick={() =>
                  document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
              >
                {t('hero.ctaHow')}
              </button>
            </div>
          </div>

          <div className="hidden lg:flex flex-shrink-0 items-center justify-center w-72 h-72 relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20 border border-indigo-100 dark:border-indigo-800" />
            <div className="relative grid grid-cols-3 gap-3 p-6">
              {QR_TYPES.map((type) => {
                const Icon = type.icon;
                const c = TYPE_COLORS[type.id];
                return (
                  <button
                    key={type.id}
                    onClick={() => router.push(`/${locale}/create/${type.id}`)}
                    className={`w-16 h-16 rounded-2xl ${c.iconBg} flex flex-col items-center justify-center gap-1 ${c.icon} hover:scale-105 transition-transform`}
                  >
                    <Icon size={20} />
                    <span className="text-[9px] font-medium opacity-70">
                      {t(`types.${type.id}.label`)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
        
      <section
        id="how"
        className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30"
      >
        <div className="max-w-5xl mx-auto px-4 py-16 flex flex-col gap-10">
          <div className="flex flex-col gap-2 text-center">
            <span className="text-xs font-semibold text-indigo-500 uppercase tracking-widest">
              {t('steps.subtitle')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {t('steps.title')}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['step1', 'step2', 'step3', 'step4'].map((stepKey, i) => {
              const step = t.raw(`steps.${stepKey}`) as {
                num: string;
                title: string;
                desc: string;
              };
              return (
                <div
                  key={stepKey}
                  className="relative flex flex-col gap-3 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm"
                >
                  {i < 3 && (
                    <ChevronRight
                      size={14}
                      className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-gray-300 dark:text-gray-700"
                    />
                  )}
                  <span className="text-3xl font-black text-indigo-100 dark:text-indigo-900/60 leading-none">
                    {step.num}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {step.title}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                      {step.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto w-full px-4 py-16 flex flex-col gap-16">
        <section id="types" className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-indigo-500 uppercase tracking-widest">
              {t('types.subtitle')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {t('types.title')}
            </h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 max-w-lg">
              {t('types.description')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {QR_TYPES.map((type) => {
              const Icon = type.icon;
              const colors = TYPE_COLORS[type.id];
              return (
                <button
                  key={type.id}
                  onClick={() => router.push(`/${locale}/create/${type.id}`)}
                  className={`group flex items-center gap-4 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 ${colors.border} ${colors.bg} hover:shadow-md transition-all text-left`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl ${colors.iconBg} flex items-center justify-center ${colors.icon} flex-shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    <Icon size={22} />
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {t(`types.${type.id}.label`)}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                      {t(`types.${type.id}.desc`)}
                    </span>
                  </div>
                  <ArrowRight
                    size={16}
                    className={`${colors.icon} opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0`}
                  />
                </button>
              );
            })}
          </div>
        </section>
          
        {items.length > 0 && (
          <section className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  <Clock size={14} className="text-indigo-500" /> {t('history.title')}
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {t('history.subtitle')}
                </span>
              </div>
              <button
                onClick={clear}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10"
              >
                {t('history.clear')}
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {items.map((item) => {
                const typeDef = QR_TYPES.find((type) => type.id === item.type);
                const Icon = typeDef?.icon;
                const colors = TYPE_COLORS[item.type];
                const preview = Object.values(item.data).filter(Boolean)[0] || '';
                return (
                  <HistoryItem
                    key={item.id}
                    item={item}
                    colors={colors}
                    Icon={Icon}
                    typeDef={typeDef}
                    preview={preview}
                    onSelect={() => handleHistorySelect(item)}
                    onRemove={() => remove(item.id)}
                    t={t}
                  />
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
