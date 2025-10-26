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

    // Aqui não temos endpoint de envio configurado no repositório.
    // Então exibimos uma confirmação visual e simulamos envio.
    showMessage('Sua mensagem foi enviada! (simulação)', 'success');
    form.reset();
    if (typeof grecaptcha !== 'undefined' && grecaptcha.reset) {
      try { grecaptcha.reset(); } catch (e) { /* noop */ }
    }
  });
});
