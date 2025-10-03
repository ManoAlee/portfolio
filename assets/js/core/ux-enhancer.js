/**
 * Sistema de Correções de UX e Melhorias Visuais
 * Corrige bugs de navegação, adiciona menu mobile e melhora interações
 */

class UXEnhancer {
    constructor() {
        this.isInitialized = false;
        this.mobileMenuOpen = false;
        this.scrollIndicator = null;
        this.intersectionObserver = null;
        
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        // Aguarda DOM carregar
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeEnhancements());
        } else {
            this.initializeEnhancements();
        }
    }

    initializeEnhancements() {
        console.log('🎨 Iniciando melhorias de UX...');
        
        this.createMobileMenu();
        this.createScrollIndicator();
        this.improveImageLoading();
        this.addTooltips();
        this.addKeyboardNavigation();
        this.fixLayoutShifts();
        this.addLoadingStates();
        this.improveButtonInteractions();
        this.addErrorHandling();
        
        this.isInitialized = true;
        console.log('✅ Melhorias de UX aplicadas com sucesso!');
    }

    /**
     * Cria menu mobile aprimorado
     */
    createMobileMenu() {
        const nav = document.querySelector('.nav');
        if (!nav) return;

        const navContent = nav.querySelector('.nav-content');
        if (!navContent) return;

        // Criar botão hamburger
        const hamburgerBtn = document.createElement('button');
        hamburgerBtn.className = 'hamburger-menu';
        hamburgerBtn.setAttribute('aria-label', 'Menu de navegação');
        hamburgerBtn.innerHTML = `
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
        `;

        // Criar menu mobile
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'nav-mobile-menu';
        
        const mobileLinks = document.createElement('div');
        mobileLinks.className = 'nav-mobile-links';
        
        // Links do menu
        const menuItems = [
            { href: '/workspaces/portfolio/index.html', text: 'Início', icon: 'fas fa-home' },
            { href: '/workspaces/portfolio/pages/about/index.html', text: 'Sobre', icon: 'fas fa-user' },
            { href: '/workspaces/portfolio/pages/experience/index.html', text: 'Experiência', icon: 'fas fa-briefcase' },
            { href: '/workspaces/portfolio/pages/skills/index.html', text: 'Habilidades', icon: 'fas fa-cogs' },
            { href: '/workspaces/portfolio/pages/projects/index.html', text: 'Projetos', icon: 'fas fa-folder-open' },
            { href: '#contact', text: 'Contato', icon: 'fas fa-envelope' }
        ];

        menuItems.forEach(item => {
            const link = document.createElement('a');
            link.href = item.href;
            link.innerHTML = `<i class="${item.icon}"></i>${item.text}`;
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
            mobileLinks.appendChild(link);
        });

        mobileMenu.appendChild(mobileLinks);

        // Adicionar elementos ao DOM
        navContent.appendChild(hamburgerBtn);
        document.body.appendChild(mobileMenu);

        // Event listeners
        hamburgerBtn.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Fechar menu com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const hamburger = document.querySelector('.hamburger-menu');
        const mobileMenu = document.querySelector('.nav-mobile-menu');
        
        if (this.mobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        const hamburger = document.querySelector('.hamburger-menu');
        const mobileMenu = document.querySelector('.nav-mobile-menu');
        
        hamburger.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.mobileMenuOpen = true;
    }

    closeMobileMenu() {
        const hamburger = document.querySelector('.hamburger-menu');
        const mobileMenu = document.querySelector('.nav-mobile-menu');
        
        if (hamburger) hamburger.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        this.mobileMenuOpen = false;
    }

    /**
     * Cria indicador de scroll
     */
    createScrollIndicator() {
        this.scrollIndicator = document.createElement('div');
        this.scrollIndicator.className = 'scroll-indicator';
        document.body.appendChild(this.scrollIndicator);

        const updateScrollIndicator = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;
            
            this.scrollIndicator.style.transform = `scaleX(${scrollPercent})`;
        };

        window.addEventListener('scroll', updateScrollIndicator, { passive: true });
        updateScrollIndicator();
    }

    /**
     * Melhora carregamento de imagens
     */
    improveImageLoading() {
        const images = document.querySelectorAll('img:not([data-optimized])');
        
        images.forEach(img => {
            img.setAttribute('data-optimized', 'true');
            img.classList.add('optimized-image', 'loading');
            
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            placeholder.innerHTML = '<i class="fas fa-image"></i> Carregando...';
            
            img.parentNode.insertBefore(placeholder, img);
            
            img.addEventListener('load', () => {
                img.classList.remove('loading');
                img.classList.add('loaded');
                placeholder.remove();
            });
            
            img.addEventListener('error', () => {
                placeholder.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erro ao carregar';
                placeholder.style.background = 'rgba(239, 68, 68, 0.1)';
            });
        });
    }

    /**
     * Adiciona tooltips
     */
    addTooltips() {
        const elementsWithTitles = document.querySelectorAll('[title]');
        
        elementsWithTitles.forEach(element => {
            const title = element.getAttribute('title');
            if (!title) return;
            
            element.removeAttribute('title');
            element.classList.add('tooltip');
            
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip-content';
            tooltip.textContent = title;
            
            element.appendChild(tooltip);
        });

        // Tooltips para botões sem texto
        const iconButtons = document.querySelectorAll('button i[class*="fa-"], a i[class*="fa-"]');
        iconButtons.forEach(icon => {
            const button = icon.closest('button, a');
            if (!button || button.querySelector('.tooltip-content')) return;
            
            const tooltipText = this.getTooltipForIcon(icon.className);
            if (tooltipText) {
                button.classList.add('tooltip');
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip-content';
                tooltip.textContent = tooltipText;
                button.appendChild(tooltip);
            }
        });
    }

    getTooltipForIcon(className) {
        const iconMap = {
            'fa-sun': 'Tema claro',
            'fa-moon': 'Tema escuro',
            'fa-github': 'GitHub',
            'fa-linkedin': 'LinkedIn',
            'fa-envelope': 'Email',
            'fa-phone': 'Telefone',
            'fa-home': 'Início',
            'fa-user': 'Sobre',
            'fa-briefcase': 'Experiência',
            'fa-cogs': 'Habilidades',
            'fa-folder-open': 'Projetos',
            'fa-arrow-left': 'Voltar',
            'fa-external-link-alt': 'Link externo'
        };
        
        for (const [iconClass, text] of Object.entries(iconMap)) {
            if (className.includes(iconClass)) {
                return text;
            }
        }
        return null;
    }

    /**
     * Adiciona navegação por teclado
     */
    addKeyboardNavigation() {
        // Navegação com Tab mais visível
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Atalhos de teclado
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                switch(e.key) {
                    case 'h':
                        e.preventDefault();
                        window.location.href = '/workspaces/portfolio/index.html';
                        break;
                    case 'p':
                        e.preventDefault();
                        window.location.href = '/workspaces/portfolio/pages/projects/index.html';
                        break;
                    case 't':
                        e.preventDefault();
                        const themeToggle = document.getElementById('theme-toggle');
                        if (themeToggle) themeToggle.click();
                        break;
                }
            }
        });
    }

    /**
     * Corrige layout shifts
     */
    fixLayoutShifts() {
        // Define aspect ratios para imagens
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.style.aspectRatio && img.naturalWidth && img.naturalHeight) {
                img.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
            }
        });

        // Reserva espaço para elementos dinâmicos
        const dynamicElements = document.querySelectorAll('[id*="stats"], [id*="carousel"], [id*="timeline"]');
        dynamicElements.forEach(element => {
            if (!element.style.minHeight) {
                element.style.minHeight = '200px';
            }
        });
    }

    /**
     * Adiciona estados de loading
     */
    addLoadingStates() {
        const buttons = document.querySelectorAll('button, .btn');
        
        buttons.forEach(button => {
            const originalClickHandler = button.onclick;
            
            button.addEventListener('click', async (e) => {
                if (button.classList.contains('loading')) return;
                
                button.classList.add('loading');
                const originalText = button.textContent;
                const loadingText = button.dataset.loadingText || 'Carregando...';
                
                button.textContent = loadingText;
                
                try {
                    if (originalClickHandler) {
                        await originalClickHandler.call(button, e);
                    }
                } finally {
                    setTimeout(() => {
                        button.classList.remove('loading');
                        button.textContent = originalText;
                    }, 500);
                }
            });
        });
    }

    /**
     * Melhora interações de botões
     */
    improveButtonInteractions() {
        const interactiveElements = document.querySelectorAll('button, .btn, .card, a[href]');
        
        interactiveElements.forEach(element => {
            element.classList.add('interactive-element');
            
            // Adiciona feedback haptico em dispositivos móveis
            element.addEventListener('touchstart', () => {
                if ('vibrate' in navigator) {
                    navigator.vibrate(10);
                }
            });

            // Adiciona ripple effect
            element.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                
                const rect = element.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                element.style.position = 'relative';
                element.style.overflow = 'hidden';
                element.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // CSS para ripple effect
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    0% {
                        transform: scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * Adiciona tratamento de erros visuais
     */
    addErrorHandling() {
        // Captura erros de formulário
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                input.addEventListener('invalid', (e) => {
                    e.target.classList.add('error-state');
                    setTimeout(() => {
                        e.target.classList.remove('error-state');
                    }, 3000);
                });
                
                input.addEventListener('input', (e) => {
                    if (e.target.checkValidity()) {
                        e.target.classList.remove('error-state');
                        e.target.classList.add('success-state');
                    }
                });
            });
        });

        // Feedback visual para ações
        window.showFeedback = (type, message) => {
            const feedback = document.createElement('div');
            feedback.className = `feedback-message ${type}-state`;
            feedback.textContent = message;
            feedback.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 0.5rem;
                color: white;
                z-index: 1080;
                animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            `;
            
            document.body.appendChild(feedback);
            
            setTimeout(() => {
                feedback.remove();
            }, 3000);
        };
    }

    /**
     * Obtém status das melhorias
     */
    getStatus() {
        return {
            initialized: this.isInitialized,
            mobileMenuOpen: this.mobileMenuOpen,
            features: {
                mobileMenu: !!document.querySelector('.nav-mobile-menu'),
                scrollIndicator: !!document.querySelector('.scroll-indicator'),
                tooltips: document.querySelectorAll('.tooltip').length,
                optimizedImages: document.querySelectorAll('[data-optimized]').length
            }
        };
    }
}

// Inicialização automática
const uxEnhancer = new UXEnhancer();

// Disponibiliza globalmente para debug
window.uxEnhancer = uxEnhancer;

// Exporta para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UXEnhancer;
}