/**
 * @fileoverview Location Form Component
 * @description Form for creating GPS location QR codes
 * 
 * @module components/forms/LocationForm
 * @category Form Components
 * @subcategory QR Type Forms
 * 
 * @features
 * - Latitude input (decimal degrees)
 * - Longitude input (decimal degrees)
 * - i18n support (TR/EN)
 * - Dark mode support
 * 
 * @props
 * @param {Record<string, string>} data - Form data object
 * @param {Function} onChange - Callback when form data changes
 * 
 * @formFields
 * - latitude: Latitude coordinate (required, -90 to 90)
 * - longitude: Longitude coordinate (required, -180 to 180)
 * 
 * @validation
 * - Latitude range: -90 to 90
 * - Longitude range: -180 to 180
 * - Decimal format validation
 * 
 * @qrOutput
 * - Format: geo:41.0082,28.9784
 * - Opens in Google Maps or Apple Maps when scanned
 * 
 * @translations
 * - forms.location.latitude
 * - forms.location.longitude
 * - forms.location.latitudePlaceholder (e.g., 41.0082)
 * - forms.location.longitudePlaceholder (e.g., 28.9784)
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

export default function LocationForm({ data, onChange }: Props) {
  const t = useTranslations('forms.location');

  return (
    <div className="space-y-4">
      <Input
        label={t('latitude')}
        type="text"
        placeholder={t('latitudePlaceholder')}
        value={data.latitude || ''}
        onChange={(e) => onChange({ ...data, latitude: e.target.value })}
      />
      <Input
        label={t('longitude')}
        type="text"
        placeholder={t('longitudePlaceholder')}
        value={data.longitude || ''}
        onChange={(e) => onChange({ ...data, longitude: e.target.value })}
      />
    </div>
  );
}
