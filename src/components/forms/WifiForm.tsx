/**
 * @fileoverview WiFi Form Component
 * @description Form for creating WiFi network QR codes
 * 
 * @module components/forms/WifiForm
 * @category Form Components
 * @subcategory QR Type Forms
 * 
 * @features
 * - SSID (network name) input
 * - Encryption type selector (WPA/WPA2, WEP, No Password)
 * - Password input (conditional - hidden for 'nopass')
 * - Hidden network checkbox
 * - i18n support (TR/EN)
 * - Dark mode support
 * 
 * @props
 * @param {Record<string, string>} data - Form data object
 * @param {Function} onChange - Callback when form data changes
 * 
 * @formFields
 * - ssid: Network name (required)
 * - encryption: WPA | WEP | nopass (default: WPA)
 * - password: Network password (required if not nopass)
 * - hidden: 'true' | 'false' (default: 'false')
 * 
 * @validation
 * - SSID required
 * - Password required if encryption !== 'nopass'
 * 
 * @qrOutput
 * - Format: WIFI:T:WPA;S:NetworkName;P:Password;H:false;;
 * 
 * @translations
 * - forms.wifi.ssid
 * - forms.wifi.encryption
 * - forms.wifi.password
 * - forms.wifi.hiddenNetwork
 * - forms.wifi.noPassword
 * 
 * @dependencies
 * - next-intl: Translations
 * - @/components/ui/Input: Input component
 * - @/components/ui/Dropdown: Dropdown component
 */

'use client';

import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/Input';
import Dropdown from '@/components/ui/Dropdown';

interface Props {
  data: Record<string, string>;
  onChange: (data: Record<string, string>) => void;
}

export default function WifiForm({ data, onChange }: Props) {
  const t = useTranslations('forms.wifi');
  const set = (key: string, value: string) => onChange({ ...data, [key]: value });

  const ENC_OPTIONS = [
    { value: 'WPA', label: 'WPA/WPA2' },
    { value: 'WEP', label: 'WEP' },
    { value: 'nopass', label: t('noPassword') },
  ];

  return (
    <div className="flex flex-col gap-3">
      <Input
        label={t('ssid')}
        placeholder={t('ssidPlaceholder')}
        value={data.ssid || ''}
        onChange={(e) => set('ssid', e.target.value)}
      />
      <Dropdown
        label={t('encryption')}
        value={data.encryption || 'WPA'}
        options={ENC_OPTIONS}
        onChange={(v) => set('encryption', v)}
      />
      {data.encryption !== 'nopass' && (
        <Input
          label={t('password')}
          type="password"
          placeholder={t('passwordPlaceholder')}
          value={data.password || ''}
          onChange={(e) => set('password', e.target.value)}
        />
      )}
      <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
        <input
          type="checkbox"
          checked={data.hidden === 'true'}
          onChange={(e) => set('hidden', String(e.target.checked))}
          className="rounded"
        />
        {t('hiddenNetwork')}
      </label>
    </div>
  );
}
