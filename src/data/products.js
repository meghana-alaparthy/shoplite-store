// Product catalog. Static data bundled with the app — no backend.
export const CATEGORIES = ['audio', 'home', 'fitness', 'accessories']

export const products = [
  {
    id: 'aria-headphones',
    name: 'Aria Wireless Headphones',
    price: 129.99,
    category: 'audio',
    rating: 4.7,
    reviews: 2314,
    color: '#312e81',
    tag: 'Bestseller',
    description:
      'Over-ear headphones with active noise cancellation, 40-hour battery life, and memory-foam earcups. Folds flat for travel and pairs with two devices at once.',
  },
  {
    id: 'pulse-earbuds',
    name: 'Pulse True-Wireless Earbuds',
    price: 59.99,
    category: 'audio',
    rating: 4.5,
    reviews: 1876,
    color: '#0f766e',
    tag: null,
    description:
      'Compact earbuds with punchy bass, wireless charging case, and IPX5 water resistance. Up to 28 hours of total playtime with the case.',
  },
  {
    id: 'ember-speaker',
    name: 'Ember Smart Speaker',
    price: 89.99,
    category: 'audio',
    rating: 4.4,
    reviews: 942,
    color: '#9a3412',
    tag: 'New',
    description:
      'Room-filling 360-degree sound with a built-in voice assistant. Multi-room pairing lets you link several speakers for the whole house.',
  },
  {
    id: 'lumen-desk-lamp',
    name: 'Lumen Desk Lamp',
    price: 45.0,
    category: 'home',
    rating: 4.6,
    reviews: 1204,
    color: '#a16207',
    tag: null,
    description:
      'Adjustable LED desk lamp with five color temperatures and stepless dimming. The weighted base keeps it steady and the arm stays where you put it.',
  },
  {
    id: 'drift-mug-set',
    name: 'Drift Ceramic Mug Set',
    price: 32.5,
    category: 'home',
    rating: 4.8,
    reviews: 688,
    color: '#1e3a8a',
    tag: null,
    description:
      'Set of four 12oz stoneware mugs with a matte glaze. Dishwasher and microwave safe, with a comfortable handle that actually fits four fingers.',
  },
  {
    id: 'haven-throw',
    name: 'Haven Throw Blanket',
    price: 68.0,
    category: 'home',
    rating: 4.9,
    reviews: 1573,
    color: '#7c2d12',
    tag: 'Bestseller',
    description:
      'Chunky-knit throw in a soft cotton blend. Warm without being heavy, and it washes well without pilling. Sized for the couch, 50 x 60 inches.',
  },
  {
    id: 'stride-yoga-mat',
    name: 'Stride Yoga Mat',
    price: 38.0,
    category: 'fitness',
    rating: 4.6,
    reviews: 2109,
    color: '#166534',
    tag: null,
    description:
      '6mm non-slip mat with alignment lines etched in. Grippy on both sides, wipes clean, and comes with a carry strap. Free of PVC and latex.',
  },
  {
    id: 'forge-dumbbell',
    name: 'Forge Adjustable Dumbbell',
    price: 149.0,
    category: 'fitness',
    rating: 4.7,
    reviews: 834,
    color: '#3f3f46',
    tag: null,
    description:
      'One dumbbell replaces nine — twist the handle to dial from 5 to 52.5 lbs. Compact tray storage and knurled steel grip.',
  },
  {
    id: 'tempo-jump-rope',
    name: 'Tempo Jump Rope',
    price: 18.99,
    category: 'fitness',
    rating: 4.3,
    reviews: 517,
    color: '#be123c',
    tag: null,
    description:
      'Ball-bearing speed rope with adjustable coated cable and foam handles. A solid cardio tool that packs flat in a gym bag.',
  },
  {
    id: 'atlas-backpack',
    name: 'Atlas Canvas Backpack',
    price: 74.0,
    category: 'accessories',
    rating: 4.8,
    reviews: 1932,
    color: '#44403c',
    tag: 'Bestseller',
    description:
      'Waxed canvas daypack with a padded 16-inch laptop sleeve, water-repellent finish, and solid brass hardware. Built to age well.',
  },
  {
    id: 'nomad-wallet',
    name: 'Nomad Leather Wallet',
    price: 42.0,
    category: 'accessories',
    rating: 4.6,
    reviews: 1108,
    color: '#713f12',
    tag: null,
    description:
      'Slim bifold in full-grain leather that holds six cards plus cash without bulking up. RFID-blocking lining and hand-stitched edges.',
  },
  {
    id: 'circuit-bottle',
    name: 'Circuit Steel Bottle',
    price: 28.0,
    category: 'accessories',
    rating: 4.5,
    reviews: 2741,
    color: '#155e75',
    tag: null,
    description:
      '26oz vacuum-insulated stainless bottle. Keeps drinks cold for 24 hours or hot for 12. Fits standard cup holders and bike cages.',
  },
]

export const productById = Object.fromEntries(products.map((p) => [p.id, p]))

export function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}
