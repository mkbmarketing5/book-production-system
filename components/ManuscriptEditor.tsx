'use client';

import { useState } from 'react';
import { Bold, Italic, Underline, Heading2, List, Save, Copy, Zap } from 'lucide-react';
import { Chapter } from '@/lib/types';

interface ManuscriptEditorProps {
  chapter: Chapter | null;
  onSave?: (content: string) => void;
  onGenerate?: (prompt: string) => void;
  voiceGuide?: string;
}

export function ManuscriptEditor({
  chapter,
  onSave,
  onGenerate,
  voiceGuide,
}: ManuscriptEditorProps) {
  const [content, setContent] = useState(chapter?.content || '');
  const [wordCount, setWordCount] = useState(chapter?.word_count || 0);
  const [isSaving, setIsSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave?.(content);
      setSavedAt(new Date().toLocaleTimeString());
      setTimeout(() => setSavedAt(null), 3000);
    } catch (err) {
      console.error('Failed to save:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    const words = newContent.trim().split(/\s+/).filter(w => w.length > 0).length;
    setWordCount(words);
  };

  const insertFormatting = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;
    textarea.focus();
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg border border-gray-200">
      <div className="border-b border-gray-200 p-4 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-1">
          <button className="p-2 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-900" title="Bold">
            <Bold className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-900" title="Italic">
            <Italic className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-900" title="Underline">
            <Underline className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-900" title="Heading">
            <Heading2 className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-900" title="List">
            <List className="h-5 w-5" />
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-600">{wordCount} words</span>
          {savedAt && <span className="text-xs text-green-600">Saved at {savedAt}</span>}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAIPrompt(!showAIPrompt)}
            className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
          >
            <Zap className="h-4 w-4" />
            AI
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 text-sm"
          >
            <Save className="h-4 w-4" />
            Save
          </button>
        </div>
      </div>

      {showAIPrompt && (
        <div className="border-b border-gray-200 p-4 bg-purple-50">
          <div className="space-y-2">
            {voiceGuide && <p className="text-xs text-gray-600 italic">Voice: {voiceGuide}</p>}
            <div className="flex gap-2">
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ask AI to rewrite, expand, or generate..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="px-4 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
                Generate
              </button>
            </div>
          </div>
        </div>
      )}

      <textarea
        value={content}
        onChange={handleContentChange}
        className="flex-1 p-4 focus:outline-none resize-none font-mono text-sm"
        placeholder="Start writing your chapter here..."
      />
    </div>
  );
}