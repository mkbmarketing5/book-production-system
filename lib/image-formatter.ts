// Image formatter utility for resizing and converting images
import sharp from 'sharp';

interface ImageFormatOptions {
  width?: number;
  height?: number;
  dpi?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp' | 'tiff';
  colorSpace?: 'srgb' | 'cmyk';
}

export async function formatImage(
  imageBuffer: Buffer,
  options: ImageFormatOptions
): Promise<Buffer> {
  let pipeline = sharp(imageBuffer);

  // Resize if dimensions provided
  if (options.width || options.height) {
    pipeline = pipeline.resize(options.width, options.height, {
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  // Convert to appropriate format
  const format = options.format || 'jpeg';
  const quality = options.quality || 90;

  if (format === 'jpeg') {
    pipeline = pipeline.jpeg({ quality, progressive: true });
  } else if (format === 'png') {
    pipeline = pipeline.png({ compressionLevel: 9 });
  } else if (format === 'webp') {
    pipeline = pipeline.webp({ quality });
  } else if (format === 'tiff') {
    pipeline = pipeline.tiff();
  }

  return pipeline.toBuffer();
}

export function calculateImageDimensions(
  originalWidth: number,
  originalHeight: number,
  targetWidth: number,
  maintainAspect: boolean = true
): { width: number; height: number } {
  if (!maintainAspect) {
    return { width: targetWidth, height: targetWidth };
  }

  const aspectRatio = originalHeight / originalWidth;
  return {
    width: targetWidth,
    height: Math.round(targetWidth * aspectRatio),
  };
}

export function pixelsToInches(pixels: number, dpi: number): number {
  return pixels / dpi;
}

export function inchesToPixels(inches: number, dpi: number): number {
  return Math.round(inches * dpi);
}

export function validateImageResolution(dpi: number, minimum: number = 150): boolean {
  return dpi >= minimum;
}
