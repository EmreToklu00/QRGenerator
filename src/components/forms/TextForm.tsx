/**
 * @fileoverview Text Form Component
 * @description Simple textarea form for plain text QR codes
 * 
 * @module components/forms/TextForm
 * @category Form Components
 * 
 * @features
 * - Textarea input for plain text
 * - Placeholder text
 * - Auto-resize (3 rows)
 */

'use client';

import { useTranslations } from 'next-intl';
import { Textarea } from '@/components/ui/Input';

interface Props {
  data: Record<string, string>;
  onChange: (data: Record<string, string>) => void;
}

export default function TextForm({ data, onChange }: Props) {
  const t = useTranslations('forms.text');

  return (
    <Textarea
      label={t('label')}
      placeholder={t('placeholder')}
      value={data.text || ''}
      onChange={(e) => onChange({ ...data, text: e.target.value })}
    />
  );
}
