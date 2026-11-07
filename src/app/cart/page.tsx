'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowLeft,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    summary,
    totalItemCount,
    isInitialized,
  } = useCart();

  // If not initialized yet, show loader to prevent layout shift
  if (!isInitialized) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm text-gray-500">
        Loading your shopping bag...
      </div>
    );
  }

  const totalMrp = items.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0
  );
  const totalSavings = totalMrp - summary.subtotal;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Title */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-900 text-white flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-accent-500" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-brand-900">
              Shopping Cart ({totalItemCount} {totalItemCount === 1 ? 'Item' : 'Items'})
            </h1>
            <p className="text-xs text-gray-500">Review selected sizes and items before checkout</p>
          </div>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-rose-600 hover:text-rose-700 font-bold"
          >
            Clear All
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 my-8 max-w-lg mx-auto shadow-xs">
          <div className="w-20 h-20 rounded-full bg-gray-50 text-gray-400 mx-auto flex items-center justify-center mb-4">
            <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your Shopping Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-8 max-w-xs mx-auto">
            Looks like you haven&apos;t added any men&apos;s apparel to your bag yet. Discover our latest
            collections!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-brand-900 hover:bg-black text-white font-bold py-3.5 px-8 rounded-xl text-sm shadow-md transition-all"
          >
            Start Shopping Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Delivery Bar Banner */}
            <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                {summary.subtotal >= 499 ? (
                  <span>
                    <strong>Free Delivery Unlocked!</strong> You qualified for zero shipping cost.
                  </span>
                ) : (
                  <span>
                    Add ₹{499 - summary.subtotal} more to get <strong>FREE Delivery</strong>
                  </span>
                )}
              </div>
              <span className="font-bold text-emerald-700 hidden sm:inline">
                {summary.subtotal >= 499 ? '₹0' : '₹49 fee'}
              </span>
            </div>

            {/* Items Card List */}
            <div className="bg-white rounded-3xl border border-gray-200 divide-y divide-gray-100 overflow-hidden shadow-xs">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
                >
                  <div className="flex gap-4 items-center">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200 select-none">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover pointer-events-none select-none"
                        sizes="100px"
                        draggable={false}
                      />
                    </div>

                    {/* Meta */}
                    <div className="space-y-1">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="text-xs sm:text-sm font-bold text-gray-900 hover:text-accent-600 line-clamp-2"
                      >
                        {item.product.name}
                      </Link>

                      <div className="flex items-center gap-2 text-xs text-gray-600 flex-wrap">
                        <span className="bg-gray-100 text-brand-900 font-bold px-2 py-0.5 rounded-md">
                          Size: {item.selectedSize}
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                      </div>

                      <div className="pt-1 flex items-baseline gap-2">
                        <span className="text-base font-extrabold text-gray-900">
                          ₹{item.product.discountedPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          ₹{item.product.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-semibold text-emerald-600">
                          {item.product.discountPercentage}% off
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Action Controls */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-gray-100">
                    {/* Stepper */}
                    <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-l-xl transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center text-xs font-black text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-r-xl transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total item price */}
                    <div className="text-right min-w-[70px]">
                      <div className="text-sm font-black text-gray-900">
                        ₹{(item.product.discountedPrice * item.quantity).toLocaleString('en-IN')}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[11px] text-gray-400 hover:text-rose-600 font-semibold inline-flex items-center gap-1 mt-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping CTA */}
            <div className="pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-900 hover:text-accent-600"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Exploring More Men&apos;s Wear
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout Box */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-5">
              <h3 className="text-base font-extrabold text-brand-900 pb-3 border-b border-gray-100">
                Price Breakdown ({totalItemCount} Items)
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Total MRP</span>
                  <span className="font-semibold text-gray-900">
                    ₹{totalMrp.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between text-emerald-600">
                  <span>Product Discount</span>
                  <span className="font-semibold">-₹{totalSavings.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    Delivery Fee
                    {summary.deliveryCharge === 0 && (
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                        FREE
                      </span>
                    )}
                  </span>
                  <span className="font-semibold">
                    {summary.deliveryCharge === 0 ? (
                      <span className="text-emerald-600 font-bold">₹0</span>
                    ) : (
                      `₹${summary.deliveryCharge}`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline text-sm font-extrabold text-brand-900">
                  <span>Total Payable</span>
                  <span className="text-lg text-brand-900">
                    ₹{summary.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Total Savings Pill (Meesho style) */}
              {totalSavings > 0 && (
                <div className="bg-emerald-50 text-emerald-800 text-xs font-bold p-3 rounded-2xl flex items-center gap-2 border border-emerald-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>You are saving ₹{totalSavings.toLocaleString('en-IN')} on this order!</span>
                </div>
              )}

              {/* Proceed to Checkout Button */}
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-brand-900 hover:bg-black text-white font-bold py-4 px-6 rounded-2xl text-sm shadow-md transition-all active:scale-[0.98]"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="text-center">
                <span className="text-[11px] text-gray-400">
                  Order directly confirmed on WhatsApp with Delivery Details
                </span>
              </div>
            </div>

            {/* Trust highlights */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/80 space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Secure Checkout & WhatsApp Confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-accent-500" />
                <span>7-Day Easy Size Replacement Assurance</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

