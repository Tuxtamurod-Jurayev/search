import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, X } from 'lucide-react';
import { getQuickSuggestions, formatPrice } from '../services/searchEngine';

export function SearchHero({ onSearch, currentQuery, selectedCategory = 'ALL', onSelectCategory }) {
  const [inputText, setInputText] = useState(currentQuery || '');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchWrapRef = useRef(null);

  useEffect(() => {
    setInputText(currentQuery || '');
  }, [currentQuery]);

  useEffect(() => {
    if (inputText.trim().length >= 2) {
      const list = getQuickSuggestions(inputText, 5);
      setSuggestions(list);
      setIsDropdownOpen(list.length > 0);
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  }, [inputText]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchWrapRef.current && !searchWrapRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    { id: 'ALL', label: 'Barchasi' },
    { id: 'maishiy', label: 'Maishiy texnika' },
    { id: 'smartfon', label: 'Smartfonlar' },
    { id: 'noutbuk', label: 'Noutbuklar' },
    { id: 'tv_audio', label: 'Televizorlar' },
    { id: 'iqlim', label: 'Konditsionerlar' },
    { id: 'vacuum', label: 'Changyutgichlar' },
    { id: 'oshxona', label: 'Oshxona' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    setIsDropdownOpen(false);
    onSearch(inputText, selectedCategory);
  };

  const handleSelectSuggestion = (suggestedItem) => {
    setInputText(suggestedItem.name);
    setIsDropdownOpen(false);
    onSearch(suggestedItem.name, selectedCategory);
  };

  const handleCategoryClick = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
  };

  return (
    <section className="search-hero-minimal">
      <div className="hero-content-minimal">
        <h1 className="hero-headline-minimal">
          Nima kerakligini ayting. <span className="headline-gradient">Bozorni o‘zi qidiradi.</span>
        </h1>
        <p className="hero-subtext-minimal">
          Uzum, Olcha, Asaxiy, Texnomart va OLX narxlarini bir joyda solishtiring.
        </p>

        {/* Clean Search Input */}
        <div className="search-box-outer-wrap" ref={searchWrapRef}>
          <form onSubmit={handleSubmit} className="search-box-minimal">
            <div className="search-input-wrap">
              <Search size={20} className="search-icon-muted" />
              <input
                type="text"
                className="search-input-field"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onFocus={() => {
                  if (suggestions.length > 0) setIsDropdownOpen(true);
                }}
                placeholder="Mahsulot yoki texnika nomini yozing..."
                autoComplete="off"
              />
              {inputText && (
                <button 
                  type="button" 
                  className="clear-search-btn"
                  onClick={() => {
                    setInputText('');
                    setIsDropdownOpen(false);
                    onSearch('', selectedCategory);
                  }}
                  title="Tozalash"
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

          {/* Autocomplete Suggestions */}
          {isDropdownOpen && suggestions.length > 0 && (
            <div className="autocomplete-dropdown">
              <div className="autocomplete-items-list">
                {suggestions.map((item) => (
                  <div
                    key={item.id}
                    className="autocomplete-item"
                    onClick={() => handleSelectSuggestion(item)}
                  >
                    <img src={item.image} alt={item.name} className="autocomplete-thumb" />
                    <div className="autocomplete-info">
                      <div className="autocomplete-name">{item.name}</div>
                      <div className="autocomplete-meta">
                        <span className="autocomplete-cat">{item.categoryLabel || item.brand}</span>
                        <span className="autocomplete-price">{formatPrice(item.price)} so‘m</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Soddalashtirilgan toifalar paneli (bitta toza qatorda) */}
        <div className="hero-categories-tabs">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                className={`hero-cat-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat.id)}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
