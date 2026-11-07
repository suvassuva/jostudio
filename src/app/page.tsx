import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Sparkles,
  Flame,
  ShieldCheck,
  Truck,
  RotateCcw,
  Zap,
  ShoppingBag,
  MapPin,
  Phone,
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { DEFAULT_WHATSAPP_NUMBER } from '@/lib/whatsapp';

export default function HomePage() {
  const trendingProducts = PRODUCTS.filter((p) => p.isTrending).slice(0, 8);
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 8);
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 8);

  return (
    <div className="space-y-10 sm:space-y-14 pb-12">
      {/* 1. Large Promotional Hero Banner - Enclosed Card Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-6">
        <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-200/60 bg-stone-950 flex flex-col md:flex-row md:items-center md:min-h-[600px] lg:min-h-[640px]">
          {/* Model Image Container:
              On Mobile: Sits at the top (h-80 sm:h-96) with its own dedicated space so face & styling are 100% visible with zero text covering!
              On Desktop: Sits on right half (w-[50%] / w-[48%]) with smooth left-edge gradient blend! */}
          <div className="relative w-full h-80 sm:h-96 md:h-full md:absolute md:right-0 md:top-0 md:bottom-0 md:w-[52%] lg:w-[48%] overflow-hidden shrink-0 select-none">
            <Image
              src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=1200&auto=format&fit=crop&q=85"
              alt="JO STUDIO Men's Fashion Lifestyle"
              fill
              priority
              className="object-cover object-top filter brightness-[0.98] contrast-[1.02] pointer-events-none select-none"
              sizes="(max-width: 768px) 100vw, 50vw"
              draggable={false}
            />
            {/* Smooth Vignette / Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/25 to-transparent md:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/45 to-transparent hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-transparent to-stone-950/60" />
          </div>

          {/* Content Area */}
          <div className="relative z-20 p-5 sm:p-8 md:p-12 lg:p-16 w-full md:max-w-xl lg:max-w-2xl text-white space-y-4 sm:space-y-5 -mt-8 sm:-mt-10 md:mt-0">
            {/* Brand Logo (JO STUDIO) - Clean Typography */}
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl font-black tracking-tight text-white uppercase leading-none">
                JO<span className="text-accent-500 font-black">STUDIO</span>
              </span>
              <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-stone-400 font-semibold mt-0.5">
                Modern Menswear
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.15] tracking-tight">
              Fashion with a{' '}
              <span className="italic font-normal text-amber-200">
                Purpose.
              </span>
            </h1>

            {/* Body Copy - Responsive Narrative */}
            <div className="space-y-2.5 text-xs sm:text-sm text-stone-300 leading-relaxed max-w-lg">
              <p>
                Every garment is thoughtfully engineered for the modern Indian man—delivering confidence,
                all-day breathability, and an effortless fit. Lasting style begins with 100% bio-washed
                combed cotton, structured tailoring, and timeless cuts.
              </p>
              <p className="hidden md:block">
                At JO STUDIO, we partner directly with certified textile artisans in Surat, Tirupur,
                and Mumbai. Enjoy true manufacturer pricing, zero middlemen markup, and instant 1-click
                WhatsApp order confirmation straight to your doorstep.
              </p>
            </div>

            {/* Italic Mission Tagline */}
            <p className="italic text-xs sm:text-sm text-amber-100/90 font-serif pt-0.5">
              Move with confidence. Feel the premium drape. Transform your wardrobe with JO STUDIO.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-100 text-stone-950 font-bold py-3.5 px-6 rounded-2xl text-xs sm:text-sm shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <span>Start Shopping with Us</span>
                <ShoppingBag className="w-4 h-4 text-stone-950" />
              </Link>

              <a
                href={`https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'Hello JO STUDIO! I would like to explore the latest men clothing collection.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md font-semibold py-3.5 px-5 rounded-2xl text-xs sm:text-sm transition-all"
              >
                <span>Order on WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Bottom-Right Floating Location / Service Widget (Desktop only) */}
          <div className="hidden md:block absolute bottom-6 sm:bottom-8 right-6 sm:right-8 z-20">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-3 sm:p-4 border border-white/70 divide-y divide-gray-100 text-stone-900 min-w-[220px] sm:min-w-[250px]">
              {/* Row 1: Dispatch Hubs */}
              <div className="flex items-center gap-3 pb-2.5">
                <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Express Delivery Hubs</div>
                  <div className="text-[10px] text-stone-500">Surat • Mumbai • Delhi NCR</div>
                </div>
              </div>

              {/* Row 2: WhatsApp Hotline */}
              <div className="flex items-center gap-3 pt-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">WhatsApp Fast Checkout</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">1-Click Order Confirmation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop By Category (Visual Swipeable Rail on Mobile, Grid on Tablet/Desktop) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-5">
          <div>
            <span className="text-[10px] sm:text-xs font-bold text-accent-500 uppercase tracking-widest block mb-0.5">
              Top Categories
            </span>
            <h2 className="text-base sm:text-2xl font-black text-brand-900 tracking-tight">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs sm:text-sm font-bold text-brand-900 hover:text-accent-500 flex items-center gap-1 group shrink-0 whitespace-nowrap"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Swipeable Horizontal Rail on Mobile, Full Grid on Desktop */}
        <div className="flex sm:grid sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${encodeURIComponent(cat.id)}`}
              className="group flex flex-col items-center text-center shrink-0 w-20 sm:w-auto"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden bg-gray-100 mb-1.5 border border-gray-200 group-hover:border-accent-500 group-hover:shadow-md transition-all select-none">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="100px"
                  className="object-cover group-hover:scale-110 transition-transform duration-300 pointer-events-none select-none"
                  draggable={false}
                />
                {cat.badge && (
                  <span className="absolute bottom-1 left-1 right-1 bg-brand-900/90 text-white text-[8px] sm:text-[9px] font-bold py-0.5 rounded text-center">
                    {cat.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-gray-800 group-hover:text-accent-500 line-clamp-1 transition-colors">
                {cat.name}
              </span>
              <span className="text-[9px] sm:text-[10px] text-gray-400">{cat.itemCount}+ Styles</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Reassurance Trust Highlights - Fully Responsive Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-50 to-slate-100 rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-gray-200/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3 bg-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-xs">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-accent-50 text-accent-500 flex items-center justify-center shrink-0">
                <Truck className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] sm:text-xs font-bold text-gray-900 leading-tight">Free Shipping</h4>
                <p className="text-[9px] sm:text-[10px] text-gray-500 leading-tight mt-0.5">Above ₹499 in all India</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3 bg-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-xs">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] sm:text-xs font-bold text-gray-900 leading-tight">Instant WhatsApp</h4>
                <p className="text-[9px] sm:text-[10px] text-gray-500 leading-tight mt-0.5">1-click order checkout</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3 bg-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-xs">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] sm:text-xs font-bold text-gray-900 leading-tight">Direct Factory</h4>
                <p className="text-[9px] sm:text-[10px] text-gray-500 leading-tight mt-0.5">Best pocket pricing</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3 bg-white p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-xs">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <RotateCcw className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] sm:text-xs font-bold text-gray-900 leading-tight">Easy Exchange</h4>
                <p className="text-[9px] sm:text-[10px] text-gray-500 leading-tight mt-0.5">7-day size swap</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Trending Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-2 mb-4 sm:mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-rose-600 uppercase tracking-wider mb-0.5">
              <Flame className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
              Viral Streetwear
            </div>
            <h2 className="text-base sm:text-2xl font-black text-brand-900 tracking-tight">
              Trending Right Now
            </h2>
          </div>
          <Link
            href="/products?trending=true"
            className="text-xs sm:text-sm font-bold text-brand-900 hover:text-accent-500 flex items-center gap-1 group shrink-0 whitespace-nowrap"
          >
            <span>See All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6 items-stretch">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Promotional Offer Banner (Mid-Page) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700 text-white p-6 sm:p-12 shadow-xl">
          <div className="max-w-xl space-y-4 relative z-10">
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Limited Period Offer
            </span>
            <h3 className="text-2xl sm:text-4xl font-black leading-tight">
              Flat 60% Off on Denim, Chinos & Oversized Tees
            </h3>
            <p className="text-xs sm:text-sm text-orange-100 leading-relaxed">
              Stock up your wardrobe with high-density cotton essentials. Pick your sizes and check
              out directly on WhatsApp with cash-on-delivery availability.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/products?discount=60"
                className="bg-brand-950 hover:bg-black text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition-all shadow-md"
              >
                Claim Discount
              </Link>
              <Link
                href="/products?category=Jeans"
                className="bg-white text-brand-950 hover:bg-gray-100 font-bold text-xs sm:text-sm py-3 px-6 rounded-xl transition-all"
              >
                Explore Denims
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Best-Selling Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-2 mb-4 sm:mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-amber-600 uppercase tracking-wider mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Customer Favourites
            </div>
            <h2 className="text-base sm:text-2xl font-black text-brand-900 tracking-tight">
              Best-Selling Essentials
            </h2>
          </div>
          <Link
            href="/products?bestseller=true"
            className="text-xs sm:text-sm font-bold text-brand-900 hover:text-accent-500 flex items-center gap-1 group shrink-0 whitespace-nowrap"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6 items-stretch">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-2 mb-4 sm:mb-6">
          <div>
            <span className="text-[10px] sm:text-xs font-bold text-blue-600 uppercase tracking-widest block mb-0.5">
              Fresh Drops
            </span>
            <h2 className="text-base sm:text-2xl font-black text-brand-900 tracking-tight">
              New Arrivals This Season
            </h2>
          </div>
          <Link
            href="/products?sort=newest"
            className="text-xs sm:text-sm font-bold text-brand-900 hover:text-accent-500 flex items-center gap-1 group shrink-0 whitespace-nowrap"
          >
            <span>Explore Drops</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6 items-stretch">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

