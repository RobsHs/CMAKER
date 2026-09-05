/**
 * Unit Tests for Cryptographic Utilities
 */
import { computeSha256 } from '../utils/crypto.ts';

export async function testSha256Computation(): Promise<boolean> {
  const hash = await computeSha256('CMAKER');
  if (typeof hash !== 'string' || hash.length !== 64) {
    throw new Error(`Invalid SHA-256 output: ${hash}`);
  }
  return true;
}
