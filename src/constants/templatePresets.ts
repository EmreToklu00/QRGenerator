/**
 * @fileoverview QR Style Templates and Presets
 * @description Defines QR code styling options and 12 pre-made templates
 * 
 * @module constants/templatePresets
 * @category Constants
 * 
 * @features
 * - Size options: 256, 512, 1024px
 * - Color customization (dark, light, background)
 * - Error correction levels: L, M, Q, H
 * - Dot styles: square, rounded, dot, line
 * - Corner styles: square, rounded
 * - Gradient support (vertical, horizontal, diagonal)
 * - Background patterns: dots, grid, waves
 * - 12 pre-made templates (minimal, corporate, neon, gradient, etc.)
 */

export interface QrStyle {
  size: 256 | 512 | 1024;
  darkColor: string;
  lightColor: string;
  backgroundColor: string; // transparan modda canvas arka planı
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  dotStyle: 'square' | 'rounded' | 'dot' | 'line';
  cornerStyle: 'square' | 'rounded';
  margin: number;
  // Gradient
  gradientEnabled?: boolean;
  gradientStart?: string;
  gradientEnd?: string;
  gradientDirection?: 'vertical' | 'horizontal' | 'diagonal';
  // Pattern
  backgroundPattern?: 'none' | 'dots' | 'grid' | 'waves';
}

export interface Template {
  id: string;
  label: string;
  style: QrStyle;
}

export const DEFAULT_STYLE: QrStyle = {
  size: 512,
  darkColor: '#000000',
  lightColor: '#ffffff',
  backgroundColor: '#ffffff',
  errorCorrectionLevel: 'M',
  dotStyle: 'square',
  cornerStyle: 'square',
  margin: 2,
  gradientEnabled: false,
  gradientStart: '#000000',
  gradientEnd: '#4F46E5',
  gradientDirection: 'vertical',
  backgroundPattern: 'none',
};

export const TEMPLATES: Template[] = [
  {
    id: 'minimal',
    label: 'Minimal',
    style: {
      ...DEFAULT_STYLE,
      darkColor: '#000000',
      lightColor: '#ffffff',
      dotStyle: 'square',
      cornerStyle: 'square',
    },
  },
  {
    id: 'corporate',
    label: 'Corporate',
    style: {
      ...DEFAULT_STYLE,
      darkColor: '#1E3A5F',
      lightColor: '#ffffff',
      dotStyle: 'square',
      cornerStyle: 'rounded',
    },
  },
  {
    id: 'colorful',
    label: 'Colorful',
    style: {
      ...DEFAULT_STYLE,
      darkColor: '#8B5CF6',
      lightColor: '#EEF2FF',
      dotStyle: 'rounded',
      cornerStyle: 'rounded',
    },
  },
  {
    id: 'neon',
    label: 'Neon',
    style: {
      ...DEFAULT_STYLE,
      darkColor: '#00FF41',
      lightColor: '#0D0D0D',
      dotStyle: 'dot',
      cornerStyle: 'square',
    },
  },
  {
    id: 'sunset',
    label: 'Sunset',
    style: {
      ...DEFAULT_STYLE,
      darkColor: '#EA580C',
      lightColor: '#FFF7ED',
      dotStyle: 'rounded',
      cornerStyle: 'rounded',
    },
  },
  {
    id: 'ocean',
    label: 'Ocean',
    style: {
      ...DEFAULT_STYLE,
      darkColor: '#0891B2',
      lightColor: '#ECFEFF',
      dotStyle: 'dot',
      cornerStyle: 'rounded',
    },
  },
  {
    id: 'forest',
    label: 'Forest',
    style: {
      ...DEFAULT_STYLE,
      darkColor: '#15803D',
      lightColor: '#F0FDF4',
      dotStyle: 'rounded',
      cornerStyle: 'square',
    },
  },
  {
    id: 'rose',
    label: 'Rose',
    style: {
      ...DEFAULT_STYLE,
      darkColor: '#BE185D',
      lightColor: '#FFF1F2',
      dotStyle: 'dot',
      cornerStyle: 'rounded',
    },
  },
  {
    id: 'slate',
    label: 'Slate',
    style: {
      ...DEFAULT_STYLE,
      darkColor: '#334155',
      lightColor: '#F8FAFC',
      dotStyle: 'square',
      cornerStyle: 'rounded',
    },
  },
  {
    id: 'midnight',
    label: 'Midnight',
    style: {
      ...DEFAULT_STYLE,
      darkColor: '#818CF8',
      lightColor: '#0F172A',
      dotStyle: 'dot',
      cornerStyle: 'rounded',
    },
  },
  {
    id: 'gradient-purple',
    label: 'Gradient Purple',
    style: {
      ...DEFAULT_STYLE,
      gradientEnabled: true,
      gradientStart: '#8B5CF6',
      gradientEnd: '#EC4899',
      gradientDirection: 'diagonal',
      dotStyle: 'rounded',
      cornerStyle: 'rounded',
    },
  },
  {
    id: 'gradient-ocean',
    label: 'Gradient Ocean',
    style: {
      ...DEFAULT_STYLE,
      gradientEnabled: true,
      gradientStart: '#0891B2',
      gradientEnd: '#06B6D4',
      gradientDirection: 'vertical',
      dotStyle: 'dot',
      cornerStyle: 'rounded',
    },
  },
];
