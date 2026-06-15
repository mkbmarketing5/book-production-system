'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { BookOpen, Zap, Image as ImageIcon, FileText, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">📚 Book Production System</h1>
              <p className="mt-2 text-gray-600">Write, format, generate images, and publish your books</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-600">{user.email}</span>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium">
                    Sign In
                  </Link>
                  <Link href="/auth/signup" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="mt-4 flex flex-col gap-2 md:hidden">
              {user ? (
                <>
                  <p className="text-sm text-gray-600 px-2 py-2">{user.email}</p>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="block px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium">
                    Sign In
                  </Link>
                  <Link href="/auth/signup" className="block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-center">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        {user ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user.email}!</h2>
              <p className="text-gray-600 mt-2">Continue your writing journey</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/projects">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <FileText className="h-8 w-8 text-indigo-600 mb-3" />
                  <h2 className="text-lg font-semibold text-gray-900">Manuscripts</h2>
                  <p className="mt-2 text-sm text-gray-600">Write and edit chapters in your voice</p>
                </div>
              </Link>

              <Link href="/ai-workspace">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <Zap className="h-8 w-8 text-purple-600 mb-3" />
                  <h2 className="text-lg font-semibold text-gray-900">AI Workspace</h2>
                  <p className="mt-2 text-sm text-gray-600">Brainstorm, expand, and refine with AI</p>
                </div>
              </Link>

              <Link href="/assets">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <ImageIcon className="h-8 w-8 text-pink-600 mb-3" />
                  <h2 className="text-lg font-semibold text-gray-900">Assets</h2>
                  <p className="mt-2 text-sm text-gray-600">Manage images, graphics, and references</p>
                </div>
              </Link>

              <Link href="/covers">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <BookOpen className="h-8 w-8 text-amber-600 mb-3" />
                  <h2 className="text-lg font-semibold text-gray-900">Covers</h2>
                  <p className="mt-2 text-sm text-gray-600">Design covers for KDP & Ingram</p>
                </div>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Personal Book Production System</h2>
              <p className="text-xl text-gray-600 mb-8">From idea to published book in one place</p>
              <div className="flex gap-4 justify-center">
                <Link href="/auth/signup" className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold text-lg">
                  Get Started Free
                </Link>
                <Link href="/auth/login" className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 font-semibold text-lg">
                  Sign In
                </Link>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <FileText className="h-8 w-8 text-indigo-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900">Manuscripts</h3>
                <p className="mt-2 text-sm text-gray-600">Write and edit chapters in your voice</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <Zap className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900">AI Workspace</h3>
                <p className="mt-2 text-sm text-gray-600">Brainstorm, expand, and refine with AI</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <ImageIcon className="h-8 w-8 text-pink-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900">Assets</h3>
                <p className="mt-2 text-sm text-gray-600">Manage images, graphics, and references</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <BookOpen className="h-8 w-8 text-amber-600 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900">Covers</h3>
                <p className="mt-2 text-sm text-gray-600">Design covers for KDP & Ingram</p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
