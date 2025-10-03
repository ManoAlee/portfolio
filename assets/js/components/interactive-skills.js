// Interactive Skills System
class InteractiveSkills {
    constructor() {
        this.skillsData = {
            'technical': {
                title: 'Habilidades Técnicas',
                icon: 'fas fa-code',
                skills: [
                    { name: 'Windows Server', level: 75, icon: 'fab fa-windows', category: 'Sistema' },
                    { name: 'Linux (Ubuntu)', level: 65, icon: 'fab fa-linux', category: 'Sistema' },
                    { name: 'Active Directory', level: 70, icon: 'fas fa-users', category: 'Infraestrutura' },
                    { name: 'Virtualização', level: 60, icon: 'fas fa-server', category: 'Infraestrutura' },
                    { name: 'Power BI', level: 80, icon: 'fas fa-chart-bar', category: 'Analytics' },
                    { name: 'SQL Básico', level: 65, icon: 'fas fa-database', category: 'Database' },
                    { name: 'Python (Básico)', level: 55, icon: 'fab fa-python', category: 'Programação' },
                    { name: 'HTML/CSS/JS', level: 70, icon: 'fab fa-js-square', category: 'Programação' }
                ]
            },
            'tools': {
                title: 'Ferramentas e Tecnologias',
                icon: 'fas fa-tools',
                skills: [
                    { name: 'Office 365', level: 85, icon: 'fas fa-file-office', category: 'Produtividade' },
                    { name: 'SharePoint (Básico)', level: 60, icon: 'fas fa-share-alt', category: 'Colaboração' },
                    { name: 'Git & GitHub', level: 70, icon: 'fab fa-git-alt', category: 'Versionamento' },
                    { name: 'PowerShell', level: 65, icon: 'fas fa-terminal', category: 'Automação' },
                    { name: 'Excel Avançado', level: 80, icon: 'fas fa-file-excel', category: 'Produtividade' },
                    { name: 'Suporte Técnico', level: 85, icon: 'fas fa-tools', category: 'Infraestrutura' }
                ]
            },
            'soft': {
                title: 'Soft Skills',
                icon: 'fas fa-users',
                skills: [
                    { name: 'Trabalho em Equipe', level: 85, icon: 'fas fa-handshake', category: 'Interpessoal' },
                    { name: 'Comunicação', level: 80, icon: 'fas fa-comments', category: 'Interpessoal' },
                    { name: 'Resolução de Problemas', level: 75, icon: 'fas fa-puzzle-piece', category: 'Analítica' },
                    { name: 'Organização', level: 85, icon: 'fas fa-tasks', category: 'Gestão' },
                    { name: 'Adaptabilidade', level: 85, icon: 'fas fa-sync-alt', category: 'Flexibilidade' },
                    { name: 'Aprendizado Contínuo', level: 90, icon: 'fas fa-graduation-cap', category: 'Desenvolvimento' }
                ]
            }
        };
        
        this.activeCategory = 'technical';
        this.init();
    }

    init() {
        this.createSkillsSection();
        this.setupEventListeners();
        this.displaySkills('technical');
    }

    createSkillsSection() {
        const skillsHTML = `
            <section class="interactive-skills-section py-20">
                <div class="container">
                    <div class="text-center mb-12">
                        <h2 class="subtitle mb-4">Minhas Competências</h2>
                        <p class="text-gray-300">Explore minhas habilidades por categoria</p>
                    </div>
                    
                    <!-- Category Tabs -->
                    <div class="skills-tabs flex justify-center mb-12">
                        ${Object.entries(this.skillsData).map(([key, data]) => `
                            <button class="skill-tab ${key === 'technical' ? 'active' : ''}" data-category="${key}">
                                <i class="${data.icon}"></i>
                                <span>${data.title}</span>
                            </button>
                        `).join('')}
                    </div>
                    
                    <!-- Skills Content -->
                    <div class="skills-content max-w-6xl mx-auto">
                        <div class="skills-grid" id="skills-grid">
                            <!-- Skills will be dynamically loaded here -->
                        </div>
                    </div>
                    
                    <!-- Skills Summary -->
                    <div class="skills-summary mt-12 text-center">
                        <div class="glass p-6 rounded-xl max-w-2xl mx-auto">
                            <h3 class="text-xl font-semibold mb-4">Resumo de Competências</h3>
                            <div class="flex justify-around items-center flex-wrap gap-4">
                                <div class="stat-item">
                                    <div class="stat-number text-2xl font-bold text-primary">25+</div>
                                    <div class="stat-label text-sm text-gray-400">Tecnologias</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-number text-2xl font-bold text-primary">3+</div>
                                    <div class="stat-label text-sm text-gray-400">Anos Experiência</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-number text-2xl font-bold text-primary">50+</div>
                                    <div class="stat-label text-sm text-gray-400">Projetos</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;

        // Find insertion point - after projects section or before contact
        const projectsSection = document.querySelector('#projects');
        const contactSection = document.querySelector('#contact');
        
        if (projectsSection) {
            projectsSection.insertAdjacentHTML('afterend', skillsHTML);
        } else if (contactSection) {
            contactSection.insertAdjacentHTML('beforebegin', skillsHTML);
        }
    }

    setupEventListeners() {
        const tabs = document.querySelectorAll('.skill-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.dataset.category;
                this.setActiveTab(category);
                this.displaySkills(category);
            });
        });
    }

    setActiveTab(category) {
        const tabs = document.querySelectorAll('.skill-tab');
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === category);
        });
        this.activeCategory = category;
    }

    displaySkills(category) {
        const skillsGrid = document.getElementById('skills-grid');
        const categoryData = this.skillsData[category];
        
        if (!skillsGrid || !categoryData) return;

        // Group skills by category for better organization
        const groupedSkills = {};
        categoryData.skills.forEach(skill => {
            if (!groupedSkills[skill.category]) {
                groupedSkills[skill.category] = [];
            }
            groupedSkills[skill.category].push(skill);
        });

        const skillsHTML = `
            <div class="skills-categories">
                ${Object.entries(groupedSkills).map(([cat, skills]) => `
                    <div class="skill-category mb-8">
                        <h4 class="text-lg font-semibold mb-4 text-primary">${cat}</h4>
                        <div class="skills-list grid grid-2 gap-4">
                            ${skills.map(skill => `
                                <div class="skill-item">
                                    <div class="skill-header flex items-center justify-between mb-2">
                                        <div class="flex items-center gap-3">
                                            <i class="${skill.icon} text-primary"></i>
                                            <span class="skill-name">${skill.name}</span>
                                        </div>
                                        <span class="skill-percentage text-sm text-gray-400">${skill.level}%</span>
                                    </div>
                                    <div class="skill-bar bg-gray-700 rounded-full h-2">
                                        <div class="skill-progress bg-gradient-to-r from-primary to-accent rounded-full h-2 transition-all duration-1000" 
                                             style="width: 0%" 
                                             data-width="${skill.level}%"></div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        skillsGrid.innerHTML = skillsHTML;
        
        // Animate skill bars
        setTimeout(() => this.animateSkillBars(), 100);
    }

    animateSkillBars() {
        const progressBars = document.querySelectorAll('.skill-progress');
        
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                const targetWidth = bar.dataset.width;
                bar.style.width = targetWidth;
            }, index * 50); // Stagger animation
        });
    }
}

// Exporta para uso global
window.InteractiveSkills = InteractiveSkills;

// Initialize interactive skills
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveSkills();
});