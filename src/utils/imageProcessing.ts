export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateImageFile(file: File, maxSizeMB: number = 5): FileValidationResult {
  const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];
  
  if (!allowedMimeTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid file format. Allowed formats: PNG, JPG, JPEG, WEBP, SVG.'
    };
  }

  const maxBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      isValid: false,
      error: `File is too large. Maximum size allowed is ${maxSizeMB} MB.`
    };
  }

  return { isValid: true };
}

export async function removeImageWhiteBackground(
  imageSrc: string,
  threshold: number = 220,
  strokeDarken: boolean = true
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(imageSrc);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Calculate brightness / luminance
          const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

          if (luminance >= threshold) {
            // White or near-white -> transparent
            data[i + 3] = 0;
          } else {
            // Dark ink stroke -> preserve or slightly enhance contrast
            const distance = threshold - luminance;
            const alpha = Math.min(255, distance * 3.5);
            data[i + 3] = alpha;

            if (strokeDarken) {
              // Deepen ink color towards rich dark charcoal
              data[i] = Math.max(15, Math.floor(r * 0.7));
              data[i + 1] = Math.max(23, Math.floor(g * 0.7));
              data[i + 2] = Math.max(42, Math.floor(b * 0.7));
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch (err) {
        console.error('Error processing signature transparency:', err);
        resolve(imageSrc); // Fallback to original
      }
    };
    img.onerror = () => reject(new Error('Failed to load image for processing'));
    img.src = imageSrc;
  });
}

