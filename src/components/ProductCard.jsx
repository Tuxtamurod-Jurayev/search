import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  X, 
  TrendingDown, 
  TrendingUp, 
  ExternalLink, 
  ShieldCheck, 
  LineChart, 
  BellRing, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertTriangle,
  GitCompare,
  Battery,
  Camera,
  Cpu,
  Monitor
} from 'lucide-react';
import { formatPrice } from '../services/aiParser';

export function ProductCard({ 
  product, 
  rankIndex,
  onOpenPriceHistory, 
  onOpenSellerTransparency, 
  onOpenPriceAlert,
  onToggleCompare,
  isCompared,
  selectedCondition,
  activePlatforms = {}
}) {
  const [isStoresOpen, setIsStoresOpen] = useState(false);

  // Filter stores according to selectedCondition and activePlatforms
  const filteredStores = (product.stores || []).filter(store => {
    if (activePlatforms && activePlatforms[store.sourceId] === false) {
      return false;
    }
    if (selectedCondition === 'NEW_ONLY') {
      return store.condition === 'NEW';
    }
    if (selectedCondition === 'USED_ALLOWED') {
      return store.condition === 'USED';
    }
    return true;
  });

  const bestStore = filteredStores.length > 0 
    ? filteredStores.reduce((min, s) => (s.price < min.price ? s : min), filteredStores[0])
    : (product.stores && product.stores[0]) || { price: product.bestPrice || 0, sourceName: 'Bozor', url: '#' };

  const priceStatus = product.priceStatus || { verdictText: 'Bozor narxida', isCheap: false, isExpensive: false };

  return (
    <article className="product-card">
      {/* Top Banner / Match Rank */}
      <div className="card-top-bar">
        <div className="rank-badge">
          <span className="rank-num">#{rankIndex + 1}</span>
          <span className="rank-title">TOPDIM AI Tavsiyasi</span>
        </div>

        <div className="match-score-pill" title="Foydalanuvchi talabiga moslik darajasi">
          <Sparkles size={14} className="text-cyan" />
          <span>{product.calculatedScore}% Mos keladi</span>
        </div>
      </div>

      <div className="card-main-grid">
        {/* Left Column: Image & Quick Specs */}
        <div className="product-visual-col">
          <div className="product-image-frame">
            <img 
              src={product.image} 
              alt={product.normalized_name} 
              className="product-img"
              loading="lazy"
            />
            <span className="product-brand-chip">{product.brand}</span>
          </div>

          {/* Specs Score Mini-meters */}
          <div className="specs-meters-box">
            <div className="spec-meter-row">
              <span className="spec-meter-label"><Battery size={13} /> Batareya</span>
              <div className="spec-progress-bar">
                <div 
                  className="spec-fill bg-emerald" 
                  style={{ width: `${(product.specifications.batteryScore || 8) * 10}%` }}
                ></div>
              </div>
              <span className="spec-val">{product.specifications.batteryScore}/10</span>
            </div>

            <div className="spec-meter-row">
              <span className="spec-meter-label"><Camera size={13} /> Kamera</span>
              <div className="spec-progress-bar">
                <div 
                  className="spec-fill bg-cyan" 
                  style={{ width: `${(product.specifications.cameraScore || 8) * 10}%` }}
                ></div>
              </div>
              <span className="spec-val">{product.specifications.cameraScore}/10</span>
            </div>

            <div className="spec-meter-row">
              <span className="spec-meter-label"><Cpu size={13} /> Unumdorlik</span>
              <div className="spec-progress-bar">
                <div 
                  className="spec-fill bg-purple" 
                  style={{ width: `${(product.specifications.performanceScore || 8) * 10}%` }}
                ></div>
              </div>
              <span className="spec-val">{product.specifications.performanceScore}/10</span>
            </div>
          </div>
        </div>

        {/* Center Column: Product Details & AI Reasoning ("Nega aynan bu?") */}
        <div className="product-details-col">
          <div className="product-header-block">
            <h2 className="product-title">{product.normalized_name}</h2>
            <div className="product-variant-specs">
              <span className="spec-badge">{product.specifications.screen}</span>
              <span className="spec-badge">{product.specifications.battery}</span>
              <span className="spec-badge">{product.specifications.ram} RAM / {product.specifications.storage}</span>
            </div>
          </div>

          {/* "Nega aynan bu tavsiya qilindi?" Box (The crucial differentiator from TZ section 15 & 34) */}
          <div className="ai-reason-box">
            <div className="reason-header">
              <Sparkles size={16} className="text-cyan sparkle-anim" />
              <span className="reason-title">NEGA AYNAN BU TAVSIYA QILINDI?</span>
            </div>

            <p className="reason-summary">{product.aiReasons.recommendationSummary}</p>

            <ul className="reason-pros-list">
              {product.aiReasons.pros.map((pro, i) => (
                <li key={i} className="pro-item">
                  <Check size={14} className="text-emerald check-icon" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>

            {product.aiReasons.cons && product.aiReasons.cons.length > 0 && (
              <ul className="reason-cons-list">
                {product.aiReasons.cons.map((con, i) => (
                  <li key={i} className="con-item">
                    <AlertTriangle size={14} className="text-amber" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Column: Pricing Engine, Median & Actions */}
        <div className="product-pricing-col">
          <div className="price-primary-card">
            <div className="price-label-row">
              <span className="price-caption">Eng yaxshi narx:</span>
              <span className="verified-time-chip" title="Tekshirilgan vaqt">
                {bestStore.verifiedAt}
              </span>
            </div>

            <div className="best-price-display">
              <span className="price-amount">{formatPrice(bestStore.price)}</span>
              <span className="price-currency">so‘m</span>
            </div>

            <div className="best-store-indicator">
              <span>Manba:</span>
              <strong className="best-store-name">{bestStore.sourceName}</strong>
              <span className="store-condition-pill">{bestStore.condition === 'NEW' ? 'Yangi' : 'Ishlatilgan'}</span>
            </div>

            {/* "Bu narx qimmatmi?" Engine Indicator (TZ section 10) */}
            <div 
              className={`price-median-diagnostic ${priceStatus.isCheap ? 'cheap' : priceStatus.isExpensive ? 'expensive' : 'neutral'}`}
              onClick={() => onOpenPriceHistory(product)}
              title="30 kunlik narx tarixi tahlilini ko'rish"
            >
              <div className="diag-icon-row">
                {priceStatus.isCheap ? (
                  <TrendingDown size={15} className="text-emerald" />
                ) : priceStatus.isExpensive ? (
                  <TrendingUp size={15} className="text-rose" />
                ) : (
                  <LineChart size={15} className="text-cyan" />
                )}
                <span className="diag-text">{priceStatus.verdictText}</span>
              </div>
              <div className="median-subtext">
                30 kunlik median narx: {formatPrice(product.median30Days)} so‘m
              </div>
            </div>

            {/* Direct Store CTA */}
            <a 
              href={bestStore.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="primary-buy-btn"
            >
              <span>{bestStore.sourceName} dan xarid qilish</span>
              <ExternalLink size={15} />
            </a>

            {/* Secondary Utility Actions */}
            <div className="utility-actions-row">
              <button 
                type="button"
                className="util-btn"
                onClick={() => onOpenPriceHistory(product)}
                title="30 kunlik narxlar grafigi"
              >
                <LineChart size={14} />
                <span>Narxlar tarixi</span>
              </button>

              <button 
                type="button"
                className="util-btn"
                onClick={() => onOpenSellerTransparency(bestStore.seller, bestStore.sourceName)}
                title="Sotuvchi shaffoflik ko'rsatkichlari"
              >
                <ShieldCheck size={14} />
                <span>Sotuvchi: {bestStore.seller?.transparencyScore}/100</span>
              </button>

              <button 
                type="button"
                className="util-btn alert-trigger-btn"
                onClick={() => onOpenPriceAlert(product, bestStore.price)}
                title="Narx tushganda Telegram orqali xabar olish"
              >
                <BellRing size={14} />
                <span>Narx kuzatish</span>
              </button>
            </div>

            {/* Compare Checkbox */}
            <label className="compare-checkbox-label">
              <input 
                type="checkbox" 
                checked={isCompared}
                onChange={() => onToggleCompare(product)}
              />
              <span>Taqqoslash ro‘yxatiga qo‘shish</span>
            </label>
          </div>
        </div>
      </div>

      {/* Stores Breakdown Accordion Trigger */}
      <div className="stores-accordion-bar">
        <button 
          type="button" 
          className="stores-toggle-btn"
          onClick={() => setIsStoresOpen(!isStoresOpen)}
        >
          <span>
            Barcha do‘konlardagi takliflar ({filteredStores.length} ta manba: Uzum, Asaxiy, Olcha, Texnomart, OLX)
          </span>
          {isStoresOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Collapsible Store Comparison Table */}
      {isStoresOpen && (
        <div className="stores-table-wrap">
          <table className="stores-table">
            <thead>
              <tr>
                <th>Do‘kon / Manba</th>
                <th>Holati</th>
                <th>Narx</th>
                <th>Kafolat & Yetkazish</th>
                <th>Sotuvchi Ishonchliligi</th>
                <th>Tekshirilgan vaqti</th>
                <th>Amal</th>
              </tr>
            </thead>
            <tbody>
              {filteredStores.map((store, idx) => {
                const isUsed = store.condition === 'USED';

                return (
                  <tr key={idx} className={`store-row ${isUsed ? 'used-row' : ''}`}>
                    <td>
                      <div className="store-name-cell">
                        <strong className="store-name-text">{store.sourceName}</strong>
                        {store.isBestPrice && (
                          <span className="best-tag">Eng arzon</span>
                        )}
                      </div>
                    </td>

                    <td>
                      <span className={`condition-tag ${isUsed ? 'cond-used' : 'cond-new'}`}>
                        {isUsed ? 'Ishlatilgan (B/U)' : 'Yangi'}
                      </span>
                      {store.conditionNote && (
                        <div className="condition-note-text">{store.conditionNote}</div>
                      )}
                    </td>

                    <td>
                      <div className="store-price-cell">
                        <span className="store-price-main">{formatPrice(store.price)} so‘m</span>
                        {store.oldPrice && (
                          <del className="store-price-old">{formatPrice(store.oldPrice)} so‘m</del>
                        )}
                      </div>
                    </td>

                    <td>
                      <div className="store-warranty-cell">
                        <div className="warranty-title">{store.warranty}</div>
                        <div className="delivery-sub">{store.delivery}</div>
                      </div>
                    </td>

                    <td>
                      <button 
                        type="button" 
                        className="seller-score-pill"
                        onClick={() => onOpenSellerTransparency(store.seller, store.sourceName)}
                      >
                        <ShieldCheck size={13} className="text-cyan" />
                        <span>{store.seller?.transparencyScore}/100</span>
                      </button>
                    </td>

                    <td>
                      <span className="verified-cell">
                        {store.verifiedAt}
                        {store.isRealtime && <span className="realtime-dot" title="Real-time tekshirilgan"></span>}
                      </span>
                    </td>

                    <td>
                      <a 
                        href={store.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="store-link-btn"
                      >
                        <span>O‘tish</span>
                        <ExternalLink size={13} />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
}
