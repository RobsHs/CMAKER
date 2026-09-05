/**
 * Workspace Data Backup & Restore
 */

export interface WorkspaceBackupPayload {
  version: string;
  exportedAt: string;
  projects: any[];
  signatures: any[];
}

export function createWorkspaceBackup(projects: any[], signatures: any[]): string {
  const payload: WorkspaceBackupPayload = {
    version: '1.1.0',
    exportedAt: new Date().toISOString(),
    projects,
    signatures
  };
  return JSON.stringify(payload, null, 2);
}

export function parseWorkspaceBackup(jsonStr: string): WorkspaceBackupPayload {
  const parsed = JSON.parse(jsonStr);
  if (!parsed.projects || !Array.isArray(parsed.projects)) {
    throw new Error('Invalid workspace backup format: missing projects array');
  }
  return parsed;
}
