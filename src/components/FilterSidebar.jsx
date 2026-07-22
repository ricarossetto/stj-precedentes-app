import React from 'react';
import { Search, Filter, RefreshCw, Layers, ArrowUpDown } from 'lucide-react';

export default function FilterSidebar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  selectedType,
  setSelectedType,
  selectedPhase,
  setSelectedPhase,
  sortBy,
  setSortBy,
  onResetFilters
}) {
  const categories = [
    { id: 'ALL', label: 'Todas as Áreas' },
    { id: 'Direito Civil', label: 'Direito Civil' },
    { id: 'Direito Previdenciário', label: 'Direito Previdenciário' },
    { id: 'Direito Processual Civil', label: 'Processual Civil' },
    { id: 'Direito do Consumidor', label: 'Consumidor' }
  ];

  const subCategoriesByArea = {
    'Direito Previdenciário': [
      'Aposentadoria & Tempo Especial',
      'Incapacidade & Auxílios',
      'Pensões & LOAS/BPC',
      'Revisão de Benefícios & Cálculos',
      'Geral Previdenciário'
    ],
    'Direito Civil': [
      'Contratos, Bancário & Obrigações',
      'Responsabilidade Civil & Indenizações',
      'Direito Imobiliário & Posse',
      'Família & Sucessões',
      'Geral Direito Civil'
    ],
    'Direito Processual Civil': [
      'Execução & Cumprimento de Sentença',
      'Prescrição & Prazos',
      'Gratuidade de Justiça & Honorários',
      'Recursos & Admissibilidade',
      'Geral Processual Civil'
    ]
  };

  const currentSubAreas = subCategoriesByArea[selectedCategory] || [];

  const types = [
    { id: 'ALL', label: 'Todos os Tipos' },
    { id: 'T', label: 'Temas Repetitivos (T)' },
    { id: 'C', label: 'Controvérsias (C)' },
    { id: 'I', label: 'IAC' },
    { id: 'P', label: 'PUIL' }
  ];

  const phases = [
    { id: 'ALL', label: 'Todas as Fases' },
    { id: 'Trânsito em Julgado', label: 'Trânsito em Julgado' },
    { id: 'Julgado com Tese', label: 'Julgado com Tese' },
    { id: 'Em Julgamento / Afetado', label: 'Em Julgamento / Afetado' },
    { id: 'Sobrestado', label: 'Sobrestado' }
  ];

  return (
    <aside className="glass-panel" style={{ padding: '24px', height: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1.05rem', color: '#ffffff' }}>
          <Filter style={{ width: '18px', height: '18px', color: '#3b82f6' }} />
          <span>Filtros do Acervo</span>
        </div>

        <button
          onClick={onResetFilters}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '0.78rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <RefreshCw style={{ width: '13px', height: '13px' }} />
          Limpar Tudo
        </button>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <Search style={{ width: '16px', height: '16px', position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por tema, nº ou tese..."
          style={{
            width: '100%',
            background: 'rgba(10, 13, 20, 0.8)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 12px 12px 38px',
            color: '#ffffff',
            fontSize: '0.9rem',
            outline: 'none'
          }}
        />
      </div>

      {/* Sorting Dropdown */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <ArrowUpDown style={{ width: '13px', height: '13px', color: '#f59e0b' }} />
          Organizar Por
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            width: '100%',
            background: 'rgba(10, 13, 20, 0.8)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 12px',
            color: '#ffffff',
            fontSize: '0.88rem',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="NUMBER_DESC">Nº do Precedente (Decrescente 1458 → 1)</option>
          <option value="NUMBER_ASC">Nº do Precedente (Crescente 1 → 1458)</option>
          <option value="PHASE">Fase Processual (Trânsito Primeiro)</option>
          <option value="PROCESSES_DESC">Mais Processos Paradigmas</option>
        </select>
      </div>

      {/* Main Area Filter */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
          Área Principal
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedSubCategory('ALL');
              }}
              style={{
                textAlign: 'left',
                padding: '9px 14px',
                borderRadius: '8px',
                fontSize: '0.88rem',
                fontWeight: selectedCategory === cat.id ? 700 : 400,
                background: selectedCategory === cat.id ? 'rgba(59, 130, 246, 0.18)' : 'transparent',
                color: selectedCategory === cat.id ? '#60a5fa' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: selectedCategory === cat.id ? 'rgba(59, 130, 246, 0.45)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Sub-Areas Filter */}
      {currentSubAreas.length > 0 && (
        <div style={{ marginBottom: '20px', padding: '12px', background: 'rgba(124, 58, 237, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(139, 92, 246, 0.25)' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <Layers style={{ width: '13px', height: '13px' }} />
            Sub-Área / Foco Específico
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button
              onClick={() => setSelectedSubCategory('ALL')}
              style={{
                textAlign: 'left',
                padding: '6px 10px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: selectedSubCategory === 'ALL' ? 700 : 400,
                background: selectedSubCategory === 'ALL' ? 'rgba(139, 92, 246, 0.25)' : 'transparent',
                color: selectedSubCategory === 'ALL' ? '#ffffff' : '#d8b4fe',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              • Todas as Sub-Áreas de {selectedCategory}
            </button>
            {currentSubAreas.map((sub, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSubCategory(sub)}
                style={{
                  textAlign: 'left',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: selectedSubCategory === sub ? 700 : 400,
                  background: selectedSubCategory === sub ? 'rgba(139, 92, 246, 0.25)' : 'transparent',
                  color: selectedSubCategory === sub ? '#ffffff' : '#e9d5ff',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                • {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Precedent Type Filter */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
          Tipo de Precedente
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {types.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              style={{
                textAlign: 'left',
                padding: '9px 14px',
                borderRadius: '8px',
                fontSize: '0.88rem',
                fontWeight: selectedType === type.id ? 700 : 400,
                background: selectedType === type.id ? 'rgba(168, 85, 247, 0.18)' : 'transparent',
                color: selectedType === type.id ? '#c084fc' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: selectedType === type.id ? 'rgba(168, 85, 247, 0.45)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Phase Filter */}
      <div>
        <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>
          Fase Processual
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setSelectedPhase(phase.id)}
              style={{
                textAlign: 'left',
                padding: '9px 14px',
                borderRadius: '8px',
                fontSize: '0.88rem',
                fontWeight: selectedPhase === phase.id ? 700 : 400,
                background: selectedPhase === phase.id ? 'rgba(16, 185, 129, 0.18)' : 'transparent',
                color: selectedPhase === phase.id ? '#34d399' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: selectedPhase === phase.id ? 'rgba(16, 185, 129, 0.45)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {phase.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
