/**
 * Standard Fonts Available in CMAKER Studio
 */

export interface FontOption {
  family: string;
  name: string;
  category: 'serif' | 'sans-serif' | 'script' | 'display';
}

export const STUDIO_FONTS: FontOption[] = [
  { family: 'Cinzel, serif', name: 'Cinzel Decorative', category: 'display' },
  { family: 'Playfair Display, serif', name: 'Playfair Display', category: 'serif' },
  { family: 'Merriweather, serif', name: 'Merriweather Formal', category: 'serif' },
  { family: 'Montserrat, sans-serif', name: 'Montserrat Corporate', category: 'sans-serif' },
  { family: 'Inter, sans-serif', name: 'Inter Clean', category: 'sans-serif' },
  { family: 'Great Vibes, cursive', name: 'Great Vibes Calligraphy', category: 'script' }
];
