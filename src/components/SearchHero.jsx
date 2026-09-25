import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, X } from 'lucide-react';

export function SearchHero({ onSearch, currentQuery }) {
  const [inputText, setInputText] = useState(currentQuery || '');

  const quickTags = [
    { label: 'Barchasi', q: 'barchasi' },
    { label: 'iPhone 13', q: 'iphone 13' },
    { label: 'Samsung A55', q: 'samsung a55' },
    { label: 'Redmi Note 13', q: 'redmi note 13' },
    { label: 'Honor X9b', q: 'honor x9b' },
    { label: 'MacBook Air', q: 'macbook air' },
    { label: '≤ 3 mln (Taxi)', q: '3 mln taxi' },
    { label: 'Gaming (PUBG)', q: 'pubg poco' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputText);
  };

  const handleTagClick = (tagQuery) => {
    setInputText(tagQuery === 'barchasi' ? '' : tagQuery);
    onSearch(tagQuery);
  };

  return (
    <section className="search-hero-minimal">
      <div className="hero-content-minimal">
        <h1 className="hero-headline-minimal">
          Nima kerakligini ayting. <span className="headline-gradient">Bozorni o‘zi qidiradi.</span>
        </h1>
        <p className="hero-subtext-minimal">
          Uzum, Olcha, Asaxiy, Texnomart va OLX narxlarini bir joyda solishtiring va eng ma’qulini tanlang.
        </p>

        {/* Clean Search Input */}
        <form onSubmit={handleSubmit} className="search-box-minimal">
          <div className="search-input-wrap">
            <Search size={20} className="search-icon-muted" />
            <input
              type="text"
              className="search-input-field"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Masalan: iPhone 13, Samsung A55, 3 mln gacha telefon, noutbuk..."
            />
            {inputText && (
              <button 
                type="button" 
                className="clear-search-btn"
                onClick={() => {
                  setInputText('');
                  onSearch('');
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>
          <button type="submit" className="search-btn-primary">
            <span>Qidirish</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="quick-tags-row">
          <span className="quick-tags-label">Tezkor:</span>
          {quickTags.map((tag, i) => (
            <button
              key={i}
              type="button"
              className="quick-tag-chip"
              onClick={() => handleTagClick(tag.q)}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
