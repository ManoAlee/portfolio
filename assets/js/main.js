// Gerenciamento de Tema
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.root = document.documentElement;
        this.transitionDuration = 300;
        
        this.init();
    }

    init() {
        this.initTheme();
        this.initEventListeners();
    }

    initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (prefersDark) {
            this.setTheme('dark');
        }
        
        this.updateThemeIcon();
    }

    initEventListeners() {
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Observa mudanças na preferência do sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
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
        const currentTheme = this.root.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        this.themeToggle.classList.add('theme-transition');
        this.setTheme(newTheme);
        
        setTimeout(() => {
            this.themeToggle.classList.remove('theme-transition');
        }, this.transitionDuration);
    }

    updateThemeIcon() {
        const currentTheme = this.root.getAttribute('data-theme');
        const sunIcon = this.themeToggle.querySelector('.fa-sun');
        const moonIcon = this.themeToggle.querySelector('.fa-moon');
        
        if (currentTheme === 'dark') {
            sunIcon.style.opacity = '1';
            moonIcon.style.opacity = '0';
        } else {
            sunIcon.style.opacity = '0';
            moonIcon.style.opacity = '1';
        }
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o gerenciador de tema
    const themeManager = new ThemeManager();
    
    // Inicializa outras funcionalidades
    initAnimations();
    initSmoothScroll();
    initParallax();
    initMobileMenu();
    initActiveLinks();
    initCardHover();
    initTypewriter();
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
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}); 