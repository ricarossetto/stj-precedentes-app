import React, { useState } from 'react';
import { Sparkles, Search, ArrowRight, Loader2, BookCheck, AlertCircle, Lightbulb } from 'lucide-react';
import { searchPrecedentsWithAI } from '../services/geminiService';

const SAMPLE_QUERIES = [
  "Substituição do exequente em cessão de crédito precisa de anuência do devedor?",
  "Qual a tese sobre gratuidade de justiça para pessoa jurídica inativa?",
  "Revisão de aposentadoria por incapacidade e auxílio-acidente no STJ",
  "Correção monetária em cobrança de seguro previdenciário e civil"
];

export default function AiSearchSection({ dataset, onSelectPrecedent }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (textToSearch) => {
    const q = textToSearch || query;
    if (!q.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const aiResult = await searchPrecedentsWithAI(q, dataset);
      setResponse(aiResult);
    } catch (err) {
      console.error(err);
      setError('Ocorreu um erro ao consultar a IA Gemini. Verifique sua conexão ou tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '28px', marginBottom: '32px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <div style={{
          padding: '10px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(79, 70, 229, 0.2))',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          color: '#c084fc'
        }}>
          <Sparkles style={{ width: '24px', height: '24px' }} />
        </div>
        <div>
          <h2 className="font-heading gradient-purple" style={{ fontSize: '1.4rem' }}>
            Buscador Inteligente com IA Gemini 2.5
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Digite o caso concreto, o fato ou a dúvida jurídica para identificar temas, teses firmadas e a fase atual no STJ.
          </p>
        </div>
      </div>

      {/* Input Box */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: Tenho uma execução de título extrajudicial onde o credor cedeu os direitos. O devedor se opôs alegando que não anuiu. Qual o precedente do STJ e qual a tese vinculante?"
          rows={3}
          style={{
            width: '100%',
            background: 'rgba(10, 13, 20, 0.7)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px',
            color: '#ffffff',
            fontSize: '0.95rem',
            fontFamily: 'var(--font-main)',
            resize: 'vertical',
            outline: 'none',
            transition: 'all 0.2s ease'
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              handleSearch();
            }
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Pressione <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>Ctrl + Enter</kbd> para buscar
          </span>
          <button
            onClick={() => handleSearch()}
            disabled={loading || !query.trim()}
            className="btn-ai"
          >
            {loading ? (
              <>
                <Loader2 style={{ width: '18px', height: '18px', animation: 'spin 1s linear infinite' }} />
                Analisando Acervo...
              </>
            ) : (
              <>
                <Sparkles style={{ width: '18px', height: '18px' }} />
                Pesquisar com IA
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sample Quick Prompts */}
      <div style={{ marginTop: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
          <Lightbulb style={{ width: '14px', height: '14px', color: '#f59e0b' }} />
          <span>Exemplos de consultas jurídicas rápidas:</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {SAMPLE_QUERIES.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(sample);
                handleSearch(sample);
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '9999px',
                padding: '6px 14px',
                fontSize: '0.78rem',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              <span>{sample}</span>
              <ArrowRight style={{ width: '12px', height: '12px', opacity: 0.6 }} />
            </button>
          ))}
        </div>
      </div>

      {/* AI Output Card */}
      {error && (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          color: '#f87171',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <AlertCircle style={{ width: '20px', height: '20px' }} />
          <span>{error}</span>
        </div>
      )}

      {response && (
        <div style={{
          marginTop: '24px',
          padding: '24px',
          borderRadius: 'var(--radius-lg)',
          background: 'rgba(18, 24, 36, 0.9)',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', pb: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c084fc', fontWeight: 700 }}>
              <BookCheck style={{ width: '20px', height: '20px' }} />
              <span>Resposta da IA Gemini</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Baseado nos 1.190 Precedentes STJ
            </span>
          </div>

          <div 
            style={{
              fontSize: '0.92rem',
              lineHeight: '1.7',
              color: '#e5e7eb',
              whiteSpace: 'pre-wrap',
              fontFamily: 'var(--font-main)'
            }}
          >
            {response}
          </div>
        </div>
      )}
    </div>
  );
}
