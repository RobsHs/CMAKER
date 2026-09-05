/**
 * SVG Path Generators for Vector Certificate Ornaments
 */

export function createCornerFiligreePath(size: number = 60): string {
  return [
    `M 0 0`,
    `L ${size} 0`,
    `C ${size * 0.7} ${size * 0.1}, ${size * 0.3} ${size * 0.3}, ${size * 0.1} ${size * 0.7}`,
    `L 0 ${size}`,
    `Z`
  ].join(' ');
}

export function createScallopedSealPath(radius: number, points: number = 24, depth: number = 6): string {
  const pathParts: string[] = [];
  const angleStep = (Math.PI * 2) / (points * 2);

  for (let i = 0; i < points * 2; i++) {
    const angle = i * angleStep;
    const r = i % 2 === 0 ? radius : radius - depth;
    const x = radius + r * Math.cos(angle);
    const y = radius + r * Math.sin(angle);
    pathParts.push(i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : `L ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  pathParts.push('Z');
  return pathParts.join(' ');
}

export function createRosetteDividerPath(width: number): string {
  const midX = width / 2;
  return [
    `M 0 0`,
    `L ${midX - 20} 0`,
    `M ${midX - 10} -5 L ${midX} 0 L ${midX - 10} 5 L ${midX - 20} 0 Z`,
    `M ${midX + 10} -5 L ${midX + 20} 0 L ${midX + 10} 5 L ${midX} 0 Z`,
    `M ${midX + 20} 0`,
    `L ${width} 0`
  ].join(' ');
}
