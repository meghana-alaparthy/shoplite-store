import { initials } from '../data/products'
import { useCart } from '../context/CartContext'

export function ProductTile({ product, size = 'md' }) {
  return (
    <div className={`tile tile-${size}`} style={{ background: `linear-gradient(135deg, ${product.color}, #111827)` }}>
      <span className="tile-initials">{initials(product.name)}</span>
      {product.tag && <span className="tile-tag">{product.tag}</span>}
    </div>
  )
}

export default function ProductCard({ product, onSelect }) {
  const { addItem } = useCart()

  return (
    <article className="card">
      <button className="card-media" onClick={() => onSelect(product.id)} aria-label={`View ${product.name}`}>
        <ProductTile product={product} />
      </button>
      <div className="card-body">
        <div className="card-category">{product.category}</div>
        <button className="card-title" onClick={() => onSelect(product.id)}>
          {product.name}
        </button>
        <div className="card-meta">
          <span className="rating">
            <span className="star">★</span> {product.rating.toFixed(1)}
          </span>
          <span className="reviews">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="card-foot">
          <span className="price">${product.price.toFixed(2)}</span>
          <button className="btn btn-primary btn-sm" onClick={() => addItem(product.id, 1)}>
            Add
          </button>
        </div>
      </div>
    </article>
  )
}
