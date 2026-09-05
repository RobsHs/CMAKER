/**
 * Typography & Font Catalog Types
 */

export type FontStyleType = 'serif' | 'sans-serif' | 'script' | 'monospaced';

export interface FontFamilyDefinition {
  id: string;
  name: string;
  category: FontStyleType;
  weights: number[];
  isGoogleFont: boolean;
  sampleText?: string;
}
