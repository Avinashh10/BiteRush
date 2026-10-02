"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { getCartSnapshot, getServerCartSnapshot, loadCartItems, parseCartItems, saveCartItems, subscribeToCartStorage } from "@/lib/storage";
import type { CartItem, FoodItem } from "@/types";

interface CartContextValue {
  cartItems: CartItem[];
  cartItemCount: number;
  cartTotal: number;
  hasHydrated: boolean;
  addToCart: (foodItem: FoodItem) => void;
  removeFromCart: (foodItemId: string) => void;
  increaseQuantity: (foodItemId: string) => void;
  decreaseQuantity: (foodItemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);
const subscribeToHydration = () => () => undefined;
const getClientHydrationSnapshot = () => true;
const getServerHydrationSnapshot = () => false;

export function CartProvider({ children }: { children: ReactNode }) {
  const cartSnapshot = useSyncExternalStore(subscribeToCartStorage, getCartSnapshot, getServerCartSnapshot);
  const hasHydrated = useSyncExternalStore(subscribeToHydration, getClientHydrationSnapshot, getServerHydrationSnapshot);
  const cartItems = useMemo(() => parseCartItems(cartSnapshot), [cartSnapshot]);

  const addToCart = useCallback((foodItem: FoodItem) => {
    const items = loadCartItems();
    const existingItem = items.find((item) => item.foodItem.id === foodItem.id);
    const nextItems = existingItem
      ? items.map((item) => item.foodItem.id === foodItem.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...items, { foodItem, quantity: 1 }];
    saveCartItems(nextItems);
  }, []);

  const removeFromCart = useCallback((foodItemId: string) => {
    saveCartItems(loadCartItems().filter((item) => item.foodItem.id !== foodItemId));
  }, []);

  const increaseQuantity = useCallback((foodItemId: string) => {
    saveCartItems(loadCartItems().map((item) =>
      item.foodItem.id === foodItemId ? { ...item, quantity: item.quantity + 1 } : item,
    ));
  }, []);

  const decreaseQuantity = useCallback((foodItemId: string) => {
    saveCartItems(loadCartItems().flatMap((item) => {
      if (item.foodItem.id !== foodItemId) return [item];
      return item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : [];
    }));
  }, []);

  const clearCart = useCallback(() => saveCartItems([]), []);

  const value = useMemo<CartContextValue>(() => ({
    cartItems,
    cartItemCount: cartItems.reduce((count, item) => count + item.quantity, 0),
    cartTotal: cartItems.reduce((total, item) => total + item.foodItem.price * item.quantity, 0),
    hasHydrated,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  }), [cartItems, hasHydrated, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
