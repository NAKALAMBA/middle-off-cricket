import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  subtotal: () => number;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item, qty = 1) => {
        const items = [...get().items];
        const idx = items.findIndex((i) => i.productId === item.productId);
        if (idx >= 0) {
          items[idx] = { ...items[idx], quantity: items[idx].quantity + qty };
        } else {
          items.push({ ...item, quantity: qty });
        }
        set({ items });
      },
      remove: (id) => set({ items: get().items.filter((i) => i.productId !== id) }),
      setQty: (id, qty) =>
        set({
          items: get().items.map((i) =>
            i.productId === id ? { ...i, quantity: Math.max(1, qty) } : i,
          ),
        }),
      clear: () => set({ items: [] }),
      subtotal: () => get().items.reduce((s, i) => s + i.unitPrice * i.quantity, 0),
      count: () => get().items.reduce((s, i) => s + i.quantity, 0),
    }),
    { name: "middle-off-cart" },
  ),
);
