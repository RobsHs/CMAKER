export interface FontOption {
  name: string;
  family: string;
  category: 'serif' | 'sans-serif' | 'script' | 'mono';
  weights: number[];
  previewText?: string;
}

export const AVAILABLE_FONTS: FontOption[] = [
  // Serif Fonts
  {
    name: 'Playfair Display',
    family: "'Playfair Display', Georgia, serif",
    category: 'serif',
    weights: [400, 600, 700, 800],
    previewText: 'Playfair Display'
  },
  {
    name: 'Libre Baskerville',
    family: "'Libre Baskerville', Garamond, serif",
    category: 'serif',
    weights: [400, 700],
    previewText: 'Libre Baskerville'
  },
  {
    name: 'Cormorant Garamond',
    family: "'Cormorant Garamond', serif",
    category: 'serif',
    weights: [400, 600, 700],
    previewText: 'Cormorant Garamond'
  },
  {
    name: 'Merriweather',
    family: "'Merriweather', serif",
    category: 'serif',
    weights: [300, 400, 700],
    previewText: 'Merriweather'
  },

  // Sans-Serif Fonts
  {
    name: 'Inter',
    family: "'Inter', sans-serif",
    category: 'sans-serif',
    weights: [300, 400, 500, 600, 700, 800],
    previewText: 'Inter Modern'
  },
  {
    name: 'Poppins',
    family: "'Poppins', sans-serif",
    category: 'sans-serif',
    weights: [300, 400, 500, 600, 700],
    previewText: 'Poppins Sans'
  },
  {
    name: 'Montserrat',
    family: "'Montserrat', sans-serif",
    category: 'sans-serif',
    weights: [300, 400, 500, 600, 700, 800],
    previewText: 'Montserrat Clean'
  },
  {
    name: 'Open Sans',
    family: "'Open Sans', sans-serif",
    category: 'sans-serif',
    weights: [300, 400, 600, 700],
    previewText: 'Open Sans Neutral'
  },

  // Script & Calligraphy
  {
    name: 'Great Vibes',
    family: "'Great Vibes', cursive",
    category: 'script',
    weights: [400],
    previewText: 'Great Vibes Calligraphy'
  },
  {
    name: 'Allura',
    family: "'Allura', cursive",
    category: 'script',
    weights: [400],
    previewText: 'Allura Formal Script'
  },
  {
    name: 'Alex Brush',
    family: "'Alex Brush', cursive",
    category: 'script',
    weights: [400],
    previewText: 'Alex Brush Signature'
  },

  // Monospace
  {
    name: 'JetBrains Mono',
    family: "'JetBrains Mono', monospace",
    category: 'mono',
    weights: [400, 600],
    previewText: 'CERT-2026-0001'
  }
];

