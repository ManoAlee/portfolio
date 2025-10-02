// ===== INTERACTIVE TIMELINE =====
class InteractiveTimeline {
    constructor() {
        this.timelineData = [
            {
                year: '2025',
                title: 'Assistente de TI JR',
                company: 'Automotion',
                type: 'work',
                current: true,
                description: 'Infraestrutura de TI, virtualização e automação',
                skills: ['Windows Server', 'Linux', 'PowerShell', 'Azure'],
                icon: 'fas fa-server'
            },
            {
                year: '2025',
                title: 'Graduação em GTI',
                company: 'FATEC Tatuí',
                type: 'education',
                current: false,
                description: 'Conclusão do curso de Gestão da Tecnologia da Informação',
                skills: ['Gestão de TI', 'Análise de Dados', 'Desenvolvimento'],
                icon: 'fas fa-graduation-cap'
            },
            {
                year: '2024',
                title: 'Assistente de Produção',
                company: 'Bellacor',
                type: 'work',
                current: false,
                description: 'Controle de qualidade e processos industriais',
                skills: ['Qualidade', 'Processos', 'Organização'],
                icon: 'fas fa-industry'
            },
            {
                year: '2024',
                title: 'Analista de Rede Jr',
                company: 'BR Conecta',
                type: 'work',
                current: false,
                description: 'Suporte técnico e atendimento ao cliente',
                skills: ['Suporte', 'Redes', 'Atendimento'],
                icon: 'fas fa-network-wired'
            },
            {
                year: '2023',
                title: 'Assistente Administrativo',
                company: 'Schmersal Brasil',
                type: 'work',
                current: false,
                description: 'Controle de qualidade e documentação',
                skills: ['Administração', 'Documentação', 'Auditoria'],
                icon: 'fas fa-clipboard-check'
            },
            {
                year: '2022',
                title: 'Início da Graduação',
                company: 'FATEC Tatuí',
                type: 'education',
                current: false,
                description: 'Início dos estudos em GTI',
                skills: ['Fundamentos TI', 'Programação', 'Banco de Dados'],
                icon: 'fas fa-book'
            }
        ];
        this.init();
    }

    init() {
        this.createTimelineSection();
        this.setupInteractions();
        this.addTimelineStyles();
    }

    createTimelineSection() {
        const timelineHtml = `
        <!-- Timeline Interativa -->
        <section class="container py-16">
            <div class="text-center mb-12">
                <h2 class="subtitle">Minha Jornada Profissional</h2>
                <p class="text-gray-400">Clique nos marcos para ver detalhes</p>
            </div>
            
            <div class="timeline-container max-w-4xl mx-auto">
                <!-- Linha principal -->
                <div class="timeline-line"></div>
                
                <!-- Marcos da timeline -->
                <div class="timeline-items">
                    ${this.timelineData.map((item, index) => this.createTimelineItem(item, index)).join('')}
                </div>
                
                <!-- Painel de detalhes -->
                <div class="timeline-details glass p-6 rounded-lg mt-8 hidden" id="timeline-details">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="timeline-detail-icon">
                            <i class="fas fa-briefcase text-primary"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-semibold" id="detail-title">Título</h3>
                            <p class="text-primary" id="detail-company">Empresa</p>
                            <p class="text-sm text-gray-400" id="detail-year">Ano</p>
                        </div>
                    </div>
                    
                    <p class="text-gray-300 mb-4" id="detail-description">Descrição</p>
                    
                    <div class="timeline-skills" id="detail-skills">
                        <!-- Skills serão inseridas aqui -->
                    </div>
                </div>
            </div>
        </section>`;

        // Insere após seção de experiência ou antes de projetos
        const targetSection = document.querySelector('h2:contains("Projetos")')?.closest('section') ||
                             document.querySelector('.container.py-16');
        
        if (targetSection) {
            targetSection.insertAdjacentHTML('beforebegin', timelineHtml);
        }
    }

    createTimelineItem(item, index) {
        const position = index % 2 === 0 ? 'left' : 'right';
        
        return `
        <div class="timeline-item timeline-${position} ${item.current ? 'current' : ''}" 
             data-index="${index}">
            <div class="timeline-marker ${item.type}">
                <i class="${item.icon}"></i>
            </div>
            
            <div class="timeline-card card hover-lift cursor-pointer">
                <div class="timeline-year">${item.year}</div>
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-company">${item.company}</p>
                
                ${item.current ? '<div class="timeline-badge">Atual</div>' : ''}
                
                <div class="timeline-preview">
                    <p class="text-sm text-gray-400">${item.description.substring(0, 50)}...</p>
                </div>
            </div>
        </div>`;
    }

    setupInteractions() {
        const items = document.querySelectorAll('.timeline-item');
        const details = document.getElementById('timeline-details');
        
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                // Remove active class from all items
                items.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Show details
                this.showDetails(this.timelineData[index]);
                
                // Scroll to details
                details.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });

        // Auto-select first item
        if (items.length > 0) {
            items[0].click();
        }
    }

    showDetails(item) {
        const details = document.getElementById('timeline-details');
        const detailIcon = details.querySelector('.timeline-detail-icon i');
        const detailTitle = document.getElementById('detail-title');
        const detailCompany = document.getElementById('detail-company');
        const detailYear = document.getElementById('detail-year');
        const detailDescription = document.getElementById('detail-description');
        const detailSkills = document.getElementById('detail-skills');
        
        // Update content
        detailIcon.className = item.icon + ' text-primary';
        detailTitle.textContent = item.title;
        detailCompany.textContent = item.company;
        detailYear.textContent = item.year;
        detailDescription.textContent = item.description;
        
        // Update skills
        detailSkills.innerHTML = item.skills.map(skill => 
            `<span class="tag tag-primary text-sm">${skill}</span>`
        ).join(' ');
        
        // Show details with animation
        details.classList.remove('hidden');
        details.style.opacity = '0';
        details.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            details.style.transition = 'all 0.3s ease';
            details.style.opacity = '1';
            details.style.transform = 'translateY(0)';
        }, 10);
    }

    addTimelineStyles() {
        const styles = `
        <style>
        .timeline-container {
            position: relative;
        }
        
        .timeline-line {
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 4px;
            background: linear-gradient(to bottom, var(--primary), var(--accent));
            border-radius: 2px;
            transform: translateX(-50%);
        }
        
        .timeline-items {
            position: relative;
            z-index: 2;
        }
        
        .timeline-item {
            position: relative;
            margin-bottom: 3rem;
            display: flex;
            align-items: center;
        }
        
        .timeline-left {
            justify-content: flex-end;
            padding-right: 2rem;
        }
        
        .timeline-right {
            justify-content: flex-start;
            padding-left: 2rem;
        }
        
        .timeline-left .timeline-card {
            margin-right: 2rem;
            text-align: right;
        }
        
        .timeline-right .timeline-card {
            margin-left: 2rem;
        }
        
        .timeline-marker {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            z-index: 3;
            border: 4px solid var(--background);
        }
        
        .timeline-marker.work {
            background: var(--primary);
            color: white;
        }
        
        .timeline-marker.education {
            background: var(--accent);
            color: white;
        }
        
        .timeline-card {
            max-width: 300px;
            padding: 1.5rem;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        
        .timeline-card:hover {
            border-color: var(--primary);
        }
        
        .timeline-item.active .timeline-card {
            border-color: var(--primary);
            background: rgba(79, 70, 229, 0.1);
        }
        
        .timeline-item.current .timeline-marker {
            animation: pulse 2s infinite;
            box-shadow: 0 0 20px var(--primary);
        }
        
        .timeline-year {
            font-size: 0.875rem;
            color: var(--primary);
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .timeline-title {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 0.25rem;
        }
        
        .timeline-company {
            color: var(--accent);
            font-size: 0.9rem;
            margin-bottom: 0.75rem;
        }
        
        .timeline-badge {
            display: inline-block;
            background: var(--primary);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.75rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .timeline-detail-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: rgba(79, 70, 229, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
        }
        
        @keyframes pulse {
            0%, 100% { transform: translateX(-50%) scale(1); }
            50% { transform: translateX(-50%) scale(1.1); }
        }
        
        /* Responsivo */
        @media (max-width: 768px) {
            .timeline-line {
                left: 25px;
            }
            
            .timeline-marker {
                left: 25px;
                width: 40px;
                height: 40px;
            }
            
            .timeline-item {
                padding-left: 60px;
                justify-content: flex-start;
            }
            
            .timeline-left,
            .timeline-right {
                padding: 0;
            }
            
            .timeline-left .timeline-card,
            .timeline-right .timeline-card {
                margin: 0;
                text-align: left;
                max-width: none;
            }
        }
        </style>`;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Inicializar quando DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveTimeline();
});