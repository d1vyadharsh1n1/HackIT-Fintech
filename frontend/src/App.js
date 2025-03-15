import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RiskAssessment from "./pages/RiskAssessment";
import Community from "./pages/Community";
import "./index.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="p-4 bg-blue-600 text-white flex justify-between">
          <div className="space-x-4">
            {!isAuthenticated && (
              <Link to="/" className="hover:underline">
                Login
              </Link>
            )}
            {!isAuthenticated && (
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            )}
            {isAuthenticated && (
              <Link to="/risk-assessment" className="hover:underline">
                Risk Assessment
              </Link>
            )}
            {isAuthenticated && (
              <Link to="/community" className="hover:underline">
                Community
              </Link>
            )}
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
                !isAuthenticated ? (
                  <Login onLogin={handleLogin} />
                ) : (
                  <Navigate to="/risk-assessment" />
                )
              }
            />
            <Route
              path="/register"
              element={
                !isAuthenticated ? (
                  <Register />
                ) : (
                  <Navigate to="/risk-assessment" />
                )
              }
            />
            <Route
              path="/risk-assessment"
              element={
                isAuthenticated ? <RiskAssessment /> : <Navigate to="/" />
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
