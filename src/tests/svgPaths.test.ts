import { createCornerFiligreePath, createScallopedSealPath } from '../utils/svgPaths.ts';

export function testSvgPaths(): boolean {
  const filigree = createCornerFiligreePath(50);
  if (!filigree.startsWith('M 0 0')) throw new Error('Corner filigree path must start at origin');

  const scalloped = createScallopedSealPath(40, 12, 4);
  if (!scalloped.endsWith('Z')) throw new Error('Scalloped seal path must close with Z');
  return true;
}

testSvgPaths();
