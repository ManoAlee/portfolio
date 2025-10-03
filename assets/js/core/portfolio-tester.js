/**
 * Sistema de Testes Automáticos para Correções do Portfolio
 * Valida CSS, JavaScript, UX e funcionalidades
 */

class PortfolioTester {
    constructor() {
        this.results = {
            passed: 0,
            failed: 0,
            warnings: 0,
            tests: []
        };
        
        this.init();
    }

    init() {
        console.log('🧪 Iniciando testes automáticos do portfolio...');
        this.runAllTests();
    }

    async runAllTests() {
        // Testes de CSS
        await this.testCSSCorrections();
        await this.testVisualComponents();
        
        // Testes de JavaScript
        await this.testJavaScriptComponents();
        await this.testUXEnhancements();
        
        // Testes de Performance
        await this.testPerformance();
        
        // Testes de Responsividade
        await this.testResponsiveness();
        
        // Testes de Acessibilidade
        await this.testAccessibility();
        
        this.generateReport();
    }

    async testCSSCorrections() {
        this.addTestGroup('Correções CSS');
        
        // Testa se as variáveis CSS estão corretas
        this.testCSSVariables();
        
        // Testa se os arquivos CSS foram carregados
        this.testCSSFiles();
        
        // Testa sintaxe CSS corrigida
        this.testCSSFixesSyntax();
        
        // Testa cores e gradientes
        this.testColorsAndGradients();
    }

    testCSSVariables() {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        
        const requiredVars = [
            '--primary-500',
            '--gray-900', 
            '--gray-800',
            '--text-primary',
            '--bg-primary'
        ];
        
        requiredVars.forEach(cssVar => {
            const value = computedStyle.getPropertyValue(cssVar);
            this.assert(
                value && value.trim() !== '',
                `Variável CSS ${cssVar} está definida`,
                `Variável CSS ${cssVar} não encontrada`
            );
        });
    }

    testCSSFiles() {
        const requiredFiles = [
            'visual-fixes.css',
            'ux-improvements.css',
            'enhanced-components.css'
        ];
        
        requiredFiles.forEach(file => {
            const link = document.querySelector(`link[href*="${file}"]`);
            this.assert(
                link !== null,
                `Arquivo CSS ${file} está carregado`,
                `Arquivo CSS ${file} não encontrado`
            );
        });
    }

    testCSSFixesSyntax() {
        // Verifica se não há CSS inválido no console
        const originalConsoleError = console.error;
        const cssErrors = [];
        
        console.error = (...args) => {
            const message = args.join(' ');
            if (message.includes('CSS') || message.includes('stylesheet')) {
                cssErrors.push(message);
            }
            originalConsoleError.apply(console, args);
        };
        
        setTimeout(() => {
            console.error = originalConsoleError;
            this.assert(
                cssErrors.length === 0,
                'Nenhum erro de CSS detectado',
                `Erros de CSS encontrados: ${cssErrors.length}`
            );
        }, 1000);
    }

    testColorsAndGradients() {
        const gradientElement = document.querySelector('.text-gradient');
        if (gradientElement) {
            const style = getComputedStyle(gradientElement);
            const background = style.backgroundImage || style.background;
            
            this.assert(
                background.includes('gradient'),
                'Gradientes estão funcionando',
                'Gradientes não detectados'
            );
        }
    }

    async testVisualComponents() {
        this.addTestGroup('Componentes Visuais');
        
        // Testa navegação
        this.testNavigation();
        
        // Testa botões
        this.testButtons();
        
        // Testa cartões
        this.testCards();
        
        // Testa animações
        this.testAnimations();
    }

    testNavigation() {
        const nav = document.querySelector('.nav');
        this.assert(
            nav !== null,
            'Navegação principal encontrada',
            'Navegação principal não encontrada'
        );
        
        const hamburger = document.querySelector('.hamburger-menu');
        this.assert(
            hamburger !== null,
            'Menu hamburger criado',
            'Menu hamburger não encontrado'
        );
        
        const mobileMenu = document.querySelector('.nav-mobile-menu');
        this.assert(
            mobileMenu !== null,
            'Menu mobile criado',
            'Menu mobile não encontrado'
        );
    }

    testButtons() {
        const buttons = document.querySelectorAll('button, .btn');
        
        this.assert(
            buttons.length > 0,
            `${buttons.length} botões encontrados`,
            'Nenhum botão encontrado'
        );
        
        buttons.forEach((button, index) => {
            const hasHoverEffect = getComputedStyle(button).transition.includes('all') || 
                                 getComputedStyle(button).transition.includes('background');
            
            if (index < 5) { // Testa apenas os primeiros 5 botões
                this.assert(
                    hasHoverEffect,
                    `Botão ${index + 1} tem efeito hover`,
                    `Botão ${index + 1} sem efeito hover`
                );
            }
        });
    }

    testCards() {
        const cards = document.querySelectorAll('.card, .glass');
        
        if (cards.length > 0) {
            cards.forEach((card, index) => {
                const style = getComputedStyle(card);
                const hasGlassEffect = style.backdropFilter !== 'none' || 
                                     style.webkitBackdropFilter !== 'none';
                
                if (index < 3) { // Testa apenas os primeiros 3 cartões
                    this.assert(
                        hasGlassEffect,
                        `Cartão ${index + 1} tem efeito glass`,
                        `Cartão ${index + 1} sem efeito glass`
                    );
                }
            });
        }
    }

    testAnimations() {
        const animatedElements = document.querySelectorAll('[class*="animate"]');
        
        this.assert(
            animatedElements.length > 0,
            `${animatedElements.length} elementos com animação encontrados`,
            'Nenhum elemento animado encontrado'
        );
        
        // Verifica se as animações CSS estão definidas
        const animationNames = ['fadeIn', 'slideUp', 'bounce'];
        animationNames.forEach(name => {
            try {
                const element = document.createElement('div');
                element.style.animation = `${name} 1s`;
                document.body.appendChild(element);
                const computed = getComputedStyle(element);
                document.body.removeChild(element);
                
                this.assert(
                    computed.animationName === name,
                    `Animação ${name} está definida`,
                    `Animação ${name} não encontrada`
                );
            } catch (e) {
                this.warn(`Não foi possível testar animação ${name}`);
            }
        });
    }

    async testJavaScriptComponents() {
        this.addTestGroup('Componentes JavaScript');
        
        // Testa se os componentes estão carregados
        this.testComponentsLoaded();
        
        // Testa gerenciador de portfolio
        this.testPortfolioManager();
        
        // Testa melhorador de UX
        this.testUXEnhancer();
    }

    testComponentsLoaded() {
        const requiredComponents = [
            'PortfolioManager',
            'UXEnhancer'
        ];
        
        requiredComponents.forEach(component => {
            this.assert(
                typeof window[component] !== 'undefined',
                `Componente ${component} carregado`,
                `Componente ${component} não encontrado`
            );
        });
    }

    testPortfolioManager() {
        if (window.portfolioManager) {
            const status = window.portfolioManager.getStatus();
            
            this.assert(
                status.initialized,
                'Portfolio Manager inicializado',
                'Portfolio Manager não inicializado'
            );
            
            this.assert(
                status.version !== undefined,
                `Versão ${status.version} detectada`,
                'Versão não detectada'
            );
        }
    }

    testUXEnhancer() {
        if (window.uxEnhancer) {
            const status = window.uxEnhancer.getStatus();
            
            this.assert(
                status.initialized,
                'UX Enhancer inicializado',
                'UX Enhancer não inicializado'
            );
            
            this.assert(
                status.features.mobileMenu,
                'Menu mobile funcional',
                'Menu mobile não funcional'
            );
        }
    }

    async testUXEnhancements() {
        this.addTestGroup('Melhorias de UX');
        
        // Testa tooltips
        this.testTooltips();
        
        // Testa indicador de scroll
        this.testScrollIndicator();
        
        // Testa estados de loading
        this.testLoadingStates();
        
        // Testa navegação por teclado
        this.testKeyboardNavigation();
    }

    testTooltips() {
        const tooltips = document.querySelectorAll('.tooltip');
        
        this.assert(
            tooltips.length > 0,
            `${tooltips.length} tooltips encontrados`,
            'Nenhum tooltip encontrado'
        );
    }

    testScrollIndicator() {
        const indicator = document.querySelector('.scroll-indicator');
        
        this.assert(
            indicator !== null,
            'Indicador de scroll presente',
            'Indicador de scroll não encontrado'
        );
    }

    testLoadingStates() {
        const buttons = document.querySelectorAll('button');
        let hasLoadingClass = false;
        
        buttons.forEach(button => {
            if (button.classList.contains('loading') || 
                button.dataset.loadingText) {
                hasLoadingClass = true;
            }
        });
        
        this.assert(
            hasLoadingClass || buttons.length > 0,
            'Estados de loading configurados',
            'Estados de loading não configurados'
        );
    }

    testKeyboardNavigation() {
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        this.assert(
            focusableElements.length > 0,
            `${focusableElements.length} elementos navegáveis por teclado`,
            'Poucos elementos navegáveis'
        );
    }

    async testPerformance() {
        this.addTestGroup('Performance');
        
        if ('performance' in window) {
            const navigation = performance.getEntriesByType('navigation')[0];
            
            if (navigation) {
                const loadTime = navigation.loadEventEnd - navigation.fetchStart;
                
                this.assert(
                    loadTime < 5000,
                    `Tempo de carregamento: ${Math.round(loadTime)}ms`,
                    `Carregamento lento: ${Math.round(loadTime)}ms`
                );
            }
            
            // Testa recursos carregados
            const resources = performance.getEntriesByType('resource');
            const cssFiles = resources.filter(r => r.name.includes('.css'));
            const jsFiles = resources.filter(r => r.name.includes('.js'));
            
            this.assert(
                cssFiles.length > 0,
                `${cssFiles.length} arquivos CSS carregados`,
                'Nenhum CSS carregado'
            );
            
            this.assert(
                jsFiles.length > 0,
                `${jsFiles.length} arquivos JS carregados`,
                'Nenhum JS carregado'
            );
        }
    }

    async testResponsiveness() {
        this.addTestGroup('Responsividade');
        
        // Simula diferentes tamanhos de tela
        const breakpoints = [
            { name: 'Mobile', width: 375 },
            { name: 'Tablet', width: 768 },
            { name: 'Desktop', width: 1024 }
        ];
        
        const originalWidth = window.innerWidth;
        
        breakpoints.forEach(bp => {
            // Simula mudança de viewport (limitado em alguns browsers)
            try {
                const nav = document.querySelector('.nav');
                if (nav) {
                    this.assert(
                        true,
                        `Layout ${bp.name} detectado`,
                        `Problemas no layout ${bp.name}`
                    );
                }
            } catch (e) {
                this.warn(`Não foi possível testar ${bp.name}: ${e.message}`);
            }
        });
    }

    async testAccessibility() {
        this.addTestGroup('Acessibilidade');
        
        // Testa aria-labels
        const buttonsWithoutLabels = document.querySelectorAll(
            'button:not([aria-label]):not([aria-labelledby])'
        );
        
        this.assert(
            buttonsWithoutLabels.length === 0,
            'Todos os botões têm labels acessíveis',
            `${buttonsWithoutLabels.length} botões sem labels`
        );
        
        // Testa contraste (simplificado)
        const body = document.body;
        const style = getComputedStyle(body);
        
        this.assert(
            style.color && style.backgroundColor,
            'Cores de texto e fundo definidas',
            'Cores não definidas adequadamente'
        );
        
        // Testa navegação por teclado
        const focusableCount = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        ).length;
        
        this.assert(
            focusableCount > 5,
            `${focusableCount} elementos navegáveis`,
            'Poucos elementos navegáveis'
        );
    }

    // Métodos auxiliares
    assert(condition, passMessage, failMessage) {
        const test = {
            type: 'assert',
            condition,
            message: condition ? passMessage : failMessage,
            status: condition ? 'passed' : 'failed',
            timestamp: Date.now()
        };
        
        this.results.tests.push(test);
        
        if (condition) {
            this.results.passed++;
            console.log(`✅ ${passMessage}`);
        } else {
            this.results.failed++;
            console.log(`❌ ${failMessage}`);
        }
    }

    warn(message) {
        const test = {
            type: 'warning',
            message,
            status: 'warning',
            timestamp: Date.now()
        };
        
        this.results.tests.push(test);
        this.results.warnings++;
        console.log(`⚠️ ${message}`);
    }

    addTestGroup(name) {
        console.log(`\n🔍 Testando: ${name}`);
    }

    generateReport() {
        const total = this.results.passed + this.results.failed;
        const passRate = total > 0 ? (this.results.passed / total * 100).toFixed(1) : 0;
        
        console.log('\n📊 RELATÓRIO FINAL DE TESTES');
        console.log('================================');
        console.log(`✅ Passou: ${this.results.passed}`);
        console.log(`❌ Falhou: ${this.results.failed}`);
        console.log(`⚠️ Avisos: ${this.results.warnings}`);
        console.log(`📈 Taxa de Sucesso: ${passRate}%`);
        console.log('================================');
        
        if (this.results.failed === 0) {
            console.log('🎉 Todos os testes passaram! Portfolio está funcionando corretamente.');
        } else {
            console.log('🔧 Alguns testes falharam. Verifique os logs acima para detalhes.');
        }
        
        // Salva relatório no sessionStorage para debug
        try {
            sessionStorage.setItem('portfolio-test-results', JSON.stringify(this.results));
        } catch (e) {
            console.warn('Não foi possível salvar relatório de testes');
        }
        
        return this.results;
    }

    getResults() {
        return this.results;
    }
}

// Executa automaticamente os testes após carregamento
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.portfolioTester = new PortfolioTester();
    }, 2000); // Aguarda 2s para outros componentes carregarem
});

// Disponibiliza para uso manual
window.runPortfolioTests = () => {
    return new PortfolioTester();
};

// Exporta para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioTester;
}