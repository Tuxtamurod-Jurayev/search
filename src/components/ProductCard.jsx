import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  ExternalLink, 
  LineChart, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck,
  TrendingDown,
  BellRing
} from 'lucide-react';
import { formatPrice } from '../services/searchEngine';

export function ProductCard({ 
  product, 
  onOpenPriceHistory, 
  onOpenPriceAlert,
  selectedCondition,
  activePlatforms = {}
}) {
  const [isStoresOpen, setIsStoresOpen] = useState(true);

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

  const priceStatus = product.priceStatus || { verdictText: 'Bozor narxida', isCheap: false };

  return (
    <div className="product-card-minimal">
      <div className="card-primary-row">
        {/* Left: Image */}
        <div className="card-thumb-wrap">
          <img 
            src={product.image} 
            alt={product.normalized_name} 
            className="card-thumb-img"
            loading="lazy"
          />
          <span className="card-brand-badge">{product.brand}</span>
        </div>

        {/* Center: Details & AI Reasons */}
        <div className="card-info-wrap">
          <div className="card-title-row">
            <h3 className="card-product-title">{product.normalized_name}</h3>
            <span className="match-pill">
              <Sparkles size={13} className="text-cyan" />
              <span>{product.calculatedScore}% mos</span>
            </span>
          </div>

          {/* Quick Specs Badges */}
          <div className="card-specs-row">
            {product.specifications?.screen && (
              <span className="spec-chip">{product.specifications.screen}</span>
            )}
            {product.specifications?.battery && (
              <span className="spec-chip">{product.specifications.battery}</span>
            )}
            {product.specifications?.camera && (
              <span className="spec-chip">{product.specifications.camera}</span>
            )}
            {product.specifications?.storage && (
              <span className="spec-chip">{product.specifications.storage}</span>
            )}
          </div>

          {/* AI Reasoning Points (Concise, no clutter) */}
          <div className="card-reasons-box">
            <div className="reasons-heading">
              <Sparkles size={13} className="text-cyan" />
              <span>Nega tavsiya qilindi:</span>
            </div>
            <ul className="reasons-compact-list">
              {(product.aiReasons?.pros || []).slice(0, 3).map((pro, i) => (
                <li key={i} className="reason-bullet">
                  <Check size={14} className="text-emerald check-bullet-icon" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Best Price & Actions */}
        <div className="card-action-side">
          <div className="best-price-badge">
            <span className="price-label">Eng past narx:</span>
            <div className="price-big-text">
              {formatPrice(bestStore.price)} <span className="price-curr">so‘m</span>
            </div>
            <div className="best-source-row">
              <span>Do‘kon:</span>
              <strong className="text-cyan">{bestStore.sourceName}</strong>
            </div>
          </div>

          {/* 30-Day Median Price badge */}
          <button 
            type="button" 
            className="median-indicator-btn"
            onClick={() => onOpenPriceHistory(product)}
            title="30 kunlik narxlar grafigini ochish"
          >
            <TrendingDown size={14} className="text-emerald" />
            <span>{priceStatus.verdictText}</span>
          </button>

          {/* Direct CTA Button */}
          <a 
            href={bestStore.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="buy-now-btn"
          >
            <span>{bestStore.sourceName} da ko‘rish</span>
            <ExternalLink size={14} />
          </a>

          <div className="card-mini-actions">
            <button 
              type="button" 
              className="mini-action-link"
              onClick={() => onOpenPriceHistory(product)}
            >
              <LineChart size={13} />
              <span>Narx tarixi</span>
            </button>
            <button 
              type="button" 
              className="mini-action-link"
              onClick={() => onOpenPriceAlert(product, bestStore.price)}
            >
              <BellRing size={13} />
              <span>Narx kuzatish</span>
            </button>
          </div>
        </div>
      </div>

      {/* Store Prices Toggle Header */}
      <div className="card-stores-toggle-bar">
        <button 
          type="button" 
          className="toggle-stores-btn"
          onClick={() => setIsStoresOpen(!isStoresOpen)}
        >
          <span>Barcha do‘konlardagi takliflar ({filteredStores.length} ta manba)</span>
          {isStoresOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Store Comparison Table */}
      {isStoresOpen && (
        <div className="store-list-container">
          <table className="store-simple-table">
            <thead>
              <tr>
                <th>Do‘kon</th>
                <th>Holati</th>
                <th>Narx</th>
                <th>Kafolat</th>
                <th>Amal</th>
              </tr>
            </thead>
            <tbody>
              {filteredStores.map((s, idx) => {
                const isUsed = s.condition === 'USED';
                return (
                  <tr key={idx} className={`store-tr ${isUsed ? 'used-tr' : ''}`}>
                    <td>
                      <strong className="store-brand-name">{s.sourceName}</strong>
                      {s.isBestPrice && <span className="best-tag-pill">Eng arzon</span>}
                    </td>
                    <td>
                      <span className={`cond-badge ${isUsed ? 'badge-used' : 'badge-new'}`}>
                        {isUsed ? 'Ishlatilgan (B/U)' : 'Yangi'}
                      </span>
                    </td>
                    <td>
                      <span className="store-row-price">{formatPrice(s.price)} so‘m</span>
                    </td>
                    <td>
                      <span className="store-warranty-text">{s.warranty}</span>
                    </td>
                    <td>
                      <a 
                        href={s.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="open-store-link"
                      >
                        <span>O‘tish</span>
                        <ExternalLink size={12} />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
