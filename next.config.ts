/**
 * @fileoverview Next.js Configuration
 * @description Main Next.js config with i18n, bundle analyzer, and optimizations
 * 
 * @module next.config
 * @category Configuration
 * 
 * @features
 * - next-intl plugin for internationalization
 * - Bundle analyzer (enabled with ANALYZE=true)
 * - Turbopack support
 * - Image optimization (AVIF, WebP)
 * - Gzip compression enabled
 * 
 * @plugins
 * - next-intl: Handles locale routing and messages
 * - @next/bundle-analyzer: Visualizes bundle size
 * 
 * @usage
 * - Development: npm run dev
 * - Build: npm run build
 * - Analyze: ANALYZE=true npm run build
 */

import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
