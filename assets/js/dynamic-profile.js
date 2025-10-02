// ===== DYNAMIC PROFILE LOADER =====
// Carrega e atualiza informações do perfil dinamicamente

class ProfileLoader {
    constructor() {
        this.profileData = null;
        this.dataUrl = '/data/profile.json';
        this.init();
    }

    async init() {
        try {
            await this.loadProfileData();
            this.updatePageContent();
            this.setupAutoRefresh();
        } catch (error) {
            console.warn('Modo offline - usando dados estáticos');
        }
    }

    async loadProfileData() {
        try {
            const response = await fetch(this.dataUrl);
            if (!response.ok) throw new Error('Dados não encontrados');
            
            this.profileData = await response.json();
            console.log('✅ Dados do perfil carregados:', new Date(this.profileData.meta.last_updated));
            
            return this.profileData;
        } catch (error) {
            console.warn('❌ Erro ao carregar dados:', error.message);
            return null;
        }
    }

    updatePageContent() {
        if (!this.profileData) return;

        // Atualiza título da página
        this.updateTitle();
        
        // Atualiza informações básicas
        this.updateBasicInfo();
        
        // Atualiza experiências (se estiver na página de experiência)
        this.updateExperience();
        
        // Atualiza skills (se estiver na página de skills)
        this.updateSkills();
        
        // Atualiza certificações
        this.updateCertifications();
    }

    updateTitle() {
        const { basic_info } = this.profileData;
        
        // Atualiza título principal
        const titleElement = document.querySelector('.title');
        if (titleElement) {
            titleElement.innerHTML = `${basic_info.title} | Graduado em GTI | Especialista em Infraestrutura`;
        }
        
        // Atualiza meta title
        document.title = `${basic_info.name} | ${basic_info.title} | Portfolio Profissional`;
        
        // Atualiza status atual
        const statusElement = document.querySelector('.hover-info span');
        if (statusElement) {
            statusElement.textContent = `${basic_info.title} - ${basic_info.company}`;
        }
    }

    updateBasicInfo() {
        const { basic_info } = this.profileData;
        
        // Atualiza bio/descrição
        const bioElement = document.querySelector('.text-gray-300.text-lg');
        if (bioElement) {
            bioElement.textContent = basic_info.bio;
        }
        
        // Atualiza links de contato
        this.updateContactLinks();
    }

    updateContactLinks() {
        const { basic_info } = this.profileData;
        
        // Atualiza link do LinkedIn
        const linkedinLinks = document.querySelectorAll('a[href*="linkedin"]');
        linkedinLinks.forEach(link => {
            link.href = basic_info.linkedin;
        });
        
        // Atualiza link do GitHub  
        const githubLinks = document.querySelectorAll('a[href*="github"]');
        githubLinks.forEach(link => {
            link.href = basic_info.github;
        });
        
        // Atualiza email
        const emailLinks = document.querySelectorAll('a[href^="mailto"]');
        emailLinks.forEach(link => {
            link.href = `mailto:${basic_info.email}`;
        });
    }

    updateExperience() {
        if (!window.location.pathname.includes('experience')) return;
        
        const experienceContainer = document.querySelector('.max-w-4xl.mx-auto');
        if (!experienceContainer) return;
        
        // Limpa experiências antigas (mantém formação)
        const existingCards = experienceContainer.querySelectorAll('.card.group.mb-8');
        existingCards.forEach(card => {
            if (!card.textContent.includes('Graduação') && !card.textContent.includes('FATEC')) {
                card.remove();
            }
        });
        
        // Adiciona experiências atualizadas
        const formationSection = existingCards[existingCards.length - 1];
        
        this.profileData.experience.forEach((exp, index) => {
            const expElement = this.createExperienceElement(exp);
            if (formationSection) {
                formationSection.parentNode.insertBefore(expElement, formationSection);
            }
        });
    }

    createExperienceElement(experience) {
        const endDate = experience.current ? 'Presente' : experience.end_date;
        const skillTags = experience.skills.map(skill => `<span class="tag tag-primary text-xs">${skill}</span>`).join(' ');
        
        const element = document.createElement('div');
        element.className = 'card group mb-8';
        element.innerHTML = `
            <div class="flex items-start gap-6">
                <div class="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-${experience.current ? 'server' : 'industry'} text-2xl text-primary"></i>
                </div>
                <div class="flex-1">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h3 class="text-xl font-semibold mb-1">${experience.position}</h3>
                            <p class="text-primary mb-2">${experience.company}</p>
                            <p class="text-gray-400 text-sm">${experience.start_date} - ${endDate}</p>
                            <p class="text-gray-400 text-sm">${experience.location}</p>
                        </div>
                        <span class="tag tag-primary">
                            <i class="fas fa-${experience.current ? 'server' : 'industry'}"></i>
                            ${experience.current ? 'Atual' : 'Experiência'}
                        </span>
                    </div>
                    <p class="text-gray-400 mb-4">${experience.description}</p>
                    <div class="flex gap-2 flex-wrap">
                        ${skillTags}
                    </div>
                </div>
            </div>
        `;
        
        return element;
    }

    updateSkills() {
        if (!window.location.pathname.includes('skills')) return;
        
        // Atualiza skills técnicas
        const techSkills = document.querySelectorAll('.space-y-3');
        if (techSkills.length > 0 && this.profileData.skills.technical) {
            // Lógica para atualizar skills seria implementada aqui
            console.log('Skills técnicas encontradas para atualização');
        }
    }

    updateCertifications() {
        // Procura por seção de certificações
        const certSection = document.querySelector('h3:contains("Certificações")');
        if (!certSection) return;
        
        const certContainer = certSection.closest('.card')?.querySelector('.space-y-2');
        if (!certContainer) return;
        
        // Limpa certificações antigas
        certContainer.innerHTML = '';
        
        // Adiciona certificações atualizadas
        this.profileData.certifications.forEach(cert => {
            const certElement = document.createElement('p');
            certElement.className = 'text-gray-400 text-sm';
            certElement.innerHTML = `✓ ${cert.name}`;
            certContainer.appendChild(certElement);
        });
    }

    setupAutoRefresh() {
        // Verifica atualizações a cada 5 minutos
        setInterval(async () => {
            const newData = await this.loadProfileData();
            if (newData && newData.meta.last_updated !== this.profileData?.meta?.last_updated) {
                console.log('🔄 Dados atualizados detectados - recarregando...');
                this.updatePageContent();
                this.showUpdateNotification();
            }
        }, 5 * 60 * 1000); // 5 minutos
    }

    showUpdateNotification() {
        // Cria notificação suave de atualização
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up';
        notification.innerHTML = `
            <i class="fas fa-sync-alt mr-2"></i>
            Perfil atualizado!
        `;
        
        document.body.appendChild(notification);
        
        // Remove notificação após 3 segundos
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Método público para forçar atualização
    async forceUpdate() {
        console.log('🔄 Forçando atualização do perfil...');
        await this.loadProfileData();
        this.updatePageContent();
        this.showUpdateNotification();
    }
}

// Inicializa o loader quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    window.profileLoader = new ProfileLoader();
    
    // Adiciona comando para atualização manual no console
    window.updateProfile = () => window.profileLoader.forceUpdate();
    
    console.log('📱 ProfileLoader iniciado');
    console.log('💡 Digite "updateProfile()" no console para forçar atualização');
});

// Expõe globalmente para debug
window.ProfileLoader = ProfileLoader;