import { createWorkspaceBackup, parseWorkspaceBackup } from '../utils/storageBackup.ts';

export function testStorageBackup(): boolean {
  const jsonStr = createWorkspaceBackup([{ id: 'p1', name: 'Diploma' }], [{ id: 's1' }]);
  const parsed = parseWorkspaceBackup(jsonStr);

  if (parsed.version !== '1.1.0') throw new Error('Invalid backup version');
  if (parsed.projects.length !== 1) throw new Error('Backup projects mismatch');
  return true;
}

testStorageBackup();
