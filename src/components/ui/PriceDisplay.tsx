import React from 'react';

interface PriceDisplayProps {
  discountedPrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function PriceDisplay({
  discountedPrice,
  originalPrice,
  discountPercentage,
  size = 'md',
  className = '',
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: {
      current: 'text-sm font-bold text-gray-900',
      original: 'text-xs text-gray-400 line-through',
      discount: 'text-[11px] font-semibold text-emerald-600',
    },
    md: {
      current: 'text-base font-bold text-gray-900',
      original: 'text-xs text-gray-400 line-through',
      discount: 'text-xs font-semibold text-emerald-600',
    },
    lg: {
      current: 'text-xl font-bold text-gray-900',
      original: 'text-sm text-gray-400 line-through',
      discount: 'text-sm font-semibold text-emerald-600',
    },
    xl: {
      current: 'text-2xl sm:text-3xl font-extrabold text-gray-900',
      original: 'text-base sm:text-lg text-gray-400 line-through',
      discount: 'text-sm sm:text-base font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded',
    },
  }[size];

  return (
    <div className={`flex items-baseline gap-2 flex-wrap ${className}`}>
      <span className={sizeClasses.current}>₹{discountedPrice.toLocaleString('en-IN')}</span>
      {originalPrice && originalPrice > discountedPrice && (
        <span className={sizeClasses.original}>₹{originalPrice.toLocaleString('en-IN')}</span>
      )}
      {discountPercentage && discountPercentage > 0 && (
        <span className={sizeClasses.discount}>{discountPercentage}% off</span>
      )}
    </div>
  );
}

