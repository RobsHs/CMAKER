/**
 * Curated Color Palettes for Certificates
 */

export interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export const CERTIFICATE_PALETTES: ColorScheme[] = [
  { id: 'imperial-navy', name: 'Imperial Navy & Gold', primary: '#0f172a', secondary: '#1e3a8a', accent: '#d97706', background: '#fcfbf7' },
  { id: 'emerald-botanical', name: 'Heritage Emerald', primary: '#064e3b', secondary: '#047857', accent: '#b45309', background: '#fbfbf8' },
  { id: 'burgundy-prestige', name: 'Burgundy Prestige', primary: '#701a75', secondary: '#86198f', accent: '#d97706', background: '#fdfbf7' },
  { id: 'monochrome-luxury', name: 'Obsidian Minimalist', primary: '#111827', secondary: '#374151', accent: '#6b7280', background: '#ffffff' }
];
