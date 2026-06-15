'use client';

import Link from 'next/link';
import { BookOpen, Zap, Image as ImageIcon, FileText } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-900">📚 Book Production System</h1>
          <p className="mt-2 text-gray-600">Write, format, generate images, and publish your books</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Manuscript Editor */}
          <Link href="/projects">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <FileText className="h-8 w-8 text-indigo-600 mb-3" />
              <h2 className="text-lg font-semibold text-gray-900">Manuscripts</h2>
              <p className="mt-2 text-sm text-gray-600">Write and edit chapters in your voice</p>
            </div>
          </Link>

          {/* AI Assistant */}
          <Link href="/ai-workspace">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <Zap className="h-8 w-8 text-purple-600 mb-3" />
              <h2 className="text-lg font-semibold text-gray-900">AI Workspace</h2>
              <p className="mt-2 text-sm text-gray-600">Brainstorm, expand, and refine with AI</p>
            </div>
          </Link>

          {/* Asset Library */}
          <Link href="/assets">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <ImageIcon className="h-8 w-8 text-pink-600 mb-3" />
              <h2 className="text-lg font-semibold text-gray-900">Assets</h2>
              <p className="mt-2 text-sm text-gray-600">Manage images, graphics, and references</p>
            </div>
          </Link>

          {/* Cover Designer */}
          <Link href="/covers">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <BookOpen className="h-8 w-8 text-amber-600 mb-3" />
              <h2 className="text-lg font-semibold text-gray-900">Covers</h2>
              <p className="mt-2 text-sm text-gray-600">Design covers for KDP & Ingram</p>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 rounded-lg bg-white p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Getting Started</h2>
          <ol className="space-y-4 text-gray-700">
            <li className="flex items-start gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">1</span>
              <span>Create or import a manuscript</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">2</span>
              <span>Organize chapters and sections</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">3</span>
              <span>Add images and formatting</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">4</span>
              <span>Design your cover</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white font-semibold">5</span>
              <span>Export and publish</span>
            </li>
          </ol>
        </div>
      </main>
    </div>
  );
}
