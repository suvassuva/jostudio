'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function CartDrawer() {
  const {
    items,
    isCartDrawerOpen,
    closeCartDrawer,
    updateQuantity,
    removeFromCart,
    summary,
    totalItemCount,
  } = useCart();

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={closeCartDrawer}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-brand-900 text-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-accent-500" />
              <h2 className="text-base font-bold">Shopping Bag ({totalItemCount})</h2>
            </div>
            <button
              type="button"
              onClick={closeCartDrawer}
              className="p-1 rounded-full text-gray-300 hover:text-white transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery progress bar (Meesho style gamified free shipping) */}
          <div className="bg-emerald-50 px-5 py-2.5 border-b border-emerald-100 text-xs text-emerald-800">
            {summary.subtotal >= 499 ? (
              <div className="flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Congratulations! You unlocked FREE Delivery!
              </div>
            ) : (
              <div>
                Add items worth{' '}
                <span className="font-bold text-emerald-900">
                  ₹{499 - summary.subtotal}
                </span>{' '}
                more for <span className="font-bold underline">FREE Delivery</span>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">Your cart is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mb-6">
                  Explore our latest men&apos;s collection and fill your bag with premium styles.
                </p>
                <button
                  type="button"
                  onClick={closeCartDrawer}
                  className="bg-brand-900 text-white text-xs font-semibold py-2.5 px-6 rounded-xl hover:bg-brand-800 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-100 select-none">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover pointer-events-none select-none"
                      sizes="80px"
                      draggable={false}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={closeCartDrawer}
                          className="text-xs font-bold text-gray-900 hover:text-accent-600 line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-rose-600 p-0.5 transition-colors"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500">
                        <span className="bg-gray-100 px-2 py-0.5 rounded font-medium text-gray-800">
                          Size: {item.selectedSize}
                        </span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Price */}
                      <div className="text-sm font-bold text-gray-900">
                        ₹{(item.product.discountedPrice * item.quantity).toLocaleString('en-IN')}
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-gray-400 font-normal ml-1">
                            (₹{item.product.discountedPrice} each)
                          </span>
                        )}
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-gray-200 bg-gray-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ₹{summary.subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charge</span>
                  <span className="font-semibold">
                    {summary.deliveryCharge === 0 ? (
                      <span className="text-emerald-600 uppercase font-bold">Free</span>
                    ) : (
                      `₹${summary.deliveryCharge}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-base text-brand-900">
                    ₹{summary.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={closeCartDrawer}
                  className="w-full flex items-center justify-center gap-2 bg-brand-900 hover:bg-black text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md transition-colors"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex gap-2">
                  <Link
                    href="/cart"
                    onClick={closeCartDrawer}
                    className="flex-1 text-center py-2 text-xs font-semibold text-brand-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    View Full Cart
                  </Link>
                  <button
                    type="button"
                    onClick={closeCartDrawer}
                    className="flex-1 text-center py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

