'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { DEFAULT_WHATSAPP_NUMBER } from '@/lib/whatsapp';

export function Footer() {
  return (
    <footer className="bg-brand-950 text-gray-300 pt-6 pb-20 md:pb-6 border-t border-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        {/* Simple Trust Reassurance Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pb-5 border-b border-brand-900/80 text-[11px] text-gray-400">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-accent-500 shrink-0" />
            <span>Free Shipping above ₹499</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>WhatsApp Fast Checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-accent-500 shrink-0" />
            <span>7-Day Easy Size Swap</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Genuine Apparel</span>
          </div>
        </div>

        {/* Brand & WhatsApp Contact */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-brand-900 border border-brand-700 text-white flex items-center justify-center rounded-xl font-black text-sm shadow-sm">
              JO
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black text-white uppercase tracking-tight">
                JO<span className="text-accent-500">STUDIO</span>
              </span>
              <span className="text-[8px] tracking-widest text-gray-400 uppercase font-semibold">
                Modern Menswear
              </span>
            </div>
          </Link>

          <a
            href={`https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(
              'Hello JO STUDIO team, I would like assistance.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs py-2 px-3.5 rounded-xl transition-colors shadow-xs"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp Support (8861185066)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
