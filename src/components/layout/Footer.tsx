import React from 'react';
import Link from 'next/link';
import {
  Phone,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  MapPin,
  Clock,
  Heart,
} from 'lucide-react';
import { CATEGORIES } from '@/data/products';
import { DEFAULT_WHATSAPP_NUMBER } from '@/lib/whatsapp';

export function Footer() {
  return (
    <footer className="bg-brand-950 text-gray-300 pt-12 pb-24 md:pb-12 border-t border-brand-900">
      {/* Value Proposition Banners (Meesho style trust badges) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 border-b border-brand-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-900 border border-brand-800 flex items-center justify-center text-accent-500 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs sm:text-sm font-bold">Fast Delivery</h4>
              <p className="text-[11px] sm:text-xs text-gray-400">Free above ₹499 across India</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-900 border border-brand-800 flex items-center justify-center text-emerald-400 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs sm:text-sm font-bold">WhatsApp Ordering</h4>
              <p className="text-[11px] sm:text-xs text-gray-400">Direct order confirmation</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-900 border border-brand-800 flex items-center justify-center text-accent-500 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs sm:text-sm font-bold">Easy Size Exchange</h4>
              <p className="text-[11px] sm:text-xs text-gray-400">7-day simple support</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-900 border border-brand-800 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-xs sm:text-sm font-bold">Best Price Guarantee</h4>
              <p className="text-[11px] sm:text-xs text-gray-400">Direct from manufacture</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-brand-900 border border-brand-700 text-white flex items-center justify-center rounded-xl font-black text-base shadow-sm">
              JO
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white uppercase tracking-tight">
                JO<span className="text-accent-500">STUDIO</span>
              </span>
              <span className="text-[10px] tracking-widest text-gray-400 uppercase font-semibold">
                Modern Menswear
              </span>
            </div>
          </Link>

          <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
            Delivering high quality, trend-setting Indian men&apos;s fashion directly to your doorstep.
            Experience hassle-free shopping with one-click WhatsApp order confirmation from JO STUDIO.
          </p>

          <div className="space-y-2 pt-2 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-accent-500" />
              <span>Customer Support: Mon - Sat (9:00 AM - 8:00 PM)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-accent-500" />
              <span>Hubs: Surat • Tirupur • Mumbai • Delhi NCR</span>
            </div>
          </div>
        </div>

        {/* Categories column */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent-500" />
            Popular Categories
          </h4>
          <ul className="space-y-2 text-xs">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/products?category=${encodeURIComponent(cat.id)}`}
                  className="hover:text-white transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
            Customer Services
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/products" className="hover:text-white transition-colors">
                Browse All Apparel
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-white transition-colors">
                My Wishlist
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-white transition-colors">
                Shopping Cart
              </Link>
            </li>
            <li>
              <Link href="/products?trending=true" className="hover:text-white transition-colors">
                Trending This Week
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="hover:text-white transition-colors">
                WhatsApp Checkout
              </Link>
            </li>
          </ul>
        </div>

        {/* WhatsApp Connect Box */}
        <div className="bg-brand-900/60 p-4 rounded-2xl border border-brand-800 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Need Help?</div>
              <div className="text-[11px] text-emerald-400">Instant WhatsApp Chat</div>
            </div>
          </div>
          <p className="text-[11px] text-gray-400 leading-snug">
            Questions regarding fabric sizing or existing orders? Chat with our stylist executive.
          </p>
          <a
            href={`https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(
              'Hello JO STUDIO support team, I would like assistance.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-2 px-3 rounded-xl transition-colors"
          >
            Start WhatsApp Chat
          </a>
        </div>
      </div>

      {/* Bottom Legal / Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-brand-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
        <p>© {new Date().getFullYear()} JO STUDIO Menswear. All rights reserved.</p>
        <p className="flex items-center gap-1 text-gray-400">
          Crafted with <Heart className="w-3.5 h-3.5 text-accent-500 fill-accent-500" /> for modern Indian men
        </p>
      </div>
    </footer>
  );
}

