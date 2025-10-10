#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Configurações simples
const ROOT = path.resolve(__dirname, '..', '..');
const INDEX_PATH = path.join(__dirname, 'index.json');
const ALLOWED_EXT = ['.html', '.htm', '.js', '.css', '.json', '.md'];
let AGENT_KEY = process.env.AGENT_KEY || null;

function loadDotEnv() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;
  try {
    const txt = fs.readFileSync(envPath, 'utf8');
    txt.split(/\r?\n/).forEach(line => {
      const m = line.match(/^\s*([A-Z0-9_]+)=(.*)$/i);
      if (m) {
        const k = m[1];
        let v = m[2] || '';
        v = v.trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '');
        if (k === 'AGENT_KEY') AGENT_KEY = v;
      }
    });
  } catch (e) { /* ignore */ }
}

loadDotEnv();

function walk(dir, files=[]) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      // ignore node_modules, .git, backup folders
      if (['node_modules', '.git', 'backup_20251003', 'tools'].includes(e.name)) continue;
      walk(full, files);
    } else {
      if (ALLOWED_EXT.includes(path.extname(e.name).toLowerCase())) {
        files.push(full);
      }
    }
  }
  return files;
}

function buildIndex() {
  const files = walk(ROOT);
  const index = files.map(fp => {
    let content = '';
    try { content = fs.readFileSync(fp, 'utf8'); } catch(e) { content = ''; }
    return {
      path: path.relative(ROOT, fp).replace(/\\/g, '/'),
      ext: path.extname(fp),
      snippet: content.slice(0, 4000)
    };
  });

  fs.writeFileSync(INDEX_PATH, JSON.stringify({ generatedAt: new Date().toISOString(), items: index }, null, 2), 'utf8');
  console.log('Index gerado em', INDEX_PATH, 'com', index.length, 'arquivos indexados');
}

function queryIndex(q) {
  // busca simples por substring (case-insensitive)
  if (!fs.existsSync(INDEX_PATH)) {
    console.error('index.json nao encontrado. Rode --index primeiro.');
    process.exit(1);
  }
  const idx = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
  const ql = q.toLowerCase();
  const results = idx.items.filter(it => {
    return (it.snippet && it.snippet.toLowerCase().includes(ql)) || it.path.toLowerCase().includes(ql);
  });
  return results.slice(0, 20);
}

function repl() {
  const readline = require('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: 'local-agent> ' });
  rl.prompt();
  rl.on('line', (line) => {
    const q = line.trim();
    if (!q) { rl.prompt(); return; }
    // comandos REPL especiais
    if (q === 'exit' || q === 'quit') { rl.close(); return; }
    if (q.startsWith(':setkey ')) {
      const k = q.split(' ').slice(1).join(' ').trim();
      if (!k) { console.log('Uso: :setkey <sua_chave>'); rl.prompt(); return; }
      AGENT_KEY = k;
      // salvar no .env local (não versionado)
      try { fs.writeFileSync(path.join(__dirname, '.env'), `AGENT_KEY=${k}\n`, 'utf8'); console.log('Chave salva em .env (local)'); } catch(e) { console.log('Falha ao salvar .env:', e.message); }
      rl.prompt(); return;
    }
    if (q === ':key') { console.log('AGENT_KEY =', AGENT_KEY ? '***hidden***' : '(nenhuma)'); rl.prompt(); return; }
    const r = queryIndex(q);
    if (r.length === 0) console.log('Nenhum resultado para:', q);
    else r.forEach((it, i) => console.log(`#${i+1} ${it.path}\n---\n${it.snippet.slice(0,800)}\n`));
    rl.prompt();
  }).on('close', () => { console.log('Sessao finalizada.'); process.exit(0); });
}

// Simple CLI
const args = process.argv.slice(2);
if (args.includes('--index')) { buildIndex(); process.exit(0); }
if (args.includes('--repl')) { repl(); }
else if (args.length >= 2 && args[0] === '--query') {
  const q = args.slice(1).join(' ');
  const res = queryIndex(q);
  if (res.length === 0) console.log('Nenhum resultado.');
  else res.forEach((it, i) => console.log(`#${i+1} ${it.path}\n---\n${it.snippet.slice(0,1200)}\n`));
} else {
  console.log('Uso: node agent.js --index | --repl | --query <termo>');
}
