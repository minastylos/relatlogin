// Lógica de Slides
let currentSlide = 1;
const totalSlides = 6;

function changeSlide(direction) {
    document.getElementById(`slide-${currentSlide}`).classList.remove('active');
    currentSlide += direction;
    if (currentSlide < 1) currentSlide = 1;
    if (currentSlide > totalSlides) currentSlide = totalSlides;
    document.getElementById(`slide-${currentSlide}`).classList.add('active');
    updateUIControls();
}

function updateUIControls() {
    document.getElementById('slideIndicator').innerText = `0${currentSlide} / 0${totalSlides}`;
    document.getElementById('prevBtn').disabled = currentSlide === 1;
    document.getElementById('nextBtn').disabled = currentSlide === totalSlides;
}

// Configurações Gráficas Chart.js
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Inter', sans-serif";

// == DADOS ANALÍTICOS (Provenientes dos CSVs extraídos) ==

// Performance Geral da Campanha
const campaignData = {
    name: "Log-In Cabotagem BOFU",
    status: "Ativada",
    type: "Pesquisa",
    clicks: 797,
    impressions: 6033,
    ctr: 13.21,
    cpcAvg: 3.36,
    cost: 2677.66,
    topImprShare: 37.71,
    topPageShare: 78.96,
    conversions: 53.00,
    viewConversions: 0,
    costPerConv: 50.52,
    convRate: 6.65
};

// Palavras-chave com dados completos (Palavra-chave de pesquisa 2.csv)
const keywordData = [
    { name: "transporte via cabotagem", ctr: 50.00, clicks: 4, impr: 8, conv: 0, cost: 4.76, group: "Teste 1", status: "star" },
    { name: "login logistica", ctr: 36.63, clicks: 185, impr: 505, conv: 4, cost: 100.86, group: "Teste 1", status: "star" },
    { name: "Log-In Logística Intermodal", ctr: 25.00, clicks: 1, impr: 4, conv: 0, cost: 0.09, group: "Manaus", status: "star" },
    { name: "cotação cabotagem", ctr: 23.08, clicks: 3, impr: 13, conv: 0, cost: 21.76, group: "Teste 1", status: "star" },
    { name: "cabotagem transporte", ctr: 14.49, clicks: 10, impr: 69, conv: 0, cost: 34.84, group: "Teste 1", status: "star" },
    { name: "logística portuária", ctr: 13.53, clicks: 84, impr: 621, conv: 3, cost: 287.72, group: "Teste 1", status: "star" },
    { name: "empresas cabotagem BR", ctr: 13.48, clicks: 100, impr: 742, conv: 7.33, cost: 367.92, group: "Teste 1", status: "star" },
    { name: "cabotagem Log-In", ctr: 10.57, clicks: 41, impr: 388, conv: 1.67, cost: 176.08, group: "Teste 1", status: "star" },
    { name: "cabotagem marítima", ctr: 10.00, clicks: 17, impr: 170, conv: 1, cost: 58.82, group: "Teste 1", status: "star" },
    { name: "log in cabotagem", ctr: 9.62, clicks: 15, impr: 156, conv: 1, cost: 77.68, group: "Teste 1", status: "star" },
    { name: "transportadora mercosul", ctr: 8.32, clicks: 79, impr: 949, conv: 11, cost: 528.77, group: "Teste 1", status: "neutral" },
    { name: "frete marítimo", ctr: 6.83, clicks: 95, impr: 1390, conv: 18, cost: 610.33, group: "Teste 1", status: "neutral" },
    { name: "cabotagem", ctr: 6.38, clicks: 3, impr: 47, conv: 0, cost: 1.55, group: "Manaus", status: "attention" },
    { name: "transporte de carga interestadual", ctr: 3.33, clicks: 2, impr: 60, conv: 0, cost: 24.18, group: "Manaus", status: "attention" },
    { name: "mercosul cabotagem", ctr: 0.00, clicks: 0, impr: 1, conv: 0, cost: 0, group: "Teste 1", status: "attention" },
    { name: "orçamento cabotagem", ctr: 0.00, clicks: 0, impr: 0, conv: 0, cost: 0, group: "Teste 1", status: "attention" }
];

const geoData = [
    { city: "Rio de Janeiro", impr: 493, conv: 9 },
    { city: "São Paulo", impr: 561, conv: 4 },
    { city: "Manaus", impr: 260, conv: 2 },
    { city: "Guarulhos", impr: 68, conv: 2 },
    { city: "Vila Velha", impr: 170, conv: 0 },
    { city: "Santos", impr: 150, conv: 0 },
    { city: "Curitiba", impr: 130, conv: 2 }
];

// INICIALIZAÇÃO
window.onload = () => {
    populateKeywords();
    initLocationsChart();
};

function populateKeywords() {
    const starsList = document.getElementById('starsList');
    const attentionList = document.getElementById('attentionList');

    keywordData.forEach(kw => {
        const row = document.createElement('div');
        row.className = 'kw-row';
        row.innerHTML = `<span class="kw-name">${kw.name}</span><span class="kw-ctr">${kw.ctr.toFixed(2)}% CTR</span>`;
        
        if (kw.status === "star") {
            starsList.appendChild(row);
        } else if (kw.status === "attention") {
            attentionList.appendChild(row);
        }
    });
}

function initLocationsChart() {
    const ctx = document.getElementById('locationsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: geoData.map(d => d.city),
            datasets: [
                {
                    label: 'Impressões',
                    data: geoData.map(d => d.impr),
                    backgroundColor: '#3b82f6', // Azul do Google Ads
                    borderRadius: 4,
                    barThickness: 15,
                    xAxisID: 'x'
                },
                {
                    label: 'Conversões',
                    data: geoData.map(d => d.conv),
                    backgroundColor: '#ef4444', // Vermelho do Google Ads
                    borderRadius: 4,
                    barThickness: 15,
                    xAxisID: 'x1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y', // Barra horizontal conforme print
            plugins: { 
                legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 12 } } },
                tooltip: { 
                    backgroundColor: 'rgba(9, 9, 11, 0.95)',
                    padding: 12,
                    displayColors: true,
                    titleFont: { size: 14, weight: 'bold' }
                }
            },
            scales: {
                x: { 
                    position: 'bottom',
                    grid: { color: '#1e293b' },
                    title: { display: true, text: 'Volume de Impressões', color: '#94a3b8' }
                },
                x1: { 
                    position: 'top', 
                    grid: { display: false },
                    title: { display: true, text: 'Volume de Conversões', color: '#94a3b8' }
                },
                y: { 
                    grid: { display: false },
                    ticks: { color: '#f8fafc', font: { weight: 'bold' } }
                }
            }
        }
    });
}
