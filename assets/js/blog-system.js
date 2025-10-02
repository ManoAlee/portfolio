// ===== INTERNAL BLOG SYSTEM =====
class BlogSystem {
    constructor() {
        this.posts = [];
        this.currentCategory = 'all';
        this.init();
    }

    init() {
        this.loadBlogPosts();
        this.createBlogSection();
        this.setupEventListeners();
    }

    loadBlogPosts() {
        // Posts de exemplo - em produção viriam de um CMS ou API
        this.posts = [
            {
                id: 1,
                title: "Como Implementei um Dashboard de Monitoramento",
                excerpt: "Processo completo de criação de um dashboard em tempo real para monitoramento de sistemas.",
                content: "Durante meu projeto de conclusão de curso, desenvolvi um dashboard completo...",
                category: "projetos",
                tags: ["dashboard", "monitoramento", "javascript"],
                date: "2024-12-01",
                readTime: "5 min",
                image: "/assets/images/blog/dashboard-project.jpg"
            },
            {
                id: 2,
                title: "Automatização de Relatórios com Python",
                excerpt: "Como automatizar a geração de relatórios usando Python e bibliotecas de análise de dados.",
                content: "A automatização de processos é fundamental na TI moderna...",
                category: "tutoriais",
                tags: ["python", "automacao", "dados"],
                date: "2024-11-28",
                readTime: "7 min",
                image: "/assets/images/blog/python-automation.jpg"
            },
            {
                id: 3,
                title: "Minha Jornada na FATEC Tatuí",
                excerpt: "Reflexões sobre os 3 anos de graduação em Gestão da Tecnologia da Informação.",
                content: "Durante os três anos na FATEC, tive oportunidade de...",
                category: "carreira",
                tags: ["educacao", "fatec", "experiencia"],
                date: "2024-11-25",
                readTime: "4 min",
                image: "/assets/images/blog/fatec-journey.jpg"
            },
            {
                id: 4,
                title: "Certificações Microsoft: Vale a Pena?",
                excerpt: "Análise das certificações Microsoft e como elas impactaram minha carreira.",
                content: "As certificações Microsoft têm sido um diferencial...",
                category: "carreira",
                tags: ["microsoft", "certificacoes", "carreira"],
                date: "2024-11-20",
                readTime: "6 min",
                image: "/assets/images/blog/microsoft-certs.jpg"
            }
        ];
    }

    createBlogSection() {
        // Adiciona seção do blog após os projetos
        const projectsSection = document.querySelector('#projects');
        if (projectsSection) {
            const blogHTML = `
            <section id="blog" class="py-20 bg-gray-900">
                <div class="container mx-auto px-4">
                    <div class="text-center mb-16">
                        <h2 class="text-4xl font-bold mb-4 gradient-text">
                            <i class="fas fa-blog mr-3"></i>Blog & Insights
                        </h2>
                        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
                            Compartilhando conhecimento, experiências e tutoriais sobre tecnologia
                        </p>
                    </div>

                    <!-- Filtros de Categoria -->
                    <div class="flex justify-center mb-12">
                        <div class="blog-filters flex flex-wrap gap-2" role="tablist">
                            <button class="filter-btn active" data-category="all">Todos</button>
                            <button class="filter-btn" data-category="projetos">Projetos</button>
                            <button class="filter-btn" data-category="tutoriais">Tutoriais</button>
                            <button class="filter-btn" data-category="carreira">Carreira</button>
                        </div>
                    </div>

                    <!-- Grid de Posts -->
                    <div id="blog-grid" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        ${this.generateBlogGrid()}
                    </div>

                    <!-- Botão Ver Mais -->
                    <div class="text-center mt-12">
                        <button id="load-more-posts" class="btn btn-outline btn-animated hidden">
                            <i class="fas fa-plus mr-2"></i>
                            Carregar Mais Posts
                        </button>
                    </div>
                </div>

                <!-- Modal do Post -->
                <div id="blog-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden flex items-center justify-center p-4">
                    <div class="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div id="modal-content">
                            <!-- Conteúdo será inserido dinamicamente -->
                        </div>
                    </div>
                </div>
            </section>`;

            projectsSection.insertAdjacentHTML('afterend', blogHTML);
        }
    }

    generateBlogGrid() {
        return this.posts.map(post => this.generatePostCard(post)).join('');
    }

    generatePostCard(post) {
        return `
        <article class="blog-card card transform hover:scale-105 transition-transform duration-300 cursor-pointer" 
                 data-post-id="${post.id}" data-category="${post.category}">
            <div class="relative">
                <div class="blog-image-placeholder bg-gradient-to-r from-indigo-500 to-purple-600 h-48 rounded-t-xl flex items-center justify-center">
                    <i class="fas fa-${this.getCategoryIcon(post.category)} text-4xl text-white opacity-50"></i>
                </div>
                <span class="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ${this.getCategoryName(post.category)}
                </span>
            </div>
            
            <div class="p-6">
                <div class="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span><i class="fas fa-calendar-alt mr-1"></i>${this.formatDate(post.date)}</span>
                    <span><i class="fas fa-clock mr-1"></i>${post.readTime}</span>
                </div>
                
                <h3 class="text-xl font-bold mb-3 text-white hover:text-indigo-400 transition-colors">
                    ${post.title}
                </h3>
                
                <p class="text-gray-300 mb-4 line-clamp-3">
                    ${post.excerpt}
                </p>
                
                <div class="flex flex-wrap gap-2 mb-4">
                    ${post.tags.map(tag => `
                        <span class="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">#${tag}</span>
                    `).join('')}
                </div>
                
                <button class="btn btn-primary btn-sm read-more-btn" data-post-id="${post.id}">
                    <i class="fas fa-arrow-right mr-2"></i>
                    Ler Mais
                </button>
            </div>
        </article>`;
    }

    setupEventListeners() {
        // Filtros de categoria
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                this.handleCategoryFilter(e.target);
            }

            // Abrir modal do post
            if (e.target.closest('.read-more-btn') || e.target.closest('.blog-card')) {
                const postId = e.target.closest('[data-post-id]')?.dataset.postId;
                if (postId) {
                    this.openPostModal(parseInt(postId));
                }
            }

            // Fechar modal
            if (e.target.id === 'blog-modal' || e.target.closest('.close-modal')) {
                this.closePostModal();
            }
        });

        // Tecla ESC para fechar modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePostModal();
            }
        });
    }

    handleCategoryFilter(button) {
        // Remove active de todos os botões
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Adiciona active no botão clicado
        button.classList.add('active');

        // Atualiza categoria atual
        this.currentCategory = button.dataset.category;

        // Filtra posts
        this.filterPosts();
    }

    filterPosts() {
        const posts = document.querySelectorAll('.blog-card');
        
        posts.forEach(post => {
            const postCategory = post.dataset.category;
            const shouldShow = this.currentCategory === 'all' || postCategory === this.currentCategory;
            
            if (shouldShow) {
                post.style.display = 'block';
                post.classList.add('animate-fade-in');
            } else {
                post.style.display = 'none';
                post.classList.remove('animate-fade-in');
            }
        });
    }

    openPostModal(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        const modalContent = `
        <div class="relative">
            <button class="close-modal absolute top-4 right-4 text-gray-400 hover:text-white z-10">
                <i class="fas fa-times text-2xl"></i>
            </button>
            
            <div class="blog-image-placeholder bg-gradient-to-r from-indigo-500 to-purple-600 h-64 rounded-t-xl flex items-center justify-center">
                <i class="fas fa-${this.getCategoryIcon(post.category)} text-6xl text-white opacity-50"></i>
            </div>
            
            <div class="p-8">
                <div class="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span class="bg-indigo-600 text-white px-3 py-1 rounded-full font-medium">
                        ${this.getCategoryName(post.category)}
                    </span>
                    <span><i class="fas fa-calendar-alt mr-1"></i>${this.formatDate(post.date)}</span>
                    <span><i class="fas fa-clock mr-1"></i>${post.readTime}</span>
                </div>
                
                <h1 class="text-3xl font-bold text-white mb-6">${post.title}</h1>
                
                <div class="prose prose-lg prose-invert max-w-none">
                    ${this.generateFullContent(post)}
                </div>
                
                <div class="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-700">
                    ${post.tags.map(tag => `
                        <span class="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">#${tag}</span>
                    `).join('')}
                </div>
                
                <div class="mt-8 pt-6 border-t border-gray-700 text-center">
                    <p class="text-gray-400 mb-4">Gostou do conteúdo? Vamos conectar!</p>
                    <div class="flex justify-center gap-4">
                        <a href="https://linkedin.com/in/alessandro-meneses-2425ab231" class="btn btn-outline btn-sm">
                            <i class="fab fa-linkedin mr-2"></i>LinkedIn
                        </a>
                        <a href="https://github.com/ManoAlee" class="btn btn-outline btn-sm">
                            <i class="fab fa-github mr-2"></i>GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>`;

        document.getElementById('modal-content').innerHTML = modalContent;
        document.getElementById('blog-modal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closePostModal() {
        document.getElementById('blog-modal').classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    generateFullContent(post) {
        // Conteúdo expandido baseado no post
        const contentMap = {
            1: `
            <p>Durante meu projeto de conclusão de curso na FATEC Tatuí, desenvolvi um dashboard completo de monitoramento de sistemas que revolucionou a forma como nossa equipe acompanha a infraestrutura de TI.</p>
            
            <h3>O Desafio</h3>
            <p>A necessidade surgiu da dificuldade em monitorar múltiplos sistemas simultaneamente. Dados espalhados em diferentes ferramentas tornavam a análise lenta e reativa.</p>
            
            <h3>A Solução</h3>
            <p>Implementei um dashboard em tempo real usando:</p>
            <ul>
                <li><strong>Frontend:</strong> HTML5, CSS3, JavaScript ES6+</li>
                <li><strong>Backend:</strong> Python com Flask</li>
                <li><strong>Banco de Dados:</strong> SQLite para armazenamento local</li>
                <li><strong>APIs:</strong> Integração com sistemas de monitoramento</li>
            </ul>
            
            <h3>Resultados</h3>
            <p>O projeto resultou em 40% de redução no tempo de resposta a incidentes e melhor visibilidade dos KPIs de infraestrutura.</p>`,
            
            2: `
            <p>A automatização de processos é fundamental na TI moderna. Neste tutorial, compartilho como desenvolvi um sistema completo de geração automática de relatórios.</p>
            
            <h3>Por que Automatizar?</h3>
            <p>Relatórios manuais consomem tempo valioso e são propensos a erros. A automatização garante consistência e libera tempo para tarefas estratégicas.</p>
            
            <h3>Ferramentas Utilizadas</h3>
            <ul>
                <li><strong>Python:</strong> Linguagem principal</li>
                <li><strong>Pandas:</strong> Manipulação de dados</li>
                <li><strong>Matplotlib/Seaborn:</strong> Visualizações</li>
                <li><strong>ReportLab:</strong> Geração de PDFs</li>
            </ul>
            
            <h3>Implementação</h3>
            <p>O sistema coleta dados de múltiplas fontes, processa informações e gera relatórios personalizados automaticamente.</p>`,
            
            3: `
            <p>Durante os três anos na FATEC Tatuí, tive oportunidade de crescer profissionalmente e desenvolver competências técnicas sólidas.</p>
            
            <h3>Primeiro Ano - Fundamentos</h3>
            <p>Foco em conceitos básicos de TI, redes e programação. Descobri minha paixão por infraestrutura e análise de dados.</p>
            
            <h3>Segundo Ano - Especialização</h3>
            <p>Aprofundamento em tecnologias Microsoft, banco de dados e projetos práticos. Início dos estágios e experiência profissional.</p>
            
            <h3>Terceiro Ano - Consolidação</h3>
            <p>Projeto de conclusão, certificações e preparação para o mercado de trabalho. Desenvolvimento de soft skills e networking.</p>`,
            
            4: `
            <p>As certificações Microsoft têm sido um diferencial importante na minha carreira. Aqui analiso quais valem o investimento.</p>
            
            <h3>Certificações Obtidas</h3>
            <ul>
                <li><strong>Microsoft Excel 2016:</strong> Primeira certificação, fundamental para análise de dados</li>
                <li><strong>Power BI Fundamentals:</strong> Essencial para visualização de dados</li>
                <li><strong>Azure Fundamentals:</strong> Base para cloud computing</li>
            </ul>
            
            <h3>Impacto na Carreira</h3>
            <p>As certificações aumentaram minha credibilidade técnica e abriram portas para oportunidades mais desafiadoras.</p>
            
            <h3>Recomendações</h3>
            <p>Foque em certificações alinhadas com seus objetivos de carreira e que tenham aplicação prática no seu trabalho.</p>`
        };

        return contentMap[post.id] || post.content;
    }

    getCategoryIcon(category) {
        const icons = {
            projetos: 'code',
            tutoriais: 'book-open',
            carreira: 'briefcase',
            tecnologia: 'microchip'
        };
        return icons[category] || 'file-alt';
    }

    getCategoryName(category) {
        const names = {
            projetos: 'Projetos',
            tutoriais: 'Tutoriais',
            carreira: 'Carreira',
            tecnologia: 'Tecnologia'
        };
        return names[category] || category;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    }
}

// Adicionar estilos CSS para o blog
const blogStyles = `
<style>
.blog-filters {
    background: rgba(75, 85, 99, 0.1);
    padding: 8px;
    border-radius: 50px;
    backdrop-filter: blur(10px);
}

.filter-btn {
    padding: 8px 20px;
    border: none;
    background: transparent;
    color: #9CA3AF;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    font-weight: 500;
}

.filter-btn:hover {
    color: #FFFFFF;
    background: rgba(99, 102, 241, 0.2);
}

.filter-btn.active {
    background: linear-gradient(135deg, #6366F1, #8B5CF6);
    color: #FFFFFF;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.blog-card {
    background: rgba(31, 41, 55, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(75, 85, 99, 0.3);
    transition: all 0.3s ease;
}

.blog-card:hover {
    border-color: rgba(99, 102, 241, 0.5);
    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.1);
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.prose {
    color: #D1D5DB;
}

.prose h3 {
    color: #FFFFFF;
    margin-top: 2rem;
    margin-bottom: 1rem;
}

.prose p {
    margin-bottom: 1rem;
}

.prose ul {
    margin-bottom: 1rem;
}

.prose li {
    margin-bottom: 0.5rem;
}

.prose strong {
    color: #6366F1;
    font-weight: 600;
}
</style>`;

// Adicionar estilos ao head
document.head.insertAdjacentHTML('beforeend', blogStyles);

// Inicializar quando DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    new BlogSystem();
});