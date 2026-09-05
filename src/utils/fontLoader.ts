/**
 * Dynamic Font Preloading Utilities
 */

export async function preloadFont(fontFamily: string, weight: number | string = '400'): Promise<boolean> {
  if (typeof document === 'undefined' || !('fonts' in document)) {
    return true;
  }
  try {
    const fontSpec = `${weight} 16px "${fontFamily}"`;
    await (document as any).fonts.load(fontSpec);
    return (document as any).fonts.check(fontSpec);
  } catch (err) {
    console.warn(`Could not preload font "${fontFamily}":`, err);
    return false;
  }
}
