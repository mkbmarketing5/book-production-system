'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, BookOpen } from 'lucide-react';

export default function ProjectsPage() {
  const [projects] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manuscripts</h1>
            <p className="mt-1 text-gray-600">Manage your writing projects</p>
          </div>
          <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            <Plus className="h-5 w-5" />
            New Project
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {projects.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No manuscripts yet</h2>
            <p className="text-gray-600 mb-4">Create your first project to get started</p>
            <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium">
              <Plus className="h-5 w-5" />
              Create First Project
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Projects will be listed here */}
          </div>
        )}
      </main>
    </div>
  );
}
