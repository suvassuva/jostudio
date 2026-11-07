'use client';

import React from 'react';
import { ProductCategory, ProductSize } from '@/types';
import { CATEGORIES } from '@/data/products';
import { RotateCcw, Check } from 'lucide-react';

export interface FilterValues {
  category: string;
  sizes: ProductSize[];
  minPrice: number;
  maxPrice: number;
  colors: string[];
}

interface ProductFiltersProps {
  filters: FilterValues;
  onChange: (newFilters: FilterValues) => void;
  onReset: () => void;
  totalResultsCount: number;
}

const AVAILABLE_SIZES: ProductSize[] = ['S', 'M', 'L', 'XL', 'XXL'];

const AVAILABLE_COLORS: { name: string; hex: string }[] = [
  { name: 'Black', hex: '#111827' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Blue', hex: '#2563eb' },
  { name: 'Navy', hex: '#1e3a8a' },
  { name: 'Olive', hex: '#3f4e3c' },
  { name: 'Grey', hex: '#64748b' },
  { name: 'Red', hex: '#991b1b' },
  { name: 'Khaki', hex: '#d4a373' },
  { name: 'Burgundy', hex: '#881337' },
];

const PRICE_PRESETS: { label: string; min: number; max: number }[] = [
  { label: 'All Prices', min: 0, max: 5000 },
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 - ₹999', min: 500, max: 999 },
  { label: '₹1000 - ₹1999', min: 1000, max: 1999 },
  { label: '₹2000 & Above', min: 2000, max: 5000 },
];

export function ProductFilters({
  filters,
  onChange,
  onReset,
  totalResultsCount,
}: ProductFiltersProps) {
  const activeFiltersCount =
    (filters.category ? 1 : 0) +
    filters.sizes.length +
    filters.colors.length +
    (filters.minPrice > 0 || filters.maxPrice < 5000 ? 1 : 0);

  const toggleSize = (size: ProductSize) => {
    const nextSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onChange({ ...filters, sizes: nextSizes });
  };

  const toggleColor = (colorName: string) => {
    const nextColors = filters.colors.includes(colorName)
      ? filters.colors.filter((c) => c !== colorName)
      : [...filters.colors, colorName];
    onChange({ ...filters, colors: nextColors });
  };

  const setCategory = (cat: string) => {
    onChange({ ...filters, category: cat });
  };

  const setPricePreset = (min: number, max: number) => {
    onChange({ ...filters, minPrice: min, maxPrice: max });
  };

  return (
    <div className="space-y-6">
      {/* Header with Results & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <div>
          <span className="text-sm font-bold text-gray-900">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-brand-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset All
          </button>
        )}
      </div>

      {/* 1. Category Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-2.5">
          Categories
        </h4>
        <div className="space-y-1 text-xs">
          <button
            type="button"
            onClick={() => setCategory('')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
              filters.category === ''
                ? 'bg-brand-900 text-white font-bold'
                : 'text-gray-700 hover:bg-gray-100 font-medium'
            }`}
          >
            <span>All Categories</span>
            <span className={filters.category === '' ? 'text-gray-200' : 'text-gray-400'}>
              32
            </span>
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = filters.category.toLowerCase() === cat.id.toLowerCase();
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                  isSelected
                    ? 'bg-brand-900 text-white font-bold'
                    : 'text-gray-700 hover:bg-gray-100 font-medium'
                }`}
              >
                <span>{cat.name}</span>
                <span className={isSelected ? 'text-gray-200' : 'text-gray-400'}>
                  {cat.itemCount}+
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Size Filter */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2.5">
          <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">
            Available Sizes
          </h4>
          {filters.sizes.length > 0 && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, sizes: [] })}
              className="text-[10px] text-gray-400 hover:text-gray-700"
            >
              Clear
            </button>
          )}
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {AVAILABLE_SIZES.map((size) => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`py-2 text-xs font-bold rounded-lg border transition-all text-center ${
                  isSelected
                    ? 'bg-brand-900 text-white border-brand-900 shadow-xs'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Price Filter */}
      <div className="pt-4 border-t border-gray-100">
        <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-2.5">
          Price Range
        </h4>
        <div className="space-y-1.5">
          {PRICE_PRESETS.map((preset) => {
            const isSelected =
              filters.minPrice === preset.min && filters.maxPrice === preset.max;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => setPricePreset(preset.min, preset.max)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                  isSelected
                    ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{preset.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Color Swatches */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-2.5">
          <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">
            Colors
          </h4>
          {filters.colors.length > 0 && (
            <button
              type="button"
              onClick={() => onChange({ ...filters, colors: [] })}
              className="text-[10px] text-gray-400 hover:text-gray-700"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_COLORS.map((col) => {
            const isSelected = filters.colors.includes(col.name);
            return (
              <button
                key={col.name}
                type="button"
                onClick={() => toggleColor(col.name)}
                title={col.name}
                className={`relative w-7 h-7 rounded-full border flex items-center justify-center transition-transform ${
                  isSelected
                    ? 'ring-2 ring-brand-900 ring-offset-2 scale-110 border-gray-400'
                    : 'border-gray-200 hover:scale-105'
                }`}
                style={{ backgroundColor: col.hex }}
                aria-label={`Filter by color ${col.name}`}
              >
                {isSelected && (
                  <Check
                    className={`w-3.5 h-3.5 ${
                      col.name === 'White' || col.name === 'Khaki'
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
    </div>
  );
}

