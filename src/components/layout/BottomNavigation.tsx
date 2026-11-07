'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Heart, ShoppingBag, MessageSquare } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { DEFAULT_WHATSAPP_NUMBER } from '@/lib/whatsapp';

export function BottomNavigation() {
  const pathname = usePathname();
  const { totalItemCount } = useCart();
  const { wishlistCount } = useWishlist();

  const isHome = pathname === '/';
  const isProducts = pathname.startsWith('/products');
  const isWishlist = pathname.startsWith('/wishlist');
  const isCart = pathname.startsWith('/cart');

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 py-1.5 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around">
        <Link
          href="/"
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors ${
            isHome ? 'text-brand-900 font-bold' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <Home className={`w-5 h-5 ${isHome ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5">Home</span>
        </Link>

        <Link
          href="/products"
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors ${
            isProducts ? 'text-brand-900 font-bold' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <Grid className={`w-5 h-5 ${isProducts ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-0.5">Explore</span>
        </Link>

        <Link
          href="/wishlist"
          className={`flex flex-col items-center py-1 px-2 rounded-xl relative transition-colors ${
            isWishlist ? 'text-brand-900 font-bold' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <div className="relative">
            <Heart className={`w-5 h-5 ${isWishlist ? 'stroke-[2.5] fill-brand-900' : 'stroke-[1.8]'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-accent-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Wishlist</span>
        </Link>

        <Link
          href="/cart"
          className={`flex flex-col items-center py-1 px-2 rounded-xl relative transition-colors ${
            isCart ? 'text-brand-900 font-bold' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <div className="relative">
            <ShoppingBag className={`w-5 h-5 ${isCart ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {totalItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-emerald-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Cart</span>
        </Link>

        <a
          href={`https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(
            'Hello JO STUDIO, I need assistance.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center py-1 px-2 rounded-xl text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <MessageSquare className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] mt-0.5 font-medium">Chat</span>
        </a>
      </div>
    </div>
  );
}

