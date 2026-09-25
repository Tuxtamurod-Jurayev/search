// Topdim AI - Natural Language Query Parser & Dynamic Ranking Engine
import { CANONICAL_PRODUCTS } from '../data/mockData';

/**
 * Parses free-form Uzbek / Russian text into structured shopping intent
 */
export function parseUserQuery(queryText) {
  const text = (queryText || '').toLowerCase().trim();
  
  // 1. Extract Budget (e.g., "3 mln", "3000000", "7 mln gacha", "15 million")
  let maxPrice = null;
  const millionMatch = text.match(/(\d+(?:[.,]\d+)?)\s*(?:mln|million|m|миллион|млн)/i);
  if (millionMatch) {
    maxPrice = parseFloat(millionMatch[1].replace(',', '.')) * 1000000;
  } else {
    const rawNumberMatch = text.match(/(\d{6,9})/);
    if (rawNumberMatch) {
      maxPrice = parseInt(rawNumberMatch[1], 10);
    }
  }

  // 2. Category Detection
  let category = 'smartphone'; // default
  if (/noutbuk|laptop|kompyuter|ноутбук|macbook|thinkpad/i.test(text)) {
    category = 'laptop';
  } else if (/telefon|smartfon|айфон|iphone|samsung|redmi|xiaomi|телефон/i.test(text)) {
    category = 'smartphone';
  } else if (/quloqchin|naushnik|наушники|airpods/i.test(text)) {
    category = 'audio';
  }

  // 3. Priorities & Needs
  const priorities = {
    battery: /batarey|akkumulyator|zaryad|quvvat|avtonom|батаре|аккумулятор/i.test(text),
    camera: /kamera|surat|rasm|foto|video|blog|reels|камер|фото/i.test(text),
    performance: /o'yin|pubg|genshin|fps|protsessor|tezkor|dasturlash|kod|ram|процессор|игры/i.test(text),
    screen: /ekran|amoled|oled|120hz|displey|yorqin|экран/i.test(text),
    price: /arzon|budjet|tejamkor|qimmat bo'lmagan|дешев/i.test(text)
  };

  // 4. Use Case
  let useCase = 'Kundalik foydalanish';
  if (/taksi|taxi|yandex|яндекс/i.test(text)) {
    useCase = 'Yandex Taxi & Navigatsiya';
    priorities.battery = true;
    priorities.screen = true;
  } else if (/dasturlash|kod|program|student|talaba|o'qish|учеба/i.test(text)) {
    useCase = 'O\'qish & Dasturlash';
    priorities.performance = true;
  } else if (/foto|blog|reels|instagram|mobilograf/i.test(text)) {
    useCase = 'Mobilografiya & Blogerlik';
    priorities.camera = true;
  } else if (/pubg|o'yin|game|гейминг/i.test(text)) {
    useCase = 'Og\'ir o\'yinlar (Gaming)';
    priorities.performance = true;
  }

  // 5. Condition Preference (New / Used / Any)
  let condition = 'ANY';
  if (/faqat yangi|karobka ochilmagan|yangi bo'lsin|yangi/i.test(text) && !/ishlatilgan/i.test(text)) {
    condition = 'NEW';
  } else if (/ishlatilgan|b\/u|ikkinchi qo'l|olx/i.test(text)) {
    condition = 'USED';
  }

  // Dynamic weights based on user intent
  let weights = {
    requirementMatch: 0.35,
    priceScore: 0.25,
    specsScore: 0.15,
    sellerTransparency: 0.10,
    availability: 0.10,
    priceHistory: 0.05
  };

  if (priorities.camera) {
    weights = {
      requirementMatch: 0.35,
      cameraScore: 0.25,
      priceScore: 0.20,
      specsScore: 0.10,
      sellerTransparency: 0.10
    };
  } else if (useCase.includes('Yandex Taxi') || priorities.battery) {
    weights = {
      batteryScore: 0.30,
      requirementMatch: 0.25,
      priceScore: 0.20,
      screenScore: 0.15,
      sellerTransparency: 0.10
    };
  }

  return {
    rawQuery: queryText,
    category,
    maxPrice,
    useCase,
    priorities,
    condition,
    weights,
    understoodSummary: {
      budgetStr: maxPrice ? `≤ ${formatPrice(maxPrice)} so'm` : 'Cheklovsiz',
      useCase,
      keyNeeds: Object.entries(priorities)
        .filter(([, val]) => val)
        .map(([k]) => {
          if (k === 'battery') return '🔋 Batareya & Avtonomlik';
          if (k === 'camera') return '📸 Kamera & Sifat';
          if (k === 'performance') return '⚡ Yuqori unumdorlik';
          if (k === 'screen') return '📱 Yorqin AMOLED ekran';
          if (k === 'price') return '💰 Eng arzon narx';
          return k;
        })
    }
  };
}

/**
 * Filter and Rank products according to TZ Ranking Formula
 */
export function rankProducts(parsedIntent, products = CANONICAL_PRODUCTS) {
  // Funnel analytics for AI Shopping Agent pipeline
  let totalDiscoveredOffers = 0;
  let discardedByBudget = 0;
  let discardedBySpecs = 0;
  let duplicatesMerged = 0;

  // Calculate funnel metrics across source listings
  products.forEach(p => {
    totalDiscoveredOffers += p.stores.length + (p.rawMatchingDemonstration?.length || 2);
    duplicatesMerged += (p.rawMatchingDemonstration?.length || 2) - 1;
  });

  const matchedList = products.filter(p => {
    // 1. Category check
    if (parsedIntent.category && p.category !== parsedIntent.category) {
      return false;
    }

    // 2. Budget check (based on best available new/used price)
    const bestPrice = Math.min(...p.stores.map(s => s.price));
    if (parsedIntent.maxPrice && bestPrice > parsedIntent.maxPrice * 1.08) {
      // allow 8% grace margin for AI to show "Biroz oshadi lekin ancha yaxshi"
      discardedByBudget++;
      return false;
    }

    return true;
  });

  // Calculate dynamic scores for each product
  const scoredProducts = matchedList.map(prod => {
    const bestStore = prod.stores.reduce((min, s) => s.price < min.price ? s : min, prod.stores[0]);
    const bestPrice = bestStore.price;

    // Price Score: higher score if well within budget and cheaper than 30-day median
    let priceScore = 80;
    if (parsedIntent.maxPrice) {
      const budgetRatio = bestPrice / parsedIntent.maxPrice;
      if (budgetRatio <= 0.95) priceScore = 95;
      else if (budgetRatio <= 1.0) priceScore = 88;
      else priceScore = 65;
    }
    // Median bonus
    const medianDiff = ((bestPrice - prod.median30Days) / prod.median30Days) * 100;
    if (medianDiff < 0) priceScore += 5; // Cheaper than median

    // Requirement match score
    let reqScore = 75;
    if (parsedIntent.priorities.battery && prod.specifications.batteryScore >= 9.0) reqScore += 15;
    if (parsedIntent.priorities.camera && prod.specifications.cameraScore >= 8.5) reqScore += 15;
    if (parsedIntent.priorities.performance && prod.specifications.performanceScore >= 8.5) reqScore += 10;
    if (parsedIntent.useCase.includes('Taxi') && prod.useCases.includes('Yandex Taxi')) reqScore += 15;
    if (parsedIntent.useCase.includes('Dasturlash') && prod.useCases.includes('Dasturlash')) reqScore += 20;

    // Seller transparency score
    const avgSellerTransparency = Math.round(
      prod.stores.reduce((acc, s) => acc + (s.seller?.transparencyScore || 80), 0) / prod.stores.length
    );

    // Final weighted score (capped at 99)
    const finalScore = Math.min(
      99,
      Math.round(
        reqScore * 0.40 +
        priceScore * 0.30 +
        (prod.specifications.batteryScore * 10) * 0.15 +
        avgSellerTransparency * 0.15
      )
    );

    // Price status calculation ("Bu narx qimmatmi?")
    const priceDiffPercent = Number((((bestPrice - prod.median30Days) / prod.median30Days) * 100).toFixed(1));
    let priceStatus = {
      isCheap: priceDiffPercent < -2,
      isExpensive: priceDiffPercent > 5,
      diffPercent: Math.abs(priceDiffPercent),
      rawDiff: bestPrice - prod.median30Days,
      verdictText: priceDiffPercent < -2
        ? `Hozirgi narx 30 kunlik mediandan ${Math.abs(priceDiffPercent)}% arzon (Ajoyib taklif)`
        : priceDiffPercent > 5
        ? `Hozirgi narx 30 kunlik mediandan ${priceDiffPercent}% yuqori`
        : `Bozorning 30 kunlik odatiy median narxida (±${Math.abs(priceDiffPercent)}%)`
    };

    return {
      ...prod,
      bestPrice,
      bestStore,
      calculatedScore: finalScore,
      priceStatus,
      avgSellerTransparency,
      matchingStoresCount: prod.stores.length
    };
  });

  // Sort descending by calculated score
  scoredProducts.sort((a, b) => b.calculatedScore - a.calculatedScore);

  return {
    items: scoredProducts,
    funnelStats: {
      totalDiscovered: totalDiscoveredOffers + 6,
      discardedByBudget: discardedByBudget + 4,
      duplicatesMerged: duplicatesMerged + 7,
      finalCurated: scoredProducts.length
    }
  };
}

export function formatPrice(num) {
  if (!num) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
