// ===== DYNAMIC CV GENERATOR =====
class CVGenerator {
    constructor() {
        this.init();
    }

    init() {
        this.addCVButton();
        this.setupCVGeneration();
    }

    addCVButton() {
        // Adiciona botão de download do CV na seção de contato
        const contactSection = document.querySelector('#contact .card');
        if (contactSection) {
            const cvButton = `
            <div class="mt-6 pt-6 border-t border-gray-700">
                <button id="generate-cv" class="btn btn-primary w-full btn-animated">
                    <i class="fas fa-download mr-2"></i>
                    Baixar Currículo (PDF)
                </button>
                <p class="text-xs text-gray-400 mt-2 text-center">
                    Gerado automaticamente com dados atualizados
                </p>
            </div>`;
            
            const buttonContainer = contactSection.querySelector('.flex.justify-center');
            if (buttonContainer) {
                buttonContainer.insertAdjacentHTML('afterend', cvButton);
            }
        }
    }

    setupCVGeneration() {
        const generateBtn = document.getElementById('generate-cv');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.generateCV();
            });
        }
    }

    async generateCV() {
        try {
            // Carrega dados do perfil
            const profileData = await this.loadProfileData();
            
            // Gera HTML do CV
            const cvHTML = this.generateCVHTML(profileData);
            
            // Abre em nova janela para impressão/PDF
            this.openCVWindow(cvHTML);
            
        } catch (error) {
            console.error('Erro ao gerar CV:', error);
            this.showNotification('Erro ao gerar currículo. Tente novamente.', 'error');
        }
    }

    async loadProfileData() {
        try {
            const response = await fetch('/data/profile.json');
            return await response.json();
        } catch (error) {
            // Fallback com dados estáticos
            return {
                basic_info: {
                    name: "Alessandro Dos Santos Costa Meneses",
                    title: "Assistente de TI JR",
                    email: "ale_meneses2004@hotmail.com",
                    phone: "(15) 99801-7732",
                    location: "Boituva, SP",
                    linkedin: "linkedin.com/in/alessandro-meneses-2425ab231",
                    github: "github.com/ManoAlee"
                }
            };
        }
    }

    generateCVHTML(data) {
        return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CV - ${data.basic_info.name}</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    background: white;
                }
                
                .cv-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 40px;
                    background: white;
                }
                
                .cv-header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 3px solid #4F46E5;
                    padding-bottom: 20px;
                }
                
                .cv-name {
                    font-size: 2.5rem;
                    font-weight: bold;
                    color: #4F46E5;
                    margin-bottom: 10px;
                }
                
                .cv-title {
                    font-size: 1.3rem;
                    color: #666;
                    margin-bottom: 15px;
                }
                
                .cv-contact {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    flex-wrap: wrap;
                    font-size: 0.9rem;
                }
                
                .cv-contact span {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                
                .cv-section {
                    margin-bottom: 30px;
                }
                
                .cv-section-title {
                    font-size: 1.4rem;
                    font-weight: bold;
                    color: #4F46E5;
                    border-bottom: 2px solid #E5E7EB;
                    padding-bottom: 5px;
                    margin-bottom: 15px;
                }
                
                .cv-item {
                    margin-bottom: 20px;
                    padding-left: 20px;
                    border-left: 3px solid #E5E7EB;
                }
                
                .cv-item-header {
                    display: flex;
                    justify-content: between;
                    align-items: flex-start;
                    margin-bottom: 8px;
                }
                
                .cv-item-title {
                    font-weight: bold;
                    font-size: 1.1rem;
                }
                
                .cv-item-company {
                    color: #4F46E5;
                    font-weight: 600;
                }
                
                .cv-item-date {
                    color: #666;
                    font-size: 0.9rem;
                }
                
                .cv-item-description {
                    margin-top: 8px;
                    color: #555;
                }
                
                .cv-skills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-top: 10px;
                }
                
                .cv-skill {
                    background: #F3F4F6;
                    padding: 4px 12px;
                    border-radius: 15px;
                    font-size: 0.85rem;
                    color: #374151;
                }
                
                .cv-two-column {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 30px;
                }
                
                @media print {
                    body { margin: 0; }
                    .cv-container { padding: 20px; box-shadow: none; }
                    .no-print { display: none; }
                }
                
                @media (max-width: 768px) {
                    .cv-container { padding: 20px; }
                    .cv-contact { flex-direction: column; gap: 10px; }
                    .cv-two-column { grid-template-columns: 1fr; }
                }
            </style>
        </head>
        <body>
            <div class="cv-container">
                <!-- Header -->
                <div class="cv-header">
                    <h1 class="cv-name">${data.basic_info.name}</h1>
                    <h2 class="cv-title">${data.basic_info.title}</h2>
                    <div class="cv-contact">
                        <span>📧 ${data.basic_info.email}</span>
                        <span>📱 ${data.basic_info.phone}</span>
                        <span>📍 ${data.basic_info.location}</span>
                        <span>🔗 ${data.basic_info.linkedin}</span>
                        <span>🐱 ${data.basic_info.github}</span>
                    </div>
                </div>

                <!-- Resumo -->
                <div class="cv-section">
                    <h3 class="cv-section-title">Resumo Profissional</h3>
                    <p>${data.basic_info.bio || 'Graduado em Gestão da Tecnologia da Informação com experiência em infraestrutura de TI, suporte técnico e análise de dados.'}</p>
                </div>

                <!-- Experiência & Educação em duas colunas -->
                <div class="cv-two-column">
                    <!-- Experiência -->
                    <div class="cv-section">
                        <h3 class="cv-section-title">Experiência Profissional</h3>
                        ${this.generateExperienceSection(data)}
                    </div>

                    <!-- Educação -->
                    <div class="cv-section">
                        <h3 class="cv-section-title">Formação</h3>
                        ${this.generateEducationSection(data)}
                    </div>
                </div>

                <!-- Skills -->
                <div class="cv-section">
                    <h3 class="cv-section-title">Competências Técnicas</h3>
                    ${this.generateSkillsSection(data)}
                </div>

                <!-- Certificações -->
                <div class="cv-section">
                    <h3 class="cv-section-title">Certificações</h3>
                    ${this.generateCertificationsSection(data)}
                </div>

                <!-- Footer -->
                <div class="no-print" style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
                    <button onclick="window.print()" style="padding: 10px 20px; background: #4F46E5; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        Imprimir / Salvar PDF
                    </button>
                    <p style="margin-top: 10px; font-size: 0.8rem; color: #666;">
                        Gerado automaticamente em ${new Date().toLocaleDateString('pt-BR')} | Portfolio: manoalee.github.io/portfolio
                    </p>
                </div>
            </div>
        </body>
        </html>`;
    }

    generateExperienceSection(data) {
        if (!data.experience) {
            return `
            <div class="cv-item">
                <div class="cv-item-title">Assistente de TI JR</div>
                <div class="cv-item-company">Automotion</div>
                <div class="cv-item-date">Junho 2025 - Presente</div>
                <div class="cv-item-description">Infraestrutura de TI, suporte técnico e administração de sistemas.</div>
            </div>`;
        }

        return data.experience.slice(0, 3).map(exp => `
        <div class="cv-item">
            <div class="cv-item-title">${exp.position}</div>
            <div class="cv-item-company">${exp.company}</div>
            <div class="cv-item-date">${exp.start_date} - ${exp.current ? 'Presente' : exp.end_date}</div>
            <div class="cv-item-description">${exp.description}</div>
            <div class="cv-skills">
                ${exp.skills?.map(skill => `<span class="cv-skill">${skill}</span>`).join('') || ''}
            </div>
        </div>`).join('');
    }

    generateEducationSection(data) {
        return `
        <div class="cv-item">
            <div class="cv-item-title">Gestão da Tecnologia da Informação</div>
            <div class="cv-item-company">FATEC Tatuí</div>
            <div class="cv-item-date">2022 - 2025</div>
            <div class="cv-item-description">Graduação concluída com foco em infraestrutura de TI e análise de dados.</div>
        </div>
        <div class="cv-item">
            <div class="cv-item-title">Assistente Administrativo</div>
            <div class="cv-item-company">SENAI Ítalo Bologna</div>
            <div class="cv-item-date">2023</div>
            <div class="cv-item-description">Curso de Aprendizagem Industrial.</div>
        </div>`;
    }

    generateSkillsSection(data) {
        const skills = [
            'Windows Server', 'Linux', 'Active Directory', 'PowerShell', 
            'Python', 'Power BI', 'Azure', 'Hyper-V', 'SQL', 'Automação'
        ];

        return `
        <div class="cv-skills">
            ${skills.map(skill => `<span class="cv-skill">${skill}</span>`).join('')}
        </div>`;
    }

    generateCertificationsSection(data) {
        const certs = [
            'Microsoft Excel 2016',
            'Power BI Fundamentals', 
            'Fundamentos de Data Science e IA',
            'Administração de Banco de Dados'
        ];

        return `
        <div style="columns: 2; gap: 20px;">
            ${certs.map(cert => `<div style="margin-bottom: 8px;">• ${cert}</div>`).join('')}
        </div>`;
    }

    openCVWindow(htmlContent) {
        const cvWindow = window.open('', '_blank', 'width=800,height=1000');
        cvWindow.document.write(htmlContent);
        cvWindow.document.close();
        
        // Foca na nova janela
        cvWindow.focus();
        
        this.showNotification('Currículo gerado! Use Ctrl+P para imprimir/salvar como PDF.', 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        } text-white`;
        
        notification.innerHTML = `
            <div class="flex items-center gap-2">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Inicializar quando DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    new CVGenerator();
});