'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Ruler,
  AlertCircle,
  Check,
  Share2,
  Phone,
  Star,
} from 'lucide-react';
import { Product, ProductSize, ProductColor } from '@/types';
import { getRelatedProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { SizeGuideModal } from '@/components/product/SizeGuideModal';
import { ProductCard } from '@/components/product/ProductCard';
import { DEFAULT_WHATSAPP_NUMBER } from '@/lib/whatsapp';

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product.availableColors[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const isWishlisted = isInWishlist(product.id);
  const relatedProducts = getRelatedProducts(product, 4);

  const handleSizeSelect = (size: ProductSize) => {
    setSelectedSize(size);
    setSizeError(false);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    router.push('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 space-y-6 sm:space-y-8">
      {/* Breadcrumbs - Compact & single-line */}
      <nav className="flex items-center gap-1.5 text-[11px] text-gray-400 overflow-x-auto no-scrollbar">
        <Link href="/" className="hover:text-gray-900 transition-colors shrink-0">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/products?category=${encodeURIComponent(product.category)}`}
          className="hover:text-gray-900 transition-colors shrink-0"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="font-medium text-gray-700 truncate max-w-[200px] sm:max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
        {/* Left: Product Images Gallery */}
        <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-3">
          {/* Thumbnails list */}
          <div className="flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto no-scrollbar sm:w-16 shrink-0 select-none">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative w-12 h-16 sm:w-16 sm:h-20 rounded-lg overflow-hidden border transition-all shrink-0 ${
                  selectedImageIndex === idx
                    ? 'border-brand-900 shadow-sm ring-2 ring-brand-900/20'
                    : 'border-gray-200 hover:border-gray-400 opacity-75 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover pointer-events-none select-none"
                  draggable={false}
                />
              </button>
            ))}
          </div>

          {/* Main Large Image */}
          <div className="relative flex-1 aspect-[3/4] max-h-[520px] rounded-2xl overflow-hidden bg-gray-50 border border-gray-200/80 shadow-xs select-none">
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 550px"
              className="object-cover object-top pointer-events-none select-none"
              draggable={false}
            />

            {/* Wishlist floating button - Sleek & compact */}
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm z-10 ${
                isWishlisted
                  ? 'bg-rose-50 text-rose-600'
                  : 'bg-white/95 backdrop-blur-xs text-gray-700 hover:text-rose-600'
              }`}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              <Heart
                className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 stroke-rose-600' : ''}`}
              />
            </button>

            {/* Discount Badge - Minimalist emerald tag */}
            <div className="absolute top-2.5 left-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
              {product.discountPercentage}% OFF
            </div>
          </div>
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div className="lg:col-span-6 space-y-4">
          {/* Header Info */}
          <div>
            <div className="flex items-center justify-between text-[10px] text-gray-400 uppercase tracking-wider mb-1">
              <span>{product.category}</span>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-brand-900 lowercase transition-colors"
              >
                <Share2 className="w-3 h-3" />
                <span>{copiedLink ? 'Link copied!' : 'share'}</span>
              </button>
            </div>

            <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              {product.name}
            </h1>

            {/* Compact Meesho-style Rating Row */}
            <div className="mt-2 flex items-center gap-2">
              <div className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
                <span>{product.rating.toFixed(1)}</span>
                <Star className="w-2.5 h-2.5 fill-current" />
              </div>
              <span className="text-[11px] text-gray-500">
                ({product.reviewCount?.toLocaleString('en-IN') || 480} ratings)
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                Verified Quality
              </span>
            </div>
          </div>

          {/* Pricing Section (Compact & Refined) */}
          <div className="bg-gray-50/80 p-2.5 sm:p-3 rounded-xl border border-gray-200/80">
            <div className="flex items-baseline gap-2.5 flex-wrap">
              <span className="text-xl sm:text-2xl font-black text-gray-900">
                ₹{product.discountedPrice.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && product.originalPrice > product.discountedPrice && (
                <span className="text-xs sm:text-sm text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercentage && product.discountPercentage > 0 && (
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>
            <p className="text-[10px] text-gray-500 mt-1">
              Inclusive of all taxes. Free delivery on this order.
            </p>
          </div>

          {/* Available Colors */}
          {product.availableColors.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-900 mb-1.5">
                <span>
                  Color: <span className="font-normal text-gray-600">{selectedColor.name}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                {product.availableColors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-brand-900 ring-2 ring-brand-900/30 scale-105'
                          : 'border-gray-200 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      aria-label={`Select color ${color.name}`}
                    >
                      {isSelected && (
                        <Check
                          className={`w-3.5 h-3.5 ${
                            color.name === 'Off White' ||
                            color.name === 'Crisp White' ||
                            color.name === 'Pure White' ||
                            color.name === 'Warm Cream' ||
                            color.name === 'Bone White'
                              ? 'text-gray-900'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-semibold text-gray-900 mb-1.5">
              <span className="flex items-center gap-1">
                Select Size <span className="text-rose-500">*</span>
                {selectedSize && (
                  <span className="text-brand-900 font-bold ml-1">
                    ({selectedSize})
                  </span>
                )}
              </span>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="text-[11px] text-accent-600 hover:text-accent-700 font-medium flex items-center gap-1 transition-colors"
              >
                <Ruler className="w-3 h-3" />
                Size Guide
              </button>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {product.availableSizes.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeSelect(size)}
                    className={`h-9 min-w-[2.25rem] text-xs font-bold rounded-lg border transition-all flex items-center justify-center ${
                      isSelected
                        ? 'bg-brand-900 text-white border-brand-900 shadow-xs'
                        : 'bg-white text-gray-800 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            {/* Validation Error Message */}
            {sizeError && (
              <div className="flex items-center gap-1 text-[11px] text-rose-600 font-medium mt-1.5 animate-in fade-in">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Please select a size to proceed.</span>
              </div>
            )}
          </div>

          {/* Quantity Selector - Compact inline */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-gray-900">Quantity</span>
            <div className="flex items-center border border-gray-200 rounded-lg w-24 h-8 bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-full text-gray-600 hover:bg-gray-100 text-sm font-bold transition-colors flex items-center justify-center"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="flex-1 text-center text-xs font-bold text-gray-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-full text-gray-600 hover:bg-gray-100 text-sm font-bold transition-colors flex items-center justify-center"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="space-y-2 pt-1">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-1.5 bg-brand-900 hover:bg-brand-800 text-white font-bold py-2.5 px-3 rounded-lg text-xs shadow-xs transition-all active:scale-[0.98]"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Add to Cart
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-1.5 bg-accent-500 hover:bg-accent-600 text-white font-bold py-2.5 px-3 rounded-lg text-xs shadow-xs shadow-accent-500/20 transition-all active:scale-[0.98]"
              >
                <Zap className="w-3.5 h-3.5" />
                Buy Now
              </button>
            </div>

            {/* Direct WhatsApp Quick Inquire Button */}
            <a
              href={`https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `Hello JO STUDIO! I want to inquire about "${product.name}" (Price: ₹${product.discountedPrice}). Is it available in size ${selectedSize || 'M'}?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-2 px-3 rounded-lg text-[11px] border border-emerald-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              Quick Inquire / Order on WhatsApp
            </a>
          </div>

          {/* Trust Assurances - Sleek low-profile grid */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100 text-[10px] text-gray-600">
            <div className="flex flex-col items-center text-center p-1.5 rounded-lg bg-gray-50/80">
              <Truck className="w-3.5 h-3.5 text-brand-900 mb-0.5" />
              <span className="font-bold text-gray-900">Free Delivery</span>
              <span className="text-[9px] text-gray-400">On all orders</span>
            </div>
            <div className="flex flex-col items-center text-center p-1.5 rounded-lg bg-gray-50/80">
              <RotateCcw className="w-3.5 h-3.5 text-brand-900 mb-0.5" />
              <span className="font-bold text-gray-900">7 Days Return</span>
              <span className="text-[9px] text-gray-400">Easy size swap</span>
            </div>
            <div className="flex flex-col items-center text-center p-1.5 rounded-lg bg-gray-50/80">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-900 mb-0.5" />
              <span className="font-bold text-gray-900">100% Genuine</span>
              <span className="text-[9px] text-gray-400">Certified fabrics</span>
            </div>
          </div>

          {/* Product Specifications & Details */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Product Specifications
            </h3>

            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <div className="py-1.5 px-2.5 bg-gray-50/80 rounded-lg">
                <span className="text-gray-400 block text-[9px] uppercase tracking-wide">Fabric</span>
                <span className="font-semibold text-gray-800 text-[11px]">
                  {product.fabric || 'Pure Cotton'}
                </span>
              </div>
              <div className="py-1.5 px-2.5 bg-gray-50/80 rounded-lg">
                <span className="text-gray-400 block text-[9px] uppercase tracking-wide">Fit</span>
                <span className="font-semibold text-gray-800 text-[11px]">
                  {product.fit || 'Regular Fit'}
                </span>
              </div>
              <div className="py-1.5 px-2.5 bg-gray-50/80 rounded-lg">
                <span className="text-gray-400 block text-[9px] uppercase tracking-wide">Pattern</span>
                <span className="font-semibold text-gray-800 text-[11px]">
                  {product.pattern || 'Solid'}
                </span>
              </div>
              <div className="py-1.5 px-2.5 bg-gray-50/80 rounded-lg">
                <span className="text-gray-400 block text-[9px] uppercase tracking-wide">Stock Status</span>
                <span className="font-semibold text-emerald-600 text-[11px]">
                  {product.stockStatus === 'in_stock' ? 'In Stock (Ready)' : 'Few Units Left'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <h4 className="text-[11px] font-bold text-gray-900">Description</h4>
              <p className="text-[11px] text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Bullet Details */}
            {product.details && product.details.length > 0 && (
              <div className="space-y-1">
                <h4 className="text-[11px] font-bold text-gray-900">Key Features</h4>
                <ul className="space-y-0.5 text-[11px] text-gray-600">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-accent-500 mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-bold text-brand-900 tracking-tight">
              Similar {product.category} You Might Like
            </h2>
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-semibold text-brand-900 hover:text-accent-500 transition-colors"
            >
              View More →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
}
