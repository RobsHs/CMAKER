import { CanvasDimensions, PaperSize } from '../types/certificate';

export interface SizePreset {
  id: PaperSize;
  label: string;
  dimensions: CanvasDimensions;
  mmWidth: number;
  mmHeight: number;
}

export const PAPER_SIZE_PRESETS: Record<PaperSize, SizePreset> = {
  'a4-landscape': {
    id: 'a4-landscape',
    label: 'A4 Landscape (297 × 210 mm)',
    dimensions: {
      width: 1123,
      height: 794,
      unit: 'px',
      name: 'a4-landscape',
      orientation: 'landscape'
    },
    mmWidth: 297,
    mmHeight: 210
  },
  'a4-portrait': {
    id: 'a4-portrait',
    label: 'A4 Portrait (210 × 297 mm)',
    dimensions: {
      width: 794,
      height: 1123,
      unit: 'px',
      name: 'a4-portrait',
      orientation: 'portrait'
    },
    mmWidth: 210,
    mmHeight: 297
  },
  'letter-landscape': {
    id: 'letter-landscape',
    label: 'US Letter Landscape (11 × 8.5 in)',
    dimensions: {
      width: 1056,
      height: 816,
      unit: 'px',
      name: 'letter-landscape',
      orientation: 'landscape'
    },
    mmWidth: 279.4,
    mmHeight: 215.9
  },
  'letter-portrait': {
    id: 'letter-portrait',
    label: 'US Letter Portrait (8.5 × 11 in)',
    dimensions: {
      width: 816,
      height: 1056,
      unit: 'px',
      name: 'letter-portrait',
      orientation: 'portrait'
    },
    mmWidth: 215.9,
    mmHeight: 279.4
  },
  'custom': {
    id: 'custom',
    label: 'Custom Size',
    dimensions: {
      width: 1200,
      height: 800,
      unit: 'px',
      name: 'custom',
      orientation: 'landscape'
    },
    mmWidth: 317.5,
    mmHeight: 211.7
  }
};

