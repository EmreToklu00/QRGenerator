/**
 * @fileoverview Global Footer Component
 * @description Footer with logo, features, QR type links, and social links
 * 
 * @module components/layout/Footer
 * @category Layout Components
 * 
 * @features
 * - Logo and description
 * - Feature highlights (instant generation, download formats)
 * - Quick links to all QR types
 * - GitHub link
 * - Copyright notice
 * - Responsive grid layout
 * - Dark mode support
 * - i18n support (TR/EN)
 * 
 * @dependencies
 * - next/navigation: Params for locale
 * - next-intl: Translations
 * - lucide-react: Icons (Github, Zap, Download)
 * 
 * @translations
 * - footer.instantGeneration
 * - footer.downloadFormats
 * - footer.description
 * - footer.qrTypes
 * - footer.github
 * - types.*.label (for QR type links)
 */

'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Github, Zap, Download } from 'lucide-react';

export default function Footer() {
  const params = useParams();
  const locale = (params.locale as string) || 'tr';
  const t = useTranslations('footer');
  const tTypes = useTranslations('types');

  const FEATURES = [
    { icon: Zap, label: t('instantGeneration') },
    { icon: Download, label: t('downloadFormats') },
  ];

  const LINKS = [
    { label: tTypes('url.label'), href: `/${locale}/create/url` },
    { label: tTypes('wifi.label'), href: `/${locale}/create/wifi` },
    { label: tTypes('vcard.label'), href: `/${locale}/create/vcard` },
    { label: tTypes('email.label'), href: `/${locale}/create/email` },
    { label: tTypes('phone.label'), href: `/${locale}/create/phone` },
    { label: tTypes('sms.label'), href: `/${locale}/create/sms` },
  ];
  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-8">
        {/* Üst — logo + açıklama + özellikler */}
        <div className="flex flex-col sm:flex-row gap-8 justify-between">
          {/* Sol */}
          <div className="flex flex-col gap-3 max-w-xs">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon-192.png" alt="QR Generator" className="w-5 h-5 rounded" />
              <span className="font-semibold text-sm text-gray-900 dark:text-white">
                QR Generator
              </span>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
              {t('description')}
            </p>
            <div className="flex flex-col gap-1.5">
              {FEATURES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500"
                >
                  <Icon size={11} className="text-indigo-400 flex-shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Sağ — QR tipleri */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {t('qrTypes')}
            </span>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1.5">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs text-gray-400 dark:text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Alt bar */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs text-gray-300 dark:text-gray-600">
            © {new Date().getFullYear()} QR Generator
          </span>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/EmreToklu00"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <Github size={13} /> {t('github')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
