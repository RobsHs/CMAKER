/**
 * Verification & Credential Registry Types for CMAKER
 */

export type CredentialStatus = 'valid' | 'revoked' | 'expired' | 'not_found';

export interface VerificationAuditEntry {
  id: string;
  certificateId: string;
  recipientName: string;
  status: CredentialStatus;
  timestamp: string;
  verifiedByIp?: string;
  userAgent?: string;
  scanSource: 'qr_scan' | 'manual_lookup' | 'api_query';
}

export interface RevocationRecord {
  certificateId: string;
  revokedAt: string;
  revokedBy: string;
  reason: string;
  canReinstate: boolean;
}

export interface VerificationRegistryItem {
  certificateId: string;
  recipientName: string;
  recipientEmail?: string;
  courseName: string;
  issueDate: string;
  expiryDate?: string;
  status: CredentialStatus;
  issuerName: string;
  revocation?: RevocationRecord;
  metadata?: Record<string, string | number | boolean>;
}
