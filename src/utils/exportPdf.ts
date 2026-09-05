import { toPng, toJpeg } from 'html-to-image';
import jsPDF from 'jspdf';
import { CanvasDimensions, ExportQuality } from '../types/certificate';
import { PAPER_SIZE_PRESETS } from '../constants/sizes';

export interface PdfExportOptions {
  element: HTMLElement;
  filename: string;
  dimensions: CanvasDimensions;
  quality?: ExportQuality;
}

export async function exportCertificateToPdf({
  element,
  filename,
  dimensions,
  quality = 'high'
}: PdfExportOptions): Promise<void> {
  // Determine pixel density multiplier based on selected quality
  let pixelRatio = 3; // ~300 DPI
  if (quality === 'standard') pixelRatio = 2; // ~150-200 DPI
  if (quality === 'print') pixelRatio = 4; // ~400 DPI Archival

  try {
    // Render the DOM node to high-res PNG
    const dataUrl = await toPng(element, {
      pixelRatio,
      cacheBust: true,
      skipAutoScale: true,
      style: {
        transform: 'none',
        transformOrigin: 'top left'
      }
    });

    const preset = PAPER_SIZE_PRESETS[dimensions.name] || PAPER_SIZE_PRESETS['a4-landscape'];
    const isLandscape = dimensions.orientation === 'landscape';

    const doc = new jsPDF({
      orientation: isLandscape ? 'landscape' : 'portrait',
      unit: 'mm',
      format: [preset.mmWidth, preset.mmHeight]
    });

    // Add image precisely stretching from 0, 0 to preset width, height
    const targetWidth = isLandscape ? Math.max(preset.mmWidth, preset.mmHeight) : Math.min(preset.mmWidth, preset.mmHeight);
    const targetHeight = isLandscape ? Math.min(preset.mmWidth, preset.mmHeight) : Math.max(preset.mmWidth, preset.mmHeight);

    doc.addImage(
      dataUrl,
      'PNG',
      0,
      0,
      targetWidth,
      targetHeight,
      undefined,
      quality === 'print' ? 'NONE' : 'FAST'
    );

    doc.save(`${filename.replace(/\.pdf$/i, '')}.pdf`);
  } catch (error) {
    console.error('Failed to export certificate PDF:', error);
    throw new Error('Unable to generate PDF document. Please try again.');
  }
}

export async function renderCertificateToDataUrl(
  element: HTMLElement,
  format: 'png' | 'jpeg' = 'png',
  quality: ExportQuality = 'high'
): Promise<string> {
  let pixelRatio = 3;
  if (quality === 'standard') pixelRatio = 2;
  if (quality === 'print') pixelRatio = 4;

  const renderFn = format === 'jpeg' ? toJpeg : toPng;

  return await renderFn(element, {
    pixelRatio,
    quality: 0.95,
    cacheBust: true,
    skipAutoScale: true,
    style: {
      transform: 'none',
      transformOrigin: 'top left'
    }
  });
}

