'use client';

import { useState } from 'react';
import { BookOpen, Plus, Dimensions } from 'lucide-react';

const COVER_SPECS = {
  kdp_paperback: {
    name: 'KDP Paperback',
    width: 6,
    height: 9,
    spine: 0.25,
    unit: 'inches',
  },
  kdp_hardcover: {
    name: 'KDP Hardcover',
    width: 6,
    height: 9,
    spine: 0.5,
    unit: 'inches',
  },
  ingram_paperback: {
    name: 'Ingram Paperback',
    width: 6,
    height: 9,
    spine: 0.25,
    unit: 'inches',
  },
};

export default function CoversPage() {
  const [covers] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState('kdp_paperback');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cover Designer</h1>
            <p className="mt-1 text-gray-600">Create covers for KDP, Ingram, and other platforms</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            <Plus className="h-5 w-5" />
            New Cover
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {Object.entries(COVER_SPECS).map(([key, spec]) => (
            <button
              key={key}
              onClick={() => setSelectedSpec(key)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedSpec === key
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <Dimensions className="h-5 w-5 text-indigo-600 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">{spec.name}</h3>
                  <p className="text-sm text-gray-600">
                    {spec.width}" × {spec.height}"
                  </p>
                  {spec.spine && <p className="text-xs text-gray-500">Spine: {spec.spine}"</p>}
                </div>
              </div>
            </button>
          ))}
        </div>

        {covers.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No covers yet</h2>
            <p className="text-gray-600 mb-4">Create your first book cover using our templates</p>
            <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium">
              <Plus className="h-5 w-5" />
              Create First Cover
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Covers will be listed here */}
          </div>
        )}
      </main>
    </div>
  );
}
