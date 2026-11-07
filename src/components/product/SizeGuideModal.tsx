'use client';

import React from 'react';
import { X, Ruler } from 'lucide-react';
import { ProductCategory } from '@/types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: ProductCategory;
}

export function SizeGuideModal({ isOpen, onClose, category }: SizeGuideModalProps) {
  if (!isOpen) return null;

  const isTops =
    category === 'T-Shirts' ||
    category === 'Shirts' ||
    category === 'Hoodies' ||
    category === 'Jackets' ||
    category === 'Casual Wear' ||
    category === 'Formal Wear';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-accent-50 text-accent-600 flex items-center justify-center">
                <Ruler className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Standard Size Guide</h3>
                <p className="text-xs text-gray-500">All measurements in inches</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              aria-label="Close size guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isTops ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-bold">
                    <th className="py-2.5 px-3 rounded-l-lg">Size</th>
                    <th className="py-2.5 px-3">Chest (in)</th>
                    <th className="py-2.5 px-3">Length (in)</th>
                    <th className="py-2.5 px-3 rounded-r-lg">Shoulder (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-brand-900">S (Small)</td>
                    <td className="py-2.5 px-3 text-gray-600">38 - 39</td>
                    <td className="py-2.5 px-3 text-gray-600">27.5</td>
                    <td className="py-2.5 px-3 text-gray-600">17.5</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="py-2.5 px-3 font-bold text-brand-900">M (Medium)</td>
                    <td className="py-2.5 px-3 text-gray-600">40 - 41</td>
                    <td className="py-2.5 px-3 text-gray-600">28.5</td>
                    <td className="py-2.5 px-3 text-gray-600">18.5</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-brand-900">L (Large)</td>
                    <td className="py-2.5 px-3 text-gray-600">42 - 43</td>
                    <td className="py-2.5 px-3 text-gray-600">29.5</td>
                    <td className="py-2.5 px-3 text-gray-600">19.5</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="py-2.5 px-3 font-bold text-brand-900">XL (X-Large)</td>
                    <td className="py-2.5 px-3 text-gray-600">44 - 45</td>
                    <td className="py-2.5 px-3 text-gray-600">30.5</td>
                    <td className="py-2.5 px-3 text-gray-600">20.5</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-brand-900">XXL (2X-Large)</td>
                    <td className="py-2.5 px-3 text-gray-600">46 - 48</td>
                    <td className="py-2.5 px-3 text-gray-600">31.5</td>
                    <td className="py-2.5 px-3 text-gray-600">21.5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-bold">
                    <th className="py-2.5 px-3 rounded-l-lg">Size</th>
                    <th className="py-2.5 px-3">Waist (in)</th>
                    <th className="py-2.5 px-3">Hip (in)</th>
                    <th className="py-2.5 px-3 rounded-r-lg">Inseam (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-brand-900">S (28-30)</td>
                    <td className="py-2.5 px-3 text-gray-600">28 - 30</td>
                    <td className="py-2.5 px-3 text-gray-600">38</td>
                    <td className="py-2.5 px-3 text-gray-600">30</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="py-2.5 px-3 font-bold text-brand-900">M (32)</td>
                    <td className="py-2.5 px-3 text-gray-600">32 - 33</td>
                    <td className="py-2.5 px-3 text-gray-600">40</td>
                    <td className="py-2.5 px-3 text-gray-600">31</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-brand-900">L (34)</td>
                    <td className="py-2.5 px-3 text-gray-600">34 - 35</td>
                    <td className="py-2.5 px-3 text-gray-600">42</td>
                    <td className="py-2.5 px-3 text-gray-600">32</td>
                  </tr>
                  <tr className="bg-gray-50/50">
                    <td className="py-2.5 px-3 font-bold text-brand-900">XL (36)</td>
                    <td className="py-2.5 px-3 text-gray-600">36 - 37</td>
                    <td className="py-2.5 px-3 text-gray-600">44</td>
                    <td className="py-2.5 px-3 text-gray-600">32</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-brand-900">XXL (38)</td>
                    <td className="py-2.5 px-3 text-gray-600">38 - 40</td>
                    <td className="py-2.5 px-3 text-gray-600">46</td>
                    <td className="py-2.5 px-3 text-gray-600">32.5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-5 p-3.5 bg-brand-50 rounded-2xl text-[11px] text-gray-600 space-y-1">
            <div className="font-bold text-gray-800">💡 Fit Recommendation:</div>
            <div>
              If you prefer a relaxed or streetwear oversized drape, we suggest choosing one size
              larger than your standard body fit.
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full mt-6 bg-brand-900 text-white font-bold py-2.5 rounded-xl text-xs hover:bg-brand-800 transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}

