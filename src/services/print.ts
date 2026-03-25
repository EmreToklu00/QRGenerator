/**
 * @fileoverview Print Utility Service
 * @description Opens QR code in new window and triggers print dialog
 * 
 * @module services/print
 * @category Utility Services
 * 
 * @features
 * - Opens QR in new window
 * - Auto-triggers print dialog
 * - Auto-closes window after print
 * - Centered layout with max 80vmin size
 * 
 * @functions
 * - printQr(dataUrl): void - Opens print dialog for QR code
 */

export function printQr(dataUrl: string) {
  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(`
    <html>
      <head>
        <title>QR Code</title>
        <style>
          body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
          img { max-width: 80vmin; max-height: 80vmin; }
        </style>
      </head>
      <body>
        <img src="${dataUrl}" onload="window.print(); window.close();" />
      </body>
    </html>
  `);
  win.document.close();
}
