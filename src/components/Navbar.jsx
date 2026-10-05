import { useCart } from '../context/CartContext'

export default function Navbar({ onShop, onCartOpen }) {
  const { count } = useCart()

  return (
    <header className="navbar">
      <div className="nav-inner">
        <button className="brand" onClick={onShop}>
          <span className="brand-mark">S</span>
          <span className="brand-name">Shoplite</span>
        </button>
        <nav className="nav-links">
          <button className="nav-link active" onClick={onShop}>
            Shop
          </button>
        </nav>
        <button className="cart-button" onClick={onCartOpen} aria-label="Open cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span>Cart</span>
          {count > 0 && <span className="cart-badge">{count}</span>}
        </button>
      </div>
    </header>
  )
}
