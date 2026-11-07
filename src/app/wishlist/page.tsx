'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Trash2, ShoppingBag, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Product, ProductSize } from '@/types';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { RatingStars } from '@/components/ui/RatingStars';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist, wishlistCount, isInitialized } =
    useWishlist();
  const { addToCart } = useCart();

  // Selected size for modal when moving from wishlist to cart
  const [selectedProductForCart, setSelectedProductForCart] = useState<Product | null>(null);
  const [chosenSize, setChosenSize] = useState<ProductSize | null>(null);
  const [sizeError, setSizeError] = useState(false);

  if (!isInitialized) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm text-gray-500">
        Loading saved wishlist...
      </div>
    );
  }

  const handleOpenCartPicker = (product: Product) => {
    setSelectedProductForCart(product);
    setChosenSize(product.availableSizes[0] || 'M');
    setSizeError(false);
  };

  const handleConfirmAddToCart = () => {
    if (!selectedProductForCart || !chosenSize) {
      setSizeError(true);
      return;
    }

    addToCart(
      selectedProductForCart,
      chosenSize,
      selectedProductForCart.availableColors[0],
      1
    );

    // Optionally remove from wishlist after moving to cart
    removeFromWishlist(selectedProductForCart.id);
    setSelectedProductForCart(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Heart className="w-5 h-5 fill-rose-600" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-brand-900">
              My Saved Wishlist ({wishlistCount} {wishlistCount === 1 ? 'Item' : 'Items'})
            </h1>
            <p className="text-xs text-gray-500">Your personalized curated men&apos;s style collection</p>
          </div>
        </div>

        {wishlist.length > 0 && (
          <button
            type="button"
            onClick={clearWishlist}
            className="text-xs text-rose-600 hover:text-rose-700 font-bold"
          >
            Clear Wishlist
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 max-w-lg mx-auto shadow-xs my-8">
          <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-400 mx-auto flex items-center justify-center mb-4">
            <Heart className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-8 max-w-xs mx-auto">
            Save the styles you love by clicking the heart icon on any product to easily find them
            later.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-brand-900 hover:bg-black text-white font-bold py-3.5 px-8 rounded-xl text-sm shadow-md transition-all"
          >
            Explore Men&apos;s Catalog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden select-none">
                <Link href={`/products/${product.slug}`} className="block w-full h-full" draggable={false}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-300 pointer-events-none select-none"
                    draggable={false}
                  />
                </Link>

                {/* Remove from wishlist button */}
                <button
                  type="button"
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-rose-600 flex items-center justify-center hover:bg-rose-50 shadow-xs"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="absolute top-2.5 left-2.5 bg-brand-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {product.category}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <RatingStars
                      rating={product.rating}
                      reviewCount={product.reviewCount}
                      compact
                    />
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    className="text-xs sm:text-sm font-bold text-gray-900 hover:text-accent-600 line-clamp-2"
                  >
                    {product.name}
                  </Link>

                  <PriceDisplay
                    discountedPrice={product.discountedPrice}
                    originalPrice={product.originalPrice}
                    discountPercentage={product.discountPercentage}
                    size="sm"
                  />
                </div>

                {/* Move to Cart Action Button */}
                <button
                  type="button"
                  onClick={() => handleOpenCartPicker(product)}
                  className="w-full flex items-center justify-center gap-1.5 bg-brand-900 hover:bg-black text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Move to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Size Picker Modal for Wishlist-to-Cart */}
      {selectedProductForCart && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setSelectedProductForCart(null)}
            aria-hidden="true"
          />

          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200 space-y-4">
              <div className="flex items-start gap-3">
                <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                  <Image
                    src={selectedProductForCart.images[0]}
                    alt={selectedProductForCart.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-bold text-gray-900 line-clamp-2">
                    {selectedProductForCart.name}
                  </h3>
                  <div className="text-sm font-extrabold text-brand-900 mt-1">
                    ₹{selectedProductForCart.discountedPrice.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Select Size to Add to Cart:
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {selectedProductForCart.availableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setChosenSize(size);
                        setSizeError(false);
                      }}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        chosenSize === size
                          ? 'bg-brand-900 text-white border-brand-900 shadow-xs'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <p className="text-[11px] text-rose-600 mt-1">Please pick a size.</p>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProductForCart(null)}
                  className="flex-1 py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAddToCart}
                  className="flex-1 py-2.5 bg-brand-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

