import { useLocation } from "react-router-dom";
const GradualInvestment = () => {
  const location = useLocation();
  const { balance, thresholdBalance, amountToInvest } = location.state || {};

  if (!balance || !thresholdBalance || !amountToInvest) {
    return <p>No data available</p>; // Fallback message if data is missing
  }

  return (
    <div>
      <h2>Gradual Investment</h2>
      <p>Bank Balance: ${balance}</p>
      <p>Threshold Balance: ${thresholdBalance}</p>
      <p>Amount to Invest: ${amountToInvest}</p>
      {/* Continue with the logic for gradual investment */}
    </div>
  );
};

export default GradualInvestment;
