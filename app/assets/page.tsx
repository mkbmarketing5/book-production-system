'use client';

import { useState } from 'react';
import { Upload, Image as ImageIcon, Plus } from 'lucide-react';

export default function AssetsPage() {
  const [assets] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Asset Library</h1>
            <p className="mt-1 text-gray-600">Images, graphics, references, and style guides</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            <Upload className="h-5 w-5" />
            Upload Asset
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {assets.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No assets yet</h2>
            <p className="text-gray-600 mb-4">Upload images, graphics, and references for your books</p>
            <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium">
              <Upload className="h-5 w-5" />
              Upload First Asset
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Assets will be listed here */}
          </div>
        )}
      </main>
    </div>
  );
}
