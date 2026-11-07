'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter, SlidersHorizontal, X, ArrowUpDown, ChevronDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { Product, ProductCategory, ProductSize } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductFilters, FilterValues } from '@/components/product/ProductFilters';

type SortOption = 'popularity' | 'price_asc' | 'price_desc' | 'newest' | 'discount';

function ProductListingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL query params
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';
  const initialTrending = searchParams.get('trending') === 'true';
  const initialBestSeller = searchParams.get('bestseller') === 'true';
  const initialSort = (searchParams.get('sort') as SortOption) || 'popularity';

  const [filters, setFilters] = useState<FilterValues>({
    category: initialCategory,
    sizes: [],
    minPrice: 0,
    maxPrice: 5000,
    colors: [],
  });

  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category from URL if it changes
  useEffect(() => {
    setFilters((prev) =>
      prev.category !== initialCategory ? { ...prev, category: initialCategory } : prev
    );
  }, [initialCategory]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search Query
      if (initialSearch.trim()) {
        const query = initialSearch.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesDesc) {
          return false;
        }
      }

      // 2. Category Filter
      if (
        filters.category &&
        product.category.toLowerCase() !== filters.category.toLowerCase()
      ) {
        return false;
      }

      // 3. Trending / Best Seller query filter
      if (initialTrending && !product.isTrending) {
        return false;
      }
      if (initialBestSeller && !product.isBestSeller) {
        return false;
      }

      // 4. Size Filter (product must have at least one of the selected sizes)
      if (filters.sizes.length > 0) {
        const hasSize = filters.sizes.some((s) => product.availableSizes.includes(s));
        if (!hasSize) return false;
      }

      // 5. Price Filter
      if (
        product.discountedPrice < filters.minPrice ||
        product.discountedPrice > filters.maxPrice
      ) {
        return false;
      }

      // 6. Color Filter
      if (filters.colors.length > 0) {
        const hasColor = product.availableColors.some((c) =>
          filters.colors.some((fc) => c.name.toLowerCase().includes(fc.toLowerCase()))
        );
        if (!hasColor) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') {
        return a.discountedPrice - b.discountedPrice;
      }
      if (sortBy === 'price_desc') {
        return b.discountedPrice - a.discountedPrice;
      }
      if (sortBy === 'newest') {
        return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      }
      if (sortBy === 'discount') {
        return b.discountPercentage - a.discountPercentage;
      }
      // default: popularity
      return b.rating * b.reviewCount - a.rating * a.reviewCount;
    });
  }, [filters, initialSearch, initialTrending, initialBestSeller, sortBy]);

  const handleResetFilters = () => {
    setFilters({
      category: '',
      sizes: [],
      minPrice: 0,
      maxPrice: 5000,
      colors: [],
    });
    router.push('/products');
  };

  const removeSizeFilter = (size: ProductSize) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((s) => s !== size),
    }));
  };

  const removeColorFilter = (color: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.filter((c) => c !== color),
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumb & Title */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
          <span>Home</span>
          <span>/</span>
          <span className="font-semibold text-gray-800">Men&apos;s Clothing</span>
          {filters.category && (
            <>
              <span>/</span>
              <span className="font-bold text-brand-900">{filters.category}</span>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-brand-900 tracking-tight">
              {filters.category ? filters.category : "Men's Apparel & Streetwear"}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Showing {filteredProducts.length} verified styles
              {initialSearch && ` for "${initialSearch}"`}
            </p>
          </div>

          {/* Sort Dropdown & Mobile Filter Button */}
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-xs font-bold text-gray-800 shadow-xs hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-900" />
              <span>Filters</span>
              {(filters.sizes.length > 0 ||
                filters.colors.length > 0 ||
                filters.category ||
                filters.minPrice > 0) && (
                <span className="w-2 h-2 rounded-full bg-accent-500" />
              )}
            </button>

            {/* Sort Selector */}
            <div className="relative flex-1 sm:flex-none">
              <div className="flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 shadow-xs">
                <span className="text-gray-400 mr-2 hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent font-bold text-brand-900 outline-none cursor-pointer pr-4"
                  aria-label="Sort products by"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="newest">New Arrivals</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {(filters.category ||
          filters.sizes.length > 0 ||
          filters.colors.length > 0 ||
          filters.minPrice > 0 ||
          filters.maxPrice < 5000 ||
          initialSearch) && (
          <div className="flex items-center gap-2 flex-wrap mt-4 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">Active filters:</span>

            {initialSearch && (
              <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full font-medium">
                Search: {initialSearch}
                <button
                  type="button"
                  onClick={() => router.push('/products')}
                  className="hover:text-black"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.category && (
              <span className="inline-flex items-center gap-1 bg-brand-900 text-white text-xs px-2.5 py-1 rounded-full font-medium">
                {filters.category}
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, category: '' })}
                  className="hover:text-gray-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {filters.sizes.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full font-medium"
              >
                Size: {s}
                <button
                  type="button"
                  onClick={() => removeSizeFilter(s)}
                  className="hover:text-rose-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {filters.colors.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full font-medium"
              >
                Color: {c}
                <button
                  type="button"
                  onClick={() => removeColorFilter(c)}
                  className="hover:text-rose-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {(filters.minPrice > 0 || filters.maxPrice < 5000) && (
              <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded-full font-medium">
                ₹{filters.minPrice} - ₹{filters.maxPrice}
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, minPrice: 0, maxPrice: 5000 })}
                  className="hover:text-rose-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-rose-600 hover:underline font-bold ml-1"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Main Grid with Desktop Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs h-fit sticky top-28">
          <ProductFilters
            filters={filters}
            onChange={setFilters}
            onReset={handleResetFilters}
            totalResultsCount={filteredProducts.length}
          />
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
              <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center mb-4">
                <Filter className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                No matching apparel found
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto mb-6">
                Try adjusting your price range, clearing selected sizes or removing search filters
                to view more collections.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="bg-brand-900 text-white text-xs font-bold py-2.5 px-6 rounded-xl hover:bg-brand-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-6 items-stretch">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Slide-Out Drawer */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-brand-900 text-white">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-accent-500" />
                  <span className="font-bold text-sm">Filter Apparel</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full text-gray-300 hover:text-white"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <ProductFilters
                  filters={filters}
                  onChange={setFilters}
                  onReset={handleResetFilters}
                  totalResultsCount={filteredProducts.length}
                />
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="flex-1 py-3 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 bg-white hover:bg-gray-50"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-3 bg-brand-900 rounded-xl text-xs font-bold text-white hover:bg-brand-800"
                >
                  Show {filteredProducts.length} Items
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductListingPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-sm text-gray-500">
          Loading men&apos;s collection...
        </div>
      }
    >
      <ProductListingContent />
    </Suspense>
  );
}
