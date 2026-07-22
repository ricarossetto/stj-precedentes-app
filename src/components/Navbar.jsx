import React from 'react';
import { Sparkles, BookOpen, ExternalLink } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, totalCount }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(6, 9, 17, 0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '14px 32px'
    }}>
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand Logo Header */}
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); setActiveTab('explore'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}
        >
          <div className="brand-mark">PA</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong style={{ fontSize: '1.2rem', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                Precedentes Atlas
              </strong>
              <span className="badge-status badge-status-transit" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                Civil & Prev
              </span>
            </div>
            <small style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              1.190 Precedentes STJ + IA Gemini 2.5
            </small>
          </div>
        </a>

        {/* Center Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setActiveTab('explore')}
            style={{
              background: activeTab === 'explore' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              color: activeTab === 'explore' ? '#60a5fa' : 'var(--text-secondary)',
              border: activeTab === 'explore' ? '1px solid rgba(59, 130, 246, 0.35)' : 'none',
              borderRadius: 'var(--radius-md)',
              padding: '8px 16px',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <BookOpen style={{ width: '16px', height: '16px' }} />
            Acervo ({totalCount})
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            style={{
              background: activeTab === 'ai' ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(79, 70, 229, 0.3))' : 'transparent',
              color: activeTab === 'ai' ? '#c084fc' : 'var(--text-secondary)',
              border: activeTab === 'ai' ? '1px solid rgba(139, 92, 246, 0.4)' : 'none',
              borderRadius: 'var(--radius-md)',
              padding: '8px 16px',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles style={{ width: '16px', height: '16px', color: '#c084fc' }} />
            Buscador Inteligente IA
          </button>

          <a
            href="#metodologia"
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.88rem',
              fontWeight: 500,
              textDecoration: 'none',
              padding: '8px 12px'
            }}
          >
            Metodologia
          </a>
        </nav>

        {/* STJ Source Link */}
        <a
          href="https://processo.stj.jus.br/repetitivos/temas_repetitivos/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-secondary)',
            fontSize: '0.82rem',
            fontWeight: 600,
            textDecoration: 'none',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <span>Fonte Oficial STJ</span>
          <ExternalLink style={{ width: '14px', height: '14px', color: '#60a5fa' }} />
        </a>
      </div>
    </header>
  );
}
