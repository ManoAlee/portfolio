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
        // More detailed script/resource inspection
        const scriptStatus = [];

        // Helper to inspect script tags and performance entries
        function inspectLib(namePatterns, globalCheck) {
            const foundScriptTags = Array.from(document.scripts).filter(s => s.src && namePatterns.some(p => s.src.toLowerCase().includes(p)));
            const perfEntries = performance && performance.getEntriesByType ? performance.getEntriesByType('resource').filter(e => namePatterns.some(p => e.name.toLowerCase().includes(p))) : [];

            // Determine ok: global present OR a script tag loaded with transferSize > 0
            let ok = !!globalCheck();
            let details = '';

            if (!ok) {
                // check perf entries for evidence of load/failure
                if (perfEntries.length) {
                    const last = perfEntries[perfEntries.length - 1];
                    if (last.transferSize === 0) {
                        details = 'resource failed or blocked';
                    } else if (last.duration > 1000) {
                        details = 'slow resource';
                        ok = true; // consider slow as loaded
                    } else {
                        ok = true;
                    }
                } else if (foundScriptTags.length) {
                    // script tag exists but no perf entry yet — assume pending
                    details = foundScriptTags.map(s => s.src.split('/').slice(-1)[0]).join(', ');
                }
            }

            return { ok, details, scripts: foundScriptTags };
        }

        const chartInspect = inspectLib(['chart.js','chart.umd','chart.min'], () => !!window.Chart);
        const leafletInspect = inspectLib(['leaflet'], () => !!window.L);
        const realTimeInspect = { ok: !!document.getElementById('realTimeChart') && !!window.Chart };

    let html = '<div style="margin-bottom:6px"><strong>Scripts</strong><ul style="margin:6px 0;padding-left:18px">';
    html += `<li style="color:${chartInspect.ok ? '#86efac' : '#fca5a5'}">Chart.js: ${chartInspect.ok ? 'OK' : 'FALHOU'} ${chartInspect.details ? '— ' + escapeHtml(chartInspect.details) : ''}</li>`;
    html += `<li style="color:${leafletInspect.ok ? '#86efac' : '#fca5a5'}">Leaflet: ${leafletInspect.ok ? 'OK' : 'FALHOU'} ${leafletInspect.details ? '— ' + escapeHtml(leafletInspect.details) : ''}</li>`;
    html += `<li style="color:${realTimeInspect.ok ? '#86efac' : '#fca5a5'}">RealTimeChart: ${realTimeInspect.ok ? 'OK' : 'FALHOU'}</li>`;
    html += '</ul></div>';

        html += '<div style="margin-bottom:6px"><strong>Últimos logs</strong>';
        html += '<ul style="margin:6px 0;padding-left:18px">';
        logs.slice().reverse().forEach(l => html += `<li style="color:${l.level==='error' ? '#fca5a5' : l.level==='warn' ? '#fbbf24' : '#cbd5e1'}">[${l.time}] ${l.level.toUpperCase()}: ${escapeHtml(l.msg)}</li>`);
        html += '</ul></div>';

        // Show recent resource issues if available
        if (window.__visualDebugResources && window.__visualDebugResources.length) {
            html += '<div style="margin-bottom:6px"><strong>Recursos com problemas</strong>';
            html += '<ul style="margin:6px 0;padding-left:18px">';
            window.__visualDebugResources.slice().reverse().forEach(r => {
                html += `<li style="color:#fca5a5">${escapeHtml(r.name || r.url)} — ${r.reason || r.detail || ''}</li>`;
            });
            html += '</ul></div>';
        }

        content.innerHTML = html;
    }

    // Periodically refresh status (useful to catch late-loading CDN/scripts)
    try {
        setInterval(render, 1000);
    } catch(e){}

    function escapeHtml(unsafe) {
        return unsafe.replace(/[&<"'`]/g, function(m) { return ({'&':'&amp;','<':'&lt;','"':'&quot;',"'":"&#39;","`":"&#96;"})[m]; });
    }

})();

// PerformanceObserver for resource issues (global capture)
(function(){
    if (typeof PerformanceObserver === 'undefined') return;
    window.__visualDebugResources = window.__visualDebugResources || [];
    try {
        const ro = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                // capture slow or failed-like resources
                if (entry.duration > 500 || entry.transferSize === 0) {
                    window.__visualDebugResources.push({ name: entry.name, duration: entry.duration, transferSize: entry.transferSize });
                    if (window.__visualDebugResources.length > 30) window.__visualDebugResources.shift();
                }
            }
        });
        ro.observe({ type: 'resource', buffered: true });
    } catch(e){}
})();
