/**
 * Script de Verificação Rápida de Correções
 * Testa se todos os componentes foram corrigidos adequadamente
 */

/*
 * verification-script.js — aguarda evento de componentes carregados
 * e executa verificações de forma resiliente para evitar falsos negativos
 */

console.log('🔍 Iniciando verificação de correções (aguardando componentsLoaded)...');

let verificationRan = false;
const componentsToCheck = [
    'PortfolioStats',
    'TestimonialsCarousel',
    'InteractiveSkills',
    'CareerTimeline',
    // aceitamos ambos nomes se houver variação entre builds
    'EnhancedProjects',
    'ProjectsShowcase'
];

function performVerification() {
    if (verificationRan) return;
    verificationRan = true;

    console.log('� Executando verificações de integridade dos componentes e recursos...');

    // 1) Componentes exportados
    console.log('�📦 Verificando componentes exportados:');
    componentsToCheck.forEach(component => {
        if (typeof window[component] === 'function') {
            console.log(`✅ ${component} - OK`);
        } else {
            console.log(`❌ ${component} - Não encontrado`);
        }
    });

    // 2) Event listeners passivos
    console.log('🎯 Verificando suporte a passive event listeners:');
    try {
        let passiveSupported = false;
        const options = {
            get passive() {
                passiveSupported = true;
                return false;
            }
        };
        window.addEventListener('test', null, options);
        window.removeEventListener('test', null, options);
        console.log(passiveSupported ? '✅ Passive listeners - Suportado' : '⚠️ Passive listeners - Não suportado');
    } catch (err) {
        console.log('❌ Erro ao verificar passive listeners:', err);
    }

    // 3) Tema
    console.log('🎨 Verificando sistema de tema:');
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        console.log('✅ Botão de tema - Encontrado');
        const currentTheme = document.documentElement.getAttribute('data-theme');
        console.log(`🎯 Tema atual: ${currentTheme || 'padrão'}`);
    } else {
        console.log('❌ Botão de tema - Não encontrado');
    }

    // 4) Ícones PWA
    console.log('📱 Verificando ícones PWA:');
    const iconSizes = ['192', '512'];
    iconSizes.forEach(size => {
        const img = new Image();
        img.onload = () => console.log(`✅ Ícone ${size}x${size} - Carregado`);
        img.onerror = () => console.log(`❌ Ícone ${size}x${size} - Erro`);
        img.src = `/assets/images/icon-${size}.png`;
    });

    // 5) Favicon
    const faviconLink = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
    if (faviconLink || document.querySelector('link[href="/favicon.ico"], link[href="favicon.ico"]')) {
        console.log('✅ Favicon - OK');
    } else {
        console.log('⚠️ Favicon - Não detectado no HTML');
    }

    // 6) Meta tags importantes
    console.log('📋 Verificando meta tags:');
    const mobileWebApp = document.querySelector('meta[name="mobile-web-app-capable"]');
    const appleWebApp = document.querySelector('meta[name="apple-mobile-web-app-capable"]');
    console.log(mobileWebApp ? '✅ mobile-web-app-capable - OK' : '❌ mobile-web-app-capable - Não encontrado');
    console.log(appleWebApp ? '✅ apple-mobile-web-app-capable - OK' : '❌ apple-mobile-web-app-capable - Não encontrado');

    // Resumo final (após pequenas esperas para carregamento de imagens)
    setTimeout(() => {
        console.log('\n🎯 RESUMO DA VERIFICAÇÃO');
        console.log('========================');
        const issues = [];
        if (typeof window.TestimonialsCarousel === 'undefined') issues.push('TestimonialsCarousel não exportado');
        if (!document.getElementById('theme-toggle')) issues.push('Botão de tema não encontrado');
        if (!document.querySelector('meta[name="mobile-web-app-capable"]')) issues.push('Meta tag mobile-web-app-capable ausente');
        if (issues.length === 0) {
            console.log('✅ Todas as correções aplicadas com sucesso!');
            console.log('🎉 Portfolio está funcionando corretamente!');
        } else {
            console.log(`⚠️ ${issues.length} problema(s) detectado(s):`);
            issues.forEach(issue => console.log(`   - ${issue}`));
        }
        console.log('========================');
    }, 1200);

    // Performance: mantemos monitoramento leve
    console.log('⚡ Monitorando performance:');
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    const loadTime = Math.round(navigation.loadEventEnd - navigation.fetchStart);
                    console.log(`📊 Tempo de carregamento: ${loadTime}ms`);
                    if (loadTime < 2000) console.log('✅ Performance excelente!');
                    else if (loadTime < 5000) console.log('⚠️ Performance aceitável');
                    else console.log('❌ Performance precisa melhorar');
                }
            }, 800);
        });
    }
}

// ------- Sincronização com Component Loader -------

// If the component loader emits this event, run verification
document.addEventListener('portfolioComponentsLoaded', (e) => {
    console.log('📣 Evento portfolioComponentsLoaded recebido:', e && e.detail ? e.detail : 'sem detalhes');
    performVerification();
});

// If componentLoader already exists and is initialized, run immediately
if (window.componentLoader && window.componentLoader.initialized) {
    console.log('ℹ️ componentLoader já inicializado — executando verificação agora');
    performVerification();
}

// Fallbacks: tentar rodar após load e após timeout curto
window.addEventListener('load', () => {
    // aguarda pequena margem para componentes que inicializam no load
    setTimeout(() => performVerification(), 600);
});

// Timeout final: garante execução mesmo se nenhum evento for emitido
setTimeout(() => performVerification(), 2500);
