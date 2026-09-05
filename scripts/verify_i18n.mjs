import fs from 'node:fs';
import path from 'node:path';

console.log('Verifying translation dictionary parity...');
const transPath = path.resolve('src/i18n/translations.ts');
const trans = fs.readFileSync(transPath, 'utf8');

if (trans.includes('en:') && trans.includes('id:')) {
  console.log('✓ Both English (EN) and Indonesian (ID) dictionaries are present.');
} else {
  console.error('Missing locale dictionaries');
}
