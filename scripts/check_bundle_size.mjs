import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
if (fs.existsSync(distDir)) {
  const files = fs.readdirSync(path.join(distDir, 'assets'));
  console.log('Dist assets inspection:');
  for (const f of files) {
    const stats = fs.statSync(path.join(distDir, 'assets', f));
    console.log(` - ${f}: ${(stats.size / 1024).toFixed(1)} KB`);
  }
} else {
  console.log('Dist folder not built yet, run npm run build first.');
}
