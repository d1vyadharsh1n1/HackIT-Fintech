import React, { useState } from "react";

const RiskAssessment = () => {
  const [answers, setAnswers] = useState({});
  const questions = [
    "How comfortable are you with market fluctuations?",
    "What is your investment timeframe?",
    "How much loss are you willing to tolerate?",
  ];

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Assessment Results:", answers);
    alert("Assessment Submitted!");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Risk Assessment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {questions.map((q, index) => (
          <div key={index}>
            <label className="block text-sm font-medium mb-2">{q}</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={answers[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
              required
            >
              <option value="">Select an option</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RiskAssessment;
