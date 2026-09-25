// Topdim AI - Universal Search Engine for All Electronics & Home Appliances in Uzbekistan
// Covers: Smartphones, Laptops, TVs, Washing Machines, Refrigerators, Air Conditioners,
// Robot Vacuums, Kitchen Appliances, Audio, Gaming Consoles across Uzum, Olcha, Asaxiy, Texnomart, OLX

export function formatPrice(num) {
  if (!num) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Generate realistic 30-day price history
function createPriceHistory(basePrice, volatility = 0.035) {
  const history = [];
  const today = new Date();
  let p = basePrice * 1.03;
  for (let i = 30; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const change = (Math.random() - 0.52) * volatility * basePrice;
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
      availability: 'Mavjud (Omborda bor)',
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
      seller: { name: 'Uzum Mall Rasmiy', rating: 4.8, reviewsCount: 2150, transparencyScore: 92 }
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
      seller: { name: 'Texnomart Tarmoq', rating: 4.8, reviewsCount: 1650, transparencyScore: 93 }
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

// =============================================================================
// Comprehensive Master Products Catalog (Barcha texnikalar & Maishiy buyumlar)
// =============================================================================
export const MASTER_PRODUCTS = [
  // ---------------------------------------------------------------------------
  // 1. KIR YUVISH MASHINALARI (Washing Machines)
  // ---------------------------------------------------------------------------
  {
    id: 'lg-ai-dd-f4v5vs9b',
    brand: 'LG',
    model: 'AI DD F4V5VS9B',
    variant: '8.5 kg / 1400 ayl/daq / Inverter',
    category: 'washing_machine',
    categoryGroup: 'maishiy',
    categoryLabel: 'Kir yuvish mashinasi',
    normalized_name: 'LG AI DD 8.5 kg Kir yuvish mashinasi (F4V5VS9B)',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&auto=format&fit=crop&q=80',
    basePrice: 5890000,
    tags: ['lg', 'kir yuvish', 'kir yuvish mashinasi', 'стиральная машина', 'стиралка', '8.5kg', 'ai dd', 'inverter', 'par', 'steam', 'maishiy texnika'],
    specHighlights: ['8.5 kg yuk hajmi', '1400 ayl/daq', 'AI DD Inverter', 'Steam+ Bug\' dezinfeksiya'],
    specifications: {
      capacity: '8.5 kg',
      spinSpeed: '1400 ayl/daq',
      motor: 'Inverter Direct Drive (10 yil kafolat)',
      energyClass: 'A+++ (-40%)',
      dimensions: '60 x 85 x 56 sm'
    },
    pros: [
      'AI DD intellektual sensori mato turini aniqlab, barabanni shunga mos aylantiradi',
      'Steam+ bug\' funksiyasi mikroblar va allergiyani 99.9% yo‘qotadi',
      'Inverter to‘g‘ridan-to‘g‘ri privod tufayli o‘ta shovqinsiz ishlaydi'
    ],
    cons: ['Katta o‘lcham (kichik vannaxonalar uchun 56 sm chuqurlik)']
  },
  {
    id: 'samsung-ecobubble-ww70',
    brand: 'Samsung',
    model: 'EcoBubble WW70T3020BW',
    variant: '7 kg / 1200 ayl/daq / Oq',
    category: 'washing_machine',
    categoryGroup: 'maishiy',
    categoryLabel: 'Kir yuvish mashinasi',
    normalized_name: 'Samsung EcoBubble 7 kg Kir yuvish mashinasi (WW70T3020BW)',
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&auto=format&fit=crop&q=80',
    basePrice: 4390000,
    tags: ['samsung', 'kir yuvish', 'kir yuvish mashinasi', 'стиралка', '7kg', 'ecobubble', 'inverter', '4 mln', 'maishiy texnika'],
    specHighlights: ['7 kg yuk', '1200 ayl/daq', 'Digital Inverter', '15 daq tezkor yuvish'],
    specifications: {
      capacity: '7 kg',
      spinSpeed: '1200 ayl/daq',
      motor: 'Digital Inverter motor',
      energyClass: 'A+++',
      dimensions: '60 x 85 x 45 sm (Ixcham Slim)'
    },
    pros: [
      'EcoBubble texnologiyasi past haroratda ham kirlarni ko‘pik bilan chuqur tozalaydi',
      '45 sm ixcham Slim korpus — tor joylarga oson sig‘adi',
      '15 daqiqalik tezkor ekspress yuvish dasturi mavjud'
    ],
    cons: ['Maksimal siqish tezligi 1200 ayl/daq']
  },
  {
    id: 'artel-grand-inverter-60',
    brand: 'Artel',
    model: 'Grand Inverter 60L',
    variant: '6 kg / 1000 ayl/daq / Kumushrang',
    category: 'washing_machine',
    categoryGroup: 'maishiy',
    categoryLabel: 'Kir yuvish mashinasi',
    normalized_name: 'Artel Grand Inverter 6 kg Kir yuvish mashinasi',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&auto=format&fit=crop&q=80',
    basePrice: 3150000,
    tags: ['artel', 'kir yuvish', 'kir yuvish mashinasi', 'arzon', '3 mln', 'inverter', '6kg', 'maishiy texnika'],
    specHighlights: ['6 kg yuk', '1000 ayl/daq', 'Inverter motor', '3 yil to‘liq kafolat'],
    specifications: {
      capacity: '6 kg',
      spinSpeed: '1000 ayl/daq',
      motor: 'Inverter BLDC motor',
      energyClass: 'A++',
      dimensions: '59.5 x 85 x 44 sm'
    },
    pros: [
      'O‘zbekiston bozorida 3.1 mln so‘mga eng arzon inverterli kir yuvish mashinasi',
      'Respublika bo‘ylab Artel ning keng servis markazlari va 3 yillik kafolat',
      'Kuchlanish o‘ynashiga chidamli himoya tizimi'
    ],
    cons: ['Og‘ir ko‘rpalar va yirik yuklar uchun 6 kg biroz torlik qilishi mumkin']
  },
  {
    id: 'bosch-serie-6-9kg',
    brand: 'Bosch',
    model: 'Serie 6 WAU28460OE',
    variant: '9 kg / 1400 ayl/daq / Nemis sifati',
    category: 'washing_machine',
    categoryGroup: 'maishiy',
    categoryLabel: 'Kir yuvish mashinasi',
    normalized_name: 'Bosch Serie 6 9 kg Kir yuvish mashinasi (WAU28460OE)',
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&auto=format&fit=crop&q=80',
    basePrice: 8900000,
    tags: ['bosch', 'kir yuvish', 'serie 6', '9kg', 'nemis', 'inverter', 'eco silence', 'premium', 'maishiy texnika'],
    specHighlights: ['9 kg katta yuk', '1400 ayl/daq', 'EcoSilence Drive', 'Nemis yig‘ilishi'],
    specifications: {
      capacity: '9 kg',
      spinSpeed: '1400 ayl/daq',
      motor: 'EcoSilence Drive (Cho‘tkasiz inverter)',
      energyClass: 'A+++ (-30%)',
      dimensions: '60 x 85 x 59 sm'
    },
    pros: [
      'Nemis muhandisligi: 10-15 yillik uzoq muddatli xizmat ko‘rsatish resursi',
      'SpeedPerfect orqali sifatni yo‘qotmasdan 65% tezroq yuvish',
      '9 kg ulkan baraban katta oilalar uchun ideal'
    ],
    cons: ['Yuqori narx segmenti']
  },

  // ---------------------------------------------------------------------------
  // 2. MUZLATGICHLAR (Refrigerators)
  // ---------------------------------------------------------------------------
  {
    id: 'samsung-nofrost-rb34',
    brand: 'Samsung',
    model: 'RB34T600FSA',
    variant: '340 litr / All-Around Cooling / No Frost',
    category: 'refrigerator',
    categoryGroup: 'maishiy',
    categoryLabel: 'Muzlatgich',
    normalized_name: 'Samsung No Frost 340L Muzlatgich (RB34T600FSA)',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&auto=format&fit=crop&q=80',
    basePrice: 6950000,
    tags: ['samsung', 'muzlatgich', 'xolodilnik', 'холодильник', 'no frost', 'nofrost', 'inverter', '340l', 'maishiy texnika'],
    specHighlights: ['340 L hajm', 'To‘liq No Frost', 'Digital Inverter (10y)', '35 dB o‘ta sokin'],
    specifications: {
      volume: '340 litr (228L muzxona + 112L muzlatgich)',
      cooling: 'All-Around Cooling (bir tekis sovitish)',
      compressor: 'Digital Inverter (10 yil rasmiy kafolat)',
      noise: '35 dB',
      dimensions: '185.3 x 59.5 x 65.8 sm'
    },
    pros: [
      'Hech qachon muz qatlamaydi — to‘liq No Frost tizimi',
      'SpaceMax yupqa devor texnologiyasi hisobiga ichki hajm maksimal keng',
      'Digital Inverter kompressori tokni tejaydi va 35 dB da deyarli eshitilmaydi'
    ],
    cons: ['Balandligi 185 sm — xarid qilishdan oldin eshik va joyni o‘lchash lozim']
  },
  {
    id: 'lg-doorcooling-ga-b459',
    brand: 'LG',
    model: 'DoorCooling+ GA-B459CLWL',
    variant: '360 litr / Total No Frost / Smart Inverter',
    category: 'refrigerator',
    categoryGroup: 'maishiy',
    categoryLabel: 'Muzlatgich',
    normalized_name: 'LG DoorCooling+ 360L Muzlatgich (GA-B459CLWL)',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&auto=format&fit=crop&q=80',
    basePrice: 7450000,
    tags: ['lg', 'muzlatgich', 'xolodilnik', 'холодильник', 'doorcooling', 'no frost', 'inverter', '360l', 'maishiy texnika'],
    specHighlights: ['360 L hajm', 'DoorCooling+ paneli', 'Smart Inverter', 'Total No Frost'],
    specifications: {
      volume: '360 litr',
      cooling: 'DoorCooling+ (eshik javonlarini 32% tezroq sovitadi)',
      compressor: 'Smart Inverter',
      noise: '36 dB',
      dimensions: '186 x 59.5 x 68 sm'
    },
    pros: [
      'Eshik ustidagi maxsus havo teshiklari meva va ichimliklarni tezroq yangi saqlaydi',
      'Smart Inverter kompressori 10 yillik kafolatga ega',
      'Zamonaviy grafit-metall rangli zanglamas dizayn'
    ],
    cons: ['Muzlatkich tortmalari to‘liq chiqarilganda eshik 90 gradusdan kengroq ochilishi kerak']
  },
  {
    id: 'artel-hd-345-rnew',
    brand: 'Artel',
    model: 'HD 345 RNEW',
    variant: '260 litr / Tomchilatib eritish / Kumush',
    category: 'refrigerator',
    categoryGroup: 'maishiy',
    categoryLabel: 'Muzlatgich',
    normalized_name: 'Artel HD 345 RNEW 260L Muzlatgich',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&auto=format&fit=crop&q=80',
    basePrice: 3650000,
    tags: ['artel', 'muzlatgich', 'xolodilnik', 'холодильник', 'arzon', '3 mln', '4 mln', '260l', 'maishiy texnika'],
    specHighlights: ['260 L hajm', 'A+ energiya tejamkor', '3 yil to‘liq kafolat', 'Ixcham 166 sm'],
    specifications: {
      volume: '260 litr (207L + 53L)',
      cooling: 'DeFrost (tomchilatib eritish)',
      compressor: 'Standart sokin kompressor',
      noise: '39 dB',
      dimensions: '166 x 55.4 x 60 sm'
    },
    pros: [
      '3.6 mln so‘mga O‘zbekistondagi eng tejamkor va xaridorgir model',
      'Ixcham o‘lcham (166 sm) — kvartira va oshxonalarga juda qulay joylashadi',
      'Artel ning 3 yillik to‘liq bepul servis xizmati'
    ],
    cons: ['No Frost emas (yiliga 1-2 marta muzlatkich qismini eritish talab etiladi)']
  },
  {
    id: 'shivaki-nofrost-bcd310',
    brand: 'Shivaki',
    model: 'BCD-310 No Frost',
    variant: '310 litr / No Frost / Inox po\'lat',
    category: 'refrigerator',
    categoryGroup: 'maishiy',
    categoryLabel: 'Muzlatgich',
    normalized_name: 'Shivaki BCD-310 No Frost 310L Muzlatgich',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&auto=format&fit=crop&q=80',
    basePrice: 4850000,
    tags: ['shivaki', 'muzlatgich', 'xolodilnik', 'no frost', 'nofrost', '5 mln', '310l', 'maishiy texnika'],
    specHighlights: ['310 L hajm', 'To‘liq No Frost', 'A+ energiya sinfi', 'Inox korpus'],
    specifications: {
      volume: '310 litr',
      cooling: 'To‘liq No Frost',
      compressor: 'GMCC kompressor',
      noise: '38 dB',
      dimensions: '178 x 59.5 x 63 sm'
    },
    pros: [
      '5 mln so‘mdan arzon narxda to‘liq No Frost tizimi',
      'Mustahkam Inox po‘lat qoplama va mustahkam shisha tokchalar',
      'Elektr tokidagi o‘zgarishlarga bardoshli'
    ],
    cons: ['LG va Samsung ga nisbatan biroz oddiyroq ichki yoritish']
  },

  // ---------------------------------------------------------------------------
  // 3. KONDITSIONERLAR (Air Conditioners / Inverter)
  // ---------------------------------------------------------------------------
  {
    id: 'gree-fairy-inverter-12',
    brand: 'Gree',
    model: 'Fairy Inverter 12',
    variant: '12 000 BTU / 35-40 m² / G10 Inverter',
    category: 'air_conditioner',
    categoryGroup: 'iqlim',
    categoryLabel: 'Konditsioner',
    normalized_name: 'Gree Fairy Inverter 12 Konditsioner (GWH12ACC)',
    image: 'https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=600&auto=format&fit=crop&q=80',
    basePrice: 5750000,
    tags: ['gree', 'konditsioner', 'кондиционер', 'inverter', '12', 'fairy', 'isitish', 'sovutish', '40 m2', 'iqlim'],
    specHighlights: ['35-40 m² maydon', '12 000 BTU', 'G10 Inverter (A+++)', '-15°C gacha isitish'],
    specifications: {
      coolingArea: '35-40 m²',
      capacity: '12 000 BTU/soat',
      inverter: 'G10 Inverter (A+++ sinfi)',
      temperatureRange: '-15°C dan +43°C gacha',
      noise: '24 dB (tungi rejim)'
    },
    pros: [
      'Gree ning afsonaviy G10 Inverteri — tokni 50% gacha tejaydi va 10+ yil xizmat qiladi',
      'Qishda -15°C sovuqda ham uyni bemalol isitish quvvatiga ega',
      'O‘zbekiston iqlimining 45°C jaziramasida ham sovutish quvvatini yo‘qotmaydi'
    ],
    cons: ['O‘rnatish xarajati alohida to‘lanadi']
  },
  {
    id: 'artel-grand-inverter-12',
    brand: 'Artel',
    model: 'Grand Inverter 12',
    variant: '12 000 BTU / 30-35 m² / Wi-Fi Smart',
    category: 'air_conditioner',
    categoryGroup: 'iqlim',
    categoryLabel: 'Konditsioner',
    normalized_name: 'Artel Grand Inverter 12 Konditsioner (ART-12HG)',
    image: 'https://images.unsplash.com/photo-1614633833026-0e1f76e74ef1?w=600&auto=format&fit=crop&q=80',
    basePrice: 4450000,
    tags: ['artel', 'konditsioner', 'кондиционер', 'inverter', '12', 'grand', 'arzon', '4 mln', '5 mln', 'iqlim'],
    specHighlights: ['30-35 m²', '12 000 BTU', 'Inverter texnologiya', '3 yil to‘liq kafolat'],
    specifications: {
      coolingArea: '30-35 m²',
      capacity: '12 000 BTU',
      compressor: 'GMCC Toshiba kompressor',
      noise: '26 dB',
      warranty: '3 yil kafolat'
    },
    pros: [
      'Narx/unumdorlik nisbati bo‘yicha eng xaridorgir inverter konditsioner',
      'Artel servis tarmog‘i respublika bo‘yicha barcha tumanlarda mavjud',
      'Past kuchlanishda (160V gacha) ham o‘chmasdan ishlay oladi'
    ],
    cons: ['Gree ga qaraganda tashqi blok biroz kattaroq']
  },
  {
    id: 'midea-mission-pro-12',
    brand: 'Midea',
    model: 'Mission Pro Inverter 12',
    variant: '12 000 BTU / 35-40 m² / Full DC Inverter',
    category: 'air_conditioner',
    categoryGroup: 'iqlim',
    categoryLabel: 'Konditsioner',
    normalized_name: 'Midea Mission Pro 12 Inverter Konditsioner',
    image: 'https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=600&auto=format&fit=crop&q=80',
    basePrice: 5200000,
    tags: ['midea', 'konditsioner', 'кондиционер', 'inverter', '12', 'mission pro', 'sovutish', 'iqlim'],
    specHighlights: ['35-40 m²', '12 000 BTU', 'Full DC Inverter', '21.5 dB o‘ta sokin'],
    specifications: {
      coolingArea: '35-40 m²',
      capacity: '12 000 BTU',
      inverter: 'Full DC Inverter Quattro',
      noise: '21.5 dB',
      filter: 'Yuqori zichlikdagi chang va ion filtri'
    },
    pros: [
      '21.5 dB shovqin darajasi bilan yotoqxona uchun eng sokin konditsioner',
      'I-Clean funksiyasi ichki blokni muzlatib-eritib avtomatik tozalaydi',
      'Wi-Fi orqali smartfondan masofadan boshqarish imkoniyati'
    ],
    cons: ['Wi-Fi modulini ba\'zi modellarda alohida ulash kerak']
  },
  {
    id: 'aux-j-smart-18',
    brand: 'Aux',
    model: 'J-Smart Inverter 18',
    variant: '18 000 BTU / 50-60 m² / Katta zallar uchun',
    category: 'air_conditioner',
    categoryGroup: 'iqlim',
    categoryLabel: 'Konditsioner',
    normalized_name: 'Aux J-Smart Inverter 18 Konditsioner (50-60 m²)',
    image: 'https://images.unsplash.com/photo-1614633833026-0e1f76e74ef1?w=600&auto=format&fit=crop&q=80',
    basePrice: 7650000,
    tags: ['aux', 'konditsioner', 'кондиционер', 'inverter', '18', 'katta zal', '60 m2', 'iqlim'],
    specHighlights: ['50-60 m² katta maydon', '18 000 BTU', 'DC Inverter', '4D havo oqimi'],
    specifications: {
      coolingArea: '50-60 m²',
      capacity: '18 000 BTU',
      inverter: 'DC Inverter',
      noise: '28 dB',
      airFlow: '4D avtomatik havo taqsimlash'
    },
    pros: [
      'Katta mehmonxonalar, hovli zallari yoki ofislar (60 m²) uchun yuqori quvvat',
      '4D havo oqimi xonaning hamma burchagiga sovuqni bir tekis yetkazadi',
      'Tezkor Turbo sovitish rejimi'
    ],
    cons: ['Tashqi blok og‘ir (35 kg), mustahkam kranstayn talab qiladi']
  },

  // ---------------------------------------------------------------------------
  // 4. CHANGYUTGICHLAR & ROBOTLAR (Vacuum Cleaners)
  // ---------------------------------------------------------------------------
  {
    id: 'dreame-bot-l10s-ultra',
    brand: 'Dreame',
    model: 'Bot L10s Ultra',
    variant: '5300 Pa / Avtomatik yuvish & quritish stansiyasi',
    category: 'vacuum',
    categoryGroup: 'maishiy',
    categoryLabel: 'Robot changyutgich',
    normalized_name: 'Dreame Bot L10s Ultra Robot changyutgich',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    basePrice: 8950000,
    tags: ['dreame', 'robot', 'changyutgich', 'пылесос', 'робот пылесос', 'nam tozalash', 'stansiya', 'maishiy texnika'],
    specHighlights: ['5300 Pa kuchli so‘rish', 'Avto-yuvish stansiyasi', 'AI 3D to‘siq aylanuv', '5200 mAh batareya'],
    specifications: {
      suction: '5300 Pa',
      navigation: 'LIDAR + AI RGB 3D kamera',
      station: 'Chiqindini tortish, lattani yuvish va issiq havo bilan quritish',
      battery: '5200 mAh (210 daqiqa)',
      waterTank: '2.5L toza suv + 2.4L kir suv baki'
    },
    pros: [
      'To‘liq avtonom: o‘zi changni to‘kadi, o‘zi lattasini yuvadi va mog‘or bosmasligi uchun quritadi',
      '5300 Pa quvvat gilamlardagi barcha mayda zarralarni tortib oladi',
      'Polga tushib qolgan simlar va poyabzallarni sun\'iy intellekt kamerasi bilan aylanib o‘tadi'
    ],
    cons: ['Stansiyasi katta o‘lchamda, oshxona yoki koridorda joy talab qiladi']
  },
  {
    id: 'xiaomi-robot-x10-plus',
    brand: 'Xiaomi',
    model: 'Robot Vacuum X10+',
    variant: '4000 Pa / O\'zi changni bo\'shatuvchi stansiya',
    category: 'vacuum',
    categoryGroup: 'maishiy',
    categoryLabel: 'Robot changyutgich',
    normalized_name: 'Xiaomi Robot Vacuum X10+ Aqlli changyutgich',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    basePrice: 6800000,
    tags: ['xiaomi', 'robot', 'changyutgich', 'пылесос', 'x10+', 'nam tozalash', 'mi home', 'maishiy texnika'],
    specHighlights: ['4000 Pa tortish', 'Avto chang bo‘shatish', 'S-Cross 3D sensor', 'Mi Home boshqaruv'],
    specifications: {
      suction: '4000 Pa',
      navigation: 'LDS lazerli xaritalash',
      battery: '5200 mAh',
      station: 'Ko‘p funksiyali avto-stansiya',
      app: 'Mi Home ilovasi (O‘zbek tilida qulay)'
    },
    pros: [
      'Gilamga chiqqanda namlagich lattalarini avtomatik 7mm yuqoriga ko‘taradi',
      'Mi Home ekotizimida xona bo‘yicha tozalash jadvallarini oson sozlash',
      'Narxi flagman raqobatchilardan 2-3 mln so‘m arzonroq'
    ],
    cons: ['Lattalarni quritish L10s ga nisbatan 1 soat ko‘proq vaqt oladi']
  },
  {
    id: 'dyson-v12-detect-slim',
    brand: 'Dyson',
    model: 'V12 Detect Slim Total Clean',
    variant: '150 AW / Lazerli chang yoritgich / 2.2 kg',
    category: 'vacuum',
    categoryGroup: 'maishiy',
    categoryLabel: 'Simsiz changyutgich',
    normalized_name: 'Dyson V12 Detect Slim Simsiz changyutgich',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80',
    basePrice: 8400000,
    tags: ['dyson', 'changyutgich', 'пылесос', 'v12', 'simsiz', 'vertikal', 'lazer', 'premium', 'maishiy texnika'],
    specHighlights: ['150 AW so‘rish', 'Lazer chang yoritgich', '2.2 kg o‘ta yengil', '60 daq batareya'],
    specifications: {
      suction: '150 Air Watts',
      weight: '2.2 kg',
      laser: 'Fluffy Optic yashil lazer nuri',
      filtration: '99.99% mikroskopik zarralarni ushlab qoluvchi filtr',
      battery: '60 daqiqa uzluksiz'
    },
    pros: [
      'Maxsus yashil lazer nuri ko‘zga ko‘rinmaydigan mikro-changlarni yaqqol ko‘rsatadi',
      '2.2 kg og‘irlik — bir qo‘l bilan shiftlar va pardalarni ham bemalol tozalash mumkin',
      'Piezo-sensor chang miqdorini tahlil qilib, quvvatni avtomatik oshiradi'
    ],
    cons: ['Chiqindi idishi 0.35L (katta xonadonlarda tez-tez bo‘shatish kerak)']
  },
  {
    id: 'samsung-jet-75-pet',
    brand: 'Samsung',
    model: 'Jet 75 Pet (VS20T7538T5)',
    variant: '200W / Simsiz vertikal / Hayvon juni turbo cho\'tka',
    category: 'vacuum',
    categoryGroup: 'maishiy',
    categoryLabel: 'Simsiz changyutgich',
    normalized_name: 'Samsung Jet 75 Pet Simsiz Changyutgich (200W)',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80',
    basePrice: 4650000,
    tags: ['samsung', 'changyutgich', 'пылесос', 'jet 75', 'simsiz', 'hayvon juni', '5 mln', 'maishiy texnika'],
    specHighlights: ['200W so‘rish', '99.999% HEPA filtr', '60 daq batareya', 'Pet turbo cho‘tka'],
    specifications: {
      suction: '200W kuchli so‘rish',
      filtration: '5 bosqichli HEPA filtr',
      weight: '2.7 kg',
      battery: '60 daqiqa (almashtiriluvchi akkumulyator)',
      attachments: 'Pet Tool, Soft Action Brush'
    },
    pros: [
      '200W juda kuchli tortish quvvati — gilam tagidagi qumlarni ham chiqaradi',
      'Pet Tool cho‘tkasi mushuk va it junlarini o‘ralib qolmasdan yig‘adi',
      'Akkumulyatori yechiladi va alohida quvvatlanishi mumkin'
    ],
    cons: ['Maksimal quvvat rejimida batareya 10 daqiqaga yetadi']
  },

  // ---------------------------------------------------------------------------
  // 5. OSHXONA TEXNIKASI & DUXOVKALAR & KICHIK MAISHIY
  // ---------------------------------------------------------------------------
  {
    id: 'philips-airfryer-xxl-hd9650',
    brand: 'Philips',
    model: 'Airfryer XXL HD9650',
    variant: '7.3 litr (1.4 kg go\'sht) / 2225W / Twin TurboStar',
    category: 'kitchen',
    categoryGroup: 'oshxona',
    categoryLabel: 'Aerogrill / Airfryer',
    normalized_name: 'Philips Airfryer XXL HD9650 Yog\'siz Qovurgich',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&auto=format&fit=crop&q=80',
    basePrice: 3450000,
    tags: ['philips', 'airfryer', 'aerogrill', 'aerogrill', 'yog\'siz qovurish', 'frityurnitsa', '3 mln', 'oshxona'],
    specHighlights: ['7.3 L XXL hajm', '2225 W quvvat', '90% kam yog\'', 'Twin TurboStar'],
    specifications: {
      capacity: '7.3 litr (butun tovuq yoki 1.4 kg kartoshka fri)',
      power: '2225 W',
      technology: 'Twin TurboStar yog\'ni ajratish tizimi',
      control: 'QuickControl raqamli displey'
    },
    pros: [
      'Yog‘ ishlatmasdan qarsildoq tovuq, fri va go‘sht pishirish imkoniyati',
      'Ortiqcha yog‘ni pastdagi maxsus idishga ajratib tashlaydi (sog‘lom taom)',
      'Butun bir katta oila uchun XXL hajm (7.3 litr)'
    ],
    cons: ['Oshxona stolida ancha joy egallaydi']
  },
  {
    id: 'delonghi-magnifica-s-ecam22',
    brand: 'DeLonghi',
    model: 'Magnifica S ECAM 22.110',
    variant: '15 bar / Donali kofe tegirmoni / Kapuchinator',
    category: 'kitchen',
    categoryGroup: 'oshxona',
    categoryLabel: 'Kofemashina',
    normalized_name: 'DeLonghi Magnifica S Avtomatik Kofemashina',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&auto=format&fit=crop&q=80',
    basePrice: 5850000,
    tags: ['delonghi', 'kofemashina', 'kofe mashinasi', 'кофемашина', 'espresso', 'cappuccino', 'donali kofe', 'oshxona'],
    specHighlights: ['15 bar Italiya bosimi', 'Donali kofe maydalash', 'Kapuchinator', 'Italiya brendi'],
    specifications: {
      pressure: '15 bar',
      grinder: '13 xil maydalash darajasiga ega po\'lat tegirmon',
      waterTank: '1.8 litr',
      milkFrother: 'Klassik qo\'lda kapuchinator'
    },
    pros: [
      'Kofexonalardagidek xushbo‘y espresso va qalin sutli ko‘pikli kapuchino',
      'Yuviluvchi va olinuvchi press guruhi — xizmat ko‘rsatish juda oddiy',
      'Italiya sifat standarti va yillar davomida isbotlangan ishonchlilik'
    ],
    cons: ['Kapuchino uchun sutni naycha orqali qo‘lda ko‘pirtirish kerak']
  },
  {
    id: 'tefal-optigrill-elite',
    brand: 'Tefal',
    model: 'OptiGrill Elite GC750D',
    variant: '2000W / Avtomatik go\'sht qalinligini o\'lchash',
    category: 'kitchen',
    categoryGroup: 'oshxona',
    categoryLabel: 'Elektr grill',
    normalized_name: 'Tefal OptiGrill Elite Elektr grill (GC750D)',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
    basePrice: 3190000,
    tags: ['tefal', 'optigrill', 'grill', 'электрогриль', 'go\'sht pishirish', 'steak', '3 mln', 'oshxona'],
    specHighlights: ['2000 W quvvat', '12 ta avto-dastur', 'Sensorli qovurish', 'Olinuvchi plitalar'],
    specifications: {
      power: '2000 W',
      programs: '12 xil taom dasturi (steyk, tovuq, baliq, burger, sabzavot)',
      sensors: 'Go\'sht qalinligi va miqdorini aniqlovchi sensor',
      plates: 'Idish yuvish mashinasida yuviluvchi yopishmas plitalar'
    },
    pros: [
      'Steyk pishirish darajasini (Rare, Medium, Well-done) o‘zi hisoblab ogohlantiradi',
      'Plitalari oson yechiladi va idish yuvish mashinasida yuviladi',
      'Oshxonada tutunsiz go‘sht va kabob tayyorlash imkoni'
    ],
    cons: ['Elektr simi biroz qisqa (0.8 m)']
  },
  {
    id: 'samsung-microwave-ms23',
    brand: 'Samsung',
    model: 'MS23K3513AS',
    variant: '23 litr / 800W / Biokeramika qoplama',
    category: 'kitchen',
    categoryGroup: 'oshxona',
    categoryLabel: 'Mikroto\'lqinli pech',
    normalized_name: 'Samsung Solo 23L Mikroto\'lqinli pech (MS23K3513AS)',
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&auto=format&fit=crop&q=80',
    basePrice: 1490000,
    tags: ['samsung', 'mikroto\'lqinli pech', 'mikrovolnovka', 'микроволновка', 'pech', '23l', 'arzon', '1 mln', '2 mln', 'oshxona'],
    specHighlights: ['23 L hajm', 'Biokeramika qoplama', 'Quick Defrost eritish', '800 W quvvat'],
    specifications: {
      volume: '23 litr',
      power: '800 W',
      coating: 'Biokeramik emal (tirnalmaydi, 10 yil kafolat)',
      defrost: 'Quick Defrost avto-eritish'
    },
    pros: [
      'Biokeramik ichki devorlar yog‘ni shimib olmaydi va oson artiladi',
      'Ovqatni bir tekis qizdiruvchi uch o‘lchamli to‘lqinlar',
      'Hidsizlantirish (Deodorization) funksiyasi'
    ],
    cons: ['Grill funksiyasi yo‘q (faqat solo isitish va pishirish)']
  },
  {
    id: 'artel-milagro-02-e',
    brand: 'Artel',
    model: 'Milagro 02-E',
    variant: '4 gaz konforka + Elektr duxovka (65L) / Inox',
    category: 'kitchen',
    categoryGroup: 'oshxona',
    categoryLabel: 'Gaz plita & Duxovka',
    normalized_name: 'Artel Milagro 02-E Gaz plita va Duxovka',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80',
    basePrice: 3250000,
    tags: ['artel', 'gaz plita', 'plita', 'газовая плита', 'duxovka', 'milagro', '3 mln', 'oshxona'],
    specHighlights: ['4 gaz konforka', '65 L elektr duxovka', 'Gaz-kontrol', '3 yil to‘liq kafolat'],
    specifications: {
      burners: '4 gaz konforka (elektr o\'t oldirish)',
      oven: '65L elektr duxovka konveksiya va grill bilan',
      safety: 'Gaz-kontrol to\'liq xavfsizlik',
      warranty: '3 yil kafolat'
    },
    pros: [
      'Kombinatsiyalangan qulaylik: gazda tez qaynash + elektr duxovkada bir tekis pishirish',
      'Gaz o‘chib qolsa avtomatik to‘xtatuvchi Gaz-kontrol tizimi',
      '65 litr katta duxovkada pirog va somsalarni qizartirib pishiradi'
    ],
    cons: ['Elektr duxovka uchun alohida yerga ulangan soket kerak']
  },
  {
    id: 'philips-perfectcare-psg7030',
    brand: 'Philips',
    model: 'PerfectCare Compact PSG7030',
    variant: '8 bar / 600g bug\' zarbasi / OptimalTEMP',
    category: 'iron',
    categoryGroup: 'maishiy',
    categoryLabel: 'Parogeneratorli dazmol',
    normalized_name: 'Philips PerfectCare PSG7030 Parogeneratorli Dazmol',
    image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&auto=format&fit=crop&q=80',
    basePrice: 3890000,
    tags: ['philips', 'dazmol', 'par generator', 'утюг', 'парогенератор', 'steam', 'optimaltemp', 'maishiy texnika'],
    specHighlights: ['8 bar bug\' bosimi', '600g bug\' zarbasi', 'OptimalTEMP (kuydirmaydi)', '1.8L katta bak'],
    specifications: {
      pressure: '8 bar bug\' bosimi',
      steamBoost: '600 g/daq bug\' zarbasi',
      tech: 'OptimalTEMP harorat sozlashsiz barcha matolar uchun',
      waterTank: '1.8 litr olinuvchi suv idishi'
    },
    pros: [
      'Hech qachon kiyimni kuydirmaydi: ipakdan tortib jinsigacha harorat sozlamasdan dazmollaydi',
      '8 bar yuqori bosimli bug‘ orqali bir harakatda qat-qat kiyimlarni tekislaydi',
      'Vertikal bug‘lash (pardalar va kostyumlarni osilgan holatda dazmollash)'
    ],
    cons: ['Oddiy dazmoldan kattaroq stansiya o‘lchami']
  },

  // ---------------------------------------------------------------------------
  // 6. TELEVIZORLAR, AUDIO & O'YIN KONSOLLARI (TV, Audio & Gaming)
  // ---------------------------------------------------------------------------
  {
    id: 'samsung-55-crystal-uhd',
    brand: 'Samsung',
    model: '55CU7100 Crystal UHD',
    variant: '55 dyuym (140 sm) / 4K UHD / Tizen Smart TV',
    category: 'tv',
    categoryGroup: 'tv_audio',
    categoryLabel: 'Smart Televizor',
    normalized_name: 'Samsung 55" Crystal UHD 4K Smart TV (55CU7100)',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
    basePrice: 6190000,
    tags: ['samsung', 'televizor', 'tv', 'телевизор', '55', '55 dyuym', '4k', 'smart tv', 'crystal uhd', 'tizen'],
    specHighlights: ['55" 4K UHD ekran', 'Tizen Smart TV', 'HDR10+ yorqin rang', 'Slim ramkasiz dizayn'],
    specifications: {
      screen: '55 dyuym (140 sm), 4K UHD (3840x2160)',
      os: 'Tizen OS (YouTube, Netflix, Allplay, ITV)',
      processor: 'Crystal Processor 4K',
      sound: '20W Dolby Digital Plus, Q-Symphony',
      ports: '3x HDMI, 1x USB, Wi-Fi 5, Bluetooth'
    },
    pros: [
      '55 dyuym katta o‘lcham va Crystal 4K tiniq ranglar',
      'Tizen OS juda tezkor ishlaydi, mahalliy O‘zbekiston ilovalari (Allplay, ITV) mavjud',
      'Yupqa metall uslubidagi ramkasiz korpus'
    ],
    cons: ['Ekran yangilanish tezligi 60Hz']
  },
  {
    id: 'lg-55-oled-c3',
    brand: 'LG',
    model: 'OLED55C3',
    variant: '55 dyuym 4K OLED evo / 120Hz / G-Sync',
    category: 'tv',
    categoryGroup: 'tv_audio',
    categoryLabel: 'Premium OLED TV',
    normalized_name: 'LG 55" OLED 4K 120Hz Smart TV (OLED55C3)',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop&q=80',
    basePrice: 16800000,
    tags: ['lg', 'oled', 'televizor', 'tv', 'телевизор', '55', '120hz', 'c3', 'ps5 tv', 'premium'],
    specHighlights: ['55" 4K OLED evo', '120Hz / G-Sync Gaming', 'Dolby Atmos 40W', 'alpha 9 Gen6 AI chip'],
    specifications: {
      screen: '55" OLED evo (cheksiz kontrast, haqiqiy qora rang)',
      refreshRate: '120Hz, VRR, AMD FreeSync, G-Sync',
      processor: 'alpha 9 Gen6 AI Processor 4K',
      sound: '40W 2.2 kanal Dolby Atmos'
    },
    pros: [
      'Dunyodagi eng yaxshi tasvir sifati: o‘zini o‘zi yorituvchi piksellar va cheksiz kontrast',
      'PlayStation 5 va Xbox uchun ideal: 120 FPS, 0.1ms tezkor javob va 4x HDMI 2.1',
      'Dolby Vision va Dolby Atmos kinoteatr darajasidagi audio-vizual zavq'
    ],
    cons: ['Premium yuqori narx']
  },
  {
    id: 'xiaomi-tv-a-pro-55',
    brand: 'Xiaomi',
    model: 'TV A Pro 55"',
    variant: '55 dyuym 4K QLED / Google TV / Metall ramka',
    category: 'tv',
    categoryGroup: 'tv_audio',
    categoryLabel: 'Smart Televizor',
    normalized_name: 'Xiaomi TV A Pro 55" 4K QLED Google TV',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
    basePrice: 4890000,
    tags: ['xiaomi', 'televizor', 'tv', 'телевизор', '55', '4k', 'google tv', 'qled', 'arzon tv', '5 mln'],
    specHighlights: ['55" 4K QLED', 'Google TV + Ovozli boshqaruv', 'Dolby Audio 24W', 'Metall korpus'],
    specifications: {
      screen: '55" 4K UHD QLED (1.07 milliard rang)',
      os: 'Google TV (Google Assistant ovozli pult bilan)',
      sound: '24W (2x12W) Dolby Audio va DTS:X',
      design: 'Metall yupqa ramka'
    },
    pros: [
      '5 mln so‘mdan arzon narxda 55 dyuymli haqiqiy 4K QLED displey',
      'Google TV orqali xohlagan APK dastur va o‘yinlarni o‘rnatish imkoniyati',
      'Mikrofonli pult orqali o‘zbek va rus tillarida ovoz bilan qidirish'
    ],
    cons: ['O‘rnatilgan xotira 16GB (og‘ir ilovalarda to‘lib qolishi mumkin)']
  },
  {
    id: 'artel-43-smart-android',
    brand: 'Artel',
    model: '43AF9000',
    variant: '43 dyuym / Full HD / Android TV',
    category: 'tv',
    categoryGroup: 'tv_audio',
    categoryLabel: 'Smart Televizor',
    normalized_name: 'Artel 43" Full HD Smart Android TV (43AF9000)',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
    basePrice: 2950000,
    tags: ['artel', 'televizor', 'tv', 'телевизор', '43', 'android tv', 'arzon', '3 mln'],
    specHighlights: ['43" Full HD', 'Android TV rasmiy', '3 yil to‘liq kafolat', '3 mln dan arzon'],
    specifications: {
      screen: '43 dyuym (109 sm) Full HD (1920x1080)',
      os: 'Android TV rasmiy Google Play bilan',
      sound: '2x 8W stereo',
      tuner: 'DVB-T2/C/S2 efir va kabel tyuneri'
    },
    pros: [
      '3 mln so‘mdan arzon narxga 43 dyuymli sifatli Android Smart TV',
      'Artel ning 3 yillik to‘liq kafolati',
      'YouTube va mahalliy telekanallarni bemalol ko‘rish'
    ],
    cons: ['4K emas, Full HD piksellar']
  },
  {
    id: 'sony-ps5-slim-1tb',
    brand: 'Sony',
    model: 'PlayStation 5 Slim',
    variant: '1TB SSD / Ultra HD Blu-Ray Diskli versiya',
    category: 'gaming',
    categoryGroup: 'tv_audio',
    categoryLabel: 'O\'yin konsoli',
    normalized_name: 'Sony PlayStation 5 Slim 1TB (Blu-Ray Diskli)',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop&q=80',
    basePrice: 6990000,
    tags: ['ps5', 'playstation', 'playstation 5', 'sony', 'konsol', 'o\'yin', 'gaming', 'slim', '1tb', 'disk'],
    specHighlights: ['1TB SSD ultra-tezkor', '4K 120Hz Ray Tracing', 'DualSense pult', 'Diskli Slim versiya'],
    specifications: {
      storage: '1TB Custom NVMe SSD (5.5 GB/s)',
      graphics: 'AMD RDNA 2 (10.28 TFLOPs), 4K 120Hz & 8K',
      controller: 'DualSense Haptic Feedback & Adaptive Triggers',
      drive: 'Ultra HD Blu-ray diskli'
    },
    pros: [
      'Haqiqiy 4K 60/120 FPS geyming va Ray Tracing nur effektlari',
      'DualSense pulti o‘yindagi yomg‘ir, zarba va tortishishlarni qo‘lda his qildiradi',
      'Diskli versiya: do‘stlar bilan disk almashish yoki sotib olish oson'
    ],
    cons: ['Eksklyuziv o‘yinlar narxi qimmat']
  },
  {
    id: 'apple-airpods-pro-2',
    brand: 'Apple',
    model: 'AirPods Pro 2',
    variant: 'Type-C / 2x kuchli ANC / MagSafe keys',
    category: 'audio',
    categoryGroup: 'tv_audio',
    categoryLabel: 'Simsiz quloqchin',
    normalized_name: 'Apple AirPods Pro 2 (USB-C MagSafe)',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80',
    basePrice: 2990000,
    tags: ['airpods', 'airpods pro', 'apple', 'quloqchin', 'naushnik', 'наушники', 'anc', 'shovqinsiz', '3 mln'],
    specHighlights: ['Apple H2 chip', '2x kuchli ANC shovqinsiz', '30 soat avtonomlik', 'USB-C MagSafe'],
    specifications: {
      chip: 'Apple H2 chip',
      anc: 'Faol shovqin bostirish (Active Noise Cancellation)',
      battery: '6 soat (keys bilan 30 soatgacha)',
      charging: 'USB-C va MagSafe simsiz quvvatlash'
    },
    pros: [
      'Ko‘cha va transport shovqinini butunlay yo‘qotuvchi faol shovqin bostirish',
      'Moslashuvchan audio (Adaptive Audio) atrofdagi ovozga qarab o‘zi sozlanadi',
      'Apple qurilmalari o‘rtasida bir zumda uzluksiz o‘tish'
    ],
    cons: ['Android qurilmalarda ba\'zi maxsus funksiyalari cheklangan']
  },
  {
    id: 'sony-wh-1000xm5',
    brand: 'Sony',
    model: 'WH-1000XM5',
    variant: '8 mikrofonli ANC / 30 soat musiqa / Hi-Res LDAC',
    category: 'audio',
    categoryGroup: 'tv_audio',
    categoryLabel: 'Simsiz quloqchin',
    normalized_name: 'Sony WH-1000XM5 Shovqinsiz Simsiz Quloqchin',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    basePrice: 4650000,
    tags: ['sony', 'wh1000xm5', 'naushnik', 'quloqchin', 'shovqin bostirish', 'anc', 'hi-res', 'musiqa', '5 mln'],
    specHighlights: ['Jahon yetakchisi ANC', '30 soat batareya', 'LDAC Hi-Res audio', '8 ta mikrofon'],
    specifications: {
      anc: 'Ikkita protsessor va 8 ta mikrofonli Auto NC Optimizer',
      battery: '30 soat (3 daqiqa zaryad = 3 soat ijro)',
      codecs: 'LDAC, AAC, SBC (Hi-Res Audio Wireless)',
      weight: '250 g yengil'
    },
    pros: [
      'Samolyot va poezd shovqinini ham butunlay to‘suvchi dunyodagi eng kuchli ANC',
      '30 soatlik ulkan batareya — haftasiga 1 marta zaryadlash yetarli',
      'Yumshoq charm yostiqchalari bilan kun bo‘yi boshni qisib qo‘ymaydi'
    ],
    cons: ['Korpusi avvalgi XM4 kabi buklanmaydi']
  },

  // ---------------------------------------------------------------------------
  // 7. NOUTBUKLAR, KOMPYUTERLAR & PLANSHETLAR (Laptops & Tablets)
  // ---------------------------------------------------------------------------
  {
    id: 'apple-macbook-air-m2',
    brand: 'Apple',
    model: 'MacBook Air 13" M2',
    variant: '8GB / 256GB SSD / Midnight',
    category: 'laptop',
    categoryGroup: 'noutbuk',
    categoryLabel: 'Noutbuk',
    normalized_name: 'Apple MacBook Air 13" M2 (8GB / 256GB)',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    basePrice: 12200000,
    tags: ['macbook', 'apple', 'm2', 'noutbuk', 'laptop', 'dasturlash', 'talaba', 'ofis'],
    specHighlights: ['Apple M2 chip', '18 soat batareya', '13.6" Liquid Retina', '1.24 kg o‘ta yengil'],
    specifications: {
      cpu: 'Apple M2 (8 yadro CPU, 8 yadro GPU)',
      ram: '8 GB birlashtirilgan xotira',
      storage: '256 GB SSD',
      screen: '13.6" Liquid Retina (2560x1664), 500 nits',
      battery: '18 soatgacha avtonom ish'
    },
    pros: [
      '18 soatgacha zaryadsiz ishlaydi — butun kun zaryadnikni uyda qoldirish mumkin',
      'Ventilyatorsiz mutlaqo jim ishlaydi va qizimaydi',
      'Dasturlash, dizayn va talabalar uchun eng likvid yengil noutbuk'
    ],
    cons: ['8GB RAM (katta hajmli og‘ir 3D loyihalar uchun 16GB varianti ma\'qul)']
  },
  {
    id: 'asus-tuf-gaming-a15',
    brand: 'Asus',
    model: 'TUF Gaming A15',
    variant: 'Ryzen 7 7735HS / RTX 4060 / 16GB / 512GB SSD',
    category: 'laptop',
    categoryGroup: 'noutbuk',
    categoryLabel: 'Geymer Noutbuki',
    normalized_name: 'Asus TUF Gaming A15 (RTX 4060 / Ryzen 7 / 16GB)',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80',
    basePrice: 12450000,
    tags: ['asus', 'tuf', 'gaming', 'o\'yin noutbuk', 'rtx 4060', 'ryzen 7', '144hz', 'pubg', 'render', 'noutbuk'],
    specHighlights: ['GeForce RTX 4060 8GB', 'Ryzen 7 7735HS', '144Hz IPS ekran', '16GB DDR5 RAM'],
    specifications: {
      cpu: 'AMD Ryzen 7 7735HS (8 yadro / 16 potok, 4.75 GHz)',
      gpu: 'NVIDIA GeForce RTX 4060 (8GB GDDR6, 140W TGP)',
      ram: '16 GB DDR5 4800MHz',
      storage: '512 GB PCIe 4.0 NVMe SSD',
      screen: '15.6" Full HD IPS, 144Hz, G-Sync'
    },
    pros: [
      'RTX 4060 140W videokarta barcha zamonaviy o‘yinlarni Ultra grafikada yurgazadi',
      'Harbiy darajadagi MIL-STD-810H zarbaga chidamli korpus',
      '3D grafika, video montaj va arxitektura dasturlari (AutoCAD, 3ds Max) uchun ajoyib'
    ],
    cons: ['Og‘irligi 2.2 kg va zaryadlash bloki katta']
  },
  {
    id: 'acer-aspire-lite-15',
    brand: 'Acer',
    model: 'Aspire Lite 15',
    variant: 'Ryzen 5 5500U / 16GB / 512GB SSD',
    category: 'laptop',
    categoryGroup: 'noutbuk',
    categoryLabel: 'O\'qish & Ofis Noutbuki',
    normalized_name: 'Acer Aspire Lite 15 (Ryzen 5 / 16GB / 512GB)',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80',
    basePrice: 6390000,
    tags: ['acer', 'noutbuk', 'laptop', 'ryzen', '16gb', 'dasturlash', 'talaba', '7 mln', '6 mln'],
    specHighlights: ['16GB DDR4 RAM', 'Ryzen 5 (6 yadro)', '512GB SSD', '1.59 kg yengil'],
    specifications: {
      cpu: 'AMD Ryzen 5 5500U (6 yadro / 12 potok)',
      ram: '16 GB DDR4',
      storage: '512 GB NVMe SSD',
      screen: '15.6" IPS Full HD',
      battery: '48 Wh (6-8 soat)'
    },
    pros: [
      '6.4 mln so‘mga 16GB RAM — ko‘plab ilovalarda qotmasdan ishlaydi',
      'Ryzen 5 6 yadroli tezkor chip dasturlash va ofis ishlari uchun yetarli',
      '1.59 kg yengil korpus o‘qishga olib yurish uchun qulay'
    ],
    cons: ['Diskret videokartasi yo‘q (og‘ir 3D o‘yinlar uchun emas)']
  },
  {
    id: 'apple-ipad-air-m2',
    brand: 'Apple',
    model: 'iPad Air 11" M2',
    variant: '128GB Wi-Fi / Apple M2 chip',
    category: 'tablet',
    categoryGroup: 'noutbuk',
    categoryLabel: 'Planshet',
    normalized_name: 'Apple iPad Air 11" M2 (128GB Wi-Fi)',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
    basePrice: 8200000,
    tags: ['ipad', 'ipad air', 'apple', 'planshet', 'm2', 'chizish', 'talaba', 'dars', 'apple pencil'],
    specHighlights: ['Apple M2 chip', '11" Liquid Retina', 'Apple Pencil Pro qo‘llash', '128GB xotira'],
    specifications: {
      cpu: 'Apple M2 (8 yadro CPU, 9 yadro GPU)',
      screen: '11" Liquid Retina, 500 nits, True Tone',
      storage: '128 GB',
      cameras: '12 MP old va 12 MP orqa kameralar',
      weight: '462 g'
    },
    pros: [
      'MacBook darajasidagi M2 chipi bilan barcha grafik va o‘quv vazifalarni bajaradi',
      'Apple Pencil Pro orqali professional rasm chizish va konspekt yozish',
      'Yengil va ingichka alyuminiy korpus'
    ],
    cons: ['Apple Pencil va klaviatura alohida sotiladi']
  },
  {
    id: 'xiaomi-pad-6',
    brand: 'Xiaomi',
    model: 'Pad 6',
    variant: '8GB / 256GB / 144Hz WQHD+ Ekran',
    category: 'tablet',
    categoryGroup: 'noutbuk',
    categoryLabel: 'Planshet',
    normalized_name: 'Xiaomi Pad 6 (8/256GB, 144Hz WQHD+)',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
    basePrice: 4150000,
    tags: ['xiaomi', 'pad 6', 'planshet', '144hz', 'film', 'o\'qish', 'o\'yin', '4 mln'],
    specHighlights: ['144Hz 2.8K ekran', 'Snapdragon 870', '8840 mAh mega-batareya', '8/256GB xotira'],
    specifications: {
      cpu: 'Snapdragon 870 (7nm flagman chip)',
      screen: '11" WQHD+ (2880x1800), 144Hz, Dolby Vision',
      ram: '8 GB LPDDR5',
      storage: '256 GB UFS 3.1',
      battery: '8840 mAh (33W tezkor quvvat)'
    },
    pros: [
      '4.1 mln so‘mga ajoyib 144Hz tiniq 2.8K ekran — filmlar va o‘yinlar uchun mukammal',
      '4 ta Dolby Atmos karnaylari bilan kinoteatrdek ovoz',
      '8840 mAh quvvat bilan 2 kungacha avtonom ishlaydi'
    ],
    cons: ['SIM-karta uyasi yo‘q (faqat Wi-Fi orqali ishlaydi)']
  },

  // ---------------------------------------------------------------------------
  // 8. SMARTFONLAR & GADJETLAR (Smartphones & Wearables)
  // ---------------------------------------------------------------------------
  {
    id: 'apple-iphone-16-pro-max',
    brand: 'Apple',
    model: 'iPhone 16 Pro Max',
    variant: '256GB Desert Titanium',
    category: 'smartphone',
    categoryGroup: 'smartfon',
    categoryLabel: 'Flagman Smartfon',
    normalized_name: 'Apple iPhone 16 Pro Max 256GB Desert Titanium',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    basePrice: 17900000,
    tags: ['iphone', 'apple', '16 pro max', 'desert titanium', 'flagman', 'kamera', 'ios'],
    specHighlights: ['A18 Pro (3nm)', '6.9" Super Retina XDR 120Hz', '48MP Fusion + Camera Control', '256GB xotira'],
    specifications: {
      screen: '6.9" OLED ProMotion 120Hz, 2000 nits',
      battery: '4685 mAh (33 soat video)',
      camera: '48 MP Fusion + 48 MP Ultra-keng + 5x Telefoto',
      performance: 'Apple A18 Pro (3nm), 8GB RAM',
      storage: '256 GB'
    },
    pros: [
      'Eng yangi A18 Pro chipi va Apple Intelligence intellektual tizimi',
      '6.9 dyuymli rekord yupqa romli eng katta iPhone displeyi',
      'Yangi sensorli Camera Control tugmasi'
    ],
    cons: ['Bozordagi eng yuqori narx segmenti']
  },
  {
    id: 'apple-iphone-15-pro',
    brand: 'Apple',
    model: 'iPhone 15 Pro',
    variant: '128GB Natural Titanium',
    category: 'smartphone',
    categoryGroup: 'smartfon',
    categoryLabel: 'Flagman Smartfon',
    normalized_name: 'Apple iPhone 15 Pro 128GB Titanium',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    basePrice: 13450000,
    tags: ['iphone', 'apple', '15', 'pro', 'flagman', 'titan', 'reels', 'kamera'],
    specHighlights: ['Apple A17 Pro (3nm)', '48MP Pro + 3x Zoom', 'ProMotion 120Hz', 'Titanium yengil korpus'],
    specifications: {
      screen: '6.1" OLED 120Hz ProMotion',
      battery: '3274 mAh',
      camera: '48 MP Pro + 3x Telefoto + ProRes LOG',
      performance: 'Apple A17 Pro, 8GB RAM',
      storage: '128 GB'
    },
    pros: [
      'Type-C orqali tashqi SSD ga to‘g‘ridan-to‘g‘ri 4K 60fps video yozish',
      'Yengil titan korpus va ProMotion 120Hz ekran'
    ],
    cons: ['Qimmat narx segmenti']
  },
  {
    id: 'apple-iphone-13',
    brand: 'Apple',
    model: 'iPhone 13',
    variant: '128GB Midnight',
    category: 'smartphone',
    categoryGroup: 'smartfon',
    categoryLabel: 'Smartfon',
    normalized_name: 'Apple iPhone 13 128GB',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80',
    basePrice: 7490000,
    tags: ['iphone', 'apple', '13', 'telefon', 'smartfon', 'kamera', 'ios'],
    specHighlights: ['A15 Bionic chip', '12 MP qo‘shaloq kamera', 'Super Retina OLED', '128GB xotira'],
    specifications: {
      screen: '6.1" Super Retina OLED',
      battery: '3240 mAh',
      camera: '12 MP + 12 MP (4K 60fps Kinematografik)',
      performance: 'A15 Bionic (5nm), 4GB RAM',
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
    id: 'samsung-galaxy-s24-ultra',
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    variant: '12GB / 256GB Titanium Gray',
    category: 'smartphone',
    categoryGroup: 'smartfon',
    categoryLabel: 'Flagman Smartfon',
    normalized_name: 'Samsung Galaxy S24 Ultra 12/256GB',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    basePrice: 12900000,
    tags: ['samsung', 's24', 'ultra', 'flagman', '200mp', 'zoom', 'galaxy ai', 's pen'],
    specHighlights: ['200 MP Kamera + 100x Zoom', 'Snapdragon 8 Gen 3', 'Gorilla Armor (bliksiz)', 'Galaxy AI & S Pen'],
    specifications: {
      screen: '6.8" AMOLED 120Hz Gorilla Armor',
      battery: '5000 mAh (45W)',
      camera: '200 MP + 50 MP 5x periskop + 10x',
      performance: 'Snapdragon 8 Gen 3, 12GB RAM',
      storage: '256 GB'
    },
    pros: [
      '200 MP kamera va 100x yaqinlashtirish (zoom)',
      'Gorilla Armor yaltiramaydigan yassi titan ekran',
      'Galaxy AI va S Pen stilus'
    ],
    cons: ['Katta o‘lcham (232g)']
  },
  {
    id: 'samsung-galaxy-a55',
    brand: 'Samsung',
    model: 'Galaxy A55 5G',
    variant: '8GB / 128GB Awesome Iceblue',
    category: 'smartphone',
    categoryGroup: 'smartfon',
    categoryLabel: 'Smartfon',
    normalized_name: 'Samsung Galaxy A55 5G 8/128GB',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    basePrice: 4250000,
    tags: ['samsung', 'a55', 'galaxy', '5g', 'ip67', '4 mln', '5 mln'],
    specHighlights: ['IP67 suvdan himoya', '50 MP OIS kamera', 'Super AMOLED 120Hz', 'Exynos 1480 8GB'],
    specifications: {
      screen: '6.6" Super AMOLED 120Hz',
      battery: '5000 mAh (25W)',
      camera: '50 MP OIS + 12 MP ultra-keng',
      performance: 'Exynos 1480 (4nm), 8GB RAM',
      storage: '128 GB'
    },
    pros: [
      'IP67 suv va changdan himoyalangan mustahkam metall romli korpus',
      'Optik stabilizatsiyali (OIS) 50MP kamera'
    ],
    cons: ['25W zaryadlash tezligi']
  },
  {
    id: 'samsung-galaxy-a15',
    brand: 'Samsung',
    model: 'Galaxy A15',
    variant: '6GB / 128GB Blue Black',
    category: 'smartphone',
    categoryGroup: 'smartfon',
    categoryLabel: 'Smartfon',
    normalized_name: 'Samsung Galaxy A15 6/128GB',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80',
    basePrice: 2280000,
    tags: ['samsung', 'a15', 'galaxy', 'arzon', 'taxi', 'yandex taxi', '3 mln', '2 mln'],
    specHighlights: ['Super AMOLED 90Hz', 'Helio G99 (6nm)', '5000 mAh batareya', '6/128GB xotira'],
    specifications: {
      screen: '6.5" Super AMOLED 90Hz',
      battery: '5000 mAh',
      camera: '50 MP + 5 MP',
      performance: 'Helio G99, 6GB RAM',
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
    id: 'xiaomi-redmi-note-13',
    brand: 'Xiaomi',
    model: 'Redmi Note 13',
    variant: '8GB / 256GB Midnight Black',
    category: 'smartphone',
    categoryGroup: 'smartfon',
    categoryLabel: 'Smartfon',
    normalized_name: 'Xiaomi Redmi Note 13 8/256GB',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80',
    basePrice: 2790000,
    tags: ['xiaomi', 'redmi', 'note 13', '3 mln', 'taxi', 'yandex taxi', 'arzon', '256gb'],
    specHighlights: ['1800 nits AMOLED 120Hz', '108 MP kamera', '33W adapter komplektda', '256GB katta xotira'],
    specifications: {
      screen: '6.67" AMOLED 120Hz, 1800 nits',
      battery: '5000 mAh (33W)',
      camera: '108 MP 3x Zoom + 8 MP',
      performance: 'Snapdragon 685, 8GB RAM',
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
    id: 'xiaomi-poco-x6-pro',
    brand: 'Poco',
    model: 'Poco X6 Pro 5G',
    variant: '8GB / 256GB',
    category: 'smartphone',
    categoryGroup: 'smartfon',
    categoryLabel: 'O\'yinbop Smartfon',
    normalized_name: 'Xiaomi Poco X6 Pro 5G 8/256GB',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
    basePrice: 3950000,
    tags: ['poco', 'x6', 'x6 pro', 'pubg', 'o\'yin', 'gaming', '4 mln', 'fps'],
    specHighlights: ['Dimensity 8300 Ultra', '1.5K AMOLED 120Hz', '67W Turbo quvvat', 'PUBG 90 FPS'],
    specifications: {
      screen: '6.67" 1.5K AMOLED 120Hz',
      battery: '5000 mAh (67W)',
      camera: '64 MP OIS',
      performance: 'Dimensity 8300 Ultra (Antutu 1.4M), 8GB RAM',
      storage: '256 GB UFS 4.0'
    },
    pros: [
      'PUBG va og‘ir o‘yinlarni 90/120 FPS da yurgazuvchi flagman protsessor',
      '1.5K tiniq AMOLED ekran va UFS 4.0 ultra tezkor xotira'
    ],
    cons: ['Kamerasi o‘yin unumdorligiga qaraganda oddiyroq']
  },
  {
    id: 'honor-x9b-5g',
    brand: 'Honor',
    model: 'Honor X9b 5G',
    variant: '12GB / 256GB Emerald Green',
    category: 'smartphone',
    categoryGroup: 'smartfon',
    categoryLabel: 'Zarbaga Chidamli Smartfon',
    normalized_name: 'Honor X9b 5G 12/256GB (5800mAh)',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02560?w=600&auto=format&fit=crop&q=80',
    basePrice: 3690000,
    tags: ['honor', 'x9b', '5800mah', 'sindirish qiyin', 'chidamli', '3 mln', '4 mln'],
    specHighlights: ['5800 mAh 2 kunlik quvvat', '360° Sindirish qiyin ekran', '12GB katta RAM', '108 MP kamera'],
    specifications: {
      screen: '6.78" Curved AMOLED 1.5K 120Hz',
      battery: '5800 mAh (35W)',
      camera: '108 MP asosiy kamera',
      performance: 'Snapdragon 6 Gen 1, 12GB RAM',
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
    variant: '8GB / 256GB Starry Silver',
    category: 'smartphone',
    categoryGroup: 'smartfon',
    categoryLabel: 'Mega-Batareya Smartfon',
    normalized_name: 'Tecno Pova 6 Neo 8/256GB (7000mAh)',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
    basePrice: 2350000,
    tags: ['tecno', 'pova', 'pova 6', '7000mah', 'batareya', 'taxi', 'yandex', '2 mln'],
    specHighlights: ['7000 mAh rekord batareya', '6.78" 120Hz ekran', '33W tezkor adapter', '8/256GB xotira'],
    specifications: {
      screen: '6.78" FHD+ 120Hz',
      battery: '7000 mAh mega-batareya (33W)',
      camera: '50 MP AI kamera',
      performance: 'Helio G99 Ultimate, 8GB RAM',
      storage: '256 GB'
    },
    pros: [
      '7000 mAh ulkan quvvat — kuniga zaryadniksiz Yandex Taxi haydash uchun',
      '33W adapter va qalin chexol komplektida'
    ],
    cons: ['IPS ekran, korpusi biroz og‘ir (220g)']
  },
  {
    id: 'apple-watch-series-9',
    brand: 'Apple',
    model: 'Watch Series 9',
    variant: '45mm GPS / Midnight Alum',
    category: 'smartwatch',
    categoryGroup: 'smartfon',
    categoryLabel: 'Aqlli Soat',
    normalized_name: 'Apple Watch Series 9 45mm GPS',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80',
    basePrice: 4750000,
    tags: ['apple watch', 'soat', 'aqlli soat', 'smartwatch', 'series 9', 'sport', '5 mln'],
    specHighlights: ['S9 SiP chipi', 'Double Tap imo-ishorasi', 'EKG & Puls o‘lchash', '2000 nits yorqin ekran'],
    specifications: {
      screen: 'Always-On Retina OLED, 2000 nits',
      processor: 'S9 SiP (Dual-Core)',
      sensors: 'EKG, Qondagi kislorod, Tana harorati, Puls',
      battery: '18-36 soat'
    },
    pros: [
      'Double Tap (barmoqlarni chertish) orqali teginmasdan qo‘ng‘iroqqa javob berish',
      'Sog‘liqni nazorat qilish bo‘yicha dunyo yetakchisi',
      'Yorqin 2000 nits quyoshda ham aniq ko‘rinadi'
    ],
    cons: ['Faqat iPhone bilan ishlaydi (Android qo‘llab-quvvatlanmaydi)']
  }
];

// Helper to calculate ranking score
function scoreProduct(product, queryLower, budget) {
  let score = 80;
  const name = product.normalized_name.toLowerCase();
  const label = (product.categoryLabel || '').toLowerCase();

  // Name exact match bonus
  if (name.includes(queryLower)) score += 15;
  if (label.includes(queryLower)) score += 10;
  
  (product.tags || []).forEach(t => {
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

// Group synonyms mapper
const CATEGORY_SYNONYMS = {
  maishiy: ['kir yuvish', 'kiryuvish', 'стиралка', 'стиральная машина', 'muzlatgich', 'xolodilnik', 'холодильник', 'dazmol', 'утюг', 'maishiy', 'бытовая'],
  iqlim: ['konditsioner', 'konditsaner', 'кондиционер', 'gree', 'aux', 'midea', 'iqlim', 'sovutish', 'isitish', 'inverter 12', 'inverter 18'],
  vacuum: ['changyutgich', 'changyutkich', 'пылесос', 'robot', 'робот', 'dreame', 'dyson'],
  oshxona: ['oshxona', 'airfryer', 'aerogrill', 'kofemashina', 'кофемашина', 'mikrovolnovka', 'mikroto\'lqinli', 'choynak', 'grill', 'gaz plita', 'plita', 'duxovka'],
  tv_audio: ['televizor', 'tv', 'телевизор', 'oled', 'qled', 'smart tv', 'ps5', 'playstation', 'audio', 'quloqchin', 'naushnik', 'airpods'],
  noutbuk: ['noutbuk', 'laptop', 'kompyuter', 'ноутбук', 'macbook', 'planshet', 'ipad', 'tablet'],
  smartfon: ['telefon', 'smartfon', 'iphone', 'samsung', 'redmi', 'xiaomi', 'телефон', 'honor', 'tecno', 'poco', 'soat', 'apple watch']
};

/**
 * Universal Search Function - Fast, robust, supports all electronics & home appliances
 */
export function searchProducts(rawQuery = '', options = {}) {
  const query = (rawQuery || '').toLowerCase().trim();
  const { categoryGroup = 'ALL', sortBy = 'score' } = options;

  // Extract budget if any (e.g., "3 mln", "5 million", "7000000")
  let budget = null;
  const mlnMatch = query.match(/(\d+(?:[.,]\d+)?)\s*(?:mln|million|m|миллион|млн)/i);
  if (mlnMatch) {
    budget = parseFloat(mlnMatch[1].replace(',', '.')) * 1000000;
  } else {
    const rawNum = query.match(/(\d{6,9})/);
    if (rawNum) budget = parseInt(rawNum[1], 10);
  }

  let candidates = [...MASTER_PRODUCTS];

  // 1. Filter by categoryGroup if not ALL
  if (categoryGroup && categoryGroup !== 'ALL') {
    candidates = candidates.filter(p => {
      if (categoryGroup === 'maishiy') {
        return p.categoryGroup === 'maishiy' || p.category === 'washing_machine' || p.category === 'refrigerator' || p.category === 'vacuum' || p.category === 'iron';
      }
      if (categoryGroup === 'iqlim') {
        return p.categoryGroup === 'iqlim' || p.category === 'air_conditioner';
      }
      if (categoryGroup === 'vacuum') {
        return p.category === 'vacuum';
      }
      if (categoryGroup === 'oshxona') {
        return p.categoryGroup === 'oshxona' || p.category === 'kitchen';
      }
      if (categoryGroup === 'tv_audio') {
        return p.categoryGroup === 'tv_audio' || p.category === 'tv' || p.category === 'audio' || p.category === 'gaming';
      }
      if (categoryGroup === 'noutbuk') {
        return p.categoryGroup === 'noutbuk' || p.category === 'laptop' || p.category === 'tablet';
      }
      if (categoryGroup === 'smartfon') {
        return p.categoryGroup === 'smartfon' || p.category === 'smartphone' || p.category === 'smartwatch';
      }
      return p.categoryGroup === categoryGroup;
    });
  }

  // 2. Filter by search query if specified
  if (query && query !== 'barchasi' && query !== 'all') {
    const matched = candidates.filter(p => {
      const name = p.normalized_name.toLowerCase();
      const brand = p.brand.toLowerCase();
      const model = p.model.toLowerCase();
      const label = (p.categoryLabel || '').toLowerCase();

      // Exact name/brand match
      if (name.includes(query) || brand.includes(query) || model.includes(query) || label.includes(query)) return true;

      // Word-by-word match
      const words = query.split(/\s+/).filter(w => w.length > 1);
      const hasWordMatch = words.some(w => 
        name.includes(w) || 
        brand.includes(w) || 
        label.includes(w) ||
        (p.tags || []).some(t => t.includes(w))
      );
      if (hasWordMatch) return true;

      // Synonym group checks
      for (const [grpKey, syns] of Object.entries(CATEGORY_SYNONYMS)) {
        const matchesSyn = syns.some(s => query.includes(s));
        if (matchesSyn) {
          if (p.categoryGroup === grpKey || p.category.includes(grpKey)) return true;
        }
      }

      // Budget match if user asked "3 mln gacha"
      if (budget && p.basePrice <= budget * 1.05) return true;

      return false;
    });

    if (matched.length > 0) {
      candidates = matched;
    }
  }

  // 3. Format into final product objects with stores, 30-day median, and scores
  const results = candidates.map((item) => {
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

  // 4. Sort results according to sortBy option
  if (sortBy === 'price_asc') {
    results.sort((a, b) => a.bestPrice - b.bestPrice);
  } else if (sortBy === 'price_desc') {
    results.sort((a, b) => b.bestPrice - a.bestPrice);
  } else if (sortBy === 'discount') {
    results.sort((a, b) => (b.median30Days - b.bestPrice) - (a.median30Days - a.bestPrice));
  } else {
    // Default: Sort descending by calculated score
    results.sort((a, b) => b.calculatedScore - a.calculatedScore);
  }

  return {
    items: results,
    totalFound: results.length,
    queryText: rawQuery,
    categoryGroup,
    budget
  };
}

/**
 * Instant autocomplete suggestions helper for live search input
 */
export function getQuickSuggestions(query = '', limit = 5) {
  const cleanQ = (query || '').toLowerCase().trim();
  if (!cleanQ || cleanQ.length < 1) return [];

  const matches = MASTER_PRODUCTS.filter(p => {
    const name = p.normalized_name.toLowerCase();
    const brand = p.brand.toLowerCase();
    const tags = p.tags || [];
    return name.includes(cleanQ) || brand.includes(cleanQ) || tags.some(t => t.includes(cleanQ));
  });

  return matches.slice(0, limit).map(p => ({
    id: p.id,
    name: p.normalized_name,
    brand: p.brand,
    categoryLabel: p.categoryLabel,
    image: p.image,
    price: p.basePrice
  }));
}
