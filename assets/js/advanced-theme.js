// ===== ADVANCED THEME SYSTEM =====
// Sistema de temas avançado com múltiplas opções

class AdvancedThemeSystem {
    constructor() {
        this.themes = {
            light: {
                name: 'Claro',
                icon: 'fas fa-sun',
                primary: '#4F46E5',
                background: '#F8FAFC'
            },
            dark: {
                name: 'Escuro', 
                icon: 'fas fa-moon',
                primary: '#6366F1',
                background: '#0F172A'
            },
            blue: {
                name: 'Azul',
                icon: 'fas fa-water',
                primary: '#0EA5E9',
                background: '#0F1419'
            },
            green: {
                name: 'Verde',
                icon: 'fas fa-leaf',
                primary: '#10B981',
                background: '#0D1117'
            }
        };
        
        this.currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
        this.init();
    }

    init() {
        this.createThemeSelector();
        this.applyTheme(this.currentTheme);
        this.setupAutoTheme();
    }

    createThemeSelector() {
        // Remove o botão antigo se existir
        const oldToggle = document.getElementById('theme-toggle');
        if (oldToggle) {
            oldToggle.remove();
        }

        const themeSelector = `
        <div class="theme-selector fixed top-4 right-4 z-50">
            <button id="new-theme-toggle" class="theme-btn glass">
                <i class="${this.themes[this.currentTheme].icon}"></i>
            </button>
            
            <div class="theme-menu glass hidden" id="theme-menu">
                <h4 class="text-sm font-semibold mb-2 text-gray-300">Escolher Tema</h4>
                ${Object.entries(this.themes).map(([key, theme]) => `
                    <button class="theme-option ${key === this.currentTheme ? 'active' : ''}" 
                            data-theme="${key}">
                        <i class="${theme.icon}"></i>
                        <span>${theme.name}</span>
                        <div class="theme-preview" style="background: ${theme.primary}"></div>
                    </button>
                `).join('')}
                
                <div class="theme-auto mt-2 pt-2 border-t border-gray-700">
                    <label class="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" id="auto-theme" class="rounded">
                        <span>Auto (sistema)</span>
                    </label>
                </div>
            </div>
        </div>`;

        document.body.insertAdjacentHTML('beforeend', themeSelector);
        this.setupThemeEvents();
        this.addThemeStyles();
    }

    setupThemeEvents() {
        const toggle = document.getElementById('new-theme-toggle');
        const menu = document.getElementById('theme-menu');
        const options = document.querySelectorAll('.theme-option');
        const autoCheck = document.getElementById('auto-theme');

        // Toggle menu
        toggle.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.add('hidden');
            }
        });

        // Theme selection
        options.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.dataset.theme;
                this.changeTheme(theme);
                menu.classList.add('hidden');
            });
        });

        // Auto theme
        autoCheck.addEventListener('change', (e) => {
            localStorage.setItem('auto-theme', e.target.checked);
            if (e.target.checked) {
                this.enableAutoTheme();
            }
        });

        // Load auto theme preference
        const autoTheme = localStorage.getItem('auto-theme') === 'true';
        autoCheck.checked = autoTheme;
        if (autoTheme) {
            this.enableAutoTheme();
        }
    }

    changeTheme(themeName) {
        this.currentTheme = themeName;
        localStorage.setItem('portfolio-theme', themeName);
        this.applyTheme(themeName);
        
        // Update UI
        document.querySelectorAll('.theme-option').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.theme === themeName);
        });
        
        const toggle = document.getElementById('new-theme-toggle');
        toggle.innerHTML = `<i class="${this.themes[themeName].icon}"></i>`;
    }

    applyTheme(themeName) {
        const theme = this.themes[themeName];
        const root = document.documentElement;
        
        // Apply CSS variables based on theme
        if (themeName === 'light') {
            root.removeAttribute('data-theme');
        } else {
            root.setAttribute('data-theme', themeName);
        }
        
        // Custom properties for each theme
        root.style.setProperty('--theme-primary', theme.primary);
        
        // Add smooth transition
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        // Theme-specific adjustments
        this.applyThemeSpecificStyles(themeName);
    }

    applyThemeSpecificStyles(themeName) {
        // Remove existing theme classes
        document.body.classList.remove('theme-blue', 'theme-green');
        
        // Add new theme class
        if (themeName !== 'light' && themeName !== 'dark') {
            document.body.classList.add(`theme-${themeName}`);
        }
    }

    enableAutoTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const updateTheme = () => {
            const autoTheme = mediaQuery.matches ? 'dark' : 'light';
            this.changeTheme(autoTheme);
        };
        
        updateTheme();
        mediaQuery.addEventListener('change', updateTheme);
    }

    setupAutoTheme() {
        // Detecta horário para auto-theme
        const hour = new Date().getHours();
        const isDayTime = hour >= 6 && hour < 18;
        
        if (!localStorage.getItem('portfolio-theme')) {
            const autoTheme = isDayTime ? 'light' : 'dark';
            this.changeTheme(autoTheme);
        }
    }

    addThemeStyles() {
        const styles = `
        <style>
        .theme-selector {
            font-family: inherit;
        }
        
        .theme-btn {
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.2);
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .theme-btn:hover {
            border-color: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }
        
        .theme-menu {
            position: absolute;
            top: 56px;
            right: 0;
            padding: 16px;
            border-radius: 12px;
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.8);
            min-width: 200px;
        }
        
        .theme-option {
            width: 100%;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 12px;
            border-radius: 8px;
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            transition: all 0.2s ease;
            text-align: left;
        }
        
        .theme-option:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        .theme-option.active {
            background: rgba(79, 70, 229, 0.2);
            color: #6366f1;
        }
        
        .theme-preview {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            margin-left: auto;
        }
        
        /* Tema Azul */
        .theme-blue {
            --primary: #0EA5E9;
            --accent: #38BDF8;
        }
        
        .theme-blue .btn-primary {
            background: #0EA5E9;
        }
        
        .theme-blue .text-primary {
            color: #0EA5E9 !important;
        }
        
        /* Tema Verde */
        .theme-green {
            --primary: #10B981;
            --accent: #34D399;
        }
        
        .theme-green .btn-primary {
            background: #10B981;
        }
        
        .theme-green .text-primary {
            color: #10B981 !important;
        }
        </style>`;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Inicializar quando DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedThemeSystem();
});