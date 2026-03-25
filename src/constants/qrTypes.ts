/**
 * @fileoverview QR Type Definitions
 * @description Defines all supported QR code types with icons
 * 
 * @module constants/qrTypes
 * @category Constants
 * 
 * @types
 * - url: Website links
 * - wifi: WiFi network credentials
 * - vcard: Digital business cards
 * - email: Email addresses with subject/body
 * - phone: Phone numbers for calls
 * - sms: SMS messages
 * - location: GPS coordinates
 * - appstore: iOS/Android app links
 * - text: Plain text
 */

import {
  Link,
  Wifi,
  User,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Smartphone,
  LucideIcon,
} from 'lucide-react';

export type QrType =
  | 'url'
  | 'wifi'
  | 'vcard'
  | 'email'
  | 'phone'
  | 'sms'
  | 'location'
  | 'appstore'
  | 'text';

export interface QrTypeDefinition {
  id: QrType;
  label: string;
  icon: LucideIcon;
}

export const QR_TYPES: QrTypeDefinition[] = [
  { id: 'url', label: 'URL', icon: Link },
  { id: 'wifi', label: 'WiFi', icon: Wifi },
  { id: 'vcard', label: 'vCard', icon: User },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'phone', label: 'Phone', icon: Phone },
  { id: 'sms', label: 'SMS', icon: MessageSquare },
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'appstore', label: 'App Store', icon: Smartphone },
];
