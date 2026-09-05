import fs from 'node:fs';
import path from 'node:path';

function generateRandomParticipants(count = 10) {
  const rows = ['recipient_name,course_name,issue_date,certificate_id'];
  for (let i = 1; i <= count; i++) {
    rows.push(`"Participant ${i}","Enterprise Certification 2026","2026-09-05","CERT-GEN-${String(i).padStart(4, '0')}"`);
  }
  return rows.join('\n');
}

const outDir = path.resolve('public/samples');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'synthetic_batch_10.csv'), generateRandomParticipants(10));
console.log('✓ Generated synthetic batch CSV dataset in public/samples/');
