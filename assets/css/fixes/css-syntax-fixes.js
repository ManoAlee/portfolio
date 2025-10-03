/**
 * Script para corrigir sintaxe CSS inválida
 * Substitui var(--color)/opacity por rgba() válido
 */

// Função para processar arquivo CSS
function fixCSSFile() {
    const fs = require('fs');
    const path = '/workspaces/portfolio/assets/css/components/enhanced-components.css';
    
    let content = fs.readFileSync(path, 'utf8');
    
    // Mapeamento de cores
    const colorMap = {
        'var(--primary)': 'rgba(79, 70, 229, COLOR_OPACITY)',
        'var(--accent)': 'rgba(6, 182, 212, COLOR_OPACITY)', 
        'var(--secondary)': 'rgba(139, 92, 246, COLOR_OPACITY)',
        'var(--success)': 'rgba(16, 185, 129, COLOR_OPACITY)',
        'var(--error)': 'rgba(239, 68, 68, COLOR_OPACITY)',
        'var(--warning)': 'rgba(245, 158, 11, COLOR_OPACITY)',
        'var(--bg-primary)': 'rgba(15, 23, 42, COLOR_OPACITY)',
        'var(--bg-secondary)': 'rgba(30, 41, 59, COLOR_OPACITY)'
    };
    
    // Padrões de substituição para background
    const backgroundReplacements = {
        'background: var(--primary)/5': 'background: rgba(79, 70, 229, 0.05)',
        'background: var(--primary)/10': 'background: rgba(79, 70, 229, 0.1)',
        'background: var(--primary)/20': 'background: rgba(79, 70, 229, 0.2)',
        'background: var(--primary)/30': 'background: rgba(79, 70, 229, 0.3)',
        'background: var(--accent)/10': 'background: rgba(6, 182, 212, 0.1)',
        'background: var(--accent)/20': 'background: rgba(6, 182, 212, 0.2)',
        'background: var(--success)/10': 'background: rgba(16, 185, 129, 0.1)',
        'background: var(--success)/20': 'background: rgba(16, 185, 129, 0.2)'
    };
    
    // Padrões de substituição para border
    const borderReplacements = {
        'border: 1px solid var(--primary)/10': 'border: 1px solid rgba(79, 70, 229, 0.1)',
        'border: 1px solid var(--primary)/20': 'border: 1px solid rgba(79, 70, 229, 0.2)',
        'border: 1px solid var(--primary)/30': 'border: 1px solid rgba(79, 70, 229, 0.3)',
        'border: 1px solid var(--accent)/20': 'border: 1px solid rgba(6, 182, 212, 0.2)',
        'border: 1px solid var(--accent)/30': 'border: 1px solid rgba(6, 182, 212, 0.3)',
        'border: 1px solid var(--success)/20': 'border: 1px solid rgba(16, 185, 129, 0.2)',
        'border-color: var(--primary)/30': 'border-color: rgba(79, 70, 229, 0.3)',
        'border-color: var(--primary)/50': 'border-color: rgba(79, 70, 229, 0.5)',
        'border-bottom: 2px solid var(--primary)/20': 'border-bottom: 2px solid rgba(79, 70, 229, 0.2)'
    };
    
    // Aplicar todas as substituições
    Object.entries(backgroundReplacements).forEach(([old, newValue]) => {
        content = content.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newValue);
    });
    
    Object.entries(borderReplacements).forEach(([old, newValue]) => {
        content = content.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newValue);
    });
    
    return content;
}

// Para uso no Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { fixCSSFile };
}

// CSS corrigido diretamente
const correctedCSS = `
/* ===== CORREÇÕES DE SINTAXE CSS ===== */

/* Cores corrigidas para uso em backgrounds e borders */
.skill-tab.active {
    background: rgba(79, 70, 229, 1);
    color: white;
    border-color: rgba(79, 70, 229, 1);
}

.skill-tab:hover {
    background: rgba(79, 70, 229, 0.2);
    color: var(--text);
    transform: translateY(-2px);
}

.skill-item:hover {
    background: var(--glass-bg-hover);
    border-color: rgba(79, 70, 229, 0.3);
    transform: translateY(-2px);
}

.timeline-badge.work {
    background: rgba(79, 70, 229, 0.2);
    color: var(--primary);
    border: 1px solid rgba(79, 70, 229, 0.3);
}

.timeline-badge.education {
    background: rgba(6, 182, 212, 0.2);
    color: var(--accent);
    border: 1px solid rgba(6, 182, 212, 0.3);
}

.timeline-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(79, 70, 229, 0.5);
}

.tech-tag {
    background: rgba(79, 70, 229, 0.1);
    color: var(--primary);
    border: 1px solid rgba(79, 70, 229, 0.2);
}

.tech-more {
    background: rgba(79, 70, 229, 0.2);
    color: var(--primary);
}

.filter-btn:hover {
    background: rgba(79, 70, 229, 0.2);
    color: var(--text);
    transform: translateY(-2px);
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(79, 70, 229, 0.5);
}

.project-category {
    background: rgba(79, 70, 229, 0.1);
    color: var(--primary);
}

.status-concluído {
    background: rgba(16, 185, 129, 0.1);
    color: var(--success);
    border: 1px solid rgba(16, 185, 129, 0.2);
}

.status-em-produção {
    background: rgba(6, 182, 212, 0.1);
    color: var(--accent);
    border: 1px solid rgba(6, 182, 212, 0.2);
}

.status-online {
    background: rgba(79, 70, 229, 0.1);
    color: var(--primary);
    border: 1px solid rgba(79, 70, 229, 0.2);
}

.tech-tag-full {
    background: rgba(79, 70, 229, 0.1);
    color: var(--primary);
    border: 1px solid rgba(79, 70, 229, 0.2);
}
`;

console.log('CSS corrections ready for implementation');