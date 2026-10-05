import { useMemo, useState } from 'react'
import { CATEGORIES, products } from '../data/products'
import ProductCard from './ProductCard'

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'rating', label: 'Top rated' },
]

export default function ProductGrid({ onSelect }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('featured')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = products.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.includes(q)
      const matchesCategory = category === 'all' || p.category === category
      return matchesQuery && matchesCategory
    })
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }
    return list
  }, [query, category, sort])

  return (
    <section className="shop">
      <div className="shop-head">
        <div>
          <h1>Shop everything</h1>
          <p className="muted">{visible.length} product{visible.length === 1 ? '' : 's'}</p>
        </div>
      </div>

      <div className="toolbar">
        <input
          className="search"
          type="search"
          placeholder="Search products…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="pills">
          <button
            className={`pill ${category === 'all' ? 'pill-active' : ''}`}
            onClick={() => setCategory('all')}
          >
            All
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`pill ${category === c ? 'pill-active' : ''}`}
              onClick={() => setCategory(c)}
            >
              {c[0].toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
        <select className="sort" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
          {SORTS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <div className="empty">
          <h2>No matches</h2>
          <p className="muted">Try a different search term or category.</p>
        </div>
      ) : (
        <div className="grid">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} onSelect={onSelect} />
          ))}
        </div>
      )}
    </section>
  )
}
