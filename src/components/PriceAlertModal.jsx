import React, { useState } from 'react';
import { X, BellRing, Send, CheckCircle2, MessageSquare, Smartphone } from 'lucide-react';
import { formatPrice } from '../services/aiParser';

export function PriceAlertModal({ product, currentPrice, onClose }) {
  if (!product) return null;

  const defaultTarget = Math.round((currentPrice * 0.92) / 10000) * 10000;
  const [targetPrice, setTargetPrice] = useState(defaultTarget);
  const [channel, setChannel] = useState('telegram');
  const [contactInfo, setContactInfo] = useState('@username');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container alert-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="alert-header-badge">
            <BellRing size={16} className="text-cyan sparkle-anim" />
            <span className="modal-subtitle">PRICE DROP NOTIFIER</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <h2 className="modal-title">{product.normalized_name}</h2>
        <p className="modal-description">
          Hozirgi narx: <strong className="text-cyan">{formatPrice(currentPrice)} so‘m</strong>.
          Narx belgilangan miqdorga tushishi bilan sizga birinchi bo‘lib xabar jo‘natiladi.
        </p>

        {isSubmitted ? (
          <div className="alert-success-box">
            <CheckCircle2 size={42} className="text-emerald success-icon" />
            <h3>Ogohlantirish faollashtirildi!</h3>
            <p>
              Narx <strong>{formatPrice(targetPrice)} so‘m</strong> yoki undan pastga tushganida 
              <strong> {contactInfo}</strong> ga darhol xabarnoma yuboriladi.
            </p>

            <div className="telegram-preview-card">
              <div className="preview-header">
                <Send size={14} className="text-cyan" />
                <span>Telegram Bot (@topdim_alert_bot):</span>
              </div>
              <p className="preview-msg">
                🔔 <strong>NARX TUSHDI!</strong><br />
                Siz kuzatayotgan <em>{product.normalized_name}</em> narxi {formatPrice(currentPrice)} so‘mdan 
                <strong> {formatPrice(targetPrice)} so‘mga</strong> tushdi!<br />
                Do‘kon: Asaxiy • Holati: Yangi<br />
                <span className="text-cyan">topdim.uz/p/{product.id}</span>
              </p>
            </div>

            <button type="button" className="btn-secondary" onClick={onClose}>
              Yaxshi, tushunarli
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="alert-form">
            <div className="form-group">
              <label className="form-label">
                Qaysi narxga tushganda xabar berilsin?
              </label>
              <div className="price-input-wrap">
                <input
                  type="number"
                  step={10000}
                  className="form-input"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(Number(e.target.value))}
                  required
                />
                <span className="input-currency-badge">so‘m</span>
              </div>
              <div className="price-preset-pills">
                <button 
                  type="button" 
                  className="pill-btn"
                  onClick={() => setTargetPrice(Math.round((currentPrice * 0.95) / 10000) * 10000)}
                >
                  -5% ({formatPrice(Math.round((currentPrice * 0.95) / 10000) * 10000)})
                </button>
                <button 
                  type="button" 
                  className="pill-btn"
                  onClick={() => setTargetPrice(Math.round((currentPrice * 0.90) / 10000) * 10000)}
                >
                  -10% ({formatPrice(Math.round((currentPrice * 0.90) / 10000) * 10000)})
                </button>
                <button 
                  type="button" 
                  className="pill-btn"
                  onClick={() => setTargetPrice(Math.round((currentPrice * 0.85) / 10000) * 10000)}
                >
                  -15% ({formatPrice(Math.round((currentPrice * 0.85) / 10000) * 10000)})
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Xabarnoma qabul qilish kanali:</label>
              <div className="channel-select-grid">
                <button
                  type="button"
                  className={`channel-card ${channel === 'telegram' ? 'active' : ''}`}
                  onClick={() => {
                    setChannel('telegram');
                    setContactInfo('@username');
                  }}
                >
                  <Send size={18} className="text-cyan" />
                  <span>Telegram</span>
                </button>
                <button
                  type="button"
                  className={`channel-card ${channel === 'sms' ? 'active' : ''}`}
                  onClick={() => {
                    setChannel('sms');
                    setContactInfo('+998 90 123 45 67');
                  }}
                >
                  <Smartphone size={18} className="text-emerald" />
                  <span>SMS Xabar</span>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                {channel === 'telegram' ? 'Telegram foydalanuvchi nomi (@username):' : 'Telefon raqamingiz:'}
              </label>
              <input
                type="text"
                className="form-input"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                required
              />
            </div>

            <div className="modal-actions-bar">
              <button type="button" className="btn-secondary" onClick={onClose}>
                Bekor qilish
              </button>
              <button type="submit" className="btn-primary">
                <BellRing size={16} />
                <span>Ogohlantirishni yoqish</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
