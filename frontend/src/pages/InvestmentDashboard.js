import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Chatbot from "./Chatbot";
import "./styles.css"; // Adjust the path accordingly if you place it in a different folder

const InvestmentDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { balance, thresholdBalance, amountToInvest } = location.state || {};

  const [showChatbot, setShowChatbot] = useState(false);

  const [investmentBalance, setInvestmentBalance] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);

  useEffect(() => {
    if (balance > thresholdBalance) {
      const newInvestmentBalance = balance - amountToInvest; // Calculate investment balance
      const newAvailableBalance = balance - newInvestmentBalance; // Remaining available balance

      setInvestmentBalance(newInvestmentBalance);
      setAvailableBalance(newAvailableBalance);
    }
  }, [balance, thresholdBalance, amountToInvest]);

  const handleInvest = () => {
    alert("Investment Successful!");
    navigate("/"); // Redirect to dashboard after investment
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-4">Investment Dashboard</h1>

      <p className="text-xl mb-4">Account Balance: ${balance}</p>
      <p className="text-xl mb-4">Threshold Balance: ${thresholdBalance}</p>
      <p className="text-xl mb-4">Amount to Invest: ${amountToInvest}</p>
      <p className="text-xl mb-4">Available Balance: ${availableBalance}</p>
      <p className="text-xl mb-4">Investment Balance: ${investmentBalance}</p>

      <button
        className="bg-green-500 text-white px-6 py-3 rounded-lg"
        onClick={handleInvest}
      >
        Invest Now
      </button>

      <button
        className="mt-4 bg-gray-500 text-white px-6 py-2 rounded-lg"
        onClick={() => navigate("/")}
      >
        Back to Dashboard
      </button>

      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setShowChatbot(true)}
      >
        💬
      </button>
      {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
    </div>
  );
};

export default InvestmentDashboard;
