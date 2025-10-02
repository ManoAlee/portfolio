// ===== SISTEMA DE ESTATÍSTICAS DINÂMICAS =====
class PortfolioStats {
    constructor() {
        this.counters = {
            experience: 3,
            projects: 5,
            certifications: 5,
            skills: 15
        };
        this.init();
    }

    init() {
        this.createStatsSection();
        this.animateCounters();
        this.setupVisitorCounter();
        this.addGitHubStats();
    }

    createStatsSection() {
        const statsHtml = `
        <!-- Seção de Estatísticas -->
        <section class="container py-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl my-16">
            <div class="text-center mb-12">
                <h2 class="subtitle">Portfolio em Números</h2>
                <p class="text-gray-400">Crescimento contínuo em tecnologia</p>
            </div>
            
            <div class="grid grid-4 gap-8 max-w-4xl mx-auto">
                <!-- Experiência -->
                <div class="card text-center group hover-lift">
                    <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-briefcase text-2xl text-primary"></i>
                    </div>
                    <div class="counter text-3xl font-bold text-primary mb-2" data-target="${this.counters.experience}">0</div>
                    <p class="text-gray-400 font-medium">Anos de Experiência</p>
                </div>

                <!-- Projetos -->
                <div class="card text-center group hover-lift">
                    <div class="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-code text-2xl text-accent"></i>
                    </div>
                    <div class="counter text-3xl font-bold text-accent mb-2" data-target="${this.counters.projects}">0</div>
                    <p class="text-gray-400 font-medium">Projetos Concluídos</p>
                </div>

                <!-- Certificações -->
                <div class="card text-center group hover-lift">
                    <div class="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-certificate text-2xl text-success"></i>
                    </div>
                    <div class="counter text-3xl font-bold text-success mb-2" data-target="${this.counters.certifications}">0</div>
                    <p class="text-gray-400 font-medium">Certificações</p>
                </div>

                <!-- Skills -->
                <div class="card text-center group hover-lift">
                    <div class="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-tools text-2xl text-warning"></i>
                    </div>
                    <div class="counter text-3xl font-bold text-warning mb-2" data-target="${this.counters.skills}">0</div>
                    <p class="text-gray-400 font-medium">Tecnologias</p>
                </div>
            </div>

            <!-- GitHub Stats Dinâmicas -->
            <div class="mt-12" id="github-stats">
                <div class="text-center mb-6">
                    <h3 class="text-xl font-semibold mb-2">Atividade GitHub</h3>
                </div>
                <div class="flex justify-center gap-8 flex-wrap" id="github-metrics">
                    <!-- Será preenchido dinamicamente -->
                </div>
            </div>
        </section>`;

        // Insere após a seção de projetos
        const projectsSection = document.querySelector('#projetos-destaque') || 
                               document.querySelector('h2:contains("Projetos")')?.closest('section');
        
        if (projectsSection) {
            projectsSection.insertAdjacentHTML('afterend', statsHtml);
        }
    }

    animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const options = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    setupVisitorCounter() {
        // Contador simples de visitantes (localStorage)
        const visits = localStorage.getItem('portfolio-visits') || 0;
        const newVisits = parseInt(visits) + 1;
        localStorage.setItem('portfolio-visits', newVisits);
        
        // Adiciona contador de visualizações
        const visitorBadge = `
        <div class="fixed bottom-4 left-4 glass px-3 py-2 rounded-lg text-sm z-50">
            <i class="fas fa-eye mr-2"></i>
            <span id="visitor-count">${newVisits}</span> visualizações
        </div>`;
        
        document.body.insertAdjacentHTML('beforeend', visitorBadge);
    }

    async addGitHubStats() {
        try {
            const response = await fetch('https://api.github.com/users/ManoAlee');
            const data = await response.json();
            
            const reposResponse = await fetch('https://api.github.com/users/ManoAlee/repos');
            const repos = await reposResponse.json();
            
            const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
            
            const githubMetrics = document.getElementById('github-metrics');
            if (githubMetrics) {
                githubMetrics.innerHTML = `
                    <div class="text-center">
                        <div class="text-2xl font-bold text-primary">${data.public_repos}</div>
                        <div class="text-sm text-gray-400">Repositórios</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-accent">${totalStars}</div>
                        <div class="text-sm text-gray-400">Stars</div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold text-success">${data.followers}</div>
                        <div class="text-sm text-gray-400">Seguidores</div>
                    </div>
                `;
            }
        } catch (error) {
            console.warn('GitHub Stats indisponíveis:', error.message);
        }
    }
}

// Inicializar quando DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioStats();
});