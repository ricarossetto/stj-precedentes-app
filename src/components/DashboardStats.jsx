import React from 'react';
import { BookMarked, CheckCircle2, Clock, Scale, ShieldAlert, FileText } from 'lucide-react';

export default function DashboardStats({ dataset }) {
  const total = dataset.length;
  const transitados = dataset.filter(d => d.phaseGroup === 'Trânsito em Julgado').length;
  const julgados = dataset.filter(d => d.phaseGroup === 'Julgado com Tese').length;
  const pendentes = dataset.filter(d => d.phaseGroup === 'Em Julgamento / Afetado' || d.phaseGroup === 'Pendente').length;
  
  const civilCount = dataset.filter(d => d.category === 'Direito Civil' || d.category === 'Direito Processual Civil').length;
  const prevCount = dataset.filter(d => d.category === 'Direito Previdenciário').length;

  const repetitivosCount = dataset.filter(d => d.typeCode === 'T').length;
  const controversiasCount = dataset.filter(d => d.typeCode === 'C').length;
  const iacCount = dataset.filter(d => d.typeCode === 'I').length;
  const puilCount = dataset.filter(d => d.typeCode === 'P').length;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    }}>
      {/* Total Card */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Total de Precedentes</span>
          <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
            <BookMarked style={{ width: '20px', height: '20px' }} />
          </div>
        </div>
        <div className="font-heading gradient-text" style={{ fontSize: '2.2rem', fontWeight: 800 }}>
          {total}
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          Civil & Previdenciário STJ
        </div>
      </div>

      {/* Transitados em Julgado */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Trânsito em Julgado</span>
          <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <CheckCircle2 style={{ width: '20px', height: '20px' }} />
          </div>
        </div>
        <div className="font-heading" style={{ fontSize: '2.2rem', fontWeight: 800, color: '#34d399' }}>
          {transitados}
        </div>
        <div style={{ fontSize: '0.78rem', color: '#6ee7b7', marginTop: '4px' }}>
          {((transitados / (total || 1)) * 100).toFixed(1)}% com eficácia vinculante final
        </div>
      </div>

      {/* Em Julgamento / Afetados */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Aguardando / Afetados</span>
          <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
            <Clock style={{ width: '20px', height: '20px' }} />
          </div>
        </div>
        <div className="font-heading" style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fbbf24' }}>
          {pendentes}
        </div>
        <div style={{ fontSize: '0.78rem', color: '#fde047', marginTop: '4px' }}>
          Em trâmite / Sobrestamento
        </div>
      </div>

      {/* Áreas de Atuação */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Distribuição por Área</span>
          <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
            <Scale style={{ width: '20px', height: '20px' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#93c5fd' }}>{civilCount}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '4px' }}>Civil/Proc</span>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '12px' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#6ee7b7' }}>{prevCount}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '4px' }}>Previdenciário</span>
          </div>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
          Temas: {repetitivosCount} | Controv: {controversiasCount} | IAC: {iacCount} | PUIL: {puilCount}
        </div>
      </div>
    </div>
  );
}
