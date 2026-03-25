/**
 * @fileoverview QR Code Generation Service
 * @description Canvas-based QR code generator with advanced styling features
 * 
 * @module services/qr
 * @category Core Services
 * 
 * @features
 * - Manual canvas rendering with custom dot styles (square/rounded/dot/line)
 * - Corner styles (sharp/rounded)
 * - Gradient support (vertical/horizontal/diagonal)
 * - Background patterns (dots/grid/waves)
 * - Logo embedding with padding, color, and radius control
 * - Transparent background support
 * - Frame text at bottom
 * - High-resolution PNG output
 * - SVG export
 * 
 * @interfaces
 * - QrRenderOptions: Main options for QR generation
 *   - data: string (QR content)
 *   - style: QrStyle (colors, size, error correction, etc.)
 *   - logoDataUrl?: string (base64 logo image)
 *   - logoPadding?: number (default: 16)
 *   - logoPaddingColor?: string (default: 'transparent')
 *   - logoPaddingRadius?: number (0-50, default: 50)
 *   - frameText?: string (optional bottom text)
 * 
 * @functions
 * - generateQrDataUrl(options): Promise<string> - Generates PNG data URL
 * - generateSvgString(data, style): Promise<string> - Generates SVG string
 * 
 * @rendering
 * 1. Create canvas with alpha channel
 * 2. Fill background (or leave transparent)
 * 3. Draw background pattern if enabled
 * 4. Get QR matrix from qrcode library
 * 5. Calculate cell size and margins
 * 6. Draw finder patterns (3 corner squares)
 * 7. Draw data modules (skip logo area)
 * 8. Draw logo with padding and radius
 * 9. Draw frame text if provided
 * 10. Export as PNG data URL
 * 
 * @dependencies
 * - qrcode: QR matrix generation
 * - @/constants/templatePresets: QrStyle type
 */

import QRCode from 'qrcode';
import {QrStyle} from '@/constants/templatePresets';

export interface QrRenderOptions {
  data: string;
  style: QrStyle;
  logoDataUrl?: string;
  logoPadding?: number;
  logoPaddingColor?: string;
  logoPaddingRadius?: number;
  frameText?: string;
}

export async function generateQrDataUrl(options: QrRenderOptions): Promise<string> {
  const { data, style, logoDataUrl, frameText } = options;
  const {
    size,
    darkColor,
    lightColor,
    backgroundColor,
    errorCorrectionLevel,
    margin,
    dotStyle,
    cornerStyle,
    gradientEnabled,
    gradientStart,
    gradientEnd,
    gradientDirection,
    backgroundPattern,
  } = style;
  const isTransparent = lightColor === 'transparent';

  const FRAME_HEIGHT = 48;
  const frameHeight = frameText ? FRAME_HEIGHT : 0;

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size + frameHeight;
  const ctx = canvas.getContext('2d', { alpha: true })!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const bgFill = isTransparent ? backgroundColor : lightColor;
  if (!isTransparent) {
    ctx.fillStyle = bgFill;
    ctx.fillRect(0, 0, size, size);
  }

  if (backgroundPattern && backgroundPattern !== 'none') {
    drawPattern(ctx, size, backgroundPattern, darkColor);
  }

  const qr = QRCode.create(data, { errorCorrectionLevel });
  const matrix = qr.modules;
  const moduleCount = matrix.size;
  const marginPx = margin * (size / (moduleCount + margin * 2));
  const cellSize = (size - marginPx * 2) / moduleCount;

  const padding = options.logoPadding ?? 16;
  const logoAreaSize = logoDataUrl ? size * 0.2 + padding * 2 : 0;
  const logoAreaPos = logoDataUrl ? (size - logoAreaSize) / 2 : 0;
  const logoAreaEnd = logoAreaPos + logoAreaSize;

  function isInLogoArea(x: number, y: number, w: number, h: number): boolean {
    if (!logoDataUrl || logoAreaSize === 0) return false;
    return x < logoAreaEnd && x + w > logoAreaPos && y < logoAreaEnd && y + h > logoAreaPos;
  }

  let fillStyle: string | CanvasGradient;
  if (gradientEnabled && gradientStart && gradientEnd) {
    const gradient =
      gradientDirection === 'horizontal'
        ? ctx.createLinearGradient(0, 0, size, 0)
        : gradientDirection === 'diagonal'
          ? ctx.createLinearGradient(0, 0, size, size)
          : ctx.createLinearGradient(0, 0, 0, size);
    gradient.addColorStop(0, gradientStart);
    gradient.addColorStop(1, gradientEnd);
    fillStyle = gradient;
  } else {
    fillStyle = darkColor;
  }

  ctx.fillStyle = fillStyle;

  const finderPositions = [
    { row: 0, col: 0 },
    { row: 0, col: moduleCount - 7 },
    { row: moduleCount - 7, col: 0 },
  ];
  const finderSet = new Set<string>();
  finderPositions.forEach(({ row, col }) => {
    for (let r = row; r < row + 7; r++) {
      for (let c = col; c < col + 7; c++) {
        finderSet.add(`${r},${c}`);
      }
    }
  });

  finderPositions.forEach(({ row, col }) => {
    const x = marginPx + col * cellSize;
    const y = marginPx + row * cellSize;
    const outerSize = 7 * cellSize;
    const innerSize = 3 * cellSize;
    const innerOffset = 2 * cellSize;
    const r = cornerStyle === 'rounded' ? cellSize * 0.4 : 0;

    ctx.fillStyle = fillStyle;
    roundRect(ctx, x, y, outerSize, outerSize, r);
    ctx.fill();

    if (!isTransparent) {
      ctx.fillStyle = bgFill;
      roundRect(ctx, x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize, r * 0.6);
      ctx.fill();
    } else {
      ctx.save();
      ctx.beginPath();
      roundRect(ctx, x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize, r * 0.6);
      ctx.clip();
      ctx.clearRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize);
      ctx.restore();
    }

    ctx.fillStyle = fillStyle;
    roundRect(ctx, x + innerOffset, y + innerOffset, innerSize, innerSize, r * 0.5);
    ctx.fill();
  });

  for (let row = 0; row < moduleCount; row++) {
    if (dotStyle === 'line') {
      let col = 0;
      while (col < moduleCount) {
        if (finderSet.has(`${row},${col}`) || !matrix.get(row, col)) {
          col++;
          continue;
        }
        let end = col;
        while (
          end + 1 < moduleCount &&
          matrix.get(row, end + 1) &&
          !finderSet.has(`${row},${end + 1}`)
        )
          end++;
        const x = marginPx + col * cellSize;
        const y = marginPx + row * cellSize;
        const w = (end - col + 1) * cellSize;
        const h = cellSize * 0.55;
        const yOffset = (cellSize - h) / 2;
        const r = h / 2;
        if (!isInLogoArea(x, y + yOffset, w, h)) {
          ctx.fillStyle = fillStyle;
          roundRect(ctx, x, y + yOffset, w, h, r);
          ctx.fill();
        }
        col = end + 1;
      }
    } else {
      for (let col = 0; col < moduleCount; col++) {
        if (finderSet.has(`${row},${col}`)) continue;
        if (!matrix.get(row, col)) continue;

        const x = marginPx + col * cellSize;
        const y = marginPx + row * cellSize;
        const pad = cellSize * 0.05;

        if (isInLogoArea(x, y, cellSize, cellSize)) continue;

        ctx.fillStyle = fillStyle;

        if (dotStyle === 'dot') {
          ctx.beginPath();
          ctx.arc(x + cellSize / 2, y + cellSize / 2, (cellSize / 2) * 0.8, 0, Math.PI * 2);
          ctx.fill();
        } else if (dotStyle === 'rounded') {
          roundRect(ctx, x + pad, y + pad, cellSize - pad * 2, cellSize - pad * 2, cellSize * 0.3);
          ctx.fill();
        } else {
          ctx.fillRect(x, y, cellSize, cellSize);
        }
      }
    }
  }

  if (logoDataUrl) {
    const padding = options.logoPadding ?? 16;
    const paddingColor = options.logoPaddingColor ?? 'transparent';
    const paddingRadius = options.logoPaddingRadius ?? 50;
    const resolvedPaddingColor = paddingColor === 'transparent' ? bgFill : paddingColor;
    await drawLogo(ctx, logoDataUrl, size, padding, resolvedPaddingColor, paddingRadius);
  }

  if (frameText) {
    ctx.fillStyle = darkColor;
    ctx.fillRect(0, size, size, FRAME_HEIGHT);
    ctx.fillStyle = lightColor === 'transparent' ? '#ffffff' : lightColor;
    ctx.font = `600 ${Math.round(FRAME_HEIGHT * 0.38)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(frameText, size / 2, size + FRAME_HEIGHT / 2, size - 16);
  }

  return canvas.toDataURL('image/png');
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

async function drawLogo(
  ctx: CanvasRenderingContext2D,
  logoDataUrl: string,
  size: number,
  padding: number,
  paddingColor: string,
  radiusPct: number
): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const logoSize = size * 0.2;
      const drawSize = logoSize + padding * 2;
      const cx = size / 2;
      const cy = size / 2;
      const pos = (size - drawSize) / 2;
      const radius = (radiusPct / 50) * (drawSize / 2);

      ctx.save();
      ctx.beginPath();
      if (radiusPct >= 50) {
        ctx.arc(cx, cy, drawSize / 2, 0, Math.PI * 2);
      } else {
        roundRectPath(ctx, pos, pos, drawSize, drawSize, radius);
      }
      ctx.clip();

      ctx.fillStyle = paddingColor;
      ctx.fillRect(pos, pos, drawSize, drawSize);

      ctx.drawImage(img, cx - logoSize / 2, cy - logoSize / 2, logoSize, logoSize);

      ctx.restore();
      resolve();
    };
    img.src = logoDataUrl;
  });
}

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawPattern(
  ctx: CanvasRenderingContext2D,
  size: number,
  pattern: 'dots' | 'grid' | 'waves',
  color: string
) {
  ctx.save();
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;

  if (pattern === 'dots') {
    const spacing = 20;
    for (let x = spacing / 2; x < size; x += spacing) {
      for (let y = spacing / 2; y < size; y += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (pattern === 'grid') {
    const spacing = 20;
    for (let x = 0; x < size; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, size);
      ctx.stroke();
    }
    for (let y = 0; y < size; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();
    }
  } else if (pattern === 'waves') {
    const amplitude = 10;
    const frequency = 0.02;
    ctx.lineWidth = 2;
    for (let y = 0; y < size; y += 20) {
      ctx.beginPath();
      for (let x = 0; x < size; x++) {
        const wave = y + amplitude * Math.sin(x * frequency);
        if (x === 0) ctx.moveTo(x, wave);
        else ctx.lineTo(x, wave);
      }
      ctx.stroke();
    }
  }

  ctx.restore();
}

export async function generateSvgString(data: string, style: QrStyle): Promise<string> {
  return QRCode.toString(data, {
    type: 'svg',
    margin: style.margin,
    errorCorrectionLevel: style.errorCorrectionLevel,
    color: { dark: style.darkColor, light: style.lightColor },
  });
}
