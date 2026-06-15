'use client';

import { LoginForm } from '@/components/LoginForm';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-3xl font-bold text-gray-900 mb-2 hover:text-indigo-600">
            <BookOpen className="h-8 w-8" />
            Book Production System
          </Link>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <LoginForm />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By signing in, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}
