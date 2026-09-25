import React from 'react';
import { X, GitMerge, CheckCircle2, ArrowRight, Database, Sparkles, Filter, ShieldAlert } from 'lucide-react';

export function EntityResolutionModal({ onClose }) {
  const matchingExample = [
    {
      source: 'Asaxiy',
      rawTitle: 'Smartfon Xiaomi Redmi Note 13 8/256GB Midnight Black (Global)',
      extractedBrand: 'Xiaomi',
      extractedModel: 'Redmi Note 13',
      extractedRam: '8GB',
      extractedStorage: '256GB',
      extractedColor: 'Midnight Black',
      status: 'MATCHED'
    },
    {
      source: 'Uzum Market',
      rawTitle: 'Xiaomi Redmi Note 13 8/256GB qora, 2 SIM',
      extractedBrand: 'Xiaomi',
      extractedModel: 'Redmi Note 13',
      extractedRam: '8GB',
      extractedStorage: '256GB',
      extractedColor: 'Black',
      status: 'MATCHED'
    },
    {
      source: 'Olcha.uz',
      rawTitle: 'Xiaomi 13 Note 8/256 GB Qora (Official)',
      extractedBrand: 'Xiaomi',
      extractedModel: 'Redmi Note 13',
      extractedRam: '8GB',
      extractedStorage: '256GB',
      extractedColor: 'Black',
      status: 'MATCHED'
    },
    {
      source: 'Texnomart',
      rawTitle: 'Redmi Note 13 256GB Black NFC',
      extractedBrand: 'Xiaomi',
      extractedModel: 'Redmi Note 13',
      extractedRam: '8GB (Default)',
      extractedStorage: '256GB',
      extractedColor: 'Black',
      status: 'MATCHED'
    },
    {
      source: 'OLX O‘zbekiston',
      rawTitle: 'Redmi note 13 8/256 ideal sostoyanie karobka dakument bor b/u',
      extractedBrand: 'Xiaomi',
      extractedModel: 'Redmi Note 13',
      extractedRam: '8GB',
      extractedStorage: '256GB',
      extractedColor: 'Any',
      status: 'MATCHED (Ishlatilgan)'
    }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container entity-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="entity-badge-wrap">
            <GitMerge size={16} className="text-cyan sparkle-anim" />
            <span className="modal-subtitle">BACKEND CORE ARCHITECTURE (TZ 7, 8, 31-MODUL)</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <h2 className="modal-title">Product Entity Resolution & Normalizatsiya</h2>
        <p className="modal-description">
          Loyiha muvaffaqiyatining 80% kaliti — turli do‘konlardagi betartib sarlavhalarni tahlil qilib, 
          bitta <strong>Canonical Product (Yagona Mahsulot)</strong> ga bog‘lashdir. Aks holda foydalanuvchiga 
          bitta telefon 150 ta dublikat bo‘lib ko‘rinadi.
        </p>

        {/* Canonical Output Hero */}
        <div className="canonical-output-card">
          <div className="canonical-label">
            <Sparkles size={16} className="text-emerald" />
            <span>YARATILGAN YAGONA CANONICAL PRODUCT:</span>
          </div>
          <div className="canonical-name">Xiaomi Redmi Note 13 (8GB RAM / 256GB Xotira)</div>
          <div className="canonical-attributes">
            <span className="attr-pill">Brand: Xiaomi</span>
            <span className="attr-pill">Model: Redmi Note 13</span>
            <span className="attr-pill">RAM: 8 GB</span>
            <span className="attr-pill">Storage: 256 GB</span>
            <span className="attr-pill">Category: Smartphone</span>
          </div>
        </div>

        {/* Transformation Flow */}
        <div className="resolution-table-wrap">
          <h4 className="table-heading">Bozordan kelgan xom sarlavhalar va ularning tahlili:</h4>
          
          <table className="entity-table">
            <thead>
              <tr>
                <th>Manba (Source)</th>
                <th>Do‘kondagi asl xom sarlavha (Raw Title)</th>
                <th>AI Normalizator ajratgan kalitlar</th>
                <th>Holat</th>
              </tr>
            </thead>
            <tbody>
              {matchingExample.map((item, i) => (
                <tr key={i}>
                  <td>
                    <span className="entity-source-badge">{item.source}</span>
                  </td>
                  <td className="raw-title-cell">
                    <code>"{item.rawTitle}"</code>
                  </td>
                  <td>
                    <div className="tokens-grid">
                      <span>{item.extractedBrand}</span>
                      <span>{item.extractedModel}</span>
                      <span>{item.extractedRam}</span>
                      <span>{item.extractedStorage}</span>
                    </div>
                  </td>
                  <td>
                    <span className="matched-pill">
                      <CheckCircle2 size={13} className="text-emerald" />
                      <span>{item.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Crucial Distinctions Rule Box (TZ Section 7) */}
        <div className="strict-rules-box">
          <div className="rules-header">
            <ShieldAlert size={16} className="text-amber" />
            <strong>Ajratish qoidalari (Birlashtirib yuborish qat’iyan taqiqlangan holatlar):</strong>
          </div>
          <ul className="rules-list">
            <li><strong>Xotira sig‘imi:</strong> 128GB va 256GB hech qachon bitta mahsulot bo‘lmaydi.</li>
            <li><strong>Model seriyasi:</strong> iPhone 13 va iPhone 13 Pro alohida canonical mahsulotlardir.</li>
            <li><strong>Holati:</strong> Yangi (New) va Ishlatilgan (Used - OLX) takliflar bir xil canonical ID ichida narx qatori sifatida ajratiladi, lekin kafolat turi alohida ko‘rsatiladi.</li>
          </ul>
        </div>

        <div className="modal-actions-bar">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Tushunarli, yopish
          </button>
        </div>
      </div>
    </div>
  );
}
