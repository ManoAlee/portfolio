#!/usr/bin/env node
// Local agent server - Versão final e corrigida
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const https = require('https');

// --- CONFIGURAÇÃO ---
const PORT = process.env.PORT || 4546;
const ROOT = path.resolve(__dirname, '..', '..'); // Raiz do repositório
const INDEX_PATH = path.join(__dirname, 'index.json');
const PROFILE_PATH = path.join(ROOT, 'data', 'profile.json');

// --- FUNÇÕES AUXILIARES ---

/** Lê e faz o parse de um arquivo JSON de forma segura. */
function readJSON(filePath, defaultValue = {}) {
  if (!fs.existsSync(filePath)) return defaultValue;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.error(`Erro ao ler JSON: ${filePath}`, e);
    return defaultValue;
  }
}

/** Função de fallback para a API do Gemini. */
async function callGeminiFallback(query) {
  const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const API_URL = process.env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  if (!API_KEY) return null;

  const payload = JSON.stringify({ contents: [{ parts: [{ text: query }] }] });

  return new Promise((resolve) => {
    try {
      const urlInstance = new URL(API_URL);
      const options = {
        hostname: urlInstance.hostname,
        path: urlInstance.pathname + urlInstance.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
          'X-goog-api-key': API_KEY,
        },
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
            resolve(text || null);
          } catch (e) {
            resolve(null);
          }
        });
      });

      req.on('error', () => resolve(null));
      req.write(payload);
      req.end();
    } catch (e) {
      resolve(null);
    }
  });
}

/** Sintetiza uma resposta usando o índice local e o perfil. */
function synthesizeLocalAnswer(query) {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return { answer: 'Por favor, faça uma pergunta sobre meu perfil ou projetos.' };

  const profile = readJSON(PROFILE_PATH, {});
  if (['sobre', 'perfil', 'quem', 'bio'].some(keyword => q.includes(keyword))) {
    return { answer: `${profile.name || 'Nome não configurado'} — ${profile.title || ''}\n${profile.bio || ''}` };
  }

  const index = readJSON(INDEX_PATH, { items: [] });
  const hits = (index.items || []).filter(item =>
    (item.snippet || '').toLowerCase().includes(q) || (item.path || '').toLowerCase().includes(q)
  );

  if (hits.length === 0) return null;

  const evidence = hits.slice(0, 5).map(h => ({ path: h.path, snippet: (h.snippet || '').slice(0, 300).replace(/\s+/g, ' ') }));
  return { answer: 'Encontrei referências nos arquivos do meu portfólio. Veja as evidências:', evidence };
}

/** Envia uma resposta JSON padrão. */
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*', // CORS
  });
  res.end(JSON.stringify(data));
}

// --- LÓGICA DO SERVIDOR ---

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Rota da API de Consulta (POST e GET)
  if (pathname === '/api/query') {
    let query = '';
    if (req.method === 'GET') {
      query = parsedUrl.query.q || '';
      const response = synthesizeLocalAnswer(query) || (await callGeminiFallback(query) ? { answer: await callGeminiFallback(query), source: 'gemini' } : { answer: 'Desculpe, não encontrei informações sobre isso.' });
      return sendJSON(res, 200, response);
    }
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => (body += chunk));
      req.on('end', async () => {
        try {
          query = JSON.parse(body || '{}').query || '';
          const response = synthesizeLocalAnswer(query) || (await callGeminiFallback(query) ? { answer: await callGeminiFallback(query), source: 'gemini' } : { answer: 'Desculpe, não encontrei informações sobre isso.' });
          return sendJSON(res, 200, response);
        } catch (e) {
          return sendJSON(res, 400, { error: 'Corpo da requisição JSON inválido.' });
        }
      });
      return;
    }
  }

  // Rota de Health Check
  if (pathname === '/api/health') {
    return sendJSON(res, 200, { ok: true });
  }

  // Servir Arquivos Estáticos (GET e HEAD)
  if (req.method === 'GET' || req.method === 'HEAD') {
    let filePath = pathname === '/' ? 'index.html' : decodeURIComponent(pathname.substring(1));
    const resolvedPath = path.normalize(path.join(ROOT, filePath));

    // Verificação de segurança
    if (!resolvedPath.startsWith(ROOT)) {
      return sendJSON(res, 403, { error: 'Acesso proibido.' });
    }

    if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile()) {
      const stats = fs.statSync(resolvedPath);
      const mimeTypes = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf' };
      const contentType = mimeTypes[path.extname(resolvedPath).toLowerCase()] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': stats.size,
        'Access-Control-Allow-Origin': '*',
      });

      if (req.method === 'GET') {
        fs.createReadStream(resolvedPath).pipe(res);
      } else {
        res.end(); // Finaliza a resposta para requisições HEAD
      }
      return;
    }
  }

  // Resposta 404 para tudo que não foi encontrado
  return sendJSON(res, 404, { error: 'Não encontrado.' });
});

// --- INICIALIZAÇÃO DO SERVIDOR ---

server.listen(PORT, () => {
  console.log(`🚀 Servidor do agente local iniciado em http://localhost:${PORT}`);
});