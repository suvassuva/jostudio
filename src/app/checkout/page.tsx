'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  ShieldCheck,
  Truck,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  ShoppingBag,
  AlertCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CustomerDetails } from '@/types';
import {
  validateCustomerDetails,
  getWhatsAppOrderUrl,
  generateWhatsAppOrderMessage,
  DEFAULT_WHATSAPP_NUMBER,
} from '@/lib/whatsapp';

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Assam',
  'Bihar',
  'Delhi NCR',
  'Gujarat',
  'Haryana',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'West Bengal',
  'Other State / UT',
];

export default function CheckoutPage() {
  const { items, summary, totalItemCount, isInitialized, clearCart } = useCart();

  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    houseNumber: '',
    area: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    instructions: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [handoffModalOpen, setHandoffModalOpen] = useState(false);
  const [whatsappOrderUrl, setWhatsappOrderUrl] = useState('');
  const [generatedMessagePreview, setGeneratedMessagePreview] = useState('');

  if (!isInitialized) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-sm text-gray-500">
        Loading checkout details...
      </div>
    );
  }

  // Prevent checkout on empty orders
  if (items.length === 0 && !handoffModalOpen) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400 mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">No Items In Cart</h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-6">
          You need to add at least one men&apos;s apparel item to your cart before proceeding to checkout.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-brand-900 text-white font-bold py-3 px-6 rounded-xl text-xs hover:bg-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Browse Collection
        </Link>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on type
    if (errors[name as keyof CustomerDetails]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateCustomerDetails(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      // Scroll to first error
      const firstErrorKey = Object.keys(validation.errors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    const message = generateWhatsAppOrderMessage(formData, items, summary);
    const url = getWhatsAppOrderUrl(formData, items, summary);

    setGeneratedMessagePreview(message);
    setWhatsappOrderUrl(url);

    // Launch WhatsApp in a new tab as per prompt requirement
    window.open(url, '_blank', 'noopener,noreferrer');

    // Display clear handoff message
    setHandoffModalOpen(true);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-brand-900 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shopping Cart
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-brand-900">
              Delivery Details & WhatsApp Checkout
            </h1>
            <p className="text-xs text-gray-500">
              Enter your address to generate your official WhatsApp order
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 w-fit">
            <Truck className="w-4 h-4" />
            <span>Cash on Delivery / UPI Available on WhatsApp</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Customer Details Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmitOrder}
            noValidate
            className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6"
          >
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-base font-extrabold text-brand-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-900 text-white text-xs flex items-center justify-center">
                  1
                </span>
                Customer Contact Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-xs font-bold text-gray-700 mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border outline-none transition-all ${
                    errors.fullName
                      ? 'border-rose-500 ring-1 ring-rose-500 bg-rose-50/20'
                      : 'border-gray-200 focus:border-brand-900 focus:ring-1 focus:ring-brand-900 bg-gray-50/50'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Mobile Phone */}
              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-gray-700 mb-1.5">
                  Mobile Number (WhatsApp Active) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                    +91
                  </span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className={`w-full pl-12 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border outline-none transition-all ${
                      errors.phone
                        ? 'border-rose-500 ring-1 ring-rose-500 bg-rose-50/20'
                        : 'border-gray-200 focus:border-brand-900 focus:ring-1 focus:ring-brand-900 bg-gray-50/50'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Address Header */}
            <div className="border-b border-gray-100 pb-4 pt-2">
              <h2 className="text-base font-extrabold text-brand-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-900 text-white text-xs flex items-center justify-center">
                  2
                </span>
                Shipping Address
              </h2>
            </div>

            {/* House / Street */}
            <div>
              <label htmlFor="houseNumber" className="block text-xs font-bold text-gray-700 mb-1.5">
                House / Flat No. / Building Name / Street <span className="text-rose-500">*</span>
              </label>
              <input
                id="houseNumber"
                name="houseNumber"
                type="text"
                value={formData.houseNumber}
                onChange={handleChange}
                placeholder="e.g. Flat 402, Royal Residency, 12th Main Road"
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border outline-none transition-all ${
                  errors.houseNumber
                    ? 'border-rose-500 ring-1 ring-rose-500 bg-rose-50/20'
                    : 'border-gray-200 focus:border-brand-900 focus:ring-1 focus:ring-brand-900 bg-gray-50/50'
                }`}
              />
              {errors.houseNumber && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.houseNumber}
                </p>
              )}
            </div>

            {/* Area / Colony */}
            <div>
              <label htmlFor="area" className="block text-xs font-bold text-gray-700 mb-1.5">
                Area / Colony / Sector / Landmark <span className="text-rose-500">*</span>
              </label>
              <input
                id="area"
                name="area"
                type="text"
                value={formData.area}
                onChange={handleChange}
                placeholder="e.g. Near HDFC Bank, Andheri West"
                className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border outline-none transition-all ${
                  errors.area
                    ? 'border-rose-500 ring-1 ring-rose-500 bg-rose-50/20'
                    : 'border-gray-200 focus:border-brand-900 focus:ring-1 focus:ring-brand-900 bg-gray-50/50'
                }`}
              />
              {errors.area && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.area}
                </p>
              )}
            </div>

            {/* City, State, PIN */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* City */}
              <div>
                <label htmlFor="city" className="block text-xs font-bold text-gray-700 mb-1.5">
                  City <span className="text-rose-500">*</span>
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Mumbai"
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border outline-none transition-all ${
                    errors.city
                      ? 'border-rose-500 ring-1 ring-rose-500 bg-rose-50/20'
                      : 'border-gray-200 focus:border-brand-900 focus:ring-1 focus:ring-brand-900 bg-gray-50/50'
                  }`}
                />
                {errors.city && (
                  <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.city}
                  </p>
                )}
              </div>

              {/* State */}
              <div>
                <label htmlFor="state" className="block text-xs font-bold text-gray-700 mb-1.5">
                  State <span className="text-rose-500">*</span>
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 bg-gray-50/50 focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* PIN Code */}
              <div>
                <label htmlFor="pincode" className="block text-xs font-bold text-gray-700 mb-1.5">
                  PIN Code <span className="text-rose-500">*</span>
                </label>
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="400053"
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border outline-none transition-all ${
                    errors.pincode
                      ? 'border-rose-500 ring-1 ring-rose-500 bg-rose-50/20'
                      : 'border-gray-200 focus:border-brand-900 focus:ring-1 focus:ring-brand-900 bg-gray-50/50'
                  }`}
                />
                {errors.pincode && (
                  <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.pincode}
                  </p>
                )}
              </div>
            </div>

            {/* Optional Instructions */}
            <div>
              <label
                htmlFor="instructions"
                className="block text-xs font-bold text-gray-700 mb-1.5"
              >
                Delivery Instructions (Optional)
              </label>
              <textarea
                id="instructions"
                name="instructions"
                rows={2}
                value={formData.instructions}
                onChange={handleChange}
                placeholder="e.g. Call before delivery, leave with neighbor if unavailable"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 bg-gray-50/50 focus:border-brand-900 focus:ring-1 focus:ring-brand-900 outline-none"
              />
            </div>

            {/* Submit CTA */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 px-6 rounded-2xl text-base shadow-lg shadow-emerald-700/25 transition-all transform active:scale-[0.98] cursor-pointer"
              >
                <Phone className="w-5 h-5 fill-current" />
                <span>Place Order via WhatsApp (₹{summary.total.toLocaleString('en-IN')})</span>
              </button>
              <p className="text-center text-[11px] text-gray-400 mt-2">
                Clicking will open WhatsApp with your pre-formatted order summary.
              </p>
            </div>
          </form>
        </div>

        {/* Right Column: Order Review */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-5">
            <h3 className="text-base font-extrabold text-brand-900 pb-3 border-b border-gray-100 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs font-normal text-gray-500">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
              </span>
            </h3>

            {/* Item list */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 text-xs items-center">
                  <div className="relative w-14 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200 select-none">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover pointer-events-none select-none"
                      draggable={false}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate">{item.product.name}</h4>
                    <div className="text-[11px] text-gray-500 flex items-center gap-2 mt-0.5">
                      <span className="bg-gray-100 px-1.5 py-0.5 rounded font-bold text-gray-700">
                        Size: {item.selectedSize}
                      </span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="font-bold text-gray-900 shrink-0">
                    ₹{(item.product.discountedPrice * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="space-y-2 pt-4 border-t border-gray-100 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">
                  ₹{summary.subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Charge</span>
                <span className="font-bold">
                  {summary.deliveryCharge === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    `₹${summary.deliveryCharge}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-brand-900 pt-3 border-t border-gray-200">
                <span>Total Amount</span>
                <span className="text-lg text-brand-900">
                  ₹{summary.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* WhatsApp Integration Explainer */}
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 space-y-2 text-xs text-emerald-900">
              <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                How WhatsApp Checkout Works:
              </div>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-emerald-800/90 leading-relaxed">
                <li>Submit your address details above</li>
                <li>WhatsApp automatically opens with your formatted message</li>
                <li>Hit send to confirm your order directly with our agent</li>
                <li>Pay via UPI or Cash On Delivery at your doorstep</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Handoff Modal (Clear handoff message, preserves cart) */}
      {handoffModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            aria-hidden="true"
          />

          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 space-y-5">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-gray-900">
                  Order Forwarded to WhatsApp!
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  We opened WhatsApp in a new tab with your order message ready for our business
                  team at <strong>+{DEFAULT_WHATSAPP_NUMBER}</strong>.
                </p>
              </div>

              {/* Message Preview Box */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 max-h-48 overflow-y-auto">
                <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1">
                  Sent Message Preview:
                </span>
                <pre className="text-[11px] font-mono text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {generatedMessagePreview}
                </pre>
              </div>

              <div className="space-y-2 pt-2">
                {/* Re-open WhatsApp button in case popup blocked */}
                <a
                  href={whatsappOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-md transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Re-open WhatsApp Chat
                </a>

                {/* Option to clear cart or keep cart */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      clearCart();
                      setHandoffModalOpen(false);
                      window.location.href = '/';
                    }}
                    className="flex-1 py-2.5 bg-brand-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors"
                  >
                    Done & Clear Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => setHandoffModalOpen(false)}
                    className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors"
                  >
                    Keep In Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

