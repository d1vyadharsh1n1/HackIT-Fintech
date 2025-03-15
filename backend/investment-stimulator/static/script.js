function invest(type) {
    let amount = prompt(`Enter the amount to invest in ${type.toUpperCase()}:`);

    if (!amount || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    fetch('/add', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({type: type, amount: parseFloat(amount)})
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert(`Investment added!\nType: ${data.investment.type.toUpperCase()}\nAmount: $${data.investment.amount}\nPredicted Return: $${data.investment.predicted_return}`);
            updatePortfolio();
        }
    });
}

function updatePortfolio() {
    fetch('/portfolio')
    .then(response => response.json())
    .then(portfolio => {
        const portfolioList = document.getElementById("portfolio-list");
        portfolioList.innerHTML = "";

        let portfolioData = {};

        portfolio.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.type.toUpperCase()} - $${item.amount} (Predicted: $${item.predicted_return})`;
            portfolioList.appendChild(li);

            portfolioData[item.type] = (portfolioData[item.type] || 0) + item.amount;
        });

        updateChart(portfolioData);
    });
}

window.onload = updatePortfolio;

