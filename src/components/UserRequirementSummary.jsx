import React from 'react';
import { ArrowUpDown, X } from 'lucide-react';

export function UserRequirementSummary({ 
  selectedCondition, 
  onConditionToggle, 
  activePlatforms, 
  onTogglePlatform,
  totalResults,
  selectedCategory,
  onResetCategory,
  sortBy,
  onSortChange
}) {
  const stores = [
    { id: 'uzum', name: 'Uzum' },
    { id: 'olcha', name: 'Olcha' },
    { id: 'asaxiy', name: 'Asaxiy' },
    { id: 'texnomart', name: 'Texnomart' },
    { id: 'olx', name: 'OLX' }
  ];

  const categoryNames = {
    maishiy: 'Maishiy texnika',
    iqlim: 'Konditsionerlar',
    vacuum: 'Changyutgichlar',
    oshxona: 'Oshxona',
    smartfon: 'Smartfonlar',
    noutbuk: 'Noutbuklar',
    tv_audio: 'Televizorlar'
  };

  return (
    <div className="filter-bar-minimal">
      {/* Left: Total Results & Active Category */}
      <div className="filter-left-group">
        <div className="results-counter-pill">
          <strong>{totalResults} ta</strong> mahsulot
        </div>

        {selectedCategory && selectedCategory !== 'ALL' && (
          <div className="active-category-pill">
            <span>{categoryNames[selectedCategory] || selectedCategory}</span>
            <button 
              type="button" 
              className="clear-cat-btn"
              onClick={onResetCategory}
              title="Barchasini ko‘rsatish"
            >
              <X size={12} />
            </button>
          </div>
        )}
      </div>

      {/* Middle: Store Toggles */}
      <div className="stores-filter-chips">
        <span className="filter-caption">Do‘konlar:</span>
        {stores.map(s => {
          const isActive = activePlatforms[s.id] !== false;
          return (
            <button
              key={s.id}
              type="button"
              className={`store-filter-btn ${isActive ? 'active' : 'inactive'}`}
              onClick={() => onTogglePlatform(s.id)}
            >
              <span>{isActive ? '✓ ' : ''}{s.name}</span>
            </button>
          );
        })}
      </div>

      {/* Right: Sorting & Condition */}
      <div className="filter-right-group">
        {/* Sort Select */}
        <div className="sort-selector-wrap">
          <ArrowUpDown size={13} className="sort-icon-muted" />
          <select 
            className="sort-dropdown"
            value={sortBy}
            onChange={(e) => onSortChange && onSortChange(e.target.value)}
          >
            <option value="score">Tavsiya etilgan</option>
            <option value="price_asc">Arzondan qimmatga</option>
            <option value="price_desc">Qimmatdan arzonga</option>
            <option value="discount">Katta chegirma</option>
          </select>
        </div>

        {/* Condition Toggles */}
        <div className="condition-filter-minimal">
          <div className="condition-btns">
            <button
              type="button"
              className={`cond-pill ${selectedCondition === 'ALL' ? 'active' : ''}`}
              onClick={() => onConditionToggle('ALL')}
            >
              Barchasi
            </button>
            <button
              type="button"
              className={`cond-pill ${selectedCondition === 'NEW_ONLY' ? 'active' : ''}`}
              onClick={() => onConditionToggle('NEW_ONLY')}
            >
              Yangi
            </button>
            <button
              type="button"
              className={`cond-pill ${selectedCondition === 'USED_ALLOWED' ? 'active' : ''}`}
              onClick={() => onConditionToggle('USED_ALLOWED')}
            >
              B/U
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
