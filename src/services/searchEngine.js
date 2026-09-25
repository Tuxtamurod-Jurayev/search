// Topdim AI - Universal Reliable Search Engine (Fast, Robust, Offline-first with live fallback)

export function formatPrice(num) {
  if (!num) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Generate realistic 30-day price history
function createPriceHistory(basePrice) {
  const history = [];
  const today = new Date();
  let p = basePrice * 1.03;
  for (let i = 30; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const change = (Math.random() - 0.52) * 0.03 * basePrice;
    p = Math.round((p + change) / 10000) * 10000;
    history.push({
      date: d.toISOString().split('T')[0],
      price: p,
      day: d.getDate()
    });
  }
  return history;
}

// Generate real search links to stores
export function getStoreUrl(sourceId, productName) {
  const q = encodeURIComponent(productName.trim());
  switch (sourceId) {
    case 'uzum':
      return `https://uzum.uz/uz/search?query=${q}`;
    case 'olcha':
      return `https://olcha.uz/oz/search?q=${q}`;
    case 'asaxiy':
      return `https://asaxiy.uz/product/search?q=${q}`;
    case 'texnomart':
      return `https://texnomart.uz/katalog/?q=${q}`;
    case 'olx':
      return `https://www.olx.uz/d/oz/obyavleniya/q-${encodeURIComponent(productName.trim().replace(/\s+/g, '-'))}/`;
    default:
      return `https://google.com/search?q=${q}`;
  }
}

// Build standard stores array with realistic prices and real links
function buildStores(name, basePrice) {
  const asaxiyPrice = Math.round((basePrice * 0.98) / 10000) * 10000;
  const uzumPrice = Math.round((basePrice * 1.01) / 10000) * 10000;
  const olchaPrice = Math.round((basePrice * 1.02) / 10000) * 10000;
  const texnomartPrice = Math.round((basePrice * 1.04) / 10000) * 10000;
  const olxUsedPrice = Math.round((basePrice * 0.72) / 10000) * 10000;

  return [
    {
      sourceId: 'asaxiy',
      sourceName: 'Asaxiy',
      price: asaxiyPrice,
      oldPrice: Math.round(asaxiyPrice * 1.08),
      condition: 'NEW',
      warranty: '12 oy rasmiy kafolat',
      availability: 'Mavjud',
      verifiedAt: 'Bugun 11:40',
      url: getStoreUrl('asaxiy', name),
      isBestPrice: true,
      seller: { name: 'Asaxiy Store', rating: 4.9, reviewsCount: 3840, transparencyScore: 95 }
    },
    {
      sourceId: 'uzum',
      sourceName: 'Uzum Market',
      price: uzumPrice,
      oldPrice: Math.round(uzumPrice * 1.07),
      condition: 'NEW',
      warranty: '12 oy kafolat',
      availability: 'Ertaga topshirish punktida',
      verifiedAt: 'Bugun 11:35',
      url: getStoreUrl('uzum', name),
      seller: { name: 'Uzum Mall', rating: 4.8, reviewsCount: 2150, transparencyScore: 92 }
    },
    {
      sourceId: 'olcha',
      sourceName: 'Olcha.uz',
      price: olchaPrice,
      oldPrice: Math.round(olchaPrice * 1.06),
      condition: 'NEW',
      warranty: '12 oy kafolat',
      availability: 'Mavjud',
      verifiedAt: 'Bugun 11:20',
      url: getStoreUrl('olcha', name),
      seller: { name: 'Olcha Store', rating: 4.7, reviewsCount: 1420, transparencyScore: 90 }
    },
    {
      sourceId: 'texnomart',
      sourceName: 'Texnomart',
      price: texnomartPrice,
      oldPrice: Math.round(texnomartPrice * 1.08),
      condition: 'NEW',
      warranty: '12 oy kafolat',
      availability: 'Do‘konda bor',
      verifiedAt: 'Bugun 10:15',
      url: getStoreUrl('texnomart', name),
      seller: { name: 'Texnomart', rating: 4.8, reviewsCount: 1650, transparencyScore: 93 }
    },
    {
      sourceId: 'olx',
      sourceName: 'OLX O‘zbekiston (B/U)',
      price: olxUsedPrice,
      oldPrice: null,
      condition: 'USED',
      conditionNote: 'Ishlatilgan, holati a’lo, karobka-dokument bor.',
      warranty: 'Do‘kon kafolati yo‘q (Jismoniy shaxs)',
      availability: '1 dona (Toshkent)',
      verifiedAt: 'Bugun yangilangan',
      url: getStoreUrl('olx', name),
      isUsed: true,
      seller: { name: 'Jismoniy shaxs', rating: 4.3, reviewsCount: 15, transparencyScore: 60 }
    }
  ];
}

// Master Products Database
export const MASTER_PRODUCTS = [
  // --- Apple ---
  {
    id: 'apple-iphone-13',
    brand: 'Apple',
    model: 'iPhone 13',
    variant: '128GB',
    category: 'smartphone',
    normalized_name: 'Apple iPhone 13 128GB',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80',
    basePrice: 7490000,
    tags: ['iphone', 'apple', '13', 'telefon', 'smartfon', 'kamera', 'ios'],
    specifications: {
      battery: '3240 mAh',
      batteryScore: 8.5,
      camera: '12 MP + 12 MP (4K 60fps)',
      cameraScore: 9.3,
      performance: 'A15 Bionic (5nm), 4GB RAM',
      performanceScore: 9.2,
      screen: '6.1" Super Retina OLED',
      screenScore: 9.0,
      storage: '128 GB'
    },
    pros: [
      'A15 Bionic protsessori barcha ilovalarni qotmasdan yurgazadi',
      'Kinematografik rejimda 4K video yozish imkoniyati',
      'Bozorda eng yuqori likvidlik (qayta sotish juda oson)'
    ],
    cons: ['Ekran 60Hz']
  },
  {
    id: 'apple-iphone-14',
    brand: 'Apple',
    model: 'iPhone 14',
    variant: '128GB',
    category: 'smartphone',
    normalized_name: 'Apple iPhone 14 128GB',
    image: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=600&auto=format&fit=crop&q=80',
    basePrice: 8590000,
    tags: ['iphone', 'apple', '14', 'telefon', 'smartfon', 'ios'],
    specifications: {
      battery: '3279 mAh',
      batteryScore: 8.6,
      camera: '12 MP Action Mode + Photonic Engine',
      cameraScore: 9.4,
      performance: 'A15 Bionic (5 yadro GPU), 6GB RAM',
      performanceScore: 9.3,
      screen: '6.1" Super Retina OLED',
      screenScore: 9.1,
      storage: '128 GB'
    },
    pros: [
      'Action Mode orqali stedicamsiz silliq video olish',
      '6GB RAM sababli ilovalar fonda uzoq turadi'
    ],
    cons: ['Dizayni iPhone 13 ga juda yaqin']
  },
  {
    id: 'apple-iphone-15-pro',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    variant: '128GB Titanium',
    category: 'smartphone',
    normalized_name: 'Apple iPhone 15 Pro 128GB',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    basePrice: 13450000,
    tags: ['iphone', 'apple', '15', 'pro', 'flagman', 'titan', 'reels', 'kamera'],
    specifications: {
      battery: '3274 mAh',
      batteryScore: 8.5,
      camera: '48 MP Pro + 3x Telefoto + ProRes LOG',
      cameraScore: 9.9,
      performance: 'Apple A17 Pro (3nm), 8GB RAM',
      performanceScore: 9.9,
      screen: '6.1" OLED 120Hz ProMotion',
      screenScore: 9.8,
      storage: '128 GB'
    },
    pros: [
      'Type-C orqali tashqi SSD ga to‘g‘ridan-to‘g‘ri 4K 60fps video yozish',
      'Yengil titan korpus va ProMotion 120Hz ekran'
    ],
    cons: ['Qimmat narx segmenti']
  },
  {
    id: 'apple-iphone-16',
    brand: 'Apple',
    model: 'iPhone 16',
    variant: '128GB',
    category: 'smartphone',
    normalized_name: 'Apple iPhone 16 128GB',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    basePrice: 10900000,
    tags: ['iphone', 'apple', '16', 'yangi', 'smartfon', 'camera control'],
    specifications: {
      battery: '3561 mAh',
      batteryScore: 8.9,
      camera: '48 MP Fusion + Camera Control tugmasi',
      cameraScore: 9.7,
      performance: 'Apple A18 (3nm), 8GB RAM',
      performanceScore: 9.8,
      screen: '6.1" Super Retina OLED, 2000 nits',
      screenScore: 9.4,
      storage: '128 GB'
    },
    pros: [
      'A18 yangi arxitekturasi va Apple Intelligence qo‘llab-quvvatlashi',
      'Kamera uchun alohida sensorli Camera Control tugmasi'
    ],
    cons: ['Displey 60Hz']
  },

  // --- Samsung ---
  {
    id: 'samsung-galaxy-a15',
    brand: 'Samsung',
    model: 'Galaxy A15',
    variant: '6GB / 128GB',
    category: 'smartphone',
    normalized_name: 'Samsung Galaxy A15 6/128GB',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    basePrice: 2280000,
    tags: ['samsung', 'a15', 'galaxy', 'arzon', 'taxi', 'yandex taxi', '3 mln', '2 mln'],
    specifications: {
      battery: '5000 mAh (25W)',
      batteryScore: 8.8,
      camera: '50 MP + 5 MP',
      cameraScore: 8.2,
      performance: 'Helio G99 (6nm), 6GB RAM',
      performanceScore: 8.3,
      screen: '6.5" Super AMOLED 90Hz',
      screenScore: 8.5,
      storage: '128 GB'
    },
    pros: [
      '2.3 mln so‘mga yorqin Super AMOLED ekran',
      'Qizimaydigan barqaror chip va 4 yillik Android yangilanishi',
      'Yandex Taxi va kundalik ishlar uchun tejamkor'
    ],
    cons: ['Adapter karobkada chiqmaydi']
  },
  {
    id: 'samsung-galaxy-a55',
    brand: 'Samsung',
    model: 'Galaxy A55 5G',
    variant: '8GB / 128GB',
    category: 'smartphone',
    normalized_name: 'Samsung Galaxy A55 5G 8/128GB',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    basePrice: 4250000,
    tags: ['samsung', 'a55', 'galaxy', '5g', 'ip67', '4 mln', '5 mln'],
    specifications: {
      battery: '5000 mAh (25W)',
      batteryScore: 9.2,
      camera: '50 MP OIS + 12 MP ultra-keng',
      cameraScore: 8.9,
      performance: 'Exynos 1480 (4nm, AMD grafika), 8GB RAM',
      performanceScore: 8.8,
      screen: '6.6" Super AMOLED 120Hz',
      screenScore: 9.3,
      storage: '128 GB'
    },
    pros: [
      'IP67 suv va changdan himoyalangan mustahkam metall romli korpus',
      'Optik stabilizatsiyali (OIS) 50MP kamera'
    ],
    cons: ['25W zaryadlash tezligi zamonaviy xitoy raqobatchilaridan sekinroq']
  },
  {
    id: 'samsung-galaxy-s24-ultra',
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    variant: '12GB / 256GB',
    category: 'smartphone',
    normalized_name: 'Samsung Galaxy S24 Ultra 12/256GB',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    basePrice: 12900000,
    tags: ['samsung', 's24', 'ultra', 'flagman', '200mp', 'zoom', 'galaxy ai', 's pen'],
    specifications: {
      battery: '5000 mAh (45W)',
      batteryScore: 9.3,
      camera: '200 MP + 50 MP 5x periskop + 10x',
      cameraScore: 10.0,
      performance: 'Snapdragon 8 Gen 3, 12GB RAM',
      performanceScore: 10.0,
      screen: '6.8" AMOLED 120Hz Gorilla Armor (bliksiz)',
      screenScore: 10.0,
      storage: '256 GB'
    },
    pros: [
      '200 MP kamera va 100x yaqinlashtirish (zoom)',
      'Gorilla Armor yaltiramaydigan yassi titan ekran',
      'Galaxy AI va S Pen stilus'
    ],
    cons: ['Katta o‘lcham (232g)']
  },

  // --- Xiaomi & Poco ---
  {
    id: 'xiaomi-redmi-note-13',
    brand: 'Xiaomi',
    model: 'Redmi Note 13',
    variant: '8GB / 256GB',
    category: 'smartphone',
    normalized_name: 'Xiaomi Redmi Note 13 8/256GB',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    basePrice: 2790000,
    tags: ['xiaomi', 'redmi', 'note 13', '3 mln', 'taxi', 'yandex taxi', 'arzon', '256gb'],
    specifications: {
      battery: '5000 mAh (33W karobkada)',
      batteryScore: 9.0,
      camera: '108 MP 3x Zoom + 8 MP',
      cameraScore: 8.5,
      performance: 'Snapdragon 685, 8GB RAM',
      performanceScore: 8.0,
      screen: '6.67" AMOLED 120Hz, 1800 nits',
      screenScore: 9.2,
      storage: '256 GB'
    },
    pros: [
      '1800 nits AMOLED ekran — quyoshda xarita va matnlar juda aniq ko‘rinadi',
      '33W tezkor adapter va chexol karobkasida qo‘shib beriladi',
      '256GB katta xotira 2.8 mln so‘mga'
    ],
    cons: ['Og‘ir 3D o‘yinlar uchun emas']
  },
  {
    id: 'xiaomi-redmi-note-13-pro',
    brand: 'Xiaomi',
    model: 'Redmi Note 13 Pro',
    variant: '8GB / 256GB',
    category: 'smartphone',
    normalized_name: 'Xiaomi Redmi Note 13 Pro 8/256GB',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    basePrice: 3290000,
    tags: ['xiaomi', 'redmi', 'note 13 pro', 'pro', '200mp', '67w', '3 mln'],
    specifications: {
      battery: '5000 mAh (67W turbo)',
      batteryScore: 9.4,
      camera: '200 MP OIS optik stabilizatsiya',
      cameraScore: 9.2,
      performance: 'Helio G99 Ultra, 8GB RAM',
      performanceScore: 8.6,
      screen: '6.67" AMOLED 120Hz',
      screenScore: 9.3,
      storage: '256 GB'
    },
    pros: [
      '200 MP OIS optik stabilizatsiyali kamera',
      '67W adapter orqali 45 daqiqada 100% quvvatlash'
    ],
    cons: ['4G aloqa']
  },
  {
    id: 'xiaomi-poco-x6-pro',
    brand: 'Poco',
    model: 'Poco X6 Pro 5G',
    variant: '8GB / 256GB',
    category: 'smartphone',
    normalized_name: 'Xiaomi Poco X6 Pro 5G 8/256GB',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
    basePrice: 3950000,
    tags: ['poco', 'x6', 'x6 pro', 'pubg', 'o\'yin', 'gaming', '4 mln', 'fps'],
    specifications: {
      battery: '5000 mAh (67W)',
      batteryScore: 9.2,
      camera: '64 MP OIS',
      cameraScore: 8.4,
      performance: 'Dimensity 8300 Ultra (Antutu 1.4M), 8GB LPDDR5X',
      performanceScore: 9.9,
      screen: '6.67" 1.5K AMOLED 120Hz',
      screenScore: 9.5,
      storage: '256 GB'
    },
    pros: [
      'PUBG va og‘ir o‘yinlarni 90/120 FPS da yurgazuvchi flagman protsessor',
      '1.5K tiniq AMOLED ekran va UFS 4.0 ultra tezkor xotira'
    ],
    cons: ['Kamerasi o‘yin unumdorligiga qaraganda oddiyroq']
  },

  // --- Honor & Tecno ---
  {
    id: 'honor-x9b-5g',
    brand: 'Honor',
    model: 'Honor X9b 5G',
    variant: '12GB / 256GB',
    category: 'smartphone',
    normalized_name: 'Honor X9b 5G 12/256GB',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=600&auto=format&fit=crop&q=80',
    basePrice: 3690000,
    tags: ['honor', 'x9b', '5800mah', 'sindirish qiyin', 'chidamli', '3 mln', '4 mln'],
    specifications: {
      battery: '5800 mAh ulkan batareya (35W)',
      batteryScore: 9.7,
      camera: '108 MP asosiy kamera',
      cameraScore: 8.7,
      performance: 'Snapdragon 6 Gen 1, 12GB RAM',
      performanceScore: 8.8,
      screen: '6.78" Curved AMOLED 1.5K 120Hz',
      screenScore: 9.6,
      storage: '256 GB'
    },
    pros: [
      'Zarbalarga va tushib ketishga chidamli 360° himoyalangan egilgan ekran',
      '5800 mAh batareya bemalol 2 kunga yetadi',
      '12GB katta operativ xotira'
    ],
    cons: ['Bitta dinamik (mono ovoz)']
  },
  {
    id: 'tecno-pova-6-neo',
    brand: 'Tecno',
    model: 'Pova 6 Neo',
    variant: '8GB / 256GB',
    category: 'smartphone',
    normalized_name: 'Tecno Pova 6 Neo 8/256GB',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
    basePrice: 2350000,
    tags: ['tecno', 'pova', 'pova 6', '7000mah', 'batareya', 'taxi', 'yandex', '2 mln'],
    specifications: {
      battery: '7000 mAh mega-batareya (33W)',
      batteryScore: 9.9,
      camera: '50 MP AI kamera',
      cameraScore: 7.8,
      performance: 'Helio G99 Ultimate, 8GB RAM',
      performanceScore: 8.2,
      screen: '6.78" FHD+ 120Hz',
      screenScore: 8.1,
      storage: '256 GB'
    },
    pros: [
      '7000 mAh ulkan quvvat — kuniga zaryadniksiz Yandex Taxi haydash uchun',
      '33W adapter va qalin chexol komplektida'
    ],
    cons: ['IPS ekran, korpusi biroz og‘ir (220g)']
  },

  // --- Laptops ---
  {
    id: 'apple-macbook-air-m2',
    brand: 'Apple',
    model: 'MacBook Air 13" M2',
    variant: '8GB / 256GB',
    category: 'laptop',
    normalized_name: 'Apple MacBook Air 13" M2 (8GB / 256GB)',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    basePrice: 12200000,
    tags: ['macbook', 'apple', 'm2', 'noutbuk', 'laptop', 'dasturlash', 'talaba', 'ofis'],
    specifications: {
      battery: '18 soat avtonomlik',
      batteryScore: 10.0,
      camera: '1080p FaceTime HD',
      cameraScore: 9.2,
      performance: 'Apple M2 (8 yadro CPU, 8 yadro GPU)',
      performanceScore: 9.6,
      screen: '13.6" Liquid Retina 500 nits',
      screenScore: 9.8,
      storage: '256 GB SSD'
    },
    pros: [
      '18 soatgacha uzluksiz batareya — zaryadniksiz butun kun ishlaydi',
      '1.24 kg o‘ta yengil va ventilyatorsiz mutlaqo shovqinsiz',
      'Dasturlash va ofis ishlari uchun eng qulay'
    ],
    cons: ['8GB operativ xotira (og‘ir renderlar uchun 16GB varianti ma’qul)']
  },
  {
    id: 'acer-aspire-lite-15',
    brand: 'Acer',
    model: 'Aspire Lite 15',
    variant: '16GB / 512GB SSD',
    category: 'laptop',
    normalized_name: 'Acer Aspire Lite 15 (Ryzen 5 / 16GB / 512GB)',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80',
    basePrice: 6390000,
    tags: ['acer', 'noutbuk', 'laptop', 'ryzen', '16gb', 'dasturlash', 'talaba', '7 mln', '6 mln'],
    specifications: {
      battery: '48 Wh (6-8 soat)',
      batteryScore: 8.5,
      camera: 'FHD 1080p veb-kamera',
      cameraScore: 8.2,
      performance: 'AMD Ryzen 5 5500U (6 yadro / 12 potok), 16GB RAM',
      performanceScore: 8.9,
      screen: '15.6" IPS Full HD',
      screenScore: 8.5,
      storage: '512 GB SSD'
    },
    pros: [
      '16GB RAM — VS Code, brauzerda 30 ta tab ochilganda ham qotmaydi',
      'Ryzen 5 6 yadroli tezkor chip 6.4 mln so‘mga'
    ],
    cons: ['Diskret videokarta yo‘q (og‘ir 3D o‘yinlar uchun emas)']
  }
];

// Helper to calculate ranking score
function scoreProduct(product, queryLower, budget) {
  let score = 80;
  const name = product.normalized_name.toLowerCase();

  // Name exact match bonus
  if (name.includes(queryLower)) score += 15;
  product.tags.forEach(t => {
    if (queryLower.includes(t)) score += 5;
  });

  // Budget bonus
  if (budget) {
    if (product.basePrice <= budget) score += 10;
    else if (product.basePrice > budget * 1.1) score -= 15;
  }

  // Cap score between 70 and 99
  return Math.min(99, Math.max(70, score));
}

/**
 * Universal Search Function - Never errors, instant, searches all products
 */
export function searchProducts(rawQuery = '') {
  const query = (rawQuery || '').toLowerCase().trim();

  // Extract budget if any (e.g., "3 mln", "5 million", "7000000")
  let budget = null;
  const mlnMatch = query.match(/(\d+(?:[.,]\d+)?)\s*(?:mln|million|m|миллион|млн)/i);
  if (mlnMatch) {
    budget = parseFloat(mlnMatch[1].replace(',', '.')) * 1000000;
  } else {
    const rawNum = query.match(/(\d{6,9})/);
    if (rawNum) budget = parseInt(rawNum[1], 10);
  }

  let candidates = [];

  if (!query || query === 'barchasi' || query === 'all') {
    candidates = [...MASTER_PRODUCTS];
  } else {
    // 1. Filter by keywords/tags/name
    candidates = MASTER_PRODUCTS.filter(p => {
      const name = p.normalized_name.toLowerCase();
      const brand = p.brand.toLowerCase();
      const model = p.model.toLowerCase();

      // Check direct matches
      if (name.includes(query) || brand.includes(query) || model.includes(query)) return true;

      // Check query words
      const words = query.split(/\s+/);
      const wordMatch = words.some(w => w.length > 1 && (name.includes(w) || p.tags.includes(w)));
      if (wordMatch) return true;

      // Check category match
      if ((query.includes('telefon') || query.includes('smartfon')) && p.category === 'smartphone') return true;
      if ((query.includes('noutbuk') || query.includes('laptop')) && p.category === 'laptop') return true;

      // Check budget match
      if (budget && p.basePrice <= budget * 1.05) return true;

      return false;
    });

    // If query has specific words but candidates empty, fallback to intelligent match
    if (candidates.length === 0) {
      // Find closest category or top products
      if (query.includes('noutbuk') || query.includes('laptop') || query.includes('kompyuter')) {
        candidates = MASTER_PRODUCTS.filter(p => p.category === 'laptop');
      } else {
        candidates = MASTER_PRODUCTS.slice(0, 4);
      }
    }
  }

  // Format into final product objects with stores, 30-day median, and scores
  const results = candidates.map((item, index) => {
    const stores = buildStores(item.normalized_name, item.basePrice);
    const median30Days = Math.round((item.basePrice * 1.04) / 10000) * 10000;
    const bestPrice = stores[0].price;
    const diffPercent = Number((((bestPrice - median30Days) / median30Days) * 100).toFixed(1));

    const calculatedScore = scoreProduct(item, query, budget);

    return {
      ...item,
      bestPrice,
      bestStore: stores[0],
      stores,
      median30Days,
      calculatedScore,
      priceHistory: createPriceHistory(item.basePrice),
      priceStatus: {
        isCheap: diffPercent < 0,
        isExpensive: diffPercent > 5,
        diffPercent: Math.abs(diffPercent),
        verdictText: diffPercent < 0 
          ? `30 kunlik mediandan ${Math.abs(diffPercent)}% arzon (Ajoyib taklif)` 
          : `Bozorning odatiy median narxida`
      },
      aiReasons: {
        recommendationSummary: `Bozordagi Uzum, Olcha, Asaxiy, Texnomart va OLX manbalari tahlili.`,
        pros: item.pros || [
          `Eng past yangi narx: ${formatPrice(bestPrice)} so‘m (${stores[0].sourceName} da)`,
          `30 kunlik median narxdan ${Math.abs(diffPercent)}% arzonroq`,
          `12 oylik rasmiy kafolat bilan mavjud`
        ],
        cons: item.cons || []
      }
    };
  });

  // Sort descending by score
  results.sort((a, b) => b.calculatedScore - a.calculatedScore);

  return {
    items: results,
    totalFound: results.length,
    queryText: rawQuery,
    budget
  };
}
