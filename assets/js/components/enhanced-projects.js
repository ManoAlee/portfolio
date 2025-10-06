// Enhanced Projects Showcase
class ProjectsShowcase {
    constructor() {
        this.projects = [
            {
                id: 'infrastructure-project',
                title: 'Projeto de Estudo - Infraestrutura Windows',
                category: 'Infrastructure',
                description: 'Projeto acadêmico de infraestrutura Windows Server com Active Directory e virtualização para aprendizado.',
                longDescription: 'Projeto de estudo sobre infraestrutura de TI incluindo conceitos de Windows Server 2019/2022, Active Directory Domain Services, Group Policy Objects, DNS/DHCP e virtualização. Desenvolvido como laboratório de aprendizado para demonstrar conhecimentos em administração de sistemas Windows.',
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
                technologies: ['Windows Server', 'Active Directory', 'VMware', 'PowerShell', 'DNS/DHCP'],
                features: [
                    'Active Directory Domain Services',
                    'Group Policy Management',
                    'File Server com permissões avançadas',
                    'Backup automatizado',
                    'Monitoramento de performance'
                ],
                metrics: {
                    users: 'Laboratório',
                    uptime: 'Estudo',
                    performance: 'Conceitual'
                },
                status: 'Projeto de Estudo',
                duration: '3 meses',
                role: 'Estudante de TI',
                challenges: 'Aprender conceitos de infraestrutura Windows',
                solution: 'Ambiente de laboratório virtualizado para prática',
                links: {
                    demo: '#',
                    github: 'https://github.com/ManoAlee/infrastructure-docs',
                    documentation: '/pages/infraestrutura-corporativa.html'
                }
            },
            {
                id: 'powerbi-dashboard',
                title: 'Dashboard Power BI - Exemplo',
                category: 'Analytics',
                description: 'Exemplo de dashboard Power BI para demonstração de habilidades em análise de dados e visualização.',
                longDescription: 'Projeto exemplo de dashboard em Power BI desenvolvido para demonstrar conhecimentos em análise de dados. Utiliza dados de exemplo para criar visualizações interativas, medidas DAX básicas e demonstrar conceitos de business intelligence para fins educacionais e de portfolio.',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
                technologies: ['Power BI', 'DAX', 'SQL Server', 'Power Query', 'Azure'],
                features: [
                    'KPIs executivos interativos',
                    'Análise de tendências temporais',
                    'Drill-down multi-dimensional',
                    'Alertas automatizados',
                    'Mobile-responsive design'
                ],
                metrics: {
                    datasources: 'Exemplo',
                    reports: 'Demo',
                    users: 'Portfolio'
                },
                status: 'Projeto de Demonstração',
                duration: '2 meses',
                role: 'Estudante',
                challenges: 'Aprender Power BI e conceitos de BI',
                solution: 'Prática com dados de exemplo e tutoriais',
                links: {
                    demo: '/pages/dashboard.html',
                    github: '#',
                    documentation: '#'
                }
            },
            {
                id: 'automation-scripts',
                title: 'Scripts PowerShell - Estudo',
                category: 'Automation',
                description: 'Scripts PowerShell desenvolvidos para aprendizado de automação e administração de sistemas.',
                longDescription: 'Coleção de scripts PowerShell desenvolvidos durante os estudos para aprender automação de tarefas administrativas básicas. Inclui scripts de exemplo para gerenciamento de arquivos, relatórios simples do sistema e conceitos básicos de Active Directory para fins educacionais.',
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
                technologies: ['PowerShell', 'Active Directory', 'Windows Server', 'Task Scheduler'],
                features: [
                    'Criação em massa de usuários AD',
                    'Relatórios automatizados de sistema',
                    'Backup inteligente com rotação',
                    'Monitoramento proativo de serviços',
                    'Limpeza automática de logs'
                ],
                metrics: {
                    scripts: '8',
                    timesSaved: 'Aprendizado',
                    errorReduction: 'Conceitual'
                },
                status: 'Projeto de Aprendizado',
                duration: '2 meses',
                role: 'Estudante',
                challenges: 'Aprender PowerShell e conceitos de automação',
                solution: 'Prática com scripts simples e documentação',
                links: {
                    demo: '#',
                    github: 'https://github.com/ManoAlee/powershell-automation',
                    documentation: '#'
                }
            },
            {
                id: 'portfolio-website',
                title: 'Portfolio Interativo',
                category: 'Web Development',
                description: 'Website portfolio moderno com animações, PWA e performance otimizada.',
                longDescription: 'Desenvolvimento de portfolio pessoal com foco em performance e experiência do usuário. Implementação de PWA com Service Worker, lazy loading, animações CSS/JS, tema dark/light, responsividade completa e otimizações SEO. Arquitetura modular e componentizada.',
                image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
                technologies: ['HTML5', 'CSS3', 'JavaScript', 'PWA', 'Service Worker'],
                features: [
                    'Progressive Web App (PWA)',
                    'Performance otimizada (95+ Lighthouse)',
                    'Animações e interatividade',
                    'Tema dark/light',
                    'Totalmente responsivo'
                ],
                metrics: {
                    lighthouse: '95+',
                    loadTime: '<2s',
                    accessibility: '100%'
                },
                status: 'Online',
                duration: '2 meses',
                role: 'Desenvolvedor Estudante',
                challenges: 'Performance em dispositivos móveis de baixa performance',
                solution: 'Lazy loading, code splitting e otimização de assets',
                links: {
                    demo: 'https://manoalee.github.io/portfolio/',
                    github: 'https://github.com/ManoAlee/portfolio',
                    documentation: '#'
                }
            }
        ];
        
        this.currentFilter = 'all';
        this.currentView = 'grid';
        this.init();
    }

    init() {
        this.enhanceProjectsSection();
        this.setupEventListeners();
    }

    enhanceProjectsSection() {
        const projectsSection = document.querySelector('#projects');
        if (!projectsSection) return;

        const enhancedHTML = `
            <div class="container py-16">
                <div class="text-center mb-12">
                    <h2 class="subtitle mb-4">Projetos em Destaque</h2>
                    <p class="text-gray-300 mb-8">Uma seleção dos meus principais projetos e conquistas profissionais</p>
                    
                    <!-- Project Filters -->
                    <div class="project-filters flex justify-center flex-wrap gap-4 mb-8">
                        <button class="filter-btn active" data-filter="all">
                            <i class="fas fa-th"></i> Todos
                        </button>
                        <button class="filter-btn" data-filter="Infrastructure">
                            <i class="fas fa-server"></i> Infraestrutura
                        </button>
                        <button class="filter-btn" data-filter="Analytics">
                            <i class="fas fa-chart-line"></i> Analytics
                        </button>
                        <button class="filter-btn" data-filter="Automation">
                            <i class="fas fa-robot"></i> Automação
                        </button>
                        <button class="filter-btn" data-filter="Web Development">
                            <i class="fas fa-code"></i> Desenvolvimento
                        </button>
                    </div>
                    
                    <!-- View Toggle -->
                    <div class="view-toggle">
                        <button class="view-btn active" data-view="grid">
                            <i class="fas fa-th-large"></i>
                        </button>
                        <button class="view-btn" data-view="list">
                            <i class="fas fa-list"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Projects Grid -->
                <div class="projects-container grid-view" id="projects-container">
                    ${this.renderProjects()}
                </div>
                
                <!-- Load More Button -->
                <div class="text-center mt-12">
                    <button class="btn btn-outline load-more-btn">
                        <i class="fas fa-plus"></i>
                        Ver Mais Projetos
                    </button>
                </div>
            </div>
        `;

        projectsSection.innerHTML = enhancedHTML;
    }

    renderProjects() {
        return this.projects.map(project => `
            <div class="project-card ${this.currentView}-view" data-category="${project.category}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    <div class="project-overlay">
                        <div class="project-actions">
                            <button class="action-btn" onclick="projectsShowcase.viewProject('${project.id}')">
                                <i class="fas fa-eye"></i>
                            </button>
                            ${project.links.demo !== '#' ? `
                                <a href="${project.links.demo}" target="_blank" class="action-btn">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                            ` : ''}
                            ${project.links.github !== '#' ? `
                                <a href="${project.links.github}" target="_blank" class="action-btn">
                                    <i class="fab fa-github"></i>
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
                
                <div class="project-content">
                    <div class="project-header">
                        <div class="project-category">${project.category}</div>
                        <div class="project-status status-${project.status.toLowerCase().replace(/\s+/g, '-')}">${project.status}</div>
                    </div>
                    
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    
                    <div class="project-technologies">
                        ${project.technologies.slice(0, 3).map(tech => `
                            <span class="tech-tag">${tech}</span>
                        `).join('')}
                        ${project.technologies.length > 3 ? `
                            <span class="tech-more">+${project.technologies.length - 3}</span>
                        ` : ''}
                    </div>
                    
                    <div class="project-metrics">
                        ${Object.entries(project.metrics).map(([key, value]) => `
                            <div class="metric-item">
                                <div class="metric-value">${value}</div>
                                <div class="metric-label">${this.getMetricLabel(key)}</div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="project-footer">
                        <button class="btn btn-sm btn-primary" onclick="projectsShowcase.viewProject('${project.id}')">
                            Ver Detalhes
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.currentTarget.dataset.filter;
                this.setActiveFilter(filter);
                this.filterProjects(filter);
            });
        });

        // View toggle
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.setActiveView(view);
                this.changeView(view);
            });
        });
    }

    setActiveFilter(filter) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.currentFilter = filter;
    }

    setActiveView(view) {
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        this.currentView = view;
    }

    filterProjects(category) {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const shouldShow = category === 'all' || card.dataset.category === category;
            
            if (shouldShow) {
                card.style.display = '';
                card.classList.add('animate-in');
            } else {
                card.style.display = 'none';
                card.classList.remove('animate-in');
            }
        });
    }

    changeView(view) {
        const container = document.getElementById('projects-container');
        const projectCards = document.querySelectorAll('.project-card');
        
        container.className = `projects-container ${view}-view`;
        
        projectCards.forEach(card => {
            card.className = `project-card ${view}-view`;
        });
    }

    viewProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        // Create and show project modal
        this.showProjectModal(project);
    }

    showProjectModal(project) {
        const modalHTML = `
            <div class="project-modal-overlay" onclick="projectsShowcase.closeModal()">
                <div class="project-modal" onclick="event.stopPropagation()">
                    <button class="modal-close" onclick="projectsShowcase.closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                    
                    <div class="modal-content">
                        <div class="modal-header">
                            <img src="${project.image}" alt="${project.title}" class="modal-image">
                            <div class="modal-title-section">
                                <h2 class="modal-title">${project.title}</h2>
                                <div class="modal-meta">
                                    <span class="project-category">${project.category}</span>
                                    <span class="project-duration">${project.duration}</span>
                                    <span class="project-role">${project.role}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="modal-body">
                            <div class="project-description-full">
                                <h3>Sobre o Projeto</h3>
                                <p>${project.longDescription}</p>
                            </div>
                            
                            <div class="project-details-grid">
                                <div class="project-features">
                                    <h4>Principais Funcionalidades</h4>
                                    <ul>
                                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                                    </ul>
                                </div>
                                
                                <div class="project-tech-full">
                                    <h4>Tecnologias Utilizadas</h4>
                                    <div class="tech-tags-full">
                                        ${project.technologies.map(tech => `
                                            <span class="tech-tag-full">${tech}</span>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                            
                            <div class="project-challenges">
                                <h4>Desafios e Soluções</h4>
                                <div class="challenge-solution">
                                    <div class="challenge">
                                        <strong>Desafio:</strong> ${project.challenges}
                                    </div>
                                    <div class="solution">
                                        <strong>Solução:</strong> ${project.solution}
                                    </div>
                                </div>
                            </div>
                            
                            <div class="project-links-full">
                                ${Object.entries(project.links).map(([type, url]) => 
                                    url !== '#' ? `
                                        <a href="${url}" target="_blank" class="btn btn-outline">
                                            <i class="fas fa-${this.getLinkIcon(type)}"></i>
                                            ${this.getLinkLabel(type)}
                                        </a>
                                    ` : ''
                                ).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.body.classList.add('modal-open');
    }

    closeModal() {
        const modal = document.querySelector('.project-modal-overlay');
        if (modal) {
            modal.remove();
            document.body.classList.remove('modal-open');
        }
    }

    getMetricLabel(key) {
        const labels = {
            'users': 'Usuários',
            'uptime': 'Uptime',
            'performance': 'Performance',
            'datasources': 'Fontes',
            'reports': 'Relatórios',
            'scripts': 'Scripts',
            'timesSaved': 'Tempo Poupado',
            'errorReduction': 'Redução Erros',
            'lighthouse': 'Lighthouse',
            'loadTime': 'Load Time',
            'accessibility': 'Acessibilidade'
        };
        return labels[key] || key;
    }

    getLinkIcon(type) {
        const icons = {
            'demo': 'eye',
            'github': 'code-branch',
            'documentation': 'book'
        };
        return icons[type] || 'external-link-alt';
    }

    getLinkLabel(type) {
        const labels = {
            'demo': 'Ver Demo',
            'github': 'Ver Código',
            'documentation': 'Documentação'
        };
        return labels[type] || type;
    }
}

// Exporta para uso global
window.EnhancedProjects = ProjectsShowcase;
window.ProjectsShowcase = ProjectsShowcase;

// Exporta para uso global (classe apenas) — instanciação deixada para o inicializador universal
window.EnhancedProjects = ProjectsShowcase;
window.ProjectsShowcase = ProjectsShowcase;