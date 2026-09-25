import React from 'react';
import { Filter, Globe2 } from 'lucide-react';

export function UserRequirementSummary({ 
  selectedCondition, 
  onConditionToggle, 
  activePlatforms, 
  onTogglePlatform,
  totalResults
}) {
  const stores = [
    { id: 'uzum', name: 'Uzum' },
    { id: 'olcha', name: 'Olcha' },
    { id: 'asaxiy', name: 'Asaxiy' },
    { id: 'texnomart', name: 'Texnomart' },
    { id: 'olx', name: 'OLX' }
  ];

  return (
    <div className="filter-bar-minimal">
      {/* Left: Total Results */}
      <div className="results-counter-pill">
        <strong>{totalResults} ta</strong> mahsulot topildi
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
              <span>{isActive ? '✓' : ''} {s.name}</span>
            </button>
          );
        })}
      </div>

      {/* Right: Condition Toggles */}
      <div className="condition-filter-minimal">
        <span className="filter-caption">Holati:</span>
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
            OLX B/U
          </button>
        </div>
      </div>
    </div>
  );
}
