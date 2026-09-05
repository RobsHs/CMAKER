import { preloadFont } from '../utils/fontLoader.ts';

export async function testFontPreloader(): Promise<boolean> {
  const result = await preloadFont('Arial', 400);
  if (typeof result !== 'boolean') {
    throw new Error('preloadFont should return boolean');
  }
  return true;
}
