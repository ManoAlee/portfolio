// Função para carregar o rodapé
async function carregarRodape() {
    try {
        // Determina o caminho correto do rodapé baseado na localização atual
        const path = window.location.pathname;
        const isSubPage = path.split('/').length > 2;
        const footerPath = isSubPage ? '../../pages/includes/footer.html' : './pages/includes/footer.html';

        // Carrega o conteúdo do rodapé
        const response = await fetch(footerPath);
        const html = await response.text();

        // Insere o rodapé antes do último script da página
        const scripts = document.getElementsByTagName('script');
        const lastScript = scripts[scripts.length - 1];
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        document.body.insertBefore(tempDiv.firstChild, lastScript);

    } catch (error) {
        console.error('Erro ao carregar o rodapé:', error);
    }
}

// Carrega o rodapé quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', carregarRodape); 