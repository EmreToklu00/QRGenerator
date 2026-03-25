/**
 * @fileoverview QR String Builder Service
 * @description Converts form data to QR-compatible string formats
 * 
 * @module services/types
 * @category Core Services
 * 
 * @features
 * - Type-specific string formatting
 * - URL normalization (auto-adds https://)
 * - WiFi format: WIFI:T:WPA;S:SSID;P:password;H:false;;
 * - vCard 3.0 format
 * - mailto: format with query params
 * - tel: format
 * - smsto: format
 * - geo: format (latitude,longitude)
 * - App store URL selection (iOS priority if both provided)
 * 
 * @functions
 * - buildQrString(type, data): string - Builds QR content string
 * 
 * @output_formats
 * - url: https://example.com
 * - wifi: WIFI:T:WPA;S:MyNetwork;P:password;;
 * - vcard: BEGIN:VCARD\nVERSION:3.0\n...\nEND:VCARD
 * - email: mailto:user@example.com?subject=Hello&body=Message
 * - phone: tel:+905551234567
 * - sms: smsto:+905551234567:Message
 * - location: geo:41.0082,28.9784
 * - appstore: https://apps.apple.com/... (or Play Store URL)
 * - text: Plain text
 * 
 * @dependencies
 * - @/constants/qrTypes: QrType union type
 */

import { QrType } from '@/constants/qrTypes';

export function buildQrString(type: QrType, data: Record<string, string>): string {
  switch (type) {
    case 'url': {
      const url = data.url || '';
      return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    }

    case 'wifi': {
      const enc = data.encryption || 'WPA';
      const hidden = data.hidden === 'true' ? 'H:true;' : '';
      return `WIFI:T:${enc};S:${data.ssid};P:${data.password || ''};${hidden};`;
    }

    case 'vcard':
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${data.lastName || ''};${data.firstName || ''};;;`,
        `FN:${data.firstName || ''} ${data.lastName || ''}`.trim(),
        data.phone ? `TEL:${data.phone}` : '',
        data.email ? `EMAIL:${data.email}` : '',
        data.company ? `ORG:${data.company}` : '',
        'END:VCARD',
      ]
        .filter(Boolean)
        .join('\n');

    case 'email': {
      const params = new URLSearchParams();
      if (data.subject) params.set('subject', data.subject);
      if (data.body) params.set('body', data.body);
      const query = params.toString();
      return `mailto:${data.to}${query ? '?' + query : ''}`;
    }

    case 'phone':
      return `tel:${data.phone}`;

    case 'sms':
      return `smsto:${data.phone}${data.message ? ':' + data.message : ''}`;

    case 'location':
      return `geo:${data.latitude},${data.longitude}`;

    case 'appstore': {
      if (data.iosUrl && data.androidUrl) {
        return data.iosUrl;
      }
      return data.iosUrl || data.androidUrl || '';
    }

    case 'text':
      return data.text;

    default:
      return '';
  }
}
