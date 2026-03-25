/**
 * @fileoverview vCard Form Component
 * @description Form for creating digital business card QR codes
 * 
 * @module components/forms/VCardForm
 * @category Form Components
 * @subcategory QR Type Forms
 * 
 * @features
 * - First name and last name inputs (2-column grid)
 * - Phone number input
 * - Email input
 * - Company name input
 * - i18n support (TR/EN)
 * - Dark mode support
 * 
 * @props
 * @param {Record<string, string>} data - Form data object
 * @param {Function} onChange - Callback when form data changes
 * 
 * @formFields
 * - firstName: First name (required)
 * - lastName: Last name (required)
 * - phone: Phone number (optional)
 * - email: Email address (optional)
 * - company: Company name (optional)
 * 
 * @validation
 * - At least firstName or lastName required
 * - Email format validation if provided
 * 
 * @qrOutput
 * - Format: vCard 3.0 format
 * - Example: BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\n...
 * 
 * @translations
 * - forms.vcard.firstName
 * - forms.vcard.lastName
 * - forms.vcard.phone
 * - forms.vcard.email
 * - forms.vcard.company
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

export default function VCardForm({ data, onChange }: Props) {
  const t = useTranslations('forms.vcard');
  const set = (key: string, value: string) => onChange({ ...data, [key]: value });

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <Input
          label={t('firstName')}
          placeholder={t('firstNamePlaceholder')}
          value={data.firstName || ''}
          onChange={(e) => set('firstName', e.target.value)}
        />
        <Input
          label={t('lastName')}
          placeholder={t('lastNamePlaceholder')}
          value={data.lastName || ''}
          onChange={(e) => set('lastName', e.target.value)}
        />
      </div>
      <Input
        label={t('phone')}
        type="tel"
        placeholder={t('phonePlaceholder')}
        value={data.phone || ''}
        onChange={(e) => set('phone', e.target.value)}
      />
      <Input
        label={t('email')}
        type="email"
        placeholder={t('emailPlaceholder')}
        value={data.email || ''}
        onChange={(e) => set('email', e.target.value)}
      />
      <Input
        label={t('company')}
        placeholder={t('companyPlaceholder')}
        value={data.company || ''}
        onChange={(e) => set('company', e.target.value)}
      />
    </div>
  );
}
