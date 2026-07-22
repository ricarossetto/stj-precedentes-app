import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Sparkles, Scale, BookOpen, Layers, Info, ShieldCheck, Loader2 } from 'lucide-react';
import { analyzePrecedentWithAI } from '../services/geminiService';

export default function PrecedentDetailModal({ precedent, onClose }) {
  const [copied, setCopied] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  if (!precedent) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateAiAnalysis = async () => {
    setLoadingAi(true);
    try {
      const res = await analyzePrecedentWithAI(precedent);
      setAiAnalysis(res);
      setActiveTab('ai');
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '32px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span className={`badge-type badge-type-${precedent.typeCode}`}>
                {precedent.typeName}
              </span>
              <span className="badge-category" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#93c5fd' }}>
                {precedent.category}
              </span>
              <span className="badge-status badge-status-transit">
                {precedent.situacao || precedent.phaseGroup}
              </span>
            </div>
            <h2 className="font-heading" style={{ fontSize: '1.8rem', color: '#ffffff' }}>
              {precedent.title}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Ramo do Direito: <strong style={{ color: '#e5e7eb' }}>{precedent.ramoDireito}</strong> | Órgão Julgador: <strong style={{ color: '#e5e7eb' }}>{precedent.orgaoJulgador || 'STJ'}</strong>
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* Modal Navigation */}
        <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '24px', pb: '8px' }}>
          <button
            onClick={() => setActiveTab('details')}
            style={{
              background: activeTab === 'details' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              color: activeTab === 'details' ? '#60a5fa' : 'var(--text-secondary)',
              border: 'none',
              borderBottom: activeTab === 'details' ? '2px solid #3b82f6' : 'none',
              padding: '8px 16px',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <BookOpen style={{ width: '16px', height: '16px' }} />
            Texto do Precedente
          </button>

          <button
            onClick={() => {
              setActiveTab('ai');
              if (!aiAnalysis) handleGenerateAiAnalysis();
            }}
            style={{
              background: activeTab === 'ai' ? 'rgba(124, 58, 237, 0.15)' : 'transparent',
              color: activeTab === 'ai' ? '#c084fc' : 'var(--text-secondary)',
              border: 'none',
              borderBottom: activeTab === 'ai' ? '2px solid #8b5cf6' : 'none',
              padding: '8px 16px',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles style={{ width: '16px', height: '16px', color: '#c084fc' }} />
            Análise Estratégica IA
          </button>
        </div>

        {/* Tab 1: Precedent Details */}
        {activeTab === 'details' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Tese Firmada Card */}
            {precedent.tese && (
              <div style={{
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: 'var(--radius-md)',
                padding: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60a5fa', fontWeight: 700 }}>
                    <ShieldCheck style={{ width: '20px', height: '20px' }} />
                    <span>TESE FIRMADA (VINCULANTE)</span>
                  </div>
                  <button
                    onClick={() => handleCopy(precedent.tese)}
                    className="btn-secondary"
                    style={{ padding: '4px 12px', fontSize: '0.78rem' }}
                  >
                    {copied ? <Check style={{ width: '14px', height: '14px', color: '#34d399' }} /> : <Copy style={{ width: '14px', height: '14px' }} />}
                    {copied ? 'Copiado!' : 'Copiar Tese'}
                  </button>
                </div>
                <p style={{ fontSize: '0.98rem', color: '#f3f4f6', lineHeight: '1.6', fontWeight: 500 }}>
                  "{precedent.tese}"
                </p>
              </div>
            )}

            {/* Questão Submetida */}
            {precedent.questao && (
              <div>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Questão Submetida a Julgamento
                </h4>
                <p style={{ fontSize: '0.92rem', color: '#d1d5db', lineHeight: '1.6', background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  {precedent.questao}
                </p>
              </div>
            )}

            {/* Anotações NUGEPNAC */}
            {precedent.anotacoesNugep && (
              <div>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Anotações NUGEPNAC / Delimitação
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#9ca3af', lineHeight: '1.6', background: 'rgba(0, 0, 0, 0.2)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
                  {precedent.anotacoesNugep}
                </p>
              </div>
            )}

            {/* Repercussão Geral STF */}
            {precedent.repercussaoGeral && (
              <div style={{ padding: '12px 16px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: 'var(--radius-md)', color: '#fbbf24', fontSize: '0.85rem' }}>
                <strong>Repercussão Geral / STF:</strong> {precedent.repercussaoGeral}
              </div>
            )}

            {/* Processos Paradigmas / Vinculados */}
            {precedent.processes && precedent.processes.length > 0 && (
              <div style={{ marginTop: '12px' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers style={{ width: '18px', height: '18px', color: '#60a5fa' }} />
                  Processos Paradigmas Vinculados ({precedent.processes.length})
                </h4>

                <div style={{ display: 'grid', gap: '10px' }}>
                  {precedent.processes.map((proc, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        padding: '12px 16px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.85rem'
                      }}
                    >
                      <div>
                        <strong style={{ color: '#ffffff', fontSize: '0.92rem' }}>{proc.name}</strong>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '2px' }}>
                          Origem: {proc.origem} | Relator(a): {proc.relator || 'Não informado'}
                        </div>
                      </div>

                      <a
                        href={proc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      >
                        <span>Ver no STJ</span>
                        <ExternalLink style={{ width: '13px', height: '13px' }} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: AI Analysis */}
        {activeTab === 'ai' && (
          <div>
            {loadingAi ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <Loader2 style={{ width: '36px', height: '36px', color: '#8b5cf6', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
                <p style={{ color: 'var(--text-secondary)' }}>O Gemini AI está gerando o parecer e a estratégia processual para este precedente...</p>
              </div>
            ) : aiAnalysis ? (
              <div style={{
                background: 'rgba(18, 24, 36, 0.9)',
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                color: '#e5e7eb',
                lineHeight: '1.7',
                fontSize: '0.93rem',
                whiteSpace: 'pre-wrap'
              }}>
                {aiAnalysis}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <button onClick={handleGenerateAiAnalysis} className="btn-ai">
                  <Sparkles style={{ width: '18px', height: '18px' }} />
                  Gerar Parecer Estratégico com IA
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
