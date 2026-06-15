'use client';

import { useState } from 'react';
import { Zap, Send } from 'lucide-react';

export default function AIWorkspacePage() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }]);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 flex items-center gap-3">
          <Zap className="h-6 w-6 text-purple-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Workspace</h1>
            <p className="mt-1 text-gray-600">Brainstorm, generate, and refine content</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl w-full px-6 py-12 flex-1 flex flex-col">
        <div className="flex-1 space-y-4 mb-6 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p>Start a conversation to generate content, ideas, or images</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-md p-4 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me to brainstorm, write, generate images..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSend}
            className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 flex items-center gap-2"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </main>
    </div>
  );
}
