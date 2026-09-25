// Topdim AI - Mock Data & Canonical Product Catalog for Uzbekistan Market
// Sources: Uzum, Asaxiy, Olcha, Texnomart, MediaPark, OLX

export const SOURCES = [
  { id: 'uzum', name: 'Uzum Market', domain: 'uzum.uz', type: 'API', logoColor: '#7000ff', badgeText: 'Rasmiy API' },
  { id: 'asaxiy', name: 'Asaxiy', domain: 'asaxiy.uz', type: 'CRAWLER', logoColor: '#0085ff', badgeText: 'Product Feed' },
  { id: 'olcha', name: 'Olcha', domain: 'olcha.uz', type: 'CRAWLER', logoColor: '#da002b', badgeText: 'Partner' },
  { id: 'texnomart', name: 'Texnomart', domain: 'texnomart.uz', type: 'CRAWLER', logoColor: '#ffc700', badgeText: 'Do\'kon' },
  { id: 'mediapark', name: 'MediaPark', domain: 'mediapark.uz', type: 'CRAWLER', logoColor: '#e30613', badgeText: 'Do\'kon' },
  { id: 'olx', name: 'OLX O\'zbekiston', domain: 'olx.uz', type: 'PUBLIC_LISTING', logoColor: '#002f34', badgeText: 'Individual / Used' }
];

// Helper to generate 30 days of realistic price history
function generatePriceHistory(basePrice, volatility = 0.05) {
  const history = [];
  const today = new Date('2026-09-25');
  let current = basePrice * (1 + (Math.random() * 0.08 - 0.03));
  
  for (let i = 30; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    // random walk
    const change = (Math.random() - 0.52) * volatility * basePrice;
    current = Math.round((current + change) / 10000) * 10000;
    history.push({
      date: dateStr,
      price: current,
      day: d.getDate(),
      month: d.toLocaleString('uz-UZ', { month: 'short' })
    });
  }
  return history;
}

export const SAMPLE_QUERIES = [
  {
    id: 'iphone-13',
    title: '📱 iPhone 13 128GB (Do‘konlar & OLX)',
    query: 'iPhone 13 128GB narxlarini Uzum, Olcha, Asaxiy va OLX dan solishtirib ber',
    tags: ['Apple', '128GB', 'Yangi vs B/U', 'Narx solishtirish']
  },
  {
    id: 'samsung-a55',
    title: '💎 Samsung Galaxy A55 5G',
    query: 'Samsung Galaxy A55 8/128GB eng arzon narxi qaysi do‘konda?',
    tags: ['Samsung', 'IP67', 'Super AMOLED', '120Hz']
  },
  {
    id: 'yandex-taxi',
    title: '🚕 Yandex Taxi uchun (≤ 3 mln)',
    query: 'Menga 3 mln so\'mgacha telefon kerak. Batareyasi kuchli bo\'lsin, kamerasi yaxshi bo\'lsin, Yandex Taxi uchun ishlataman.',
    tags: ['≤ 3M UZS', 'Batareya 5000+ mAh', 'Yandex Taxi', 'Kamera yaxshi']
  },
  {
    id: 'honor-x9b',
    title: '🛡️ Honor X9b (Sifatli & 5800mAh)',
    query: 'Honor X9b 5G 12/256GB chidamli ekranli telefon narxi',
    tags: ['Honor', '5800 mAh', 'Sindirish qiyin', '12GB RAM']
  },
  {
    id: 'student-laptop',
    title: '💻 MacBook Air M2 / Noutbuk',
    query: 'Dasturlash va o‘qish uchun Apple MacBook Air 13 M2 narxi va takliflari',
    tags: ['MacBook', 'M2 Chip', 'Avtonomlik 18s', 'Dasturlash']
  },
  {
    id: 'gaming-budget',
    title: '🎮 PUBG / O\'yinbop (≤ 4 mln)',
    query: 'O\'yinlar va PUBG uchun 4 mln gacha kuchli protsessorli va qizib ketmaydigan telefon tavsiya qiling.',
    tags: ['Poco X6 Pro', 'Yuqori FPS', '120Hz', 'Tezkor quvvatlash']
  }
];

export const CANONICAL_PRODUCTS = [
  {
    id: 'prod-redmi-note-13-8-256',
    brand: 'Xiaomi',
    model: 'Redmi Note 13',
    variant: '8GB / 256GB',
    category: 'smartphone',
    normalized_name: 'Xiaomi Redmi Note 13 8/256GB',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    specifications: {
      battery: '5000 mAh (33W tezkor quvvatlash)',
      batteryScore: 9.0,
      camera: '108 MP asosiy + 8 MP ultra-keng + 16 MP selfi',
      cameraScore: 8.5,
      performance: 'Snapdragon 685 (6nm), 8GB LPDDR4X',
      performanceScore: 8.0,
      screen: '6.67" AMOLED, 120Hz, 1800 nits yorqinlik',
      screenScore: 9.2,
      ram: '8 GB',
      storage: '256 GB',
      connectivity: 'Dual SIM, GPS/GLONASS/Galileo, 3.5mm jack'
    },
    useCases: ['Yandex Taxi', 'Kundalik', 'Yetkazib berish', 'O\'qish'],
    median30Days: 2950000,
    priceHistory: generatePriceHistory(2890000, 0.04),
    rawMatchingDemonstration: [
      { source: 'Asaxiy', rawTitle: 'Smartfon Xiaomi Redmi Note 13 8/256GB Midnight Black', matched: true },
      { source: 'Uzum', rawTitle: 'Xiaomi Redmi Note 13 8/256GB qora (Global)', matched: true },
      { source: 'Olcha', rawTitle: 'Apple emas, Xiaomi 13 Note 8/256GB Midnight', matched: true },
      { source: 'Texnomart', rawTitle: 'Redmi Note 13 256GB Black', matched: true },
      { source: 'OLX', rawTitle: 'Redmi note 13 8/256 ideal sostoyanie karobka dakument bor', matched: true }
    ],
    stores: [
      {
        sourceId: 'asaxiy',
        sourceName: 'Asaxiy',
        price: 2790000,
        oldPrice: 2990000,
        condition: 'NEW',
        warranty: '12 oy rasmiy kafolat',
        availability: 'Mavjud (Omborda 14 dona)',
        verifiedAt: '11:42 (Bugun)',
        isRealtime: true,
        delivery: '1 kunda bepul yetkazish',
        url: 'https://asaxiy.uz/product/redmi-note-13-8-256',
        isBestPrice: true,
        seller: {
          name: 'Asaxiy Official Store',
          rating: 4.9,
          reviewsCount: 3840,
          transparencyScore: 94,
          returnPolicy: '14 kunlik qaytarish',
          storeAge: '8 yil faoliyatda'
        }
      },
      {
        sourceId: 'uzum',
        sourceName: 'Uzum Market',
        price: 2849000,
        oldPrice: 3050000,
        condition: 'NEW',
        warranty: '12 oy kafolat',
        availability: 'Mavjud (Ertaga topshirish punktida)',
        verifiedAt: '11:35 (Bugun)',
        isRealtime: true,
        delivery: 'Ertagayoq Uzum punktida',
        url: 'https://uzum.uz/product/xiaomi-redmi-note-13-8256',
        seller: {
          name: 'Xiaomi Authorized Reseller',
          rating: 4.8,
          reviewsCount: 1920,
          transparencyScore: 91,
          returnPolicy: '10 kunlik almashtirish',
          storeAge: '3 yil faoliyatda'
        }
      },
      {
        sourceId: 'olcha',
        sourceName: 'Olcha',
        price: 2890000,
        oldPrice: 3100000,
        condition: 'NEW',
        warranty: '12 oy kafolat',
        availability: 'Mavjud',
        verifiedAt: '10:50 (Bugun)',
        isRealtime: false,
        delivery: '24 soat ichida',
        url: 'https://olcha.uz/ru/product/view/xiaomi-redmi-note-13-8-256gb',
        seller: {
          name: 'Olcha Direct',
          rating: 4.7,
          reviewsCount: 840,
          transparencyScore: 89,
          returnPolicy: '14 kunlik qaytarish',
          storeAge: '6 yil faoliyatda'
        }
      },
      {
        sourceId: 'texnomart',
        sourceName: 'Texnomart',
        price: 2949000,
        oldPrice: 3190000,
        condition: 'NEW',
        warranty: '12 oy kafolat',
        availability: 'Mavjud',
        verifiedAt: '09:15 (Bugun)',
        isRealtime: false,
        delivery: 'Do\'kondan olib ketish / yetkazish',
        url: 'https://texnomart.uz/product/redmi-note-13',
        seller: {
          name: 'Texnomart Tarmoq do\'koni',
          rating: 4.8,
          reviewsCount: 1450,
          transparencyScore: 92,
          returnPolicy: '14 kun',
          storeAge: '15 yil faoliyatda'
        }
      },
      {
        sourceId: 'olx',
        sourceName: 'OLX O\'zbekiston',
        price: 2350000,
        oldPrice: null,
        condition: 'USED',
        conditionNote: 'E\'lon matniga ko\'ra: 1 oy ishlatilgan, ideal holatda, karobka-dakument bor.',
        warranty: 'Do\'kon kafolati yo\'q (Individual shaxs)',
        availability: '1 dona (Toshkent, Chilonzor)',
        verifiedAt: '3 soat oldin',
        isRealtime: false,
        delivery: 'Uchrashib tekshirib olish',
        url: 'https://olx.uz/d/obyavlenie/redmi-note-13-8-256-ideal',
        isUsed: true,
        seller: {
          name: 'Sherzod (Jismoniy shaxs)',
          rating: 4.2,
          reviewsCount: 12,
          transparencyScore: 58,
          returnPolicy: 'Kafolat berilmaydi',
          storeAge: 'OLX da 2 yil'
        }
      }
    ],
    aiReasons: {
      recommendationSummary: 'Talabingizga eng optimal javob beradigan variant (#1 tanlov).',
      pros: [
        '3 000 000 so\'m budjetingizga to\'liq mos keladi (Eng arzon yangi: 2 790 000 so\'m)',
        '5000 mAh batareya Yandex Taxi dasturida uzluksiz 9–10 soat GPS va ekranni ko\'taradi',
        '1800 nits AMOLED ekran quyosh nuri ostida xarita va buyurtmalarni aniq ko\'rsatadi',
        'Hozirgi narx oxirgi 30 kunlik median narxdan 5.4% arzon — ayni xarid vaqti',
        'Asaxiy va Uzum da 12 oylik rasmiy kafolat bilan mavjud'
      ],
      cons: [
        'Og\'ir 3D o\'yinlarda o\'rtacha FPS beradi (lekin taksi va navigatsiyada muammo yo\'q)'
      ],
      verdict: 'Yandex Taxi haydovchisi uchun batareya va quyoshda ko\'rinish juda muhim. Ushbu model budjet ichida eng ishonchli va tejamkor variant.'
    }
  },
  {
    id: 'prod-samsung-galaxy-a15-6-128',
    brand: 'Samsung',
    model: 'Galaxy A15',
    variant: '6GB / 128GB',
    category: 'smartphone',
    normalized_name: 'Samsung Galaxy A15 6/128GB',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    specifications: {
      battery: '5000 mAh (25W quvvatlash)',
      batteryScore: 8.8,
      camera: '50 MP asosiy + 5 MP ultra-keng + 2 MP makro',
      cameraScore: 8.2,
      performance: 'MediaTek Helio G99 (6nm barqaror chip)',
      performanceScore: 8.3,
      screen: '6.5" Super AMOLED, 90Hz, 800 nits',
      screenScore: 8.5,
      ram: '6 GB',
      storage: '128 GB',
      connectivity: 'Dual SIM, GPS/Galileo, NFC, Type-C'
    },
    useCases: ['Yandex Taxi', 'Kundalik', 'Ishonchli brend', 'Uzoq muddatli yangilanish'],
    median30Days: 2450000,
    priceHistory: generatePriceHistory(2320000, 0.03),
    rawMatchingDemonstration: [
      { source: 'Uzum', rawTitle: 'Samsung Galaxy A15 6/128GB Moviy', matched: true },
      { source: 'Asaxiy', rawTitle: 'Smartfon Samsung Galaxy A15 128GB Blue Black', matched: true },
      { source: 'Texnomart', rawTitle: 'Samsung A15 6/128 Dark Blue', matched: true },
      { source: 'OLX', rawTitle: 'Samsung A15 yangidek', matched: true }
    ],
    stores: [
      {
        sourceId: 'asaxiy',
        sourceName: 'Asaxiy',
        price: 2280000,
        oldPrice: 2490000,
        condition: 'NEW',
        warranty: '12 oy rasmiy Samsung kafolati',
        availability: 'Mavjud',
        verifiedAt: '11:40 (Bugun)',
        isRealtime: true,
        delivery: '1 kunda yetkazish',
        url: 'https://asaxiy.uz/product/samsung-galaxy-a15',
        isBestPrice: true,
        seller: {
          name: 'Asaxiy Official',
          rating: 4.9,
          reviewsCount: 2900,
          transparencyScore: 94,
          returnPolicy: '14 kun',
          storeAge: '8 yil'
        }
      },
      {
        sourceId: 'uzum',
        sourceName: 'Uzum Market',
        price: 2319000,
        oldPrice: 2500000,
        condition: 'NEW',
        warranty: '12 oy kafolat',
        availability: 'Mavjud',
        verifiedAt: '11:15 (Bugun)',
        isRealtime: true,
        delivery: 'Ertaga',
        url: 'https://uzum.uz/product/samsung-a15',
        seller: {
          name: 'Samsung Mobile UZ',
          rating: 4.8,
          reviewsCount: 1100,
          transparencyScore: 90,
          returnPolicy: '10 kun',
          storeAge: '2 yil'
        }
      },
      {
        sourceId: 'texnomart',
        sourceName: 'Texnomart',
        price: 2399000,
        oldPrice: 2590000,
        condition: 'NEW',
        warranty: '12 oy kafolat',
        availability: 'Mavjud',
        verifiedAt: '10:00 (Bugun)',
        isRealtime: false,
        delivery: 'Do\'kondan olish',
        url: 'https://texnomart.uz/product/samsung-a15',
        seller: {
          name: 'Texnomart',
          rating: 4.8,
          reviewsCount: 1450,
          transparencyScore: 92,
          returnPolicy: '14 kun',
          storeAge: '15 yil'
        }
      },
      {
        sourceId: 'olx',
        sourceName: 'OLX O\'zbekiston',
        price: 1850000,
        oldPrice: null,
        condition: 'USED',
        conditionNote: 'E\'lon matniga ko\'ra: 2 oy ishlatilgan, holati yangidek, yoniq chexolda tutilgan.',
        warranty: 'Do\'kon kafolati yo\'q',
        availability: '1 dona (Samarqand)',
        verifiedAt: '4 soat oldin',
        isRealtime: false,
        delivery: 'Pochta / kelishuv',
        url: 'https://olx.uz/d/obyavlenie/samsung-a15',
        isUsed: true,
        seller: {
          name: 'Azizbek (Jismoniy shaxs)',
          rating: 4.5,
          reviewsCount: 5,
          transparencyScore: 61,
          returnPolicy: 'Yo\'q',
          storeAge: 'OLX da 1 yil'
        }
      }
    ],
    aiReasons: {
      recommendationSummary: 'Brend ishonchliligi va uzoq muddatli dasturiy yangilanish bo\'yicha yetakchi.',
      pros: [
        'Budjetingizdan 720 000 so\'m tejaladi (2 280 000 so\'m)',
        'Helio G99 protsessori qizimaydi va Yandex Taxi ilovasida barqaror ishlaydi',
        'Samsung 4 yil davomida Android yangilanishlarini kafolatlaydi',
        'Super AMOLED ekran ko\'zni toliqtirmaydi',
        '30 kunlik median narxdan 6.9% arzon'
      ],
      cons: [
        'Zaryadlash qurilmasi (adapter) karobkada chiqmaydi, alohida olish kerak (taxminan 120 000 so\'m)'
      ],
      verdict: 'Agar sizga sifatli Samsung brendi, qizimaydigan barqaror chip va 4 yillik yangilanishlar kerak bo\'lsa — 2.3 mln so\'mga eng yaxshi variant.'
    }
  },
  {
    id: 'prod-tecno-pova-6-neo-8-256',
    brand: 'Tecno',
    model: 'Pova 6 Neo',
    variant: '8GB / 256GB',
    category: 'smartphone',
    normalized_name: 'Tecno Pova 6 Neo 8/256GB',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
    specifications: {
      battery: '7000 mAh mega-batareya (33W tezkor quvvatlash)',
      batteryScore: 9.9,
      camera: '50 MP asosiy sun\'iy intellektli kamera',
      cameraScore: 7.6,
      performance: 'MediaTek Helio G99 Ultimate, 8GB RAM',
      performanceScore: 8.2,
      screen: '6.78" FHD+ IPS, 120Hz',
      screenScore: 8.0,
      ram: '8 GB (+8GB virtual)',
      storage: '256 GB',
      connectivity: 'Dual SIM, GPS/BeiDou, NFC, Stereo karnaylar'
    },
    useCases: ['Yandex Taxi', 'Uzoq safar', 'Rekord batareya', 'Kuryerlik'],
    median30Days: 2490000,
    priceHistory: generatePriceHistory(2350000, 0.035),
    rawMatchingDemonstration: [
      { source: 'Uzum', rawTitle: 'Tecno Pova 6 Neo 8/256GB Starry Silver', matched: true },
      { source: 'Asaxiy', rawTitle: 'Smartfon Tecno Pova 6 Neo 8/256GB Silver', matched: true },
      { source: 'Olcha', rawTitle: 'Tecno Pova 6 Neo 256GB', matched: true }
    ],
    stores: [
      {
        sourceId: 'uzum',
        sourceName: 'Uzum Market',
        price: 2349000,
        oldPrice: 2590000,
        condition: 'NEW',
        warranty: '13 oy rasmiy Carlcare kafolati',
        availability: 'Mavjud (Ertaga yetadi)',
        verifiedAt: '11:45 (Bugun)',
        isRealtime: true,
        delivery: 'Ertaga bepul',
        url: 'https://uzum.uz/product/tecno-pova-6-neo',
        isBestPrice: true,
        seller: {
          name: 'Tecno Official Store UZ',
          rating: 4.8,
          reviewsCount: 1640,
          transparencyScore: 92,
          returnPolicy: '14 kun',
          storeAge: '3 yil'
        }
      },
      {
        sourceId: 'asaxiy',
        sourceName: 'Asaxiy',
        price: 2399000,
        oldPrice: 2600000,
        condition: 'NEW',
        warranty: '13 oy kafolat',
        availability: 'Mavjud',
        verifiedAt: '11:20 (Bugun)',
        isRealtime: true,
        delivery: '1 kunda',
        url: 'https://asaxiy.uz/product/tecno-pova-6-neo',
        seller: {
          name: 'Asaxiy Official',
          rating: 4.9,
          reviewsCount: 2900,
          transparencyScore: 94,
          returnPolicy: '14 kun',
          storeAge: '8 yil'
        }
      },
      {
        sourceId: 'olcha',
        sourceName: 'Olcha',
        price: 2450000,
        oldPrice: 2650000,
        condition: 'NEW',
        warranty: '12 oy kafolat',
        availability: 'Mavjud',
        verifiedAt: '10:10 (Bugun)',
        isRealtime: false,
        delivery: '24 soat',
        url: 'https://olcha.uz/product/tecno-pova-6-neo',
        seller: {
          name: 'Olcha',
          rating: 4.7,
          reviewsCount: 840,
          transparencyScore: 89,
          returnPolicy: '14 kun',
          storeAge: '6 yil'
        }
      }
    ],
    aiReasons: {
      recommendationSummary: 'Batareya bo\'yicha mutlaq chempion: 7000 mAh quvvat.',
      pros: [
        '7000 mAh batareya — taksida 14–16 soat zaryadsiz bemalol ishlaydi (kuniga zaryadnikka ulab o\'tirmaysiz)',
        '3 000 000 so\'mlik budjetdan 650 000 so\'m tejash imkoniyati (2 349 000 so\'m)',
        'Helio G99 Ultimate + 8GB RAM navigatsiya va taksi ilovalari uchun to\'liq yetarli',
        'Karobkasida 33W quvvatlash adapteri va chexol ham qo\'shib beriladi'
      ],
      cons: [
        'AMOLED emas, IPS ekran (lekin 120Hz va batareyani kamroq eydi)',
        'Korpus biroz qalin va og\'ir (220g) mega-batareya sababli'
      ],
      verdict: 'Agar siz uchun asosiy mezon kun bo\'yi zaryadniksiz Yandex Taxi haydash bo\'lsa — 7000 mAh li ushbu telefon eng mustahkam variant.'
    }
  },
  {
    id: 'prod-infinix-note-40-8-256',
    brand: 'Infinix',
    model: 'Note 40',
    variant: '8GB / 256GB',
    category: 'smartphone',
    normalized_name: 'Infinix Note 40 8/256GB',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=600&auto=format&fit=crop&q=80',
    specifications: {
      battery: '5000 mAh (45W simli + 20W simsiz MagCharge)',
      batteryScore: 9.3,
      camera: '108 MP 3x Lossless Zoom + 32 MP selfi',
      cameraScore: 8.6,
      performance: 'Helio G99 Ultimate 6nm, 8GB RAM',
      performanceScore: 8.2,
      screen: '6.78" AMOLED, 120Hz, 1300 nits',
      screenScore: 9.1,
      ram: '8 GB',
      storage: '256 GB',
      connectivity: 'Dual SIM, JBL audio, Wireless charging, NFC'
    },
    useCases: ['Yandex Taxi', 'Kundalik', 'Simsiz quvvatlash', 'JBL Ovoz'],
    median30Days: 2790000,
    priceHistory: generatePriceHistory(2650000, 0.04),
    rawMatchingDemonstration: [
      { source: 'Texnomart', rawTitle: 'Infinix Note 40 8/256 Titan Gold', matched: true },
      { source: 'Uzum', rawTitle: 'Infinix Note 40 8/256GB Gold (Global)', matched: true },
      { source: 'Asaxiy', rawTitle: 'Smartfon Infinix Note 40 256GB', matched: true }
    ],
    stores: [
      {
        sourceId: 'texnomart',
        sourceName: 'Texnomart',
        price: 2599000,
        oldPrice: 2890000,
        condition: 'NEW',
        warranty: '12 oy rasmiy kafolat',
        availability: 'Mavjud',
        verifiedAt: '11:10 (Bugun)',
        isRealtime: true,
        delivery: 'Do\'kondan bepul',
        url: 'https://texnomart.uz/product/infinix-note-40',
        isBestPrice: true,
        seller: {
          name: 'Texnomart',
          rating: 4.8,
          reviewsCount: 1450,
          transparencyScore: 92,
          returnPolicy: '14 kun',
          storeAge: '15 yil'
        }
      },
      {
        sourceId: 'uzum',
        sourceName: 'Uzum Market',
        price: 2649000,
        oldPrice: 2850000,
        condition: 'NEW',
        warranty: '12 oy kafolat',
        availability: 'Mavjud',
        verifiedAt: '11:44 (Bugun)',
        isRealtime: true,
        delivery: 'Ertaga',
        url: 'https://uzum.uz/product/infinix-note-40',
        seller: {
          name: 'Infinix Official Mall',
          rating: 4.8,
          reviewsCount: 920,
          transparencyScore: 91,
          returnPolicy: '10 kun',
          storeAge: '2 yil'
        }
      },
      {
        sourceId: 'asaxiy',
        sourceName: 'Asaxiy',
        price: 2690000,
        oldPrice: 2900000,
        condition: 'NEW',
        warranty: '12 oy kafolat',
        availability: 'Mavjud',
        verifiedAt: '10:45 (Bugun)',
        isRealtime: false,
        delivery: '1 kunda',
        url: 'https://asaxiy.uz/product/infinix-note-40',
        seller: {
          name: 'Asaxiy Official',
          rating: 4.9,
          reviewsCount: 2900,
          transparencyScore: 94,
          returnPolicy: '14 kun',
          storeAge: '8 yil'
        }
      }
    ],
    aiReasons: {
      recommendationSummary: 'Mashinada qulay simsiz MagCharge quvvatlash va AMOLED displey.',
      pros: [
        'Avtomobilda magnetli simsiz quvvatlash (MagCharge) qo\'llab-quvvatlaydi — taksistlar uchun kabel tiqib-chiqarish dardi yo\'q',
        '108 MP kamera sifatli suratlarni ta\'minlaydi',
        'JBL tyuning qilingan stereo karnaylar — qo\'ng\'iroqlar baland va tiniq eshitiladi',
        'Oxirgi 30 kunlik median narxdan 6.8% pastroqqa sotilmoqda'
      ],
      cons: [
        'Kamera kechki payt ultra-keng ob\'yektivga ega emas (faqat 3x raqamli yaqinlashtirish)'
      ],
      verdict: 'Avtomobilda magnitli ushlagichda zaryadlashni xohlovchi taksi haydovchilari uchun texnologik jihatdan eng qulay gadjet.'
    }
  },

  // Laptop sample (for student / programming query)
  {
    id: 'prod-acer-aspire-lite-16-512',
    brand: 'Acer',
    model: 'Aspire Lite 15',
    variant: 'Ryzen 5 5500U / 16GB / 512GB SSD',
    category: 'laptop',
    normalized_name: 'Acer Aspire Lite 15 (16GB RAM / 512GB SSD)',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80',
    specifications: {
      battery: '48 Wh (6-8 soat avtonom ish)',
      batteryScore: 8.5,
      camera: 'FHD 1080p veb-kamera (onlayn darslar uchun)',
      cameraScore: 8.2,
      performance: 'AMD Ryzen 5 5500U (6 yadro / 12 potok), 16GB DDR4',
      performanceScore: 8.9,
      screen: '15.6" IPS Full HD, yaltiramaydigan qoplama',
      screenScore: 8.5,
      ram: '16 GB',
      storage: '512 GB NVMe SSD',
      connectivity: 'Wi-Fi 6, Type-C, HDMI, USB 3.2, 1.59 kg yengil korpus'
    },
    useCases: ['Dasturlash', 'O\'qish', 'Ofis', 'Web development'],
    median30Days: 6850000,
    priceHistory: generatePriceHistory(6490000, 0.03),
    rawMatchingDemonstration: [
      { source: 'Asaxiy', rawTitle: 'Noutbuk Acer Aspire Lite AL15 Ryzen 5 5500U 16/512GB Gray', matched: true },
      { source: 'Uzum', rawTitle: 'Acer Aspire Lite 15 16GB 512GB SSD Kulrang', matched: true },
      { source: 'Texnomart', rawTitle: 'Acer Aspire Lite R5-5500U/16/512', matched: true }
    ],
    stores: [
      {
        sourceId: 'asaxiy',
        sourceName: 'Asaxiy',
        price: 6390000,
        oldPrice: 6990000,
        condition: 'NEW',
        warranty: '12 oy rasmiy kafolat',
        availability: 'Mavjud',
        verifiedAt: '11:05 (Bugun)',
        isRealtime: true,
        delivery: 'Toshkentda 2 soatda',
        url: 'https://asaxiy.uz/product/acer-aspire-lite-16-512',
        isBestPrice: true,
        seller: {
          name: 'Asaxiy Computers',
          rating: 4.9,
          reviewsCount: 3100,
          transparencyScore: 95,
          returnPolicy: '14 kun',
          storeAge: '8 yil'
        }
      },
      {
        sourceId: 'uzum',
        sourceName: 'Uzum Market',
        price: 6490000,
        oldPrice: 7100000,
        condition: 'NEW',
        warranty: '12 oy kafolat',
        availability: 'Mavjud',
        verifiedAt: '11:40 (Bugun)',
        isRealtime: true,
        delivery: 'Ertaga',
        url: 'https://uzum.uz/product/acer-aspire-lite-16-512',
        seller: {
          name: 'IT Market Store',
          rating: 4.8,
          reviewsCount: 780,
          transparencyScore: 90,
          returnPolicy: '10 kun',
          storeAge: '2 yil'
        }
      }
    ],
    aiReasons: {
      recommendationSummary: '7 mln budjet ichida 16GB RAM va 6 yadroli protsessorli ideal noutbuk.',
      pros: [
        '16GB operativ xotira (VS Code, Docker, brauzerda 30 ta tab ochilganda qotmaydi)',
        '7 000 000 so\'mlik budjetingizdan 610 000 so\'m tejaladi',
        '1.59 kg yengil — universitet yoki kovorkingga olib yurish qulay',
        '30 kunlik median narxdan 6.7% arzon'
      ],
      cons: [
        'Diskret videokarta yo\'q (og\'ir 3D render yoki og\'ir o\'yinlar uchun emas, sof dasturlash va o\'qish uchun)'
      ],
      verdict: 'Talaba va dasturchilar uchun 6-7 mln so\'m oralig\'ida eng yuqori unumdorlik/narx nisbatiga ega variant.'
    }
  },

  // Flagship sample (iPhone 15 Pro)
  {
    id: 'prod-apple-iphone-15-pro-128',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    variant: '128GB Natural Titanium',
    category: 'smartphone',
    normalized_name: 'Apple iPhone 15 Pro 128GB',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    specifications: {
      battery: '3274 mAh (Kun bo\'yi avtonomlik, 20W)',
      batteryScore: 8.4,
      camera: '48 MP Pro tizim + 12 MP 3x Telefoto + ProRes 4K/60fps LOG',
      cameraScore: 9.9,
      performance: 'Apple A17 Pro (3nm) — jahon yetakchisi',
      performanceScore: 9.9,
      screen: '6.1" Super Retina XDR OLED, 120Hz ProMotion, 2000 nits',
      screenScore: 9.8,
      ram: '8 GB',
      storage: '128 GB NVMe',
      connectivity: 'USB Type-C 3.0 (10Gbps tezlikda tashqi SSD ga yozish), Wi-Fi 6E'
    },
    useCases: ['Mobilografiya', 'Blogerlik', 'Instagram Reels / 4K', 'Premium'],
    median30Days: 13900000,
    priceHistory: generatePriceHistory(13490000, 0.025),
    rawMatchingDemonstration: [
      { source: 'Asaxiy', rawTitle: 'Apple iPhone 15 Pro 128GB Natural Titanium', matched: true },
      { source: 'Uzum', rawTitle: 'iPhone 15 Pro 128GB Tabiiy Titan (SIM+eSIM)', matched: true },
      { source: 'Olcha', rawTitle: 'Apple iPhone 15 Pro 128 Natural', matched: true },
      { source: 'OLX', rawTitle: 'iPhone 15 pro 128gb natural battery 100 ideal sostoyanie', matched: true }
    ],
    stores: [
      {
        sourceId: 'asaxiy',
        sourceName: 'Asaxiy',
        price: 13450000,
        oldPrice: 14200000,
        condition: 'NEW',
        warranty: '1 yil Apple rasmiy kafolati',
        availability: 'Mavjud',
        verifiedAt: '11:48 (Bugun)',
        isRealtime: true,
        delivery: '1 kunda bepul',
        url: 'https://asaxiy.uz/product/apple-iphone-15-pro-128',
        isBestPrice: true,
        seller: {
          name: 'Asaxiy Apple Store',
          rating: 4.9,
          reviewsCount: 4200,
          transparencyScore: 96,
          returnPolicy: '14 kun',
          storeAge: '8 yil'
        }
      },
      {
        sourceId: 'uzum',
        sourceName: 'Uzum Market',
        price: 13690000,
        oldPrice: 14500000,
        condition: 'NEW',
        warranty: '12 oy kafolat',
        availability: 'Mavjud',
        verifiedAt: '11:30 (Bugun)',
        isRealtime: true,
        delivery: 'Ertaga',
        url: 'https://uzum.uz/product/iphone-15-pro-128',
        seller: {
          name: 'iStore UZ',
          rating: 4.9,
          reviewsCount: 1540,
          transparencyScore: 93,
          returnPolicy: '10 kun',
          storeAge: '3 yil'
        }
      },
      {
        sourceId: 'olx',
        sourceName: 'OLX O\'zbekiston',
        price: 11200000,
        oldPrice: null,
        condition: 'USED',
        conditionNote: 'E\'lon matniga ko\'ra: 4 oy ishlatilgan, batareya 98%, chizig\'i yo\'q, Amerika varianti (eSIM).',
        warranty: 'Do\'kon kafolati yo\'q (Individual sotuvchi)',
        availability: '1 dona (Toshkent, Yunusobod)',
        verifiedAt: '2 soat oldin',
        isRealtime: false,
        delivery: 'Joyida uchrashuv',
        url: 'https://olx.uz/d/obyavlenie/iphone-15-pro-128',
        isUsed: true,
        seller: {
          name: 'Jamshid (Jismoniy shaxs)',
          rating: 4.6,
          reviewsCount: 18,
          transparencyScore: 65,
          returnPolicy: 'Yo\'q',
          storeAge: 'OLX da 3 yil'
        }
      }
    ],
    aiReasons: {
      recommendationSummary: 'Mobilografiya, sifatli 4K 60fps video va ijtimoiy tarmoqlar uchun 1-raqamli flagman.',
      pros: [
        'Apple ProRes LOG formatida to\'g\'ridan-to\'g\'ri Type-C orqali tashqi SSD ga video yozish imkoniyati',
        'Instagram va TikTok algoritmlari bilan iOS ning mukammal integratsiyasi',
        'Titanium engil korpus va ProMotion 120Hz ekran',
        'Do\'konda yangi variant 13.45 mln (30 kunlik median narxdan 3.2% arzon)',
        'OLX da ishlatilgan varianti 11.2 mln so\'mga mavjud (2.2 mln arzonroq, lekin kafolatsiz)'
      ],
      cons: [
        '128GB xotira 4K LOG videoda tez to\'lishi mumkin (tashqi SSD tavsiya qilinadi)'
      ],
      verdict: 'Professional blogerlik va kontent yaratish uchun hozirgi bozorda eng universal va likvid flagman.'
    }
  }
];
