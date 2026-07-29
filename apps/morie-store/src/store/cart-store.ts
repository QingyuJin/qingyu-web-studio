"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

export type CartItem = {
  key: string;
  slug: string;
  name: string;
  englishName: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, size: string, price: number, quantity?: number) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      hydrated: false,
      setHydrated: (value) => set({ hydrated: value }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      addItem: (product, size, price, quantity = 1) =>
        set((state) => {
          const key = `${product.slug}-${size}`;
          const existing = state.items.find((item) => item.key === key);
          const items = existing
            ? state.items.map((item) =>
                item.key === key ? { ...item, quantity: item.quantity + quantity } : item,
              )
            : [
                ...state.items,
                {
                  key,
                  slug: product.slug,
                  name: product.name,
                  englishName: product.englishName,
                  size,
                  price,
                  image: product.image,
                  quantity,
                },
              ];
          return { items, isOpen: true };
        }),
      updateQuantity: (key, quantity) =>
        set((state) => ({
          items: quantity < 1 ? state.items.filter((item) => item.key !== key) : state.items.map((item) => (item.key === key ? { ...item, quantity } : item)),
        })),
      removeItem: (key) => set((state) => ({ items: state.items.filter((item) => item.key !== key) })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "morie-cart",
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
    },
  ),
);
