/**
 * Sistema de Tratamento de Erros e Fallbac        const dependencies = [
            { name: 'Font Awesome', check: () => document.querySelector('link[href*="font-awesome"]') },
            { name: 'CSS Styles', check: () => document.querySelector('link[href*="styles.css"]') },
            { name: 'Theme System', check: () => typeof ThemeManager !== 'undefined' || document.getElementById('theme-toggle') !== null }
        ]; Garante que o portfolio funcione mesmo quando há problemas de carregamento
 */

class ErrorHandler {
    constructor() {
        this.errors = [];
        this.init();
    }

    init() {
        this.setupGlobalErrorHandling();
        this.setupConsoleWarnings();
        this.checkDependencies();
    }

    setupGlobalErrorHandling() {
        // Captura erros JavaScript globais
        window.addEventListener('error', (event) => {
            this.logError('JavaScript Error', event.error || event.message, event.filename, event.lineno);
        });

        // Captura erros de recursos (CSS, JS, imagens)
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.logError('Resource Error', `Failed to load: ${event.target.src || event.target.href}`, event.target.tagName);
                this.handleResourceError(event.target);
            }
        }, true);

        // Captura promises rejeitadas
        window.addEventListener('unhandledrejection', (event) => {
            this.logError('Promise Rejection', event.reason);
        });
    }

    setupConsoleWarnings() {
        // Intercepta console.error para monitoramento
        const originalError = console.error;
        console.error = (...args) => {
            this.logError('Console Error', args.join(' '));
            originalError.apply(console, args);
        };
    }

    checkDependencies() {
        const dependencies = [
            { name: 'Font Awesome', check: () => window.FontAwesome || document.querySelector('link[href*="font-awesome"]') },
            { name: 'CSS Styles', check: () => document.querySelector('link[href*="styles.css"]') },
            { name: 'Theme System', check: () => typeof ThemeManager !== 'undefined' }
        ];

        dependencies.forEach(dep => {
            if (!dep.check()) {
                this.logError('Dependency Missing', `${dep.name} não foi carregado corretamente`);
                this.loadFallbacks(dep.name);
            }
        });
    }

    logError(type, message, file = '', line = '') {
        const error = {
            type,
            message,
            file,
            line,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        this.errors.push(error);
        
        // Log no console com formatação
        console.warn(`🚨 ${type}: ${message}`, file && line ? `at ${file}:${line}` : '');
        
        // Enviar para analytics em produção (opcional)
        if (this.shouldReportError()) {
            this.reportError(error);
        }
    }

    handleResourceError(element) {
        const tagName = element.tagName.toLowerCase();
        
        switch (tagName) {
            case 'script':
                this.handleScriptError(element);
                break;
            case 'link':
                this.handleCSSError(element);
                break;
            case 'img':
                this.handleImageError(element);
                break;
        }
    }

    handleScriptError(script) {
        const src = script.src;
        console.warn(`⚠️ Falha ao carregar script: ${src}`);
        
        // Fallbacks específicos
        if (src.includes('main.js')) {
            this.initBasicFunctionality();
        } else if (src.includes('theme.js')) {
            this.initBasicTheme();
        } else if (src.includes('performance.js')) {
            this.initBasicPerformance();
        }
    }

    handleCSSError(link) {
        const href = link.href;
        console.warn(`⚠️ Falha ao carregar CSS: ${href}`);
        
        // Aplicar estilos básicos inline
        this.applyFallbackStyles();
    }

    handleImageError(img) {
        // Placeholder para imagens quebradas
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW0gaW5kaXNwb27DrXZlbDwvdGV4dD48L3N2Zz4=';
        img.alt = 'Imagem indisponível';
    }

    loadFallbacks(dependencyName) {
        switch (dependencyName) {
            case 'Font Awesome':
                this.loadFontAwesome();
                break;
            case 'CSS Styles':
                this.applyFallbackStyles();
                break;
            case 'Theme System':
                this.initBasicTheme();
                break;
        }
    }

    loadFontAwesome() {
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            document.head.appendChild(link);
        }
    }

    applyFallbackStyles() {
        const fallbackCSS = `
            <style id="fallback-styles">
                /* Estilos básicos de fallback */
                * { box-sizing: border-box; }
                body { 
                    font-family: Arial, sans-serif; 
                    line-height: 1.6; 
                    margin: 0; 
                    padding: 0;
                    background: #1a1a1a;
                    color: #ffffff;
                }
                .container { 
                    max-width: 1200px; 
                    margin: 0 auto; 
                    padding: 0 1rem; 
                }
                .card {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    padding: 1.5rem;
                    margin: 1rem 0;
                    backdrop-filter: blur(10px);
                }
                .btn {
                    display: inline-block;
                    padding: 0.75rem 1.5rem;
                    background: #4f46e5;
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    transition: background 0.3s;
                }
                .btn:hover { background: #3730a3; }
                .nav {
                    background: rgba(0, 0, 0, 0.9);
                    padding: 1rem 0;
                    position: fixed;
                    top: 0;
                    width: 100%;
                    z-index: 1000;
                }
                .nav-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                header { margin-top: 80px; }
            </style>
        `;
        
        if (!document.getElementById('fallback-styles')) {
            document.head.insertAdjacentHTML('beforeend', fallbackCSS);
        }
    }

    initBasicFunctionality() {
        console.log('🔧 Iniciando funcionalidade básica...');
        
        // Navegação básica
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Menu mobile básico
        const menuToggle = document.querySelector('.nav-toggle, .menu-toggle');
        const navMenu = document.querySelector('.nav-menu, .nav-links');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
    }

    initBasicTheme() {
        console.log('🎨 Iniciando sistema de tema básico...');
        
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;
        
        const root = document.documentElement;
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Atualizar ícones se existirem
            const sunIcon = themeToggle.querySelector('.fa-sun');
            const moonIcon = themeToggle.querySelector('.fa-moon');
            
            if (sunIcon && moonIcon) {
                if (newTheme === 'dark') {
                    sunIcon.style.display = 'inline';
                    moonIcon.style.display = 'none';
                } else {
                    sunIcon.style.display = 'none';
                    moonIcon.style.display = 'inline';
                }
            }
        });
        
        // Aplicar tema salvo
        const savedTheme = localStorage.getItem('theme') || 'dark';
        root.setAttribute('data-theme', savedTheme);
    }

    initBasicPerformance() {
        console.log('📊 Iniciando monitoramento básico de performance...');
        
        // Lazy loading básico para imagens
        const images = document.querySelectorAll('img[data-src]');
        if (images.length > 0 && 'IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
        
        // Performance básica
        window.addEventListener('load', () => {
            if ('performance' in window) {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`⚡ Página carregada em ${loadTime}ms`);
            }
        });
    }

    shouldReportError() {
        // Apenas reportar em produção
        return !window.location.hostname.includes('localhost') && 
               !window.location.hostname.includes('127.0.0.1');
    }

    reportError(error) {
        // Implementar envio para serviço de analytics
        // Por exemplo: Google Analytics, Sentry, etc.
        console.log('📨 Erro reportado:', error);
    }

    getErrorReport() {
        return {
            errors: this.errors,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
            url: window.location.href
        };
    }

    clearErrors() {
        this.errors = [];
    }
}

// Inicialização imediata
const errorHandler = new ErrorHandler();

// Exportar para uso global
window.ErrorHandler = ErrorHandler;
window.errorHandler = errorHandler;

// Funcções de utilidade global
window.safeExecute = function(fn, fallback = null) {
    try {
        return fn();
    } catch (error) {
        errorHandler.logError('Safe Execute', error.message);
        return fallback;
    }
};

window.loadScript = function(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    script.onerror = () => {
        errorHandler.logError('Script Load Error', `Failed to load: ${src}`);
        if (callback) callback(new Error(`Failed to load script: ${src}`));
    };
    document.head.appendChild(script);
};

// Inicialização básica garantida
document.addEventListener('DOMContentLoaded', () => {
    errorHandler.initBasicFunctionality();
    errorHandler.initBasicTheme();
    errorHandler.initBasicPerformance();
});