// Book export specifications for different platforms
export const BOOK_SPECS = {
  // KDP (Amazon) Specifications
  kdp_paperback: {
    name: 'KDP Paperback',
    platform: 'KDP',
    format: 'pdf',
    pageSize: { width: 8.5, height: 11, unit: 'in' }, // Standard US Letter
    margins: { top: 0.5, bottom: 0.5, left: 0.75, right: 0.75, unit: 'in' },
    bleed: 0.125,
    minPages: 24,
    maxPages: 828,
    recommendedDPI: 300,
    colorSpace: 'CMYK',
    description: 'Standard 8.5" x 11" paperback for Amazon KDP',
  },
  kdp_hardcover: {
    name: 'KDP Hardcover',
    platform: 'KDP',
    format: 'pdf',
    pageSize: { width: 8.5, height: 11, unit: 'in' },
    margins: { top: 0.75, bottom: 0.75, left: 1, right: 1, unit: 'in' },
    bleed: 0.125,
    minPages: 40,
    maxPages: 600,
    recommendedDPI: 300,
    colorSpace: 'CMYK',
    description: 'Premium 8.5" x 11" hardcover for Amazon KDP',
  },
  kdp_6x9_paperback: {
    name: 'KDP 6" x 9" Paperback',
    platform: 'KDP',
    format: 'pdf',
    pageSize: { width: 6, height: 9, unit: 'in' },
    margins: { top: 0.5, bottom: 0.5, left: 0.5, right: 0.5, unit: 'in' },
    bleed: 0.125,
    minPages: 24,
    maxPages: 828,
    recommendedDPI: 300,
    colorSpace: 'CMYK',
    description: 'Popular 6" x 9" trim size for novels and books',
  },

  // Ingram Specifications
  ingram_paperback: {
    name: 'Ingram Paperback',
    platform: 'Ingram',
    format: 'pdf',
    pageSize: { width: 8.5, height: 11, unit: 'in' },
    margins: { top: 0.5, bottom: 0.5, left: 0.75, right: 0.75, unit: 'in' },
    bleed: 0.25,
    minPages: 24,
    maxPages: 1000,
    recommendedDPI: 300,
    colorSpace: 'CMYK',
    description: 'Professional paperback for Ingram distribution',
  },
  ingram_hardcover: {
    name: 'Ingram Hardcover',
    platform: 'Ingram',
    format: 'pdf',
    pageSize: { width: 8.5, height: 11, unit: 'in' },
    margins: { top: 0.75, bottom: 0.75, left: 1, right: 1, unit: 'in' },
    bleed: 0.25,
    minPages: 40,
    maxPages: 800,
    recommendedDPI: 300,
    colorSpace: 'CMYK',
    description: 'Premium hardcover for Ingram distribution',
  },

  // EPUB (eBook)
  epub: {
    name: 'EPUB (eBook)',
    platform: 'Digital',
    format: 'epub',
    responsive: true,
    maxImageWidth: 600,
    imageFormat: ['jpeg', 'png'],
    recommendedDPI: 72,
    colorSpace: 'RGB',
    description: 'Universal eBook format for Kindle, Apple Books, Kobo, etc.',
  },

  // Amazon Kindle
  kindle_ebook: {
    name: 'Amazon Kindle eBook',
    platform: 'Digital',
    format: 'mobi',
    responsive: true,
    maxImageWidth: 800,
    imageFormat: ['jpeg', 'gif', 'png'],
    recommendedDPI: 72,
    colorSpace: 'RGB',
    description: 'Kindle format for Amazon devices and apps',
  },
};

// Cover specifications by platform
export const COVER_SPECS = {
  kdp_6x9_paperback: {
    name: 'KDP 6" x 9" Paperback Cover',
    width: 1350,
    height: 2100,
    unit: 'px',
    dpi: 300,
    format: 'width + spine + width',
    colorSpace: 'CMYK',
    minResolution: 300,
    safetyMargin: 0.25,
    description: 'Front + Spine + Back (combined width)',
  },
  kdp_5x8_paperback: {
    name: 'KDP 5" x 8" Paperback Cover',
    width: 1100,
    height: 1700,
    unit: 'px',
    dpi: 300,
    colorSpace: 'CMYK',
    minResolution: 300,
    safetyMargin: 0.25,
    description: 'Standard 5" x 8" cover at 300 DPI',
  },
  kdp_8x10_hardcover: {
    name: 'KDP 8" x 10" Hardcover Cover',
    width: 1600,
    height: 2000,
    unit: 'px',
    dpi: 300,
    colorSpace: 'CMYK',
    minResolution: 300,
    safetyMargin: 0.25,
    description: '8" x 10" premium hardcover cover',
  },
  kindle_ebook: {
    name: 'Kindle eBook Cover',
    width: 1600,
    height: 2560,
    unit: 'px',
    dpi: 72,
    aspectRatio: '0.625:1',
    colorSpace: 'RGB',
    maxFileSize: 50, // MB
    description: 'Digital cover for Kindle and Amazon',
  },
  ingram_paperback: {
    name: 'Ingram Paperback Cover',
    width: 1275,
    height: 1950,
    unit: 'px',
    dpi: 300,
    colorSpace: 'CMYK',
    minResolution: 300,
    safetyMargin: 0.375,
    description: 'Professional cover for Ingram distribution',
  },
};

// Image sizing specifications for book interiors
export const IMAGE_SPECS = {
  fullPage: {
    name: 'Full Page Image',
    widthPercent: 100,
    maxWidth: { '8.5x11': 7.5, '6x9': 5.5, '5x8': 4.5 }, // inches
    minResolution: 300,
    formats: ['jpeg', 'png', 'tiff'],
    colorSpace: 'CMYK',
  },
  halfPage: {
    name: 'Half Page Image',
    widthPercent: 50,
    maxWidth: { '8.5x11': 3.75, '6x9': 2.75, '5x8': 2.25 },
    minResolution: 300,
    formats: ['jpeg', 'png'],
    colorSpace: 'CMYK',
  },
  thumbnail: {
    name: 'Thumbnail Image',
    widthPercent: 25,
    maxWidth: { '8.5x11': 1.875, '6x9': 1.375, '5x8': 1.125 },
    minResolution: 150,
    formats: ['jpeg', 'png'],
    colorSpace: 'RGB',
  },
  ebook: {
    name: 'eBook Image',
    widthPercent: 100,
    maxWidth: 600,
    minResolution: 72,
    formats: ['jpeg', 'png'],
    colorSpace: 'RGB',
  },
};

// Text formatting specifications
export const TEXT_SPECS = {
  body: {
    fontSize: 11,
    lineHeight: 1.5,
    fontFamily: 'Georgia, serif',
    color: '#000000',
    alignment: 'justify',
  },
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Georgia, serif',
    marginTop: 0.5,
    marginBottom: 0.3,
  },
  heading2: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Georgia, serif',
    marginTop: 0.4,
    marginBottom: 0.2,
  },
  heading3: {
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: 'Georgia, serif',
    marginTop: 0.3,
    marginBottom: 0.15,
  },
};
