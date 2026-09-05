import { CertificateDataFields } from '../types/certificate';

export function interpolateVariables(templateText: string, data: CertificateDataFields): string {
  if (!templateText) return '';
  
  return templateText.replace(/\{\{\s*([a-zA-Z0-9_-]+)\s*\}\}/g, (match, key) => {
    // Check known standard fields
    if (key in data) {
      const val = (data as unknown as Record<string, unknown>)[key];
      return val !== undefined && val !== null ? String(val) : match;
    }
    // Check custom fields
    if (data.custom_fields && key in data.custom_fields) {
      return data.custom_fields[key] || '';
    }
    return match; // Return unchanged if variable unknown
  });
}

