/**
 * Canvas Export Resolution & Print Profile Models
 */

export type PrintDpi = 72 | 150 | 300 | 600;

export interface PrintMarginConfig {
  topMm: number;
  rightMm: number;
  bottomMm: number;
  leftMm: number;
}

export interface ExportProfile {
  name: string;
  dpi: PrintDpi;
  scaleFactor: number;
  recommendedFor: 'web_preview' | 'digital_sharing' | 'professional_print';
  estimatedFileSizeMb: number;
}

export const EXPORT_PROFILES: Record<string, ExportProfile> = {
  WEB_PREVIEW: {
    name: 'Screen Preview (72 DPI)',
    dpi: 72,
    scaleFactor: 1.0,
    recommendedFor: 'web_preview',
    estimatedFileSizeMb: 0.3
  },
  DIGITAL_DISTRIBUTION: {
    name: 'High Quality Digital (150 DPI)',
    dpi: 150,
    scaleFactor: 1.56,
    recommendedFor: 'digital_sharing',
    estimatedFileSizeMb: 0.8
  },
  PRINT_PRODUCTION: {
    name: 'Commercial Press (300 DPI)',
    dpi: 300,
    scaleFactor: 3.125,
    recommendedFor: 'professional_print',
    estimatedFileSizeMb: 2.4
  }
};
