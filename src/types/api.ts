/**
 * API Contract Types for CMAKER Credential Endpoints
 */

export interface ApiVerifyResponse {
  success: boolean;
  certificateId: string;
  status: 'valid' | 'revoked' | 'expired' | 'not_found';
  recipientName?: string;
  courseTitle?: string;
  issuedAt?: string;
  revocationReason?: string;
}
