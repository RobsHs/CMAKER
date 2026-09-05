/**
 * Multilingual Date Formatter for Certificates
 */

export type DateFormatStyle = 'iso' | 'us_formal' | 'uk_formal' | 'id_formal';

export function formatCertificateDate(dateInput: string | Date, style: DateFormatStyle = 'us_formal'): string {
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(d.getTime())) return String(dateInput);

  const day = d.getDate();
  const year = d.getFullYear();

  const monthsEn = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthsId = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  switch (style) {
    case 'iso':
      return d.toISOString().split('T')[0];
    case 'uk_formal':
      return `${day} ${monthsEn[d.getMonth()]} ${year}`;
    case 'id_formal':
      return `${day} ${monthsId[d.getMonth()]} ${year}`;
    case 'us_formal':
    default:
      return `${monthsEn[d.getMonth()]} ${day}, ${year}`;
  }
}
