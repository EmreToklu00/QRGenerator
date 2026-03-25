/**
 * @fileoverview Email Form Component
 * @description Form for creating email QR codes with recipient, subject, and body
 * 
 * @module components/forms/EmailForm
 * @category Form Components
 * @subcategory QR Type Forms
 * 
 * @features
 * - Email recipient input (with validation)
 * - Subject line input
 * - Message body textarea
 * - i18n support (TR/EN)
 * - Dark mode support
 * 
 * @props
 * @param {Record<string, string>} data - Form data object
 * @param {Function} onChange - Callback when form data changes
 * 
 * @formFields
 * - to: Email address (required)
 * - subject: Email subject (optional)
 * - body: Email message (optional)
 * 
 * @validation
 * - Email format validation
 * 
 * @qrOutput
 * - Format: mailto:email@example.com?subject=Subject&body=Message
 * 
 * @translations
 * - forms.email.to
 * - forms.email.subject
 * - forms.email.body
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

export default function EmailForm({ data, onChange }: Props) {
  const t = useTranslations('forms.email');
  const set = (key: string, value: string) => onChange({ ...data, [key]: value });

  return (
    <div className="flex flex-col gap-3">
      <Input
        label={t('to')}
        type="email"
        placeholder={t('toPlaceholder')}
        value={data.to || ''}
        onChange={(e) => set('to', e.target.value)}
      />
      <Input
        label={t('subject')}
        placeholder={t('subjectPlaceholder')}
        value={data.subject || ''}
        onChange={(e) => set('subject', e.target.value)}
      />
      <Textarea
        label={t('body')}
        placeholder={t('bodyPlaceholder')}
        value={data.body || ''}
        onChange={(e) => set('body', e.target.value)}
      />
    </div>
  );
}
