import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chatbot from "./Chatbot";

const Dashboard = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [balance, setBalance] = useState(0);
  const [bankName, setBankName] = useState("");
  const navigate = useNavigate();

  const handleBankIntegration = () => {
    const userBankName = prompt("Enter your Bank Name:");
    const userBalance = prompt("Enter your Account Balance:");
    if (userBankName && userBalance) {
      setBankName(userBankName);
      setBalance(parseFloat(userBalance));
    }
  };

  const handleGradualInvestment = () => {
    if (balance === 0) {
      alert("Please integrate your bank account first.");
      return;
    }

    const thresholdBalance = prompt("Enter the Threshold Balance:");
    const amountToInvest = prompt("Enter the Amount to Invest:");

    if (thresholdBalance && amountToInvest) {
      navigate("/investment-dashboard", {
        state: {
          balance,
          thresholdBalance: parseFloat(thresholdBalance),
          amountToInvest: parseFloat(amountToInvest),
        },
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-4">Hey, [User's Name]!</h1>
      <p className="text-xl mb-4">Account Balance: ${balance}</p>
      {!bankName ? (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={handleBankIntegration}
        >
          Integrate Bank Account
        </button>
      ) : (
        <p className="text-lg">Bank: {bankName}</p>
      )}

      <div className="mt-6 flex flex-col space-y-4">
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg"
          onClick={handleGradualInvestment}
        >
          Gradual Investment
        </button>
        <button
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg"
          onClick={() => navigate("/risk-adaptive-management")}
        >
          Risk Adaptive Management
        </button>
        <button
          className="bg-purple-500 text-white px-6 py-3 rounded-lg"
          onClick={() => navigate("/invisible-investment")}
        >
          Invisible Investment
        </button>
      </div>

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

export default Dashboard;
