import { useCart } from '../context/CartContext'
import { initials } from '../data/products'

export default function CartDrawer({ open, onClose, onCheckout }) {
  const { lines, count, subtotal, setQty, removeItem } = useCart()

  return (
    <>
      <div className={`overlay ${open ? 'overlay-open' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'drawer-open' : ''}`} aria-hidden={!open}>
        <div className="drawer-head">
          <h2>Cart {count > 0 && <span className="muted">({count})</span>}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close cart">×</button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer-empty">
            <p className="muted">Your cart is empty.</p>
            <button className="btn btn-primary" onClick={onClose}>Browse products</button>
          </div>
        ) : (
          <>
            <ul className="drawer-items">
              {lines.map((l) => (
                <li key={l.id} className="drawer-item">
                  <div className="drawer-thumb" style={{ background: `linear-gradient(135deg, ${l.color}, #111827)` }}>
                    {initials(l.name)}
                  </div>
                  <div className="drawer-item-info">
                    <div className="drawer-item-name">{l.name}</div>
                    <div className="muted small">${l.price.toFixed(2)} each</div>
                    <div className="qty-stepper qty-sm">
                      <button onClick={() => setQty(l.id, l.qty - 1)} aria-label="Decrease quantity">−</button>
                      <span>{l.qty}</span>
                      <button onClick={() => setQty(l.id, l.qty + 1)} aria-label="Increase quantity">+</button>
                    </div>
                  </div>
                  <div className="drawer-item-right">
                    <div className="price">${l.lineTotal.toFixed(2)}</div>
                    <button className="link-danger" onClick={() => removeItem(l.id)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="drawer-foot">
              <div className="row-between">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <p className="muted small">Shipping and tax calculated at checkout.</p>
              <button className="btn btn-primary btn-block" onClick={onCheckout}>
                Checkout
              </button>
              <button className="btn btn-ghost btn-block" onClick={onClose}>
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
