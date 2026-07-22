import React from 'react';
import { BookOpen, ShieldCheck, Cpu } from 'lucide-react';

export default function MethodologySection() {
  return (
    <section id="metodologia" style={{
      margin: '60px 0 40px',
      padding: '40px 32px',
      background: 'rgba(15, 22, 36, 0.6)',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border-subtle)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Metodologia & Transparência
        </span>
        <h2 className="font-heading" style={{ fontSize: '1.8rem', color: '#ffffff', marginTop: '6px', marginBottom: '24px' }}>
          Fonte oficial, leitura organizada.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#60a5fa', fontWeight: 700, marginBottom: '10px' }}>
              <BookOpen style={{ width: '20px', height: '20px' }} />
              <span>Extrator Automatizado STJ</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              O acervo de 1.190 precedentes é extraído diretamente da Pesquisa Oficial do STJ (`pesquisa.jsp`), abrangendo Temas Repetitivos, Controvérsias, IAC, SIRDR e PUIL nas áreas Cível e Previdenciária.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#34d399', fontWeight: 700, marginBottom: '10px' }}>
              <ShieldCheck style={{ width: '20px', height: '20px' }} />
              <span>Fichas Completas e Íntegra</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Cada ficha preserva situação, questão submetida, tese firmada, anotações NUGEPNAC, delimitação do julgado, órgão julgador, repercussão geral no STF e links diretos para os processos paradigmas (REsp/AREsp).
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#c084fc', fontWeight: 700, marginBottom: '10px' }}>
              <Cpu style={{ width: '20px', height: '20px' }} />
              <span>Inteligência Artificial Gemini 2.5</span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              A IA Gemini 2.5 recebe os precedentes mais aderentes à sua busca para responder em tempo real, resumir o acervo e gerar modelos de teses para peças, sem substituir a conferência da íntegra oficial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
