/**
 * Cryptographic Fingerprint Utilities for CMAKER Certificates
 */

export async function computeSha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function generateCertificateFingerprint(params: {
  certificateId: string;
  recipientName: string;
  issueDate: string;
  issuerName: string;
}): Promise<string> {
  const canonicalPayload = [
    params.certificateId.trim().toUpperCase(),
    params.recipientName.trim().toLowerCase(),
    params.issueDate.trim(),
    params.issuerName.trim().toLowerCase()
  ].join('|');

  return computeSha256(canonicalPayload);
}

export async function verifyCertificateFingerprint(
  params: {
    certificateId: string;
    recipientName: string;
    issueDate: string;
    issuerName: string;
  },
  expectedHash: string
): Promise<boolean> {
  const computed = await generateCertificateFingerprint(params);
  return computed.toLowerCase() === expectedHash.toLowerCase();
}
