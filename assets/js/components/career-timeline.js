// Interactive Career Timeline
class CareerTimeline {
    constructor() {
        this.timelineData = [
            {
                year: '2024-Atual',
                title: 'Assistente de TI JR',
                company: 'Automotion',
                type: 'work',
                status: 'current',
                description: 'Atuação em suporte técnico, administração de sistemas e manutenção de infraestrutura de TI.',
                achievements: [
                    'Suporte técnico aos usuários finais',
                    'Manutenção de sistemas Windows Server',
                    'Administração do Active Directory',
                    'Resolução de incidentes de TI'
                ],
                technologies: ['Windows Server', 'Active Directory', 'Office 365', 'Suporte Técnico'],
                icon: 'fas fa-server'
            },
            {
                year: '2022-2024',
                title: 'Tecnólogo em GTI',
                company: 'FATEC Tatuí',
                type: 'education',
                status: 'completed',
                description: 'Graduação em Gestão da Tecnologia da Informação com foco em infraestrutura e gestão de TI.',
                achievements: [
                    'Conclusão do curso de GTI',
                    'Projetos acadêmicos em infraestrutura',
                    'Aprendizado em Power BI e análise de dados',
                    'Base sólida em sistemas operacionais'
                ],
                technologies: ['Power BI', 'Windows Server', 'Linux', 'Redes'],
                icon: 'fas fa-graduation-cap'
            },
            {
                year: '2023',
                title: 'Desenvolvimento de Portfólio',
                company: 'Projetos Pessoais',
                type: 'project',
                status: 'completed',
                description: 'Desenvolvimento de projetos pessoais para aprimoramento de habilidades técnicas.',
                achievements: [
                    'Criação de portfolio profissional',
                    'Scripts de automação em PowerShell',
                    'Dashboards em Power BI',
                    'Estudos em virtualização'
                ],
                technologies: ['HTML/CSS/JS', 'PowerShell', 'Power BI', 'Git'],
                icon: 'fas fa-code'
            },
            {
                year: '2022-2023',
                title: 'Analista de Qualidade',
                company: 'Schmersal',
                type: 'work',
                status: 'completed',
                description: 'Controle de qualidade industrial, auditoria de processos e elaboração de relatórios.',
                achievements: [
                    'Implementação de sistemas de qualidade',
                    'Auditoria de processos industriais',
                    'Desenvolvimento de planilhas de controle',
                    'Redução de não-conformidades em 25%'
                ],
                technologies: ['Excel Avançado', 'SPC', 'ISO 9001', 'Minitab'],
                icon: 'fas fa-clipboard-check'
            },
            {
                year: '2021',
                title: 'Assistente Administrativo',
                company: 'SENAC',
                type: 'education',
                status: 'completed',
                description: 'Especialização em processos administrativos e gestão da qualidade.',
                achievements: [
                    'Certificação em Assistente Administrativo',
                    'Gestão de processos industriais',
                    'Controle de qualidade',
                    'Atendimento ao cliente'
                ],
                technologies: ['Office Suite', 'Processos Administrativos', 'Gestão da Qualidade'],
                icon: 'fas fa-certificate'
            }
        ];
        
        this.activeItem = null;
        this.init();
    }

    init() {
        this.createTimelineSection();
        this.setupEventListeners();
        this.setupIntersectionObserver();
    }

    createTimelineSection() {
        const timelineHTML = `
            <section class="career-timeline-section py-20 bg-gradient-to-b from-transparent to-primary/5">
                <div class="container">
                    <div class="text-center mb-12">
                        <h2 class="subtitle mb-4">Minha Jornada Profissional</h2>
                        <p class="text-gray-300">Uma timeline interativa da minha carreira e formação</p>
                    </div>
                    
                    <div class="timeline-container max-w-4xl mx-auto">
                        <div class="timeline-line"></div>
                        ${this.timelineData.map((item, index) => `
                            <div class="timeline-item ${item.status}" data-index="${index}">
                                <div class="timeline-marker">
                                    <div class="timeline-icon ${item.type}">
                                        <i class="${item.icon}"></i>
                                    </div>
                                </div>
                                
                                <div class="timeline-content ${index % 2 === 0 ? 'left' : 'right'}">
                                    <div class="timeline-card">
                                        <div class="timeline-header">
                                            <div class="timeline-year">${item.year}</div>
                                            <div class="timeline-badge ${item.type}">${this.getTypeLabel(item.type)}</div>
                                        </div>
                                        
                                        <h3 class="timeline-title">${item.title}</h3>
                                        <h4 class="timeline-company">${item.company}</h4>
                                        <p class="timeline-description">${item.description}</p>
                                        
                                        <div class="timeline-achievements">
                                            <h5>Principais Conquistas:</h5>
                                            <ul>
                                                ${item.achievements.map(achievement => `
                                                    <li>${achievement}</li>
                                                `).join('')}
                                            </ul>
                                        </div>
                                        
                                        <div class="timeline-technologies">
                                            <h5>Tecnologias:</h5>
                                            <div class="tech-tags">
                                                ${item.technologies.map(tech => `
                                                    <span class="tech-tag">${tech}</span>
                                                `).join('')}
                                            </div>
                                        </div>
                                        
                                        <button class="timeline-expand-btn">
                                            <span class="expand-text">Ver mais</span>
                                            <i class="fas fa-chevron-down expand-icon"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- Timeline Navigation -->
                    <div class="timeline-nav flex justify-center mt-12">
                        <div class="timeline-dots">
                            ${this.timelineData.map((item, index) => `
                                <button class="timeline-dot ${index === 0 ? 'active' : ''}" 
                                        data-index="${index}" 
                                        title="${item.year} - ${item.title}">
                                    <i class="${item.icon}"></i>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Insert after projects or before contact section
        const projectsSection = document.querySelector('#projects');
        const contactSection = document.querySelector('#contact');
        
        if (projectsSection) {
            projectsSection.insertAdjacentHTML('afterend', timelineHTML);
        } else if (contactSection) {
            contactSection.insertAdjacentHTML('beforebegin', timelineHTML);
        }
    }

    setupEventListeners() {
        // Expand/collapse timeline items
        const expandBtns = document.querySelectorAll('.timeline-expand-btn');
        expandBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const timelineItem = e.target.closest('.timeline-item');
                this.toggleTimelineItem(timelineItem);
            });
        });

        // Timeline dot navigation
        const dots = document.querySelectorAll('.timeline-dot');
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                this.scrollToTimelineItem(index);
                this.setActiveDot(index);
            });
        });
    }

    setupIntersectionObserver() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    const index = parseInt(entry.target.dataset.index);
                    this.setActiveDot(index);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-50px 0px'
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    toggleTimelineItem(item) {
        const isExpanded = item.classList.contains('expanded');
        
        // Close all other items
        document.querySelectorAll('.timeline-item.expanded').forEach(expandedItem => {
            if (expandedItem !== item) {
                expandedItem.classList.remove('expanded');
            }
        });

        // Toggle current item
        item.classList.toggle('expanded');
        
        const expandBtn = item.querySelector('.timeline-expand-btn');
        const expandText = expandBtn.querySelector('.expand-text');
        const expandIcon = expandBtn.querySelector('.expand-icon');
        
        if (item.classList.contains('expanded')) {
            expandText.textContent = 'Ver menos';
            expandIcon.style.transform = 'rotate(180deg)';
        } else {
            expandText.textContent = 'Ver mais';
            expandIcon.style.transform = 'rotate(0deg)';
        }
    }

    scrollToTimelineItem(index) {
        const targetItem = document.querySelector(`[data-index="${index}"]`);
        if (targetItem) {
            targetItem.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }

    setActiveDot(index) {
        const dots = document.querySelectorAll('.timeline-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    getTypeLabel(type) {
        const labels = {
            'work': 'Trabalho',
            'education': 'Formação',
            'project': 'Projeto',
            'certification': 'Certificação'
        };
        return labels[type] || type;
    }
}

// Exporta para uso global
window.CareerTimeline = CareerTimeline;
// Exporta para uso global (classe apenas) — instanciação deixada para o inicializador universal
window.CareerTimeline = CareerTimeline;