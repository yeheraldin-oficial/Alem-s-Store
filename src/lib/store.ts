'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  qty: number
  size: string
  stock: number
}

interface CartState {
  items: CartItem[]
  couponCode: string | null
  discount: number
  couponInfo: { code: string; description: string } | null
  add: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  remove: (id: string, size: string) => void
  setQty: (id: string, size: string, qty: number) => void
  clear: () => void
  setCoupon: (code: string | null, discount: number, info: { code: string; description: string } | null) => void
  subtotal: () => number
  total: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discount: 0,
      couponInfo: null,
      add: (item, qty = 1) => {
        const items = get().items
        const existing = items.find((i) => i.id === item.id && i.size === item.size)
        if (existing) {
          const newQty = Math.min(existing.qty + qty, item.stock)
          set({
            items: items.map((i) =>
              i.id === item.id && i.size === item.size ? { ...i, qty: newQty } : i
            ),
          })
        } else {
          set({ items: [...items, { ...item, qty: Math.min(qty, item.stock) }] })
        }
      },
      remove: (id, size) =>
        set({ items: get().items.filter((i) => !(i.id === id && i.size === size)) }),
      setQty: (id, size, qty) =>
        set({
          items: get()
            .items.map((i) =>
              i.id === id && i.size === size
                ? { ...i, qty: Math.max(0, Math.min(qty, i.stock)) }
                : i
            )
            .filter((i) => i.qty > 0),
        }),
      clear: () => set({ items: [], couponCode: null, discount: 0, couponInfo: null }),
      setCoupon: (code, discount, info) =>
        set({ couponCode: code, discount, couponInfo: info }),
      subtotal: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
      total: () => {
        const sub = get().items.reduce((s, i) => s + i.price * i.qty, 0)
        return Math.max(0, sub - get().discount)
      },
    }),
    { name: 'pequeno-sol-cart' }
  )
)
