import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { productById } from '../data/products'

const CartContext = createContext(null)
const STORAGE_KEY = 'shoplite-cart-v1'
const FREE_SHIPPING_AT = 75
const SHIPPING_FLAT = 4.99
const TAX_RATE = 0.0825

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (i) => i && typeof i.id === 'string' && productById[i.id] && Number.isFinite(i.qty) && i.qty > 0
    )
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // storage full or unavailable — cart just won't persist
    }
  }, [items])

  const addItem = (id, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === id)
      if (found) {
        return prev.map((i) => (i.id === id ? { ...i, qty: Math.min(i.qty + qty, 99) } : i))
      }
      return [...prev, { id, qty: Math.min(qty, 99) }]
    })
  }

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))

  const setQty = (id, qty) => {
    if (qty <= 0) return removeItem(id)
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.min(qty, 99) } : i)))
  }

  const clearCart = () => setItems([])

  const { lines, count, subtotal } = useMemo(() => {
    const lines = items.map((i) => {
      const product = productById[i.id]
      return { ...product, qty: i.qty, lineTotal: product.price * i.qty }
    })
    const count = items.reduce((n, i) => n + i.qty, 0)
    const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0)
    return { lines, count, subtotal }
  }, [items])

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FLAT
  const tax = subtotal * TAX_RATE
  const total = subtotal + shipping + tax

  const value = {
    items,
    lines,
    count,
    subtotal,
    shipping,
    tax,
    total,
    addItem,
    removeItem,
    setQty,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
