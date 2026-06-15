'use client';

import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

interface AssetUploaderProps {
  onUpload: (file: File, metadata: { name: string; type: string; alt_text?: string }) => Promise<void>;
}

export function AssetUploader({ onUpload }: AssetUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      const fileName = file.name.split('.')[0];
      await onUpload(file, {
        name: fileName,
        type: 'image',
        alt_text: '',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
      <p className="text-sm font-medium text-gray-900 mb-1">Drag and drop your file here</p>
      <p className="text-xs text-gray-500 mb-4">or</p>
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Browse Files'}
      </button>
      <input ref={fileInputRef} type="file" onChange={handleFileSelect} className="hidden" />
    </div>
  );
}