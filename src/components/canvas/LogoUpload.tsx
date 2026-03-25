/**
 * @fileoverview Logo Upload Component
 * @description Logo upload with preset icons and customization controls
 * 
 * @module components/canvas/LogoUpload
 * @category Canvas Components
 * 
 * @features
 * - 10 preset social media icons (GitHub, Instagram, X, LinkedIn, YouTube, TikTok, WhatsApp, Spotify, Link, WiFi)
 * - Custom file upload (PNG, JPG, SVG, WebP)
 * - Icon color picker for preset icons
 * - Logo padding slider (0-32px)
 * - Padding background color with transparent option
 * - Padding radius slider (0-50%, circle at 50%)
 * - Logo preview with remove button
 * - SVG to data URL conversion
 * 
 * @dependencies
 * - React: useState for local state
 * - next-intl: Translations
 */

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface LogoUploadProps {
  logoDataUrl: string | null;
  logoPadding: number;
  logoPaddingColor: string;
  logoPaddingRadius: number;
  onUpload: (dataUrl: string | null) => void;
  onPaddingChange: (padding: number) => void;
  onPaddingColorChange: (color: string) => void;
  onPaddingRadiusChange: (radius: number) => void;
}

const PRESET_ICONS = [
  {
    id: 'github',
    label: 'GitHub',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
  },
  {
    id: 'twitter',
    label: 'X',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  },
  {
    id: 'youtube',
    label: 'YouTube',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/></svg>`,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`,
  },
  {
    id: 'spotify',
    label: 'Spotify',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`,
  },
  {
    id: 'link',
    label: 'Link',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  },
  {
    id: 'wifi',
    label: 'WiFi',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>`,
  },
];

function svgToDataUrl(svg: string, color: string): string {
  const colored = svg.replace(/currentColor/g, color);
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(colored)))}`;
}

export default function LogoUpload({
  logoDataUrl,
  logoPadding,
  logoPaddingColor,
  logoPaddingRadius,
  onUpload,
  onPaddingChange,
  onPaddingColorChange,
  onPaddingRadiusChange,
}: LogoUploadProps) {
  const t = useTranslations('controls');
  const [iconColor, setIconColor] = useState('#000000');
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedIconId(null);
      onUpload(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleIconSelect = (icon: (typeof PRESET_ICONS)[number]) => {
    if (selectedIconId === icon.id) {
      setSelectedIconId(null);
      onUpload(null);
    } else {
      setSelectedIconId(icon.id);
      onUpload(svgToDataUrl(icon.svg, iconColor));
    }
  };

  const handleIconColorChange = (color: string) => {
    setIconColor(color);
    if (selectedIconId) {
      const icon = PRESET_ICONS.find((i) => i.id === selectedIconId);
      if (icon) onUpload(svgToDataUrl(icon.svg, color));
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('logo')}</label>

      <div className="flex flex-wrap gap-1.5">
        {PRESET_ICONS.map((icon) => {
          const isSelected = selectedIconId === icon.id;
          return (
            <button
              key={icon.id}
              onClick={() => handleIconSelect(icon)}
              title={icon.label}
              className={`w-9 h-9 flex items-center justify-center rounded-lg border transition-colors
                ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 bg-white dark:bg-gray-800'
                }`}
            >
              <img
                src={svgToDataUrl(icon.svg, isSelected ? iconColor : '#374151')}
                alt={icon.label}
                className="w-5 h-5"
              />
            </button>
          );
        })}

        <label
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500 bg-white dark:bg-gray-800 cursor-pointer transition-colors text-gray-400 text-lg"
          title="Upload PNG / JPG / SVG (PNG and SVG support transparency)"
        >
          +
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            onChange={handleFile}
            className="hidden"
          />
        </label>
      </div>

      {selectedIconId && (
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 dark:text-gray-400">{t('color')}</label>
          <input
            type="color"
            value={iconColor}
            onChange={(e) => handleIconColorChange(e.target.value)}
            className="w-7 h-7 rounded cursor-pointer border border-gray-300 dark:border-gray-600"
          />
          <span className="text-xs font-mono text-gray-400">{iconColor}</span>
        </div>
      )}

      {logoDataUrl && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <img
              src={logoDataUrl}
              alt="Logo"
              className="w-8 h-8 rounded object-contain border border-gray-200 dark:border-gray-700 bg-white p-0.5"
            />
            <button
              onClick={() => {
                setSelectedIconId(null);
                onUpload(null);
              }}
              className="text-xs text-red-400 hover:text-red-500 transition-colors"
            >
              {t('remove')}
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-xs text-gray-500 dark:text-gray-400">{t('padding')}</label>
              <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                {logoPadding}px
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={32}
              step={1}
              value={logoPadding}
              onChange={(e) => onPaddingChange(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
          </div>

          {logoPadding > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500 dark:text-gray-400">{t('background2')}</label>
                <input
                  type="color"
                  value={logoPaddingColor === 'transparent' ? '#ffffff' : logoPaddingColor}
                  disabled={logoPaddingColor === 'transparent'}
                  onChange={(e) => onPaddingColorChange(e.target.value)}
                  className="w-7 h-7 rounded cursor-pointer border border-gray-300 dark:border-gray-600 disabled:opacity-40"
                />
                <label className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={logoPaddingColor === 'transparent'}
                    onChange={(e) =>
                      onPaddingColorChange(e.target.checked ? 'transparent' : '#ffffff')
                    }
                    className="rounded"
                  />
                  {t('transparent')}
                </label>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-gray-500 dark:text-gray-400">{t('rounding')}</label>
                  <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                    {logoPaddingRadius >= 50
                      ? t('circle')
                      : logoPaddingRadius === 0
                        ? t('square')
                        : `${logoPaddingRadius}%`}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={1}
                  value={logoPaddingRadius}
                  onChange={(e) => onPaddingRadiusChange(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
