/**
 * @fileoverview SMS Form Component
 * @description Form for creating SMS QR codes with phone number and message
 * 
 * @module components/forms/SmsForm
 * @category Form Components
 * @subcategory QR Type Forms
 * 
 * @features
 * - Phone number input
 * - Message textarea
 * - i18n support (TR/EN)
 * - Dark mode support
 * 
 * @props
 * @param {Record<string, string>} data - Form data object
 * @param {Function} onChange - Callback when form data changes
 * 
 * @formFields
 * - phone: Phone number (required)
 * - message: SMS message text (optional)
 * 
 * @validation
 * - Phone number required
 * 
 * @qrOutput
 * - Format: smsto:+905551234567:Message text
 * 
 * @translations
 * - forms.sms.phone
 * - forms.sms.message
 * 
 * @dependencies
 * - next-intl: Translations
 * - @/components/ui/Input: Input and Textarea components
 */

'use client';

import { useTranslations } from 'next-intl';
import { Input, Textarea } from '@/components/ui/Input';

interface Props {
  data: Record<string, string>;
  onChange: (data: Record<string, string>) => void;
}

export default function SmsForm({ data, onChange }: Props) {
  const t = useTranslations('forms.sms');
  const set = (key: string, value: string) => onChange({ ...data, [key]: value });

  return (
    <div className="flex flex-col gap-3">
      <Input
        label={t('phone')}
        type="tel"
        placeholder={t('phonePlaceholder')}
        value={data.phone || ''}
        onChange={(e) => set('phone', e.target.value)}
      />
      <Textarea
        label={t('message')}
        placeholder={t('messagePlaceholder')}
        value={data.message || ''}
        onChange={(e) => set('message', e.target.value)}
      />
    </div>
  );
}
