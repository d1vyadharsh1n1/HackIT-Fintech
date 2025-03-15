import React, { useState, useEffect, useCallback } from "react";

const InvisibleInvestment = () => {
  const [totalSaved, setTotalSaved] = useState(0);

  const displayTransactions = useCallback(() => {
    // Define transactions inside useCallback to avoid dependency warnings
    const transactions = [
      { desc: "Grocery Shopping", amount: 23.45 },
      { desc: "Coffee", amount: 4.75 },
      { desc: "Movie Ticket", amount: 12.9 },
      { desc: "Online Purchase", amount: 5.2 },
      { desc: "Restaurant", amount: 5.35 },
    ];

    let transactionList = document.getElementById("transactionList");
    let totalSavedAmount = 0;

    transactions.forEach((txn) => {
      let roundedAmount = Math.ceil(txn.amount);
      let savedAmount = (roundedAmount - txn.amount).toFixed(2);
      totalSavedAmount += parseFloat(savedAmount);

      let row = `<tr>
          <td>${txn.desc}</td>
          <td>$${txn.amount.toFixed(2)}</td>
          <td>$${roundedAmount.toFixed(2)}</td>
          <td>$${savedAmount}</td>
        </tr>`;

      transactionList.innerHTML += row;
    });

    setTotalSaved(totalSavedAmount);

    // Check if the saved amount exceeds 50
    if (totalSavedAmount > 50) {
      document.getElementById("thresholdMessage").innerText =
        "Threshold reached! Ready for investment.";
      document.getElementById("thresholdMessage").style.color = "green";
    } else {
      document.getElementById("thresholdMessage").innerText = "";
    }
  }, []); // Empty dependency array to only run once on mount

  useEffect(() => {
    displayTransactions();
  }, [displayTransactions]);

  return (
    <div className="investment-container">
      <h1>Invisible Investment</h1>

      {/* Transactions Table */}
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Transaction Amount</th>
            <th>Rounded Amount</th>
            <th>Saved Amount</th>
          </tr>
        </thead>
        <tbody id="transactionList"></tbody>
      </table>

      {/* Display Total Saved */}
      <div className="total-saved">
        <h2>Total Saved from Rounding:</h2>
        <p id="totalSaved">${totalSaved.toFixed(2)}</p>
      </div>

      {/* Notification for Threshold */}
      <div className="threshold-notification">
        <p id="thresholdMessage"></p>
      </div>

      {/* Back Button */}
      <button className="back-btn" onClick={() => window.history.back()}>
        Back to Home
      </button>
    </div>
  );
};

export default InvisibleInvestment;
