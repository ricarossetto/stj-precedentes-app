import React from 'react';
import { Scale, Sparkles, BookOpen, Cpu } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, totalCount }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(8, 11, 17, 0.9)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '16px 32px'
    }}>
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            boxShadow: '0 0 25px rgba(59, 130, 246, 0.45)'
          }}>
            <Scale style={{ width: '26px', height: '26px', color: '#ffffff' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 className="font-heading" style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                STJ <span className="gradient-text">PRECEDENTES</span>
              </h1>
              <span className="badge-status badge-status-transit" style={{ fontSize: '0.7rem', padding: '3px 10px' }}>
                CIVIL & PREV
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Portal de Estudos de Precedentes Qualificados STJ + IA Gemini 2.5
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.04)', padding: '4px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => setActiveTab('explore')}
            className={`btn-secondary ${activeTab === 'explore' ? 'active' : ''}`}
            style={{
              borderRadius: '10px',
              padding: '10px 20px',
              fontSize: '0.88rem',
              background: activeTab === 'explore' ? 'var(--accent-blue)' : 'transparent',
              color: activeTab === 'explore' ? '#ffffff' : 'var(--text-secondary)',
              border: 'none',
              fontWeight: 600
            }}
          >
            <BookOpen style={{ width: '16px', height: '16px' }} />
            Explorar Acervo Completo ({totalCount})
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`btn-secondary ${activeTab === 'ai' ? 'active' : ''}`}
            style={{
              borderRadius: '10px',
              padding: '10px 20px',
              fontSize: '0.88rem',
              background: activeTab === 'ai' ? 'linear-gradient(135deg, #7c3aed, #4f46e5)' : 'transparent',
              color: activeTab === 'ai' ? '#ffffff' : 'var(--text-secondary)',
              border: 'none',
              fontWeight: 600
            }}
          >
            <Sparkles style={{ width: '16px', height: '16px', color: '#c084fc' }} />
            Buscador Inteligente com IA
          </button>
        </nav>

        {/* AI Status Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 16px',
          borderRadius: '9999px',
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          fontSize: '0.8rem',
          color: '#34d399',
          fontWeight: 600
        }}>
          <div className="pulse-dot"></div>
          <Cpu style={{ width: '15px', height: '15px' }} />
          <span>Gemini AI Conectado</span>
        </div>
      </div>
    </header>
  );
}
