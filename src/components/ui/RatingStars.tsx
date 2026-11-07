import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  compact?: boolean;
}

export function RatingStars({ rating, reviewCount, compact = false }: RatingStarsProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
          {rating.toFixed(1)}
          <Star className="w-2.5 h-2.5 fill-current" />
        </span>
        {reviewCount !== undefined && (
          <span className="text-[11px] text-gray-500">
            ({reviewCount.toLocaleString('en-IN')})
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.round(rating)
                ? 'text-amber-400 fill-amber-400'
                : 'text-gray-200 fill-gray-200'
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-gray-800">{rating.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className="text-xs text-gray-500">
          ({reviewCount.toLocaleString('en-IN')} ratings)
        </span>
      )}
    </div>
  );
}

