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
     * Retorna SVG inline para ícones comuns (mapping simples)
     * Aceita valores como 'fas fa-home' ou apenas 'fa-home' e retorna uma string SVG
     */
    getIconSVG(icon, size = 16) {
        const s = size;
        const icons = {
            'fa-home': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
            'fa-user': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/></svg>`,
            'fa-briefcase': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10 4h4v2h-4zM3 7v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7H3z"/></svg>`,
            'fa-cogs': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19.4 12.9c.04-.3.06-.6.06-.9s-.02-.6-.06-.9l2.1-1.6c.19-.14.24-.41.12-.62l-2-3.4c-.12-.21-.38-.3-.6-.22l-2.5 1c-.5-.4-1-.7-1.6-.9l-.4-2.6A.486.486 0 0013 2h-4c-.24 0-.44.17-.48.4l-.4 2.6c-.6.2-1.1.5-1.6.9l-2.5-1a.5.5 0 00-.6.22l-2 3.4c-.12.21-.07.48.12.62l2.1 1.6c-.04.3-.06.6-.06.9s.02.6.06.9L2.1 14.5c-.19.14-.24.41-.12.62l2 3.4c.12.21.38.3.6.22l2.5-1c.5.4 1 .7 1.6.9l.4 2.6c.04.23.24.4.48.4h4c.24 0 .44-.17.48-.4l.4-2.6c.6-.2 1.1-.5 1.6-.9l2.5 1c.22.09.48 0 .6-.22l2-3.4c.12-.21.07-.48-.12-.62l-2.1-1.6z"/></svg>`,
            'fa-folder-open': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>`,
            'fa-envelope': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5L4 8V6l8 5 8-5v2z"/></svg>`,
            'fa-exclamation-triangle': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`,
            'fa-th': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/></svg>`,
            'fa-server': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 5h18v4H3zM3 11h18v4H3zM3 17h18v4H3z"/></svg>`,
            'fa-chart-line': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 17l6-6 4 4 8-8v10H3z"/></svg>`,
            'fa-robot': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a2 2 0 00-2 2v1H7a2 2 0 00-2 2v4h14V7a2 2 0 00-2-2h-3V4a2 2 0 00-2-2zM7 14v4h10v-4H7z"/></svg>`,
            'fa-code': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8.7 16.3L3.4 12 8.7 7.7 10.1 9.1 6.9 12l3.2 2.9-1.4 1.4zM15.3 7.7L20.6 12 15.3 16.3 13.9 14.9 17.1 12l-3.2-2.9 1.4-1.4z"/></svg>`,
            'fa-th-large': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/></svg>`,
            'fa-list': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/></svg>`,
            'fa-plus': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z"/></svg>`,
            'fa-eye': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 11a4 4 0 110-8 4 4 0 010 8z"/></svg>`,
            'fa-external-link-alt': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h5v2H7v10h10v-3h2v5H5V5z"/></svg>`,
            'fa-github': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.42-1.305.763-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.839 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.372.81 1.102.81 2.222 0 1.606-.015 2.902-.015 3.293 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z"/></svg>`,
            'fa-times': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.59 13.41 4.29 19.71 2.88 18.3 9.18 12 2.88 5.71 4.29 4.29 10.59 10.59 16.89 4.29z"/></svg>`,
            'default': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/></svg>`
        };

        const token = (icon || '').toString().split(' ').find(t => t.startsWith('fa-')) || icon;
        return icons[token] || icons['default'];
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
            link.innerHTML = `${this.getIconSVG(item.icon, 18)} ${item.text}`;
            // preserve semantic icon information for tooltips and analytics
            link.dataset.icon = item.icon;
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
        // Use a class to control scrolling so other scripts/CSS don't accidentally leave the page locked
        document.documentElement.classList.add('no-scroll');
        // Keep body.style as a best-effort fallback for older code
        try { document.body.style.overflow = 'hidden'; } catch(e) {}
        this.mobileMenuOpen = true;
    }

    closeMobileMenu() {
        const hamburger = document.querySelector('.hamburger-menu');
        const mobileMenu = document.querySelector('.nav-mobile-menu');
        
        if (hamburger) hamburger.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
        document.documentElement.classList.remove('no-scroll');
        try { document.body.style.overflow = ''; } catch(e) {}
        this.mobileMenuOpen = false;
    }

    /**
     * Cria indicador de scroll
     */
    createScrollIndicator() {
        this.scrollIndicator = document.createElement('div');
        this.scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(this.scrollIndicator);
    // Prevent the indicator from intercepting pointer events (should never block interaction)
    this.scrollIndicator.style.pointerEvents = 'none';

        const updateScrollIndicator = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
            // Avoid division by zero and clamp value between 0 and 1
            const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;
            const clamped = Math.max(0, Math.min(1, isFinite(scrollPercent) ? scrollPercent : 0));

            this.scrollIndicator.style.transform = `scaleX(${clamped})`;
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
            // Spinner SVG minimal e acessível
            placeholder.innerHTML = `
                <div class="spinner-wrapper" aria-hidden="true">
                    <svg width="48" height="48" viewBox="0 0 50 50" class="spinner" aria-hidden="true">
                        <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="5"></circle>
                        <path d="M45 25a20 20 0 0 0-36.6-11" stroke="#60a5fa" stroke-width="5" stroke-linecap="round" fill="none"></path>
                    </svg>
                </div>
            `;
            
            img.parentNode.insertBefore(placeholder, img);
            
            // When loaded, ensure placeholder is removed and layout updated
            const onLoad = () => {
                img.classList.remove('loading');
                img.classList.add('loaded');
                if (placeholder && placeholder.parentNode) placeholder.remove();
                // Ensure aspect ratio is recalculated
                try { if (img.naturalWidth && img.naturalHeight) img.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`; } catch(e) {}
                img.removeEventListener('load', onLoad);
                img.removeEventListener('error', onError);
            };

            const onError = () => {
                img.classList.remove('loading');
                placeholder.innerHTML = `${this.getIconSVG('fa-exclamation-triangle', 18)} Erro ao carregar`;
                placeholder.style.background = 'rgba(239, 68, 68, 0.06)';
                img.removeEventListener('load', onLoad);
                img.removeEventListener('error', onError);
            };

            img.addEventListener('load', onLoad);
            img.addEventListener('error', onError);
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

        // Tooltips para botões sem texto (suporta elementos com data-icon e ícones inline)
        const iconButtons = document.querySelectorAll('button i[class*="fa-"], a i[class*="fa-"], [data-icon]');
        iconButtons.forEach(node => {
            const button = node.closest ? node.closest('button, a') : null;
            const target = button || node;
            if (!target || target.querySelector('.tooltip-content')) return;

            let iconClass = null;
            if (node.dataset && node.dataset.icon) {
                iconClass = node.dataset.icon;
            } else if (node.className) {
                iconClass = node.className;
            }

            const tooltipText = this.getTooltipForIcon(iconClass || '');
            if (tooltipText) {
                target.classList.add('tooltip');
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip-content';
                tooltip.textContent = tooltipText;
                target.appendChild(tooltip);
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
        }, { passive: true });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        }, { passive: true });

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
            }, { passive: true });

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