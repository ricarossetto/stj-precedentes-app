import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, '..', 'src', 'data', 'stj_precedents.json');
const dataset = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

function classifySubCategory(item) {
  const fullText = `${item.category} ${item.ramoDireito} ${item.questao} ${item.tese} ${item.anotacoesNugep}`.toLowerCase();
  
  if (item.category === 'Direito Previdenciário') {
    if (fullText.includes('especial') || fullText.includes('agente nocivo') || fullText.includes('ruído') || fullText.includes('vigilante') || fullText.includes('aposentadoria por tempo') || fullText.includes('conversão')) {
      return 'Aposentadoria & Tempo Especial';
    }
    if (fullText.includes('incapacidade') || fullText.includes('auxílio-acidente') || fullText.includes('auxílio-doença') || fullText.includes('invalidez') || fullText.includes('laudo pericial')) {
      return 'Incapacidade & Auxílios';
    }
    if (fullText.includes('pensão') || fullText.includes('dependente') || fullText.includes('bpc') || fullText.includes('loas') || fullText.includes('assistencial')) {
      return 'Pensões & LOAS/BPC';
    }
    if (fullText.includes('revisão') || fullText.includes('reajuste') || fullText.includes('salário de benefício') || fullText.includes('cálculo') || fullText.includes('fator')) {
      return 'Revisão de Benefícios & Cálculos';
    }
    return 'Geral Previdenciário';
  }

  if (item.category === 'Direito Civil' || item.category === 'Direito do Consumidor') {
    if (fullText.includes('indenização') || fullText.includes('dano moral') || fullText.includes('dano material') || fullText.includes('responsabilidade civil') || fullText.includes('acidente')) {
      return 'Responsabilidade Civil & Indenizações';
    }
    if (fullText.includes('contrato') || fullText.includes('cessão') || fullText.includes('banco') || fullText.includes('juros') || fullText.includes('seguro') || fullText.includes('empréstimo')) {
      return 'Contratos, Bancário & Obrigações';
    }
    if (fullText.includes('imóvel') || fullText.includes('locação') || fullText.includes('condomínio') || fullText.includes('usucapião') || fullText.includes('posse') || fullText.includes('propriedade')) {
      return 'Direito Imobiliário & Posse';
    }
    if (fullText.includes('família') || fullText.includes('alimentos') || fullText.includes('divórcio') || fullText.includes('herança') || fullText.includes('sucessões')) {
      return 'Família & Sucessões';
    }
    return 'Geral Direito Civil';
  }

  if (item.category === 'Direito Processual Civil') {
    if (fullText.includes('execução') || fullText.includes('cumprimento de sentença') || fullText.includes('penhora') || fullText.includes('precatório') || fullText.includes('rpv')) {
      return 'Execução & Cumprimento de Sentença';
    }
    if (fullText.includes('gratuidade') || fullText.includes('justiça gratuita') || fullText.includes('custas') || fullText.includes('hipossuficiência') || fullText.includes('honorários')) {
      return 'Gratuidade de Justiça & Honorários';
    }
    if (fullText.includes('prescrição') || fullText.includes('decadência') || fullText.includes('intercorrente') || fullText.includes('prazo')) {
      return 'Prescrição & Prazos';
    }
    if (fullText.includes('recurso') || fullText.includes('agravo') || fullText.includes('fungibilidade') || fullText.includes('apelação')) {
      return 'Recursos & Admissibilidade';
    }
    return 'Geral Processual Civil';
  }

  return 'Outras Matérias';
}

let countBySub = {};
dataset.forEach(item => {
  item.subCategory = classifySubCategory(item);
  countBySub[item.subCategory] = (countBySub[item.subCategory] || 0) + 1;
});

fs.writeFileSync(jsonPath, JSON.stringify(dataset, null, 2), 'utf8');

console.log('=== SUB-CATEGORIES CLASSIFIED SUCCESSFULLY ===');
console.log(countBySub);
