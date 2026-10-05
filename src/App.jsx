import { useState } from 'react'
import { CartProvider, useCart } from './context/CartContext'
import Navbar from './components/Navbar'
import ProductGrid from './components/ProductGrid'
import ProductDetail from './components/ProductDetail'
import CartDrawer from './components/CartDrawer'
import CheckoutForm from './components/CheckoutForm'
import OrderConfirmation from './components/OrderConfirmation'

function makeOrderNumber() {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `SL-${new Date().getFullYear()}-${rand}`
}

function Store() {
  const [view, setView] = useState('shop') // shop | product | checkout | confirmation
  const [selectedId, setSelectedId] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [order, setOrder] = useState(null)
  const { lines, total, clearCart } = useCart()

  const scrollTop = () => window.scrollTo(0, 0)

  const goShop = () => {
    setSelectedId(null)
    setView('shop')
    scrollTop()
  }

  const goProduct = (id) => {
    setSelectedId(id)
    setView('product')
    scrollTop()
  }

  const goCheckout = () => {
    setCartOpen(false)
    setView('checkout')
    scrollTop()
  }

  const placeOrder = ({ email, name }) => {
    setOrder({
      number: makeOrderNumber(),
      email,
      name,
      lines,
      total,
      placedAt: new Date().toISOString(),
    })
    clearCart()
    setView('confirmation')
    scrollTop()
  }

  return (
    <div className="app">
      <Navbar onShop={goShop} onCartOpen={() => setCartOpen(true)} />
      <main className="container">
        {view === 'shop' && <ProductGrid onSelect={goProduct} />}
        {view === 'product' && (
          <ProductDetail productId={selectedId} onBack={goShop} onCartOpen={() => setCartOpen(true)} />
        )}
        {view === 'checkout' && <CheckoutForm onBack={goShop} onPlaceOrder={placeOrder} />}
        {view === 'confirmation' && <OrderConfirmation order={order} onShop={goShop} />}
      </main>
      <footer className="footer">
        <div className="container">
          <span className="muted small">Shoplite — a demo storefront. No real orders are processed.</span>
        </div>
      </footer>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onCheckout={goCheckout} />
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <Store />
    </CartProvider>
  )
}
