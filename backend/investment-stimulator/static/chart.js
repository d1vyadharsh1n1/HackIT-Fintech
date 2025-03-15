function updateChart(data) {
    const ctx = document.getElementById('portfolio-chart').getContext('2d');

    if (window.portfolioChart) {
        window.portfolioChart.destroy();
    }

    window.portfolioChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: 'Investment Portfolio',
                data: Object.values(data),
                backgroundColor: ['#3498db', '#e74c3c', '#f1c40f', '#2ecc71', '#9b59b6', '#34495e']
            }]
        }
    });
}

