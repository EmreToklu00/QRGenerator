/**
 * @fileoverview Step Content Component
 * @description Renders content for each step of the QR creation wizard
 * 
 * @module components/create/StepContent
 * @category Create Components
 * 
 * @features
 * - Step 1: Form input for QR data
 * - Step 2: Style customization with templates and advanced settings
 * - Step 3: Download/share actions and history save
 * - Collapsible advanced settings
 * - Re-edit button to go back to step 1
 * 
 * @dependencies
 * - @/components/canvas: QrControls, LogoUpload
 * - @/components/templates: TemplateSelector
 * - @/components/output: ActionButtons
 * - next-intl: Translations
 * - lucide-react: Icons
 */

import { ComponentType } from 'react';
import { useTranslations } from 'next-intl';
import { Bookmark, RotateCcw } from 'lucide-react';
import { QrType } from '@/constants/qrTypes';
import { QrStyle } from '@/constants/templatePresets';
import QrControls from '@/components/canvas/QrControls';
import LogoUpload from '@/components/canvas/LogoUpload';
import TemplateSelector from '@/components/templates/TemplateSelector';
import ActionButtons from '@/components/output/ActionButtons';

interface StepContentProps {
  step: number;
  qrType: QrType;
  typeLabel: string;
  formData: Record<string, string>;
  onFormChange: (data: Record<string, string>) => void;
  FormComponent: ComponentType<{
    data: Record<string, string>;
    onChange: (d: Record<string, string>) => void;
  }>;
  qrStyle: QrStyle;
  frameText: string;
  onStyleChange: (style: Partial<QrStyle>) => void;
  onFrameTextChange: (text: string) => void;
  onApplyTemplate: (style: QrStyle) => void;
  logoDataUrl: string | null;
  logoPadding: number;
  logoPaddingColor: string;
  logoPaddingRadius: number;
  onLogoUpload: (url: string | null) => void;
  onLogoPaddingChange: (padding: number) => void;
  onLogoPaddingColorChange: (color: string) => void;
  onLogoPaddingRadiusChange: (radius: number) => void;
  qrDataUrl: string | null;
  qrData: string;
  onSave: () => void;
  onReEdit: () => void;
}

export default function StepContent({
  step,
  qrType,
  typeLabel,
  formData,
  onFormChange,
  FormComponent,
  qrStyle,
  frameText,
  onStyleChange,
  onFrameTextChange,
  onApplyTemplate,
  logoDataUrl,
  logoPadding,
  logoPaddingColor,
  logoPaddingRadius,
  onLogoUpload,
  onLogoPaddingChange,
  onLogoPaddingColorChange,
  onLogoPaddingRadiusChange,
  qrDataUrl,
  qrData,
  onSave,
  onReEdit,
}: StepContentProps) {
  const t = useTranslations('create');

  if (step === 1) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            {t('infoTitle')}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('infoDesc', { type: typeLabel })}
          </p>
        </div>
        <FormComponent data={formData} onChange={onFormChange} />
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            {t('styleTitle')}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('styleDesc')}</p>
        </div>
        <TemplateSelector currentStyle={qrStyle} onApply={onApplyTemplate} />
        <details className="group" open>
          <summary className="cursor-pointer text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors list-none flex items-center gap-1.5 select-none">
            <span className="group-open:rotate-90 transition-transform inline-block text-base leading-none">
              ›
            </span>
            {t('advancedSettings')}
          </summary>
          <div className="mt-4 flex flex-col gap-4 pl-3 border-l border-gray-100 dark:border-gray-800">
            <QrControls
              style={qrStyle}
              frameText={frameText}
              onStyleChange={onStyleChange}
              onFrameTextChange={onFrameTextChange}
            />
            <LogoUpload
              logoDataUrl={logoDataUrl}
              logoPadding={logoPadding}
              logoPaddingColor={logoPaddingColor}
              logoPaddingRadius={logoPaddingRadius}
              onUpload={onLogoUpload}
              onPaddingChange={onLogoPaddingChange}
              onPaddingColorChange={onLogoPaddingColorChange}
              onPaddingRadiusChange={onLogoPaddingRadiusChange}
            />
          </div>
        </details>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            {t('outputTitle')}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('outputDesc')}</p>
        </div>
        <ActionButtons dataUrl={qrDataUrl} qrData={qrData} style={qrStyle} />
        {qrDataUrl && (
          <button
            onClick={onSave}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
          >
            <Bookmark size={12} /> {t('saveHistory')}
          </button>
        )}
        <button
          onClick={onReEdit}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <RotateCcw size={12} /> {t('reEdit')}
        </button>
      </div>
    );
  }

  return null;
}
