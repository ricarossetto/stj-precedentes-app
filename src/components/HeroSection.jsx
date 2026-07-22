import React from 'react';
import { Search, Sparkles, Download, ArrowRight, BookOpen, Layers, Scale } from 'lucide-react';
import { downloadPrecedentsCSV } from '../utils/csvExporter';

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  onTriggerAiSearch,
  dataset
}) {
  const sampleQueries = [
    'contratos bancários',
    'benefício por incapacidade',
    'prescrição intercorrente',
    'substituição processual'
  ];

  return (
    <section style={{
      padding: '48px 32px 36px',
      textAlign: 'center',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Kicker Pill */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 16px',
        borderRadius: '9999px',
        background: 'rgba(59, 130, 246, 0.12)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        color: '#60a5fa',
        fontSize: '0.82rem',
        fontWeight: 700,
        marginBottom: '20px'
      }}>
        <div className="pulse-dot"></div>
        <span>Base Oficial STJ • Atualizada com 1.190 Precedentes Qualificados</span>
      </div>

      {/* Main Headline */}
      <h1 className="font-heading gradient-hero" style={{
        fontSize: '3.2rem',
        fontWeight: 800,
        lineHeight: '1.15',
        marginBottom: '16px',
        letterSpacing: '-0.03em'
      }}>
        O precedente certo,<br />
        <em style={{ fontStyle: 'normal', color: '#60a5fa' }}>antes da próxima peça.</em>
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: '1.15rem',
        color: 'var(--text-secondary)',
        maxWidth: '780px',
        margin: '0 auto 32px',
        lineHeight: '1.6'
      }}>
        Teses, fases, decisões e processos vinculados do STJ — organizados para pesquisa rápida e inteligente nas áreas Cível e Previdenciária.
      </p>

      {/* Integrated Search Box */}
      <div style={{
        maxWidth: '860px',
        margin: '0 auto 24px',
        background: 'rgba(15, 22, 36, 0.9)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.7)',
        backdropFilter: 'blur(20px)'
      }}>
        <Search style={{ width: '22px', height: '22px', color: 'var(--text-muted)', marginLeft: '8px' }} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Ex.: auxílio-acidente, contrato bancário ou Tema 1.234"
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            color: '#ffffff',
            fontSize: '1.05rem',
            fontFamily: 'var(--font-main)',
            padding: '8px 0'
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onTriggerAiSearch(searchQuery);
            }
          }}
        />

        <button
          onClick={() => onTriggerAiSearch(searchQuery)}
          className="btn-primary"
          style={{ borderRadius: 'var(--radius-md)', padding: '10px 22px' }}
        >
          Buscar
        </button>

        <button
          onClick={() => onTriggerAiSearch(searchQuery)}
          className="btn-ai"
          style={{ borderRadius: 'var(--radius-md)', padding: '10px 20px' }}
        >
          <Sparkles style={{ width: '16px', height: '16px', color: '#c084fc' }} />
          ✦ Perguntar à IA
        </button>
      </div>

      {/* Quick Search Suggestions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '36px',
        fontSize: '0.82rem',
        color: 'var(--text-muted)'
      }}>
        <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Pesquisas rápidas:</span>
        {sampleQueries.map((sample, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSearchQuery(sample);
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '9999px',
              padding: '5px 14px',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            {sample}
          </button>
        ))}
      </div>

      {/* Hero Stats & CSV Download */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        flexWrap: 'wrap',
        gap: '32px',
        padding: '20px 32px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)',
        maxWidth: '860px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <strong style={{ fontSize: '1.5rem', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>1.190</strong>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>precedentes compilados</span>
        </div>

        <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)' }}></div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <strong style={{ fontSize: '1.5rem', color: '#60a5fa', fontFamily: 'var(--font-heading)' }}>5</strong>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>classes (Temas, Controvérsias, IAC, SIRDR, PUIL)</span>
        </div>

        <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)' }}></div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <strong style={{ fontSize: '1.5rem', color: '#34d399', fontFamily: 'var(--font-heading)' }}>2</strong>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>áreas (Civil & Previdenciário)</span>
        </div>

        <div style={{ width: '1px', height: '24px', background: 'var(--border-subtle)' }}></div>

        <button
          onClick={() => downloadPrecedentsCSV(dataset)}
          style={{
            background: 'none',
            border: 'none',
            color: '#38bdf8',
            fontSize: '0.88rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Download style={{ width: '16px', height: '16px' }} />
          Baixar base CSV
        </button>
      </div>
    </section>
  );
}
