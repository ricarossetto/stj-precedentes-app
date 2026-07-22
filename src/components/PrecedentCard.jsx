import React, { useState } from 'react';
import { Sparkles, Scale, Layers, Copy, Check, ChevronDown, ChevronUp, Zap, FileText } from 'lucide-react';

export default function PrecedentCard({ precedent, onOpenDetails, onAnalyzeAi }) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const getStatusBadge = (phaseGroup, situacao) => {
    switch (phaseGroup) {
      case 'Trânsito em Julgado':
        return <span className="badge-status badge-status-transit">Trânsito em Julgado</span>;
      case 'Julgado com Tese':
        return <span className="badge-status badge-status-julgado">Julgado com Tese</span>;
      case 'Em Julgamento / Afetado':
        return <span className="badge-status badge-status-pendente">Em Julgamento</span>;
      case 'Sobrestado':
        return <span className="badge-status badge-status-sobrestado">Sobrestado</span>;
      case 'Cancelado / Inadmitido':
        return <span className="badge-status badge-status-cancelado">Cancelado</span>;
      default:
        return <span className="badge-status badge-status-pendente">{situacao || 'Pendente'}</span>;
    }
  };

  const handleCopyTese = (e) => {
    e.stopPropagation();
    const textToCopy = precedent.tese || precedent.questao;
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      className="glass-panel glass-panel-interactive"
      onClick={() => onOpenDetails(precedent)}
      style={{
        padding: '26px',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        position: 'relative',
        minHeight: '400px',
        width: '100%',
        border: '1px solid var(--border-subtle)'
      }}
    >
      <div>
        {/* Top Header Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className={`badge-type badge-type-${precedent.typeCode}`} style={{ fontSize: '0.82rem', padding: '4px 12px' }}>
              {precedent.typeName}
            </span>
            <span className="font-heading" style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>
              Nº {precedent.number}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span className={`badge-category ${precedent.category === 'Direito Previdenciário' ? 'badge-category-previdenciario' : 'badge-category-civil'}`}>
              {precedent.category}
            </span>
            {precedent.subCategory && (
              <span className="badge-subarea">
                {precedent.subCategory}
              </span>
            )}
            {getStatusBadge(precedent.phaseGroup, precedent.situacao)}
          </div>
        </div>

        {/* Órgão Julgador & Processos Paradigmas */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          {precedent.orgaoJulgador && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Scale style={{ width: '14px', height: '14px', color: 'var(--accent-gold)' }} />
              <strong style={{ color: '#e5e7eb' }}>{precedent.orgaoJulgador}</strong>
            </span>
          )}
          {precedent.processesCount > 0 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers style={{ width: '14px', height: '14px', color: 'var(--accent-blue)' }} />
              <strong style={{ color: '#60a5fa' }}>{precedent.processesCount} {precedent.processesCount === 1 ? 'Processo Paradigma' : 'Processos Paradigmas'}</strong>
            </span>
          )}
        </div>

        {/* AI Pre-computed Summary Box (Mini Resumo) */}
        {precedent.resumoPratico && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.12), rgba(37, 99, 235, 0.12))',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px',
            marginBottom: '18px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
              <Zap style={{ width: '14px', height: '14px', color: '#c084fc' }} />
              <span>Resumo Prático (IA Gemini Synthesized)</span>
            </div>
            <p className="text-justify-formatted" style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: '1.6', fontWeight: 500 }}>
              {precedent.resumoPratico}
            </p>
          </div>
        )}

        {/* Tese Firmada ou Questão Submetida com Formatação Justificada */}
        <div style={{ marginBottom: '18px' }}>
          {precedent.tese ? (
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                Tese Firmada (Vinculante)
              </div>
              <p 
                className="text-justify-formatted"
                style={{
                  fontSize: '0.94rem',
                  color: '#f3f4f6',
                  lineHeight: '1.65',
                  display: expanded ? 'block' : '-webkit-box',
                  WebkitLineClamp: expanded ? 'unset' : 6,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                "{precedent.tese}"
              </p>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                Questão Submetida a Julgamento
              </div>
              <p 
                className="text-justify-formatted"
                style={{
                  fontSize: '0.94rem',
                  color: '#f3f4f6',
                  lineHeight: '1.65',
                  display: expanded ? 'block' : '-webkit-box',
                  WebkitLineClamp: expanded ? 'unset' : 6,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {precedent.questao}
              </p>
            </div>
          )}

          {/* Toggle Full Text Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#3b82f6',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '8px'
            }}
          >
            {expanded ? (
              <>
                Recolher Texto <ChevronUp style={{ width: '14px', height: '14px' }} />
              </>
            ) : (
              <>
                Expandir Texto Completo <ChevronDown style={{ width: '14px', height: '14px' }} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        paddingTop: '16px',
        borderTop: '1px solid var(--border-subtle)',
        marginTop: '12px'
      }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleCopyTese}
            title="Copiar texto principal"
            style={{
              background: copied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '7px 14px',
              fontSize: '0.82rem',
              color: copied ? '#34d399' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 500
            }}
          >
            {copied ? <Check style={{ width: '14px', height: '14px', color: '#34d399' }} /> : <Copy style={{ width: '14px', height: '14px' }} />}
            {copied ? 'Copiado!' : 'Copiar Texto'}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAnalyzeAi(precedent);
            }}
            title="Gerar parecer interativo com IA Gemini"
            style={{
              background: 'rgba(124, 58, 237, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.35)',
              borderRadius: '8px',
              padding: '7px 14px',
              fontSize: '0.82rem',
              color: '#c084fc',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600
            }}
          >
            <Sparkles style={{ width: '14px', height: '14px' }} />
            Análise IA
          </button>
        </div>

        <button
          onClick={() => onOpenDetails(precedent)}
          className="btn-primary"
          style={{ padding: '7px 16px', fontSize: '0.85rem', borderRadius: '8px' }}
        >
          Ver Detalhes
        </button>
      </div>
    </div>
  );
}
