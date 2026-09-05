/**
 * Studio Canvas & Viewport Types
 */

export interface ViewportTransform {
  zoom: number;
  panX: number;
  panY: number;
}

export interface GridConfig {
  enabled: boolean;
  size: number;
  snap: boolean;
  color: string;
}

export interface RulerConfig {
  visible: boolean;
  unit: 'mm' | 'px' | 'in';
}
