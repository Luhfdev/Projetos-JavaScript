// Variáveis para os gráficos
const ctx = document.getElementById('salesChart').getContext('2d');
let salesChart;

// Dados de exemplo para os gráficos (inicialmente vazios)
let chartData = {
    labels: [],
    datasets: [{
        label: 'Vendas (em unidades)',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
    }]
};

// Função para renderizar o gráfico
function renderChart(type, data) {
    if (salesChart) salesChart.destroy(); // Destrói o gráfico atual antes de renderizar um novo

    salesChart = new Chart(ctx, {
        type: type,
        data: data,
        options: {
            responsive: true,
            animation: {
                duration: 1500,
                easing: 'easeInOutCubic',
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    });
}

// Função para adicionar dados inseridos pelo usuário
document.getElementById('addDataButton').addEventListener('click', function() {
    const month = document.getElementById('month').value;
    const sales = document.getElementById('sales').value;

    if (month && sales) {
        // Adiciona os dados ao gráfico
        chartData.labels.push(month);
        chartData.datasets[0].data.push(Number(sales));

        // Salva os dados no localStorage para persistir entre as sessões
        localStorage.setItem('chartData', JSON.stringify(chartData));

        // Atualiza o gráfico com os dados inseridos
        renderChart('bar', chartData);

        // Limpa os campos de entrada
        document.getElementById('month').value = '';
        document.getElementById('sales').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

// Função para carregar os dados salvos do localStorage
function loadData() {
    const savedData = localStorage.getItem('chartData');
    if (savedData) {
        chartData = JSON.parse(savedData);
        renderChart('bar', chartData); // Renderiza o gráfico com os dados salvos
    }
}

// Carrega os dados ao inicializar a página
loadData();

// Função para alterar a cor das barras
document.getElementById('barColor').addEventListener('input', function(event) {
    const newColor = event.target.value;
    chartData.datasets[0].backgroundColor = newColor;
    chartData.datasets[0].borderColor = newColor;
    salesChart.update();
});

// Filtros para alternar entre os gráficos
document.getElementById('showBarChart').addEventListener('click', function() {
    renderChart('bar', chartData);
});

document.getElementById('showLineChart').addEventListener('click', function() {
    renderChart('line', chartData); // Exemplo de como adaptar para linha
});

document.getElementById('showPieChart').addEventListener('click', function() {
    renderChart('pie', chartData); // Exemplo de como adaptar para pizza
});

// Função para alterar o período (mensal ou trimestral)
document.getElementById('periodFilter').addEventListener('change', function(event) {
    const period = event.target.value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (period === 'monthly') {
        renderChart('bar', chartData);
    } else {
        renderChart('bar', chartData); // Lógica para trimestre pode ser implementada aqui
    }
});
