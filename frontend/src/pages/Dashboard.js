import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chatbot from "./Chatbot";
import "./styles.css"; // Adjust the path accordingly if you place it in a different folder

const Dashboard = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [balance, setBalance] = useState(0);
  const [thresholdBalance, setThresholdBalance] = useState(0);
  const [amountToInvest, setAmountToInvest] = useState(0);
  const [bankName, setBankName] = useState("");
  const navigate = useNavigate();

  // Example use of setAmountToInvest in the handleBankIntegration function
  const handleBankIntegration = () => {
    const userBankName = prompt("Enter your Bank Name:");
    const userBalance = prompt("Enter your Account Balance:");
    const userThresholdBalance = prompt("Enter your Threshold Balance:");
    const userAmountToInvest = prompt("Enter the Amount to Invest:"); // Added input
    if (
      userBankName &&
      userBalance &&
      userThresholdBalance &&
      userAmountToInvest
    ) {
      setBankName(userBankName);
      setBalance(parseFloat(userBalance));
      setThresholdBalance(parseFloat(userThresholdBalance));
      setAmountToInvest(parseFloat(userAmountToInvest)); // Set amount to invest
    }
  };

  useEffect(() => {
    // If bank data is available in sessionStorage or localStorage, use that.
    const storedBalance = sessionStorage.getItem("balance");
    const storedBankName = sessionStorage.getItem("bankName");
    const storedThresholdBalance = sessionStorage.getItem("thresholdBalance");

    if (storedBalance && storedBankName && storedThresholdBalance) {
      setBalance(parseFloat(storedBalance));
      setBankName(storedBankName);
      setThresholdBalance(parseFloat(storedThresholdBalance));
    }
  }, []);

  useEffect(() => {
    // Store values in sessionStorage to persist them during the session.
    if (balance && bankName && thresholdBalance) {
      sessionStorage.setItem("balance", balance);
      sessionStorage.setItem("bankName", bankName);
      sessionStorage.setItem("thresholdBalance", thresholdBalance);
    }
  }, [balance, bankName, thresholdBalance]);

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
          onClick={() =>
            navigate("/gradual-investment", {
              state: { balance, thresholdBalance, amountToInvest },
            })
          }
        >
          Gradual Investment
        </button>
        <button
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg"
          onClick={() =>
            navigate("/risk-adaptive-management", {
              state: { balance, thresholdBalance, amountToInvest },
            })
          }
        >
          Risk Adaptive Management
        </button>
        <button
          className="bg-purple-500 text-white px-6 py-3 rounded-lg"
          onClick={() =>
            navigate("/invisible-investment", {
              state: { balance, thresholdBalance, amountToInvest },
            })
          }
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
