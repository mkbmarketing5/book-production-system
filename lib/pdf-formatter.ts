// PDF formatter utility for creating publication-ready PDFs
import PDFDocument from 'pdfkit';
import { Readable } from 'stream';

interface PDFOptions {
  title: string;
  author: string;
  subject?: string;
  keywords?: string[];
  pageSize: 'LETTER' | 'A4' | 'LEGAL' | [number, number];
  margins: { top: number; bottom: number; left: number; right: number };
  fontSize?: number;
  lineHeight?: number;
}

interface TextOptions {
  size?: number;
  font?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  color?: string;
  underline?: boolean;
  lineGap?: number;
}

export class BookFormatter {
  private doc: PDFKit.PDFDocument;
  private margins: { top: number; bottom: number; left: number; right: number };
  private pageWidth: number;
  private pageHeight: number;
  private currentY: number;

  constructor(options: PDFOptions) {
    this.margins = options.margins;

    // Create PDF document
    this.doc = new PDFDocument({
      size: options.pageSize,
      margin: 0, // We'll manage margins manually
      bufferPages: true,
    });

    // Set metadata
    this.doc.info({
      Title: options.title,
      Author: options.author,
      Subject: options.subject || '',
      Keywords: (options.keywords || []).join(', '),
      CreationDate: new Date(),
    });

    // Get page dimensions
    const pageSize = this.doc.page.size;
    this.pageWidth = pageSize[0];
    this.pageHeight = pageSize[1];

    // Initialize cursor position
    this.currentY = this.margins.top;
  }

  addTitle(text: string, options: TextOptions = {}): void {
    this.doc
      .fontSize(options.size || 28)
      .font(options.font || 'Helvetica-Bold')
      .text(text, this.margins.left, this.currentY, {
        width: this.pageWidth - this.margins.left - this.margins.right,
        align: options.align || 'center',
        underline: options.underline || false,
      });

    this.currentY = this.doc.y + (options.lineGap || 20);
  }

  addHeading(text: string, level: 1 | 2 | 3 = 1, options: TextOptions = {}): void {
    const sizes = { 1: 20, 2: 16, 3: 13 };
    const gaps = { 1: 15, 2: 12, 3: 10 };

    this.doc
      .fontSize(options.size || sizes[level])
      .font(options.font || 'Helvetica-Bold')
      .text(text, this.margins.left, this.currentY, {
        width: this.pageWidth - this.margins.left - this.margins.right,
        align: options.align || 'left',
      });

    this.currentY = this.doc.y + (options.lineGap || gaps[level]);
  }

  addParagraph(text: string, options: TextOptions = {}): void {
    this.doc
      .fontSize(options.size || 11)
      .font(options.font || 'Helvetica')
      .text(text, this.margins.left, this.currentY, {
        width: this.pageWidth - this.margins.left - this.margins.right,
        align: options.align || 'left',
        lineGap: options.lineGap || 4,
      });

    this.currentY = this.doc.y + (options.lineGap || 6);
  }

  addImage(
    imagePath: string | Buffer,
    options: {
      width?: number;
      height?: number;
      align?: 'left' | 'center' | 'right';
      caption?: string;
    } = {}
  ): void {
    const { width, height, align = 'center', caption } = options;

    // Calculate image position
    let x = this.margins.left;
    if (align === 'center') {
      x = this.pageWidth / 2 - (width || 200) / 2;
    } else if (align === 'right') {
      x = this.pageWidth - this.margins.right - (width || 200);
    }

    // Add image
    this.doc.image(imagePath, x, this.currentY, { width, height });

    // Update Y position
    this.currentY = this.doc.y + 10;

    // Add caption if provided
    if (caption) {
      this.doc
        .fontSize(9)
        .font('Helvetica-Oblique')
        .text(caption, this.margins.left, this.currentY, {
          width: this.pageWidth - this.margins.left - this.margins.right,
          align: 'center',
        });
      this.currentY = this.doc.y + 10;
    }
  }

  addPageBreak(): void {
    this.doc.addPage();
    this.currentY = this.margins.top;
  }

  addTOC(entries: Array<{ title: string; page: number }>): void {
    this.addHeading('Table of Contents', 1);
    entries.forEach((entry) => {
      this.doc
        .fontSize(11)
        .text(`${entry.title} .......................... ${entry.page}`, this.margins.left, this.currentY, {
          width: this.pageWidth - this.margins.left - this.margins.right,
        });
      this.currentY = this.doc.y + 4;
    });
    this.addPageBreak();
  }

  checkPageBreak(spaceNeeded: number = 100): void {
    if (this.currentY + spaceNeeded > this.pageHeight - this.margins.bottom) {
      this.addPageBreak();
    }
  }

  getStream(): PDFKit.PDFDocument {
    return this.doc;
  }

  finalize(): void {
    this.doc.end();
  }
}

export function createBookPDF(
  title: string,
  author: string,
  content: Array<{
    type: 'heading' | 'paragraph' | 'image' | 'title' | 'break';
    text?: string;
    level?: 1 | 2 | 3;
    imagePath?: string | Buffer;
    options?: any;
  }>,
  pdfOptions: PDFOptions
): BookFormatter {
  const formatter = new BookFormatter(pdfOptions);

  content.forEach((item) => {
    formatter.checkPageBreak();

    switch (item.type) {
      case 'title':
        formatter.addTitle(item.text || '', item.options);
        break;
      case 'heading':
        formatter.addHeading(item.text || '', item.level || 1, item.options);
        break;
      case 'paragraph':
        formatter.addParagraph(item.text || '', item.options);
        break;
      case 'image':
        if (item.imagePath) {
          formatter.addImage(item.imagePath, item.options);
        }
        break;
      case 'break':
        formatter.addPageBreak();
        break;
    }
  });

  return formatter;
}
