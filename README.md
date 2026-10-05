# Shoplite Store

A small e-commerce storefront built with React. I wanted a project that covers the full
"browse to buy" flow you see in real shops — product listing, search and filtering,
a cart that sticks around, and a checkout form with actual validation — without dragging
in a backend. Everything runs in the browser.

## Features

- Product catalog with 12 items across audio, home, fitness, and accessories
- Search by name/description, filter by category, sort by price or rating
- Product detail pages with quantity picker
- Slide-over cart with quantity controls and line totals
- Checkout form with field-level validation (email, ZIP, card number, expiry, CVC)
- Mock order confirmation with a generated order number
- Cart persists in localStorage, so it survives a page reload
- Free shipping over $75, flat 8.25% tax, responsive layout

## Quickstart

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build
```

## Project structure

```
src/
  main.jsx              # React entry point
  App.jsx               # view routing: shop / product / checkout / confirmation
  index.css             # all styling, plain CSS
  data/products.js      # static product catalog (12 products)
  context/CartContext.jsx  # cart state, totals, localStorage persistence
  components/
    Navbar.jsx          # header with cart badge
    ProductCard.jsx     # card + colored product tile
    ProductGrid.jsx     # search, category filter, sort
    ProductDetail.jsx   # full product view with quantity picker
    CartDrawer.jsx      # slide-over cart
    CheckoutForm.jsx    # shipping/payment form with validation
    OrderConfirmation.jsx  # mock confirmation with order number
```

## How the cart works

`CartContext` holds the cart as a list of `{ id, qty }` pairs and exposes helpers
(`addItem`, `removeItem`, `setQty`, `clearCart`) plus derived values (`lines`,
`count`, `subtotal`, `shipping`, `tax`, `total`). It loads the initial state from
`localStorage` and writes back on every change, so the cart survives reloads.
Stale entries (e.g. a product id that no longer exists) are filtered out on load.

Checkout doesn't process payments — it's a demo. Submitting the form validates the
inputs, generates an order number like `SL-2026-X7K2P9`, snapshots the cart lines,
and clears the cart.

## Tech stack

- React 18 + Vite 5
- Plain CSS (no UI library)
- No backend, no external image assets — product tiles are CSS gradients with initials

## License

MIT — see [LICENSE](LICENSE).
