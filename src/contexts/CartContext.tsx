'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product, ProductColor } from '@/types/product';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, selectedColor: ProductColor, quantity: number, selectedSize?: string) => void;
  removeFromCart: (productId: string, colorHex: string) => void;
  updateQuantity: (productId: string, colorHex: string, newQuantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'glowify-cart';
const MAX_QUANTITY = 99;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setItems(parsedCart);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
        // Check if localStorage is full
        if (error instanceof DOMException && error.code === 22) {
          alert('Cart storage limit exceeded. Please remove some items.');
        }
      }
    }
  }, [items, isInitialized]);

  const addToCart = (
    product: Product,
    selectedColor: ProductColor,
    quantity: number,
    selectedSize?: string
  ) => {
    setItems((currentItems) => {
      // Check if item already exists in cart (same product, color, and size)
      const existingItemIndex = currentItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.hex === selectedColor.hex &&
          item.selectedSize === selectedSize
      );

      if (existingItemIndex !== -1) {
        // Item exists - increase quantity
        const updatedItems = [...currentItems];
        const newQuantity = Math.min(
          updatedItems[existingItemIndex].quantity + quantity,
          MAX_QUANTITY
        );
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: newQuantity,
        };
        return updatedItems;
      } else {
        // Item doesn't exist - add new item
        const newItem: CartItem = {
          product,
          selectedColor,
          quantity: Math.min(quantity, MAX_QUANTITY),
          selectedSize,
        };
        return [...currentItems, newItem];
      }
    });
  };

  const removeFromCart = (productId: string, colorHex: string) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(item.product.id === productId && item.selectedColor.hex === colorHex)
      )
    );
  };

  const updateQuantity = (productId: string, colorHex: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      // Remove item if quantity is 0 or negative
      removeFromCart(productId, colorHex);
      return;
    }

    setItems((currentItems) => {
      const itemIndex = currentItems.findIndex(
        (item) =>
          item.product.id === productId && item.selectedColor.hex === colorHex
      );

      if (itemIndex !== -1) {
        const updatedItems = [...currentItems];
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          quantity: Math.min(newQuantity, MAX_QUANTITY),
        };
        return updatedItems;
      }

      return currentItems;
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = (): number => {
    return items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  const getCartCount = (): number => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
