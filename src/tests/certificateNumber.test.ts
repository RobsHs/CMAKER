/**
 * Unit Tests for Certificate Number Utilities
 */
import { generateCertificateId, validateCertificateNumber } from '../utils/certificateNumber.ts';

export function testCertificateNumberGeneration(): boolean {
  const id1 = generateCertificateId([], { prefix: 'CERT' });
  const id2 = generateCertificateId([], { prefix: 'UNIV' });

  if (!id1.startsWith('CERT-')) {
    throw new Error(`Expected prefix CERT-, got ${id1}`);
  }
  if (!id2.startsWith('UNIV-')) {
    throw new Error(`Expected prefix UNIV-, got ${id2}`);
  }
  if (!validateCertificateNumber(id1, 'CERT')) {
    throw new Error(`Validation failed for valid ID ${id1}`);
  }
  return true;
}

testCertificateNumberGeneration();
