import QRCode from 'qrcode';

export interface QRCodeOptions {
  url: string;
  fgColor?: string;
  bgColor?: string;
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  margin?: number;
  width?: number;
}

export async function generateQRCodeDataUrl(options: QRCodeOptions): Promise<string> {
  try {
    const dataUrl = await QRCode.toDataURL(options.url, {
      errorCorrectionLevel: options.errorCorrectionLevel || 'M',
      margin: options.margin !== undefined ? options.margin : 1,
      color: {
        dark: options.fgColor || '#0F172A',
        light: options.bgColor || '#FFFFFF'
      },
      width: options.width || 256
    });
    return dataUrl;
  } catch (error) {
    console.error('Failed to generate QR code data URL:', error);
    return '';
  }
}

