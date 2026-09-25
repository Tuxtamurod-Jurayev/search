import React, { useState } from 'react';
import { X, TrendingDown, TrendingUp, Calendar, AlertCircle, ArrowDown, ArrowUp, CheckCircle2 } from 'lucide-react';
import { formatPrice } from '../services/aiParser';

export function PriceHistoryModal({ product, onClose, onOpenAlert }) {
  if (!product) return null;

  const history = product.priceHistory || [];
  const prices = history.map(h => h.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const medianPrice = product.median30Days;
  const currentPrice = product.bestPrice;
  const diffFromMedian = currentPrice - medianPrice;
  const diffPercent = Number(((diffFromMedian / medianPrice) * 100).toFixed(1));

  // SVG Chart Dimensions
  const chartWidth = 650;
  const chartHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  const innerW = chartWidth - paddingX * 2;
  const innerH = chartHeight - paddingY * 2;
  const priceRange = maxPrice - minPrice || 1;

  const points = history.map((pt, i) => {
    const x = paddingX + (i / (history.length - 1)) * innerW;
    const y = paddingY + innerH - ((pt.price - minPrice) / priceRange) * innerH;
    return { x, y, ...pt };
  });

  const pathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  // Median Y line
  const medianY = paddingY + innerH - ((medianPrice - minPrice) / priceRange) * innerH;

  const [hoveredPoint, setHoveredPoint] = useState(points[points.length - 1]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container history-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <div className="modal-subtitle">NARXLAR TARIXI VA BOZOR MEDIANI</div>
            <h2 className="modal-title">{product.normalized_name}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        {/* "Bu narx qimmatmi?" Engine Card (TZ section 10) */}
        <div className={`price-verdict-box ${diffPercent < 0 ? 'good-price' : 'high-price'}`}>
          <div className="verdict-icon-wrap">
            {diffPercent < 0 ? (
              <TrendingDown size={28} className="text-emerald" />
            ) : (
              <TrendingUp size={28} className="text-amber" />
            )}
          </div>
          <div className="verdict-content">
            <h3 className="verdict-title">
              {diffPercent < 0 
                ? `Hozirgi narx oxirgi 30 kunlik mediandan ${Math.abs(diffPercent)}% arzon`
                : `Hozirgi narx oxirgi 30 kunlik mediandan ${diffPercent}% yuqori`}
            </h3>
            <p className="verdict-desc">
              {diffPercent < 0 
                ? `Hozirgi eng yaxshi narx (${formatPrice(currentPrice)} so'm) 30 kunlik median narxdan (${formatPrice(medianPrice)} so'm) ${formatPrice(Math.abs(diffFromMedian))} so'm past. Xarid qilish uchun optimal vaqt!`
                : `Hozirgi narx odatdagidan biroz qimmatroq. Agar shoshilinch bo'lmasa, narx tushishini kutish yoki narx ogohlantirishini yoqish tavsiya etiladi.`}
            </p>
          </div>
          <button 
            type="button" 
            className="alert-cta-btn"
            onClick={() => {
              onClose();
              onOpenAlert(product, currentPrice);
            }}
          >
            Narx tushsa xabar ber
          </button>
        </div>

        {/* Stats Row */}
        <div className="history-stats-grid">
          <div className="stat-card">
            <span className="stat-label">Hozirgi narx</span>
            <span className="stat-value text-cyan">{formatPrice(currentPrice)} so‘m</span>
            <span className="stat-sub">{product.bestStore?.sourceName} da</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">30 kunlik median</span>
            <span className="stat-value text-amber">{formatPrice(medianPrice)} so‘m</span>
            <span className="stat-sub">Bozor standarti</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Eng past narx</span>
            <span className="stat-value text-emerald">{formatPrice(minPrice)} so‘m</span>
            <span className="stat-sub">Oxirgi 30 kunda</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Eng yuqori narx</span>
            <span className="stat-value text-rose">{formatPrice(maxPrice)} so‘m</span>
            <span className="stat-sub">Cho‘qqi narx</span>
          </div>
        </div>

        {/* Interactive SVG Chart */}
        <div className="chart-wrapper">
          <div className="chart-legend">
            <div className="legend-item">
              <span className="legend-color-line bg-cyan"></span>
              <span>Kunlik narx tebranishi</span>
            </div>
            <div className="legend-item">
              <span className="legend-dashed-line"></span>
              <span>30 kunlik median ({formatPrice(medianPrice)} so‘m)</span>
            </div>
          </div>

          <svg 
            viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
            className="price-svg-chart"
          >
            {/* Background grid lines */}
            <line x1={paddingX} y1={paddingY} x2={chartWidth - paddingX} y2={paddingY} stroke="rgba(255,255,255,0.06)" />
            <line x1={paddingX} y1={paddingY + innerH / 2} x2={chartWidth - paddingX} y2={paddingY + innerH / 2} stroke="rgba(255,255,255,0.06)" />
            <line x1={paddingX} y1={paddingY + innerH} x2={chartWidth - paddingX} y2={paddingY + innerH} stroke="rgba(255,255,255,0.06)" />

            {/* Median Line */}
            {medianY >= paddingY && medianY <= paddingY + innerH && (
              <line 
                x1={paddingX} 
                y1={medianY} 
                x2={chartWidth - paddingX} 
                y2={medianY} 
                stroke="#f59e0b" 
                strokeDasharray="4,4" 
                strokeWidth="1.5"
              />
            )}

            {/* Area gradient under line */}
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path 
              d={`${pathD} L ${points[points.length - 1].x} ${paddingY + innerH} L ${points[0].x} ${paddingY + innerH} Z`} 
              fill="url(#chartGradient)" 
            />

            {/* Main Price Line */}
            <path 
              d={pathD} 
              fill="none" 
              stroke="#06b6d4" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />

            {/* Points & Interactive Tooltip */}
            {points.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r={hoveredPoint?.date === pt.date ? 6 : 3}
                fill={hoveredPoint?.date === pt.date ? "#ffffff" : "#06b6d4"}
                stroke="#090d16"
                strokeWidth="2"
                className="chart-dot"
                onMouseEnter={() => setHoveredPoint(pt)}
              />
            ))}
          </svg>

          {/* Hovered Tooltip info */}
          {hoveredPoint && (
            <div className="chart-point-card">
              <Calendar size={14} className="text-cyan" />
              <span>Sana: <strong>{hoveredPoint.date}</strong></span>
              <span className="dot-divider">•</span>
              <span>Narx: <strong className="text-emerald">{formatPrice(hoveredPoint.price)} so‘m</strong></span>
            </div>
          )}
        </div>

        {/* Database Snapshot Explanation (TZ section 9) */}
        <div className="db-snapshot-note">
          <AlertCircle size={14} className="text-muted" />
          <span>
            Har bir do‘kon (Uzum, Asaxiy, Olcha, Texnomart) mahsulot sahifasi skan qilinganda 
            <code>price_history</code> jadvaliga yangi snapshot yozib boriladi.
          </span>
        </div>
      </div>
    </div>
  );
}
