const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Call Google Gemini REST API directly with prompt
 */
async function callGeminiApi(promptText, systemInstruction = '') {
  try {
    if (!GEMINI_API_KEY) {
      throw new Error('Chave de API do Gemini não configurada (VITE_GEMINI_API_KEY). Adicione no arquivo .env ou no Vercel Environment Variables.');
    }

    const payload = {
      contents: [
        {
          parts: [{ text: promptText }]
        }
      ]
    };

    if (systemInstruction) {
      payload.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Gemini API Error Response:', errText);
      throw new Error(`Erro na API Gemini (${res.status}): ${res.statusText}`);
    }

    const data = await res.json();
    const candidate = data.candidates?.[0];
    if (candidate && candidate.content && candidate.content.parts?.[0]?.text) {
      return candidate.content.parts[0].text;
    }
    return 'Não foi possível obter a resposta da IA no momento.';
  } catch (error) {
    console.error('Failed to call Gemini API:', error);
    throw error;
  }
}

/**
 * Search precedents using Gemini AI natural language matching
 */
export async function searchPrecedentsWithAI(query, precedentsDataset) {
  const contextItems = precedentsDataset
    .filter(p => p.tese || p.questao)
    .slice(0, 75)
    .map(p => `[ID: ${p.id}] ${p.title} | ${p.category} | Fase: ${p.situacao}\nQuestão: ${p.questao}\nTese: ${p.tese || 'Aguardando julgamento'}`)
    .join('\n\n');

  const systemInstruction = `Você é um Jurista Sênior Especialista em Precedentes Qualificados do STJ (Direito Civil, Processual Civil e Direito Previdenciário).
Sua missão é analisar o caso concreto/dúvida jurídica trazida pelo advogado e identificar com precisão:
1. Quais Temas Repetitivos, Controvérsias, IAC ou PUIL se aplicam ao caso.
2. Qual a Tese Firmada pelo STJ e em qual fase processual o precedente se encontra (Trânsito em Julgado, Julgado com Tese, Em Julgamento/Afetado, Sobrestado).
3. Orientação prática e estratégica de como citar ou utilizar o precedente na petição inicial, recurso ou sustentação oral.

Forneça respostas em Markdown extremamente organizadas, com tópicos claros, destaques em negrito e links/referências exatas aos números dos Temas.`;

  const prompt = `DÚVIDA DO ADVOGADO: "${query}"

BASE DE PRECEDENTES QUALIFICADOS DO STJ DISPONÍVEIS:
${contextItems}

Por favor, analise a dúvida e responda destacando os precedentes aplicáveis, suas teses, em qual fase se encontram e a melhor estratégia jurídica.`;

  return await callGeminiApi(prompt, systemInstruction);
}

/**
 * Generate deep legal analysis & case strategy for a specific precedent
 */
export async function analyzePrecedentWithAI(precedent) {
  const systemInstruction = `Você é um Consultor Jurídico especialista em Direito Processual Civil e Precedentes do STJ.`;

  const prompt = `Analise o seguinte precedente qualificado do STJ:
- Título: ${precedent.title} (${precedent.typeName})
- Ramo do Direito: ${precedent.ramoDireito}
- Órgão Julgador: ${precedent.orgaoJulgador}
- Fase/Situação Atual: ${precedent.situacao}
- Questão Submetida: ${precedent.questao}
- Tese Firmada: ${precedent.tese || 'Ainda não julgado'}
- Anotações NUGEPNAC: ${precedent.anotacoesNugep}
- Repercussão Geral: ${precedent.repercussaoGeral}

Gere uma síntese estratégica em Markdown contendo:
1. **Resumo Executivo** (O que decidiu o STJ em linguagem direta)
2. **Impacto Prático nos Processos de Direito Civil / Previdenciário**
3. **Fase e Eficácia Vinculante** (Se autoriza tutela provisória, se exige sobrestamento ou se já transitou em julgado)
4. **Modelo de Parágrafo para Petição** (Exemplo de como citar esta tese em uma peça processual)`;

  return await callGeminiApi(prompt, systemInstruction);
}
