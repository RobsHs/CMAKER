import { formatCertificateDate } from '../utils/dateFormatter.ts';

export function testDateFormatter(): boolean {
  const sampleDate = '2026-09-05T00:00:00Z';
  const iso = formatCertificateDate(sampleDate, 'iso');
  if (iso !== '2026-09-05') throw new Error(`Expected 2026-09-05, got ${iso}`);

  const idFormal = formatCertificateDate(sampleDate, 'id_formal');
  if (!idFormal.includes('September') && !idFormal.includes('2026')) {
    throw new Error(`Indonesian date format failed: ${idFormal}`);
  }
  return true;
}

testDateFormatter();
