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
                        © 2025 Alessandro Meneses. Todos os direitos reservados.
                    </p>
                    <div class="flex justify-center gap-4 mt-4">
                        <a href="https://www.linkedin.com/in/alessandro-meneses" target="_blank" rel="noopener noreferrer" 
                           class="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                            <svg class="icon icon-linkedin" role="img" aria-label="LinkedIn" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.024-3.036-1.852-3.036-1.853 0-2.136 1.446-2.136 2.941v5.664H8.945V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.368-1.852 3.602 0 4.267 2.37 4.267 5.457v6.286zM5.337 7.433c-1.144 0-2.07-.927-2.07-2.07 0-1.144.926-2.07 2.07-2.07 1.144 0 2.07.926 2.07 2.07 0 1.143-.926 2.07-2.07 2.07zM6.784 20.452H3.889V9h2.895v11.452z"/>
                            </svg>
                        </a>
                        <a href="https://github.com/ManoAlee" target="_blank" rel="noopener noreferrer" 
                           class="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                            <svg class="icon icon-github" role="img" aria-label="GitHub" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.42-1.305.763-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.839 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.372.81 1.102.81 2.222 0 1.606-.015 2.902-.015 3.293 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z"/>
                            </svg>
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
                // Ensure tooltip/title is present for accessibility
                try { themeToggle.setAttribute('title', 'Alterar tema'); } catch (e) {}
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

/**
 * Substitui elementos <i class="fa-..."> por SVGs inline para maior compatibilidade.
 * Executado no carregamento do DOM para cobrir ícones estáticos em HTML.
 */
function replaceFaIcons() {
    const icons = {
        'fa-sun': `<svg class="icon" role="img" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6.76 4.84l-1.8-1.79L3.17 4.84 4.97 6.63 6.76 4.84zM1 13h3v-2H1v2zm10 9h2v-3h-2v3zm9-9v-2h-3v2h3zM6.76 19.16l-1.79 1.79 1.41 1.41 1.79-1.79-1.41-1.41zM19.24 4.84l1.79-1.79L20.62 1.64l-1.79 1.79 1.41 1.41zM17.24 19.16l1.41 1.41 1.79-1.79-1.41-1.41-1.79 1.79zM12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>`,
        'fa-moon': `<svg class="icon" role="img" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`,
        'fa-server': `<svg class="icon" role="img" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 5h18v4H3zM3 11h18v4H3zM3 17h18v4H3z"/></svg>`,
        'fa-headset': `<svg class="icon" role="img" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 1a9 9 0 00-9 9v4a4 4 0 004 4h1v-6H7v-2a5 5 0 0110 0v2h-1v6h1a4 4 0 004-4v-4a9 9 0 00-9-9z"/></svg>`,
        'fa-chart-line': `<svg class="icon" role="img" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 17l6-6 4 4 8-8v10H3z"/></svg>`,
        'fa-arrow-right': `<svg class="icon" role="img" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10 17l5-5-5-5v10z"/></svg>`,
        'fa-image': `<svg class="icon" role="img" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14l4-4 3 3 5-5 6 6z"/></svg>`,
        'fa-university': `<svg class="icon" role="img" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L1 7l11 5 9-4.09V20h2V7L12 2zM11 12V9l-7-3 7 3z"/></svg>`,
        'fa-network-wired': `<svg class="icon" role="img" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16 11v-2h-2V7h-4v2H6v2h2v2H6v2h2v2h8v-2h-2v-2h2v-2h-2v-2h2z"/></svg>`,
        'fa-clipboard-check': `<svg class="icon" role="img" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9 11l2 2 4-4 1.5 1.5L11 16l-3-3L9 11zM17 3h-3.18A3 3 0 0012 2a3 3 0 00-1.82 1H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2z"/></svg>`,
        'fa-box': `<svg class="icon" role="img" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21 16V8l-9-5-9 5v8l9 5 9-5zM12 3.3L19 7v2l-7-3.4V3.3z"/></svg>`,
        'fa-graduation-cap': `<svg class="icon" role="img" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zM11 12v5h2v-5l-1 0z"/></svg>`,
        'fa-certificate': `<svg class="icon" role="img" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20 12l-8 6-8-6 8-6 8 6zM12 2v8l6 4-6 4v8l-6-4V8l6-6z"/></svg>`,
        'fa-calculator': `<svg class="icon" role="img" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7 3h10v18H7V3zm2 2v4h6V5H9zM9 11h2v2H9v-2zm4 0h2v2h-2v-2zM9 15h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>`,
        'fa-check-circle': `<svg class="icon" role="img" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm-1 15l-5-5 1.41-1.41L11 14.17l6.59-6.59L19 9z"/></svg>`,
        'default': `<svg class="icon" role="img" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/></svg>`
    };

    document.querySelectorAll('i[class*="fa-"]').forEach(i => {
        try {
            const classes = (i.className || '').split(/\s+/);
            const token = classes.find(c => c.startsWith('fa-')) || null;
            const svg = icons[token] || icons['default'];

            // preserve some accessibility attributes
            const wrapper = document.createElement('span');
            wrapper.className = (i.className || '').replace(/fa[a-z]?-\S+/g, '').trim();
            if (i.getAttribute('aria-hidden') !== null) wrapper.setAttribute('aria-hidden', i.getAttribute('aria-hidden'));
            if (i.getAttribute('aria-label')) wrapper.setAttribute('aria-label', i.getAttribute('aria-label'));
            wrapper.innerHTML = svg;
            i.replaceWith(wrapper);
        } catch (e) {
            // no-op on replace errors
            console.warn('replaceFaIcons error:', e);
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceFaIcons);
} else {
    replaceFaIcons();
}