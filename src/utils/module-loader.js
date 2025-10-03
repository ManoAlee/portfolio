/**
 * Portfolio Module Loader
 * Carregador centralizado de módulos do portfolio
 */

class ModuleLoader {
    constructor() {
        this.loadedModules = new Set();
        this.config = window.portfolioConfig || {};
    }

    /**
     * Carrega módulo CSS de forma assíncrona
     */
    async loadCSS(path, id = null) {
        return new Promise((resolve, reject) => {
            if (id && this.loadedModules.has(id)) {
                resolve();
                return;
            }

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = path;
            
            if (id) {
                link.id = id;
            }

            link.onload = () => {
                if (id) this.loadedModules.add(id);
                resolve();
            };
            
            link.onerror = () => {
                reject(new Error(`Failed to load CSS: ${path}`));
            };

            document.head.appendChild(link);
        });
    }

    /**
     * Carrega módulo JavaScript de forma assíncrona
     */
    async loadJS(path, id = null) {
        return new Promise((resolve, reject) => {
            if (id && this.loadedModules.has(id)) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = path;
            script.defer = true;
            
            if (id) {
                script.id = id;
            }

            script.onload = () => {
                if (id) this.loadedModules.add(id);
                resolve();
            };
            
            script.onerror = () => {
                reject(new Error(`Failed to load JS: ${path}`));
            };

            document.head.appendChild(script);
        });
    }

    /**
     * Carrega módulos baseados na página atual
     */
    async loadPageModules() {
        const currentPath = window.location.pathname;
        
        // Módulos base sempre carregados
        const baseModules = [
            { type: 'css', path: '/assets/css/base/utilities.css', id: 'utilities' },
            { type: 'css', path: '/assets/css/base/animations.css', id: 'animations' },
            { type: 'js', path: '/assets/js/core/theme.js', id: 'theme' },
            { type: 'js', path: '/assets/js/core/navigation.js', id: 'navigation' }
        ];

        // Módulos específicos por página
        const pageModules = {
            '/': [
                { type: 'js', path: '/assets/js/components/animations.js', id: 'home-animations' }
            ],
            '/pages/about/': [
                { type: 'css', path: '/assets/css/pages/about.css', id: 'about-styles' }
            ],
            '/pages/experience/': [
                { type: 'css', path: '/assets/css/pages/experience.css', id: 'experience-styles' }
            ],
            '/pages/skills/': [
                { type: 'css', path: '/assets/css/pages/skills.css', id: 'skills-styles' }
            ],
            '/pages/projects/': [
                { type: 'css', path: '/assets/css/pages/projects.css', id: 'projects-styles' }
            ]
        };

        // Carrega módulos base
        await this.loadModules(baseModules);

        // Carrega módulos específicos da página
        const currentPageModules = this.findPageModules(currentPath, pageModules);
        if (currentPageModules.length > 0) {
            await this.loadModules(currentPageModules);
        }
    }

    /**
     * Carrega lista de módulos
     */
    async loadModules(modules) {
        const promises = modules.map(module => {
            if (module.type === 'css') {
                return this.loadCSS(module.path, module.id);
            } else if (module.type === 'js') {
                return this.loadJS(module.path, module.id);
            }
        });

        try {
            await Promise.all(promises);
            console.log('✅ Modules loaded successfully');
        } catch (error) {
            console.error('❌ Error loading modules:', error);
        }
    }

    /**
     * Encontra módulos para a página atual
     */
    findPageModules(currentPath, pageModules) {
        for (const [path, modules] of Object.entries(pageModules)) {
            if (currentPath.includes(path)) {
                return modules;
            }
        }
        return [];
    }

    /**
     * Precarrega recursos críticos
     */
    preloadCriticalResources() {
        const criticalResources = [
            '/assets/css/styles.css',
            '/assets/js/core/main.js',
            '/assets/images/profile.jpeg'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            
            if (resource.endsWith('.css')) {
                link.as = 'style';
            } else if (resource.endsWith('.js')) {
                link.as = 'script';
            } else if (resource.includes('/images/')) {
                link.as = 'image';
            }
            
            link.href = resource;
            document.head.appendChild(link);
        });
    }
}

// Inicialização automática
document.addEventListener('DOMContentLoaded', async () => {
    const loader = new ModuleLoader();
    
    // Precarrega recursos críticos
    loader.preloadCriticalResources();
    
    // Carrega módulos da página atual
    await loader.loadPageModules();
});

// Exporta para uso global
window.ModuleLoader = ModuleLoader;