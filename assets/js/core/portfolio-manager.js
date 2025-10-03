/**
 * Sistema de Configuração e Gerenciamento de Melhorias
 * Centraliza todas as correções, configurações e funcionalidades
 */

window.PortfolioConfig = {
    // Versão atual das melhorias
    version: '2.1.0',
    
    // Configurações de ambiente
    environment: {
        isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
        enableDebug: true,
        enablePerformanceMetrics: true
    },

    // Configurações de UX
    ux: {
        enableMobileMenu: true,
        enableScrollIndicator: true,
        enableTooltips: true,
        enableKeyboardNavigation: true,
        enableLoadingStates: true,
        enableRippleEffect: true,
        enableImageOptimization: true
    },

    // Configurações visuais
    visual: {
        enableAnimations: true,
        enableTransitions: true,
        enableGlassmorphism: true,
        enableGradients: true,
        animationDuration: 300,
        transitionDelay: 100
    },

    // Configurações de tema
    theme: {
        defaultTheme: 'dark',
        enableThemeToggle: true,
        saveThemePreference: true,
        colors: {
            primary: {
                50: '#eff6ff',
                100: '#dbeafe', 
                200: '#bfdbfe',
                300: '#93c5fd',
                400: '#60a5fa',
                500: '#3b82f6',
                600: '#2563eb',
                700: '#1d4ed8',
                800: '#1e40af',
                900: '#1e3a8a'
            },
            gray: {
                50: '#f9fafb',
                100: '#f3f4f6',
                200: '#e5e7eb', 
                300: '#d1d5db',
                400: '#9ca3af',
                500: '#6b7280',
                600: '#4b5563',
                700: '#374151',
                800: '#1f2937',
                900: '#111827'
            }
        }
    },

    // Configurações de performance
    performance: {
        enableLazyLoading: true,
        enableImageOptimization: true,
        enableCaching: true,
        enablePreloading: true,
        maxImageSize: 2048,
        compressionQuality: 85
    },

    // URLs e caminhos
    paths: {
        base: '/workspaces/portfolio',
        assets: '/workspaces/portfolio/assets',
        images: '/workspaces/portfolio/assets/images',
        css: '/workspaces/portfolio/assets/css',
        js: '/workspaces/portfolio/assets/js',
        pages: '/workspaces/portfolio/pages'
    },

    // Configurações de SEO
    seo: {
        siteName: 'Alessandro Meneses - Portfolio',
        author: 'Alessandro Dos Santos Costa Meneses',
        description: 'Assistente de TI JR especializado em infraestrutura, suporte técnico e análise de dados.',
        keywords: [
            'Alessandro Meneses',
            'Assistente TI',
            'Infraestrutura TI',
            'Suporte Técnico',
            'Windows Server',
            'Linux',
            'Active Directory',
            'Power BI',
            'GTI',
            'FATEC'
        ],
        social: {
            linkedin: 'https://linkedin.com/in/alessandro-meneses-2425ab231',
            github: 'https://github.com/ManoAlee',
            email: 'alessandro.meneses@exemplo.com'
        }
    },

    // Configurações de componentes
    components: {
        portfolioStats: {
            enabled: true,
            animateNumbers: true,
            countDuration: 2000
        },
        testimonialsCarousel: {
            enabled: true,
            autoplay: true,
            interval: 5000,
            showDots: true
        },
        interactiveSkills: {
            enabled: true,
            showLevels: true,
            enableHover: true,
            showProgress: true
        },
        careerTimeline: {
            enabled: true,
            showDates: true,
            enableAnimation: true,
            reverseOrder: false
        },
        enhancedProjects: {
            enabled: true,
            showTags: true,
            enableFiltering: true,
            showGithub: true
        }
    },

    // Configurações de correções CSS
    cssfixes: {
        enableVisualFixes: true,
        enableUXImprovements: true,
        fixColorVariables: true,
        fixLayoutShifts: true,
        fixMobileIssues: true
    },

    // Configurações de analytics
    analytics: {
        enableTracking: false, // Desabilitado por padrão
        trackPageViews: true,
        trackInteractions: true,
        trackErrors: true
    },

    // Mensagens do sistema
    messages: {
        loading: 'Carregando...',
        error: 'Ocorreu um erro. Tente novamente.',
        success: 'Ação realizada com sucesso!',
        noData: 'Nenhum dado encontrado.',
        networkError: 'Erro de conexão. Verifique sua internet.'
    },

    // Breakpoints responsivos
    breakpoints: {
        xs: '475px',
        sm: '640px', 
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
    },

    // Configurações de acessibilidade
    accessibility: {
        enableHighContrast: false,
        enableReducedMotion: false,
        enableScreenReader: true,
        focusRingColor: '#3b82f6',
        fontSize: 'normal' // small, normal, large
    }
};

/**
 * Classe para gerenciar configurações e inicialização
 */
class PortfolioManager {
    constructor(config = {}) {
        this.config = { ...window.PortfolioConfig, ...config };
        this.initialized = false;
        this.components = new Map();
        this.errors = [];
        
        this.init();
    }

    init() {
        if (this.initialized) return;

        console.log('🚀 Inicializando Portfolio Manager v' + this.config.version);
        
        this.setupEnvironment();
        this.loadUserPreferences();
        this.initializeComponents();
        this.setupErrorHandling();
        this.setupPerformanceMonitoring();
        
        this.initialized = true;
        this.dispatchEvent('portfolio:ready');
        
        console.log('✅ Portfolio Manager inicializado com sucesso!');
    }

    setupEnvironment() {
        // Configura variáveis CSS globais
        const root = document.documentElement;
        
        Object.entries(this.config.theme.colors.primary).forEach(([key, value]) => {
            root.style.setProperty(`--primary-${key}`, value);
        });
        
        Object.entries(this.config.theme.colors.gray).forEach(([key, value]) => {
            root.style.setProperty(`--gray-${key}`, value);
        });

        // Configura classes utilitárias
        document.body.classList.add('portfolio-enhanced');
        
        if (this.config.environment.isDevelopment) {
            document.body.classList.add('development-mode');
        }
    }

    loadUserPreferences() {
        try {
            const saved = localStorage.getItem('portfolio-preferences');
            if (saved) {
                const preferences = JSON.parse(saved);
                
                // Aplica tema salvo
                if (preferences.theme) {
                    document.documentElement.setAttribute('data-theme', preferences.theme);
                }
                
                // Aplica configurações de acessibilidade
                if (preferences.accessibility) {
                    Object.assign(this.config.accessibility, preferences.accessibility);
                }
            }
        } catch (error) {
            console.warn('Erro ao carregar preferências do usuário:', error);
        }
    }

    saveUserPreferences() {
        try {
            const preferences = {
                theme: document.documentElement.getAttribute('data-theme'),
                accessibility: this.config.accessibility,
                timestamp: Date.now()
            };
            
            localStorage.setItem('portfolio-preferences', JSON.stringify(preferences));
        } catch (error) {
            console.warn('Erro ao salvar preferências:', error);
        }
    }

    initializeComponents() {
        // Inicializa componentes baseado na configuração
        Object.entries(this.config.components).forEach(([name, config]) => {
            if (config.enabled) {
                this.loadComponent(name, config);
            }
        });
    }

    loadComponent(name, config) {
        try {
            const componentClass = window[this.getComponentClassName(name)];
            if (componentClass) {
                const instance = new componentClass(config);
                this.components.set(name, instance);
                console.log(`✅ Componente ${name} carregado`);
            }
        } catch (error) {
            console.warn(`❌ Erro ao carregar componente ${name}:`, error);
            this.errors.push({ component: name, error: error.message });
        }
    }

    getComponentClassName(name) {
        // Converte nome do componente para nome da classe
        return name.split(/[-_]/).map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join('');
    }

    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            this.logError('JavaScript Error', event.error);
        });

        window.addEventListener('unhandledrejection', (event) => {
            this.logError('Promise Rejection', event.reason);
        });
    }

    logError(type, error) {
        const errorData = {
            type,
            message: error.message || error,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };

        this.errors.push(errorData);
        
        if (this.config.environment.isDevelopment) {
            console.error('Portfolio Error:', errorData);
        }
    }

    setupPerformanceMonitoring() {
        if (!this.config.performance.enablePerformanceMetrics) return;

        // Monitora métricas de performance
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const metrics = this.getPerformanceMetrics();
                    console.log('📊 Métricas de Performance:', metrics);
                }, 1000);
            });
        }
    }

    getPerformanceMetrics() {
        if (!('performance' in window)) return null;

        const navigation = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');

        return {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
            firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
            totalLoadTime: navigation.loadEventEnd - navigation.fetchStart
        };
    }

    dispatchEvent(eventName, data = {}) {
        const event = new CustomEvent(eventName, {
            detail: { ...data, manager: this }
        });
        document.dispatchEvent(event);
    }

    // Métodos públicos para configuração
    updateConfig(path, value) {
        const keys = path.split('.');
        let current = this.config;
        
        for (let i = 0; i < keys.length - 1; i++) {
            if (!(keys[i] in current)) {
                current[keys[i]] = {};
            }
            current = current[keys[i]];
        }
        
        current[keys[keys.length - 1]] = value;
        this.saveUserPreferences();
    }

    getConfig(path) {
        const keys = path.split('.');
        let current = this.config;
        
        for (const key of keys) {
            if (!(key in current)) return undefined;
            current = current[key];
        }
        
        return current;
    }

    getStatus() {
        return {
            version: this.config.version,
            initialized: this.initialized,
            componentsLoaded: Array.from(this.components.keys()),
            errors: this.errors.length,
            performance: this.getPerformanceMetrics()
        };
    }
}

// Inicialização automática
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioManager = new PortfolioManager();
});

// Exporta para uso global
window.PortfolioManager = PortfolioManager;