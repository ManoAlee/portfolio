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
        // Protege caso o botão não exista no DOM (prevent runtime errors)
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

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
        // Atualiza ícones com proteção caso o botão não exista
        if (!this.themeToggle) return;

        const sunIcon = this.themeToggle.querySelector('.fa-sun');
        const moonIcon = this.themeToggle.querySelector('.fa-moon');

        if (!sunIcon || !moonIcon) return;

        if (currentTheme === 'dark') {
            sunIcon.style.opacity = '1';
            moonIcon.style.opacity = '0';
        } else {
            sunIcon.style.opacity = '0';
            moonIcon.style.opacity = '1';
        }
    }
}

// Expõe a classe globalmente para código não-module (compatibilidade)
if (typeof window !== 'undefined') {
    window.ThemeManager = ThemeManager;
}

export default ThemeManager;