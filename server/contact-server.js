const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '200kb' }));

const DATA_FILE = path.join(__dirname, '..', 'data', 'contacts.json');

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify({ contacts: [] }, null, 2));
    }
  } catch (e) {
    console.error('Erro ao garantir arquivo de dados:', e);
  }
}

app.post('/api/contact', (req, res) => {
  const { nome, email, mensagem, website, recaptcha } = req.body || {};

  // Honeypot check
  if (website) {
    return res.status(400).json({ ok: false, error: 'Spam detectado' });
  }

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ ok: false, error: 'Campos obrigatórios ausentes' });
  }

  // Simple email sanity check
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValid) {
    return res.status(400).json({ ok: false, error: 'Email inválido' });
  }

  // For demo/self-hosting we don't verify recaptcha server-side here.
  // In production, verify recaptcha with Google's API using the secret key.

  const entry = {
    id: Date.now(),
    nome: String(nome).trim(),
    email: String(email).trim(),
    mensagem: String(mensagem).trim(),
    recaptcha: recaptcha || null,
    createdAt: new Date().toISOString()
  };

  try {
    ensureDataFile();
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const obj = JSON.parse(raw || '{"contacts": []}');
    obj.contacts = obj.contacts || [];
    obj.contacts.push(entry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(obj, null, 2));

    // For local testing, also log
    console.log('Novo contato recebido:', entry);

    return res.json({ ok: true, id: entry.id });
  } catch (e) {
    console.error('Erro ao salvar contato:', e);
    return res.status(500).json({ ok: false, error: 'Erro interno' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`Contact API listening on http://localhost:${PORT}`);
});
