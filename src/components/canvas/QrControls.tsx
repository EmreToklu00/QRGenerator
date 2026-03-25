/**
 * @fileoverview QR Style Controls Component
 * @description Form controls for customizing QR code appearance
 * 
 * @module components/canvas/QrControls
 * @category Canvas Components
 * 
 * @features
 * - Size selection (256, 512, 1024px)
 * - Error correction level (L, M, Q, H)
 * - Dot style (square, rounded, dot, line)
 * - Corner style (square, rounded)
 * - Color pickers for QR and background
 * - Gradient toggle with start/end colors and direction
 * - Background patterns (dots, grid, waves)
 * - Transparent background support
 * - Frame text input (max 30 chars)
 * 
 * @dependencies
 * - @/constants/templatePresets: QrStyle type
 * - @/components/ui/ColorPicker: Color selection
 * - @/components/ui/Dropdown: Select dropdowns
 * - next-intl: Translations
 */

'use client';

import { useTranslations } from 'next-intl';
import { QrStyle } from '@/constants/templatePresets';
import ColorPicker from '@/components/ui/ColorPicker';
import Dropdown from '@/components/ui/Dropdown';

interface QrControlsProps {
  style: QrStyle;
  frameText: string;
  onStyleChange: (partial: Partial<QrStyle>) => void;
  onFrameTextChange: (text: string) => void;
}

export default function QrControls({
  style,
  frameText,
  onStyleChange,
  onFrameTextChange,
}: QrControlsProps) {
  const t = useTranslations('controls');

  const SIZE_OPTIONS = [
    { value: '256', label: '256px' },
    { value: '512', label: '512px' },
    { value: '1024', label: '1024px' },
  ];
  const ECL_OPTIONS = [
    { value: 'L', label: 'L — Low' },
    { value: 'M', label: 'M — Medium' },
    { value: 'Q', label: 'Q — High' },
    { value: 'H', label: 'H — Maximum' },
  ];
  const DOT_OPTIONS = [
    { value: 'square', label: 'Default' },
    { value: 'rounded', label: 'Rounded' },
    { value: 'dot', label: 'Dot' },
    { value: 'line', label: 'Line' },
  ];
  const CORNER_OPTIONS = [
    { value: 'square', label: 'Sharp' },
    { value: 'rounded', label: 'Rounded' },
  ];
  const GRADIENT_DIR_OPTIONS = [
    { value: 'vertical', label: 'Vertical' },
    { value: 'horizontal', label: 'Horizontal' },
    { value: 'diagonal', label: 'Diagonal' },
  ];
  const PATTERN_OPTIONS = [
    { value: 'none', label: 'None' },
    { value: 'dots', label: 'Dots' },
    { value: 'grid', label: 'Grid' },
    { value: 'waves', label: 'Waves' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Dropdown
        label={t('size')}
        value={String(style.size)}
        options={SIZE_OPTIONS}
        onChange={(v) => onStyleChange({ size: Number(v) as QrStyle['size'] })}
      />
      <Dropdown
        label={t('errorCorrection')}
        value={style.errorCorrectionLevel}
        options={ECL_OPTIONS}
        onChange={(v) =>
          onStyleChange({ errorCorrectionLevel: v as QrStyle['errorCorrectionLevel'] })
        }
      />
      <Dropdown
        label={t('dotStyle')}
        value={style.dotStyle}
        options={DOT_OPTIONS}
        onChange={(v) => onStyleChange({ dotStyle: v as QrStyle['dotStyle'] })}
      />
      <Dropdown
        label={t('cornerStyle')}
        value={style.cornerStyle}
        options={CORNER_OPTIONS}
        onChange={(v) => onStyleChange({ cornerStyle: v as QrStyle['cornerStyle'] })}
      />
      <ColorPicker
        label={t('qrColor')}
        value={style.darkColor}
        onChange={(v) => onStyleChange({ darkColor: v })}
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="gradient-toggle"
          checked={style.gradientEnabled ?? false}
          onChange={(e) => onStyleChange({ gradientEnabled: e.target.checked })}
          className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label
          htmlFor="gradient-toggle"
          className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
        >
          {t('gradientEnabled')}
        </label>
      </div>

      {style.gradientEnabled && (
        <>
          <ColorPicker
            label={t('gradientStart')}
            value={style.gradientStart ?? '#000000'}
            onChange={(v) => onStyleChange({ gradientStart: v })}
          />
          <ColorPicker
            label={t('gradientEnd')}
            value={style.gradientEnd ?? '#4F46E5'}
            onChange={(v) => onStyleChange({ gradientEnd: v })}
          />
          <Dropdown
            label={t('gradientDirection')}
            value={style.gradientDirection ?? 'vertical'}
            options={GRADIENT_DIR_OPTIONS}
            onChange={(v) =>
              onStyleChange({ gradientDirection: v as QrStyle['gradientDirection'] })
            }
          />
        </>
      )}

      <ColorPicker
        label={t('background')}
        value={style.lightColor}
        onChange={(v) => onStyleChange({ lightColor: v })}
        allowTransparent
      />
      {style.lightColor === 'transparent' && (
        <ColorPicker
          label={t('backgroundColor')}
          value={style.backgroundColor}
          onChange={(v) => onStyleChange({ backgroundColor: v })}
        />
      )}

      <Dropdown
        label={t('backgroundPattern')}
        value={style.backgroundPattern ?? 'none'}
        options={PATTERN_OPTIONS}
        onChange={(v) => onStyleChange({ backgroundPattern: v as QrStyle['backgroundPattern'] })}
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('frameText')}
        </label>
        <input
          type="text"
          value={frameText}
          onChange={(e) => onFrameTextChange(e.target.value)}
          placeholder={t('frameTextPlaceholder')}
          maxLength={30}
          className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}
