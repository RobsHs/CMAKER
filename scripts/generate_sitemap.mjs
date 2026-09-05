import fs from 'node:fs';
import path from 'node:path';

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://cmaker.app/</loc><priority>1.0</priority></url>
  <url><loc>https://cmaker.app/templates</loc><priority>0.9</priority></url>
  <url><loc>https://cmaker.app/bulk</loc><priority>0.8</priority></url>
  <url><loc>https://cmaker.app/verify</loc><priority>0.8</priority></url>
</urlset>`;

fs.writeFileSync(path.resolve('public/sitemap.xml'), xml);
console.log('✓ Updated public/sitemap.xml');
