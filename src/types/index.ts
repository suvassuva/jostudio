export type ProductCategory =
  | 'T-Shirts'
  | 'Shirts'
  | 'Jeans'
  | 'Trousers'
  | 'Casual Wear'
  | 'Formal Wear'
  | 'Hoodies'
  | 'Jackets'
  | 'Shorts';

export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  description: string;
  details?: string[];
  fabric?: string;
  fit?: string;
  pattern?: string;
  images: string[];
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  availableSizes: ProductSize[];
  availableColors: ProductColor[];
  rating: number;
  reviewCount: number;
  isTrending: boolean;
  isNewArrival: boolean;
  isBestSeller?: boolean;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export interface CartItem {
  id: string; // unique item id composed of product.id + size + color
  product: Product;
  selectedSize: ProductSize;
  selectedColor: ProductColor;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  houseNumber: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  instructions?: string;
}

export interface FilterState {
  category: string;
  sizes: ProductSize[];
  minPrice: number;
  maxPrice: number;
  colors: string[];
  sortBy: 'popularity' | 'price_asc' | 'price_desc' | 'newest' | 'discount';
}

