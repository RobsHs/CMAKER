import { saveAs } from 'file-saver';
import { renderCertificateToDataUrl } from './exportPdf';
import { ExportQuality } from '../types/certificate';

export async function downloadCertificateImage(
  element: HTMLElement,
  filename: string,
  format: 'png' | 'jpg' = 'png',
  quality: ExportQuality = 'high'
): Promise<void> {
  try {
    const dataUrl = await renderCertificateToDataUrl(
      element,
      format === 'jpg' ? 'jpeg' : 'png',
      quality
    );

    // Convert dataUrl to blob
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const cleanFilename = `${filename.replace(/\.(png|jpg|jpeg)$/i, '')}.${format}`;

    saveAs(blob, cleanFilename);
  } catch (error) {
    console.error('Failed to download certificate image:', error);
    throw new Error(`Unable to generate ${format.toUpperCase()} image.`);
  }
}

