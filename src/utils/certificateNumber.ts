export interface IdGeneratorOptions {
  prefix?: string;
  pattern?: string;
  year?: number;
  month?: number;
  sequence?: number;
  useRandom?: boolean;
}

export function generateCertificateId(
  existingIds: string[] = [],
  options: IdGeneratorOptions = {}
): string {
  const now = new Date();
  const year = options.year ?? now.getFullYear();
  const month = String(options.month ?? now.getMonth() + 1).padStart(2, '0');
  const pattern = options.pattern || 'CERT-{YEAR}-{NUMBER}';
  const prefix = options.prefix || 'CERT';

  let nextSequence = options.sequence ?? (existingIds.length + 1);
  let generatedId = '';
  let attempts = 0;

  while (attempts < 1000) {
    let numberStr = '';
    if (options.useRandom) {
      numberStr = Math.floor(100000 + Math.random() * 900000).toString();
    } else {
      numberStr = String(nextSequence).padStart(6, '0');
    }

    generatedId = pattern
      .replace('{PREFIX}', prefix)
      .replace('{YEAR}', String(year))
      .replace('{MONTH}', month)
      .replace('{NUMBER}', numberStr);

    if (!existingIds.includes(generatedId)) {
      break;
    }

    nextSequence++;
    attempts++;
  }

  return generatedId || `${prefix}-${year}-${Math.floor(100000 + Math.random() * 900000)}`;
}

export function validateCertificateNumber(id: string, prefix?: string): boolean {
  if (!id || typeof id !== 'string') return false;
  if (prefix && !id.startsWith(prefix)) return false;
  return id.length >= 8;
}

