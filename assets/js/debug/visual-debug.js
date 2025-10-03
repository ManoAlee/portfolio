// visual-debug.js
// Overlay simples para mostrar o status de scripts e últimos warnings/errors.
(function(){
    if (typeof window === 'undefined') return;

    const overlayId = 'visual-debug-overlay';
    function createOverlay(){
        if (document.getElementById(overlayId)) return;
        const div = document.createElement('div');
        div.id = overlayId;
        div.style.position = 'fixed';
        div.style.right = '12px';
        div.style.bottom = '12px';
        div.style.zIndex = 99999;
        div.style.width = '320px';
        div.style.maxHeight = '40vh';
        div.style.overflow = 'auto';
        div.style.background = 'rgba(17,24,39,0.85)';
        div.style.color = '#fff';
        div.style.fontSize = '12px';
        div.style.borderRadius = '8px';
        div.style.padding = '8px';
        div.style.boxShadow = '0 6px 24px rgba(0,0,0,0.6)';
        div.style.fontFamily = "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial";

        div.innerHTML = `
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                <strong style="font-size:12px">Debug Visual</strong>
                <button id="visual-debug-toggle" style="background:transparent;border:0;color:#9ca3af;cursor:pointer">Fechar</button>
            </div>
            <div id="visual-debug-content">Carregando...</div>
        `;

        document.body.appendChild(div);
        document.getElementById('visual-debug-toggle').addEventListener('click', ()=> div.remove());
    }

    createOverlay();

    const content = document.getElementById('visual-debug-content');
    const logs = [];

    // Capturar console.warn/error
    ['warn','error','info','log'].forEach(level => {
        const original = console[level];
        console[level] = function(...args){
            try{
                const msg = args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ');
                logs.push({level, msg, time: new Date().toLocaleTimeString()});
                if (logs.length > 30) logs.shift();
                render();
            } catch(e){}
            original.apply(console, args);
        };
    });

    function render(){
        if (!content) return;
        const scriptStatus = [
            {name: 'Chart.js', ok: !!window.Chart},
            {name: 'Leaflet', ok: !!window.L},
            {name: 'RealTimeChart', ok: !!document.getElementById('realTimeChart')}
        ];

        let html = '<div style="margin-bottom:6px"><strong>Scripts</strong><ul style="margin:6px 0;padding-left:18px">';
        scriptStatus.forEach(s => html += `<li style="color:${s.ok ? '#86efac' : '#fca5a5'}">${s.name}: ${s.ok ? 'OK' : 'FALHOU'}</li>`);
        html += '</ul></div>';

        html += '<div style="margin-bottom:6px"><strong>Últimos logs</strong>';
        html += '<ul style="margin:6px 0;padding-left:18px">';
        logs.slice().reverse().forEach(l => html += `<li style="color:${l.level==='error' ? '#fca5a5' : l.level==='warn' ? '#fbbf24' : '#cbd5e1'}">[${l.time}] ${l.level.toUpperCase()}: ${escapeHtml(l.msg)}</li>`);
        html += '</ul></div>';

        content.innerHTML = html;
    }

    function escapeHtml(unsafe) {
        return unsafe.replace(/[&<"'`]/g, function(m) { return ({'&':'&amp;','<':'&lt;','"':'&quot;',"'":"&#39;","`":"&#96;"})[m]; });
    }

})();
