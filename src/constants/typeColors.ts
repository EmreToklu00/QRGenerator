/**
 * @fileoverview QR Type Color Schemes
 * @description Tailwind color classes for each QR type
 * 
 * @module constants/typeColors
 * @category Constants
 * 
 * @features
 * - Unique color scheme for each of 9 QR types
 * - 4 color variants per type: bg, iconBg, icon, border
 * - Dark mode support for all colors
 * - Hover states included
 * 
 * @colors
 * - url: Indigo
 * - wifi: Sky
 * - vcard: Violet
 * - email: Rose
 * - phone: Green
 * - sms: Amber
 * - location: Pink
 * - appstore: Purple
 * - text: Teal
 */

import { QrType } from './qrTypes';

export const TYPE_COLORS: Record<
  QrType,
  { bg: string; iconBg: string; icon: string; border: string }
> = {
  url: {
    bg: 'hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10',
    iconBg: 'bg-indigo-100 dark:bg-indigo-900/40',
    icon: 'text-indigo-600 dark:text-indigo-400',
    border: 'hover:border-indigo-200 dark:hover:border-indigo-800',
  },
  wifi: {
    bg: 'hover:bg-sky-50/50 dark:hover:bg-sky-900/10',
    iconBg: 'bg-sky-100 dark:bg-sky-900/40',
    icon: 'text-sky-600 dark:text-sky-400',
    border: 'hover:border-sky-200 dark:hover:border-sky-800',
  },
  vcard: {
    bg: 'hover:bg-violet-50/50 dark:hover:bg-violet-900/10',
    iconBg: 'bg-violet-100 dark:bg-violet-900/40',
    icon: 'text-violet-600 dark:text-violet-400',
    border: 'hover:border-violet-200 dark:hover:border-violet-800',
  },
  email: {
    bg: 'hover:bg-rose-50/50 dark:hover:bg-rose-900/10',
    iconBg: 'bg-rose-100 dark:bg-rose-900/40',
    icon: 'text-rose-600 dark:text-rose-400',
    border: 'hover:border-rose-200 dark:hover:border-rose-800',
  },
  phone: {
    bg: 'hover:bg-green-50/50 dark:hover:bg-green-900/10',
    iconBg: 'bg-green-100 dark:bg-green-900/40',
    icon: 'text-green-600 dark:text-green-400',
    border: 'hover:border-green-200 dark:hover:border-green-800',
  },
  sms: {
    bg: 'hover:bg-amber-50/50 dark:hover:bg-amber-900/10',
    iconBg: 'bg-amber-100 dark:bg-amber-900/40',
    icon: 'text-amber-600 dark:text-amber-400',
    border: 'hover:border-amber-200 dark:hover:border-amber-800',
  },
  location: {
    bg: 'hover:bg-pink-50/50 dark:hover:bg-pink-900/10',
    iconBg: 'bg-pink-100 dark:bg-pink-900/40',
    icon: 'text-pink-600 dark:text-pink-400',
    border: 'hover:border-pink-200 dark:hover:border-pink-800',
  },
  appstore: {
    bg: 'hover:bg-purple-50/50 dark:hover:bg-purple-900/10',
    iconBg: 'bg-purple-100 dark:bg-purple-900/40',
    icon: 'text-purple-600 dark:text-purple-400',
    border: 'hover:border-purple-200 dark:hover:border-purple-800',
  },
  text: {
    bg: 'hover:bg-teal-50/50 dark:hover:bg-teal-900/10',
    iconBg: 'bg-teal-100 dark:bg-teal-900/40',
    icon: 'text-teal-600 dark:text-teal-400',
    border: 'hover:border-teal-200 dark:hover:border-teal-800',
  },
};
