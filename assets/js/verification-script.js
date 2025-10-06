/**
 * Script de Verificação Rápida de Correções
 * Testa se todos os componentes foram corrigidos adequadamente
 */

console.log('🔍 Iniciando verificação de correções...');

// Verificar se componentes estão exportados globalmente
const componentsToCheck = [
    'PortfolioStats',
    'TestimonialsCarousel', 
    'InteractiveSkills',
    'CareerTimeline',
    'EnhancedProjects'
];

console.log('📦 Verificando componentes exportados:');
componentsToCheck.forEach(component => {
    if (typeof window[component] === 'function') {
        console.log(`✅ ${component} - OK`);
    } else {
        console.log(`❌ ${component} - Não encontrado`);
    }
});

// Verificar se event listeners passivos funcionam
console.log('🎯 Verificando performance de event listeners:');
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
    
    if (passiveSupported) {
        console.log('✅ Passive listeners - Suportado');
    } else {
        console.log('⚠️ Passive listeners - Não suportado');
    }
} catch (err) {
    console.log('❌ Erro ao verificar passive listeners:', err);
}

// Verificar tema
console.log('🎨 Verificando sistema de tema:');
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    console.log('✅ Botão de tema - Encontrado');
    
    // Testar alternância de tema
    const currentTheme = document.documentElement.getAttribute('data-theme');
    console.log(`🎯 Tema atual: ${currentTheme || 'padrão'}`);
} else {
    console.log('❌ Botão de tema - Não encontrado');
}

// Verificar ícones PWA
console.log('📱 Verificando ícones PWA:');
const iconSizes = ['192', '512'];
iconSizes.forEach(size => {
    const img = new Image();
    img.onload = () => console.log(`✅ Ícone ${size}x${size} - Carregado`);
    img.onerror = () => console.log(`❌ Ícone ${size}x${size} - Erro`);
    img.src = `/assets/images/icon-${size}.png`;
});

// Verificar favicon
const faviconLink = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
if (faviconLink || document.querySelector('link[href="favicon.ico"]')) {
    console.log('✅ Favicon - OK');
} else {
    console.log('⚠️ Favicon - Não detectado no HTML');
}

// Verificar meta tags
console.log('📋 Verificando meta tags:');
const mobileWebApp = document.querySelector('meta[name="mobile-web-app-capable"]');
const appleWebApp = document.querySelector('meta[name="apple-mobile-web-app-capable"]');

if (mobileWebApp) {
    console.log('✅ mobile-web-app-capable - OK');
} else {
    console.log('❌ mobile-web-app-capable - Não encontrado');
}

if (appleWebApp) {
    console.log('✅ apple-mobile-web-app-capable - OK');
} else {
    console.log('❌ apple-mobile-web-app-capable - Não encontrado');
}

// Resumo final
setTimeout(() => {
    console.log('\n🎯 RESUMO DA VERIFICAÇÃO');
    console.log('========================');
    
    const issues = [];
    
    // Verificar problemas conhecidos
    if (typeof window.TestimonialsCarousel === 'undefined') {
        issues.push('TestimonialsCarousel não exportado');
    }
    
    if (!document.getElementById('theme-toggle')) {
        issues.push('Botão de tema não encontrado');
    }
    
    if (!document.querySelector('meta[name="mobile-web-app-capable"]')) {
        issues.push('Meta tag mobile-web-app-capable ausente');
    }
    
    if (issues.length === 0) {
        console.log('✅ Todas as correções aplicadas com sucesso!');
        console.log('🎉 Portfolio está funcionando corretamente!');
    } else {
        console.log(`⚠️ ${issues.length} problema(s) detectado(s):`);
        issues.forEach(issue => console.log(`   - ${issue}`));
    }
    
    console.log('========================');
}, 2000);

// Testar performance
console.log('⚡ Monitorando performance:');
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                const loadTime = Math.round(navigation.loadEventEnd - navigation.fetchStart);
                console.log(`📊 Tempo de carregamento: ${loadTime}ms`);
                
                if (loadTime < 2000) {
                    console.log('✅ Performance excelente!');
                } else if (loadTime < 5000) {
                    console.log('⚠️ Performance aceitável');
                } else {
                    console.log('❌ Performance precisa melhorar');
                }
            }
        }, 1000);
    });
}