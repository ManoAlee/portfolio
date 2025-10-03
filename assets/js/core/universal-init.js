/**
 * Sistema de Inicialização Universal do Portfolio
 * Garante que todas as funcionalidades funcionem independentemente da página
 */

class PortfolioInitializer {
    constructor() {
        this.isInitialized = false;
        this.components = new Set();
        this.errors = [];
        this.pageType = this.detectPageType();
        
        console.log(`🚀 Inicializando ${this.pageType}...`);
    }

    /**
     * Detecta o tipo da página atual
     */
    detectPageType() {
        const path = window.location.pathname;
        
        if (path.includes('index.html') || path === '/' || path.endsWith('/portfolio/')) {
            return 'home';
        } else if (path.includes('about')) {
            return 'about';
        } else if (path.includes('experience')) {
            return 'experience';
        } else if (path.includes('skills')) {
            return 'skills';
        } else if (path.includes('projects')) {
            return 'projects';
        } else if (path.includes('calculadora-roi')) {
            return 'calculadora-roi';
        } else if (path.includes('analise-tempo-real')) {
            return 'analise-tempo-real';
        } else if (path.includes('dashboard')) {
            return 'dashboard';
        } else if (path.includes('automacao-python')) {
            return 'automacao-python';
        } else if (path.includes('infraestrutura-corporativa')) {
            return 'infraestrutura-corporativa';
        }
        
        return 'generic';
    }

    /**
     * Inicializa todos os componentes necessários
     */
    async init() {
        if (this.isInitialized) return;
        
        try {
            console.log('🔧 Iniciando componentes essenciais...');
            
            // Componentes essenciais (sempre carregados)
            await this.initEssentials();
            
            // Componentes específicos da página
            await this.initPageSpecific();
            
            // Componentes interativos (se existirem)
            await this.initInteractiveComponents();
            
            // Footer universal
            await this.initFooter();
            
            // Finalização
            this.isInitialized = true;
            console.log('✅ Portfolio inicializado com sucesso!');
            
            this.emitReadyEvent();
            
        } catch (error) {
            console.error('❌ Erro na inicialização:', error);
            this.handleInitError(error);
        }
    }

    /**
     * Inicializa componentes essenciais
     */
    async initEssentials() {
        // Theme Manager (sempre necessário)
        if (typeof ThemeManager !== 'undefined') {
            try {
                window.themeManager = new ThemeManager();
                this.components.add('ThemeManager');
                console.log('✅ Theme Manager inicializado');
            } catch (error) {
                console.warn('⚠️ Fallback para tema básico');
                this.initBasicTheme();
            }
        } else {
            this.initBasicTheme();
        }

        // Navigation Manager
        if (typeof NavigationManager !== 'undefined') {
            try {
                window.navigationManager = new NavigationManager();
                this.components.add('NavigationManager');
                console.log('✅ Navigation Manager inicializado');
            } catch (error) {
                console.warn('⚠️ Fallback para navegação básica');
                this.initBasicNavigation();
            }
        } else {
            this.initBasicNavigation();
        }
    }

    /**
     * Inicializa componentes específicos da página
     */
    async initPageSpecific() {
        switch (this.pageType) {
            case 'home':
                await this.initHomePage();
                break;
            case 'calculadora-roi':
                await this.initCalculadoraROI();
                break;
            case 'analise-tempo-real':
                await this.initAnaliseTempoReal();
                break;
            case 'dashboard':
                await this.initDashboard();
                break;
            default:
                console.log(`📄 Página ${this.pageType} - carregamento padrão`);
        }
    }

    /**
     * Inicializa componentes interativos (novos componentes do portfolio)
     */
    async initInteractiveComponents() {
        const componentsToLoad = [
            'PortfolioStats',
            'TestimonialsCarousel',
            'InteractiveSkills',
            'CareerTimeline',
            'ProjectsShowcase'
        ];

        for (const componentName of componentsToLoad) {
            if (typeof window[componentName] === 'function') {
                try {
                    const component = new window[componentName]();
                    if (component.init) {
                        await component.init();
                    }
                    this.components.add(componentName);
                    console.log(`✅ ${componentName} inicializado`);
                } catch (error) {
                    console.warn(`⚠️ Falha ao carregar ${componentName}:`, error.message);
                }
            }
        }
    }

    /**
     * Inicializa página inicial
     */
    async initHomePage() {
        console.log('🏠 Inicializando página inicial...');
        
        // Animações específicas da home
        this.initHomeAnimations();
        
        // Smooth scroll para âncoras
        this.initSmoothScroll();
    }

    /**
     * Inicializa calculadora ROI
     */
    async initCalculadoraROI() {
        console.log('💰 Inicializando Calculadora ROI...');
        
        // Aguarda DOM carregar
        if (document.readyState === 'loading') {
            await new Promise(resolve => {
                document.addEventListener('DOMContentLoaded', resolve);
            });
        }

        // Verifica se a função global existe
        if (typeof window.calcularROI === 'function') {
            console.log('✅ Função calcularROI disponível');
        } else {
            console.warn('⚠️ Função calcularROI não encontrada - carregando fallback');
            this.loadROIFallback();
        }

        // Inicializa benchmarks se a função existir
        if (typeof window.atualizarBenchmarks === 'function') {
            try {
                window.atualizarBenchmarks();
            } catch (error) {
                console.warn('⚠️ Erro ao atualizar benchmarks:', error);
            }
        }
    }

    /**
     * Inicializa análise de tempo real
     */
    async initAnaliseTempoReal() {
        console.log('📊 Inicializando Análise Tempo Real...');
        // Implementação específica se necessário
    }

    /**
     * Inicializa dashboard
     */
    async initDashboard() {
        console.log('📈 Inicializando Dashboard...');
        // Implementação específica se necessário
    }

    /**
     * Inicializa footer universal
     */
    async initFooter() {
        const footerElement = document.getElementById('footer') || document.querySelector('footer');
        
        if (footerElement && !footerElement.innerHTML.trim()) {
            try {
                // Tenta carregar footer dinâmico
                if (typeof loadFooter === 'function') {
                    await loadFooter();
                } else {
                    // Fallback para footer estático
                    this.loadStaticFooter(footerElement);
                }
            } catch (error) {
                console.warn('⚠️ Erro ao carregar footer, usando fallback');
                this.loadStaticFooter(footerElement);
            }
        }
    }

    /**
     * Carrega footer estático como fallback
     */
    loadStaticFooter(element) {
        element.innerHTML = `
            <div class="container py-8">
                <div class="text-center">
                    <p class="text-gray-400">
                        © 2024 Alessandro Meneses. Todos os direitos reservados.
                    </p>
                    <div class="flex justify-center gap-4 mt-4">
                        <a href="https://linkedin.com/in/alessandro-meneses-2425ab231" target="_blank" 
                           class="text-gray-400 hover:text-white transition-colors">
                            <i class="fab fa-linkedin"></i> LinkedIn
                        </a>
                        <a href="https://github.com/ManoAlee" target="_blank" 
                           class="text-gray-400 hover:text-white transition-colors">
                            <i class="fab fa-github"></i> GitHub
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Fallback para tema básico
     */
    initBasicTheme() {
        console.log('🎨 Inicializando tema básico...');
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const root = document.documentElement;
                const currentTheme = root.getAttribute('data-theme') || 'dark';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                root.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });
        }
        
        // Aplicar tema salvo
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    /**
     * Fallback para navegação básica
     */
    initBasicNavigation() {
        console.log('🧭 Inicializando navegação básica...');
        
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Menu mobile básico
        const menuButton = document.querySelector('.nav-toggle, .menu-button');
        const navMenu = document.querySelector('.nav-menu, .nav-links');
        
        if (menuButton && navMenu) {
            menuButton.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
    }

    /**
     * Inicializa animações da home
     */
    initHomeAnimations() {
        // Intersection Observer para animações
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.animate-fade-in-up, .card, .animate-fade-in').forEach(el => {
                observer.observe(el);
            });
        }
    }

    /**
     * Inicializa smooth scroll
     */
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Carrega fallback para ROI
     */
    loadROIFallback() {
        window.calcularROI = function() {
            const investimento = parseFloat(document.getElementById('investimento')?.value) || 0;
            const retorno = parseFloat(document.getElementById('retorno')?.value) || 0;
            const periodo = parseFloat(document.getElementById('periodo')?.value) || 1;
            
            if (investimento <= 0 || retorno <= 0 || periodo <= 0) {
                alert('Por favor, preencha todos os campos com valores válidos.');
                return;
            }
            
            const roi = ((retorno - investimento) / investimento) * 100;
            const roiAnual = Math.pow(retorno / investimento, 1 / periodo) - 1;
            
            const resultDiv = document.getElementById('resultado-roi');
            if (resultDiv) {
                resultDiv.innerHTML = `
                    <h3 class="text-xl font-semibold mb-4">Resultado da Análise</h3>
                    <div class="space-y-4">
                        <div>
                            <p class="text-sm text-gray-400">ROI Total</p>
                            <p class="text-2xl font-bold text-green-400">${roi.toFixed(2)}%</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-400">ROI Anualizado</p>
                            <p class="text-2xl font-bold text-blue-400">${(roiAnual * 100).toFixed(2)}%</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-400">Lucro</p>
                            <p class="text-2xl font-bold text-purple-400">R$ ${(retorno - investimento).toLocaleString('pt-BR')}</p>
                        </div>
                    </div>
                `;
            }
        };
        
        console.log('✅ ROI Fallback carregado');
    }

    /**
     * Trata erro de inicialização
     */
    handleInitError(error) {
        this.errors.push(error);
        
        // Aplica funcionalidades mínimas
        this.initBasicTheme();
        this.initBasicNavigation();
        
        console.warn('⚠️ Modo de emergência ativado - funcionalidades básicas disponíveis');
    }

    /**
     * Emite evento quando está pronto
     */
    emitReadyEvent() {
        const event = new CustomEvent('portfolioReady', {
            detail: {
                pageType: this.pageType,
                components: Array.from(this.components),
                errors: this.errors
            }
        });
        
        document.dispatchEvent(event);
    }

    /**
     * Obtém relatório de status
     */
    getStatus() {
        return {
            initialized: this.isInitialized,
            pageType: this.pageType,
            components: Array.from(this.components),
            errors: this.errors
        };
    }
}

// Auto-inicialização
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const initializer = new PortfolioInitializer();
        initializer.init();
        
        // Disponibiliza globalmente para debug
        window.portfolioInitializer = initializer;
    });
} else {
    const initializer = new PortfolioInitializer();
    initializer.init();
    window.portfolioInitializer = initializer;
}

// Exporta para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioInitializer;
}