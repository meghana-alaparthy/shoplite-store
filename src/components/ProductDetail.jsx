import { useState } from 'react'
import { productById } from '../data/products'
import { useCart } from '../context/CartContext'
import { ProductTile } from './ProductCard'

export default function ProductDetail({ productId, onBack, onCartOpen }) {
  const product = productById[productId]
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="empty">
        <h2>Product not found</h2>
        <button className="btn btn-secondary" onClick={onBack}>Back to shop</button>
      </div>
    )
  }

  const handleAdd = () => {
    addItem(product.id, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <section className="detail">
      <button className="back-link" onClick={onBack}>← Back to shop</button>
      <div className="detail-grid">
        <ProductTile product={product} size="lg" />
        <div className="detail-info">
          <div className="card-category">{product.category}</div>
          <h1>{product.name}</h1>
          <div className="card-meta">
            <span className="rating">
              <span className="star">★</span> {product.rating.toFixed(1)}
            </span>
            <span className="reviews">{product.reviews.toLocaleString()} reviews</span>
            {product.tag && <span className="tag">{product.tag}</span>}
          </div>
          <p className="price-lg">${product.price.toFixed(2)}</p>
          <p className="detail-desc">{product.description}</p>
          <div className="detail-actions">
            <div className="qty-stepper">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="Increase quantity">+</button>
            </div>
            <button className="btn btn-primary" onClick={handleAdd}>
              {added ? 'Added to cart' : 'Add to cart'}
            </button>
            <button className="btn btn-secondary" onClick={onCartOpen}>
              View cart
            </button>
          </div>
          <p className="muted small">Free shipping on orders over $75. 30-day returns.</p>
        </div>
      </div>
    </section>
  )
}
