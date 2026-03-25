/**
 * @fileoverview QR Data Validation Service
 * @description Validates form data for all QR types before generation
 * 
 * @module services/validator
 * @category Core Services
 * 
 * @features
 * - Type-specific validation rules
 * - URL format validation with auto-normalization
 * - Email format validation
 * - Phone number format validation
 * - Coordinate range validation (latitude/longitude)
 * - Required field checks
 * 
 * @validation_rules
 * - url: Must be valid URL format, auto-adds https:// prefix
 * - wifi: SSID required
 * - vcard: First name or last name required, email/phone format if provided
 * - email: Valid email format required
 * - phone: Valid phone format required (7-20 chars, +digits/spaces/dashes)
 * - sms: Valid phone format required
 * - location: Lat (-90 to 90), Lng (-180 to 180)
 * - appstore: At least one URL required, must start with https://
 * - text: Non-empty text required
 * 
 * @functions
 * - validate(type, data): string | null - Returns error message or null if valid
 * 
 * @dependencies
 * - @/constants/qrTypes: QrType union type
 */

import { QrType } from '@/constants/qrTypes';

const URL_REGEX = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d{1,5})?(\/.*)?$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s\-().]{7,20}$/;

export function validate(type: QrType, data: Record<string, string>): string | null {
  switch (type) {
    case 'url': {
      if (!data.url) return 'URL cannot be empty.';
      const normalized =
        data.url.startsWith('http://') || data.url.startsWith('https://')
          ? data.url
          : `https://${data.url}`;
      if (!URL_REGEX.test(normalized)) return 'Enter a valid URL. (example.com)';
      return null;
    }

    case 'wifi':
      if (!data.ssid) return 'Network name (SSID) cannot be empty.';
      return null;

    case 'vcard':
      if (!data.firstName && !data.lastName) return 'First name or last name is required.';
      if (data.email && !EMAIL_REGEX.test(data.email)) return 'Enter a valid email address.';
      if (data.phone && !PHONE_REGEX.test(data.phone)) return 'Enter a valid phone number.';
      return null;

    case 'email':
      if (!data.to) return 'Recipient email address cannot be empty.';
      if (!EMAIL_REGEX.test(data.to)) return 'Enter a valid email address.';
      return null;

    case 'phone':
      if (!data.phone) return 'Phone number cannot be empty.';
      if (!PHONE_REGEX.test(data.phone)) return 'Enter a valid phone number.';
      return null;

    case 'sms':
      if (!data.phone) return 'Phone number cannot be empty.';
      if (!PHONE_REGEX.test(data.phone)) return 'Enter a valid phone number.';
      return null;

    case 'location':
      if (!data.latitude || !data.longitude) return 'Latitude and longitude cannot be empty.';
      const lat = parseFloat(data.latitude);
      const lng = parseFloat(data.longitude);
      if (isNaN(lat) || lat < -90 || lat > 90) return 'Latitude must be between -90 and 90.';
      if (isNaN(lng) || lng < -180 || lng > 180) return 'Longitude must be between -180 and 180.';
      return null;

    case 'appstore':
      if (!data.iosUrl && !data.androidUrl) return 'At least one platform link is required.';
      if (data.iosUrl && !data.iosUrl.startsWith('https://'))
        return 'iOS link must start with https://';
      if (data.androidUrl && !data.androidUrl.startsWith('https://'))
        return 'Android link must start with https://';
      return null;

    case 'text':
      if (!data.text) return 'Text cannot be empty.';
      return null;

    default:
      return 'Invalid QR type.';
  }
}
