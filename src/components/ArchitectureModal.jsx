import React, { useState } from 'react';
import { 
  X, 
  Cpu, 
  Database, 
  GitFork, 
  Calculator, 
  Clock, 
  DollarSign, 
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
  Server,
  ArrowRight,
  Code2
} from 'lucide-react';

export function ArchitectureModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('pipeline');

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container arch-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div className="arch-badge-wrap">
            <Cpu size={18} className="text-cyan sparkle-anim" />
            <span className="modal-subtitle">STARTUP TEXNIK ARXITEKTURASI VA TZ SPECIFIKATSIYASI</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <h2 className="modal-title">Topdim AI — Tizim Arxitekturasi</h2>
        <p className="modal-description">
          Loyiha Google qidiruvidan narx ko‘chiruvchi sayt emas, balki rasmiy API, ruxsat etilgan feed, 
          Entity Resolution va AI tahliliga asoslangan to‘laqonli <strong>AI Xarid Agenti</strong> hisoblanadi.
        </p>

        {/* Tab Navigation */}
        <div className="arch-tabs-nav">
          <button 
            type="button" 
            className={`arch-tab-btn ${activeTab === 'pipeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('pipeline')}
          >
            <GitFork size={15} />
            <span>1. Qidiruv Zanjiri</span>
          </button>

          <button 
            type="button" 
            className={`arch-tab-btn ${activeTab === 'db' ? 'active' : ''}`}
            onClick={() => setActiveTab('db')}
          >
            <Database size={15} />
            <span>2. Database Sxemasi</span>
          </button>

          <button 
            type="button" 
            className={`arch-tab-btn ${activeTab === 'ranking' ? 'active' : ''}`}
            onClick={() => setActiveTab('ranking')}
          >
            <Calculator size={15} />
            <span>3. Ranking Algoritmi</span>
          </button>

          <button 
            type="button" 
            className={`arch-tab-btn ${activeTab === 'intervals' ? 'active' : ''}`}
            onClick={() => setActiveTab('intervals')}
          >
            <Clock size={15} />
            <span>4. Crawl & Yangilanish</span>
          </button>

          <button 
            type="button" 
            className={`arch-tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveTab('roadmap')}
          >
            <DollarSign size={15} />
            <span>5. MVP & Monetizatsiya</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="arch-tab-content">
          {/* TAB 1: PIPELINE */}
          {activeTab === 'pipeline' && (
            <div className="tab-pane">
              <h3 className="pane-title">Qidiruv tizimining ishlash oqimi (Search Orchestration)</h3>
              
              <div className="pipeline-flow-diagram">
                <div className="flow-step-box">
                  <span className="step-num">01</span>
                  <strong>USER</strong>
                  <span className="step-sub">Tabiiy tilda ehtiyoj</span>
                </div>
                <div className="flow-arrow">→</div>

                <div className="flow-step-box highlight-cyan">
                  <span className="step-num">02</span>
                  <strong>AI QUERY PARSER</strong>
                  <span className="step-sub">NLP intent & parametrlar</span>
                </div>
                <div className="flow-arrow">→</div>

                <div className="flow-step-box">
                  <span className="step-num">03</span>
                  <strong>DISCOVERY & CRAWL</strong>
                  <span className="step-sub">Uzum, Asaxiy, Olcha, OLX</span>
                </div>
                <div className="flow-arrow">→</div>

                <div className="flow-step-box highlight-purple">
                  <span className="step-num">04</span>
                  <strong>ENTITY MATCHING</strong>
                  <span className="step-sub">Canonical Product mapping</span>
                </div>
                <div className="flow-arrow">→</div>

                <div className="flow-step-box highlight-emerald">
                  <span className="step-num">05</span>
                  <strong>AI SHOPPING AGENT</strong>
                  <span className="step-sub">"Nega aynan bu?" & Natijalar</span>
                </div>
              </div>

              <div className="tech-stack-card">
                <h4>Backend & Infratuzilma Steki (TZ 17-bo‘lim):</h4>
                <div className="tech-badges-grid">
                  <div className="tech-item"><Server size={14} /> <strong>Frontend:</strong> Next.js / React (SSR + Edge)</div>
                  <div className="tech-item"><Server size={14} /> <strong>Backend:</strong> Node.js + NestJS microservices</div>
                  <div className="tech-item"><Database size={14} /> <strong>Database:</strong> PostgreSQL (ACID) + Redis (Cache)</div>
                  <div className="tech-item"><Cpu size={14} /> <strong>Search Engine:</strong> OpenSearch / Elasticsearch</div>
                  <div className="tech-item"><Layers size={14} /> <strong>Navbat (Queue):</strong> BullMQ + Redis Workers</div>
                  <div className="tech-item"><Code2 size={14} /> <strong>Crawlers:</strong> Playwright (Alohida Serverda)</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DATABASE */}
          {activeTab === 'db' && (
            <div className="tab-pane">
              <h3 className="pane-title">Relatsion Database Sxemasi (PostgreSQL)</h3>
              
              <div className="db-tables-grid">
                <div className="db-table-card">
                  <div className="table-header">
                    <Database size={14} className="text-cyan" />
                    <strong>sources</strong>
                  </div>
                  <ul className="field-list">
                    <li><code>id</code> (PK, INT)</li>
                    <li><code>name</code> (VARCHAR - Uzum, Asaxiy)</li>
                    <li><code>domain</code> (uzum.uz)</li>
                    <li><code>type</code> (API | CRAWLER | PARTNER)</li>
                    <li><code>status</code> (ACTIVE | PAUSED)</li>
                    <li><code>crawl_interval</code> (MINUTES)</li>
                  </ul>
                </div>

                <div className="db-table-card">
                  <div className="table-header">
                    <Database size={14} className="text-purple" />
                    <strong>products (Canonical)</strong>
                  </div>
                  <ul className="field-list">
                    <li><code>id</code> (UUID, PK)</li>
                    <li><code>brand</code> (Apple, Xiaomi)</li>
                    <li><code>model</code> (iPhone 13, Redmi Note 13)</li>
                    <li><code>category</code> (smartphone)</li>
                    <li><code>normalized_name</code> (TEXT)</li>
                    <li><code>specifications</code> (JSONB)</li>
                  </ul>
                </div>

                <div className="db-table-card">
                  <div className="table-header">
                    <Database size={14} className="text-emerald" />
                    <strong>source_products</strong>
                  </div>
                  <ul className="field-list">
                    <li><code>id</code> (BIGSERIAL, PK)</li>
                    <li><code>canonical_product_id</code> (FK)</li>
                    <li><code>source_id</code> (FK)</li>
                    <li><code>raw_title</code> (TEXT)</li>
                    <li><code>price</code> (NUMERIC)</li>
                    <li><code>condition</code> (NEW | USED)</li>
                    <li><code>raw_data</code> (JSONB snapshot)</li>
                  </ul>
                </div>

                <div className="db-table-card">
                  <div className="table-header">
                    <Database size={14} className="text-amber" />
                    <strong>price_history</strong>
                  </div>
                  <ul className="field-list">
                    <li><code>id</code> (BIGSERIAL, PK)</li>
                    <li><code>product_id</code> (FK)</li>
                    <li><code>source_id</code> (FK)</li>
                    <li><code>price</code> (NUMERIC)</li>
                    <li><code>old_price</code> (NUMERIC)</li>
                    <li><code>availability</code> (BOOLEAN)</li>
                    <li><code>captured_at</code> (TIMESTAMP)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RANKING */}
          {activeTab === 'ranking' && (
            <div className="tab-pane">
              <h3 className="pane-title">Dinamik Ranking Formulalari (TZ 22-23 bo‘lim)</h3>
              
              <div className="formula-box">
                <div className="formula-main">
                  <code>Final Score = (0.35 × req_match) + (0.25 × price_score) + (0.15 × spec_score) + (0.10 × seller_transparency) + (0.10 × availability) + (0.05 × price_history)</code>
                </div>
                <p className="formula-desc">
                  Algoritm foydalanuvchining ustuvor talabiga qarab o‘z vaznlarini (weights) dinamik tarzda moslashtiradi:
                </p>
              </div>

              <div className="weight-scenarios-grid">
                <div className="scenario-card">
                  <h4 className="scenario-title">📸 Foydalanuvchi "Kamera eng muhim" desa:</h4>
                  <ul>
                    <li>Camera Score: <strong>35%</strong></li>
                    <li>Requirement Match: <strong>25%</strong></li>
                    <li>Price Score: <strong>20%</strong></li>
                    <li>Performance: <strong>10%</strong></li>
                    <li>Seller Transparency: <strong>10%</strong></li>
                  </ul>
                </div>

                <div className="scenario-card">
                  <h4 className="scenario-title">🚕 Foydalanuvchi "Yandex Taxi uchun" desa:</h4>
                  <ul>
                    <li>Battery Avtonomlik: <strong>30%</strong></li>
                    <li>Requirement Match: <strong>25%</strong></li>
                    <li>Price / Tejamkorlik: <strong>20%</strong></li>
                    <li>Ekran yorqinligi (AMOLED): <strong>15%</strong></li>
                    <li>Seller & Kafolat: <strong>10%</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CRAWL & INTERVALS */}
          {activeTab === 'intervals' && (
            <div className="tab-pane">
              <h3 className="pane-title">Data yangilanish chastotasi & Xavfsizlik qoidasi (TZ 25, 33)</h3>

              <table className="intervals-table">
                <thead>
                  <tr>
                    <th>Mahsulot kategoriyasi</th>
                    <th>Tavsiya qilingan yangilanish intervali</th>
                    <th>Sababi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Smartfonlar & Noutbuklar</strong></td>
                    <td><span className="badge-fast">15 – 60 daqiqa</span></td>
                    <td>Bozorda narxlar juda dinamik o‘zgaradi, aksiyalar tez boshlanadi/tugaydi.</td>
                  </tr>
                  <tr>
                    <td><strong>Maishiy texnika (Muzlatgich, Kir yuvish)</strong></td>
                    <td><span className="badge-medium">1 – 3 soat</span></td>
                    <td>Narxlar nisbatan barqaror, kuniga 1-2 marta o‘zgarishi mumkin.</td>
                  </tr>
                  <tr>
                    <td><strong>OLX (Individual e’lonlar)</strong></td>
                    <td><span className="badge-medium">1 – 6 soat</span></td>
                    <td>E’lonlar muddati, ruxsatlar va server yuklamasiga qarab.</td>
                  </tr>
                  <tr>
                    <td><strong>Uzoq muddatli mahsulotlar (Kiyim, Mebel)</strong></td>
                    <td><span className="badge-slow">12 – 24 soat</span></td>
                    <td>Mavsumiy va kam o‘zgaruvchan assortiment.</td>
                  </tr>
                </tbody>
              </table>

              <div className="verification-rule-card">
                <ShieldCheck size={18} className="text-emerald" />
                <div>
                  <strong>Shaffoflik qoidasi:</strong> Tizimda "Real-time narx" faqatgina so‘nggi bir necha 
                  daqiqa ichida tekshirilgan bo‘lsa ko‘rsatiladi. Agar narx 3 soat oldin olingan bo‘lsa, 
                  foydalanuvchiga aniq: <em>"Narx 3 soat oldin tekshirilgan"</em> deb ko‘rsatiladi.
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ROADMAP & MONETIZATION */}
          {activeTab === 'roadmap' && (
            <div className="tab-pane">
              <h3 className="pane-title">MVP Bosqichlari va Monetizatsiya Modeli (TZ 27-30)</h3>

              <div className="roadmap-grid">
                <div className="roadmap-card active-stage">
                  <div className="stage-badge">Hozirgi bosqich</div>
                  <h4>MVP-1: Smartfonlar</h4>
                  <p>Asosiy manbalar: Uzum, Asaxiy, Olcha, Texnomart, OLX.</p>
                  <p>AI search → Normalization → Price comparison → Price history → Seller info → Alerts.</p>
                </div>

                <div className="roadmap-card">
                  <div className="stage-badge secondary">2-bosqich</div>
                  <h4>MVP-2: Barcha elektronika</h4>
                  <p>Noutbuklar, planshetlar, televizorlar, aqlli soatlar va maishiy texnika kengaytiriladi.</p>
                </div>

                <div className="roadmap-card">
                  <div className="stage-badge secondary">3-bosqich</div>
                  <h4>MVP-3: To‘liq AI Agent</h4>
                  <p>Avtonom agent: foydalanuvchi nomidan savdo qilish, kuponlarni qo‘llash, eng arzon do‘kondan buyurtma berish.</p>
                </div>
              </div>

              <div className="monetization-section">
                <h4>Biznes Monetizatsiyasi (3 ta mustahkam daromad kanali):</h4>
                <div className="biz-models-grid">
                  <div className="biz-card">
                    <strong>1. Affiliate (CPA / Do‘kon komissiyasi)</strong>
                    <p>Foydalanuvchi Topdim AI orqali Asaxiy yoki Uzum ga o‘tib xarid qilsa, do‘kon 1.5%–4% komissiya to‘laydi.</p>
                  </div>
                  <div className="biz-card">
                    <strong>2. Sotuvchilar uchun SaaS ($10 / oy)</strong>
                    <p>Raqobatchilar narxlarini real-time monitoring qilish, tahliliy hisobotlar va narx dinamikasi analitikasi.</p>
                  </div>
                  <div className="biz-card">
                    <strong>3. Premium AI obuna</strong>
                    <p>Oddiy qidiruv — bepul. Cheksiz Telegram narx ogohlantirishlari, chuqur tahlil va shaxsiy AI xarid maslahatchisi.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions-bar">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
}
