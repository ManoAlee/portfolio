// Gerenciamento de Tema
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.root = document.documentElement;
        this.transitionDuration = 300;
        this.prefersDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        this.init();
    }

    init() {
        this.initTheme();
        this.initEventListeners();
    }

    initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = this.prefersDarkQuery.matches;
        
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (prefersDark) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }
        
        this.updateThemeIcon();
    }

    initEventListeners() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Observa mudanças na preferência do sistema
        this.prefersDarkQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    setTheme(theme) {
        this.root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        // Defensive: ensure theme toggle exists on pages that don't include the control
        if (!this.themeToggle) return;

        const currentTheme = this.root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        this.themeToggle.classList.add('theme-transition');
        this.setTheme(newTheme);

        setTimeout(() => {
            if (this.themeToggle) {
                this.themeToggle.classList.remove('theme-transition');
            }
        }, this.transitionDuration);
    }

    updateThemeIcon() {
        if (!this.themeToggle) return;
        
        const currentTheme = this.root.getAttribute('data-theme');
        const sunIcon = this.themeToggle.querySelector('.fa-sun');
        const moonIcon = this.themeToggle.querySelector('.fa-moon');
        
        if (sunIcon && moonIcon) {
            if (currentTheme === 'dark') {
                sunIcon.style.opacity = '1';
                sunIcon.style.transform = 'rotate(0deg)';
                moonIcon.style.opacity = '0';
                moonIcon.style.transform = 'rotate(180deg)';
            } else {
                sunIcon.style.opacity = '0';
                sunIcon.style.transform = 'rotate(-180deg)';
                moonIcon.style.opacity = '1';
                moonIcon.style.transform = 'rotate(0deg)';
            }
        }
    }
}

// Gerenciamento de Navegação
class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.scrollThreshold = 100;
        this.lastScrollY = window.scrollY;
        
        this.init();
    }

    init() {
        this.initEventListeners();
        this.handleScroll();
    }

    initEventListeners() {
        // Toggle do menu mobile
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Navegação suave
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavClick(e, link);
            });
        });
        
        // Scroll do navbar
        window.addEventListener('scroll', this.throttle(() => this.handleScroll(), 16));
        
        // Fecha menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (this.navbar && !this.navbar.contains(e.target)) {
                if (this.navMenu) {
                    this.navMenu.classList.remove('active');
                }
            }
        });
        
        // ESC fecha menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu) {
                this.navMenu.classList.remove('active');
            }
        });
    }

    toggleMobileMenu() {
        if (this.navMenu) {
            this.navMenu.classList.toggle('active');
        }
    }
    
    handleNavClick(e, link) {
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Fecha o menu mobile
            if (this.navMenu) {
                this.navMenu.classList.remove('active');
            }
        }
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        // Navbar background
        if (this.navbar) {
            if (scrollY > this.scrollThreshold) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }
        
        // Auto-hide navbar
        if (scrollY > this.lastScrollY && scrollY > this.scrollThreshold) {
            if (this.navbar) {
                this.navbar.style.transform = 'translateY(-100%)';
            }
        } else {
            if (this.navbar) {
                this.navbar.style.transform = 'translateY(0)';
            }
        }
        
        this.lastScrollY = scrollY;
        this.updateActiveLink();
    }
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    updateActiveLink() {
        const scrollY = window.scrollY;
        
        this.sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o gerenciador de tema
    const themeManager = new ThemeManager();
    
    // Inicializa o gerenciador de navegação
    const navigationManager = new NavigationManager();
    
    // Inicializa outras funcionalidades
    try {
        initAnimations();
        initParallax();
        initCardHover();
        initTypewriter();
    } catch (error) {
        console.error('Erro ao inicializar funcionalidades:', error);
    }
    
    // Performance monitoring com verificação
    setTimeout(() => {
        if (typeof initPerformanceMonitoring === 'function') {
            initPerformanceMonitoring();
        } else {
            console.warn('⚠️ Performance monitoring não disponível - carregando funcionalidades básicas');
            // Inicialização básica de performance
            initBasicPerformanceMonitoring();
        }
    }, 100);
});

// Configuração do observador de interseção
const observerConfig = {
    threshold: 0.1,
    rootMargin: '0px'
};

// Observador para animações de scroll
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerConfig);

// Observador para fade-in
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerConfig);

// Inicialização de todas as animações
function initAnimations() {
    // Animações de scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // Fade-in para cards e títulos
    document.querySelectorAll('.card, .title, .subtitle').forEach(el => {
        fadeObserver.observe(el);
    });

    // Animação de entrada das seções
    const sections = document.querySelectorAll('.section-card');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}

// Smooth scroll
function initSmoothScroll() {
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

// Efeito de parallax
function initParallax() {
    const hero = document.querySelector('header');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
}

// Menu mobile
function initMobileMenu() {
    const nav = document.querySelector('.nav-content');
    if (!nav) return;

    const menuButton = document.createElement('button');
    menuButton.className = 'menu-button glass md:hidden';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    nav.appendChild(menuButton);

    const navLinks = nav.querySelector('div');
    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Fecha menu ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
        });
    });
}

// Links ativos
function initActiveLinks() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// Efeito de hover nos cards
function initCardHover() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Efeito de typing
function initTypewriter() {
    const title = document.querySelector('.title');
    if (!title) return;

    const text = title.textContent;
    title.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    typeWriter();
}

// Navegação com scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (!nav) return; // defensive: some pages don't have the main nav

    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Fallback básico para performance monitoring
function initBasicPerformanceMonitoring() {
    console.log('📊 Iniciando monitoramento básico de performance...');
    
    // Lazy loading simples para imagens
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Log de performance básico
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`⚡ Página carregada em ${loadTime}ms`);
        });
    }
} 