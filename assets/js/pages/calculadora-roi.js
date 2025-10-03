// Dados do mercado (atualizados manualmente - última atualização: março 2024)
const DADOS_MERCADO = {
    selic: 11.25,
    cdi: 11.15,
    poupanca: 7.87,
    ibovespa: 12.50,
    ifix: 8.75,
    ipca: 4.62
};

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valor);
}

function formatarPorcentagem(valor) {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valor) + '%';
}

function validarNumero(valor) {
    return !isNaN(valor) && valor > 0 && isFinite(valor);
}

function atualizarBenchmarks() {
    const benchmarkHTML = `
        <div class="bg-gray-800/50 p-4 rounded-lg mb-4">
            <h4 class="font-medium mb-4">Indicadores Atuais do Mercado</h4>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <p class="text-sm text-gray-400">Taxa Selic</p>
                    <p class="text-lg font-bold text-green-400">${DADOS_MERCADO.selic}% a.a.</p>
                    </div>
                <div>
                    <p class="text-sm text-gray-400">CDI</p>
                    <p class="text-lg font-bold text-blue-400">${DADOS_MERCADO.cdi}% a.a.</p>
                </div>
                <div>
                    <p class="text-sm text-gray-400">Poupança</p>
                    <p class="text-lg font-bold text-yellow-400">${DADOS_MERCADO.poupanca}% a.a.</p>
                </div>
                <div>
                    <p class="text-sm text-gray-400">Ibovespa</p>
                    <p class="text-lg font-bold text-purple-400">${DADOS_MERCADO.ibovespa}% a.a.</p>
                </div>
                <div>
                    <p class="text-sm text-gray-400">IFIX</p>
                    <p class="text-lg font-bold text-orange-400">${DADOS_MERCADO.ifix}% a.a.</p>
                </div>
                <div>
                    <p class="text-sm text-gray-400">IPCA</p>
                    <p class="text-lg font-bold text-red-400">${DADOS_MERCADO.ipca}% a.a.</p>
                </div>
            </div>
        </div>
    `;
    
    const benchmarkDiv = document.getElementById('benchmarks');
    if (benchmarkDiv) {
        benchmarkDiv.innerHTML = benchmarkHTML;
    }
}

function analisarInvestimento(roiAnual, tipoInvestimento) {
    let analise = '';
    let risco = '';
    let recomendacao = '';

    switch(tipoInvestimento) {
        case 'poupanca':
            if (roiAnual < DADOS_MERCADO.poupanca) {
                analise = `Rendimento abaixo da poupança (${DADOS_MERCADO.poupanca}% a.a.)`;
                recomendacao = 'Considere migrar para CDBs de grandes bancos que podem oferecer melhor rentabilidade com risco similar.';
            } else {
                analise = `Rendimento acima da poupança (${DADOS_MERCADO.poupanca}% a.a.)`;
                recomendacao = 'Bom rendimento para baixo risco. Considere diversificar uma parte em Tesouro Selic.';
            }
            risco = 'Baixo risco - Garantido pelo FGC até R$ 250 mil';
            break;

        case 'cdb':
            if (roiAnual < DADOS_MERCADO.cdi) {
                analise = `Rendimento abaixo do CDI (${DADOS_MERCADO.cdi}% a.a.)`;
                recomendacao = 'Busque CDBs que paguem ao menos 100% do CDI.';
            } else {
                analise = `Rendimento acima do CDI (${DADOS_MERCADO.cdi}% a.a.)`;
                recomendacao = 'Boa rentabilidade. Mantenha o investimento se o prazo estiver adequado.';
            }
            risco = 'Baixo a médio risco - Garantido pelo FGC até R$ 250 mil';
            break;

        case 'tesouro':
            if (roiAnual < DADOS_MERCADO.selic) {
                analise = `Rendimento abaixo da Selic (${DADOS_MERCADO.selic}% a.a.)`;
                recomendacao = 'Verifique as taxas cobradas pela corretora.';
            } else {
                analise = `Rendimento alinhado ou acima da Selic (${DADOS_MERCADO.selic}% a.a.)`;
                recomendacao = 'Boa estratégia para reserva de emergência e conservação de capital.';
            }
            risco = 'Baixo risco - Garantido pelo Tesouro Nacional';
            break;

        case 'acoes':
            if (roiAnual < DADOS_MERCADO.ibovespa) {
                analise = `Rendimento abaixo do Ibovespa (${DADOS_MERCADO.ibovespa}% a.a.)`;
                recomendacao = 'Considere investir em ETFs ou revisar sua estratégia de stock picking.';
            } else {
                analise = `Rendimento acima do Ibovespa (${DADOS_MERCADO.ibovespa}% a.a.)`;
                recomendacao = 'Excelente performance! Mantenha a estratégia mas monitore os riscos.';
            }
            risco = 'Alto risco - Sujeito à volatilidade do mercado';
            break;

        case 'fii':
            if (roiAnual < DADOS_MERCADO.ifix) {
                analise = `Rendimento abaixo do IFIX (${DADOS_MERCADO.ifix}% a.a.)`;
                recomendacao = 'Avalie a qualidade dos FIIs em carteira e o momento do mercado imobiliário.';
            } else {
                analise = `Rendimento acima do IFIX (${DADOS_MERCADO.ifix}% a.a.)`;
                recomendacao = 'Bom rendimento! Mantenha-se atento à qualidade dos ativos imobiliários.';
            }
            risco = 'Médio risco - Mercado imobiliário e renda variável';
            break;
    }

    return { analise, risco, recomendacao };
}

function calcularROI() {
    try {
    // Obter valores dos inputs com validação (guards para evitar erros se elemento não existir)
    const investimentoEl = document.getElementById('investimento');
    const retornoEl = document.getElementById('retorno');
    const periodoEl = document.getElementById('periodo');
    const tipoEl = document.getElementById('tipoInvestimento');

    const investimento = investimentoEl ? parseFloat(investimentoEl.value) || 0 : 0;
    const retorno = retornoEl ? parseFloat(retornoEl.value) || 0 : 0;
    const periodo = periodoEl ? parseFloat(periodoEl.value) || 0 : 0;
    const tipoInvestimento = tipoEl ? tipoEl.value : 'poupanca';

        // Validar inputs
        if (investimento <= 0 || retorno <= 0 || periodo <= 0) {
            alert('Por favor, preencha todos os campos com valores maiores que zero.');
            return;
        }

        // Cálculos básicos
        const lucroTotal = retorno - investimento;
        const roi = (lucroTotal / investimento) * 100;
        const roiAnual = roi / periodo;
        const lucroAnual = lucroTotal / periodo;
        const lucroMensal = lucroAnual / 12;

        // Determinar benchmark baseado no tipo de investimento
        let benchmark = DADOS_MERCADO.poupanca;
        let benchmarkNome = 'Poupança';
        
        switch(tipoInvestimento) {
            case 'cdb':
                benchmark = DADOS_MERCADO.cdi;
                benchmarkNome = 'CDI';
                break;
            case 'tesouro':
                benchmark = DADOS_MERCADO.selic;
                benchmarkNome = 'Selic';
                break;
            case 'acoes':
                benchmark = DADOS_MERCADO.ibovespa;
                benchmarkNome = 'Ibovespa';
                break;
            case 'fii':
                benchmark = DADOS_MERCADO.ifix;
                benchmarkNome = 'IFIX';
                break;
        }

        // Análise comparativa
        const comparacao = roiAnual > benchmark ? 'acima' : 'abaixo';
        const analise = `Rendimento ${comparacao} do ${benchmarkNome} (${benchmark}% a.a.)`;

        // Determinar risco e recomendação
        const risco = analisarInvestimento(roiAnual, tipoInvestimento).risco;
        const recomendacao = analisarInvestimento(roiAnual, tipoInvestimento).recomendacao;

        const resultadoHTML = `
            <h3 class="text-lg sm:text-xl font-semibold mb-6">Análise do Investimento</h3>
            
            <div class="space-y-4">
                <div class="bg-gray-800/50 p-4 rounded-lg">
                    <h4 class="font-medium mb-2">ROI Total</h4>
                    <p class="text-2xl font-bold text-green-400">${formatarPorcentagem(roi)}</p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-gray-800/50 p-4 rounded-lg">
                        <h4 class="font-medium mb-2">ROI Anual</h4>
                        <p class="text-xl font-bold text-blue-400">${formatarPorcentagem(roiAnual)}</p>
                    </div>
                    <div class="bg-gray-800/50 p-4 rounded-lg">
                        <h4 class="font-medium mb-2">ROI Mensal</h4>
                        <p class="text-xl font-bold text-purple-400">${formatarPorcentagem(roiAnual / 12)}</p>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-gray-800/50 p-4 rounded-lg">
                        <h4 class="font-medium mb-2">Lucro Total</h4>
                        <p class="text-xl font-bold text-yellow-400">${formatarMoeda(lucroTotal)}</p>
                    </div>
                    <div class="bg-gray-800/50 p-4 rounded-lg">
                        <h4 class="font-medium mb-2">Lucro Mensal</h4>
                        <p class="text-xl font-bold text-orange-400">${formatarMoeda(lucroMensal)}</p>
                    </div>
                </div>

                <div class="bg-gray-800/50 p-4 rounded-lg">
                    <h4 class="font-medium mb-2">Análise Comparativa</h4>
                    <p class="text-sm text-gray-300">${analise}</p>
                </div>

                <div class="bg-gray-800/50 p-4 rounded-lg">
                    <h4 class="font-medium mb-2">Perfil de Risco</h4>
                    <p class="text-sm text-gray-300">${risco}</p>
                </div>

                <div class="bg-gray-800/50 p-4 rounded-lg">
                    <h4 class="font-medium mb-2">Recomendação</h4>
                    <p class="text-sm text-gray-300">${recomendacao}</p>
                </div>
            </div>
        `;

        const resultadoDiv = document.getElementById('resultado-roi');
        if (resultadoDiv) {
            resultadoDiv.innerHTML = resultadoHTML;
        } else {
            console.warn('calculadora-roi: elemento #resultado-roi não encontrado');
        }

    } catch (error) {
        console.error('Erro ao calcular ROI:', error);
        alert('Ocorreu um erro ao calcular. Por favor, verifique os valores inseridos.');
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    atualizarBenchmarks();
}); 