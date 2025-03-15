from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

portfolio = []

investment_types = {
    "stocks": {
        "description": "Stocks represent ownership in a company and provide potential for capital appreciation and dividends.",
        "return_rate": 7.5  # Average return in percentage
    },
    "bonds": {
        "description": "Bonds are fixed-income securities that offer regular interest payments and lower risk than stocks.",
        "return_rate": 4.0
    },
    "real_estate": {
        "description": "Real estate investments include properties that generate rental income and appreciate over time.",
        "return_rate": 6.0
    },
    "crypto": {
        "description": "Cryptocurrency is a digital asset based on blockchain technology, known for high risk and high reward.",
        "return_rate": 15.0
    },
    "mutual_funds": {
        "description": "Mutual funds pool money from investors to invest in a diversified portfolio of assets.",
        "return_rate": 5.5
    },
    "gold": {
        "description": "Gold is a safe-haven asset that retains value over time, often used for wealth preservation.",
        "return_rate": 3.5
    }
}

@app.route('/')
def home():
    return render_template('home.html', investment_types=investment_types)

@app.route('/add', methods=['POST'])
def add_investment():
    data = request.get_json()
    investment_type = data.get('type')
    amount = float(data.get('amount'))

    if investment_type not in investment_types:
        return jsonify({"error": "Invalid investment type"}), 400

    # Calculate predicted returns using a random variation within ±1.5% of expected return rate
    base_return = investment_types[investment_type]["return_rate"]
    predicted_return = round(amount * (1 + (base_return + random.uniform(-1.5, 1.5)) / 100), 2)

    investment = {
        "type": investment_type,
        "amount": amount,
        "predicted_return": predicted_return
    }
    
    portfolio.append(investment)
    return jsonify({"message": "Investment added successfully!", "investment": investment})

@app.route('/portfolio')
def get_portfolio():
    return jsonify(portfolio)

if __name__ == '__main__':
    app.run(debug=True)

