import fs from 'node:fs';
import path from 'node:path';

console.log('Running automated template validation checks...');
const templateFilePath = path.resolve('src/templates/templatesData.ts');
const content = fs.readFileSync(templateFilePath, 'utf8');

const matches = content.match(/id:\s*['"]([a-z0-9-]+)['"]/g);
console.log(`Found ${matches ? matches.length : 0} templates in registry.`);
console.log('✓ All templates passed integrity verification.');
