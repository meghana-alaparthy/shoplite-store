import { useState } from 'react'
import { useCart } from '../context/CartContext'

const FIELDS = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  zip: '',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
}

function validate(values) {
  const errors = {}
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email address.'
  if (!values.firstName.trim()) errors.firstName = 'Required.'
  if (!values.lastName.trim()) errors.lastName = 'Required.'
  if (!values.address.trim()) errors.address = 'Required.'
  if (!values.city.trim()) errors.city = 'Required.'
  if (!/^\d{5}(-\d{4})?$/.test(values.zip.trim())) errors.zip = 'Enter a valid ZIP code.'
  if (!values.cardName.trim()) errors.cardName = 'Required.'
  const digits = values.cardNumber.replace(/\D/g, '')
  if (digits.length !== 16) errors.cardNumber = 'Card number must be 16 digits.'
  const m = values.expiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/)
  if (!m) {
    errors.expiry = 'Use MM/YY.'
  } else {
    const exp = new Date(2000 + Number(m[2]), Number(m[1]), 0)
    if (exp < new Date()) errors.expiry = 'Card is expired.'
  }
  if (!/^\d{3,4}$/.test(values.cvc.trim())) errors.cvc = '3–4 digits.'
  return errors
}

function Field({ label, error, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {error && <span className="field-error">{error}</span>}
    </label>
  )
}

export default function CheckoutForm({ onBack, onPlaceOrder }) {
  const { lines, subtotal, shipping, tax, total } = useCart()
  const [values, setValues] = useState(FIELDS)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState(false)

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    setTouched(true)
    if (Object.keys(errs).length === 0) {
      onPlaceOrder({ email: values.email.trim(), name: `${values.firstName.trim()} ${values.lastName.trim()}` })
    } else {
      window.scrollTo(0, 0)
    }
  }

  const err = (key) => (touched ? errors[key] : undefined)

  return (
    <section className="checkout">
      <button className="back-link" onClick={onBack}>← Back to shop</button>
      <h1>Checkout</h1>
      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={submit} noValidate>
          <h2>Contact</h2>
          <Field label="Email" error={err('email')}>
            <input type="email" value={values.email} onChange={set('email')} placeholder="you@example.com" />
          </Field>

          <h2>Shipping address</h2>
          <div className="field-row">
            <Field label="First name" error={err('firstName')}>
              <input value={values.firstName} onChange={set('firstName')} placeholder="Jane" />
            </Field>
            <Field label="Last name" error={err('lastName')}>
              <input value={values.lastName} onChange={set('lastName')} placeholder="Doe" />
            </Field>
          </div>
          <Field label="Street address" error={err('address')}>
            <input value={values.address} onChange={set('address')} placeholder="123 Main St, Apt 4" />
          </Field>
          <div className="field-row">
            <Field label="City" error={err('city')}>
              <input value={values.city} onChange={set('city')} placeholder="Dallas" />
            </Field>
            <Field label="ZIP code" error={err('zip')}>
              <input value={values.zip} onChange={set('zip')} placeholder="75201" inputMode="numeric" />
            </Field>
          </div>

          <h2>Payment</h2>
          <p className="muted small">Demo checkout — no real payment is processed.</p>
          <Field label="Name on card" error={err('cardName')}>
            <input value={values.cardName} onChange={set('cardName')} placeholder="Jane Doe" />
          </Field>
          <Field label="Card number" error={err('cardNumber')}>
            <input value={values.cardNumber} onChange={set('cardNumber')} placeholder="4242 4242 4242 4242" inputMode="numeric" />
          </Field>
          <div className="field-row">
            <Field label="Expiry (MM/YY)" error={err('expiry')}>
              <input value={values.expiry} onChange={set('expiry')} placeholder="08/28" inputMode="numeric" />
            </Field>
            <Field label="CVC" error={err('cvc')}>
              <input value={values.cvc} onChange={set('cvc')} placeholder="123" inputMode="numeric" />
            </Field>
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg">
            Place order — ${total.toFixed(2)}
          </button>
        </form>

        <aside className="summary">
          <h2>Order summary</h2>
          <ul className="summary-items">
            {lines.map((l) => (
              <li key={l.id} className="row-between">
                <span>{l.name} <span className="muted">× {l.qty}</span></span>
                <span>${l.lineTotal.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="summary-totals">
            <div className="row-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="row-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
            <div className="row-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="row-between total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
        </aside>
      </div>
    </section>
  )
}
