/**
 * Unit Tests for WCAG Contrast Calculation
 */
import { getContrastRatio, isWcagCompliant } from '../utils/contrast.ts';

export function testContrastRatio(): boolean {
  // Black on White should be 21:1
  const blackOnWhite = getContrastRatio('#000000', '#ffffff');
  if (Math.round(blackOnWhite) !== 21) {
    throw new Error(`Expected black on white contrast 21, got ${blackOnWhite}`);
  }

  // Same color should be 1:1
  const sameColor = getContrastRatio('#ffffff', '#ffffff');
  if (Math.round(sameColor) !== 1) {
    throw new Error(`Expected same color contrast 1, got ${sameColor}`);
  }

  if (!isWcagCompliant('#000000', '#ffffff', 'AAA')) {
    throw new Error('Black on white must pass WCAG AAA');
  }

  return true;
}

testContrastRatio();
