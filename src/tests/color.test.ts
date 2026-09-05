import { hexToRgb, rgbToHex, hexWithAlpha } from '../utils/color.ts';

export function testColorUtils(): boolean {
  const rgb = hexToRgb('#ffffff');
  if (rgb.r !== 255 || rgb.g !== 255 || rgb.b !== 255) {
    throw new Error('hexToRgb failed for white');
  }

  const hex = rgbToHex(0, 0, 0);
  if (hex !== '#000000') {
    throw new Error(`rgbToHex failed, expected #000000, got ${hex}`);
  }

  const alphaStr = hexWithAlpha('#000000', 0.5);
  if (!alphaStr.includes('0.5')) {
    throw new Error('hexWithAlpha failed');
  }
  return true;
}

testColorUtils();
