/**
 * @fileoverview Root Layout for Internationalized Pages
 * @description Main layout with i18n, theme, PWA, and global providers
 * 
 * @module app/[locale]/layout
 * @category Pages
 * 
 * @features
 * - Next.js 16 App Router with i18n
 * - Static generation for all locales
 * - PWA manifest and install prompt
 * - Dark mode support with Tailwind
 * - Toast notifications provider
 * - Geist font family
 * - Responsive viewport settings
 * 
 * @routes
 * - /[locale]/* - All localized routes
 * 
 * @dependencies
 * - next-intl: Internationalization
 * - @/i18n: Locale configuration
 * - @/components/layout: Header, Footer
 * - @/components/pwa: InstallPrompt
 * - @/components/ui: ToastProvider
 */

import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { ToastProvider } from '@/components/ui/Toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../globals.css';
import { ReactNode } from 'react';
import InstallPrompt from "@/components/pwa/InstallPrompt";

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QR Code Generator',
  description: 'Free, fast and customizable QR code generator',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'QR Generator',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#4F46E5',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geist.className} bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen`}
      >
        <NextIntlClientProvider messages={messages}>
          <ToastProvider>
            <Header />
            {children}
            <Footer />
            <InstallPrompt/>
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
