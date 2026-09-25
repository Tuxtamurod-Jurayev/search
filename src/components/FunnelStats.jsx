import React from 'react';
import { Layers, Filter, GitMerge, Award, ChevronRight } from 'lucide-react';

export function FunnelStats({ funnelStats, onOpenEntityResolution }) {
  if (!funnelStats) return null;

  return (
    <div className="funnel-bar">
      <div className="funnel-metrics-row">
        <div className="funnel-metric-item">
          <div className="funnel-num text-cyan">{funnelStats.totalDiscovered}</div>
          <div className="funnel-label">Xom takliflar topildi</div>
        </div>

        <div className="funnel-divider">→</div>

        <div className="funnel-metric-item">
          <div className="funnel-num text-rose">-{funnelStats.discardedByBudget}</div>
          <div className="funnel-label">Budjet/Parametrga mos emas</div>
        </div>

        <div className="funnel-divider">→</div>

        <div className="funnel-metric-item">
          <div className="funnel-num text-amber">-{funnelStats.duplicatesMerged}</div>
          <div className="funnel-label">Dublikatlar birlashtirildi</div>
        </div>

        <div className="funnel-divider">→</div>

        <div className="funnel-metric-item active-metric">
          <div className="funnel-num text-emerald">{funnelStats.finalCurated}</div>
          <div className="funnel-label">Haqiqiy saralangan mahsulot</div>
        </div>
      </div>

      <button 
        type="button" 
        className="entity-resolution-btn"
        onClick={onOpenEntityResolution}
        title="Turli do'konlardagi bir xil mahsulotlar qanday aniqlanganini ko'rish"
      >
        <GitMerge size={15} />
        <span>Entity Resolution jarayonini ko‘rish</span>
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
