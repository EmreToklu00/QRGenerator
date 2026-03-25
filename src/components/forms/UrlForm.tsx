/**
 * @fileoverview URL Form Component
 * @description Form for entering website URLs to generate QR codes
 * 
 * @module components/forms/UrlForm
 * @category Form Components
 * @subcategory QR Type Forms
 * 
 * @features
 * - URL input with auto-normalization (adds https:// prefix)
 * - Clipboard paste button
 * - Live preview of normalized URL
 * - Dark mode support
 * - i18n ready
 * 
 * @props
 * @param {Record<string, string>} data - Form data object with 'url' key
 * @param {Function} onChange - Callback when form data changes
 * 
 * @formFields
 * - url: Website URL (required)
 * 
 * @validation
 * - Handled by validator.ts
 * - Must be valid URL format
 * 
 * @qrOutput
 * - Format: https://example.com (normalized with protocol)
 * 
 * @dependencies
 * - @/components/ui/Input: Input component
 */

'use client';

import { Input } from '@/components/ui/Input';

interface Props {
  data: Record<string, string>;
  onChange: (data: Record<string, string>) => void;
}

export default function UrlForm({ data, onChange }: Props) {
  const set = (key: string, value: string) => onChange({ ...data, [key]: value });


  const normalized = data.url
    ? data.url.startsWith('http://') || data.url.startsWith('https://')
      ? data.url
      : `https://${data.url}`
    : '';

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            label="URL"
            type="text"
            placeholder="example.com"
            value={data.url || ''}
            onChange={(e) => set('url', e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={async () => {
            const text = await navigator.clipboard.readText();
            set('url', text);
          }}
          className="self-end px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Panodan yapıştır"
        >
          📋
        </button>
      </div>
      {normalized && (
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">🔗 {normalized}</p>
      )}
    </div>
  );
}
