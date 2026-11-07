'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, ProductColor, ProductSize } from '@/types';
import { calculateOrderSummary, OrderBreakdown } from '@/lib/whatsapp';

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product,
    selectedSize: ProductSize,
    selectedColor: ProductColor,
    quantity?: number
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  totalItemCount: number;
  summary: OrderBreakdown;
  isInitialized: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'mens_fashion_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse cart items from localStorage', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Sync cart to localStorage whenever items change
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save cart to localStorage', e);
      }
    }
  }, [items, isInitialized]);

  const addToCart = (
    product: Product,
    selectedSize: ProductSize,
    selectedColor: ProductColor,
    quantity: number = 1
  ) => {
    const itemId = `${product.id}-${selectedSize}-${selectedColor.name}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === itemId);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prevItems,
        {
          id: itemId,
          product,
          selectedSize,
          selectedColor,
          quantity,
        },
      ];
    });

    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const summary = calculateOrderSummary(items);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        totalItemCount,
        summary,
        isInitialized,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

