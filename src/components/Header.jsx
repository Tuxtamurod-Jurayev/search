import React from 'react';
import { Sparkles, Cpu, Layers, GitCompare, BellRing, ShieldCheck } from 'lucide-react';

export function Header({ onOpenArchitecture, compareList, onOpenCompare }) {
  return (
    <header className="topdim-header">
      <div className="header-container">
        {/* Brand */}
        <div className="brand-group">
          <div className="logo-badge">
            <span className="logo-icon">
              <Sparkles size={22} className="sparkle-anim" />
            </span>
            <div className="logo-text-wrap">
              <div className="logo-title-row">
                <span className="logo-brand">TOPDIM</span>
                <span className="logo-ai-pill">AI AGENT</span>
              </div>
              <span className="logo-sub">Bozorni o‘zi qidiradi</span>
            </div>
          </div>
        </div>

        {/* Center Tagline / Trust Badges */}
        <div className="header-center-badges">
          <span className="store-pill uzum">Uzum</span>
          <span className="store-pill asaxiy">Asaxiy</span>
          <span className="store-pill olcha">Olcha</span>
          <span className="store-pill texnomart">Texnomart</span>
          <span className="store-pill olx">OLX</span>
          <span className="header-divider">|</span>
          <span className="agent-status-badge">
            <span className="status-dot"></span>
            AI Narx & Shaffoflik Agenti
          </span>
        </div>

        {/* Header Actions */}
        <div className="header-actions">
          {compareList.length > 0 && (
            <button 
              className="action-btn compare-btn"
              onClick={onOpenCompare}
              title="Tanlangan mahsulotlarni taqqoslash"
            >
              <GitCompare size={16} />
              <span>Taqqoslash ({compareList.length})</span>
            </button>
          )}

          <button 
            className="action-btn architecture-btn" 
            onClick={onOpenArchitecture}
            title="Startup texnik arxitekturasi va TZ spetsifikatsiyasi"
          >
            <Cpu size={16} />
            <span>Tizim Arxitekturasi (TZ)</span>
          </button>
        </div>
      </div>
    </header>
  );
}
