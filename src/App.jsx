import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchHero } from './components/SearchHero';
import { UserRequirementSummary } from './components/UserRequirementSummary';
import { ProductCard } from './components/ProductCard';
import { PriceHistoryModal } from './components/PriceHistoryModal';
import { PriceAlertModal } from './components/PriceAlertModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { Footer } from './components/Footer';
import { searchProducts } from './services/searchEngine';
import { Sparkles, AlertCircle } from 'lucide-react';

export function App() {
  const [query, setQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('ALL');
  const [activePlatforms, setActivePlatforms] = useState({
    uzum: true,
    olcha: true,
    asaxiy: true,
    texnomart: true,
    olx: true
  });

  // Modal states
  const [historyProduct, setHistoryProduct] = useState(null);
  const [alertModalData, setAlertModalData] = useState(null);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);

  // Search Results
  const [searchData, setSearchData] = useState(() => searchProducts(''));

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    const result = searchProducts(newQuery);
    setSearchData(result);
  };

  const handleTogglePlatform = (platformId) => {
    setActivePlatforms(prev => ({
      ...prev,
      [platformId]: !prev[platformId]
    }));
  };

  return (
    <div className="topdim-app">
      {/* Header */}
      <Header 
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        compareList={[]}
        onOpenCompare={() => {}}
      />

      {/* Clean Minimal Search Hero */}
      <SearchHero 
        onSearch={handleSearch}
        currentQuery={query}
      />

      {/* Main Results Container */}
      <main className="results-container">
        {/* Compact Filters & Results Counter */}
        <UserRequirementSummary 
          selectedCondition={selectedCondition}
          onConditionToggle={setSelectedCondition}
          activePlatforms={activePlatforms}
          onTogglePlatform={handleTogglePlatform}
          totalResults={searchData.items.length}
        />

        {/* Product Cards Stack */}
        <div className="products-list-section">
          {searchData.items.length === 0 ? (
            <div className="empty-results-card">
              <AlertCircle size={36} className="text-amber" />
              <h3>Mahsulot topilmadi</h3>
              <p>Qidiruv so‘zini o‘zgartirib ko‘ring yoki yuqoridagi tezkor tugmalardan birini bosing.</p>
            </div>
          ) : (
            <div className="products-stack">
              {searchData.items.map((prod, index) => (
                <ProductCard 
                  key={prod.id || index}
                  product={prod}
                  onOpenPriceHistory={(p) => setHistoryProduct(p)}
                  onOpenPriceAlert={(p, price) => setAlertModalData({ product: p, currentPrice: price })}
                  selectedCondition={selectedCondition}
                  activePlatforms={activePlatforms}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {historyProduct && (
        <PriceHistoryModal 
          product={historyProduct}
          onClose={() => setHistoryProduct(null)}
          onOpenAlert={(p, price) => setAlertModalData({ product: p, currentPrice: price })}
        />
      )}

      {alertModalData && (
        <PriceAlertModal 
          product={alertModalData.product}
          currentPrice={alertModalData.currentPrice}
          onClose={() => setAlertModalData(null)}
        />
      )}

      {isArchitectureOpen && (
        <ArchitectureModal 
          onClose={() => setIsArchitectureOpen(false)}
        />
      )}

      {/* Footer */}
      <Footer onOpenArchitecture={() => setIsArchitectureOpen(true)} />
    </div>
  );
}

export default App;
