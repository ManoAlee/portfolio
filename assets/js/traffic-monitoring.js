// traffic-monitoring.js
// Módulo leve para complementar a página de monitoramento de tráfego.
// Objetivo: evitar erro de "arquivo inexistente" e adicionar pequenas melhorias de UX.

document.addEventListener('DOMContentLoaded', () => {
    // Elementos principais (podem não existir em todas as páginas)
    const fluxoEl = document.getElementById('fluxo-valor');
    const tempoEl = document.getElementById('tempo-valor');
    const reducaoEl = document.getElementById('reducao-valor');

    const setText = (el, value) => { if (el) el.textContent = value; };

    if (window.console && console.info) console.info('[traffic-monitoring] módulo carregado');

    // Botão para pausar/retomar atualização automática (inserido no topo da dashboard quando possível)
    let autoRefresh = true;
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.textContent = 'Pausar Atualização';
    toggleBtn.setAttribute('aria-pressed', 'false');
    toggleBtn.className = 'toggle-refresh hidden px-3 py-1 rounded text-sm bg-gray-800/60 hover:bg-gray-700/60';

    const targetInsert = document.querySelector('.dashboard-container') || document.querySelector('main .info-card');
    if (targetInsert) {
        // inserir como primeiro filho para ficar visível
        targetInsert.parentNode.insertBefore(toggleBtn, targetInsert);
        toggleBtn.classList.remove('hidden');
    }

    toggleBtn.addEventListener('click', () => {
        autoRefresh = !autoRefresh;
        toggleBtn.textContent = autoRefresh ? 'Pausar Atualização' : 'Retomar Atualização';
        toggleBtn.setAttribute('aria-pressed', (!autoRefresh).toString());
    });

    // Garantir que indicadores não fiquem em estado "--" por muito tempo
    setInterval(() => {
        if (!autoRefresh) return;
        if (fluxoEl && fluxoEl.textContent.trim() === '--') setText(fluxoEl, '—');
        if (tempoEl && tempoEl.textContent.trim() === '--') setText(tempoEl, '—');
        if (reducaoEl && reducaoEl.textContent.trim() === '--') setText(reducaoEl, '—');
    }, 2000);

    // Pequena UX: permitir clique nas barras de status para ver detalhes (apenas demonstrativo)
    document.querySelectorAll('.status-bar').forEach(bar => {
        bar.style.cursor = 'pointer';
        bar.addEventListener('click', (e) => {
            const parent = bar.closest('div[id]');
            const name = parent ? parent.querySelector('span')?.textContent || parent.id : 'Via';
            // Usar alert como fallback leve — pode ser substituído por modal
            try {
                alert(`Detalhes da via: ${name}`);
            } catch (err) {
                console.log('[traffic-monitoring] detalhe:', name);
            }
        });
    });

    // Fallback caso o mapa não carregue
    const mapEl = document.getElementById('map');
    if (mapEl && mapEl.children.length === 0) {
        // não interferir se o leaflet construiu o mapa; apenas deixar um hint
        mapEl.setAttribute('aria-busy', 'true');
        setTimeout(() => mapEl.removeAttribute('aria-busy'), 3000);
    }
});
