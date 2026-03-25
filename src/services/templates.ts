/**
 * @fileoverview Template Management Service
 * @description Utilities for retrieving and applying QR code style templates
 * 
 * @module services/templates
 * @category Core Services
 * 
 * @features
 * - Template lookup by ID
 * - Style merging with current settings
 * - Preserves user customizations not in template
 * 
 * @dependencies
 * - @/constants/templatePresets: Template definitions
 */

import { Template, TEMPLATES, QrStyle } from '@/constants/templatePresets';

/**
 * Retrieves a template by its ID
 * @param id - Template identifier
 * @returns Template object or undefined if not found
 */
export function getTemplate(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

/**
 * Applies a template's style to current QR style
 * @param id - Template identifier
 * @param currentStyle - Current QR style settings
 * @returns Merged style with template applied
 */
export function applyTemplate(id: string, currentStyle: QrStyle): QrStyle {
  const template = getTemplate(id);
  if (!template) return currentStyle;
  return { ...currentStyle, ...template.style };
}
