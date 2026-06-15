// EPUB formatter for eBook creation
import JSZip from 'jszip';
import { v4 as uuidv4 } from 'uuid';

interface EPUBOptions {
  title: string;
  author: string;
  language?: string;
  rights?: string;
  publisher?: string;
  description?: string;
}

interface EPUBContent {
  type: 'chapter' | 'image' | 'cover';
  title?: string;
  content?: string; // HTML content
  imagePath?: string | Buffer;
  imageFileName?: string;
}

export class EPUBFormatter {
  private zip: JSZip;
  private uuid: string;
  private chapters: Array<{ id: string; title: string; href: string }> = [];
  private images: Array<{ id: string; href: string; mediaType: string }> = [];
  private options: EPUBOptions;

  constructor(options: EPUBOptions) {
    this.zip = new JSZip();
    this.uuid = uuidv4();
    this.options = {
      language: 'en',
      rights: 'All rights reserved',
      publisher: 'Self-published',
      ...options,
    };

    this.initializeEPUBStructure();
  }

  private initializeEPUBStructure(): void {
    // Create required EPUB directory structure
    this.zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' });
    this.zip.folder('META-INF')?.file('container.xml', this.getContainerXML());
    this.zip.folder('OEBPS');
  }

  private getContainerXML(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml" />
  </rootfiles>
</container>`;
  }

  private getOPF(): string {
    const manifest = this.chapters
      .map(
        (c) =>
          `    <item id="${c.id}" href="${c.href}" media-type="application/xhtml+xml" />`
      )
      .join('\n');

    const spine = this.chapters
      .map((c) => `    <itemref idref="${c.id}" />`)
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<package version="3.0" unique-identifier="uuid_id" xmlns="http://www.idpf.org/2007/opf">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="uuid_id">${this.uuid}</dc:identifier>
    <dc:title>${this.options.title}</dc:title>
    <dc:creator>${this.options.author}</dc:creator>
    <dc:language>${this.options.language}</dc:language>
    <dc:rights>${this.options.rights}</dc:rights>
    <dc:publisher>${this.options.publisher}</dc:publisher>
    <dc:description>${this.options.description || ''}</dc:description>
  </metadata>
  <manifest>
${manifest}
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml" />
  </manifest>
  <spine toc="ncx">
${spine}
  </spine>
</package>`;
  }

  addChapter(title: string, htmlContent: string): void {
    const chapterId = `chapter${this.chapters.length + 1}`;
    const href = `${chapterId}.xhtml`;

    const xhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title>${title}</title>
  <meta charset="utf-8" />
  <style>
    body { font-family: Georgia, serif; line-height: 1.6; margin: 1em; }
    h1 { font-size: 1.8em; margin-top: 0.5em; margin-bottom: 0.3em; }
    h2 { font-size: 1.4em; margin-top: 0.4em; margin-bottom: 0.2em; }
    p { margin-bottom: 1em; text-align: justify; }
    img { max-width: 100%; height: auto; }
  </style>
</head>
<body>
${htmlContent}
</body>
</html>`;

    this.zip.folder('OEBPS')?.file(href, xhtml);
    this.chapters.push({ id: chapterId, title, href });
  }

  addImage(
    imageBuffer: Buffer,
    fileName: string,
    mediaType: string = 'image/jpeg'
  ): void {
    const imageId = `image${this.images.length + 1}`;
    this.zip.folder('OEBPS')?.folder('images')?.file(fileName, imageBuffer);
    this.images.push({
      id: imageId,
      href: `images/${fileName}`,
      mediaType,
    });
  }

  async generate(): Promise<Buffer> {
    // Add OPF file
    this.zip.folder('OEBPS')?.file('content.opf', this.getOPF());

    // Add NCX for TOC
    const ncx = this.getTOCNCX();
    this.zip.folder('OEBPS')?.file('toc.ncx', ncx);

    // Generate and return the EPUB file
    return this.zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  }

  private getTOCNCX(): string {
    const navPoints = this.chapters
      .map(
        (c, idx) => `
    <navPoint id="${c.id}" playOrder="${idx + 1}">
      <navLabel>
        <text>${c.title}</text>
      </navLabel>
      <content src="${c.href}" />
    </navPoint>`
      )
      .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN" "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">
<ncx version="2005-1" xml:lang="${this.options.language}" xmlns="http://www.daisy.org/z3986/2005/ncx/">
  <head>
    <meta name="dtb:uid" content="${this.uuid}" />
    <meta name="dtb:depth" content="1" />
    <meta name="dtb:totalPageCount" content="0" />
    <meta name="dtb:maxPageNumber" content="0" />
  </head>
  <docTitle>
    <text>${this.options.title}</text>
  </docTitle>
  <navMap>
${navPoints}
  </navMap>
</ncx>`;
  }
}

export async function createEPUB(
  title: string,
  author: string,
  chapters: Array<{ title: string; content: string }>,
  options?: Partial<EPUBOptions>
): Promise<Buffer> {
  const epub = new EPUBFormatter({
    title,
    author,
    ...options,
  });

  chapters.forEach((chapter) => {
    const htmlContent = convertMarkdownToHTML(chapter.content);
    epub.addChapter(chapter.title, htmlContent);
  });

  return epub.generate();
}

function convertMarkdownToHTML(markdown: string): string {
  // Simple markdown to HTML conversion
  let html = markdown;

  // Headers
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

  // Paragraphs
  html = html.replace(/\n\n/g, '</p><p>');
  html = `<p>${html}</p>`;

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');

  // Line breaks
  html = html.replace(/\n/g, '<br />');

  return html;
}
