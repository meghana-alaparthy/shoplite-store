export default function OrderConfirmation({ order, onShop }) {
  if (!order) return null

  return (
    <section className="confirmation">
      <div className="confirm-card">
        <div className="confirm-check">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1>Order confirmed</h1>
        <p className="muted">
          Thanks, {order.name}. A receipt was sent to <strong>{order.email}</strong>.
        </p>
        <div className="order-number">
          <span className="muted small">Order number</span>
          <strong>{order.number}</strong>
        </div>
        <ul className="summary-items">
          {order.lines.map((l) => (
            <li key={l.id} className="row-between">
              <span>{l.name} <span className="muted">× {l.qty}</span></span>
              <span>${l.lineTotal.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="row-between total">
          <span>Charged total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
        <button className="btn btn-primary btn-block" onClick={onShop}>
          Continue shopping
        </button>
      </div>
    </section>
  )
}
