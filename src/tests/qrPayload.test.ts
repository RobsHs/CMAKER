import { buildVerificationUrl, extractCertificateIdFromUrl } from '../utils/qrPayload.ts';

export function testQrPayloadUtils(): boolean {
  const url = buildVerificationUrl('https://cmaker.app', 'CERT-2026-8812');
  if (url !== 'https://cmaker.app/verify/CERT-2026-8812') {
    throw new Error(`Unexpected verification URL: ${url}`);
  }

  const id = extractCertificateIdFromUrl(url);
  if (id !== 'CERT-2026-8812') {
    throw new Error(`Failed to extract cert ID: ${id}`);
  }
  return true;
}

testQrPayloadUtils();
