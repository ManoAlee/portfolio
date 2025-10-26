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
                image: '/assets/images/projects/infrastructure-project.jpg',
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
                image: '/assets/images/projects/powerbi-dashboard.jpg',
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
                    // Demo removido por privacidade
                    demo: '#',
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
                image: '/assets/images/projects/automation-scripts.jpg',
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
                image: '/assets/images/projects/portfolio-website.jpg',
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
                            ${this.getIconSvg('fa-th',18)} Todos
                        </button>
                        <button class="filter-btn" data-filter="Infrastructure">
                            ${this.getIconSvg('fa-server',18)} Infraestrutura
                        </button>
                        <button class="filter-btn" data-filter="Analytics">
                            ${this.getIconSvg('fa-chart-line',18)} Analytics
                        </button>
                        <button class="filter-btn" data-filter="Automation">
                            ${this.getIconSvg('fa-robot',18)} Automação
                        </button>
                        <button class="filter-btn" data-filter="Web Development">
                            ${this.getIconSvg('fa-code',18)} Desenvolvimento
                        </button>
                    </div>
                    
                    <!-- View Toggle -->
                    <div class="view-toggle">
                        <button class="view-btn active" data-view="grid">
                            ${this.getIconSvg('fa-th-large',18)}
                        </button>
                        <button class="view-btn" data-view="list">
                            ${this.getIconSvg('fa-list',18)}
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
                        ${this.getIconSvg('fa-plus',18)}
                        Ver Mais Projetos
                    </button>
                </div>
            </div>
        `;

        projectsSection.innerHTML = enhancedHTML;
    }

    renderProjects() {
        return this.projects.map(project => {
            // Oculta bloco de métricas se todos os valores forem zero ou falsy
            const hasMetrics = Object.values(project.metrics).some(v => v && v !== '0');
            return `
            <div class="project-card ${this.currentView}-view" data-category="${project.category}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    <div class="project-overlay">
                        <div class="project-actions">
                            <button class="action-btn" onclick="projectsShowcase.viewProject('${project.id}')">
                                ${this.getIconSvg('fa-eye',16)}
                            </button>
                            ${project.links.demo !== '#' ? `
                                <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="action-btn">
                                    ${this.getIconSvg('fa-external-link-alt',16)}
                                </a>
                            ` : ''}
                            ${project.links.github !== '#' ? `
                                <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="action-btn">
                                    ${this.getIconSvg('fa-github',16)}
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
                    
                    ${hasMetrics ? `<div class="project-metrics">
                        ${Object.entries(project.metrics).map(([key, value]) => (value && value !== '0') ? `
                            <div class="metric-item">
                                <div class="metric-value">${value}</div>
                                <div class="metric-label">${this.getMetricLabel(key)}</div>
                            </div>
                        ` : '').join('')}
                    </div>` : ''}
                    
                    <div class="project-footer">
                        <button class="btn btn-sm btn-primary" onclick="projectsShowcase.viewProject('${project.id}')">
                            Ver Detalhes
                        </button>
                    </div>
                </div>
            </div>
            `;
        }).join('');
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
                        ${this.getIconSvg('fa-times',18)}
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
                                        <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
                                            ${this.getIconSvg('fa-' + this.getLinkIcon(type),16)}
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

    /**
     * Retorna SVG inline para ícones usados no showcase
     */
    getIconSvg(icon, size = 16) {
        const s = size;
        const icons = {
            'fa-eye': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 11a4 4 0 110-8 4 4 0 010 8z"/></svg>`,
            'fa-external-link-alt': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zM5 5h5v2H7v10h10v-3h2v5H5V5z"/></svg>`,
            'fa-github': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.42-1.305.763-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.839 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.372.81 1.102.81 2.222 0 1.606-.015 2.902-.015 3.293 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z"/></svg>`,
            'fa-times': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.59 13.41 4.29 19.71 2.88 18.3 9.18 12 2.88 5.71 4.29 4.29 10.59 10.59 16.89 4.29z"/></svg>`,
            'fa-th': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/></svg>`,
            'fa-server': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 5h18v4H3zM3 11h18v4H3zM3 17h18v4H3z"/></svg>`,
            'fa-chart-line': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 17l6-6 4 4 8-8v10H3z"/></svg>`,
            'fa-robot': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a2 2 0 00-2 2v1H7a2 2 0 00-2 2v4h14V7a2 2 0 00-2-2h-3V4a2 2 0 00-2-2zM7 14v4h10v-4H7z"/></svg>`,
            'fa-code': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8.7 16.3L3.4 12 8.7 7.7 10.1 9.1 6.9 12l3.2 2.9-1.4 1.4zM15.3 7.7L20.6 12 15.3 16.3 13.9 14.9 17.1 12l-3.2-2.9 1.4-1.4z"/></svg>`,
            'fa-th-large': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/></svg>`,
            'fa-list': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/></svg>`,
            'fa-plus': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6z"/></svg>`,
            'default': `<svg class="icon" role="img" width="${s}" height="${s}" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"/></svg>`
        };

        const token = (icon || '').toString().split(' ').find(t => t.startsWith('fa-')) || icon;
        return icons[token] || icons['default'];
    }
}

// Exporta para uso global
window.EnhancedProjects = ProjectsShowcase;
window.ProjectsShowcase = ProjectsShowcase;

// Exporta para uso global (classe apenas) — instanciação deixada para o inicializador universal
window.EnhancedProjects = ProjectsShowcase;
window.ProjectsShowcase = ProjectsShowcase;