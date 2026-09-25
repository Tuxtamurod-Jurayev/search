import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle, Award, Star, History, Undo2, BadgePercent } from 'lucide-react';

export function SellerTransparencyModal({ seller, sourceName, onClose }) {
  if (!seller) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container seller-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="seller-head-wrap">
            <span className="source-pill">{sourceName}</span>
            <h2 className="modal-title">{seller.name}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        {/* Score Hero */}
        <div className="seller-score-hero">
          <div className="score-radial-box">
            <div className="score-big-num">{seller.transparencyScore}</div>
            <div className="score-max">/ 100</div>
          </div>
          <div className="score-details">
            <h3 className="score-title">Sotuvchi Shaffoflik Indeksi (Transparency Score)</h3>
            <p className="score-disclaimer">
              <strong>Eslatma:</strong> Bu AI tomonidan to‘qib chiqarilgan baho emas. Bu faqat platformadagi 
              tekshirilgan rasmiy ko‘rsatkichlar (sharhlar soni, faoliyat muddati, qaytarish qoidalari va kafolat) 
              to‘liqligi asosida hisoblangan ob’ektiv faktik indeksdir.
            </p>
          </div>
        </div>

        {/* Facts List (TZ Section 11) */}
        <div className="seller-facts-grid">
          <div className="fact-item">
            <div className="fact-icon-wrap bg-cyan-dim">
              <Star size={18} className="text-cyan" />
            </div>
            <div className="fact-content">
              <span className="fact-label">Mijozlar reytingi</span>
              <strong className="fact-val">{seller.rating} / 5.0</strong>
            </div>
          </div>

          <div className="fact-item">
            <div className="fact-icon-wrap bg-purple-dim">
              <Award size={18} className="text-purple" />
            </div>
            <div className="fact-content">
              <span className="fact-label">Tekshirilgan sharhlar</span>
              <strong className="fact-val">{seller.reviewsCount?.toLocaleString()} ta sharh</strong>
            </div>
          </div>

          <div className="fact-item">
            <div className="fact-icon-wrap bg-emerald-dim">
              <Undo2 size={18} className="text-emerald" />
            </div>
            <div className="fact-content">
              <span className="fact-label">Qaytarish siyosati</span>
              <strong className="fact-val">{seller.returnPolicy}</strong>
            </div>
          </div>

          <div className="fact-item">
            <div className="fact-icon-wrap bg-amber-dim">
              <History size={18} className="text-amber" />
            </div>
            <div className="fact-content">
              <span className="fact-label">Bozordagi faoliyati</span>
              <strong className="fact-val">{seller.storeAge}</strong>
            </div>
          </div>
        </div>

        {/* Verification Checkpoints */}
        <div className="verification-checklist">
          <h4 className="checklist-heading">Xavfsizlik & Autentifikatsiya nazorati:</h4>
          
          <div className="check-row">
            <CheckCircle2 size={16} className="text-emerald" />
            <span>Platformada rasmiy ro‘yxatdan o‘tgan yuridik/jismoniy shaxs</span>
          </div>

          <div className="check-row">
            <CheckCircle2 size={16} className="text-emerald" />
            <span>O‘zbekiston Respublikasi iste’molchilar huquqlarini himoya qilish qoidalariga muvofiqlik</span>
          </div>

          <div className="check-row">
            <CheckCircle2 size={16} className="text-emerald" />
            <span>Kafolat taloni va fiskal chek taqdim etiladi</span>
          </div>
        </div>

        <div className="modal-actions-bar">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
}
