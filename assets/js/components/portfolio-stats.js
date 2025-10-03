/**
 * Componente Portfolio Stats
 * Exibe estatísticas animadas do portfolio
 */

class PortfolioStats {
    constructor(config = {}) {
        this.config = {
            containerSelector: '#portfolio-stats',
            animationDuration: 2000,
            animateOnScroll: true,
            countDelay: 50,
            ...config
        };
        
        this.container = null;
        this.isInitialized = false;
        this.isAnimated = false;
        this.observer = null;
        
        this.stats = [
            { label: 'Meses de Experiência', value: 5, suffix: '', icon: 'fas fa-calendar-alt' },
            { label: 'Tecnologias Aprendidas', value: 12, suffix: '+', icon: 'fas fa-code' },
            { label: 'Projetos Pessoais', value: 5, suffix: '', icon: 'fas fa-project-diagram' },
            { label: 'Certificações', value: 3, suffix: '', icon: 'fas fa-certificate' }
        ];
        
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        this.findContainer();
        if (!this.container) {
            this.createContainer();
        }
        
        this.render();
        this.setupAnimation();
        
        this.isInitialized = true;
        console.log('✅ PortfolioStats inicializado');
    }

    findContainer() {
        this.container = document.querySelector(this.config.containerSelector);
    }

    createContainer() {
        // Procura por seção de estatísticas ou cria uma
        const heroSection = document.querySelector('header, .hero, main');
        if (heroSection) {
            this.container = document.createElement('section');
            this.container.id = 'portfolio-stats';
            this.container.className = 'portfolio-stats container py-16';
            
            // Insere após o hero
            heroSection.insertAdjacentElement('afterend', this.container);
        }
    }

    render() {
        if (!this.container) return;
        
        const statsHTML = `
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold mb-4">Resultados em Números</h2>
                <p class="text-gray-400 max-w-2xl mx-auto">
                    Alguns números que representam minha jornada profissional e crescimento contínuo na área de TI.
                </p>
            </div>
            <div class="grid grid-2 md:grid-4 gap-8">
                ${this.stats.map((stat, index) => this.createStatCard(stat, index)).join('')}
            </div>
        `;
        
        this.container.innerHTML = statsHTML;
    }

    createStatCard(stat, index) {
        return `
            <div class="stat-card glass text-center p-6 rounded-xl stat-animate" data-index="${index}">
                <div class="stat-icon mb-4">
                    <i class="${stat.icon} text-4xl text-primary"></i>
                </div>
                <div class="stat-number text-3xl font-bold mb-2" data-target="${stat.value}">
                    0
                </div>
                <div class="stat-suffix text-3xl font-bold text-primary inline-block">
                    ${stat.suffix}
                </div>
                <div class="stat-label text-gray-400 text-sm mt-2">
                    ${stat.label}
                </div>
            </div>
        `;
    }

    setupAnimation() {
        if (!this.config.animateOnScroll) {
            this.animateNumbers();
            return;
        }

        // Intersection Observer para animar quando visível
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimated) {
                    this.animateNumbers();
                    this.isAnimated = true;
                }
            });
        }, {
            threshold: 0.5
        });

        if (this.container) {
            this.observer.observe(this.container);
        }
    }

    animateNumbers() {
        const numberElements = this.container.querySelectorAll('.stat-number');
        
        numberElements.forEach((element, index) => {
            const target = parseInt(element.dataset.target);
            const duration = this.config.animationDuration;
            const increment = target / (duration / this.config.countDelay);
            let current = 0;
            
            // Adiciona delay baseado no índice para efeito cascata
            setTimeout(() => {
                const counter = setInterval(() => {
                    current += increment;
                    
                    if (current >= target) {
                        element.textContent = target;
                        clearInterval(counter);
                        
                        // Adiciona animação de conclusão
                        element.parentElement.classList.add('stat-complete');
                    } else {
                        element.textContent = Math.floor(current);
                    }
                }, this.config.countDelay);
            }, index * 200);
        });

        // Anima os cartões
        const cards = this.container.querySelectorAll('.stat-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('stat-visible');
            }, index * 150);
        });
    }

    getStatus() {
        return {
            initialized: this.isInitialized,
            animated: this.isAnimated,
            container: !!this.container,
            statsCount: this.stats.length
        };
    }
}

// Exporta para uso global
window.PortfolioStats = PortfolioStats;