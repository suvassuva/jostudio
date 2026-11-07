'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Sparkles, Check } from 'lucide-react';
import { Product } from '@/types';
import { useWishlist } from '@/context/WishlistContext';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { RatingStars } from '@/components/ui/RatingStars';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100/90 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
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
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.isTrending && (
            <span className="bg-brand-900/90 text-white backdrop-blur-xs text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
              <Sparkles className="w-3 h-3 text-accent-500" />
              Trending
            </span>
          )}
          {product.isNewArrival && !product.isTrending && (
            <span className="bg-accent-500 text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              New
            </span>
          )}
          {product.stockStatus === 'low_stock' && (
            <span className="bg-rose-500 text-white text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded-md shadow-xs">
              Only few left
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
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 shadow-xs ${
            wishlisted
              ? 'bg-rose-50 text-rose-600 scale-110'
              : 'bg-white/90 text-gray-600 hover:text-rose-600 hover:bg-white'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-600 stroke-rose-600' : ''}`} />
        </button>

        {/* Available Sizes Strip on Hover */}
        <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-[10px] font-semibold text-gray-700 shadow-xs hidden sm:flex">
          <span className="text-gray-400">Sizes:</span>
          {product.availableSizes.map((s) => (
            <span key={s} className="hover:text-brand-900">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Product Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider truncate">
              {product.category}
            </span>
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} compact />
          </div>

          {/* Product Title */}
          <Link
            href={`/products/${product.slug}`}
            className="block text-xs sm:text-sm font-semibold text-gray-800 hover:text-brand-900 line-clamp-2 leading-snug group-hover:text-accent-600 transition-colors"
          >
            {product.name}
          </Link>
        </div>

        <div>
          {/* Price & Discounts */}
          <PriceDisplay
            discountedPrice={product.discountedPrice}
            originalPrice={product.originalPrice}
            discountPercentage={product.discountPercentage}
            size="md"
          />

          {/* Free Delivery Tag & Direct CTA */}
          <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
            <span className="text-emerald-700 font-medium flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-600" />
              Free Delivery
            </span>

            <Link
              href={`/products/${product.slug}`}
              className="text-brand-900 font-bold hover:text-accent-600 transition-colors"
            >
              View Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

