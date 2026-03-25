/**
 * @fileoverview Download Utilities Service
 * @description Handles PNG, SVG, and ZIP downloads for QR codes
 * 
 * @module services/download
 * @category Utility Services
 * 
 * @features
 * - PNG download from data URL
 * - SVG download from string
 * - ZIP download for multiple QR codes (batch)
 * - Automatic filename generation
 * - Blob URL management with cleanup
 * 
 * @functions
 * - downloadPng(dataUrl, filename): void - Downloads PNG file
 * - downloadSvg(svgString, filename): Promise<void> - Downloads SVG file
 * - downloadZip(items): Promise<void> - Downloads ZIP with multiple PNGs
 * 
 * @dependencies
 * - jszip: ZIP file generation
 */

import JSZip from 'jszip';

export function downloadPng(dataUrl: string, filename = 'qrcode') {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `${filename}.png`;
  a.click();
}

export async function downloadSvg(svgString: string, filename = 'qrcode') {
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.svg`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function downloadZip(items: { filename: string; dataUrl: string }[]) {
  const zip = new JSZip();
  items.forEach(({ filename, dataUrl }) => {
    const base64 = dataUrl.split(',')[1];
    zip.file(`${filename}.png`, base64, { base64: true });
  });
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'qrcodes.zip';
  a.click();
  URL.revokeObjectURL(url);
}
