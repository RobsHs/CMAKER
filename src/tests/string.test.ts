import { interpolateTokens, slugify, capitalizeWords } from '../utils/string.ts';

export function testStringUtils(): boolean {
  const interpolated = interpolateTokens('Hello {{recipient_name}}!', { recipient_name: 'John Doe' });
  if (interpolated !== 'Hello John Doe!') {
    throw new Error(`Token interpolation failed: ${interpolated}`);
  }

  const slug = slugify('CMAKER Certificate Studio 2026');
  if (slug !== 'cmaker-certificate-studio-2026') {
    throw new Error(`Slugify failed: ${slug}`);
  }

  const capitalized = capitalizeWords('software engineer');
  if (capitalized !== 'Software Engineer') {
    throw new Error(`CapitalizeWords failed: ${capitalized}`);
  }
  return true;
}

testStringUtils();
