'use client';

import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Chapter } from '@/lib/types';

interface ChapterOrganizerProps {
  chapters: Chapter[];
  selectedChapterId?: string;
  onSelectChapter: (id: string) => void;
  onCreateChapter: () => void;
  onDeleteChapter: (id: string) => void;
}

export function ChapterOrganizer({
  chapters,
  selectedChapterId,
  onSelectChapter,
  onCreateChapter,
  onDeleteChapter,
}: ChapterOrganizerProps) {
  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Chapters</h3>
        <button onClick={onCreateChapter} className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chapters.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <p className="text-sm">No chapters yet</p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {chapters.map((chapter) => (
              <div
                key={chapter.id}
                className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer group transition-colors ${
                  selectedChapterId === chapter.id ? 'bg-indigo-100 border border-indigo-300' : 'hover:bg-gray-100'
                }`}
              >
                <GripVertical className="h-4 w-4 text-gray-400" />
                <div className="flex-1" onClick={() => onSelectChapter(chapter.id)}>
                  <p className="text-sm font-medium text-gray-900">
                    {chapter.chapter_number && `Ch. ${chapter.chapter_number}: `}
                    {chapter.title}
                  </p>
                  <p className="text-xs text-gray-500">{chapter.word_count} words</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChapter(chapter.id);
                  }}
                  className="p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}