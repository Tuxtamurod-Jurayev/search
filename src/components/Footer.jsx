import React from 'react';
import { Sparkles, ShieldCheck, Cpu } from 'lucide-react';

export function Footer({ onOpenArchitecture }) {
  return (
    <footer className="topdim-footer">
      <div className="footer-container">
        <div className="footer-top-row">
          <div className="footer-brand">
            <div className="brand-logo-row">
              <Sparkles size={18} className="text-cyan sparkle-anim" />
              <span className="brand-title">TOPDIM AI</span>
              <span className="badge-agent">AI Xarid Agenti</span>
            </div>
            <p className="brand-slogan">“Nima kerakligini ayting. Bozorni o‘zi qidiradi.”</p>
          </div>

          <div className="footer-sources-block">
            <span className="sources-label">Qamrab olingan manbalar:</span>
            <div className="sources-pills">
              <span className="pill">Uzum Market (Open API)</span>
              <span className="pill">Asaxiy (Product Feed)</span>
              <span className="pill">Olcha.uz</span>
              <span className="pill">Texnomart</span>
              <span className="pill">MediaPark</span>
              <span className="pill">OLX (Public Listings)</span>
              <span className="pill">Telegram (@savdo hamkorlar)</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row">
          <div className="footer-legal">
            <ShieldCheck size={14} className="text-muted" />
            <span>
              Topdim AI saytlarning robots.txt va crawling qoidalariga qat’iy rioya qiladi. 
              Narxlar do‘konlarning ommaviy sahifalari va rasmiy API orqali tekshiriladi.
            </span>
          </div>

          <div className="footer-links">
            <button type="button" className="footer-link-btn" onClick={onOpenArchitecture}>
              <Cpu size={14} />
              <span>Texnik TZ Hujjati</span>
            </button>
            <span className="footer-copy">© 2026 Topdim AI. Barcha huquqlar himoyalangan.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
