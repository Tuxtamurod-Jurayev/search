import React from 'react';
import { Target, DollarSign, Smartphone, Laptop, Check, Filter, Globe2 } from 'lucide-react';
import { formatPrice } from '../services/aiParser';

export function UserRequirementSummary({ 
  parsedIntent, 
  onConditionToggle, 
  selectedCondition,
  activePlatforms,
  onTogglePlatform
}) {
  if (!parsedIntent) return null;

  const { maxPrice, category, useCase, priorities, understoodSummary } = parsedIntent;

  const platforms = [
    { id: 'uzum', name: 'Uzum Market', color: 'uzum' },
    { id: 'olcha', name: 'Olcha (Live API)', color: 'olcha' },
    { id: 'asaxiy', name: 'Asaxiy', color: 'asaxiy' },
    { id: 'texnomart', name: 'Texnomart', color: 'texnomart' },
    { id: 'olx', name: 'OLX (B/U)', color: 'olx' }
  ];

  return (
    <div className="requirement-summary-card">
      <div className="summary-left">
        <div className="summary-badge">
          <Target size={14} className="text-cyan" />
          <span>SIZNING TALABINGIZ ASOSIDA TAHLIL:</span>
        </div>

        <div className="summary-tags-wrap">
          {/* Budget */}
          <div className="req-tag budget-tag">
            <DollarSign size={14} />
            <span>Budjet: <strong>{maxPrice ? `≤ ${formatPrice(maxPrice)} so'm` : 'Cheklovsiz'}</strong></span>
          </div>

          {/* Use Case */}
          <div className="req-tag usecase-tag">
            <span>Maqsad: <strong>{useCase}</strong></span>
          </div>

          {/* Category */}
          <div className="req-tag">
            {category === 'laptop' ? <Laptop size={14} /> : <Smartphone size={14} />}
            <span>Kategoriya: <strong>{category === 'laptop' ? 'Noutbuk' : 'Smartfon'}</strong></span>
          </div>

          {/* Priorities */}
          {understoodSummary.keyNeeds.map((need, idx) => (
            <div key={idx} className="req-tag priority-tag">
              <span>{need}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Options: Condition & Platform toggles */}
      <div className="summary-right">
        {/* Condition Filter */}
        <div className="filter-row-group">
          <span className="filter-title">Holati:</span>
          <div className="condition-toggle-group">
            <button
              type="button"
              className={`cond-btn ${selectedCondition === 'ALL' ? 'active' : ''}`}
              onClick={() => onConditionToggle('ALL')}
            >
              Barchasi
            </button>
            <button
              type="button"
              className={`cond-btn ${selectedCondition === 'NEW_ONLY' ? 'active' : ''}`}
              onClick={() => onConditionToggle('NEW_ONLY')}
            >
              Faqat Yangi
            </button>
            <button
              type="button"
              className={`cond-btn ${selectedCondition === 'USED_ALLOWED' ? 'active' : ''}`}
              onClick={() => onConditionToggle('USED_ALLOWED')}
            >
              OLX / B/U
            </button>
          </div>
        </div>

        {/* Platform Selection Chips */}
        <div className="platforms-filter-group">
          <span className="filter-title">
            <Globe2 size={12} className="text-cyan" />
            Manbalar:
          </span>
          <div className="platform-checkboxes">
            {platforms.map(p => {
              const isActive = activePlatforms[p.id] !== false;
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`platform-filter-chip ${isActive ? 'active ' + p.color : 'inactive'}`}
                  onClick={() => onTogglePlatform(p.id)}
                  title={`${p.name} natijalarini yoqish/o'chirish`}
                >
                  <span className="check-box-indicator">{isActive ? '✓' : ''}</span>
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
