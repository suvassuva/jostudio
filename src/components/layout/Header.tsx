'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Phone,
  ShieldCheck,
  Truck,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { CATEGORIES } from '@/data/products';
import { DEFAULT_WHATSAPP_NUMBER } from '@/lib/whatsapp';

export function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') || '');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { totalItemCount, openCartDrawer } = useCart();
  const { wishlistCount } = useWishlist();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/products');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      {/* Top Announcement Bar (Meesho style reassurance & WhatsApp help) */}
      <div className="bg-brand-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs text-gray-200">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-accent-500" />
              Free Delivery on orders above ₹499
            </span>
            <span className="hidden md:flex items-center gap-1 text-gray-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Genuine Quality Fabrics
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <a
              href={`https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                'Hi JO STUDIO, I have a question about shopping.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">WhatsApp Help</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-6">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 text-gray-700 hover:text-brand-900 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo - JO STUDIO (Pure Typography, No Icon) */}
          <Link href="/" className="flex flex-col flex-shrink-0">
            <span className="text-lg sm:text-2xl font-black tracking-tight text-brand-900 uppercase leading-none">
              JO<span className="text-accent-500 font-black">STUDIO</span>
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-widest text-gray-500 uppercase font-semibold mt-0.5">
              Modern Menswear
            </span>
          </Link>

          {/* Search Bar - Desktop Only */}
          <div className="hidden md:block flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search T-shirts, Shirts, Jeans, Cargo, Jackets..."
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-gray-50 hover:bg-gray-100/80 focus:bg-white text-sm text-gray-900 rounded-full border border-gray-200 focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none transition-all placeholder:text-gray-400"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </form>
          </div>

          {/* Right Action Icons (Wishlist & Cart) */}
          <div className="flex items-center gap-1 sm:gap-3">
            <Link
              href="/wishlist"
              className="relative p-2 sm:p-2.5 text-gray-700 hover:text-brand-900 hover:bg-gray-50 rounded-full transition-colors flex items-center gap-1.5"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-accent-500 text-white text-[10px] sm:text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in-50">
                  {wishlistCount}
                </span>
              )}
              <span className="hidden md:inline text-xs font-semibold text-gray-700">
                Wishlist
              </span>
            </Link>

            <button
              type="button"
              onClick={openCartDrawer}
              className="relative p-2 sm:p-2.5 text-gray-700 hover:text-brand-900 hover:bg-gray-50 rounded-full transition-colors flex items-center gap-1.5"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              {totalItemCount > 0 && (
                <span className="absolute top-1 right-1 bg-emerald-600 text-white text-[10px] sm:text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in-50">
                  {totalItemCount}
                </span>
              )}
              <span className="hidden md:inline text-xs font-semibold text-gray-700">
                Cart
              </span>
            </button>
          </div>
        </div>

        {/* Dedicated Mobile Full-Width Search Bar */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search T-shirts, Shirts, Jeans, Cargo..."
              className="w-full pl-9 pr-4 py-2 bg-gray-100 focus:bg-white text-xs text-gray-900 rounded-xl border border-gray-200 focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none transition-all placeholder:text-gray-400"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </form>
        </div>

        {/* Category Navigation Bar (Desktop) */}
        <nav className="hidden lg:flex items-center justify-between border-t border-gray-100 py-2.5">
          <div className="flex items-center gap-7 overflow-x-auto no-scrollbar">
            <Link
              href="/products"
              className="text-xs font-bold text-gray-900 hover:text-accent-500 transition-colors uppercase tracking-wider whitespace-nowrap flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent-500" />
              All Clothing
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${encodeURIComponent(cat.id)}`}
                className="text-xs font-semibold text-gray-600 hover:text-brand-900 transition-colors uppercase tracking-wider whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
          </div>
          <Link
            href="/products?trending=true"
            className="text-xs font-bold text-accent-600 hover:text-accent-700 uppercase tracking-wider whitespace-nowrap pl-4"
          >
            🔥 Trending Now
          </Link>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-brand-900 text-white">
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white uppercase leading-none">
                  JO<span className="text-accent-500 font-black">STUDIO</span>
                </span>
                <span className="text-[8px] tracking-widest text-stone-300 uppercase font-semibold mt-0.5">
                  Modern Menswear
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-gray-300 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
              <div className="pb-3 space-y-1">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50"
                >
                  All Men&apos;s Products
                </Link>
                <Link
                  href="/products?trending=true"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-accent-600 hover:bg-orange-50"
                >
                  🔥 Trending & Best Sellers
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50"
                >
                  My Saved Wishlist ({wishlistCount})
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50"
                >
                  Shopping Cart ({totalItemCount})
                </Link>
              </div>

              <div className="pt-3">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 block mb-2">
                  Browse by Category
                </span>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${encodeURIComponent(cat.id)}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-gray-400">{cat.itemCount}+</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <a
                href={`https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'Hello JO STUDIO team, I need assistance with an order.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-medium py-2.5 px-4 rounded-xl text-sm shadow-xs hover:bg-emerald-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
          <div
            className="flex-1"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}
    </header>
  );
}

