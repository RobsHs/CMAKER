import { sanitizeFileName } from '../utils/sanitize.ts';

export function testCsvParserSanitizer(): boolean {
  const raw = 'Student/Certificate:2026*final';
  const clean = sanitizeFileName(raw);
  if (clean.includes('/') || clean.includes(':') || clean.includes('*')) {
    throw new Error(`Failed to sanitize filename: ${clean}`);
  }
  return true;
}

testCsvParserSanitizer();
