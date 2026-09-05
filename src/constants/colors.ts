export interface ColorPreset {
  name: string;
  value: string;
  category: 'neutral' | 'luxury' | 'corporate' | 'accent';
}

export const CERTIFICATE_COLORS: ColorPreset[] = [
  // Neutrals & Parchments
  { name: 'Pure White', value: '#FFFFFF', category: 'neutral' },
  { name: 'Soft Ivory', value: '#FCFAF5', category: 'neutral' },
  { name: 'Warm Cream', value: '#F9F6EE', category: 'neutral' },
  { name: 'Alabaster', value: '#F7F7F7', category: 'neutral' },
  { name: 'Parchment', value: '#F4EFE6', category: 'neutral' },
  { name: 'Slate Light', value: '#F1F5F9', category: 'neutral' },
  { name: 'Charcoal Deep', value: '#1E293B', category: 'neutral' },
  { name: 'Jet Black', value: '#0F172A', category: 'neutral' },

  // Luxury & Metallic Tones
  { name: 'Antique Gold', value: '#D4AF37', category: 'luxury' },
  { name: 'Polished Gold', value: '#C5A059', category: 'luxury' },
  { name: 'Warm Bronze', value: '#CD7F32', category: 'luxury' },
  { name: 'Champagne', value: '#F7E7CE', category: 'luxury' },
  { name: 'Silver Platinum', value: '#E5E7EB', category: 'luxury' },
  { name: 'Deep Brass', value: '#B8860B', category: 'luxury' },

  // Corporate & Professional
  { name: 'Midnight Navy', value: '#0F172A', category: 'corporate' },
  { name: 'Royal Blue', value: '#1E40AF', category: 'corporate' },
  { name: 'Sapphire', value: '#1D4ED8', category: 'corporate' },
  { name: 'Steel Blue', value: '#3B82F6', category: 'corporate' },
  { name: 'Imperial Emerald', value: '#064E3B', category: 'corporate' },
  { name: 'Forest Green', value: '#047857', category: 'corporate' },
  { name: 'Deep Burgundy', value: '#831843', category: 'corporate' },
  { name: 'Crimson Wine', value: '#881337', category: 'corporate' },
];

export const GRADIENT_PRESETS = [
  { name: 'Ivory Shimmer', from: '#FFFFFF', to: '#F7F4EB', angle: 135 },
  { name: 'Imperial Gold', from: '#DFBA73', to: '#C5A059', angle: 45 },
  { name: 'Royal Navy', from: '#0F172A', to: '#1E3A8A', angle: 135 },
  { name: 'Emerald Prestige', from: '#064E3B', to: '#047857', angle: 135 },
  { name: 'Burgundy Elegance', from: '#831843', to: '#500724', angle: 135 },
  { name: 'Platinum Frost', from: '#F8FAFC', to: '#E2E8F0', angle: 180 },
  { name: 'Midnight Cyber', from: '#090D16', to: '#1E1B4B', angle: 135 },
];

