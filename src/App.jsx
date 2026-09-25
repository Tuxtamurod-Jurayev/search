import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchHero } from './components/SearchHero';
import { AiPipelineVisualizer } from './components/AiPipelineVisualizer';
import { UserRequirementSummary } from './components/UserRequirementSummary';
import { FunnelStats } from './components/FunnelStats';
import { ProductCard } from './components/ProductCard';
import { PriceHistoryModal } from './components/PriceHistoryModal';
import { SellerTransparencyModal } from './components/SellerTransparencyModal';
import { PriceAlertModal } from './components/PriceAlertModal';
import { EntityResolutionModal } from './components/EntityResolutionModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { CompareDrawer } from './components/CompareDrawer';
import { Footer } from './components/Footer';
import { parseUserQuery, rankProducts } from './services/aiParser';
import { performMasterSearch } from './services/liveSearchService';
import { CANONICAL_PRODUCTS, SAMPLE_QUERIES } from './data/mockData';
import { Sparkles, AlertCircle, ShoppingBag, Globe2, Radio } from 'lucide-react';

export function App() {
  const initialQuery = SAMPLE_QUERIES[0].query;
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState('ALL');
  const [compareList, setCompareList] = useState([]);

  // Active platform filters (Uzum, Olcha, Asaxiy, Texnomart, OLX)
  const [activePlatforms, setActivePlatforms] = useState({
    uzum: true,
    olcha: true,
    asaxiy: true,
    texnomart: true,
    olx: true
  });

  const handleTogglePlatform = (platformId) => {
    setActivePlatforms(prev => ({
      ...prev,
      [platformId]: !prev[platformId]
    }));
  };

  // Modals state
  const [historyProduct, setHistoryProduct] = useState(null);
  const [sellerModalData, setSellerModalData] = useState(null);
  const [alertModalData, setAlertModalData] = useState(null);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isEntityResolutionOpen, setIsEntityResolutionOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Compute parsed intent & ranked items
  const [parsedIntent, setParsedIntent] = useState(() => parseUserQuery(initialQuery));
  const [rankedData, setRankedData] = useState(() => rankProducts(parseUserQuery(initialQuery)));

  const handleSearch = async (newQuery) => {
    setQuery(newQuery);
    setIsSearching(true);
    
    try {
      const intent = parseUserQuery(newQuery);
      setParsedIntent(intent);

      // Perform real-time master search combining live Olcha API, extended catalog, and market engine
      const searchResults = await performMasterSearch(newQuery, intent);

      // Combine with any relevant canonical products from initial catalog
      const allCandidates = [...searchResults];
      CANONICAL_PRODUCTS.forEach(cp => {
        if (!allCandidates.some(c => c.id === cp.id || c.normalized_name.toLowerCase() === cp.normalized_name.toLowerCase())) {
          const matchTitle = cp.normalized_name.toLowerCase().includes(newQuery.toLowerCase()) ||
            newQuery.toLowerCase().includes(cp.brand.toLowerCase()) ||
            (intent.category && cp.category === intent.category);
          if (matchTitle) {
            allCandidates.push(cp);
          }
        }
      });

      const ranked = rankProducts(intent, allCandidates);
      setRankedData(ranked);
    } catch (err) {
      console.error('Master search error:', err);
      // Fallback
      const intent = parseUserQuery(newQuery);
      setParsedIntent(intent);
      setRankedData(rankProducts(intent, CANONICAL_PRODUCTS));
    } finally {
      setIsSearching(false);
    }
  };

  const handleToggleCompare = (product) => {
    if (compareList.some(item => item.id === product.id)) {
      setCompareList(compareList.filter(item => item.id !== product.id));
    } else {
      if (compareList.length >= 3) {
        alert('Bir vaqtning o‘zida maksimal 3 ta mahsulotni taqqoslash mumkin.');
        return;
      }
      setCompareList([...compareList, product]);
    }
  };

  const handleRemoveCompare = (productId) => {
    setCompareList(compareList.filter(item => item.id !== productId));
  };

  return (
    <div className="topdim-app">
      {/* Global Header */}
      <Header 
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        compareList={compareList}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Main Hero Search Section */}
      <SearchHero 
        onSearch={handleSearch}
        isSearching={isSearching}
        currentQuery={query}
      />

      {/* Live AI Reasoning Pipeline Bar */}
      {isSearching && (
        <AiPipelineVisualizer 
          isSearching={isSearching} 
          onComplete={() => setIsSearching(false)} 
        />
      )}

      {/* Results Content Area */}
      <main className="results-container">
        {/* Parsed User Intent Breakdown & Store Filters */}
        <UserRequirementSummary 
          parsedIntent={parsedIntent}
          onConditionToggle={setSelectedCondition}
          selectedCondition={selectedCondition}
          activePlatforms={activePlatforms}
          onTogglePlatform={handleTogglePlatform}
        />

        {/* Data Filtering Funnel & Entity Resolution link */}
        <FunnelStats 
          funnelStats={rankedData.funnelStats}
          onOpenEntityResolution={() => setIsEntityResolutionOpen(true)}
        />

        {/* Curated Product Listings */}
        <div className="products-list-section">
          <div className="section-title-row">
            <div className="title-with-badge">
              <Sparkles size={18} className="text-cyan sparkle-anim" />
              <h2 className="section-title">TOPDIM AI TAVSIYA QILGAN VARIANTLAR</h2>
            </div>
            <div className="live-status-pill">
              <Radio size={14} className="text-emerald animate-pulse" />
              <span>Jonli bozor qidiruvi faol (Olcha, Uzum, Asaxiy, Texnomart, OLX)</span>
            </div>
          </div>

          {rankedData.items.length === 0 ? (
            <div className="empty-results-card">
              <AlertCircle size={40} className="text-amber" />
              <h3>Kiritilgan parametrlar bo‘yicha mos mahsulot topilmadi</h3>
              <p>Iltimos, budjetni oshirib ko‘ring yoki boshqa talab kiriting.</p>
            </div>
          ) : (
            <div className="products-stack">
              {rankedData.items.map((prod, index) => (
                <ProductCard 
                  key={prod.id || index}
                  product={prod}
                  rankIndex={index}
                  onOpenPriceHistory={(p) => setHistoryProduct(p)}
                  onOpenSellerTransparency={(seller, sourceName) => setSellerModalData({ seller, sourceName })}
                  onOpenPriceAlert={(p, price) => setAlertModalData({ product: p, currentPrice: price })}
                  onToggleCompare={handleToggleCompare}
                  isCompared={compareList.some(item => item.id === prod.id)}
                  selectedCondition={selectedCondition}
                  activePlatforms={activePlatforms}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modals & Drawers */}
      {historyProduct && (
        <PriceHistoryModal 
          product={historyProduct}
          onClose={() => setHistoryProduct(null)}
          onOpenAlert={(p, price) => setAlertModalData({ product: p, currentPrice: price })}
        />
      )}

      {sellerModalData && (
        <SellerTransparencyModal 
          seller={sellerModalData.seller}
          sourceName={sellerModalData.sourceName}
          onClose={() => setSellerModalData(null)}
        />
      )}

      {alertModalData && (
        <PriceAlertModal 
          product={alertModalData.product}
          currentPrice={alertModalData.currentPrice}
          onClose={() => setAlertModalData(null)}
        />
      )}

      {isEntityResolutionOpen && (
        <EntityResolutionModal 
          onClose={() => setIsEntityResolutionOpen(false)}
        />
      )}

      {isArchitectureOpen && (
        <ArchitectureModal 
          onClose={() => setIsArchitectureOpen(false)}
        />
      )}

      {isCompareOpen && (
        <CompareDrawer 
          compareList={compareList}
          onRemove={handleRemoveCompare}
          onClear={() => setCompareList([])}
          onClose={() => setIsCompareOpen(false)}
        />
      )}

      {/* Footer */}
      <Footer 
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
      />
    </div>
  );
}

export default App;
