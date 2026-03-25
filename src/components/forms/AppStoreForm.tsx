/**
 * @fileoverview App Store Form Component
 * @description Form for creating app store download QR codes (iOS/Android)
 * 
 * @module components/forms/AppStoreForm
 * @category Form Components
 * @subcategory QR Type Forms
 * 
 * @features
 * - iOS App Store URL input
 * - Android Play Store URL input
 * - At least one URL required
 * - Hint text for users
 * - i18n support (TR/EN)
 * - Dark mode support
 * 
 * @props
 * @param {Record<string, string>} data - Form data object
 * @param {Function} onChange - Callback when form data changes
 * 
 * @formFields
 * - iosUrl: iOS App Store URL (optional)
 * - androidUrl: Android Play Store URL (optional)
 * - Note: At least one URL required
 * 
 * @validation
 * - At least one URL required
 * - URLs must start with https://
 * - iOS URL should contain apps.apple.com
 * - Android URL should contain play.google.com
 * 
 * @qrOutput
 * - If both URLs provided: iOS URL used (most QR readers prioritize)
 * - If only one URL: That URL used
 * - Format: https://apps.apple.com/... or https://play.google.com/...
 * 
 * @translations
 * - forms.appstore.iosLabel
 * - forms.appstore.androidLabel
 * - forms.appstore.hint
 * 
 * @dependencies
 * - next-intl: Translations
 * - @/components/ui/Input: Input component
 * 
 */

'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/Input';

interface Props {
  data: Record<string, string>;
  onChange: (data: Record<string, string>) => void;
}

export default function AppStoreForm({ data, onChange }: Props) {
  const t = useTranslations('forms.appstore');

  return (
    <div className="space-y-4">
      <Input
        label={t('iosLabel')}
        type="text"
        placeholder={t('iosPlaceholder')}
        value={data.iosUrl || ''}
        onChange={(e) => onChange({ ...data, iosUrl: e.target.value })}
      />
      <Input
        label={t('androidLabel')}
        type="text"
        placeholder={t('androidPlaceholder')}
        value={data.androidUrl || ''}
        onChange={(e) => onChange({ ...data, androidUrl: e.target.value })}
      />
      <p className="text-xs text-gray-400 dark:text-gray-500">{t('hint')}</p>
    </div>
  );
}
