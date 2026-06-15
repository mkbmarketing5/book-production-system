'use client';

import { useState } from 'react';
import { FormatterGuide } from '@/components/FormatterGuide';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function FormatterPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-6">
            <Link href="/" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Book Formatter & Specifications</h1>
            <p className="mt-2 text-gray-600">Format your content for different platforms</p>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-12">
          <FormatterGuide />
        </main>
      </div>
    </ProtectedRoute>
  );
}
