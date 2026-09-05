import { clamp, snapToGrid, degToRad } from '../utils/math.ts';

export function testMathUtils(): boolean {
  if (clamp(105, 0, 100) !== 100) throw new Error('Clamp max failed');
  if (clamp(-5, 0, 100) !== 0) throw new Error('Clamp min failed');

  if (snapToGrid(23, 10) !== 20) throw new Error('SnapToGrid round down failed');
  if (snapToGrid(27, 10) !== 30) throw new Error('SnapToGrid round up failed');

  const rad = degToRad(180);
  if (Math.abs(rad - Math.PI) > 0.0001) throw new Error('degToRad failed');
  return true;
}

testMathUtils();
