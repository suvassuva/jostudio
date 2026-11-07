'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Sparkles, Check, Star } from 'lucide-react';
import { Product } from '@/types';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group relative bg-white rounded-xl sm:rounded-2xl border border-gray-100/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden h-full">
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden select-none">
        <Link href={`/products/${product.slug}`} className="block w-full h-full" draggable={false}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-top group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
            draggable={false}
          />
        </Link>

        {/* Floating Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.isTrending && (
            <span className="bg-brand-900/90 text-white backdrop-blur-xs text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-xs">
              <Sparkles className="w-2.5 h-2.5 text-accent-500" />
              Trending
            </span>
          )}
          {product.isNewArrival && !product.isTrending && (
            <span className="bg-accent-500 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
              New
            </span>
          )}
          {product.stockStatus === 'low_stock' && (
            <span className="bg-rose-500 text-white text-[8px] sm:text-[9px] font-semibold px-1 py-0.5 rounded shadow-xs">
              Few left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all z-10 shadow-xs ${
            wishlisted
              ? 'bg-rose-50 text-rose-600 scale-105'
              : 'bg-white/90 text-gray-600 hover:text-rose-600 hover:bg-white'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-rose-600 stroke-rose-600' : ''}`} />
        </button>

        {/* Available Sizes Strip on Hover (Desktop) */}
        <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-[9px] font-semibold text-gray-700 shadow-xs hidden sm:flex">
          <span className="text-gray-400">Sizes:</span>
          {product.availableSizes.map((s) => (
            <span key={s} className="hover:text-brand-900">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Product Content - Compact & Fixed Vertical Rhythm */}
      <div className="p-2.5 sm:p-3 flex flex-col flex-1 justify-between gap-1.5">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] sm:text-[11px] font-semibold text-gray-400 uppercase tracking-wider truncate">
              {product.category}
            </span>
            <div className="inline-flex items-center gap-0.5 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0">
              <span>{product.rating.toFixed(1)}</span>
              <Star className="w-2.5 h-2.5 fill-current" />
            </div>
          </div>

          {/* Product Title - Fixed 2-Line Height for Perfect Grid Alignment */}
          <Link
            href={`/products/${product.slug}`}
            className="block text-xs font-semibold text-gray-800 hover:text-brand-900 line-clamp-2 leading-4 h-8 group-hover:text-accent-600 transition-colors"
            title={product.name}
          >
            {product.name}
          </Link>
        </div>

        <div>
          {/* Price & Discounts - Compact single line */}
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-xs sm:text-sm font-black text-gray-900">
              ₹{product.discountedPrice.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.discountedPrice && (
              <span className="text-[10px] sm:text-[11px] text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {product.discountPercentage && product.discountPercentage > 0 && (
              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-600">
                {product.discountPercentage}% off
              </span>
            )}
          </div>

          {/* Free Delivery Tag & Direct CTA - Single Row, No Line Breaks */}
          <div className="mt-1.5 pt-1.5 border-t border-gray-100 flex items-center justify-between text-[10px]">
            <span className="text-emerald-700 font-semibold flex items-center gap-0.5 whitespace-nowrap">
              <Check className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>Free Delivery</span>
            </span>

            <Link
              href={`/products/${product.slug}`}
              className="text-brand-900 font-bold hover:text-accent-600 transition-colors whitespace-nowrap text-[10px] sm:text-[11px]"
            >
              View →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
