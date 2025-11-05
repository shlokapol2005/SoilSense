// src/App.jsx// src/App.jsx
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
  const [analysisData, setAnalysisData] = useState(null); // Store analysis results

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          <main>
            {activeTab === "Dashboard" && (
              <Dashboard setActiveTab={setActiveTab} />
            )}
            {activeTab === "Soil Analysis" && (
              <SoilAnalysis 
                setActiveTab={setActiveTab}
                setAnalysisData={setAnalysisData}
              />
            )}
            {activeTab === "Recommendations" && (
              <Recommendations analysisData={analysisData} setActiveTab={setActiveTab} />
            )}
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