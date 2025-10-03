/**
 * Sistema de Teste e Validação de Funcionalidades
 * Verifica se todos os botões, links e componentes estão funcionando
 */

class PortfolioTester {
    constructor() {
        this.tests = [];
        this.results = [];
        this.errors = [];
        
        console.log('🧪 Sistema de Testes Iniciado');
    }

    /**
     * Executa todos os testes
     */
    async runAllTests() {
        console.log('🔍 Executando testes de funcionalidade...');
        
        // Testes básicos de DOM
        this.testBasicDOM();
        
        // Testes de navegação
        this.testNavigation();
        
        // Testes de botões
        this.testButtons();
        
        // Testes de formulários
        this.testForms();
        
        // Testes de componentes interativos
        this.testInteractiveComponents();
        
        // Testes de responsividade
        this.testResponsiveness();
        
        // Testes de performance
        this.testPerformance();
        
        // Relatório final
        this.generateReport();
    }

    /**
     * Testa elementos básicos do DOM
     */
    testBasicDOM() {
        console.log('🔧 Testando DOM...');
        
        // Verifica se elementos essenciais existem
        const essentialElements = [
            { selector: 'nav', name: 'Navegação Principal' },
            { selector: 'main', name: 'Conteúdo Principal' },
            { selector: 'footer', name: 'Rodapé' },
            { selector: '#theme-toggle', name: 'Botão de Tema' }
        ];
        
        essentialElements.forEach(element => {
            const el = document.querySelector(element.selector);
            if (el) {
                this.addResult('✅', `${element.name} encontrado`);
            } else {
                this.addResult('⚠️', `${element.name} não encontrado`);
            }
        });
    }

    /**
     * Testa links de navegação
     */
    testNavigation() {
        console.log('🧭 Testando navegação...');
        
        const links = document.querySelectorAll('a[href]');
        let validLinks = 0;
        let invalidLinks = 0;
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Verifica se é um link válido
            if (href && href !== '#' && href !== '') {
                validLinks++;
                
                // Testa se é um link interno
                if (href.startsWith('#')) {
                    const target = document.querySelector(href);
                    if (!target) {
                        this.addResult('⚠️', `Link interno quebrado: ${href}`);
                        invalidLinks++;
                    }
                }
                
                // Testa se é um arquivo local
                if (href.endsWith('.html') && !href.startsWith('http')) {
                    // Apenas avisa sobre links locais
                    this.addResult('ℹ️', `Link local detectado: ${href}`);
                }
            } else {
                invalidLinks++;
                this.addResult('❌', `Link inválido encontrado: ${href || 'href vazio'}`);
            }
        });
        
        this.addResult('📊', `Links válidos: ${validLinks}, Inválidos: ${invalidLinks}`);
    }

    /**
     * Testa funcionalidade dos botões
     */
    testButtons() {
        console.log('🔘 Testando botões...');
        
        const buttons = document.querySelectorAll('button, .btn, [role="button"]');
        let workingButtons = 0;
        let brokenButtons = 0;
        
        buttons.forEach((button, index) => {
            // Verifica se tem evento onclick
            if (button.onclick || button.getAttribute('onclick')) {
                workingButtons++;
                this.addResult('✅', `Botão ${index + 1}: Tem função onclick`);
            } else {
                // Verifica se tem event listeners
                const hasEventListener = this.hasEventListeners(button);
                if (hasEventListener) {
                    workingButtons++;
                    this.addResult('✅', `Botão ${index + 1}: Tem event listeners`);
                } else {
                    // Verifica se é um link
                    if (button.closest('a') || button.getAttribute('href')) {
                        workingButtons++;
                        this.addResult('✅', `Botão ${index + 1}: É um link`);
                    } else {
                        brokenButtons++;
                        this.addResult('❌', `Botão ${index + 1}: Sem funcionalidade detectada`);
                    }
                }
            }
        });
        
        this.addResult('📊', `Botões funcionais: ${workingButtons}, Quebrados: ${brokenButtons}`);
    }

    /**
     * Testa formulários e campos de entrada
     */
    testForms() {
        console.log('📝 Testando formulários...');
        
        const forms = document.querySelectorAll('form');
        const inputs = document.querySelectorAll('input, textarea, select');
        
        if (forms.length > 0) {
            forms.forEach((form, index) => {
                if (form.onsubmit || this.hasEventListeners(form)) {
                    this.addResult('✅', `Formulário ${index + 1}: Tem handler de submit`);
                } else {
                    this.addResult('⚠️', `Formulário ${index + 1}: Sem handler de submit`);
                }
            });
        }
        
        if (inputs.length > 0) {
            let validInputs = 0;
            inputs.forEach(input => {
                if (input.type && input.name || input.id) {
                    validInputs++;
                }
            });
            
            this.addResult('📊', `Campos de entrada válidos: ${validInputs}/${inputs.length}`);
        } else {
            this.addResult('ℹ️', 'Nenhum formulário encontrado na página');
        }
    }

    /**
     * Testa componentes interativos
     */
    testInteractiveComponents() {
        console.log('🎮 Testando componentes interativos...');
        
        const components = [
            'PortfolioStats',
            'TestimonialsCarousel',
            'InteractiveSkills',
            'CareerTimeline',
            'ProjectsShowcase'
        ];
        
        components.forEach(componentName => {
            if (typeof window[componentName] === 'function') {
                this.addResult('✅', `${componentName}: Classe disponível`);
                
                // Verifica se o container existe
                const containerId = componentName.replace(/([A-Z])/g, '-$1').toLowerCase().slice(1);
                const container = document.getElementById(containerId) || 
                                document.getElementById(componentName.toLowerCase());
                
                if (container) {
                    this.addResult('✅', `${componentName}: Container encontrado`);
                } else {
                    this.addResult('⚠️', `${componentName}: Container não encontrado`);
                }
            } else {
                this.addResult('ℹ️', `${componentName}: Não disponível nesta página`);
            }
        });
    }

    /**
     * Testa responsividade básica
     */
    testResponsiveness() {
        console.log('📱 Testando responsividade...');
        
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            this.addResult('✅', 'Meta viewport configurado');
        } else {
            this.addResult('❌', 'Meta viewport não encontrado');
        }
        
        // Verifica classes responsivas
        const responsiveElements = document.querySelectorAll('[class*="sm:"], [class*="md:"], [class*="lg:"]');
        if (responsiveElements.length > 0) {
            this.addResult('✅', `Classes responsivas encontradas: ${responsiveElements.length}`);
        } else {
            this.addResult('⚠️', 'Nenhuma classe responsiva detectada');
        }
    }

    /**
     * Testa performance básica
     */
    testPerformance() {
        console.log('⚡ Testando performance...');
        
        // Verifica carregamento de imagens
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        let brokenImages = 0;
        
        images.forEach(img => {
            if (img.complete && img.naturalWidth > 0) {
                loadedImages++;
            } else {
                img.addEventListener('error', () => {
                    brokenImages++;
                });
                img.addEventListener('load', () => {
                    loadedImages++;
                });
            }
        });
        
        this.addResult('📊', `Imagens: ${loadedImages} carregadas, ${brokenImages} com erro`);
        
        // Verifica performance da página
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            if (loadTime > 0) {
                const status = loadTime < 3000 ? '✅' : loadTime < 5000 ? '⚠️' : '❌';
                this.addResult(status, `Tempo de carregamento: ${loadTime}ms`);
            }
        }
    }

    /**
     * Verifica se um elemento tem event listeners
     */
    hasEventListeners(element) {
        // Este é um método simplificado - em produção seria mais complexo
        const events = ['click', 'submit', 'change', 'input', 'keyup'];
        
        for (const event of events) {
            // Tenta detectar se há listeners (método limitado)
            if (element[`on${event}`]) {
                return true;
            }
        }
        
        // Verifica atributos de evento
        const eventAttributes = element.getAttributeNames().filter(attr => 
            attr.startsWith('on') || attr.includes('click') || attr.includes('submit')
        );
        
        return eventAttributes.length > 0;
    }

    /**
     * Adiciona resultado do teste
     */
    addResult(status, message) {
        const result = { status, message, timestamp: new Date().toLocaleTimeString() };
        this.results.push(result);
        console.log(`${status} ${message}`);
    }

    /**
     * Gera relatório final
     */
    generateReport() {
        console.log('\n📋 RELATÓRIO DE TESTES');
        console.log('========================');
        
        const passed = this.results.filter(r => r.status === '✅').length;
        const warnings = this.results.filter(r => r.status === '⚠️').length;
        const errors = this.results.filter(r => r.status === '❌').length;
        const info = this.results.filter(r => r.status === 'ℹ️').length;
        
        console.log(`✅ Passou: ${passed}`);
        console.log(`⚠️ Avisos: ${warnings}`);
        console.log(`❌ Erros: ${errors}`);
        console.log(`ℹ️ Informações: ${info}`);
        
        const score = Math.round((passed / (passed + warnings + errors)) * 100);
        console.log(`\n🎯 Pontuação: ${score}%`);
        
        if (score >= 90) {
            console.log('🏆 Excelente! Portfolio funcionando perfeitamente.');
        } else if (score >= 70) {
            console.log('👍 Bom! Algumas melhorias podem ser feitas.');
        } else {
            console.log('⚡ Atenção! Vários problemas detectados que precisam ser corrigidos.');
        }
        
        return {
            passed,
            warnings,
            errors,
            info,
            score,
            results: this.results
        };
    }

    /**
     * Teste rápido para desenvolvimento
     */
    quickTest() {
        console.log('⚡ Teste Rápido');
        
        // Verifica se JavaScript básico funciona
        this.addResult('✅', 'JavaScript funcionando');
        
        // Verifica elementos essenciais
        const nav = document.querySelector('nav');
        const main = document.querySelector('main');
        
        if (nav && main) {
            this.addResult('✅', 'Estrutura básica OK');
        } else {
            this.addResult('❌', 'Estrutura básica com problemas');
        }
        
        // Verifica links quebrados óbvios
        const links = document.querySelectorAll('a[href="#"], a[href=""]');
        if (links.length > 0) {
            this.addResult('⚠️', `${links.length} links vazios encontrados`);
        }
        
        console.log('✅ Teste rápido concluído');
        return this.results;
    }
}

// Auto-execução em modo debug
if (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')) {
    document.addEventListener('DOMContentLoaded', () => {
        const tester = new PortfolioTester();
        
        // Aguarda um pouco para garantir que tudo carregou
        setTimeout(() => {
            tester.runAllTests();
            
            // Disponibiliza globalmente para debug
            window.portfolioTester = tester;
            console.log('💡 Para executar testes: window.portfolioTester.runAllTests()');
        }, 2000);
    });
}

// Exporta para uso global
window.PortfolioTester = PortfolioTester;