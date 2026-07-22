import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DashboardStats from './components/DashboardStats';
import FilterSidebar from './components/FilterSidebar';
import PrecedentCard from './components/PrecedentCard';
import PrecedentDetailModal from './components/PrecedentDetailModal';
import AiSearchSection from './components/AiSearchSection';
import MethodologySection from './components/MethodologySection';

import dataset from './data/stj_precedents.json';

export default function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedSubCategory, setSelectedSubCategory] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedPhase, setSelectedPhase] = useState('ALL');
  const [sortBy, setSortBy] = useState('NUMBER_DESC');
  
  const [selectedPrecedent, setSelectedPrecedent] = useState(null);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 24;

  const filteredData = useMemo(() => {
    let result = dataset.filter(item => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const numStr = String(item.number || '');
        const titleStr = (item.title || '').toLowerCase();
        const questaoStr = (item.questao || '').toLowerCase();
        const teseStr = (item.tese || '').toLowerCase();
        const subStr = (item.subCategory || '').toLowerCase();

        const matches = numStr.includes(q) || 
                        titleStr.includes(q) || 
                        questaoStr.includes(q) || 
                        teseStr.includes(q) ||
                        subStr.includes(q);
        if (!matches) return false;
      }

      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
        return false;
      }

      if (selectedSubCategory !== 'ALL' && item.subCategory !== selectedSubCategory) {
        return false;
      }

      if (selectedType !== 'ALL' && item.typeCode !== selectedType) {
        return false;
      }

      if (selectedPhase !== 'ALL' && item.phaseGroup !== selectedPhase) {
        return false;
      }

      return true;
    });

    result.sort((a, b) => {
      if (sortBy === 'NUMBER_DESC') {
        return (b.number || 0) - (a.number || 0);
      }
      if (sortBy === 'NUMBER_ASC') {
        return (a.number || 0) - (b.number || 0);
      }
      if (sortBy === 'PHASE') {
        const phaseOrder = {
          'Trânsito em Julgado': 1,
          'Julgado com Tese': 2,
          'Em Julgamento / Afetado': 3,
          'Sobrestado': 4,
          'Cancelado / Inadmitido': 5,
          'Pendente': 6
        };
        const orderA = phaseOrder[a.phaseGroup] || 99;
        const orderB = phaseOrder[b.phaseGroup] || 99;
        if (orderA !== orderB) return orderA - orderB;
        return (b.number || 0) - (a.number || 0);
      }
      if (sortBy === 'PROCESSES_DESC') {
        return (b.processesCount || 0) - (a.processesCount || 0);
      }
      return 0;
    });

    return result;
  }, [searchQuery, selectedCategory, selectedSubCategory, selectedType, selectedPhase, sortBy]);

  const paginatedData = useMemo(() => {
    return filteredData.slice(0, page * ITEMS_PER_PAGE);
  }, [filteredData, page]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedSubCategory('ALL');
    setSelectedType('ALL');
    setSelectedPhase('ALL');
    setSortBy('NUMBER_DESC');
    setPage(1);
  };

  const handleTriggerAiSearch = (text) => {
    if (text) setSearchQuery(text);
    setActiveTab('ai');
  };

  return (
    <div id="top" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* Topbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalCount={dataset.length}
      />

      {/* Hero Banner Section */}
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onTriggerAiSearch={handleTriggerAiSearch}
        dataset={dataset}
      />

      {/* Main Full-Width Content Container */}
      <main style={{ width: '100%', padding: '0 32px 40px', flex: 1 }} id="acervo">
        
        {/* Analytical Dashboard Cards */}
        <DashboardStats dataset={dataset} />

        {/* AI Intelligent Search View */}
        {activeTab === 'ai' && (
          <AiSearchSection
            dataset={dataset}
            onSelectPrecedent={(p) => setSelectedPrecedent(p)}
          />
        )}

        {/* Main Explorer Catalog Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '28px', alignItems: 'start', width: '100%' }}>
          
          {/* Left Sidebar Filters */}
          <FilterSidebar
            searchQuery={searchQuery}
            setSearchQuery={(q) => { setSearchQuery(q); setPage(1); }}
            selectedCategory={selectedCategory}
            setSelectedCategory={(c) => { setSelectedCategory(c); setPage(1); }}
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={(s) => { setSelectedSubCategory(s); setPage(1); }}
            selectedType={selectedType}
            setSelectedType={(t) => { setSelectedType(t); setPage(1); }}
            selectedPhase={selectedPhase}
            setSelectedPhase={(p) => { setSelectedPhase(p); setPage(1); }}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onResetFilters={handleResetFilters}
          />

          {/* Right Wide Precedents Grid */}
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Acervo Qualificado STJ
                </span>
                <h2 className="font-heading" style={{ fontSize: '1.4rem', color: '#ffffff' }}>
                  {filteredData.length} Precedentes Encontrados
                </h2>
              </div>

              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Exibindo 1–{Math.min(paginatedData.length, filteredData.length)} de {filteredData.length} resultados
              </span>
            </div>

            {/* Grid Cards (Width 420px+) */}
            {filteredData.length === 0 ? (
              <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 20px' }}>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Nenhum precedente encontrado com os filtros selecionados.
                </p>
                <button onClick={handleResetFilters} className="btn-secondary" style={{ marginTop: '12px' }}>
                  Limpar Filtros de Pesquisa
                </button>
              </div>
            ) : (
              <>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))',
                  gap: '24px',
                  width: '100%',
                  marginBottom: '28px'
                }}>
                  {paginatedData.map((item) => (
                    <PrecedentCard
                      key={item.id}
                      precedent={item}
                      onOpenDetails={(p) => setSelectedPrecedent(p)}
                      onAnalyzeAi={(p) => setSelectedPrecedent(p)}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {paginatedData.length < filteredData.length && (
                  <div style={{ textAlign: 'center', margin: '36px 0' }}>
                    <button
                      onClick={() => setPage(prev => prev + 1)}
                      className="btn-secondary"
                      style={{ padding: '12px 32px', fontSize: '0.95rem' }}
                    >
                      Carregar Mais Precedentes ({filteredData.length - paginatedData.length} restantes)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Methodology Section */}
        <MethodologySection />
      </main>

      {/* Precedent Detail Modal */}
      {selectedPrecedent && (
        <PrecedentDetailModal
          precedent={selectedPrecedent}
          onClose={() => setSelectedPrecedent(null)}
        />
      )}

      {/* Atlas Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '28px 32px',
        textAlign: 'center',
        fontSize: '0.82rem',
        color: 'var(--text-muted)',
        background: 'rgba(6, 9, 17, 0.95)',
        width: '100%'
      }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="brand-mark" style={{ width: '28px', height: '28px', fontSize: '0.8rem' }}>PA</div>
            <strong style={{ color: '#ffffff' }}>Precedentes Atlas</strong>
            <small style={{ color: 'var(--text-secondary)' }}>• Projeto independente de estudos jurídicos</small>
          </div>
          <div>
            Confirme sempre as informações na fonte oficial antes do uso profissional.
          </div>
          <a href="https://processo.stj.jus.br/repetitivos/temas_repetitivos/" target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 600 }}>
            Pesquisa Oficial do STJ ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
