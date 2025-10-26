// Front-end logic para a página de Adicionar Projeto
(function(){
  const form = document.getElementById('add-project-form');
  const statusEl = document.getElementById('form-status');

  function setStatus(text, isError){
    statusEl.textContent = text || '';
    statusEl.style.color = isError ? 'crimson' : '#6B7280';
  }

  // Redimensiona imagem para largura máxima mantendo aspecto e retorna dataURL
  function resizeImage(file, maxWidth = 1200){
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = e => {
        img.onload = () => {
          const scale = Math.min(1, maxWidth / img.width);
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          resolve(dataUrl);
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleSubmit(e){
    e.preventDefault();
    setStatus('Validando...');

    // Honeypot anti-spam
    const website = form.querySelector('input[name="website"]').value;
    if (website) {
      setStatus('Spam detectado', true);
      return;
    }

    const title = form.title.value && form.title.value.trim();
    const description = form.description.value && form.description.value.trim();
    if (!title || !description) {
      setStatus('Preencha os campos obrigatórios (título e resumo).', true);
      return;
    }

    setStatus('Processando imagem (se houver)...');
    let imageData = '';
    const fileInput = document.getElementById('imageFile');
    if (fileInput && fileInput.files && fileInput.files[0]){
      try{
        imageData = await resizeImage(fileInput.files[0], 1000);
      }catch(err){
        console.warn('Falha ao processar imagem:', err);
        // continuar sem imagem
      }
    }

    setStatus('Enviando projeto...');

    const payload = {
      title: title,
      category: (form.category.value || '').trim(),
      description: description,
      technologies: (form.technologies.value || '').split(',').map(s => s.trim()).filter(Boolean),
      github: (form.github.value || '').trim(),
      demo: (form.demo.value || '').trim(),
      image: imageData,
      metrics: (form.metrics && form.metrics.value) ? form.metrics.value.trim() : '',
      role: (form.role && form.role.value) ? form.role.value.trim() : ''
    };

    try{
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.ok){
        setStatus(data.error || 'Erro ao enviar projeto', true);
        return;
      }
      setStatus('Projeto enviado com sucesso! Redirecionando...', false);
      setTimeout(() => { window.location.href = '/pages/projects/index.html'; }, 900);
    }catch(err){
      console.error('Erro ao enviar projeto:', err);
      setStatus('Erro de rede ao enviar projeto', true);
    }
  }

  if (form) form.addEventListener('submit', handleSubmit);
})();
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-project-form');
  const msg = document.getElementById('msg');
  if (!form) return;

  function show(text, isError) {
    if (!msg) return;
    msg.textContent = text;
    msg.style.color = isError ? '#dc2626' : '#16a34a';
    setTimeout(() => { msg.textContent = ''; }, 6000);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      title: (form.querySelector('#title').value || '').trim(),
      category: (form.querySelector('#category').value || '').trim(),
      description: (form.querySelector('#description').value || '').trim(),
      image: (form.querySelector('#image').value || '').trim() || null,
      demo: (form.querySelector('#demo').value || '').trim() || null,
      github: (form.querySelector('#github').value || '').trim() || null
    };

    if (!data.title || !data.description) {
      show('Preencha título e descrição.', true);
      return;
    }

    try {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result && result.ok) {
        show('Projeto adicionado com sucesso.');
        form.reset();
      } else {
        show(result && result.error ? result.error : 'Erro ao adicionar projeto', true);
      }
    } catch (err) {
      console.error(err);
      show('Erro de rede. Tente novamente.', true);
    } finally {
      const btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = false;
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-project-form');
  const preview = document.getElementById('preview');
  const msg = document.getElementById('form-msg');
  const previewBtn = document.getElementById('preview-btn');

  function showMessage(text, type='info'){
    msg.textContent = text;
    msg.style.color = type === 'error' ? '#dc2626' : '#16a34a';
  }

  function buildPreview(data){
    return `
      <div class="card">
        <div class="grid grid-2 items-center gap-6">
          <div>
            ${data.image ? `<img src="${data.image}" alt="${data.title}" style="max-width:100%;border-radius:8px;">` : '<div class="placeholder-image" style="width:100%;height:200px;background:#111;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#888">Sem imagem</div>'}
          </div>
          <div>
            <h3 class="text-xl font-semibold">${data.title}</h3>
            <p class="text-gray-300">${data.description}</p>
            <p class="mt-2 text-sm">Tecnologias: ${data.technologies.join(', ')}</p>
            <p class="mt-4"><a href="${data.github || '#'}" target="_blank">Ver no GitHub</a> • <a href="${data.demo || '#'}" target="_blank">Ver Demo</a></p>
          </div>
        </div>
      </div>
    `;
  }

  previewBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const data = {
      title: document.getElementById('title').value.trim(),
      category: document.getElementById('category').value.trim(),
      description: document.getElementById('description').value.trim(),
      image: document.getElementById('image').value.trim(),
      technologies: (document.getElementById('technologies').value || '').split(',').map(t=>t.trim()).filter(Boolean),
      github: document.getElementById('github').value.trim(),
      demo: document.getElementById('demo').value.trim()
    };
    preview.innerHTML = buildPreview(data);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showMessage('Enviando...', 'info');
    const payload = {
      title: document.getElementById('title').value.trim(),
      category: document.getElementById('category').value.trim(),
      description: document.getElementById('description').value.trim(),
      image: document.getElementById('image').value.trim(),
      technologies: (document.getElementById('technologies').value || '').split(',').map(t=>t.trim()).filter(Boolean),
      github: document.getElementById('github').value.trim(),
      demo: document.getElementById('demo').value.trim()
    };

    if (!payload.title || !payload.description) {
      showMessage('Título e descrição são obrigatórios.', 'error');
      return;
    }

    try {
      const res = await fetch('/api/projects', {
        method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json && json.ok) {
        showMessage('Projeto adicionado com sucesso!');
        form.reset();
        preview.innerHTML = '';
      } else {
        showMessage('Erro: ' + (json.error || 'Falha ao adicionar projeto'), 'error');
      }
    } catch (err) {
      console.error(err);
      showMessage('Erro de conexão. Tente novamente mais tarde.', 'error');
    }
  });
});
