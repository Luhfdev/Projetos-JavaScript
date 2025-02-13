const ctx = document.getElementById('salesChart').getContext('2d');
let salesChart;

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

function renderChart(type, data) {
    if (salesChart) salesChart.destroy(); 

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

document.getElementById('addDataButton').addEventListener('click', function() {
    const month = document.getElementById('month').value;
    const sales = document.getElementById('sales').value;

    if (month && sales) {
        chartData.labels.push(month);
        chartData.datasets[0].data.push(Number(sales));

        localStorage.setItem('chartData', JSON.stringify(chartData));

        renderChart('bar', chartData);

        document.getElementById('month').value = '';
        document.getElementById('sales').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});

function loadData() {
    const savedData = localStorage.getItem('chartData');
    if (savedData) {
        chartData = JSON.parse(savedData);
        renderChart('bar', chartData);
    }
}

loadData();

document.getElementById('barColor').addEventListener('input', function(event) {
    const newColor = event.target.value;
    chartData.datasets[0].backgroundColor = newColor;
    chartData.datasets[0].borderColor = newColor;
    salesChart.update();
});


document.getElementById('showBarChart').addEventListener('click', function() {
    renderChart('bar', chartData);
});

document.getElementById('showLineChart').addEventListener('click', function() {
    renderChart('line', chartData); 
});

document.getElementById('showPieChart').addEventListener('click', function() {
    renderChart('pie', chartData); 
});


document.getElementById('periodFilter').addEventListener('change', function(event) {
    const period = event.target.value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (period === 'monthly') {
        renderChart('bar', chartData);
    } else {
        renderChart('bar', chartData);
    }
});
