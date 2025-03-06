// Configuração inicial do mapa
const initMap = () => {
    const map = L.map('map').setView([-23.2862, -47.6786], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    return map;
};

// Pontos de monitoramento em Boituva
const trafficPoints = [
    // Centro e principais avenidas
    {lat: -23.2862, lng: -47.6786, color: 'green', pulse: false, popup: 'Centro - Fluxo Livre'},
    {lat: -23.2840, lng: -47.6760, color: 'yellow', pulse: false, popup: 'Av. Pereira Ignácio - Tráfego Moderado'},
    {lat: -23.2890, lng: -47.6750, color: 'red', pulse: false, popup: 'Av. Gov. Mario Covas - Congestionado'},
    
    // Principais cruzamentos
    {lat: -23.2830, lng: -47.6800, color: 'purple', pulse: true, popup: 'Cruzamento R. João Leite - Incidente'},
    {lat: -23.2855, lng: -47.6775, color: 'yellow', pulse: false, popup: 'Cruzamento Av. Brasil - Moderado'},
    
    // Áreas comerciais
    {lat: -23.2848, lng: -47.6790, color: 'yellow', pulse: false, popup: 'Região Comercial - Moderado'},
    {lat: -23.2875, lng: -47.6770, color: 'green', pulse: false, popup: 'Shopping - Fluxo Livre'},
    
    // Acesso à Rodovia
    {lat: -23.2910, lng: -47.6740, color: 'red', pulse: false, popup: 'Acesso SP-129 - Congestionado'},
    {lat: -23.2820, lng: -47.6820, color: 'green', pulse: false, popup: 'Acesso Castello Branco - Livre'}
];

// Adicionar marcadores ao mapa
const addTrafficMarkers = (map) => {
    trafficPoints.forEach(point => {
        const circle = L.circleMarker([point.lat, point.lng], {
            radius: 8,
            fillColor: point.color,
            color: point.color,
            weight: 2,
            opacity: 1,
            fillOpacity: 0.7
        }).addTo(map);

        if (point.pulse) {
            circle._path.classList.add('traffic-pulse');
        }

        circle.bindPopup(point.popup);
    });
};

// Atualizar métricas em tempo real
const updateMetrics = () => {
    // Horário de pico em Boituva (manhã: 7-9h, tarde: 17-19h)
    const now = new Date();
    const hour = now.getHours();
    const isPeakHour = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19);
    
    // Fluxo médio baseado no horário
    const baseFlow = isPeakHour ? 350 : 200;
    const randomFlow = Math.floor(Math.random() * 50);
    document.getElementById('fluxo-valor').textContent = baseFlow + randomFlow;
    
    // Tempo médio de trajeto
    const baseTime = isPeakHour ? 15 : 8;
    const randomTime = Math.floor(Math.random() * 3);
    document.getElementById('tempo-valor').textContent = (baseTime + randomTime) + ' min';
    
    // Redução de congestionamento
    const baseReduction = isPeakHour ? 15 : 25;
    const randomReduction = Math.floor(Math.random() * 5);
    document.getElementById('reducao-valor').textContent = (baseReduction + randomReduction) + '%';
};

// Atualizar status das vias
const updateRoadStatus = () => {
    const roads = [
        {
            id: 'av-pereira',
            name: 'Av. Pereira Ignácio',
            status: Math.random() * 100
        },
        {
            id: 'rua-joao-leite',
            name: 'Rua João Leite',
            status: Math.random() * 100
        },
        {
            id: 'av-mario-covas',
            name: 'Av. Gov. Mario Covas',
            status: Math.random() * 100
        }
    ];

    roads.forEach(road => {
        const statusBar = document.querySelector(`#${road.id} .status-bar`);
        const statusText = document.querySelector(`#${road.id} .status-text`);
        
        statusBar.style.width = `${road.status}%`;
        
        if (road.status > 80) {
            statusBar.classList.remove('bg-yellow-500', 'bg-green-500');
            statusBar.classList.add('bg-red-500');
            statusText.textContent = 'Congestionado';
            statusText.classList.add('text-red-400');
        } else if (road.status > 50) {
            statusBar.classList.remove('bg-red-500', 'bg-green-500');
            statusBar.classList.add('bg-yellow-500');
            statusText.textContent = 'Moderado';
            statusText.classList.add('text-yellow-400');
        } else {
            statusBar.classList.remove('bg-red-500', 'bg-yellow-500');
            statusBar.classList.add('bg-green-500');
            statusText.textContent = 'Livre';
            statusText.classList.add('text-green-400');
        }
    });
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const map = initMap();
    addTrafficMarkers(map);
    
    // Atualizar dados a cada 5 segundos
    setInterval(() => {
        updateMetrics();
        updateRoadStatus();
    }, 5000);
    
    // Primeira atualização
    updateMetrics();
    updateRoadStatus();
}); 