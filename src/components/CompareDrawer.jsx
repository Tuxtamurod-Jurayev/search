import React from 'react';
import { X, GitCompare, ExternalLink, Check, Trash2, Battery, Camera, Cpu, Monitor, Sparkles } from 'lucide-react';
import { formatPrice } from '../services/aiParser';

export function CompareDrawer({ compareList, onRemove, onClear, onClose }) {
  if (!compareList || compareList.length === 0) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container compare-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="compare-badge-wrap">
            <GitCompare size={18} className="text-cyan sparkle-anim" />
            <span className="modal-subtitle">MAHSULOTLARNI TAQQOSLASH ({compareList.length} ta)</span>
          </div>
          <div className="header-btns">
            <button className="clear-all-btn" onClick={onClear}>
              <Trash2 size={14} />
              <span>Tozalash</span>
            </button>
            <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
          </div>
        </div>

        <div className="compare-grid" style={{ gridTemplateColumns: `repeat(${compareList.length}, 1fr)` }}>
          {compareList.map((product) => (
            <div key={product.id} className="compare-column">
              <div className="compare-top">
                <button 
                  className="remove-compare-btn" 
                  onClick={() => onRemove(product.id)}
                  title="Taqqoslashdan o'chirish"
                >
                  <X size={14} />
                </button>
                <div className="compare-img-box">
                  <img src={product.image} alt={product.normalized_name} />
                </div>
                <h3 className="compare-title">{product.normalized_name}</h3>
                
                {/* Price block */}
                <div className="compare-price-box">
                  <div className="compare-price-val">{formatPrice(product.bestPrice)} so‘m</div>
                  <div className="compare-store-sub">{product.bestStore?.sourceName}</div>
                </div>

                <a 
                  href={product.bestStore?.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="compare-buy-btn"
                >
                  <span>Do‘konga o‘tish</span>
                  <ExternalLink size={13} />
                </a>
              </div>

              {/* Spec Rows */}
              <div className="compare-specs-section">
                <div className="spec-row-item">
                  <span className="spec-row-header"><Battery size={13} /> Batareya</span>
                  <strong className="spec-row-val">{product.specifications.battery}</strong>
                  <span className="spec-rating-score">Ball: {product.specifications.batteryScore}/10</span>
                </div>

                <div className="spec-row-item">
                  <span className="spec-row-header"><Camera size={13} /> Kamera</span>
                  <strong className="spec-row-val">{product.specifications.camera}</strong>
                  <span className="spec-rating-score">Ball: {product.specifications.cameraScore}/10</span>
                </div>

                <div className="spec-row-item">
                  <span className="spec-row-header"><Cpu size={13} /> Protsessor</span>
                  <strong className="spec-row-val">{product.specifications.performance}</strong>
                  <span className="spec-rating-score">Ball: {product.specifications.performanceScore}/10</span>
                </div>

                <div className="spec-row-item">
                  <span className="spec-row-header"><Monitor size={13} /> Displey</span>
                  <strong className="spec-row-val">{product.specifications.screen}</strong>
                </div>

                <div className="spec-row-item">
                  <span className="spec-row-header">30 kunlik median narx</span>
                  <strong className="spec-row-val text-amber">{formatPrice(product.median30Days)} so‘m</strong>
                </div>

                {/* AI Shopping verdict */}
                <div className="spec-row-item ai-verdict-row">
                  <span className="spec-row-header text-cyan"><Sparkles size={13} /> AI Xulosasi</span>
                  <p className="verdict-summary-text">{product.aiReasons.verdict}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
