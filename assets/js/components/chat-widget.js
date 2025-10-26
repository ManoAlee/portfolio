// Chat widget - versão consolidada, leve e acessível
(function(){
  if (typeof window === 'undefined') return;

  const MOBILE_BREAKPOINT = 420;
  const AUTO_OPEN_DELAY_MS = 7000; // abre após 7s

  function build() {
    if (document.getElementById('chat-widget')) return;

    const wrapper = document.createElement('div'); wrapper.id = 'chat-widget'; wrapper.className = 'cw-root';

    wrapper.innerHTML = `
      <button class="cw-toggle" aria-label="Abrir chat" title="Abrir chat">💬</button>
      <aside class="cw-panel" role="dialog" aria-label="Chat com Alessandro" aria-hidden="true">
        <header class="cw-header">
          <div class="cw-title">Chat com Alessandro</div>
          <div class="cw-actions">
            <button class="cw-minimize" aria-label="Minimizar" title="Minimizar">_</button>
            <button class="cw-close" aria-label="Fechar" title="Fechar">×</button>
          </div>
        </header>
        <div class="cw-body" id="cw-body" aria-live="polite"></div>
        <footer class="cw-footer">
          <input id="cw-input" aria-label="Mensagem" placeholder="Pergunte algo sobre meu trabalho..." />
          <button id="cw-send" aria-label="Enviar mensagem">Enviar</button>
        </footer>
      </aside>
    `;

    document.body.appendChild(wrapper);

    const toggle = wrapper.querySelector('.cw-toggle');
    const panel = wrapper.querySelector('.cw-panel');
    const closeBtn = wrapper.querySelector('.cw-close');
    const minBtn = wrapper.querySelector('.cw-minimize');
    const body = wrapper.querySelector('#cw-body');
    const input = wrapper.querySelector('#cw-input');
    const send = wrapper.querySelector('#cw-send');

    function openPanel() { panel.classList.add('open'); panel.setAttribute('aria-hidden','false'); toggle.style.display='none'; document.body.classList.add('chat-open'); }
    function closePanel() { panel.classList.remove('open'); panel.setAttribute('aria-hidden','true'); toggle.style.display='flex'; document.body.classList.remove('chat-open'); }
    function minimizePanel() { panel.classList.toggle('minimized'); }

    toggle.addEventListener('click', () => openPanel());
    closeBtn.addEventListener('click', () => closePanel());
    minBtn.addEventListener('click', () => minimizePanel());

    send.addEventListener('click', sendQuery);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendQuery(); });

    // hide widget on very small screens to avoid overlay problems
    function adaptToScreen() {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        wrapper.classList.add('cw-mobile');
      } else {
        wrapper.classList.remove('cw-mobile');
      }
    }
    adaptToScreen();
    window.addEventListener('resize', adaptToScreen, { passive: true });

    // Auto-open after delay if not mobile
    if (window.innerWidth > MOBILE_BREAKPOINT) {
      setTimeout(() => {
        // only auto-open if user didn't interact
        if (!document.body.classList.contains('chat-open')) openPanel();
      }, AUTO_OPEN_DELAY_MS);
    }

    function append(who, text) {
      const el = document.createElement('div'); el.className = 'cw-msg cw-'+who; el.innerText = text;
      body.appendChild(el); body.scrollTop = body.scrollHeight;
    }

    async function sendQuery(){
      const q = input.value.trim(); if(!q) return;
      append('user', q); input.value=''; append('assistant', 'Pesquisando...');
      try {
        const base = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? `${location.protocol}//${location.hostname}:4546` : location.origin;
        const resp = await fetch(base + '/api/query', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ query: q }) });
        const json = await resp.json();
        // remove last 'Pesquisando...' placeholder
        const placeholders = body.querySelectorAll('.cw-assistant');
        if (placeholders.length) placeholders[placeholders.length-1].remove();
        append('assistant', json.answer || 'Sem resposta');
      } catch (err) {
        append('assistant', 'Erro ao contatar o servidor local.');
      }
    }

  }

  // init
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();

})();
