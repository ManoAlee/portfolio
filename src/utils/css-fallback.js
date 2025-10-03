/**
 * CSS Fallback System
 * Sistema de fallback para CSS não encontrado
 */

class CSSFallback {
    constructor() {
        this.missingCSS = [];
        this.checkDelay = 1000; // 1 segundo após carregamento
        
        this.init();
    }

    init() {
        // Verificar após carregamento da página
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.checkMissingCSS(), this.checkDelay);
            });
        } else {
            setTimeout(() => this.checkMissingCSS(), this.checkDelay);
        }
    }

    /**
     * Verifica se há arquivos CSS não carregados
     */
    checkMissingCSS() {
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        
        links.forEach(link => {
            // Simular uma requisição para verificar se o arquivo existe
            this.testCSSFile(link.href, link);
        });
    }

    /**
     * Testa se um arquivo CSS existe
     */
    testCSSFile(href, linkElement) {
        fetch(href, { method: 'HEAD' })
            .then(response => {
                if (!response.ok) {
                    console.warn(`❌ CSS não encontrado: ${href}`);
                    this.handleMissingCSS(href, linkElement);
                }
            })
            .catch(error => {
                console.warn(`❌ Erro ao carregar CSS: ${href}`, error);
                this.handleMissingCSS(href, linkElement);
            });
    }

    /**
     * Manipula arquivos CSS não encontrados
     */
    handleMissingCSS(href, linkElement) {
        this.missingCSS.push(href);

        // Tentar carregar alternativa baseada no nome do arquivo
        const filename = href.split('/').pop();
        
        if (filename === 'utilities.css') {
            this.loadFallbackUtilities();
        } else if (filename === 'animations.css') {
            this.loadFallbackAnimations();
        }

        // Remover link quebrado
        if (linkElement && linkElement.parentNode) {
            linkElement.parentNode.removeChild(linkElement);
        }
    }

    /**
     * Carrega CSS utilitário básico
     */
    loadFallbackUtilities() {
        const style = document.createElement('style');
        style.textContent = `
            /* Utilities Fallback */
            .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-center { justify-content: center; }
            .gap-6 { gap: 1.5rem; }
            .text-center { text-align: center; }
            .font-bold { font-weight: 700; }
            .text-xl { font-size: 1.25rem; }
            .text-gray-300 { color: #d1d5db; }
            .hover\\:text-white:hover { color: #ffffff; }
            .transition-colors { transition: color 0.2s ease; }
            .btn { padding: 0.5rem 1rem; border-radius: 0.375rem; cursor: pointer; }
            .glass { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); }
            .text-gradient { background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
            .mt-8 { margin-top: 2rem; }
            .mb-4 { margin-bottom: 1rem; }
            .p-6 { padding: 1.5rem; }
            .rounded-lg { border-radius: 0.5rem; }
        `;
        document.head.appendChild(style);
        console.log('✅ CSS utilitário básico carregado como fallback');
    }

    /**
     * Carrega animações CSS básicas
     */
    loadFallbackAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            /* Animations Fallback */
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .fade-in-up { animation: fadeInUp 0.6s ease-out; }
            .animate-fade-in-up { animation: fadeInUp 0.6s ease-out; }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .fade-in { animation: fadeIn 0.5s ease-out; }
            
            .transition-all { transition: all 0.3s ease; }
            .transform { transform: translateZ(0); }
            .hover\\:scale-105:hover { transform: scale(1.05); }
        `;
        document.head.appendChild(style);
        console.log('✅ Animações CSS básicas carregadas como fallback');
    }

    /**
     * Retorna lista de arquivos CSS não encontrados
     */
    getMissingFiles() {
        return this.missingCSS;
    }
}

// Inicializar automaticamente
new CSSFallback();