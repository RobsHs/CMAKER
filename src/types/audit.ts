/**
 * Credential Audit Trail Types
 */

export interface CredentialAuditRecord {
  id: string;
  certificateId: string;
  action: 'ISSUED' | 'VIEWED' | 'REVOKED' | 'REINSTATED' | 'EXPORTED';
  actor: string;
  timestamp: string;
  notes?: string;
}
