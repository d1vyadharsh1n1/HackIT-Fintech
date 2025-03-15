import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RiskAssessment from "./pages/RiskAssessment";
import Community from "./pages/Community";
import Dashboard from "./pages/Dashboard";
import InvestmentDashboard from "./pages/GradualInvestment"; // New Investment Page
import InvisibleInvestment from "./pages/InvisibleInvestment"; // New Invisible Investment Page
import Home from "./pages/Dashboard"; // Add Home component if you have one
import "./index.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUser(res.data);
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (userData, token) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <nav className="p-4 bg-blue-600 text-white flex justify-between items-center">
          <div className="space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/risk-assessment">Risk Assessment</Link>
                <Link to="/community">Community</Link>
                <Link to="/investment-dashboard">Investments</Link>
              </>
            )}
          </div>
          {isAuthenticated && (
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          )}
        </nav>

        {/* Routes */}
        <div className="p-4">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Register />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard user={user} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/risk-assessment"
              element={
                isAuthenticated ? (
                  <RiskAssessment user={user} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/community"
              element={
                isAuthenticated ? <Community /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/investment-dashboard"
              element={
                isAuthenticated ? (
                  <InvestmentDashboard user={user} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/invisible-investment"
              element={<InvisibleInvestment />}
            />
            <Route path="/" element={<Home />} />{" "}
            {/* Ensure Home is at the correct position */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
