import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 text-center border border-gray-200 shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-900 mx-auto flex items-center justify-center font-black text-2xl">
          404
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-brand-900">Page Not Found</h1>
        <p className="text-xs sm:text-sm text-gray-500">
          The men&apos;s fashion page or product you are looking for does not exist or may have been moved.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-brand-900 hover:bg-black text-white font-bold py-3 px-6 rounded-xl text-xs transition-colors"
          >
            <Home className="w-4 h-4" />
            Go to Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-xl text-xs transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Explore Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}

