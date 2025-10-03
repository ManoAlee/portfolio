// Configuração do gráfico de tráfego em tempo real
let chart;
let intervalId = null;
const maxDataPoints = 8; // Reduzido para um visual ainda mais limpo
let trafficData = Array(maxDataPoints).fill(0);
let timeLabels = Array(maxDataPoints).fill('');

// Horários de pico típicos para Boituva
const peakHours = {
    morning: { start: 6, end: 9 },
    evening: { start: 17, end: 19 }
};

// Função para gerar dados realistas de tráfego
function gerarDadosTrafegoRealisticos() {
    const now = new Date();
    const hour = now.getHours();
    const baseFlow = 150; // Fluxo base ainda mais suave
    let multiplier = 1;

    // Ajuste para horários de pico
    if ((hour >= peakHours.morning.start && hour <= peakHours.morning.end) ||
        (hour >= peakHours.evening.start && hour <= peakHours.evening.end)) {
        multiplier = 1.8;
    } else if (hour >= 10 && hour <= 16) {
        multiplier = 1.2;
    } else if (hour >= 22 || hour <= 5) {
        multiplier = 0.3;
    }

    // Variação mais suave
    const randomVariation = Math.random() * 30 - 15;
    return Math.max(0, Math.round(baseFlow * multiplier + randomVariation));
}

// Função para atualizar o gráfico
function atualizarGrafico() {
    const novoValor = gerarDadosTrafegoRealisticos();
    
    trafficData.push(novoValor);
    trafficData.shift();
    
    const agora = new Date();
    const novoTempo = `${agora.getHours()}:${agora.getMinutes().toString().padStart(2, '0')}`;
    timeLabels.push(novoTempo);
    timeLabels.shift();

    // Segurança: garantir que o chart existe antes de atualizar
    if (!chart || !chart.data || !chart.data.datasets || !chart.data.datasets[0]) return;

    // Atualizar referências explícitas (ajuda em algumas versões do Chart.js)
    chart.data.labels = timeLabels;
    chart.data.datasets[0].data = trafficData;

    // Atualizar sem animação adicional (Chart.js interpreta 'none' de forma diferente entre versões)
    chart.update();
}

// Inicializar o gráfico
function initRealTimeChart() {
    const canvas = document.getElementById('realTimeChart');
    if (!canvas) return; // página não tem canvas — evita erro
    const ctx = canvas.getContext('2d');
    
    // Criar gradiente suave
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.02)');

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Fluxo de Veículos',
                data: trafficData,
                borderColor: 'rgba(99, 102, 241, 0.8)',
                backgroundColor: gradient,
                borderWidth: 1.5,
                tension: 0.4,
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 3,
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 300,
                    grid: {
                        display: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        font: {
                            size: 10,
                            family: "'Inter', sans-serif"
                        },
                        maxTicksLimit: 4,
                        padding: 10
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        font: {
                            size: 10,
                            family: "'Inter', sans-serif"
                        },
                        maxTicksLimit: 4,
                        padding: 10
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(17, 24, 39, 0.8)',
                    titleFont: {
                        size: 12,
                        family: "'Inter', sans-serif",
                        weight: '500'
                    },
                    bodyFont: {
                        size: 11,
                        family: "'Inter', sans-serif"
                    },
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y} veículos/hora`;
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 500,
                easing: 'easeOutQuart'
            },
            elements: {
                line: {
                    cubicInterpolationMode: 'monotone'
                }
            }
        }
    });

    // Inicializar labels/dados iniciais para evitar eixos vazios
    for (let i = 0; i < maxDataPoints; i++) {
        trafficData[i] = gerarDadosTrafegoRealisticos();
        const ts = new Date(Date.now() - (maxDataPoints - i) * 4000);
        timeLabels[i] = `${ts.getHours()}:${ts.getMinutes().toString().padStart(2, '0')}`;
    }

    // Atualizar o chart uma vez com os dados iniciais
    if (chart && chart.data && chart.data.datasets && chart.data.datasets[0]) {
        chart.data.labels = timeLabels;
        chart.data.datasets[0].data = trafficData;
        chart.update();
    }

    // Limpar intervalo anterior (se existir) para evitar duplicação
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(atualizarGrafico, 4000);
}

// Inicializar quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', initRealTimeChart);

// Remover interval se a página for descarregada (boa prática)
window.addEventListener('beforeunload', () => {
    if (intervalId) clearInterval(intervalId);
});