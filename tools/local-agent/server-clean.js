#!/usr/bin/env node
// Local agent server - clean single implementation (server-clean.js)
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = process.env.PORT || 4546; // use different port to avoid conflicts
const ROOT = path.resolve(__dirname, '..', '..');
const INDEX_PATH = path.join(__dirname, 'index.json');
const PROFILE_PATH = path.join(ROOT, 'data', 'profile.json');

function readJSON(p, defaultValue) {
  if (!fs.existsSync(p)) return defaultValue;
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { return defaultValue; }
}

async function callGeminiFallback(query) {
  const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || null;
  const URL = process.env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  if (!API_KEY) return null;
  const payload = JSON.stringify({ contents: [{ parts: [{ text: query }] }] });
  return new Promise((resolve) => {
    try {
      const u = new URL(URL);
      const opts = { hostname: u.hostname, path: u.pathname + u.search, method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload), 'X-goog-api-key': API_KEY } };
      const req = https.request(opts, (res) => {
        let data = '';
        res.on('data', (d) => data += d.toString());
        res.on('end', () => {
          try { const parsed = JSON.parse(data); const candidate = parsed?.candidates?.[0]?.content?.[0]?.text || parsed?.output?.[0]?.content?.[0]?.text || null; resolve(candidate || null); } catch (e) { resolve(null); }
        });
      });
      req.on('error', () => resolve(null));
      req.write(payload);
      req.end();
    } catch (e) { resolve(null); }
  });
}

function synthesizeLocalAnswer(q) {
  const idx = readJSON(INDEX_PATH, { items: [] });
  const profile = readJSON(PROFILE_PATH, {});
  const query = String(q || '').trim();
  if (!query) return { answer: 'Faça uma pergunta sobre meu perfil ou projetos.' };
  const ql = query.toLowerCase();
  if (ql.includes('sobre') || ql.includes('perfil') || ql.includes('quem') || ql.includes('bio')) {
    return { answer: `${profile.name || 'Nome não configurado'} — ${profile.title || ''}\n${profile.bio || ''}` };
  }
  const hits = (idx.items || []).filter(it => ((it.snippet||'').toLowerCase().includes(ql)) || ((it.path||'').toLowerCase().includes(ql)));
  if (hits.length === 0) return null;
  const top = hits.slice(0,5).map(h => ({ path: h.path, snippet: (h.snippet||'').slice(0,400).replace(/\s+/g,' ') }));
  return { answer: 'Encontrei referências em arquivos locais. Veja evidências abaixo.', evidence: top };
}

function sendJSON(res, code, obj) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(obj));
}

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  if (parsed.pathname === '/api/query' && req.method === 'GET') {
    const q = parsed.query.q || '';
    const local = synthesizeLocalAnswer(q);
    if (local) { sendJSON(res, 200, local); return; }
    const external = await callGeminiFallback(q);
    if (external) { sendJSON(res, 200, { answer: external, source: 'gemini' }); return; }
    sendJSON(res, 200, { answer: 'Desculpe, não encontrei informações locais sobre isso.' });
    return;
  }
  if (parsed.pathname === '/api/query' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
      try {
        const b = JSON.parse(body || '{}');
        const q = b.query || '';
        const local = synthesizeLocalAnswer(q);
        if (local) { sendJSON(res, 200, local); return; }
        const external = await callGeminiFallback(q);
        if (external) { sendJSON(res, 200, { answer: external, source: 'gemini' }); return; }
        sendJSON(res, 200, { answer: 'Desculpe, não encontrei informações locais sobre isso.' });
      } catch (e) { sendJSON(res, 400, { error: 'invalid json' }); }
    });
    return;
  }
  if (parsed.pathname === '/api/health') { sendJSON(res, 200, { ok: true }); return; }
  if (req.method === 'GET' || req.method === 'HEAD') {
    // Resolve requested path relative to repository root.
    // On Windows a leading slash makes path.join treat the segment as absolute
    // so strip leading slashes before joining. Also prevent directory traversal.
    let relPath = decodeURIComponent(parsed.pathname || '/');
    if (relPath === '/' || relPath === '') relPath = '/index.html';
    relPath = relPath.replace(/^\/+/, '');
    const resolved = path.normalize(path.join(ROOT, relPath));
    // security: ensure resolved path is inside ROOT using path.relative
    const relative = path.relative(ROOT, resolved);
    if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) { sendJSON(res, 403, { error: 'forbidden' }); return; }
    const p = resolved;
    if (fs.existsSync(p) && fs.statSync(p).isFile()) {
      const stats = fs.statSync(p);
      const ext = path.extname(p).toLowerCase();
      const map = { '.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.json':'application/json', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml', '.ico':'image/x-icon', '.woff':'font/woff', '.woff2':'font/woff2', '.ttf':'font/ttf' };
      const headers = { 'Content-Type': map[ext] || 'application/octet-stream', 'Content-Length': String(stats.size), 'Access-Control-Allow-Origin': '*' };
      // respond to HEAD without body
      res.writeHead(200, headers);
      if (req.method === 'GET') {
        fs.createReadStream(p).pipe(res);
      } else {
        res.end();
      }
      return;
    }
  }
  sendJSON(res, 404, { error: 'not found' });
});

server.listen(PORT, () => console.log(`Local agent server (clean) listening on http://localhost:${PORT}`));
