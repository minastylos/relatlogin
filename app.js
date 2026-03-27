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

const keywordData = [
    { name: "transporte via cabotagem", ctr: 50.00, status: "star" },
    { name: "login logistica", ctr: 36.63, status: "star" },
    { name: "cotação cabotagem", ctr: 23.08, status: "star" },
    { name: "logística portuária", ctr: 13.53, status: "star" },
    { name: "empresas cabotagem BR", ctr: 13.48, status: "star" },
    { name: "cabotagem Log-In", ctr: 10.57, status: "star" },
    { name: "frete marítimo", ctr: 6.83, status: "neutral" },
    { name: "transporte interestadual", ctr: 3.33, status: "attention" },
    { name: "mercosul cabotagem", ctr: 0.00, status: "attention" },
    { name: "orçamento cabotagem", ctr: 0.00, status: "attention" }
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
