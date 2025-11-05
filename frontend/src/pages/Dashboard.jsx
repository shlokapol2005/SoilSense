import React from "react";
import "./Dashboard.css";
import {
  Beaker,
  Target,
  Cloud,
  Calculator,
  TrendingUp,
  Thermometer,
  Droplets,
  Sun,
  ArrowRight,
  MessageCircle,
  BarChart3,
  Leaf,
} from "lucide-react";

const Dashboard = ({ setActiveTab }) => {
  const quickActions = [
    {
      id: 1,
      title: "Soil Analysis",
      description: "Upload lab reports or enter soil parameters",
      icon: Beaker,
      colorClass: "blue-gradient",
      bgColorClass: "blue-bg",
      textColorClass: "blue-text",
      targetTab: "Soil Analysis",
    },
    {
      id: 2,
      title: "Get Recommendations",
      description: "AI-powered crop and fertilizer suggestions",
      icon: Target,
      colorClass: "green-gradient",
      bgColorClass: "green-bg",
      textColorClass: "green-text",
      targetTab: "Recommendations",
    },
    {
      id: 3,
      title: "Weather Insights",
      description: "Location-based weather data and forecasts",
      icon: Cloud,
      colorClass: "cyan-gradient",
      bgColorClass: "cyan-bg",
      textColorClass: "cyan-text",
      targetTab: "Weather",
    },
    {
      id: 4,
      title: "Fertilizer Calculator",
      description: "Calculate exact quantities for your farm",
      icon: Calculator,
      colorClass: "purple-gradient",
      bgColorClass: "purple-bg",
      textColorClass: "purple-text",
      targetTab: "Calculator",
    },
  ];

  const weatherData = {
    temperature: "28°C",
    humidity: "68%",
    rainfall: "15mm",
    forecast: "Partly Cloudy",
  };

  const recentActivities = [
    { action: "Soil test completed", time: "2 hours ago", status: "success" },
    { action: "Weather alert received", time: "1 day ago", status: "warning" },
    { action: "Fertilizer calculation", time: "3 days ago", status: "info" },
  ];

  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Good Afternoon, <span className="highlight">Shloka Pol!</span>
          </h1>
          <p className="hero-subtitle">
            Welcome to your SoilSense dashboard. Let's help you make smarter
            farming decisions today.
          </p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-wrapper">
          {/* Quick Actions */}
          <section className="quick-actions-section">
            <h2 className="section-title">
              <TrendingUp className="section-icon" />
              Quick Actions
            </h2>

            <div className="quick-actions-grid">
              {quickActions.map((action) => {
                const IconComponent = action.icon;
                return (
                  <div key={action.id} className="quick-action-card">
                    <div className="card-body">
                      <div className={`icon-container ${action.bgColorClass}`}>
                        <IconComponent
                          className={`icon ${action.textColorClass}`}
                        />
                      </div>
                      <h3 className="card-title">{action.title}</h3>
                      <p className="card-desc">{action.description}</p>
                    </div>
                    <div className="card-footer">
                      <button
                        className={`action-btn ${action.colorClass}`}
                        onClick={() => setActiveTab(action.targetTab)}
                      >
                        <span>Get Started</span>
                        <ArrowRight className="arrow-icon" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="lower-section">
            {/* Left: Get Started & Recent Activities */}
            <div className="left-column">
              <div className="get-started-card">
                <div className="get-started-header">
                  <div className="leaf-icon">
                    <Leaf />
                  </div>
                  <div>
                    <h3 className="card-title">Get Started</h3>
                    <p className="card-desc">
                      Start by analyzing your soil to get personalized
                      recommendations for your farm.
                    </p>
                    <button
                      className="start-soil-btn"
                      onClick={() => setActiveTab("Soil Analysis")}
                    >
                      <Beaker />
                      <span>Start Soil Analysis</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="recent-activities-card">
                <h3 className="card-title">
                  <BarChart3 className="section-icon" />
                  Recent Activities
                </h3>
                <div className="activities-list">
                  {recentActivities.map((activity, idx) => (
                    <div key={idx} className="activity-item">
                      <div className="activity-left">
                        <div className={`status-dot ${activity.status}`}></div>
                        <span>{activity.action}</span>
                      </div>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Weather & Quick Stats */}
            <div className="right-column">
              <div className="weather-card">
                <div className="weather-header">
                  <h3 className="card-title">
                    <Cloud />
                    Weather Summary
                  </h3>
                  <Sun />
                </div>

                <div className="weather-data">
                  <div className="weather-row">
                    <Thermometer />
                    <span>Temperature</span>
                    <span className="weather-value">
                      {weatherData.temperature}
                    </span>
                  </div>
                  <div className="weather-row">
                    <Droplets />
                    <span>Humidity</span>
                    <span className="weather-value">
                      {weatherData.humidity}
                    </span>
                  </div>
                  <div className="weather-row">
                    <Cloud />
                    <span>Rainfall (7 days)</span>
                    <span className="weather-value">
                      {weatherData.rainfall}
                    </span>
                  </div>
                </div>

                <button
                  className="view-forecast-btn"
                  onClick={() => setActiveTab("Weather")}
                >
                  <span>View Detailed Forecast</span>
                  <ArrowRight />
                </button>
              </div>

              {/* Quick Stats */}
              <div className="quick-stats-card">
                <h3 className="card-title">Farm Overview</h3>
                <div className="stats-row">
                  <span>Total Area</span>
                  <span>12.5 acres</span>
                </div>
                <div className="stats-row">
                  <span>Active Crops</span>
                  <span>3 types</span>
                </div>
                <div className="stats-row">
                  <span>Last Soil Test</span>
                  <span className="soil-test">2 weeks ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="chat-btn-container">
        <button className="chat-btn">
          <MessageCircle />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
