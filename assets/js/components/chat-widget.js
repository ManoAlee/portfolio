// Chat widget minimal que consulta o servidor local em /api/query
(function(){
  if (typeof window === 'undefined') return;

  function createWidget(){
    const widget = document.createElement('div');
    widget.className = 'chat-widget';
    widget.innerHTML = `
      <div class="header">Chat com Alessandro</div>
      <div class="messages" id="chat-messages"></div>
      <div class="input">
        <input id="chat-input" placeholder="Faça uma pergunta..." />
        <button id="chat-send">Enviar</button>
      </div>
    `;
    document.body.appendChild(widget);

    const toggle = document.createElement('div');
    toggle.className = 'chat-toggle';
    toggle.textContent = 'AM';
    document.body.appendChild(toggle);

    let opened = true;
    function setOpen(v){ opened = v; widget.style.display = v? 'flex':'none'; toggle.style.display = v? 'none':'flex'; }
    // start open
    setOpen(true);

    toggle.addEventListener('click', () => setOpen(true));

    document.getElementById('chat-send').addEventListener('click', sendQuery);
    document.getElementById('chat-input').addEventListener('keydown', (e)=>{ if (e.key === 'Enter') sendQuery(); });

    async function sendQuery(){
      const input = document.getElementById('chat-input');
      const q = input.value.trim();
      if (!q) return;
      appendMsg('me', q);
      input.value = '';
      appendMsg('them', 'Pensando...');

      try {
        const res = await fetch('/api/query?q='+encodeURIComponent(q));
        const j = await res.json();
        // remove last placeholder
        const msgs = document.getElementById('chat-messages');
        if (msgs.lastChild && msgs.lastChild.dataset && msgs.lastChild.dataset.placeholder) msgs.removeChild(msgs.lastChild);
        if (j.answer) appendMsg('them', j.answer.replace(/\n/g,'\n'));
        if (j.evidence) j.evidence.forEach(e=> appendMsg('them', `${e.path}: ${e.snippet.slice(0,240)}...`));
      } catch (e) {
        appendMsg('them', 'Erro ao consultar o servidor local.');
      }
    }

    function appendMsg(who, text){
      const container = document.getElementById('chat-messages');
      const el = document.createElement('div'); el.className = 'msg '+(who==='me'?'me':'them');
      const bubble = document.createElement('div'); bubble.className = 'bubble'; bubble.textContent = text;
      el.appendChild(bubble);
      // mark placeholder
      if (text === 'Pensando...') el.dataset.placeholder = '1';
      container.appendChild(el);
      container.scrollTop = container.scrollHeight;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', createWidget);
  else createWidget();

})();
(() => {
  // Use origin atual and default to same host; if running on a different port, prefer relative /api paths
  const BASE = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? `${location.protocol}//${location.hostname}:4546` : location.origin;

  function $(s, ctx=document) { return ctx.querySelector(s); }

  function createWidget() {
    const btn = document.createElement('div'); btn.className='chat-widget-btn'; btn.innerHTML='💬';
    const panel = document.createElement('div'); panel.className='chat-widget-panel chat-hidden';

    panel.innerHTML = `
      <div class="chat-widget-header">Chat (simula Alessandro)</div>
      <div class="chat-widget-messages" id="chat-messages"></div>
      <div class="chat-widget-input">
        <input id="chat-input" placeholder="Pergunte algo...">
        <button id="chat-send">Enviar</button>
      </div>
    `;

    document.body.appendChild(btn); document.body.appendChild(panel);

    btn.addEventListener('click', () => panel.classList.toggle('chat-hidden'));
    panel.querySelector('#chat-send').addEventListener('click', sendMessage);
    panel.querySelector('#chat-input').addEventListener('keydown', (e)=>{ if(e.key==='Enter') sendMessage(); });
  }

  async function sendMessage() {
    const input = $('#chat-input'); const msg = input.value.trim(); if(!msg) return;
    appendMessage('Você', msg);
    input.value='';
    appendMessage('Bot', 'Pesquisando...');
    try {
      const res = await fetch(BASE + '/api/query?q=' + encodeURIComponent(msg));
      const j = await res.json();
      // remove last 'Pesquisando' message
      const msgs = document.querySelectorAll('.chat-msg');
      if (msgs.length) msgs[msgs.length-1].remove();
      appendMessage('Alessandro', j.answer || JSON.stringify(j));
    } catch (e) {
      appendMessage('Alessandro', 'Erro local: não foi possível consultar o agente.');
    }
  }

  function appendMessage(who, text) {
    const c = document.createElement('div'); c.className='chat-msg';
    c.innerHTML = `<div class="who">${who}</div><div class="text">${text}</div>`;
    $('#chat-messages').appendChild(c);
    $('#chat-messages').scrollTop = $('#chat-messages').scrollHeight;
  }

  // init after DOM
  document.addEventListener('DOMContentLoaded', () => {
    createWidget();
  });

})();
// Chat widget minimal - comunica com o servidor local em /api/query
(function(){
  // Ensure chat uses the same API host/port that the local agent serves
  const SERVER = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? `${location.protocol}//${location.hostname}:4546` : location.origin;

  function createWidget(){
    if (document.getElementById('chat-widget')) return;
    const div = document.createElement('div');
    div.id = 'chat-widget';
    div.innerHTML = `
      <div class="cw-toggle" aria-label="Abrir chat">💬</div>
      <div class="cw-panel">
        <div class="cw-header">Chat com Alessandro <button class="cw-close">×</button></div>
        <div class="cw-body" id="cw-body"></div>
        <div class="cw-footer">
          <input id="cw-input" placeholder="Pergunte algo sobre meu trabalho..." />
          <button id="cw-send">Enviar</button>
        </div>
      </div>
    `;
    document.body.appendChild(div);

    const toggle = div.querySelector('.cw-toggle');
    const panel = div.querySelector('.cw-panel');
    const close = div.querySelector('.cw-close');
    const body = div.querySelector('#cw-body');
    const input = div.querySelector('#cw-input');
    const send = div.querySelector('#cw-send');

    toggle.addEventListener('click', ()=> panel.classList.toggle('open'));
    close.addEventListener('click', ()=> panel.classList.remove('open'));

    send.addEventListener('click', sendQuery);
    input.addEventListener('keydown', (e)=> { if (e.key === 'Enter') sendQuery(); });

    function appendMessage(who, text){
      const el = document.createElement('div'); el.className = 'cw-msg cw-'+who; el.textContent = text;
      body.appendChild(el); body.scrollTop = body.scrollHeight;
    }

    async function sendQuery(){
      const q = input.value.trim(); if (!q) return;
      appendMessage('user', q); input.value = '';
      appendMessage('assistant', 'Pensando...');

      try {
        const resp = await fetch(SERVER + '/api/query', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ query: q })});
        const json = await resp.json();
        // remove 'Pensando...' placeholder
        const last = body.querySelector('.cw-assistant:last-child'); if (last) last.remove();
        appendMessage('assistant', json.answer || 'Sem resposta');
      } catch (e) {
        const last = body.querySelector('.cw-assistant:last-child'); if (last) last.remove();
        appendMessage('assistant', 'Erro ao contatar o servidor local. Inicie tools/local-agent/server.js');
      }
    }
  }

  // init on DOM ready
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', createWidget); else createWidget();
})();
