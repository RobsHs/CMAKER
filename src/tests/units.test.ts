/**
 * Unit Tests for Dimensions & Unit Conversion
 */
import { mmToPx, pxToMm, mmToPt, ptToMm, INCH_IN_MM } from '../utils/units.ts';

export function testUnitConversions(): boolean {
  // 25.4 mm should equal 96 px at 96 DPI
  const px = mmToPx(INCH_IN_MM, 96);
  if (Math.abs(px - 96) > 0.001) {
    throw new Error(`Expected 96px, got ${px}`);
  }

  // 96 px should equal 25.4 mm at 96 DPI
  const mm = pxToMm(96, 96);
  if (Math.abs(mm - INCH_IN_MM) > 0.001) {
    throw new Error(`Expected 25.4mm, got ${mm}`);
  }

  // 25.4 mm should equal 72 pt
  const pt = mmToPt(INCH_IN_MM);
  if (Math.abs(pt - 72) > 0.001) {
    throw new Error(`Expected 72pt, got ${pt}`);
  }

  const backMm = ptToMm(72);
  if (Math.abs(backMm - INCH_IN_MM) > 0.001) {
    throw new Error(`Expected 25.4mm, got ${backMm}`);
  }

  return true;
}

testUnitConversions();
