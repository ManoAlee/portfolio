function calcularROI() {
    const investimento = parseFloat(document.getElementById('investimento').value);
    const retorno = parseFloat(document.getElementById('retorno').value);
    const periodo = parseInt(document.getElementById('periodo').value);
    
    if (isNaN(investimento) || isNaN(retorno) || isNaN(periodo)) {
        document.getElementById('resultado-roi').innerHTML = 'Por favor, preencha todos os campos corretamente.';
        return;
    }
    
    const roi = ((retorno - investimento) / investimento) * 100;
    const roiAnual = roi / periodo;
    
    // Calcular projeções otimista e pessimista
    const roiOtimista = roiAnual * 1.2;
    const roiPessimista = roiAnual * 0.8;
    
    // Calcular pontos de equilíbrio
    const breakEvenMeses = Math.ceil((investimento / (retorno/periodo)) * 12);
    
    const resultadoHTML = `
        <div class="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div class="grid grid-cols-2 gap-6 mb-6">
                <div class="stats-card bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-4 rounded-lg backdrop-blur-sm">
                    <h4 class="text-blue-400 text-sm mb-2">ROI Total</h4>
                    <p class="text-3xl font-bold text-white">${roi.toFixed(2)}%</p>
                    <div class="mt-2 text-sm text-gray-400">
                        <span class="text-green-400">▲</span> ${roiOtimista.toFixed(2)}% (Otimista)
                        <br>
                        <span class="text-red-400">▼</span> ${roiPessimista.toFixed(2)}% (Pessimista)
                    </div>
                </div>
                <div class="stats-card bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-4 rounded-lg backdrop-blur-sm">
                    <h4 class="text-purple-400 text-sm mb-2">Ponto de Equilíbrio</h4>
                    <p class="text-3xl font-bold text-white">${breakEvenMeses} meses</p>
                    <div class="progress-bar mt-2 h-2 bg-gray-700 rounded-full">
                        <div class="h-full bg-purple-500 rounded-full" style="width: ${Math.min((breakEvenMeses/36) * 100, 100)}%"></div>
                    </div>
                </div>
            </div>
            <div class="relative h-64">
                <canvas id="roiChart" class="w-full h-full"></canvas>
            </div>
            <div class="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div class="metric-card bg-gray-800/50 p-3 rounded-lg text-center">
                    <p class="text-gray-400">ROI Mensal</p>
                    <p class="text-xl font-bold text-white">${(roiAnual/12).toFixed(2)}%</p>
                </div>
                <div class="metric-card bg-gray-800/50 p-3 rounded-lg text-center">
                    <p class="text-gray-400">Retorno Total</p>
                    <p class="text-xl font-bold text-white">R$ ${(retorno - investimento).toLocaleString()}</p>
                </div>
                <div class="metric-card bg-gray-800/50 p-3 rounded-lg text-center">
                    <p class="text-gray-400">Eficiência</p>
                    <p class="text-xl font-bold text-white">${Math.min(100, (roi/periodo)).toFixed(0)}%</p>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('resultado-roi').innerHTML = resultadoHTML;
    
    // Criar gráfico avançado
    const ctx = document.getElementById('roiChart').getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
    
    const meses = periodo * 12;
    const labels = Array.from({length: meses}, (_, i) => `Mês ${i + 1}`);
    const dadosReais = Array.from({length: meses}, (_, i) => {
        const mes = i + 1;
        return investimento * (1 + (roiAnual/1200)) ** mes;
    });
    
    const dadosOtimistas = dadosReais.map(valor => valor * 1.2);
    const dadosPessimistas = dadosReais.map(valor => valor * 0.8);
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Projeção Real',
                    data: dadosReais,
                    borderColor: '#8B5CF6',
                    backgroundColor: gradient,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Cenário Otimista',
                    data: dadosOtimistas,
                    borderColor: '#34D399',
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Cenário Pessimista',
                    data: dadosPessimistas,
                    borderColor: '#F87171',
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Projeção de Retorno do Investimento',
                    color: '#fff',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    labels: {
                        color: '#fff'
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#fff'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#fff',
                        callback: function(value) {
                            return 'R$ ' + value.toLocaleString();
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    });
} 