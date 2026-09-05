/**
 * QR Verification Payload Utilities
 */

export interface QrVerificationData {
  certId: string;
  baseUrl: string;
}

export function buildVerificationUrl(baseUrl: string, certificateId: string): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const cleanId = encodeURIComponent(certificateId.trim());
  return `${cleanBase}/verify/${cleanId}`;
}

export function extractCertificateIdFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const match = parsed.pathname.match(/\/verify\/([^/]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  } catch {
    return null;
  }
}
