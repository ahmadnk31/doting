import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  image: string;
  price: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  toggleCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addToCart: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id);
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        }
        return { items: [...state.items, { ...item, quantity: 1 }] };
      }),
      removeFromCart: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: quantity } : i
        ),
      })),
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: 'cart-storage',
    }
  )
)
