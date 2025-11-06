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
import WelcomeScreen from "./pages/WelcomeScreen";

// CSS imports
import "./pages/Navbar.css";
import "./pages/Dashboard.css";
import "./pages/LoginPage.css";
import "./pages/AuthPage.css";
import "./pages/WelcomeScreen.css";

function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [analysisData, setAnalysisData] = useState(null);
   const [showWelcome, setShowWelcome] = useState(true); // Store analysis results
  // 1. Welcome screen first
  // 2. Then login/signup
  // 3. Then main dashboard
  if (showWelcome) {
    return (
      <WelcomeScreen
        goToLogin={() => {
          setShowWelcome(false);
          setIsLogin(true);
        }}
        goToSignup={() => {
          setShowWelcome(false);
          setIsLogin(false);
        }}
      />
    );
  }

  // ✅ Login / Signup pages
  if (!isLoggedIn) {
    return isLogin ? (
      <LoginPage
        setIsLoggedIn={setIsLoggedIn}
        switchToSignUp={() => setIsLogin(false)}
      />
    ) : (
      <SignUpPage
        setIsLoggedIn={setIsLoggedIn}
        switchToLogin={() => setIsLogin(true)}
      />
    );
  }

  // ✅ Main app (after login)
  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        {activeTab === "Dashboard" && <Dashboard setActiveTab={setActiveTab} />}
        {activeTab === "Soil Analysis" && (
          <SoilAnalysis
            setActiveTab={setActiveTab}
            setAnalysisData={setAnalysisData}
          />
        )}
        {activeTab === "Recommendations" && (
          <Recommendations
            analysisData={analysisData}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === "Weather" && <WeatherPage />}
        {activeTab === "Calculator" && <CalculatorPage />}
        {activeTab === "History" && <HistoryPage />}
      </main>
    </>
  );
}

export default App;