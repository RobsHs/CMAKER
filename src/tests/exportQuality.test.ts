import { EXPORT_PROFILES } from '../types/export.ts';

export function testExportProfiles(): boolean {
  const printProfile = EXPORT_PROFILES.PRINT_PRODUCTION;
  if (printProfile.dpi !== 300) {
    throw new Error(`Expected 300 DPI, got ${printProfile.dpi}`);
  }
  if (printProfile.scaleFactor <= 2.0) {
    throw new Error('300 DPI scale factor must be greater than 2.0');
  }
  return true;
}

testExportProfiles();
