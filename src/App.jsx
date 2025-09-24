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

// CSS imports
import "./pages/Navbar.css";
import "./pages/Dashboard.css";
import "./pages/LoginPage.css";

function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      ) : (
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;
