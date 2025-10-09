// src/App.jsx
import React, { useState } from "react";
import Navbar from "./pages/Navbar";
import Dashboard from "./pages/Dashboard";
import SoilAnalysis from "./pages/SoilAnalysis";
import Recommendations from "./pages/Recommendations";
import WeatherPage from "./pages/WeatherPage";
import CalculatorPage from "./pages/CalculatorPage";
import HistoryPage from "./pages/HistoryPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

// CSS imports
import "./pages/Navbar.css";
import "./pages/Dashboard.css";
import "./pages/LoginPage.css";
import "./pages/AuthPage.css";



function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main>
            {activeTab === "Dashboard" && <Dashboard />}
            {activeTab === "Soil Analysis" && <SoilAnalysis />}
            {activeTab === "Recommendations" && <Recommendations />}
            {activeTab === "Weather" && <WeatherPage />}
            {activeTab === "Calculator" && <CalculatorPage />}
            {activeTab === "History" && <HistoryPage />}
          </main>
        </>
      ) : isLogin ? (
        <LoginPage
          setIsLoggedIn={setIsLoggedIn}
          switchToSignUp={() => setIsLogin(false)}
        />
      ) : (
        <SignUpPage
          setIsLoggedIn={setIsLoggedIn}
          switchToLogin={() => setIsLogin(true)}
        />
      )}
    </div>
  );
}

export default App;