const STJ_URL = 'https://processo.stj.jus.br/repetitivos/temas_repetitivos/pesquisa.jsp';

async function testIAC() {
  const params = new URLSearchParams({
    p: 'true', novaConsulta: 'true', quantidadeResultadosPorPagina: '-1', i: '1', l: '-1', b: 'TT', tipo_pesquisa: 'I'
  });
  const res = await fetch(STJ_URL, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params.toString() });
  const buf = await res.arrayBuffer();
  const html = Buffer.from(buf).toString('latin1');
  
  const rawBlocks = html.split(/<div class="row">\s*<div class="col-3 p-0 borda_clara">/gi);
  console.log('IAC BLOCK 1 FULL:');
  console.log(rawBlocks[1]);
}

testIAC();
