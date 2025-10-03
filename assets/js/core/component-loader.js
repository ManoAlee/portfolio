/**
 * Sistema de Carregamento e Inicialização de Componentes
 * Gerencia o carregamento e inicialização dos novos componentes do portfolio
 */

class ComponentLoader {
    constructor() {
        this.components = new Map();
        this.initialized = false;
        this.loadOrder = [
            'PortfolioStats',
            'TestimonialsCarousel', 
            'InteractiveSkills',
            'CareerTimeline',
            'ProjectsShowcase'
        ];
        
        this.observers = {
            intersection: null,
            performance: null
        };
    }

    /**
     * Inicializa o sistema de carregamento de componentes
     */
    init() {
        if (this.initialized) return;
        
        this.setupPerformanceMonitoring();
        this.setupIntersectionObserver();
        this.loadComponents();
        
        this.initialized = true;
        console.info('🚀 Component Loader initialized successfully');
    }

    /**
     * Configura o monitoramento de performance
     */
    setupPerformanceMonitoring() {
        if ('performance' in window && 'observe' in window.performance) {
            this.observers.performance = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'measure' && entry.name.startsWith('component-')) {
                        console.info(`⚡ ${entry.name}: ${entry.duration.toFixed(2)}ms`);
                    }
                }
            });
            
            this.observers.performance.observe({ entryTypes: ['measure'] });
        }
    }

    /**
     * Configura o Intersection Observer para animações
     */
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        this.observers.intersection = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Inicializa animações específicas do componente
                    const componentType = entry.target.dataset.component;
                    if (componentType && this.components.has(componentType)) {
                        const component = this.components.get(componentType);
                        if (component.triggerAnimation) {
                            component.triggerAnimation();
                        }
                    }
                }
            });
        }, options);
    }

    /**
     * Carrega e inicializa todos os componentes na ordem correta
     */
    async loadComponents() {
        const startTime = performance.now();
        
        try {
            // Carrega componentes em ordem de prioridade
            for (const componentName of this.loadOrder) {
                await this.loadComponent(componentName);
            }
            
            // Registra métricas de performance
            const totalTime = performance.now() - startTime;
            if ('performance' in window) {
                performance.measure('component-total-load-time', {
                    start: startTime,
                    duration: totalTime
                });
            }
            
            console.info(`✅ All components loaded successfully in ${totalTime.toFixed(2)}ms`);
            
            // Emite evento de componentes carregados
            this.emitLoadedEvent();
            
        } catch (error) {
            console.error('❌ Error loading components:', error);
        }
    }

    /**
     * Carrega e inicializa um componente específico
     */
    async loadComponent(componentName) {
        const startTime = performance.now();
        
        try {
            // Verifica se a classe do componente existe
            if (typeof window[componentName] !== 'function') {
                throw new Error(`Component class ${componentName} not found`);
            }
            
            // Cria instância do componente
            const ComponentClass = window[componentName];
            const component = new ComponentClass();
            
            // Inicializa o componente
            if (component.init && typeof component.init === 'function') {
                await component.init();
            }
            
            // Armazena a instância
            this.components.set(componentName, component);
            
            // Configura observação para animações (se aplicável)
            this.setupComponentObserver(component);
            
            // Registra métrica de performance
            const loadTime = performance.now() - startTime;
            if ('performance' in window) {
                performance.measure(`component-${componentName.toLowerCase()}-load`, {
                    start: startTime,
                    duration: loadTime
                });
            }
            
            console.info(`✅ ${componentName} loaded in ${loadTime.toFixed(2)}ms`);
            
        } catch (error) {
            console.error(`❌ Failed to load ${componentName}:`, error);
            throw error;
        }
    }

    /**
     * Configura observador para um componente específico
     */
    setupComponentObserver(component) {
        if (component.container && this.observers.intersection) {
            component.container.dataset.component = component.constructor.name;
            this.observers.intersection.observe(component.container);
        }
    }

    /**
     * Emite evento quando todos os componentes foram carregados
     */
    emitLoadedEvent() {
        const event = new CustomEvent('portfolioComponentsLoaded', {
            detail: {
                components: Array.from(this.components.keys()),
                loadTime: performance.now()
            }
        });
        
        document.dispatchEvent(event);
    }

    /**
     * Obtém instância de um componente específico
     */
    getComponent(name) {
        return this.components.get(name);
    }

    /**
     * Recarrega um componente específico
     */
    async reloadComponent(componentName) {
        try {
            // Remove componente atual se existir
            if (this.components.has(componentName)) {
                const component = this.components.get(componentName);
                if (component.destroy && typeof component.destroy === 'function') {
                    component.destroy();
                }
                this.components.delete(componentName);
            }
            
            // Carrega novamente o componente
            await this.loadComponent(componentName);
            
            console.info(`🔄 ${componentName} reloaded successfully`);
            
        } catch (error) {
            console.error(`❌ Failed to reload ${componentName}:`, error);
        }
    }

    /**
     * Destrói todos os componentes e limpa recursos
     */
    destroy() {
        // Destrói todos os componentes
        this.components.forEach((component, name) => {
            if (component.destroy && typeof component.destroy === 'function') {
                component.destroy();
            }
        });
        
        // Limpa observadores
        if (this.observers.intersection) {
            this.observers.intersection.disconnect();
        }
        
        if (this.observers.performance) {
            this.observers.performance.disconnect();
        }
        
        // Limpa recursos
        this.components.clear();
        this.initialized = false;
        
        console.info('🧹 Component Loader destroyed');
    }

    /**
     * Obtém estatísticas de performance dos componentes
     */
    getPerformanceStats() {
        const stats = {
            totalComponents: this.components.size,
            loadedComponents: Array.from(this.components.keys()),
            memoryUsage: 'performance' in window ? performance.memory : null
        };
        
        return stats;
    }

    /**
     * Modo de debug para desenvolvimento
     */
    enableDebugMode() {
        window.componentLoader = this;
        console.info('🐛 Debug mode enabled. Access via window.componentLoader');
        
        // Adiciona métodos de debug
        this.debug = {
            listComponents: () => Array.from(this.components.keys()),
            getComponent: (name) => this.components.get(name),
            reloadAll: () => this.loadComponents(),
            stats: () => this.getPerformanceStats()
        };
    }
}

// Auto-inicialização quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeComponentLoader);
} else {
    initializeComponentLoader();
}

function initializeComponentLoader() {
    const loader = new ComponentLoader();
    
    // Aguarda um pouco para garantir que todos os scripts foram carregados
    setTimeout(() => {
        loader.init();
        
        // Habilita debug em desenvolvimento
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            loader.enableDebugMode();
        }
    }, 100);
}

// Exporta para uso global
window.ComponentLoader = ComponentLoader;