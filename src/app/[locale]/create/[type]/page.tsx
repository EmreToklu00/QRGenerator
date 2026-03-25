/**
 * @fileoverview QR Code Creation Page
 * @description Multi-step wizard for creating customized QR codes
 * 
 * @module app/[locale]/create/[type]/page
 * @category Pages
 * 
 * @features
 * - 3-step wizard (Data → Style → Download)
 * - 9 QR types with dynamic forms
 * - Real-time QR preview
 * - Style customization (colors, gradients, patterns)
 * - Logo upload with padding controls
 * - Frame text support
 * - Template presets
 * - History prefill from URL params
 * - Swipe gestures for mobile navigation
 * - Smooth step transitions (180ms)
 * - Form validation with toast feedback
 * 
 * @routes
 * - /[locale]/create/[type] - QR creation page
 * - Query params: ?prefill={json} - Prefill from history
 * 
 * @dependencies
 * - @/hooks/useQrGenerator: QR generation state
 * - @/hooks/useHistory: History management
 * - @/services/validator: Form validation
 * - @/services/types: QR string builders
 * - react-swipeable: Touch gestures
 */

'use client';

import { useState, useEffect, useCallback, use, useRef, ComponentType } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useSwipeable } from 'react-swipeable';

import { QrType, QR_TYPES } from '@/constants/qrTypes';
import { useQrGenerator } from '@/hooks/useQrGenerator';
import { useHistory } from '@/hooks/useHistory';
import { useToast } from '@/components/ui/Toast';
import { validate } from '@/services/validator';
import { buildQrString } from '@/services/types';

import QrPreview from '@/components/canvas/QrPreview';
import StepIndicator from '@/components/create/StepIndicator';
import StepContent from '@/components/create/StepContent';
import NavigationFooter from '@/components/create/NavigationFooter';

import UrlForm from '@/components/forms/UrlForm';
import WifiForm from '@/components/forms/WifiForm';
import VCardForm from '@/components/forms/VCardForm';
import EmailForm from '@/components/forms/EmailForm';
import PhoneForm from '@/components/forms/PhoneForm';
import SmsForm from '@/components/forms/SmsForm';
import LocationForm from '@/components/forms/LocationForm';
import AppStoreForm from '@/components/forms/AppStoreForm';
import TextForm from '@/components/forms/TextForm';

const FORMS: Record<
  QrType,
  ComponentType<{ data: Record<string, string>; onChange: (d: Record<string, string>) => void }>
> = {
  url: UrlForm,
  wifi: WifiForm,
  vcard: VCardForm,
  email: EmailForm,
  phone: PhoneForm,
  sms: SmsForm,
  location: LocationForm,
  appstore: AppStoreForm,
  text: TextForm,
};

export default function CreatePage({
  params,
}: {
  params: Promise<{ type: string; locale: string }>;
}) {
  const { type, locale } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('create');
  const tTypes = useTranslations('types');
  const { show } = useToast();
  const history = useHistory();
  const qr = useQrGenerator();

  const qrType = type as QrType;
  const typeDef = QR_TYPES.find((t) => t.id === qrType);

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');
  const [animating, setAnimating] = useState(false);
  const formDataRef = useRef<Record<string, string>>({});

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [qrData, setQrData] = useState('');

  const handleFormChange = useCallback((data: Record<string, string>) => {
    formDataRef.current = data;
    setFormData(data);
  }, []);

  useEffect(() => {
    const prefill = searchParams.get('prefill');
    if (prefill) {
      try {
        const parsed = JSON.parse(prefill);
        if (parsed.data) {
          handleFormChange(parsed.data);
          if (parsed.style) qr.applyTemplate(parsed.style);
          if (parsed.logoDataUrl !== undefined) qr.setLogo(parsed.logoDataUrl);
          if (parsed.logoPadding !== undefined) qr.setLogoPadding(parsed.logoPadding);
          if (parsed.logoPaddingColor !== undefined)
            qr.setLogoPaddingColor(parsed.logoPaddingColor);
          if (parsed.logoPaddingRadius !== undefined)
            qr.setLogoPaddingRadius(parsed.logoPaddingRadius);
          if (parsed.frameText !== undefined) qr.setFrameText(parsed.frameText);
        } else {
          handleFormChange(parsed);
        }
      } catch {
        /* ignore */
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const error = validate(qrType, formData);
    if (error) return;
    const data = buildQrString(qrType, formData);
    if (!data || data === qrData) return;
    setQrData(data);
    qr.generate(data).catch();
  }, [formData, qrType]);

  const goTo = useCallback(
    (next: number, dir: 'forward' | 'back') => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setStep(next);
        setAnimating(false);
      }, 180);
    },
    [animating]
  );

  const handleNext = () => {
    if (step === 1) {
      const error = validate(qrType, formData);
      if (error) {
        show(error, 'error');
        return;
      }
    }
    if (step < 3) goTo(step + 1, 'forward');
  };

  const handleBack = () => {
    if (step > 1) goTo(step - 1, 'back');
    else router.push(`/${locale}`);
  };

  const handleSave = useCallback(() => {
    if (!qr.dataUrl) return;
    history.add({
      type: qrType,
      data: formDataRef.current,
      dataUrl: qr.dataUrl,
      style: qr.style,
      logoDataUrl: qr.logoDataUrl,
      logoPadding: qr.logoPadding,
      logoPaddingColor: qr.logoPaddingColor,
      logoPaddingRadius: qr.logoPaddingRadius,
      frameText: qr.frameText,
    });
    show(t('savedHistory'), 'success');
  }, [
    qr.dataUrl,
    qr.style,
    qr.logoDataUrl,
    qr.logoPadding,
    qr.logoPaddingColor,
    qr.logoPaddingRadius,
    qr.frameText,
    qrType,
    history,
    show,
    t,
  ]);

  const handleSkip = () => goTo(3, 'forward');
  const handleReEdit = () => goTo(1, 'back');

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (step < 3) handleNext();
    },
    onSwipedRight: () => {
      handleBack();
    },
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  if (!typeDef) {
    router.push(`/${locale}`);
    return null;
  }

  const FormComponent = FORMS[qrType];
  const slideClass = animating
    ? direction === 'forward'
      ? 'opacity-0 -translate-x-3'
      : 'opacity-0 translate-x-3'
    : 'opacity-100 translate-x-0';

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto w-full px-4 flex flex-col lg:flex-row gap-6 md:gap-10 py-4 md:py-8 flex-1">
        <div {...swipeHandlers} className="flex-1 flex flex-col gap-4 md:gap-6 min-w-0">
          <StepIndicator currentStep={step} />
          <div className={`transition-all duration-180 ${slideClass}`}>
            <StepContent
              step={step}
              qrType={qrType}
              typeLabel={tTypes(`${typeDef.id}.label`)}
              formData={formData}
              onFormChange={handleFormChange}
              FormComponent={FormComponent}
              qrStyle={qr.style}
              frameText={qr.frameText}
              onStyleChange={qr.updateStyle}
              onFrameTextChange={qr.setFrameText}
              onApplyTemplate={qr.applyTemplate}
              logoDataUrl={qr.logoDataUrl}
              logoPadding={qr.logoPadding}
              logoPaddingColor={qr.logoPaddingColor}
              logoPaddingRadius={qr.logoPaddingRadius}
              onLogoUpload={qr.setLogo}
              onLogoPaddingChange={qr.setLogoPadding}
              onLogoPaddingColorChange={qr.setLogoPaddingColor}
              onLogoPaddingRadiusChange={qr.setLogoPaddingRadius}
              qrDataUrl={qr.dataUrl}
              qrData={qrData}
              onSave={handleSave}
              onReEdit={handleReEdit}
            />
          </div>
        </div>

        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="lg:sticky lg:top-24 flex flex-col gap-4">
            <QrPreview dataUrl={qr.dataUrl} isGenerating={qr.isGenerating} error={qr.error} />
            {step === 2 && !qr.dataUrl && (
              <p className="text-xs text-center text-gray-400 dark:text-gray-600">
                {t('previewHint')}
              </p>
            )}
          </div>
        </div>
      </div>

      <NavigationFooter step={step} onBack={handleBack} onNext={handleNext} onSkip={handleSkip} />
    </div>
  );
}
