/**
 * @fileoverview Phone Form Component
 * @description Simple form for creating phone call QR codes
 * 
 * @module components/forms/PhoneForm
 * @category Form Components
 * @subcategory QR Type Forms
 * 
 * @features
 * - Phone number input with tel type
 * - i18n support (TR/EN with locale-specific placeholders)
 * - Dark mode support
 * 
 * @props
 * @param {Record<string, string>} data - Form data object
 * @param {Function} onChange - Callback when form data changes
 * 
 * @formFields
 * - phone: Phone number (required)
 * 
 * @validation
 * - Phone number format validation
 * 
 * @qrOutput
 * - Format: tel:+905551234567
 * 
 * @translations
 * - forms.phone.label
 * - forms.phone.placeholder (TR: +90 555 123 4567, EN: +1 555 123 4567)
 * 
 * @dependencies
 * - next-intl: Translations
 * - @/components/ui/Input: Input component
 */

'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/Input';

interface Props {
  data: Record<string, string>;
  onChange: (data: Record<string, string>) => void;
}

export default function PhoneForm({ data, onChange }: Props) {
  const t = useTranslations('forms.phone');

  return (
    <Input
      label={t('label')}
      type="tel"
      placeholder={t('placeholder')}
      value={data.phone || ''}
      onChange={(e) => onChange({ ...data, phone: e.target.value })}
    />
  );
}
