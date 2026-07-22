import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STJ_URL = 'https://processo.stj.jus.br/repetitivos/temas_repetitivos/pesquisa.jsp';

const TYPES = [
  { code: 'T', name: 'Tema Repetitivo' },
  { code: 'C', name: 'Controvérsia' },
  { code: 'I', name: 'IAC' },
  { code: 'S', name: 'SIRDR' },
  { code: 'P', name: 'PUIL' }
];

const TARGET_AREAS = [
  'DIREITO CIVIL',
  'DIREITO PREVIDENCIÁRIO',
  'DIREITO PROCESSUAL CIVIL E DO TRABALHO',
  'DIREITO DO CONSUMIDOR'
];

function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<p>/gi, '')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&deg;/g, '°')
    .replace(/\s+/g, ' ')
    .trim();
}

function generateResumoPratico(precedent) {
  const tese = precedent.tese;
  const questao = precedent.questao;
  const nug = precedent.anotacoesNugep;

  if (tese && tese.length > 15) {
    if (tese.length <= 260) return `Tese Firmada: ${tese}`;
    return `Tese Firmada: ${tese.substring(0, 250)}...`;
  }

  if (questao && questao.length > 15) {
    if (questao.length <= 260) return `Questão em Análise: ${questao}`;
    return `Questão em Análise: ${questao.substring(0, 250)}...`;
  }

  if (nug && nug.length > 15) {
    if (nug.length <= 260) return `Resumo NUGEPNAC: ${nug}`;
    return `Resumo NUGEPNAC: ${nug.substring(0, 250)}...`;
  }

  return `Precedente qualificado (${precedent.typeName} ${precedent.number}) cadastrado no STJ sobre ${precedent.category} em fase de ${precedent.situacao}.`;
}

async function fetchTypeData(typeCode) {
  console.log(`Fetching data for type: ${typeCode}...`);
  const params = new URLSearchParams({
    p: 'true',
    novaConsulta: 'true',
    quantidadeResultadosPorPagina: '-1',
    i: '1',
    l: '-1',
    b: 'TT',
    tipo_pesquisa: typeCode
  });

  const response = await fetch(STJ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },
    body: params.toString()
  });

  const buffer = await response.arrayBuffer();
  const html = Buffer.from(buffer).toString('latin1');
  console.log(`Type ${typeCode} raw HTML size: ${(html.length / 1024 / 1024).toFixed(2)} MB`);
  return html;
}

function parseBlocks(html, typeObj) {
  const precedents = [];
  
  const rawBlocks = html.split(/<div class="col-3 p-0 borda_clara">\s*<div class="row">\s*<div class="col-12 titulo_campo_processo">/gi);
  console.log(`Type ${typeObj.code}: found ${rawBlocks.length - 1} raw blocks.`);
  
  for (let i = 1; i < rawBlocks.length; i++) {
    const block = rawBlocks[i];
    
    // Extract Number
    const numMatch = block.match(/<span class="dados_campo_processo fonte_destaque\s*">\s*(\d+)\s*<\/span>/i);
    const num = numMatch ? numMatch[1] : `ID-${i}`;

    // Extract Situação
    const sitMatch = block.match(/Situa.*?o[\s\S]*?<div class="col-6 dados_campo_processo fonte_destaque">\s*([\s\S]*?)\s*<\/div>/i);
    const situacao = sitMatch ? cleanText(sitMatch[1]) : 'Pendente / Em andamento';

    // Extract Órgão julgador
    const orgMatch = block.match(/rg.*?o julgador[\s\S]*?<div class="col-8 dados_campo_processo">\s*([\s\S]*?)\s*<\/div>/i);
    const orgaoJulgador = orgMatch ? cleanText(orgMatch[1]) : 'STJ';

    // Extract Ramo do direito
    const ramoMatch = block.match(/Ramo do direito[\s\S]*?<div class="col-7 dados_campo_processo">\s*([\s\S]*?)\s*<\/div>/i);
    const ramoDireito = ramoMatch ? cleanText(ramoMatch[1]) : '';

    const normalizedRamo = ramoDireito.toUpperCase();
    const isTargetArea = TARGET_AREAS.some(area => normalizedRamo.includes(area)) || 
                         normalizedRamo.includes('CIVIL') || 
                         normalizedRamo.includes('PREVIDEN');

    // Extract Questão submetida a julgamento
    const qMatch = block.match(/Quest.*?o submetida a julgamento[\s\S]*?<div class="col-9 dados_campo campo_texto borda_clara">[\s\S]*?<div align="justify">([\s\S]*?)<\/div>/i);
    let questao = qMatch ? cleanText(qMatch[1]) : '';

    // Extract Tese Firmada
    const teseMatch = block.match(/Tese Firmada[\s\S]*?<div class="col-9 dados_campo campo_texto borda_clara">[\s\S]*?<div align="justify">([\s\S]*?)<\/div>/i);
    let tese = teseMatch ? cleanText(teseMatch[1]) : '';

    // Extract Anotações NUGEPNAC
    const nugMatch = block.match(/Anota.*?es NUGEPNAC[\s\S]*?<div class="col-9 dados_campo campo_texto borda_clara">[\s\S]*?<div align="justify">([\s\S]*?)<\/div>/i);
    let anotacoesNugep = nugMatch ? cleanText(nugMatch[1]) : '';

    // Extract Delimitação do Julgado
    const delimMatch = block.match(/Delimita.*?o do Julgado[\s\S]*?<div class="col-9 dados_campo campo_texto borda_clara">[\s\S]*?<div align="justify">([\s\S]*?)<\/div>/i);
    let delimitacao = delimMatch ? cleanText(delimMatch[1]) : '';

    // Extract Repercussão Geral / STF
    const stfMatch = block.match(/Repercuss.*?o Geral[\s\S]*?<div class="col-9 dados_campo campo_texto borda_clara">[\s\S]*?<div align="justify">([\s\S]*?)<\/div>/i);
    let repercussaoGeral = stfMatch ? cleanText(stfMatch[1]) : '';

    // Extract Linked Processes
    const processes = [];
    const procRegex = /<a href="([^"]*termo=([^"&]+)[^"]*)"[^>]*>\s*<b>([^<]+)<\/b>\s*<\/a>[\s\S]*?Tribunal de Origem<\/div>\s*<div class="col-7 dados_campo"><div align="justify">([^<]*)<\/div><\/div>[\s\S]*?Relator<\/div>\s*<div class="col-7 dados_campo"><div align="justify">([^<]*)<\/div><\/div>/gi;
    
    let procMatch;
    while ((procMatch = procRegex.exec(block)) !== null) {
      processes.push({
        name: cleanText(procMatch[3]),
        link: procMatch[1].startsWith('http') ? procMatch[1] : `https://ww2.stj.jus.br${procMatch[1]}`,
        registro: procMatch[2],
        origem: cleanText(procMatch[4]),
        relator: cleanText(procMatch[5])
      });
    }

    // Categorize
    let category = 'Outros';
    if (normalizedRamo.includes('CIVIL') && !normalizedRamo.includes('PROCESSUAL')) {
      category = 'Direito Civil';
    } else if (normalizedRamo.includes('PREVIDEN')) {
      category = 'Direito Previdenciário';
    } else if (normalizedRamo.includes('PROCESSUAL') || normalizedRamo.includes('CPC')) {
      category = 'Direito Processual Civil';
    } else if (normalizedRamo.includes('CONSUMIDOR')) {
      category = 'Direito do Consumidor';
    }

    // Phase Status Grouping
    let phaseGroup = 'Pendente';
    const normSit = situacao.toLowerCase();
    if (normSit.includes('trânsito em julgado') || normSit.includes('transito em julgado')) {
      phaseGroup = 'Trânsito em Julgado';
    } else if (normSit.includes('julgado') || normSit.includes('acórdão publicado') || normSit.includes('acordao publicado')) {
      phaseGroup = 'Julgado com Tese';
    } else if (normSit.includes('afetado') || normSit.includes('aguardando') || normSit.includes('admitido') || normSit.includes('julgamento')) {
      phaseGroup = 'Em Julgamento / Afetado';
    } else if (normSit.includes('cancelado') || normSit.includes('inadmitido')) {
      phaseGroup = 'Cancelado / Inadmitido';
    } else if (normSit.includes('sobrestado') || normSit.includes('suspenso')) {
      phaseGroup = 'Sobrestado';
    }

    if (isTargetArea) {
      const itemObj = {
        id: `${typeObj.code}-${num}`,
        typeCode: typeObj.code,
        typeName: typeObj.name,
        number: parseInt(num, 10) || num,
        title: `${typeObj.name} ${num}`,
        situacao: situacao || 'Em andamento',
        phaseGroup,
        orgaoJulgador,
        ramoDireito,
        category,
        questao: questao || (anotacoesNugep ? `Anotações NUGEPNAC: ${anotacoesNugep}` : `Precedente qualificado cadastrado sob a situação de ${situacao}`),
        tese,
        anotacoesNugep,
        delimitacao,
        repercussaoGeral,
        processesCount: processes.length,
        processes,
        updatedAt: new Date().toISOString()
      };

      itemObj.resumoPratico = generateResumoPratico(itemObj);

      precedents.push(itemObj);
    }
  }

  return precedents;
}

async function runScraper() {
  console.log('=== STJ PRECEDENTS SCRAPER STARTED (ES MODULE) ===');
  let allPrecedents = [];

  for (const typeObj of TYPES) {
    try {
      const html = await fetchTypeData(typeObj.code);
      const parsed = parseBlocks(html, typeObj);
      console.log(`Extracted ${parsed.length} Civil/Previdenciário precedents for ${typeObj.name}`);
      allPrecedents = allPrecedents.concat(parsed);
    } catch (err) {
      console.error(`Error fetching type ${typeObj.code}:`, err);
    }
  }

  console.log(`\nTOTAL TARGET PRECEDENTS SCRAPED: ${allPrecedents.length}`);
  
  allPrecedents.sort((a, b) => {
    if (a.typeCode !== b.typeCode) return a.typeCode.localeCompare(b.typeCode);
    return (b.number || 0) - (a.number || 0);
  });

  const outputDir = path.join(__dirname, '..', 'src', 'data');
  fs.mkdirSync(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, 'stj_precedents.json');
  fs.writeFileSync(outputPath, JSON.stringify(allPrecedents, null, 2), 'utf8');

  console.log(`Saved enhanced dataset to: ${outputPath}`);
  console.log('=== STJ SCRAPER COMPLETED SUCCESSFULLY ===');
}

runScraper();
