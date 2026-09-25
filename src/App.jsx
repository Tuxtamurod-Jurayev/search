import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchHero } from './components/SearchHero';
import { UserRequirementSummary } from './components/UserRequirementSummary';
import { ProductCard } from './components/ProductCard';
import { PriceHistoryModal } from './components/PriceHistoryModal';
import { PriceAlertModal } from './components/PriceAlertModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { CompareDrawer } from './components/CompareDrawer';
import { Footer } from './components/Footer';
import { searchProducts } from './services/searchEngine';
import { AlertCircle, ChevronDown, Sparkles } from 'lucide-react';

export function App() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('score');
  const [selectedCondition, setSelectedCondition] = useState('ALL');
  const [visibleCount, setVisibleCount] = useState(12);

  const [activePlatforms, setActivePlatforms] = useState({
    uzum: true,
    olcha: true,
    asaxiy: true,
    texnomart: true,
    olx: true
  });

  // Comparison list state
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Modal states
  const [historyProduct, setHistoryProduct] = useState(null);
  const [alertModalData, setAlertModalData] = useState(null);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);

  // Search Results derived dynamically
  const searchData = useMemo(() => {
    return searchProducts(query, {
      categoryGroup: selectedCategory,
      sortBy
    });
  }, [query, selectedCategory, sortBy]);

  const handleSearch = (newQuery, category = selectedCategory) => {
    setQuery(newQuery);
    setSelectedCategory(category);
    setVisibleCount(12);
  };

  const handleSelectCategory = (newCat) => {
    setSelectedCategory(newCat);
    setVisibleCount(12);
  };

  const handleTogglePlatform = (platformId) => {
    setActivePlatforms(prev => ({
      ...prev,
      [platformId]: !prev[platformId]
    }));
  };

  const handleToggleCompare = (product) => {
    setCompareList(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        alert('Taqqoslash uchun eng ko‘pi bilan 4 ta mahsulot tanlash mumkin.');
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleRemoveCompare = (productId) => {
    setCompareList(prev => prev.filter(p => p.id !== productId));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  // Visible items slice for performance & pagination
  const displayedItems = searchData.items.slice(0, visibleCount);
  const hasMore = visibleCount < searchData.items.length;

  return (
    <div className="topdim-app">
      {/* Header */}
      <Header 
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        compareList={compareList}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Enlarged Multi-Category Search Hero */}
      <SearchHero 
        onSearch={handleSearch}
        currentQuery={query}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
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
          selectedCategory={selectedCategory}
          onResetCategory={() => handleSelectCategory('ALL')}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Product Cards Stack */}
        <div className="products-list-section">
          {searchData.items.length === 0 ? (
            <div className="empty-results-card">
              <AlertCircle size={40} className="text-amber" />
              <h3>Ushbu so‘rov bo‘yicha mahsulot topilmadi</h3>
              <p>Qidiruv so‘zini o‘zgartirib ko‘ring yoki yuqoridagi toifalardan birini tanlang.</p>
              <button 
                type="button" 
                className="reset-search-btn"
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('ALL');
                }}
              >
                <span>Barcha mahsulotlarni ko‘rish</span>
              </button>
            </div>
          ) : (
            <>
              <div className="products-stack">
                {displayedItems.map((prod) => {
                  const isCompared = compareList.some(p => p.id === prod.id);
                  return (
                    <ProductCard 
                      key={prod.id}
                      product={prod}
                      onOpenPriceHistory={(p) => setHistoryProduct(p)}
                      onOpenPriceAlert={(p, price) => setAlertModalData({ product: p, currentPrice: price })}
                      onToggleCompare={handleToggleCompare}
                      isCompared={isCompared}
                      selectedCondition={selectedCondition}
                      activePlatforms={activePlatforms}
                    />
                  );
                })}
              </div>

              {/* Load More Button if catalog has more items */}
              {hasMore && (
                <div className="load-more-wrap">
                  <button 
                    type="button" 
                    className="load-more-btn"
                    onClick={() => setVisibleCount(prev => prev + 12)}
                  >
                    <span>Yana 12 ta variantni yuklash ({searchData.items.length - visibleCount} ta qoldi)</span>
                    <ChevronDown size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Comparison Drawer Modal */}
      {isCompareOpen && (
        <CompareDrawer 
          compareList={compareList}
          onRemove={handleRemoveCompare}
          onClear={handleClearCompare}
          onClose={() => setIsCompareOpen(false)}
        />
      )}

      {/* Price History Modal */}
      {historyProduct && (
        <PriceHistoryModal 
          product={historyProduct}
          onClose={() => setHistoryProduct(null)}
          onOpenAlert={(p, price) => setAlertModalData({ product: p, currentPrice: price })}
        />
      )}

      {/* Price Alert Modal */}
      {alertModalData && (
        <PriceAlertModal 
          product={alertModalData.product}
          currentPrice={alertModalData.currentPrice}
          onClose={() => setAlertModalData(null)}
        />
      )}

      {/* System Architecture Modal */}
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
