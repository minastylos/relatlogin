// Configurações Gerais Chart.js
Chart.defaults.color = '#94a3b8';
Chart.defaults.font.family = "'Inter', sans-serif";

// Dados Extraídos do Reportei
const metaData = {
    summary: {
        invested: "R$ 208,94",
        ctr: "3,21%",
        cpc: "R$ 0,53",
        cpm: "R$ 16,95",
        impressions: "12.327",
        reach: "8.371",
        clicks: "457",
        leads: "2"
    },
    topCampaigns: [
        { name: "TESTE DE CTR", invested: "R$ 91,49", ctr: "4,23%", clicks: 256, leads: 0 },
        { name: "Formulário — Cópia", invested: "R$ 117,45", ctr: "0,92%", clicks: 201, leads: 2 }
    ]
};

const googleData = {
    summary: {
        cost: "R$ 11.877,17",
        conversions: 274,
        costPerConv: "R$ 43,35",
        ctr: "17,45%",
        cpcAvg: "R$ 2,33",
        clicks: 5097,
        impressions: 29203
    },
    topKeywords: [
        { kw: "transportadora mercosul", clicks: 1125, cost: "R$ 4.117,30", conversions: 98, cpc: "R$ 42,01" },
        { kw: "login logistica", clicks: 1115, cost: "R$ 538,33", conversions: 27.83, cpc: "R$ 19,34" },
        { kw: "logística portuária", clicks: 656, cost: "R$ 1.576,10", conversions: 23, cpc: "R$ 68,53" },
        { kw: "frete marítimo", clicks: 398, cost: "R$ 1.760,50", conversions: 56.17, cpc: "R$ 31,34" },
        { kw: "empresas que fazem cabotagem...", clicks: 220, cost: "R$ 699,67", conversions: 10.83, cpc: "R$ 64,58" }
    ]
};

// Inicialização
window.onload = () => {
    populateMetaTable();
    populateGoogleTable();
    initMetaFunnel();
    
    // Observer para animações de scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
};

// Tabelas
function populateMetaTable() {
    const tbody = document.getElementById('meta-table-body');
    metaData.topCampaigns.forEach(c => {
        const row = `<tr>
            <td>${c.name}</td>
            <td>${c.invested}</td>
            <td>${c.clicks}</td>
            <td>${c.ctr}</td>
            <td><span class="badge ${c.leads > 0 ? 'badge-positive' : 'badge-neutral'}">${c.leads}</span></td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function populateGoogleTable() {
    const tbody = document.getElementById('google-table-body');
    googleData.topKeywords.forEach(k => {
        const row = `<tr>
            <td>${k.kw}</td>
            <td>${k.clicks}</td>
            <td>${k.cost}</td>
            <td>${k.conversions}</td>
            <td>${k.cpc}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Gráficos
function initMetaFunnel() {
    const ctx = document.getElementById('metaFunnelChart').getContext('2d');
    
    // Criando um gráfico de barras horizontal para simular o funil
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Impressões', 'Alcance', 'Cliques', 'Leads'],
            datasets: [{
                label: 'Volume',
                data: [12327, 8371, 457, 2],
                backgroundColor: [
                    'rgba(24, 119, 242, 0.2)',
                    'rgba(24, 119, 242, 0.4)',
                    'rgba(24, 119, 242, 0.7)',
                    '#fbbf24'
                ],
                borderColor: [
                    '#1877f2',
                    '#1877f2',
                    '#1877f2',
                    '#fbbf24'
                ],
                borderWidth: 1,
                borderRadius: 8
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#0f172a',
                    padding: 12,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                }
            },
            scales: {
                x: { 
                    grid: { display: false },
                    ticks: { display: false }
                },
                y: { 
                    grid: { display: false },
                    ticks: { color: '#f8fafc', font: { weight: 'bold' } }
                }
            }
        }
    });
}

// Navegação
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    event.currentTarget.classList.add('active');
}
