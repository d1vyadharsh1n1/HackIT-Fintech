import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const InvestmentDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { balance, thresholdBalance, amountToInvest } = location.state || {};

  if (!balance || !thresholdBalance || !amountToInvest) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">Invalid Investment Data</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const investmentBalance = amountToInvest;
  const availableBalance = balance - amountToInvest;

  const handleInvest = () => {
    alert("Investment Successful!");
    navigate("/"); // Redirect to dashboard
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-4">Investment Dashboard</h1>
      <p className="text-xl">
        💰 Investment Account Balance: ${investmentBalance}
      </p>
      <p className="text-xl">🏦 Available Balance: ${availableBalance}</p>
      <button
        className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg"
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
    </div>
  );
};

export default InvestmentDashboard;
