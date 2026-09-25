import React, { useState } from 'react';
import { Search, Sparkles, CornerDownLeft, Zap, ArrowRight, RefreshCw } from 'lucide-react';
import { SAMPLE_QUERIES } from '../data/mockData';

export function SearchHero({ onSearch, isSearching, currentQuery }) {
  const [inputText, setInputText] = useState(currentQuery || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSearch(inputText);
  };

  const handleSelectSample = (sample) => {
    setInputText(sample.query);
    onSearch(sample.query);
  };

  return (
    <section className="search-hero">
      <div className="hero-glow-backdrop"></div>
      
      <div className="hero-content">
        <div className="hero-pill-badge">
          <Sparkles size={14} className="accent-sparkle" />
          <span>O‘zbekiston bozoridagi birinchi AI Xarid Agenti</span>
        </div>

        <h1 className="hero-headline">
          Nima kerakligini ayting.<br />
          <span className="headline-gradient">Bozorni o‘zi qidiradi.</span>
        </h1>

        <p className="hero-subtext">
          Mahsulot nomini qidirish shart emas. Ehtiyojingiz, budjetingiz yoki foydalanish maqsadingizni yozing —
          AI do‘konlar (Uzum, Asaxiy, Olcha, Texnomart va OLX) bo‘yicha tahlil qilib, eng mosini topadi va sababini tushuntiradi.
        </p>

        {/* Natural Language Search Input */}
        <form onSubmit={handleSubmit} className="search-box-wrapper">
          <div className="search-box-inner">
            <div className="search-icon-box">
              {isSearching ? (
                <RefreshCw size={22} className="spin-anim text-cyan" />
              ) : (
                <Sparkles size={22} className="text-cyan sparkle-anim" />
              )}
            </div>

            <textarea
              className="search-textarea"
              rows={2}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Masalan: Menga 3 mln so‘mgacha telefon kerak. Batareyasi kuchli bo‘lsin, kamerasi yaxshi bo‘lsin, Yandex Taxi uchun ishlataman..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />

            <button 
              type="submit" 
              className={`search-submit-btn ${isSearching ? 'disabled' : ''}`}
              disabled={isSearching || !inputText.trim()}
            >
              {isSearching ? (
                <span>Tahlil qilinmoqda...</span>
              ) : (
                <>
                  <span>AI Qidiruv</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Preset Sample Prompts */}
        <div className="sample-prompts-section">
          <div className="sample-label">
            <Zap size={14} className="text-amber" />
            <span>Tayyor ehtiyoj namunalari:</span>
          </div>
          <div className="sample-chips-grid">
            {SAMPLE_QUERIES.map((sample) => (
              <button
                key={sample.id}
                type="button"
                className="sample-chip"
                onClick={() => handleSelectSample(sample)}
              >
                <span className="sample-chip-title">{sample.title}</span>
                <span className="sample-chip-hint">{sample.tags.join(' • ')}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
