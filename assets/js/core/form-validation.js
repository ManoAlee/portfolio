// Centraliza validação do formulário de contato e feedback visual
// Modo: ES Module
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const msgEl = document.getElementById('form-msg');

  function showMessage(text, type) {
    if (!msgEl) return;
    msgEl.textContent = text;
    msgEl.style.color = type === 'error' ? '#dc2626' : '#16a34a'; // red or green
    // foco para leitores de tela
    msgEl.setAttribute('role', 'status');
    // auto-hide após 6s
    clearTimeout(showMessage._t);
    showMessage._t = setTimeout(() => {
      msgEl.textContent = '';
      msgEl.style.color = '';
    }, 6000);
  }

  function isEmail(email) {
    // Validação simples compatível com HTML5
    try {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    } catch (e) { return false; }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Honeypot
    const honeypot = form.querySelector('#website');
    if (honeypot && honeypot.value) {
      showMessage('Erro: Detecção de spam.', 'error');
      return;
    }

    const nome = (form.querySelector('#nome') || {}).value || '';
    const email = (form.querySelector('#email') || {}).value || '';
    const mensagem = (form.querySelector('#mensagem') || {}).value || '';

    if (!nome.trim() || !email.trim() || !mensagem.trim()) {
      showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
      return;
    }

    if (!isEmail(email)) {
      showMessage('Por favor, forneça um e-mail válido.', 'error');
      return;
    }

    // Validação reCAPTCHA (se presente)
    if (typeof grecaptcha !== 'undefined') {
      const response = grecaptcha.getResponse && grecaptcha.getResponse();
      if (!response) {
        showMessage('Por favor, confirme o reCAPTCHA.', 'error');
        return;
      }
    }

    // Envia para endpoint local (server/contact-server.js)
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: nome.trim(), email: email.trim(), mensagem: mensagem.trim(), website: (honeypot && honeypot.value) || '', recaptcha: (typeof grecaptcha !== 'undefined' && grecaptcha.getResponse) ? grecaptcha.getResponse() : null })
    }).then(r => r.json()).then(result => {
      if (result && result.ok) {
        showMessage('Sua mensagem foi enviada com sucesso. Obrigado!', 'success');
        form.reset();
        if (typeof grecaptcha !== 'undefined' && grecaptcha.reset) {
          try { grecaptcha.reset(); } catch (e) { /* noop */ }
        }
      } else {
        showMessage(result && result.error ? `Erro: ${result.error}` : 'Erro ao enviar a mensagem.', 'error');
      }
    }).catch(err => {
      console.error('Erro no envio do formulário:', err);
      showMessage('Erro na conexão. Tente novamente mais tarde.', 'error');
    }).finally(() => {
      if (submitBtn) submitBtn.disabled = false;
    });
  });
});
