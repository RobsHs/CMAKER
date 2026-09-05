/**
 * Physical Dimension Conversion Utilities (mm, pt, px)
 */

export const INCH_IN_MM = 25.4;
export const POINTS_PER_INCH = 72;

export function mmToPx(mm: number, dpi: number = 96): number {
  return (mm / INCH_IN_MM) * dpi;
}

export function pxToMm(px: number, dpi: number = 96): number {
  return (px / dpi) * INCH_IN_MM;
}

export function mmToPt(mm: number): number {
  return (mm / INCH_IN_MM) * POINTS_PER_INCH;
}

export function ptToMm(pt: number): number {
  return (pt / POINTS_PER_INCH) * INCH_IN_MM;
}

export function formatDimensions(widthMm: number, heightMm: number, unit: 'mm' | 'in' = 'mm'): string {
  if (unit === 'in') {
    return `${(widthMm / INCH_IN_MM).toFixed(1)} × ${(heightMm / INCH_IN_MM).toFixed(1)} in`;
  }
  return `${Math.round(widthMm)} × ${Math.round(heightMm)} mm`;
}
