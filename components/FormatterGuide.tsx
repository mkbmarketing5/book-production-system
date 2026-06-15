'use client';

import { useState } from 'react';
import { BOOK_SPECS, COVER_SPECS, IMAGE_SPECS } from '@/lib/format-specs';
import { Download, Copy, AlertCircle, CheckCircle } from 'lucide-react';

export function FormatterGuide() {
  const [selectedBook, setSelectedBook] = useState('kdp_6x9_paperback');
  const [selectedCover, setSelectedCover] = useState('kdp_6x9_paperback');
  const [copied, setCopied] = useState<string | null>(null);

  const bookSpec = BOOK_SPECS[selectedBook as keyof typeof BOOK_SPECS];
  const coverSpec = COVER_SPECS[selectedCover as keyof typeof COVER_SPECS];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Book Format Selector */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Book Format Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {Object.entries(BOOK_SPECS).map(([key, spec]) => (
            <button
              key={key}
              onClick={() => setSelectedBook(key)}
              className={`p-4 rounded-lg border-2 transition-colors text-left ${
                selectedBook === key
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <h4 className="font-semibold text-gray-900">{spec.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{spec.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                {spec.pageSize.width}" × {spec.pageSize.height}" | {spec.format.toUpperCase()}
              </p>
            </button>
          ))}
        </div>

        {bookSpec && (
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">{bookSpec.name} - Specifications</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Page Size</p>
                <p className="font-mono text-sm text-gray-900">
                  {bookSpec.pageSize.width}" × {bookSpec.pageSize.height}"
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Format</p>
                <p className="font-mono text-sm text-gray-900">{bookSpec.format.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Resolution</p>
                <p className="font-mono text-sm text-gray-900">{bookSpec.recommendedDPI} DPI</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Color Space</p>
                <p className="font-mono text-sm text-gray-900">{bookSpec.colorSpace}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Margins (inches)</p>
                <p className="font-mono text-sm text-gray-900">
                  T:{bookSpec.margins.top} B:{bookSpec.margins.bottom} L:{bookSpec.margins.left} R:
                  {bookSpec.margins.right}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Page Range</p>
                <p className="font-mono text-sm text-gray-900">
                  {bookSpec.minPages}-{bookSpec.maxPages}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cover Specifications */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cover Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {Object.entries(COVER_SPECS).map(([key, spec]) => (
            <button
              key={key}
              onClick={() => setSelectedCover(key)}
              className={`p-4 rounded-lg border-2 transition-colors text-left ${
                selectedCover === key
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <h4 className="font-semibold text-gray-900">{spec.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{spec.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                {spec.width}×{spec.height}px @ {spec.dpi}DPI
              </p>
            </button>
          ))}
        </div>

        {coverSpec && (
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">{coverSpec.name}</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Dimensions (pixels)</p>
                <p className="font-mono text-sm text-gray-900">
                  {coverSpec.width} × {coverSpec.height}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Resolution</p>
                <p className="font-mono text-sm text-gray-900">{coverSpec.dpi} DPI</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Color Space</p>
                <p className="font-mono text-sm text-gray-900">{coverSpec.colorSpace}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Min Resolution</p>
                <p className="font-mono text-sm text-gray-900">{coverSpec.minResolution} DPI</p>
              </div>
            </div>
            {coverSpec.safetyMargin && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Safety Margin</p>
                  <p className="text-sm text-blue-700">Leave {coverSpec.safetyMargin}" margin from edges</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image Specifications */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Image Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(IMAGE_SPECS).map(([key, spec]) => (
            <div key={key} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900">{spec.name}</h4>
              <div className="mt-2 space-y-1 text-sm">
                <p className="text-gray-600">
                  <span className="text-gray-900 font-medium">Width:</span> {spec.widthPercent}% of page
                </p>
                <p className="text-gray-600">
                  <span className="text-gray-900 font-medium">Min Resolution:</span> {spec.minResolution} DPI
                </p>
                <p className="text-gray-600">
                  <span className="text-gray-900 font-medium">Color Space:</span> {spec.colorSpace}
                </p>
                <p className="text-gray-600">
                  <span className="text-gray-900 font-medium">Formats:</span> {spec.formats.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Reference */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-green-900 mb-2">Quick Checklist</h4>
            <ul className="space-y-1 text-sm text-green-700">
              <li>✓ Images are at least 300 DPI for print</li>
              <li>✓ Text is readable (minimum 10pt font)</li>
              <li>✓ Margins are maintained correctly</li>
              <li>✓ Cover dimensions match platform requirements</li>
              <li>✓ Color space is correct (CMYK for print, RGB for digital)</li>
              <li>✓ All fonts are embedded in PDF</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
