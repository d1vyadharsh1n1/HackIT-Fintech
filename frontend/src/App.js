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
import "./index.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check for authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);

      // Fetch user data
      axios
        .get("http://localhost:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.log(err);
          setIsAuthenticated(false); // Invalidate session if token is not valid
          localStorage.removeItem("token");
        });

      // Preload community posts
      axios
        .get("http://localhost:5000/api/community")
        .catch((err) => console.log(err));
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

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="p-4 bg-blue-600 text-white flex justify-between items-center">
          <div className="space-x-4">
            {!isAuthenticated && <Link to="/">Login</Link>}
            {!isAuthenticated && <Link to="/register">Register</Link>}
            {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
            {isAuthenticated && (
              <Link to="/risk-assessment">Risk Assessment</Link>
            )}
            {isAuthenticated && <Link to="/community">Community</Link>}
          </div>
          {isAuthenticated && (
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          )}
        </nav>

        <div className="p-4">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
              }
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard user={user} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/risk-assessment"
              element={
                isAuthenticated ? (
                  <RiskAssessment user={user} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/community"
              element={isAuthenticated ? <Community /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
