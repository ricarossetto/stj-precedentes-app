export function downloadPrecedentsCSV(dataset) {
  if (!dataset || dataset.length === 0) return;

  const headers = [
    'ID',
    'Tipo',
    'Numero',
    'Titulo',
    'Categoria',
    'SubArea',
    'Situacao',
    'FaseGrupo',
    'OrgaoJulgador',
    'RamoDireito',
    'ResumoPratico',
    'Questao',
    'TeseFirmada',
    'ProcessosVinculadosQtd'
  ];

  const escapeCSV = (field) => {
    if (field === null || field === undefined) return '""';
    const stringified = String(field).replace(/"/g, '""');
    return `"${stringified}"`;
  };

  const rows = dataset.map(item => [
    escapeCSV(item.id),
    escapeCSV(item.typeName),
    escapeCSV(item.number),
    escapeCSV(item.title),
    escapeCSV(item.category),
    escapeCSV(item.subCategory || ''),
    escapeCSV(item.situacao),
    escapeCSV(item.phaseGroup),
    escapeCSV(item.orgaoJulgador),
    escapeCSV(item.ramoDireito),
    escapeCSV(item.resumoPratico || ''),
    escapeCSV(item.questao || ''),
    escapeCSV(item.tese || ''),
    escapeCSV(item.processesCount || 0)
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `stj_precedentes_qualificados_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
